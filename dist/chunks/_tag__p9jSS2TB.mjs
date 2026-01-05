import './_page_.712d4e38_CZ3ZuNus.mjs';
import { b as createAstro, c as createComponent, r as renderTemplate, a as renderComponent } from './astro/server_BAOhLurc.mjs';
import $$ArchivePanel from './ArchivePanel_K9tJg5lS.mjs';
import { i as i18n, I as I18nKey, a as getSortedPosts } from './content-utils_LccCArHN.mjs';
import { $ as $$MainGridLayout } from './MainGridLayout_BD3E6ahT.mjs';

const $$Astro = createAstro("https://younghakim7.github.io");
async function getStaticPaths() {
  const posts = await getSortedPosts();
  const allTags = posts.reduce((acc, post) => {
    post.data.tags.forEach((tag) => acc.add(tag));
    return acc;
  }, /* @__PURE__ */ new Set());
  const allTagsArray = Array.from(allTags);
  return allTagsArray.map((tag) => ({
    params: {
      tag
    }
  }));
}
const $$tag = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$tag;
  const tag = Astro2.params.tag;
  return renderTemplate`${renderComponent($$result, "MainGridLayout", $$MainGridLayout, { "title": i18n(I18nKey.archive), "description": i18n(I18nKey.archive) }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ArchivePanel", $$ArchivePanel, { "tags": [tag] })} ` })}`;
}, "/Users/gy-gyoung/my_project/Rust_Lang/9999/blog/src/pages/archive/tag/[tag].astro", void 0);

const $$file = "/Users/gy-gyoung/my_project/Rust_Lang/9999/blog/src/pages/archive/tag/[tag].astro";
const $$url = "/blog/archive/tag/[tag]/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$tag,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _ };
