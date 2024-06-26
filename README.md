
# Rspress Plugin Mention Github


![](https://private-user-images.githubusercontent.com/42096908/337617203-8892c2c8-91b4-42bd-9f5f-1f74fc2b5a8c.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTc4MTI2MTEsIm5iZiI6MTcxNzgxMjMxMSwicGF0aCI6Ii80MjA5NjkwOC8zMzc2MTcyMDMtODg5MmMyYzgtOTFiNC00MmJkLTlmNWYtMWY3NGZjMmI1YThjLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA2MDglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNjA4VDAyMDUxMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTFkMzBmM2FhNjZkOGZmMjIxZTRiMWYxZGEyOGQyOTk1NTY5OTRkYTBjOWVlZGNjNzM1M2FkNzdkNTAyZDA0OWImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.1onXuehfzTcELVxEFTQu0oebmhUjNJhrqKcDqAA8gB8)

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



