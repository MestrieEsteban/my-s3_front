export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'my-s3_app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src:
          'https://unpkg.com/vuex-persistedstate/dist/vuex-persistedstate.umd.js',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/api/init.js',
    { src: '~/plugins/persistedState.client.js' },
    { src: '~/plugins/persistedState.js' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
	  '@nuxt/typescript-build',
	  'nuxt-animejs'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',

    '@nuxtjs/auth',
  ],
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
	  baseURL: 'http://my-s3-serveur.herokuapp.com:34734/api/',
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  bootstrapVue: {
    icons: true,
  },
}
