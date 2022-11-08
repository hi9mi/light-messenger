module.exports = {
  file: './swagger-api.json',
  templateFileNameCode: 'index.gen.ts',
  outputDir: './src/shared/api/internal',
  presets: [
    [
      'effector-openapi-preset',
      {
        effectorImport: 'effector',
        requestName: 'requestFx',
        requestPath: '@lm-client/shared/api/request',
      },
    ],
  ],
};
