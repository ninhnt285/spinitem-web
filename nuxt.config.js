module.exports = {
  head: {
    title: 'Making 360° Product Preiew',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'SpinItem.com SPA Project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
    baseURL: 'http://api.spinitem.com',
    // baseURL: 'http://localhost:8000'
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
