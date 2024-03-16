// This is necessary since Expo doesn't support linking native modules

const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
  const {
    resolver: { assetExts },
  } = await getDefaultConfig(__dirname);
  return {
    resolver: {
      assetExts: [...assetExts, "svg"],
    },
  };
})();
