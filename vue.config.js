
module.exports = {
    runtimeCompiler: true,
    devServer: {
        proxy: 'http://localhost:3000',
        port: '8080',
        host: '0.0.0.0',
        overlay: true,
        // host: 'localhost',
    },
    pwa: {
        name: 'ILS Lookup',
        themeColor: '#v',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'default',
        // manifestOptions: {
        //   start_url: '/',
        // },
        iconPaths: {
                faviconSVG: '../public/img/icons/favicon.svg',
                favicon32: '../public/img/icons/favicon-32x32.png',
                favicon16: '../public/img/icons/favicon-16x16.png',
                appleTouchIcon: null,
                maskIcon: null,
                msTileImage: null
        }
        // configure the workbox plugin
        // workboxPluginMode: 'generateSW',
        // workboxOptions: {
        //   cleanupOutdatedCaches: true // cleans up cache that is outdated because of a previous version of Workbox.
        // }
        // workboxOptions: {
          // swSrc is required in InjectManifest mode.
        //   swSrc: 'dev/sw.js',
          // ...other Workbox options...
        // }
      }    
}
