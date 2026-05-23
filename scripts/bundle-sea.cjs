const esbuild = require('esbuild');

async function main() {
  await esbuild.build({
    entryPoints: ['server.ts'],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    outfile: 'dist/sea-entry.cjs',
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    external: [
      'nice-napi',
      'bare-added',
      'vite',
      'esbuild',
    ],
  });
  console.log('Bundled server → dist/sea-entry.cjs');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
