import { PresetConfigMutator } from 'rspress-plugin-devkit';

import type { RspressPlugin } from '@rspress/shared';
import { RspressMentionLinkOptions, remarkParseMentionGithub } from './remark-plugins/parse-mention-github';

export default function rspressPlugMentionGithub(options?: RspressMentionLinkOptions): RspressPlugin {

  return {
    name: 'rspress-plugin-mention-github',
    config(config) {
      return new PresetConfigMutator(config).disableMdxRs().toConfig();
    },
    markdown: {
      remarkPlugins: [
        [remarkParseMentionGithub, options],
      ],
    },
  };
}
