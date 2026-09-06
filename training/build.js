#!/usr/bin/env node
/* Inlines styles.css, data.js and app.js into a single self-contained page.
   Outputs:
     training/standalone.html  — a complete document you can save anywhere and open offline
     <argv[2]>                 — optional: body-only fragment (used for publishing as an Artifact)
   Run: node training/build.js [fragment-out-path]                                     */
const fs = require('fs'), path = require('path');
const dir = __dirname;
const read = f => fs.readFileSync(path.join(dir, f), 'utf8');

const FONTS = 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap';
const ICON = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2216%22 fill=%22%23101A17%22/><circle cx=%2250%22 cy=%2250%22 r=%2228%22 fill=%22none%22 stroke=%22%23E9C013%22 stroke-width=%228%22/><path d=%22M50 22v28%22 stroke=%22%23E9C013%22 stroke-width=%228%22 stroke-linecap=%22round%22/></svg>';

const fragment = [
  '<title>Ground Contact</title>',
  '<link rel="preconnect" href="https://fonts.googleapis.com" />',
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />',
  '<link rel="stylesheet" href="' + FONTS + '" />',
  '<style>\n' + read('styles.css') + '\n</style>',
  '<noscript><p style="padding:2rem;font-family:sans-serif">Ground Contact needs JavaScript — it is a live training app, not a document.</p></noscript>',
  '<script>\n' + read('data.js').replace(/\nif \(typeof module[\s\S]*$/, '\n') + '\n</script>',
  '<script>\n' + read('app.js') + '\n</script>'
].join('\n');

const doc = [
  '<!DOCTYPE html>', '<html lang="en">', '<head>',
  '<meta charset="utf-8" />',
  '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />',
  '<meta name="theme-color" content="#101A17" />',
  '<link rel="icon" href="' + ICON + '" />',
  fragment.replace('<noscript>', '</head>\n<body>\n<noscript>').split('</head>')[0] + '</head>',
  '<body>',
  fragment.split('<noscript>')[1] ? '<noscript>' + fragment.split('<noscript>')[1] : '',
  '</body>', '</html>'
].join('\n');

fs.writeFileSync(path.join(dir, 'standalone.html'), doc);
if (process.argv[2]) fs.writeFileSync(process.argv[2], fragment);

/* ---- netlify/ : a drag-and-drop deploy folder ----
   Installable to a phone home screen and cached for offline use, because the
   place you most need this is a field with no signal. Everything is generated,
   so the folder is disposable — rebuild it, never hand-edit it.            */
const out = path.join(dir, '..', 'netlify');
fs.mkdirSync(out, { recursive: true });

// The page, with the manifest and service worker wired in.
const web = doc.replace('</head>',
  '<link rel="manifest" href="/manifest.webmanifest" />\n'
  + '<meta name="apple-mobile-web-app-capable" content="yes" />\n'
  + '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />\n'
  + '<meta name="apple-mobile-web-app-title" content="Ground Contact" />\n'
  + '<link rel="apple-touch-icon" href="/icon-192.png" />\n'
  + '<meta name="description" content="Elastic-athlete training system: guided sessions, a full-screen timer, and the exercise library behind them." />\n'
  + '<script>if("serviceWorker" in navigator)addEventListener("load",function(){navigator.serviceWorker.register("/sw.js").catch(function(){})});</script>\n'
  + '</head>');
fs.writeFileSync(path.join(out, 'index.html'), web);

fs.writeFileSync(path.join(out, 'manifest.webmanifest'), JSON.stringify({
  name: 'Ground Contact', short_name: 'Ground Contact',
  description: 'Elastic-athlete training system.',
  start_url: '/', scope: '/', display: 'standalone', orientation: 'portrait',
  background_color: '#101A17', theme_color: '#101A17',
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
  ]
}, null, 2));

