## Demo

```code
{Web Infra Dev} We are from ByteDance, our goal is to build an open technical ecosystem to promote the development of frontend technology.

{Rspack} A fast Rust-based web bundler

{Rsbuild} The Rspack Powered Build Tool

{Rspress} Lightning Fast Static Site Generator

{Rsdoctor} Analyzer for Rspack & Webpack

{Modernjs} Inspire Creativity in Modern Web Development

{Garfish} Garfish 微前端框架
```


{Web Infra Dev} We are from ByteDance, our goal is to build an open technical ecosystem to promote the development of frontend technology.

{Rspack} A fast Rust-based web bundler

{Rsbuild} The Rspack Powered Build Tool

{Rspress} Lightning Fast Static Site Generator

{Rsdoctor} Analyzer for Rspack & Webpack

{Modernjs} Inspire Creativity in Modern Web Development

{Garfish} Garfish 微前端框架



## Install

```bash
npm i rspress-plugin-mention-github -D
```

## Config

- Import css

```css
@import url('rspress-plugin-mention-github/style.css');
```

- Add plugin to `rspress.config.ts`


```js
import * as path from 'path';
import { defineConfig } from 'rspress/config';

import rspressPlugMentionGithub from 'rspress-plugin-mention-github';

export default defineConfig({
  plugins: [
    rspressPlugMentionGithub()],
});

```

## Write markdown

- Mention github user

```js
{@web-infra-dev}
```

- or pass option link map

```js
{Web Infra Dev}
```

```js
import * as path from 'path';
import { defineConfig } from 'rspress/config';

import rspressPlugMentionGithub from 'rspress-plugin-mention-github';

export default defineConfig({
  plugins: [
    rspressPlugMentionGithub({
      'Web Infra Dev': 'https://github.com/web-infra-dev',
      'Rspack': {
        link: 'https://github.com/web-infra-dev/rspack',
        imageUrl: 'https://assets.rspack.dev/rspack/rspack-logo.svg'
      },
    })],
});

```



