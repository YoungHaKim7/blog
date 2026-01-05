import './_page_.712d4e38_CZ3ZuNus.mjs';
import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from './astro/server_BAOhLurc.mjs';
import { $ as $$MainGridLayout } from './MainGridLayout_BD3E6ahT.mjs';
import { g as getEntry, i as i18n, I as I18nKey } from './content-utils_LccCArHN.mjs';
import $$Markdown from './Markdown_B56J6LQY.mjs';

const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const aboutPost = await getEntry("spec", "about");
  const { Content } = await aboutPost.render();
  return renderTemplate`${renderComponent($$result, "MainGridLayout", $$MainGridLayout, { "title": i18n(I18nKey.about), "description": i18n(I18nKey.about) }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex w-full rounded-[var(--radius-large)] overflow-hidden relative min-h-32"> <div class="card-base z-10 px-9 py-6 relative w-full "> ${renderComponent($$result2, "Markdown", $$Markdown, { "class": "mt-2" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Content", Content, {})} ` })} </div> </div> ` })}`;
}, "/Users/gy-gyoung/my_project/Rust_Lang/9999/blog/src/pages/about.astro", void 0);

const $$file = "/Users/gy-gyoung/my_project/Rust_Lang/9999/blog/src/pages/about.astro";
const $$url = "/blog/about/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$About,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _ };
