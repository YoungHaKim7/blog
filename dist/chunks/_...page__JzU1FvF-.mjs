import './_page_.712d4e38_CZ3ZuNus.mjs';
import { b as createAstro, c as createComponent, r as renderTemplate, a as renderComponent } from './astro/server_BAOhLurc.mjs';
import $$PostPage from './PostPage_74XuDDwQ.mjs';
import $$Pagination from './Pagination_BqcQb2SZ.mjs';
import { P as PAGE_SIZE, $ as $$MainGridLayout } from './MainGridLayout_BD3E6ahT.mjs';
import { a as getSortedPosts } from './content-utils_LccCArHN.mjs';

const $$Astro = createAstro("https://younghakim7.github.io");
const getStaticPaths = async ({ paginate }) => {
  const allBlogPosts = await getSortedPosts();
  return paginate(allBlogPosts, { pageSize: PAGE_SIZE });
};
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { page } = Astro2.props;
  const len = page.data.length;
  return renderTemplate`${renderComponent($$result, "MainGridLayout", $$MainGridLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PostPage", $$PostPage, { "page": page })} ${renderComponent($$result2, "Pagination", $$Pagination, { "class": "mx-auto onload-animation", "page": page, "style": `animation-delay: calc(var(--content-delay) + ${len * 50}ms)` })} ` })}`;
}, "/Users/gy-gyoung/my_project/Rust_Lang/9999/blog/src/pages/[...page].astro", void 0);

const $$file = "/Users/gy-gyoung/my_project/Rust_Lang/9999/blog/src/pages/[...page].astro";
const $$url = "/blog/[...page]/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _ };
