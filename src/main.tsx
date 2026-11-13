import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { api } from '@appdeploy/client';
import './style.css';
const seed = [
  [
    'DJ Verges',
    'LB',
    '6\'2"',
    '230',
    '3.8',
    'https://www.hudl.com/profile/20137034/DJ-Verges',
    '@VERGESDJ27',
    ['Troy', 'Arkansas State', 'FIU', 'UTM', 'Samford', 'ETSU'],
  ],
  [
    'Hudson Bell',
    'OL',
    '6\'4"',
    '270',
    '4.4',
    'https://www.hudl.com/profile/22253427/Hudson-Bell',
    '@HUDSONBELL09',
    ['Samford', 'North Alabama', 'Austin Peay'],
  ],
  [
    'Theon Williams',
    'DB/LB',
    '6\'0"',
    '200',
    '3.4',
    'https://www.hudl.com/profile/16448335/Theon-Williams',
    '@THEONWILLIAMS6',
    ['UTM'],
  ],
  [
    'JJ Hamby',
    'TE/WR',
    '6\'3"',
    '210',
    '3.0',
    'https://www.hudl.com/profile/18191850/JJ-Hamby',
    '@JJ_HAMBY8',
    ['Eureka College'],
  ],
  [
    'Parker Davis',
    'DL',
    '6\'3"',
    '250',
    '2.35',
    'https://www.hudl.com/profile/22270202/Parker-Davis',
    '@PARKERDAVIS500',
    [],
  ],
  [
    'Brody Gossett',
    'ATH',
    '5\'11"',
    '160',
    '3.2',
    'https://www.hudl.com/profile/18475502/Brody-Gossett',
    '@BRODY4GOSSET',
    [],
  ],
  [
    'Devin Lovell',
    'OL',
    '5\'9"',
    '270',
    '3.3',
    'https://www.hudl.com/profile/20193898/Devin-Lovell',
    '@THEDEVINLOVELL',
    ['Eureka College'],
  ],
  [
    'Juju Holland',
    'DB/LB',
    '5\'9"',
    '160',
    '',
    'https://www.hudl.com/profile/26570089/Julian-Holland/highlights',
    '',
    [],
  ],
  [
    'Aniff McFarlane',
    'DL',
    '5\'8"',
    '225',
    '4.2',
    'https://www.hudl.com/profile/22264474/Annif-Mcfarlane',
    '',
    [],
  ],
];
const initial = seed.map((a, i) => ({
  id: 'panther-' + i,
  name: a[0],
  position: a[1],
  height: a[2],
  weight: a[3],
  gpa: a[4],
  hudl: a[5],
  handle: a[6],
  offers: a[7],
  classYear: '2027',
  stats: {},
}));
const class2028 = [
  { id: 'panther-2028-tj-sanders', number: '2', name: 'TJ Sanders', position: 'DB', height: '6\'0"', weight: '160', gpa: '2.9', hudl: 'https://www.hudl.com/profile/20303006/TJ-Sanders', maxpreps: 'https://www.maxpreps.com/al/pell-city/pell-city-panthers/athletes/tj-sanders/?careerid=v6u5sm6dorfn7', offers: ['Georgia State', 'ULM', 'Jacksonville State'], classYear: '2028', stats: {} },
  { id: 'panther-2028-jamari-robinson', number: '70', name: 'Jamari Robinson', position: 'OL', height: '6\'3"', weight: '310', hudl: 'https://www.hudl.com/profile/23168449/Jamari-Robinson', maxpreps: 'https://www.maxpreps.com/al/pell-city/pell-city-panthers/athletes/jamari-robinson/?careerid=ad5i6a2f756td', offers: [], classYear: '2028', stats: {} },
  { id: 'panther-2028-brenon-saulter', number: '5', name: 'Brenon Saulter', position: 'WR', height: '6\'2"', weight: '195', gpa: '3.7', hudl: 'https://www.hudl.com/profile/20304830/Brenon-Saulter', maxpreps: 'https://www.maxpreps.com/al/pell-city/pell-city-panthers/athletes/brenon-saulter/?careerid=6dek19k1mnpff', offers: [], classYear: '2028', stats: {} },
  { id: 'panther-2028-carter-hughes', number: '76', name: 'Carter Hughes', position: 'OL', height: '6\'3"', weight: '270', hudl: 'https://www.hudl.com/profile/22793918/Carter-Hughes/highlights', maxpreps: 'https://www.maxpreps.com/al/pell-city/pell-city-panthers/athletes/carter-hughes/?careerid=hjn68bupco3ff', offers: [], classYear: '2028', stats: {} },
  { id: 'panther-2028-jaylen-bedford', number: '5', name: 'Jaylen Bedford', position: 'DB/LB', height: '5\'10"', weight: '170', hudl: 'https://www.hudl.com/profile/26426356/Jaylen-Bedford', offers: [], classYear: '2028', stats: {} },
  { id: 'panther-2028-jt-turner', number: '3', name: 'JT Turner', position: 'DB', height: '5\'10"', weight: '170', hudl: 'https://www.hudl.com/profile/26826123/JT-Turner', maxpreps: 'https://www.maxpreps.com/al/pell-city/pell-city-panthers/athletes/jt-turner/?careerid=ijtj8jqc34d66', offers: [], classYear: '2028', stats: {} },
  { id: 'panther-2028-mitchell-brooks', number: '11', name: 'Mitchell Brooks', position: 'DB', height: '5\'10"', weight: '170', maxpreps: 'https://www.maxpreps.com/al/pell-city/pell-city-panthers/athletes/mitchell-brooks/?careerid=g9fco2pugrcj3', offers: [], classYear: '2028', stats: {} },
  { id: 'panther-2028-wyatt-hartley', number: '12', name: 'Wyatt Hartley', position: 'DB', height: '5\'10"', weight: '170', maxpreps: 'https://www.maxpreps.com/al/pell-city/pell-city-panthers/athletes/wyatt-hartley/?careerid=361pprpnsdrtd', offers: [], classYear: '2028', stats: {} },
  { id: 'panther-2028-kyree-mitchell-hill', number: '14', name: 'Kyree Mitchell Hill', position: 'LB', height: '5\'10"', weight: '170', maxpreps: 'https://www.maxpreps.com/al/pell-city/pell-city-panthers/athletes/kyree-mitchell-hill/?careerid=sq2on8nfhunee', offers: [], classYear: '2028', stats: {} },
  { id: 'panther-2028-dylon-garner', number: '31', name: 'Dylon Garner', position: 'K', height: '5\'10"', weight: '170', maxpreps: 'https://www.maxpreps.com/al/pell-city/pell-city-panthers/athletes/dylon-garner/?careerid=cmg791990k6p9', offers: [], classYear: '2028', stats: {} },
  { id: 'panther-2028-amari-avery', number: '90', name: 'Amari Avery', position: 'DL', height: '5\'10"', weight: '170', maxpreps: 'https://www.maxpreps.com/al/pell-city/pell-city-panthers/athletes/ahmari-avery/?careerid=fpil0velnchsc', offers: [], classYear: '2028', stats: {} },
];
const class2029 = [
  { id: 'panther-2029-gage-henley', number: '4', name: 'Gage Henley', position: 'DB', height: '6\'4"', weight: '185', hudl: 'https://www.hudl.com/profile/18324750/Gage-Henley/highlights', maxpreps: 'https://www.maxpreps.com/al/pell-city/pell-city-panthers/athletes/gage-henley/?careerid=4g8pkf5sa7il5', offers: [], classYear: '2029', stats: {} },
  { id: 'panther-2029-dj-wade', number: '10', name: 'DJ Wade', position: 'ATH', height: '5\'8"', weight: '180', hudl: 'https://www.hudl.com/profile/23655607/Dj-Wade/highlights', offers: [], classYear: '2029', stats: {} },
  { id: 'panther-2029-ty-holcombe', number: '12', name: 'Ty Holcombe', position: 'DB', height: '5\'10"', weight: '160', hudl: 'https://www.hudl.com/profile/23518380/Ty-Holcombe/highlights', maxpreps: 'https://www.maxpreps.com/al/pell-city/pell-city-panthers/athletes/ty-holcombe/?careerid=brvj53b97ue77', offers: [], classYear: '2029', stats: {} },
  { id: 'panther-2029-jayden-merritt', number: '13', name: 'Jayden Merritt', position: 'DB', height: '6\'0"', weight: '165', hudl: 'https://www.hudl.com/profile/23753395/Jayden-Merritt/highlights', maxpreps: 'https://www.maxpreps.com/al/pell-city/pell-city-panthers/athletes/jayden-merritt/?careerid=uvsgdutaaihff', offers: [], classYear: '2029', stats: {} },
  { id: 'panther-2029-austin-walker', number: '74', name: 'Austin Walker', position: 'OL', hudl: 'https://www.hudl.com/profile/30270760/Austin-Walker/highlights', offers: [], classYear: '2029', stats: {} },
  { id: 'panther-2029-caydon-twymon', number: '75', name: 'Caydon Twymon', position: 'OL', hudl: 'https://www.hudl.com/profile/23277027/Cadon-Twymon/highlights', offers: [], classYear: '2029', stats: {} },
];
const verifiedHighlights = {
  'DJ Verges': {
    url: 'https://www.hudl.com/video/3/20137034/6af49e99c118fab3ebcf2456',
    embed: 'https://www.hudl.com/embed/video/3/20137034/6af49e99c118fab3ebcf2456',
    title: 'DJ Verges — Featured Highlight',
    date: 'Selected highlight',
  },
  'Devin Lovell': {
    url: 'https://www.hudl.com/video/3/20193898/691c8743da75fadc2015190c',
    embed: 'https://www.hudl.com/embed/video/3/20193898/691c8743da75fadc2015190c',
    title: 'Devin Lovell Jr. Season',
    date: 'November 18, 2025',
  },
  'Aniff McFarlane': {
    url: 'https://www.hudl.com/video/3/22264474/691c9896ac7978a67418a314',
    embed: 'https://www.hudl.com/embed/video/3/22264474/691c9896ac7978a67418a314',
    title: 'Annif Mcfarlane Jr. Season',
    date: 'November 18, 2025',
  },
};
const parseHudlVideo = (input) => {
  const match = input.match(/https:\/\/(?:www\.)?hudl\.com\/(?:embed\/)?video\/\d+\/\d+\/[a-zA-Z0-9]+/i);
  if (!match) return null;
  const url = match[0].replace('/embed/video/', '/video/');
  return { url, embed: url.replace('/video/', '/embed/video/') };
};
function App() {
  const [players, P] = useState([...initial, ...class2028, ...class2029]),
    [year, Y] = useState('2027'),
    [sel, S] = useState('panther-0'),
    [tab, T] = useState('roster'),
    [admin, A] = useState(false),
    [login, L] = useState(false),
    [pw, W] = useState(''),
    [schoolLogo, SL] = useState(''),
    [contacts, C] = useState({
      name: 'Football Coaching Staff',
      email: '',
      phone: '',
    }),
    [edit, E] = useState(null),
    [statsDraft, SD] = useState(''),
    [hudlEditor, HE] = useState(null),
    [add, AD] = useState(false),
    [form, F] = useState({
      name: '',
      classYear: '2028',
      position: '',
      height: '',
      weight: '',
      gpa: '',
      hudl: '',
      offers: [],
      stats: {},
    }),
    [school, N] = useState(''),
    [kind, K] = useState('offer'),
    [msg, M] = useState('');
  const yearsNav = useRef<HTMLElement | null>(null);
  const p = players.find(x => x.id === sel) || players[0],
    list = players
      .filter(x => x.classYear === year)
      .sort((a, b) => {
        const aNumber = Number.parseInt(a.number, 10);
        const bNumber = Number.parseInt(b.number, 10);
        const aHasNumber = Number.isFinite(aNumber);
        const bHasNumber = Number.isFinite(bNumber);
        if (aHasNumber && bHasNumber) return aNumber - bNumber;
        if (aHasNumber) return -1;
        if (bHasNumber) return 1;
        return a.name.localeCompare(b.name);
      }),
    years = [
      ...new Set([
        '2027',
        '2028',
        '2029',
        '2030',
        ...players.map(x => x.classYear),
      ]),
    ].sort();
  const renewImages = async (records, settings) => {
    const urls = [
      ...records.flatMap(x => [x.photo, ...Object.values(x.schoolLogos || {})]),
      settings?.schoolLogo
    ].filter(x => typeof x === 'string' && x.startsWith('http'));
    if (!urls.length) return { records, settings };
    try {
      const response = await api.post('/api/image-urls', { urls: [...new Set(urls)] });
      const updated = response.data?.urls || {};
      return {
        records: records.map(x => ({ ...x, photo: updated[x.photo] || x.photo,
          schoolLogos: Object.fromEntries(Object.entries(x.schoolLogos || {}).map(([name, url]) => [name, updated[url] || url])) })),
        settings: { ...settings, schoolLogo: updated[settings?.schoolLogo] || settings?.schoolLogo }
      };
    } catch { return { records, settings }; }
  };
  useEffect(() => {
    api
      .get('/api/players')
      .then(async r => {
        const stored = r.data.players || [];
        const seeded = [...initial, ...class2028, ...class2029];
        const seededIds = new Set(seeded.map(x => x.id));
        const merged = [
          ...seeded.map(x => stored.find(y => y.id === x.id) || x),
          ...stored.filter(x => !seededIds.has(x.id)),
        ];
        renewImages(merged, {}).then(result => P(result.records));
        if (merged.length !== stored.length || seeded.some(x => !stored.some(y => y.id === x.id))) {
          await api.put('/api/players', { players: merged });
        }
      })
      .catch(() => {});
    api
      .get('/api/settings')
      .then(r => {
        renewImages([], r.data).then(result => SL(result.settings.schoolLogo || ''));
        C(
          r.data.contacts || {
            name: 'Football Coaching Staff',
            email: '',
            phone: '',
          }
        );
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    if (!schoolLogo) return;
    let icon = document.querySelector('link[rel~="icon"]');
    if (!icon) {
      icon = document.createElement('link');
      icon.rel = 'icon';
      document.head.appendChild(icon);
    }
    icon.href = schoolLogo;
  }, [schoolLogo]);
  const save = async arr => {
    P(arr);
    try {
      await api.put('/api/players', { players: arr });
    } catch {
      M('Could not save. Retry.');
    }
  };
  const upload = async (file, path) => {
    if (!file) return '';
    if (file.size > 5e6) {
      M('Use an image smaller than 5 MB.');
      return '';
    }
    const b = await file.arrayBuffer();
    let s = '';
    new Uint8Array(b).forEach(v => (s += String.fromCharCode(v)));
    return (
      await api.post('/api/upload', {
        path,
        content: btoa(s),
        contentType: file.type || 'image/png',
      })
    ).data.url;
  };
  const patch = (id, obj) =>
    save(players.map(x => (x.id === id ? { ...x, ...obj } : x)));
  const addSchool = () => {
    if (!school.trim() || !p) return;
    const name = school.trim(),
      next = { ...p, schoolLogos: { ...(p.schoolLogos || {}) } };
    if (kind === 'offer')
      next.offers = [...new Set([...(next.offers || []), name])];
    else next[kind === 'committed' ? 'committedTo' : 'signedTo'] = name;
    patch(p.id, next);
    N('');
  };
  const uploadLogo = async (name, file) => {
    const url = await upload(
      file,
      'school-logos/' +
        name.toLowerCase().replace(/[^a-z0-9]+/g, '-') +
        '-' +
        Date.now()
    );
    if (url)
      patch(p.id, { schoolLogos: { ...(p.schoolLogos || {}), [name]: url } });
  };
  const card = (name, type, logos) => (
    <div className="schoolcard" key={name + type}>
      <div className="schoollogo">
        {logos?.[name] ? (
          <img src={logos[name]} />
        ) : (
          name
            .split(' ')
            .map(x => x[0])
            .slice(0, 3)
            .join('')
        )}
      </div>
      <div>
        <b>{name}</b>
        <small>{type}</small>
      </div>
      {admin && (
        <label className="upload">
          ＋ LOGO
          <input
            type="file"
            accept="image/*"
            onChange={e => uploadLogo(name, e.target.files[0])}
          />
        </label>
      )}
    </div>
  );
  const doLogin = () =>
    api
      .post('/api/admin/login', { password: pw })
      .then(r => {
        if (r.data.ok) {
          A(true);
          L(false);
          W('');
        } else M('Incorrect password');
      })
      .catch(() => M('Admin login failed'));
  return (
    <div className="app">
      <header>
        <div className="brand">
          <div className="crest">
            {schoolLogo ? <img src={schoolLogo} /> : 'PC'}
          </div>
          <div>
            <small>PELL CITY HIGH SCHOOL</small>
            <h1>
              PANTHERS <i>FOOTBALL</i>
            </h1>
            <label>COLLEGE RECRUITING PORTAL</label>
          </div>
        </div>
        <div>
          {admin && (
            <label className="upload">
              UPLOAD SCHOOL LOGO
              <input
                type="file"
                accept="image/*"
                onChange={async e => {
                  const u = await upload(
                    e.target.files[0],
                    'branding/logo-' + Date.now()
                  );
                  if (u) {
                    SL(u);
                    api.put('/api/settings', { schoolLogo: u });
                  }
                }}
              />
            </label>
          )}{' '}
          <button
            className="outline"
            onClick={() => (admin ? A(false) : L(true))}
          >
            {admin ? 'EXIT ADMIN' : 'ADMIN LOGIN'}
          </button>
        </div>
      </header>
      <div className="years-shell">
        <button
          className="year-arrow"
          aria-label="Scroll graduating classes left"
          onClick={() => yearsNav.current?.scrollBy({ left: -240, behavior: 'smooth' })}
        >
          ‹
        </button>
        <nav className="years" ref={yearsNav}>
          <span>GRADUATING CLASS</span>
          {years.map(y => (
            <button
              className={year === y ? 'active' : ''}
              onClick={() => {
                Y(y);
                T('roster');
              }}
            >
              {y}
            </button>
          ))}
        </nav>
        <button
          className="year-arrow"
          aria-label="Scroll graduating classes right"
          onClick={() => yearsNav.current?.scrollBy({ left: 240, behavior: 'smooth' })}
        >
          ›
        </button>
      </div>
      <main>
        <div className="heading">
          <div>
            <small>RECRUITING DATABASE</small>
            <h2>
              {tab === 'roster'
                ? year + ' PROSPECTS'
                : tab.toUpperCase() + ' PLAYERS'}
            </h2>
          </div>
          {admin && tab === 'roster' && (
            <button className="gold" onClick={() => AD(true)}>
              ＋ ADD PLAYER
            </button>
          )}
        </div>
        <nav className="tabs">
          {['roster', 'offers', 'committed', 'signed', 'contact'].map(x => (
            <button className={tab === x ? 'chosen' : ''} onClick={() => T(x)}>
              {x === 'roster'
                ? 'PLAYER ROSTER'
                : x.toUpperCase() === 'CONTACT'
                  ? 'COACH CONTACT'
                  : x.toUpperCase()}
            </button>
          ))}
        </nav>
        {tab === 'roster' && (
          <div className="layout">
            <aside>
              <h3>
                CLASS OF {year} <small>{list.length} PLAYERS</small>
              </h3>
              {list.map(x => (
                <button
                  className={'player ' + (x.id === sel ? 'chosen' : '')}
                  onClick={() => S(x.id)}
                >
                  <div className="initial">
                    {x.photo ? (
                      <img src={x.photo} />
                    ) : (
                      x.name
                        .split(' ')
                        .map(v => v[0])
                        .slice(0, 2)
                        .join('')
                    )}
                  </div>
                  <div>
                    <b>{x.name}</b>
                    <small>
                      {x.position} · {x.height} · {x.weight} LBS
                    </small>
                  </div>
                  ›
                </button>
              ))}
            </aside>
            {p && (
              <article>
                <section className="hero">
                  <div className="photo">
                    {p.photo ? (
                      <img src={p.photo} />
                    ) : (
                      <span>
                        PLAYER
                        <br />
                        PHOTO
                      </span>
                    )}
                    {admin && (
                      <label className="upload">
                        ＋ PHOTO
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async e => {
                            const u = await upload(
                              e.target.files[0],
                              'player-images/' + p.id + '-' + Date.now()
                            );
                            if (u) patch(p.id, { photo: u });
                          }}
                        />
                      </label>
                    )}
                  </div>
                  <div>
                    <small>CLASS OF {p.classYear} · PELL CITY PANTHERS</small>
                    <h2>{p.name}</h2>
                    <p>
                      {p.number ? `#${p.number}　•　` : ''}{p.position}　•　{p.height}　•　{p.weight} LBS
                    </p>
                    <div className="metrics">
                      <div>
                        <b>{p.gpa || '—'}</b>
                        <small>GPA</small>
                      </div>
                      <div>
                        <b>{p.offers?.length || 0}</b>
                        <small>OFFERS</small>
                      </div>
                      <div>
                        <b>{p.committedTo ? 'YES' : '—'}</b>
                        <small>COMMITTED</small>
                      </div>
                    </div>
                    {p.handle}
                  </div>
                  {admin && (
                    <button
                      className="outline edit"
                      onClick={() => { E({ ...p }); SD(Object.entries(p.stats || {}).map(([k, v]) => k + ': ' + v).join('\n')); }}
                    >
                      EDIT
                    </button>
                  )}
                </section>
                <div className="two">
                  <section className="panel">
                    <h3>
                      HUDL HIGHLIGHTS{' '}
                      <a href={p.hudlVideo || verifiedHighlights[p.name]?.url || p.hudl} target="_blank" rel="noreferrer">
                        {verifiedHighlights[p.name] ? 'PLAY HIGHLIGHT ↗' : 'OPEN HUDL ↗'}
                      </a>
                    </h3>
                    {admin && (
                      <button className="outline" onClick={() => HE({ id: p.id, name: p.name, value: p.hudlEmbed || '' })}>
                        EDIT HUDL VIDEO
                      </button>
                    )}
                    {p.hudl || p.hudlEmbed ? (
                      <>
                        <iframe
                          src={p.hudlEmbed || verifiedHighlights[p.name]?.embed || p.hudl}
                          title={p.hudlEmbed ? p.name + ' selected Hudl highlight' : verifiedHighlights[p.name]?.title || 'Hudl player profile'}
                          allow="autoplay; encrypted-media; picture-in-picture"
                          allowFullScreen
                        />
                        <small>
                          {p.hudlEmbed
                            ? 'Featured: Admin-selected highlight. If playback is blocked, '
                            : verifiedHighlights[p.name]
                            ? `Featured: ${verifiedHighlights[p.name].title} · ${verifiedHighlights[p.name].date}. If playback is blocked, `
                            : 'Hudl profile preview. If playback is blocked, '}
                          <a href={p.hudlVideo || verifiedHighlights[p.name]?.url || p.hudl} target="_blank" rel="noreferrer">
                            watch on Hudl ↗
                          </a>
                        </small>
                      </>
                    ) : (
                      <small>No Hudl link added.</small>
                    )}
                  </section>
                  <section className="panel">
                    <h3>
                      MAXPREPS SEASON STATS{' '}
                      <a href={p.maxpreps || 'https://www.maxpreps.com/'} target="_blank" rel="noreferrer">
                        MAXPREPS ↗
                      </a>
                    </h3>
                    {Object.keys(p.stats || {}).length ? (
                      <div className="stats">
                        {Object.entries(p.stats).map(([k, v]) => (
                          <div>
                            <b>{v}</b>
                            <small>{k}</small>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>
                        Enter verified stats in Edit Profile. Automated live
                        stats require an authorized MaxPreps feed.
                      </p>
                    )}
                  </section>
                </div>
                <section className="panel">
                  <h3>
                    COLLEGE OFFERS & STATUS{' '}
                    <span>UPLOAD EACH SCHOOL'S LOGO</span>
                  </h3>
                  <div className="schools">
                    {(p.offers || []).map(n => card(n, 'OFFER', p.schoolLogos))}
                    {p.committedTo &&
                      card(p.committedTo, 'COMMITTED', p.schoolLogos)}
                    {p.signedTo && card(p.signedTo, 'SIGNED', p.schoolLogos)}
                  </div>
                  {admin && (
                    <div className="addschool">
                      <select value={kind} onChange={e => K(e.target.value)}>
                        <option value="offer">Offer</option>
                        <option value="committed">Committed</option>
                        <option value="signed">Signed</option>
                      </select>
                      <input
                        placeholder="Enter college / university name"
                        value={school}
                        onChange={e => N(e.target.value)}
                      />
                      <button className="gold" onClick={addSchool}>
                        ADD SCHOOL
                      </button>
                    </div>
                  )}
                </section>
              </article>
            )}
          </div>
        )}
        {['offers', 'committed', 'signed'].includes(tab) && (
          <div className="directory">
            {players
              .filter(
                x =>
                  x.classYear === year &&
                  (tab === 'offers'
                    ? x.offers?.length
                    : tab === 'committed'
                      ? x.committedTo
                      : x.signedTo)
              )
              .sort((a, b) => {
                const aNumber = Number.parseInt(a.number, 10);
                const bNumber = Number.parseInt(b.number, 10);
                const aHasNumber = Number.isFinite(aNumber);
                const bHasNumber = Number.isFinite(bNumber);
                if (aHasNumber && bHasNumber) return aNumber - bNumber;
                if (aHasNumber) return -1;
                if (bHasNumber) return 1;
                return a.name.localeCompare(b.name);
              })
              .map(x => (
                <div className="dir">
                  <div className="initial">
                    {x.photo ? <img src={x.photo} /> : x.name[0]}
                  </div>
                  <div>
                    <b>{x.name}</b>
                    <small>
                      {x.position} · Class of {x.classYear}
                    </small>
                    <div className="schools">
                      {(tab === 'offers'
                        ? x.offers
                        : [tab === 'committed' ? x.committedTo : x.signedTo]
                      )
                        .filter(Boolean)
                        .map(n => card(n, tab.toUpperCase(), x.schoolLogos))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
        {tab === 'contact' && (
          <section className="panel contact">
            <h2>COACHING STAFF CONTACT</h2>
            {[
              ['name', 'Coach / Staff Name'],
              ['email', 'Email'],
              ['phone', 'Phone'],
            ].map(([k, l]) => (
              <label>
                {l}
                <input
                  disabled={!admin}
                  value={contacts[k]}
                  onChange={e => C({ ...contacts, [k]: e.target.value })}
                />
              </label>
            ))}
            {admin && (
              <button
                className="gold"
                onClick={() =>
                  api
                    .put('/api/settings', { contacts })
                    .then(() => M('Contact saved'))
                }
              >
                SAVE CONTACT
              </button>
            )}
          </section>
        )}
      </main>
      <footer>
        <b>PELL CITY PANTHERS</b>
        <button onClick={() => T('contact')}>COACH CONTACT ↗</button>
      </footer>
      {login && (
        <div className="shade">
          <div className="modal">
            <button className="close" onClick={() => L(false)}>
              ×
            </button>
            <small>RESTRICTED ACCESS</small>
            <h2>ADMIN LOGIN</h2>
            <input
              type="password"
              placeholder="Password"
              value={pw}
              onChange={e => W(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && doLogin()}
            />
            <button className="gold" onClick={doLogin}>
              UNLOCK ADMIN
            </button>
          </div>
        </div>
      )}
      {hudlEditor && (
        <div className="shade">
          <div className="modal wide">
            <button className="close" onClick={() => HE(null)}>×</button>
            <small>ADMIN · HUDL HIGHLIGHTS</small>
            <h2>EDIT HUDL VIDEO — {hudlEditor.name}</h2>
            <p>Paste the Hudl iframe embed code or the direct video URL.</p>
            <textarea
              aria-label="Hudl embed code or video URL"
              rows={4}
              style={{ width: '100%' }}
              value={hudlEditor.value}
              onChange={e => HE({ ...hudlEditor, value: e.target.value })}
              placeholder="https://www.hudl.com/embed/video/3/..."
            />
            <button className="gold" onClick={async () => {
              const parsed = parseHudlVideo(hudlEditor.value);
              if (!parsed) { M('Paste a valid Hudl video link or iframe embed code.'); return; }
              const next = players.map(x => x.id === hudlEditor.id ? { ...x, hudlVideo: parsed.url, hudlEmbed: parsed.embed } : x);
              try {
                const response = await api.put('/api/players', { players: next });
                if (response.data?.ok === false) throw new Error('Save rejected');
                P(next);
                HE(null);
                M('Hudl video saved. Public visitors will see this highlight.');
              } catch { M('Video save failed. Please try again.'); }
            }}>SAVE HUDL VIDEO</button>
          </div>
        </div>
      )}
      {edit && (
        <div className="shade">
          <div className="modal wide">
            <button className="close" onClick={() => E(null)}>
              ×
            </button>
            <small>PLAYER MANAGEMENT</small>
            <h2>EDIT {edit.name}</h2>
            <div className="form">
              {[
                'name',
                'number',
                'classYear',
                'position',
                'height',
                'weight',
                'gpa',
                'hudl',
                'handle',
                'committedTo',
                'signedTo',
              ].map(k => (
                <label>
                  {k}
                  <input
                    value={edit[k] || ''}
                    onChange={e => E({ ...edit, [k]: e.target.value })}
                  />
                </label>
              ))}
            </div>
            <label>
              Season stats (one per line: category: value)
              <textarea
                value={statsDraft}
                rows={8}
                style={{ width: '100%', resize: 'vertical' }}
                onChange={e => SD(e.target.value)}
              />
            </label>
            <button
              className="gold"
              onClick={() => {
                const parsedStats = Object.fromEntries(statsDraft.split('\n').map(line => line.trim()).filter(Boolean).map(line => {
                  const i = line.indexOf(':');
                  return i < 0 ? [line, ''] : [line.slice(0, i).trim(), line.slice(i + 1).trim()];
                }).filter(([key]) => key));
                save(players.map(x => (x.id === edit.id ? { ...edit, stats: parsedStats } : x)));
                E(null);
              }}
            >
              SAVE PLAYER
            </button>
            <button
              className="delete"
              onClick={() => {
                if (confirm('Delete player?')) {
                  save(players.filter(x => x.id !== edit.id));
                  E(null);
                }
              }}
            >
              DELETE PLAYER
            </button>
          </div>
        </div>
      )}
      {add && (
        <div className="shade">
          <div className="modal">
            <button className="close" onClick={() => AD(false)}>
              ×
            </button>
            <h2>ADD PLAYER</h2>
            {['name', 'position', 'height', 'weight', 'gpa', 'hudl'].map(k => (
              <label>
                {k}
                <input
                  value={form[k] || ''}
                  onChange={e => F({ ...form, [k]: e.target.value })}
                />
              </label>
            ))}
            <label>
              Graduating class
              <select
                value={form.classYear}
                onChange={e => F({ ...form, classYear: e.target.value })}
              >
                {years.map(y => (
                  <option>{y}</option>
                ))}
              </select>
            </label>
            <button
              className="gold"
              onClick={() => {
                if (form.name) {
                  const x = { ...form, id: crypto.randomUUID() };
                  save([...players, x]);
                  Y(x.classYear);
                  S(x.id);
                  AD(false);
                  F({
                    name: '',
                    classYear: '2028',
                    position: '',
                    height: '',
                    weight: '',
                    gpa: '',
                    hudl: '',
                    offers: [],
                    stats: {},
                  });
                }
              }}
            >
              ADD PLAYER
            </button>
          </div>
        </div>
      )}
      {msg && (
        <button className="toast" onClick={() => M('')}>
          {msg} ×
        </button>
      )}
    </div>
  );
}
createRoot(document.getElementById('root')).render(<App />);
