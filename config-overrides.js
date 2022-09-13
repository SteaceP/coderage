const {
  override,
  useBabelRc,
  addBundleVisualizer,
  overrideDevServer,
  adjustWorkbox,
  watchAll,
  setWebpackTarget,
} = require("customize-cra");

module.exports = {
  webpack: override(
    // add override for Babel
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useBabelRc(),
    setWebpackTarget("es2017"),

    // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
    process.env.BUNDLE_VISUALIZE === 1 && addBundleVisualizer(),

    // adjust the underlying workbox
    adjustWorkbox((wb) =>
      Object.assign(wb, {
        skipWaiting: true,
        exclude: (wb.exclude || []).concat("index.html"),
      })
    )
  ),

  devServer: overrideDevServer(
    // dev server plugin
    watchAll()
    // add override for Babel
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // useBabelRc(),
  ),
};

module.exports = override();
