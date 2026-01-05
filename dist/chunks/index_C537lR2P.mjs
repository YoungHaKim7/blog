import './_page_.712d4e38_CZ3ZuNus.mjs';
import { c as createComponent, r as renderTemplate, a as renderComponent } from './astro/server_BAOhLurc.mjs';
import { $ as $$MainGridLayout } from './MainGridLayout_BD3E6ahT.mjs';
import $$ArchivePanel from './ArchivePanel_K9tJg5lS.mjs';
import { i as i18n, I as I18nKey } from './content-utils_LccCArHN.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainGridLayout", $$MainGridLayout, { "title": i18n(I18nKey.archive) }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ArchivePanel", $$ArchivePanel, {})} ` })}`;
}, "/Users/gy-gyoung/my_project/Rust_Lang/9999/blog/src/pages/archive/index.astro", void 0);

const $$file = "/Users/gy-gyoung/my_project/Rust_Lang/9999/blog/src/pages/archive/index.astro";
const $$url = "/blog/archive/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _ };
