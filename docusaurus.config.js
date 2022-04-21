// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "World ID",
  tagline:
    "Prove a human is doing an action only once without revealing any personal data",
  url: "https://world-id.worldcoin.org",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "worldcoin", // GitHub org.
  projectName: "world-id-docs", // Repo name.

  plugins: ["docusaurus-plugin-sass", "posthog-docusaurus"],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/worldcoin/world-id-docs/tree/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "World ID",
        logo: {
          alt: "World ID Logo",
          src: "img/logo.svg",
          srcDark: "img/logo-dark.svg",
        },
        items: [
          {
            type: "doc",
            docId: "index",
            position: "left",
            label: "Docs",
          },
          {
            href: "https://worldcoin.org",
            label: "Worldcoin",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Quick start",
                to: "/docs/quick-start",
              },
              {
                label: "About the Protocol",
                to: "/docs/about/protocol",
              },
              {
                label: "Javascript Integration",
                to: "/docs/js",
              },
              {
                label: "Examples",
                to: "/docs/examples",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discord.gg/worldcoin",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/worldcoin",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/worldcoin",
              },
              {
                label: "Worldcoin",
                href: "https://worldcoin.org",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Tools for Humanity Corporation.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      posthog: {
        apiKey: "phc_QttqgDbMQDYHX1EMH7FnT6ECBVzdp0kGUq92aQaVQ6I",
        appUrl: "https://app.posthog.com",
        enableInDevelopment: false,
        persistence: "localStorage",
        autocapture: false,
      },
    }),
};

module.exports = config;
