import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { projects, clients } from '../src/content.js';

const base = '/portfolio/';
const sameCaseFile = (root, file) => {
  let current = root;
  for (const part of file.split('/')) {
    assert.ok(fs.readdirSync(current).includes(part), `Missing file or case mismatch: ${file}`);
    current = path.join(current, part);
  }
  assert.ok(fs.statSync(current).isFile(), file);
};
let count = 0;
const asset = src => {
  if (!src || /^(https?:|data:)/.test(src)) return;
  const relative = src.replace(/^\//, '');
  sameCaseFile('public', relative);
  sameCaseFile('dist', relative);
  count++;
};
for (const project of projects) {
  for (const item of [...project.images, ...project.videos, ...(project.designFiles || [])]) {
    asset(item.src); asset(item.poster);
  }
}
clients.forEach(client => asset(`/logos/${client.file}`));
for (const file of ['vehicle.png','pavilion.png','spaceship-side.png','spaceship-front.png','spaceship-back.png','sake-house-side.png','sake-house-front.png','sake-house-back.png']) asset(`/media/3d-works/${file}`);
const html = fs.readFileSync('dist/index.html', 'utf8');
assert.ok(html.includes(`${base}fonts/Syne-Regular-4.otf`));
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  assert.ok(match[1].startsWith(base), `Unprefixed built URL: ${match[1]}`);
  sameCaseFile('dist', match[1].slice(base.length));
}
const bundles = fs.readdirSync('dist/assets');
const js = bundles.filter(f => f.endsWith('.js')).map(f => fs.readFileSync(`dist/assets/${f}`, 'utf8')).join('');
const css = bundles.filter(f => f.endsWith('.css')).map(f => fs.readFileSync(`dist/assets/${f}`, 'utf8')).join('');
assert.ok(js.includes(base), 'Missing application base URL');
for (const name of ['Syne-Regular-4.otf','Syne-Bold-2.otf','Syne-Extra-3.otf']) assert.ok(css.includes(`${base}fonts/${name}`), `Unprefixed font: ${name}`);
console.log(`PASS: ${count} media/logo references, exact filename case, built entry points and all local font URLs under ${base}`);
