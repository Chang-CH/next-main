import Mdx from "@next/mdx";

/*
Module federation currently does not work with app router, see https://github.com/module-federation/universe/issues/799

// import {NextFederationPlugin} from '@module-federation/nextjs-mf';

// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = isServer => {
  // const location = isServer ? 'ssr' : 'chunks';
  return {
    vueButton: `vueButton@https://raw.githubusercontent.com/Chang-CH/mf-source/main/vue-button/dist/remoteEntry.js`,
  };
};

*/

const withMDX = Mdx({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
  webpack: (
    config, 
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // config.plugins.push(
    //   new NextFederationPlugin({
    //     name: 'home',
    //     filename: 'static/chunks/remoteEntry.js',
    //     exposes: {
    //       './nav': './components/nav.js',
    //       './home': './pages/index.js',
    //       './pages-map': './pages-map.js',
    //     },
    //     remotes: remotes(isServer),
    //     shared: {},
    //     extraOptions:{
    //       automaticAsyncBoundary: true
    //     }
    //   }),
    // );

    return config;
  },
};

// Merge MDX config with Next.js config
const config = withMDX(nextConfig);

export default config;



