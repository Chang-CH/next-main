import Mdx from "@next/mdx";

/*
Module federation currently does not work with app router, see https://github.com/module-federation/universe/issues/799
*/
import { NextFederationPlugin } from "@module-federation/nextjs-mf";
// import FederatedTypesPlugin from "@module-federation/typescript";

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
  experimental: {
    mdxRs: true,
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    if (!isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "host",
          remotes: {
            reactButton:
              "reactButton@https://chang-ch.github.io/mf-source/ReactButton/remoteEntry.js",
            // `reactButton@http://localhost:8081/remoteEntry.js`,
          },
          filename: "static/chunks/remoteEntry.js",
          extraOptions: {
            debug: true,
          },
        })
      );
    }
    return config;
  },
};

// Merge MDX config with Next.js config
const config = withMDX(nextConfig);

export default config;
