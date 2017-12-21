export default function(config = {}) {
  const {production} = config

  return {
    test: /\.mustache$/,
    use: [
      {
        loader: 'mustache-loader',
        options: {
          noShortcut: true,
          tiny: production,
        },
      },
    ],
  }
}
