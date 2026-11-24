import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const LOCALES = 'public/locales';
const BASE = 'en';

function namesIn(value, prefix = '') {
  return Object.entries(value).flatMap(([name, inner]) =>
    typeof inner === 'object' && inner !== null
      ? namesIn(inner, `${prefix}${name}.`)
      : [`${prefix}${name}`],
  );
}

function textsOf(language) {
  const folder = join(LOCALES, language);
  return new Set(
    readdirSync(folder).flatMap((file) =>
      namesIn(JSON.parse(readFileSync(join(folder, file), 'utf8')), `${file}: `),
    ),
  );
}

const base = textsOf(BASE);
const problems = readdirSync(LOCALES)
  .filter((language) => language !== BASE)
  .flatMap((language) => {
    const other = textsOf(language);
    return [
      ...[...base].filter((name) => !other.has(name)).map((name) => `${language} lacks ${name}`),
      ...[...other].filter((name) => !base.has(name)).map((name) => `${BASE} lacks ${name}`),
    ];
  });

if (problems.length > 0) {
  console.error(`The interface texts differ between the languages:\n${problems.join('\n')}`);
  process.exit(1);
}
console.log(`The interface texts match in all languages: ${base.size} texts.`);
