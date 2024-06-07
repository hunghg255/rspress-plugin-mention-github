import { unistVisit, type RemarkPluginFactory } from 'rspress-plugin-devkit';

export interface ParsedRspressMention {
  text?: string
  link: string
  type?: string
  class?: string[]
  imageUrl?: string
}

const reHtmlProtocol = /^https?:\/\//i
const reGitHubScope = /^(?:https?:\/\/)?github\.com\/([\w_-]*?)(?:$|\/)/

export interface ParsedRspressMention {
  text?: string
  link: string
  type?: string
  class?: string[]
  imageUrl?: string
}

export interface ResolvedRspressMention extends Required<ParsedRspressMention> { }

export interface RspressMentionHandler {
  name: string
  handler: (content: string) => ParsedRspressMention | void | false
  postprocess?: (parsed: ResolvedRspressMention) => ResolvedRspressMention | void
}

export interface RspressMentionHandlerLinkOptions {
  /**
   * Map of link names to URLs. Case-sensitive.
   *
   * For example, `{ 'Google': 'https://google.com' }` will allow you to use `{Google}` in your markdown without specifying the URL
   */
  linksMap?: Record<string, string | { link: string, imageUrl?: string }>
}

export interface RspressMentionLinkOptions extends RspressMentionHandlerLinkOptions {
  handlers?: RspressMentionHandler[]

  /**
   * Array of RegExp and string pairs to override the default image URL
   */
  imageOverrides?: [RegExp | string, string][]
}

const GITHUB_SPECIAL_ROUTES = [
  'settings',
  'pulls',
  'issues',
  'discussions',
  'sponsor',
  'sponsors',
  'notifications',
]

export function handlerLink(options?: RspressMentionHandlerLinkOptions): RspressMentionHandler {
  return {
    name: 'link',
    handler(content: string) {
      const parts = content.split('|').map(i => i.trim())
      let text = parts[0]
      let url: string | undefined = parts.length > 1
        ? parts[1]
        : undefined
      const type = 'link'
      let imageUrl: string | undefined

      let linkDefaults = text ? options?.linksMap?.[text] : undefined
      if (typeof linkDefaults === 'string')
        linkDefaults = { link: linkDefaults }

      url ||= linkDefaults?.link || parts[0]
      imageUrl ||= linkDefaults?.imageUrl

      if (!url?.match(/^https?:\/\//))
        return false

      text ||= url.replace(reHtmlProtocol, '')
      imageUrl ||= `https://favicon.yandex.net/favicon/${new URL(url || '').hostname}`

      return {
        text,
        link: url,
        type,
        imageUrl,
      }
    },
  }
}

export function handlerGitHubAt(): RspressMentionHandler {
  return {
    name: 'github-at',
    handler(content: string) {
      const parts = content.split('|').map(i => i.trim())
      const loginAt = parts[0]
      const text = parts[1]
      const link = parts[2]

      if (!loginAt.startsWith('@'))
        return false

      const login = loginAt.slice(1)
      return {
        text: text || login.toUpperCase(),
        link: link || `https://github.com/${login}`,
        type: 'github-at',
        imageUrl: `https://github.com/${login}.png`,
      }
    },
    postprocess(parsed: ResolvedRspressMention) {
      if (parsed.link.match(reGitHubScope) && parsed.type !== 'github-at') {
        const login = parsed.link.match(reGitHubScope)![1]
        if (!GITHUB_SPECIAL_ROUTES.includes(login) && parsed.imageUrl.startsWith('https://favicon.yandex.net'))
          parsed.imageUrl = `https://github.com/${login}.png`
      }
    },
  }
}

export function parseRspressMention(content: string, handlers: RspressMentionHandler[]) {
  for (const handler of handlers) {
    const parsed = handler.handler(content)
    if (parsed)
      return parsed
  }
  return false
}

//@ts-expect-error
export const remarkParseMentionGithub: RemarkPluginFactory = (options?:  RspressMentionLinkOptions) => {
  const {
    handlers = [
      handlerLink(options),
      handlerGitHubAt(),
    ],
  } = options ?? {};

  return (tree, vfile) => {
    unistVisit(tree, 'text', (node, i, parent) => {
      const { value } = node;

      if (!value) return;

      const valueSplit = value.split(/\{([^}]+)\}/i);
      const matches = (value.match(/\{([^}]+)\}/g) ?? []).map(function(val) {
        return val.replace(/[\{\}]/g, '');
      });

      const newChild = [] as any;

      if (!matches.length) return;

      valueSplit.forEach((part, index) => {
        const isMention = matches.includes(part);

        if (!isMention) {
          newChild.push({
            type: 'text',
            value: part,
          });
        } else {
          const parsed = parseRspressMention(part, handlers) as any;


          if (!parsed) {
            newChild.push({
              type: 'text',
              value: part,
            });
            return;
          }

          let resolved = {
            class: [],
            ...parsed,
          } as ResolvedRspressMention

          resolved.link = parsed.link
          resolved.class.push('rspress-mention-link', `rspress-mention-link-${parsed.type}`)
          resolved.text ||= resolved.link.replace(reHtmlProtocol, '')
          resolved.imageUrl ||= `https://favicon.yandex.net/favicon/${new URL(resolved.link || '').hostname}`

          for (const handler of handlers)
            resolved = handler.postprocess?.(resolved) || resolved

          for (const [regex, value] of options?.imageOverrides || []) {
            if (typeof regex === 'string' ? resolved.link === regex : resolved.link.match(regex)) {
              resolved.imageUrl = value
              break
            }
          }

          newChild.push({
            type: 'link',
            title: null,
            url: resolved.link,
            data: {
              hProperties: { className: ['rspress-mention-link', `rspress-mention-link-${resolved.type}`] }
            },
            children: [
              {
                type: 'inlineCode',
                data: {
                  hName: 'span',
                  hProperties: {
                    className: ['rspress-mention-link-image'],
                    style: [`background-image: url(${resolved.imageUrl})`]
                  }
                },
                value: ''
              },
              {
                type: 'text',
                value: resolved.text,
              },
            ]
          })
        }

      });

      parent!.children = newChild;
    });
  };
}

