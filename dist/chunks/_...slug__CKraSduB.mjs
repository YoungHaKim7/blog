import './_page_.712d4e38_CZ3ZuNus.mjs';
import { b as createAstro, c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead, d as addAttribute, u as unescapeHTML } from './astro/server_BAOhLurc.mjs';
import path from 'node:path';
import { p as profileConfig, s as siteConfig, c as getCollection, i as i18n, I as I18nKey, l as licenseConfig } from './content-utils_LccCArHN.mjs';
import $$License from './License_Ufum9j2U.mjs';
import $$Markdown from './Markdown_B56J6LQY.mjs';
import { $ as $$MainGridLayout, a as $$Icon, b as $$ImageWrapper, c as getDir, g as getPostUrlBySlug } from './MainGridLayout_BD3E6ahT.mjs';
import $$PostMeta from './PostMeta_BgFcmvyE.mjs';
import { formatDateToYYYYMMDD } from './date-utils_OyTxlY41.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://younghakim7.github.io");
async function getStaticPaths() {
  const blogEntries = await getCollection("posts", ({ data }) => {
    return data.draft !== true ;
  });
  return blogEntries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry }
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { entry } = Astro2.props;
  const { Content, headings } = await entry.render();
  const { remarkPluginFrontmatter } = await entry.render();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: entry.data.title,
    description: entry.data.description || entry.data.title,
    keywords: entry.data.tags,
    author: {
      "@type": "Person",
      name: profileConfig.name,
      url: Astro2.site
    },
    datePublished: formatDateToYYYYMMDD(entry.data.published),
    inLanguage: entry.data.lang ? entry.data.lang.replace("_", "-") : siteConfig.lang.replace("_", "-")
    // TODO include cover image here
  };
  return renderTemplate`${renderComponent($$result, "MainGridLayout", $$MainGridLayout, { "banner": entry.data.image, "title": entry.data.title, "description": entry.data.description, "lang": entry.data.lang, "setOGTypeArticle": true, "headings": headings }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="flex w-full rounded-[var(--radius-large)] overflow-hidden relative mb-4"> <div id="post-container"${addAttribute([
    "card-base z-10 px-6 md:px-9 pt-6 pb-4 relative w-full ",
    {}
  ], "class:list")}> <!-- word count and reading time --> <div class="flex flex-row text-black/30 dark:text-white/30 gap-5 mb-3 transition onload-animation"> <div class="flex flex-row items-center"> <div class="transition h-6 w-6 rounded-md bg-black/5 dark:bg-white/10 text-black/50 dark:text-white/50 flex items-center justify-center mr-2"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "material-symbols:notes-rounded" })} </div> <div class="text-sm">${remarkPluginFrontmatter.words} ${" " + i18n(I18nKey.wordsCount)}</div> </div> <div class="flex flex-row items-center"> <div class="transition h-6 w-6 rounded-md bg-black/5 dark:bg-white/10 text-black/50 dark:text-white/50 flex items-center justify-center mr-2"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "material-symbols:schedule-outline-rounded" })} </div> <div class="text-sm">${remarkPluginFrontmatter.minutes} ${" " + i18n(I18nKey.minutesCount)}</div> </div> </div> <!-- title --> <div class="relative onload-animation"> <div data-pagefind-body data-pagefind-weight="10" data-pagefind-meta="title" class="transition w-full block font-bold mb-3
                    text-3xl md:text-[2.25rem]/[2.75rem]
                    text-black/90 dark:text-white/90
                    md:before:w-1 before:h-5 before:rounded-md before:bg-[var(--primary)]
                    before:absolute before:top-[0.75rem] before:left-[-1.125rem]
                "> ${entry.data.title} </div> </div> <!-- metadata --> <div class="onload-animation"> ${renderComponent($$result2, "PostMetadata", $$PostMeta, { "class": "mb-5", "published": entry.data.published, "updated": entry.data.updated, "tags": entry.data.tags, "category": entry.data.category })} ${!entry.data.image && renderTemplate`<div class="border-[var(--line-divider)] border-dashed border-b-[1px] mb-5"></div>`} </div> <!-- always show cover as long as it has one --> ${entry.data.image && renderTemplate`${renderComponent($$result2, "ImageWrapper", $$ImageWrapper, { "id": "post-cover", "src": entry.data.image, "basePath": path.join("content/posts/", getDir(entry.id)), "class": "mb-8 rounded-xl banner-container onload-animation" })}`} ${renderComponent($$result2, "Markdown", $$Markdown, { "class": "mb-6 markdown-content onload-animation" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Content", Content, {})} ` })} ${licenseConfig.enable && renderTemplate`${renderComponent($$result2, "License", $$License, { "title": entry.data.title, "slug": entry.slug, "pubDate": entry.data.published, "class": "mb-6 rounded-xl license-container onload-animation" })}`} </div> </div> <div class="flex flex-col md:flex-row justify-between mb-4 gap-4 overflow-hidden w-full"> <a${addAttribute(entry.data.nextSlug ? getPostUrlBySlug(entry.data.nextSlug) : "#", "href")}${addAttribute(["w-full font-bold overflow-hidden active:scale-95", { "pointer-events-none": !entry.data.nextSlug }], "class:list")}> ${entry.data.nextSlug && renderTemplate`<div class="btn-card rounded-2xl w-full h-[3.75rem] max-w-full px-4 flex items-center !justify-start gap-4"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "material-symbols:chevron-left-rounded", "class": "text-[2rem] text-[var(--primary)]" })} <div class="overflow-hidden transition overflow-ellipsis whitespace-nowrap max-w-[calc(100%_-_3rem)] text-black/75 dark:text-white/75"> ${entry.data.nextTitle} </div> </div>`} </a> <a${addAttribute(entry.data.prevSlug ? getPostUrlBySlug(entry.data.prevSlug) : "#", "href")}${addAttribute(["w-full font-bold overflow-hidden active:scale-95", { "pointer-events-none": !entry.data.prevSlug }], "class:list")}> ${entry.data.prevSlug && renderTemplate`<div class="btn-card rounded-2xl w-full h-[3.75rem] max-w-full px-4 flex items-center !justify-end gap-4"> <div class="overflow-hidden transition overflow-ellipsis whitespace-nowrap max-w-[calc(100%_-_3rem)] text-black/75 dark:text-white/75"> ${entry.data.prevTitle} </div> ${renderComponent($$result2, "Icon", $$Icon, { "name": "material-symbols:chevron-right-rounded", "class": "text-[2rem] text-[var(--primary)]" })} </div>`} </a> </div> `, "head": ($$result2) => renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "</script>"])), unescapeHTML(JSON.stringify(jsonLd))) })}`;
}, "/Users/gy-gyoung/my_project/Rust_Lang/9999/blog/src/pages/posts/[...slug].astro", void 0);
const $$file = "/Users/gy-gyoung/my_project/Rust_Lang/9999/blog/src/pages/posts/[...slug].astro";
const $$url = "/blog/posts/[...slug]/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _ };
