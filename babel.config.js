const presets = [
  ['@babel/preset-env', {
    targets: {
      chrome: 59,
      edge: 13,
      firefox: 50,
      safari: 11.1,
    },
    useBuiltIns: "entry"
  }]
];

module.exports = { presets };