import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const packageJsonPath = fileURLToPath(
    new URL('../package.json', import.meta.url)
);
const packageJson = JSON.parse(await fs.readFile(packageJsonPath));

// delete useless keys on build
for (const key in packageJson) {
    //   console.log(`${property}: ${object[property]}`);
    if (key === 'devDependencies' || key === 'scripts') {
        delete packageJson[key];
    }
}

// write pure package.json to build folder
const builtPackageJsonPath = fileURLToPath(
    new URL('../dist/package.json', import.meta.url)
);
fs.writeFile(builtPackageJsonPath, JSON.stringify(packageJson, null, 2));
