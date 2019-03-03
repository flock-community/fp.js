module.exports = {
  plugins: [
    ['@babel/plugin-transform-modules-commonjs'],
    '@babel/plugin-proposal-nullish-coalescing-operator',
    [
      '@babel/plugin-proposal-pipeline-operator',
      {
        proposal: 'minimal',
      },
    ],
  ],
};
