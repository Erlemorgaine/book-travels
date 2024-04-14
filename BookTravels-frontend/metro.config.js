const { getDefaultConfig } = require("@expo/metro-config");

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  // Extending or modifying the default assetExts list from Expo's default config
  defaultConfig.resolver.assetExts.push("svg"); // Add 'svg' if not already included

  return defaultConfig;
})();
