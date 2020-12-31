module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: 'babel-loader'
        },
        {
          loader: 'react-svg-loader',
          options: {
            jsx: true // true outputs JSX tags
          }
        }
      ]
    })
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }
    config.plugins = config.plugins || []

    config.plugins = [...config.plugins]

    return config
  },
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    RECAPTCHA_SITE_KEY:
      process.env.NODE_ENV === 'production'
        ? '6LfhKr0UAAAAADAT97B4cfqmhpYNd4xgq0LyXLZC'
        : '6Lfzir0UAAAAAO_GnwyXOTLpzLaHvZvF30oAJzI_',
    API_HOST:
      process.env.NODE_ENV === 'production'
        ? 'https://api.flossbank.com'
        : 'https://api.flossbank.io',
    STAGING_API_HOST: 'https://api.flossbank.io',
    NEXT_PUBLIC_STRIPE_KEY: process.env.NODE_ENV === 'production'
      ? 'pk_live_KSFYqPCzV6zNSzDyYlIijaiI00v7UCvGGS'
      : 'pk_test_Kz9yyhpVG7OVp9ejZChlxUKw00ccsj7tcR',
    GOAT_COUNTER_ENABLE: process.env.NODE_ENV === 'production'
  }
}
