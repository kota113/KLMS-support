// noinspection JSUnusedGlobalSymbols
export default {
  expo: {
    "name": "KLMS-app",
    "slug": "klms-app",
    version: "0.1.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.kota113.klmsapp",
      buildNumber: "0.1.0",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
        // monochromeImage: './assets/monochrome-icon.png'
      },
      package: "com.kota113.klmsapp",
      permissions: [],
      versionCode: 1
    },
    extra: {
      eas: {
        projectId: "f31902cb-cf0f-4011-9337-1dbdb3038135"
      }
    },
    plugins: []
  }
}
