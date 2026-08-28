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
console.log('standalone.html', (doc.length / 1024).toFixed(0) + ' KB' + (process.argv[2] ? ' · fragment → ' + process.argv[2] : ''));
