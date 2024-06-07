import * as path from 'path';
import { defineConfig } from 'rspress/config';

import rspressPlugMentionGithub from 'rspress-plugin-mention-github';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress',
  description: 'Rspack-based Static Site Generator',
  icon: '/rspress-icon.png',
  logo: {
    light: '/rspress-light-logo.png',
    dark: '/rspress-dark-logo.png',
  },
  globalStyles: path.join(__dirname, 'styles/index.css'),
  themeConfig: {
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/hunghg255/rspress-plugin-mention-github' },
    ],
  },
  plugins: [rspressPlugMentionGithub({
    linksMap: {
      'Web Infra Dev': 'https://github.com/web-infra-dev',
      'Rspack': {
        link: 'https://github.com/web-infra-dev/rspack',
        imageUrl: 'https://assets.rspack.dev/rspack/rspack-logo.svg'
      },
      'Rsbuild': {
        link: 'https://github.com/web-infra-dev/rsbuild',
        imageUrl: 'https://assets.rspack.dev/rsbuild/rsbuild-logo.svg'
      },
      'Rspress': {
        link: 'https://github.com/web-infra-dev/rspress',
        imageUrl: 'https://rspress.dev/rspress-logo.webp'
      },
      'Rsdoctor': {
        link: 'https://github.com/web-infra-dev/rsdoctor',
        imageUrl: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/lognuvj/rsdoctor/logo/rsdoctor-large.png'
      },
      Modernjs: {
        link: 'https://github.com/web-infra-dev/modern.js',
        imageUrl: 'https://lf-cdn-tos.bytescm.com/obj/static/webinfra/modern-js-website/assets/images/images/modernjs-logo.svg'
      },
      Garfish: {
        link: 'https://github.com/web-infra-dev/garfish',
        imageUrl: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/dhozeh7vhpebvog/open-garfish/icons/garfish-icon.png'
      }
    }
  })],
});
