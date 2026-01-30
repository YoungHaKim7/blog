# hello

![visitor badge](https://visitor-badge.laobi.icu/badge?page_id=YoungHaKim7.visitor-badge&format=true)

# 🍥Fuwari

A static blog template built with [Astro](https://astro.build).

[**🖥️ Live Demo (Vercel)**](https://fuwari.vercel.app)&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
[**📦 Old Hexo Version**](https://github.com/saicaca/hexo-theme-vivia)&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
[**🌏 中文**](https://github.com/saicaca/fuwari/blob/main/README.zh-CN.md)&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
[**🌏 日本語**](https://github.com/saicaca/fuwari/blob/main/README.ja-JP.md)&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
[**🌏 한국어**](https://github.com/saicaca/fuwari/blob/main/README.ko.md)&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
[**🌏 Español**](https://github.com/saicaca/fuwari/blob/main/README.es.md)&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
[**🌏 ไทย**](https://github.com/saicaca/fuwari/blob/main/README.th.md)

> README version: `2024-09-10`

![Preview Image](https://raw.githubusercontent.com/saicaca/resource/main/fuwari/home.png)

## ✨ Features

- [x] Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com)
- [x] Smooth animations and page transitions
- [x] Light / dark mode
- [x] Customizable theme colors & banner
- [x] Responsive design
- [ ] Comments
- [x] Search
- [ ] TOC

## 🚀 How to Use

1. [Generate a new repository](https://github.com/saicaca/fuwari/generate) from this template or fork this repository.
2. To edit your blog locally, clone your repository, run `pnpm install` AND `pnpm add sharp` to install dependencies.
   - Install [pnpm](https://pnpm.io) `npm install -g pnpm` if you haven't.
3. Edit the config file `src/config.ts` to customize your blog.
4. Run `pnpm new-post <filename>` to create a new post and edit it in `src/content/posts/`.
5. Deploy your blog to Vercel, Netlify, GitHub Pages, etc. following [the guides](https://docs.astro.build/en/guides/deploy/). You need to edit the site configuration in `astro.config.mjs` before deployment.

## ⚙️ Frontmatter of Posts

```yaml
---
title: My First Blog Post
published: 2023-09-09
description: This is the first post of my new Astro blog.
image: ./cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
lang: jp      # Set only if the post's language differs from the site's language in `config.ts`
---
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                             | Action                                           |
|:------------------------------------|:-------------------------------------------------|
| `pnpm install` AND `pnpm add sharp` | Installs dependencies                            |
| `pnpm dev`                          | Starts local dev server at `localhost:4321`      |
| `pnpm build`                        | Build your production site to `./dist/`          |
| `pnpm preview`                      | Preview your build locally, before deploying     |
| `pnpm new-post <filename>`          | Create a new post                                |
| `pnpm astro ...`                    | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro --help`                 | Get help using the Astro CLI                     |

# astro 공식 문서
- https://docs.astro.build

# Displaying content in an Astro front end
- 25.11.27.
  - https://www.sanity.io/docs/astro-quickstart/displaying-content-in-an-astro-front-end

- astro 최신 업데이트 내용
   - https://astro.build/blog/

- astro test
   - 테스팅은 제대로 작동하는 Astro 코드를 작성하고 유지하는 데 도움이 됩니다. Astro는 널리 사용되는 많은 단위 테스트, 컴포넌트 테스트, end-to-end 테스트 도구를 지원합니다. 여기에는 Jest, Mocha, Jasmine, Cypress, Playwright가 포함됩니다. 또한 여러분이 사용하는 UI 프레임워크 컴포넌트를 테스트하기 위해 React Testing Library와 같은 특정 프레임워크에 종속된 테스팅 라이브러리를 설치할 수도 있습니다.
테스팅 프레임워크를 사용해 특정 상황에서의 코드의 동작에 대한 assertions 또는 expectations를 기술하여 현재 코드의 실제 동작과 비교할 수 있습니다.
   - https://docs.astro.build/ko/guides/testing/

# fix
- ⏺ I need to add the spec collection to the content config. Let me update the file:

```ts
⏺ Update(src/content/config.ts)
  ⎿  Added 8 lines
      19      nextSlug: z.string().default(''),
      20    }),
      21  })
      22 +
      23 +const specCollection = defineCollection({
      24 +  schema: z.object({
      25 +    title: z.string().optional(),
      26 +  }),
      27 +})
      28 +
      29  export const collections = {
      30    posts: postsCollection,
      31 +  spec: specCollection,
      32  }
```

- ⏺ Fixed. I added the spec collection definition to `src/content/config.ts`:23-32. The build warning should now be resolved.
