import { db, storage, secrets, router, json, error } from '@appdeploy/sdk';

const PLAYERS_TABLE = 'recruiting_portal';
const SETTINGS_TABLE = 'recruiting_settings';
const RECORD_ID = 'main';

export const handler = router({
  'GET /api/players': [
    async () => {
      const [record] = await db.get(PLAYERS_TABLE, [RECORD_ID], { consistent: true });
      return json({ players: record?.players || [] });
    },
  ],
  'PUT /api/players': [
    async ({ body }) => {
      const payload = body as { players?: unknown[] };
      if (!Array.isArray(payload.players)) {
        return error('Invalid roster', 400);
      }
      const [updated] = await db.tx.update(PLAYERS_TABLE, [{ id: RECORD_ID, record: { players: payload.players } }]);
      if (!updated) return error('Could not save roster', 500);
      const [verified] = await db.get(PLAYERS_TABLE, [RECORD_ID], { consistent: true });
      if (!Array.isArray(verified?.players) || verified.players.length !== payload.players.length) return error('Roster verification failed', 500);
      return json({ ok: true });
    },
  ],
  'GET /api/settings': [
    async () => {
      const [record] = await db.get(SETTINGS_TABLE, [RECORD_ID]);
      return json(record || {});
    },
  ],
  'PUT /api/settings': [
    async ({ body }) => {
      const settings = body as Record<string, unknown>;
      const [updated] = await db.tx.update(SETTINGS_TABLE, [{ id: RECORD_ID, record: settings }]);
      if (!updated) return error('Could not save settings', 500);
      return json({ ok: true });
    },
  ],
  'POST /api/image-urls': [
    async ({ body }) => {
      const input = body as { urls?: string[] };
      const urls = Array.isArray(input?.urls) ? input.urls.filter(x => typeof x === 'string').slice(0, 300) : [];
      const paths: string[] = [];
      for (const prefix of ['player-images/', 'school-logos/', 'branding/']) {
        let nextToken: string | undefined;
        do {
          const page = await storage.list({ prefix, limit: 500, ...(nextToken ? { nextToken } : {}) });
          paths.push(...page.paths);
          nextToken = page.nextToken;
        } while (nextToken && paths.length < 5000);
      }
      const matches: Record<string, string> = {};
      for (const original of urls) {
        let decoded = original;
        try { decoded = decodeURIComponent(original); } catch {}
        const match = paths.filter(path => decoded.includes(path) || original.includes(encodeURIComponent(path)));
        if (match.length === 1) matches[original] = match[0];
      }
      const unique = [...new Set(Object.values(matches))];
      const renewed = unique.length ? await storage.url(unique) : [];
      const byPath = new Map(renewed.map(item => [item.path, item.url]));
      return json({ urls: Object.fromEntries(Object.entries(matches).map(([old, path]) => [old, byPath.get(path) || old])) });
    },
  ],
  'POST /api/upload': [
    async ({ body }) => {
      const upload = body as {
        path?: string;
        content?: string;
        contentType?: string;
      };
      if (
        !upload.path ||
        !upload.content ||
        !upload.contentType ||
        !/^(player-images|school-logos|branding)\//.test(upload.path)
      ) {
        return error('Invalid upload', 400);
      }
      if (upload.content.length > 7000000) {
        return error('Image too large', 413);
      }
      const [saved] = await storage.write([
        {
          path: upload.path,
          content: upload.content,
          contentType: upload.contentType,
        },
      ]);
      if (!saved) return error('Upload failed', 500);
      const [result] = await storage.url([upload.path]);
      return json({ url: result?.url || '' });
    },
  ],
  'POST /api/admin/login': [
    async ({ body }) => {
      const credentials = body as { password?: string };
      const configured = await secrets.listSecretNames();
      if (!configured.includes('ADMIN_PASSWORD')) {
        return error('Admin password is not configured', 503);
      }
      const expected = await secrets.readSecret('ADMIN_PASSWORD');
      return json({
        ok:
          typeof credentials.password === 'string' &&
          credentials.password === expected,
      });
    },
  ],
});
