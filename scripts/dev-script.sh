# Clean old version from node_modules
rm -rf ./demo/node_modules/astro-trpc;

# Create a package.json o the dist folder
node scripts/generate-build-package.json.js

# Copy new version to node_modules
cp -r ./dist ./demo/node_modules/astro-trpc

npm --prefix ./demo run dev