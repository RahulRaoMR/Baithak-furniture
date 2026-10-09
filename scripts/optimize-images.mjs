import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, stat, writeFile, access, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const input = path.join(root, 'src/assets/images');
const output = path.join(root, 'public/images');
const manifestPath = path.join(root, 'src/data/image-manifest.js');
const galleryManifestPath = path.join(root, 'src/data/gallery-image-manifest.js');
const reportPath = path.join(root, 'reports/image-delivery.json');
const policyVersion = 4;
const protectedFiles = new Set([
  'gallery/dining-chair-003.jpeg', 'gallery/dining-chair-005.jpeg',
  'gallery/dining-chair-006.jpeg', 'gallery/archive-048.jpg',
]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const location = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(location));
    else if (/\.(png|jpe?g|webp|avif)$/i.test(entry.name)) files.push(location);
  }
  return files;
}

async function exists(file) {
  try { await access(file); return true; } catch { return false; }
}

const files = [];
for (const file of await walk(input)) {
  const bytes = await readFile(file);
  const metadata = await sharp(bytes).metadata();
  files.push({
    file: path.relative(input, file).replaceAll('\\', '/'),
    width: metadata.width, height: metadata.height, format: metadata.format,
    bytes: bytes.length, hash: createHash('sha256').update(bytes).digest('hex'),
  });
}
const signature = createHash('sha256').update(JSON.stringify({ policyVersion, files })).digest('hex');
const previous = await exists(reportPath) ? JSON.parse(await readFile(reportPath, 'utf8')) : null;
if (await exists(manifestPath) && await exists(galleryManifestPath) && previous) {
  const outputsExist = await Promise.all((previous.outputs || []).map(file => exists(path.join(output, file))));
  if (previous.signature === signature && outputsExist.every(Boolean)) {
    console.log(`Image delivery unchanged: ${files.length} originals, ${previous.outputs.length} generated files.`);
    process.exit(0);
  }
}

await mkdir(output, { recursive: true });
await mkdir(path.dirname(reportPath), { recursive: true });
const groups = new Map();
for (const file of files) {
  if (file.file === 'baithak-logo.png') continue;
  const group = groups.get(file.hash) || [];
  group.push(file); groups.set(file.hash, group);
}
const manifest = { outputs: [], sources: {}, images: {} };
const report = { signature, policyVersion, originalFiles: files, duplicates: [], delivery: [] };

for (const [hash, group] of groups) {
  const first = group[0];
  const original = path.join(input, first.file);
  const stem = `${path.parse(first.file).name}-${hash.slice(0, 10)}`;
  let image;
  if (group.some(file => protectedFiles.has(file.file))) {
    const filename = `${stem}${path.extname(first.file)}`;
    await writeFile(path.join(output, filename), await readFile(original));
    manifest.outputs.push(filename);
    image = { src: `/images/${filename}`, width: first.width, height: first.height, protected: true };
  } else {
    const metadata = await sharp(original).metadata();
    const transparent = metadata.hasAlpha && !(await sharp(original).stats()).isOpaque;
    const fullWidth = Math.min(first.width, 1920);
    const fullHeight = Math.round(first.height * fullWidth / first.width);
    const fallback = `${stem}.${transparent ? 'png' : 'jpg'}`;
    const resized = sharp(original).resize({ width: fullWidth, withoutEnlargement: true });
    await (transparent ? resized.png() : resized.jpeg({ quality: 90, chromaSubsampling: '4:4:4' })).toFile(path.join(output, fallback));
    if (metadata.format === 'jpeg' && first.width === fullWidth && first.bytes < (await stat(path.join(output, fallback))).size) {
      await writeFile(path.join(output, fallback), await readFile(original));
    }
    manifest.outputs.push(fallback);
    // Editorial groups get two variants; only large/heavy gallery photos get a thumbnail.
    const editorial = group.some(file => !file.file.includes('/') && file.width >= 1000);
    const candidates = editorial ? [640, 1024, fullWidth]
      : first.width > 1280 && first.bytes > 250000 ? [640, fullWidth] : [fullWidth];
    const widths = [...new Set(candidates.filter(width => width <= fullWidth))].sort((a, b) => a - b);
    const variants = [];
    for (const width of widths) {
      const filename = `${stem}-${width}.webp`;
      await sharp(original).resize({ width, withoutEnlargement: true }).webp({ quality: 86, effort: 5 }).toFile(path.join(output, filename));
      manifest.outputs.push(filename);
      variants.push({ src: `/images/${filename}`, width });
    }
    image = { src: `/images/${fallback}`, width: fullWidth, height: fullHeight, variants };
    if (group.some(file => file.file === 'gallery/studio-006.png')) {
      // Match the existing mobile cover crop at 64%, keeping the full source height.
      const width = 1000;
      const left = Math.round((first.width - width) * 0.64);
      const crop = { left, top: 0, width, height: first.height };
      const webp = `${stem}-mobile.webp`;
      const jpeg = `${stem}-mobile.jpg`;
      await sharp(original).extract(crop).webp({ quality: 86, effort: 5 }).toFile(path.join(output, webp));
      await sharp(original).extract(crop).jpeg({ quality: 90, chromaSubsampling: '4:4:4' }).toFile(path.join(output, jpeg));
      manifest.outputs.push(webp, jpeg);
      image.mobile = { webp: `/images/${webp}`, src: `/images/${jpeg}`, width, height: first.height, crop };
    }
  }
  manifest.images[image.src] = image;
  for (const file of group) manifest.sources[`../assets/images/${file.file}`] = image.src;
  if (group.length > 1) report.duplicates.push({ originalsRetained: group.map(file => file.file), sharedDelivery: image.src });
  const generated = manifest.outputs.filter(file => file.startsWith(stem));
  report.delivery.push({ originals: group.map(file => file.file), ...image, files: await Promise.all(generated.map(async file => ({ file, bytes: (await stat(path.join(output, file))).size }))) });
}
for (const file of previous?.outputs || []) {
  if (manifest.outputs.includes(file)) continue;
  const target = path.resolve(output, file);
  if (path.dirname(target) !== path.resolve(output)) throw new Error('Invalid generated-image path');
  if (await exists(target)) await unlink(target);
}
report.outputs = manifest.outputs;
const criticalGalleryFiles = new Set(['../assets/images/gallery/studio-003.png', '../assets/images/gallery/studio-006.png', '../assets/images/gallery/studio-014.png']);
const coreSources = Object.fromEntries(Object.entries(manifest.sources).filter(([key]) => !key.includes('/gallery/') || criticalGalleryFiles.has(key)));
const coreUrls = new Set(Object.values(coreSources));
const core = { sources: coreSources, images: Object.fromEntries(Object.entries(manifest.images).filter(([src]) => coreUrls.has(src))) };
const gallery = { sources: Object.fromEntries(Object.entries(manifest.sources).filter(([key]) => !(key in coreSources))), images: Object.fromEntries(Object.entries(manifest.images).filter(([src]) => !coreUrls.has(src))) };
const comment = '// Generated by scripts/optimize-images.mjs; original photographs are never modified.\n';
await writeFile(manifestPath, `${comment}export default ${JSON.stringify(core)};\n`);
await writeFile(galleryManifestPath, `${comment}export default ${JSON.stringify(gallery)};\n`);
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(`Generated ${manifest.outputs.length} delivery files for ${groups.size} unique photos; ${files.length} originals retained.`);