// Cache the shell on install; serve it first so the app opens with no signal.
// The version string changes with the page, which is what evicts the old cache.
const stamp = require('crypto').createHash('sha1').update(web).digest('hex').slice(0, 10);
fs.writeFileSync(path.join(out, 'sw.js'),
  'const C = "ground-contact-' + stamp + '";\n'
  + 'const SHELL = ["/", "/index.html", "/manifest.webmanifest", "/icon-192.png", "/icon-512.png"];\n'
  + 'self.addEventListener("install", e => { self.skipWaiting();\n'
  + '  e.waitUntil(caches.open(C).then(c => c.addAll(SHELL)).catch(() => {})); });\n'
  + 'self.addEventListener("activate", e => { e.waitUntil(\n'
  + '  caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k))))\n'
  + '    .then(() => self.clients.claim())); });\n'
  + 'self.addEventListener("fetch", e => {\n'
  + '  const r = e.request;\n'
  + '  if (r.method !== "GET") return;\n'
  + '  const url = new URL(r.url);\n'
  + '  if (url.origin !== location.origin) return;   // fonts fall back to the stack in CSS\n'
  + '  if (r.mode === "navigate") {\n'
  + '    e.respondWith(fetch(r).then(res => { const cp = res.clone();\n'
  + '      caches.open(C).then(c => c.put("/index.html", cp)); return res; })\n'
  + '      .catch(() => caches.match("/index.html")));\n'
  + '    return;\n'
  + '  }\n'
  + '  e.respondWith(caches.match(r).then(hit => hit || fetch(r)));\n'
  + '});\n');

// Icons are committed source, not generated here — build stays dependency-free.
['icon-192.png', 'icon-512.png'].forEach(f =>
  fs.copyFileSync(path.join(dir, 'assets', f), path.join(out, f)));

fs.writeFileSync(path.join(out, 'README.txt'),
  ['Ground Contact — drag-and-drop deploy',
   '',
   'Deploy: open https://app.netlify.com/drop and drag THIS FOLDER onto the page.',
   'Not the files inside it, and not a zip — the folder itself. It goes live in a few seconds.',
   '',
   'To update later: run `node training/build.js` in the repo, then drag this folder onto the',
   'same site under Deploys. Or connect the repo and set the publish directory to `netlify`.',
   '',
   'On your phone, once it is live:',
   '  iPhone  — open in Safari, Share, then "Add to Home Screen".',
   '  Android — open in Chrome, menu, then "Install app".',
   'It then opens full-screen with no browser chrome, and works with no signal: the whole app',
   'is one file and the service worker caches it. Your logged sessions, tests and notes live in',
   'the browser on that device, so keep using the same one.',
   '',
   'Everything here is generated by training/build.js. Do not hand-edit it — edit the sources',
   'in training/ and rebuild.',
   ''].join('\n'));

fs.writeFileSync(path.join(out, '_headers'),
  '/sw.js\n  Cache-Control: no-cache\n'
  + '/manifest.webmanifest\n  Cache-Control: no-cache\n'
  + '/index.html\n  Cache-Control: no-cache\n'
  + '/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: no-referrer\n');

/* ---- one-file deploy ----
   Netlify Drop accepts a lone HTML file, which is the least-friction way to get
   this online. A single file cannot register a service worker, so this build
   trades offline caching for having nothing to unzip; the netlify/ folder above
   is the version that keeps it.                                            */
const icon192 = fs.readFileSync(path.join(dir, 'assets', 'icon-192.png')).toString('base64');
const icon512 = fs.readFileSync(path.join(dir, 'assets', 'icon-512.png')).toString('base64');
const png = b64 => 'data:image/png;base64,' + b64;
const manifest = 'data:application/manifest+json,' + encodeURIComponent(JSON.stringify({
  name: 'Ground Contact', short_name: 'Ground Contact',
  start_url: './', display: 'standalone', orientation: 'portrait',
  background_color: '#101A17', theme_color: '#101A17',
  icons: [{ src: png(icon192), sizes: '192x192', type: 'image/png' },
          { src: png(icon512), sizes: '512x512', type: 'image/png', purpose: 'any maskable' }]
}));
const single = doc.replace('</head>',
  '<link rel="manifest" href="' + manifest + '" />\n'
  + '<meta name="apple-mobile-web-app-capable" content="yes" />\n'
  + '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />\n'
  + '<meta name="apple-mobile-web-app-title" content="Ground Contact" />\n'
  + '<link rel="apple-touch-icon" href="' + png(icon192) + '" />\n'
  + '<meta name="description" content="Elastic-athlete training system: guided sessions, a full-screen timer, and the exercise library behind them." />\n'
  + '</head>');
fs.writeFileSync(path.join(dir, '..', 'index-deploy.html'), single);

console.log('standalone.html', (doc.length / 1024).toFixed(0) + ' KB'
  + (process.argv[2] ? ' · fragment → ' + process.argv[2] : '')
  + ' · netlify/ ' + (web.length / 1024).toFixed(0) + ' KB'
  + ' · index-deploy.html ' + (single.length / 1024).toFixed(0) + ' KB');
