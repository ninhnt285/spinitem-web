module.exports = {
  head: {
    title: 'Making 360° Product Preiew',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Making 360° Product' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' }
    ]
  },
  router: {
    middleware: 'auth'
  },
  css: [
    'normalize.css',
    '~assets/scss/main.scss'
  ],
  loading: { color: '#C60337' },
  plugins: [
    '~/plugins/axios',
    { src: '~/plugins/touch', ssr: false }
  ],
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: process.env.NODE_END == 'production' ? 'http://api.spinitem.com' : 'http://localhost:8000'
  },
  env: {
    apiURL: process.env.NODE_END == 'production' ? 'http://api.spinitem.com' : 'http://localhost:8000',
    clientURL: process.env.NODE_END == 'production' ? 'http://spinitem.com' : 'http://localhost:8001',
    shopifyAPIKey: 'fd28cffb2c993b304a287da9586ffd1f'
  },
  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
