import { b as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute, a as renderComponent } from './astro/server_BAOhLurc.mjs';
import { u as url, a as $$Icon } from './MainGridLayout_BD3E6ahT.mjs';

const $$Astro = createAstro("https://younghakim7.github.io");
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { page, style } = Astro2.props;
  const HIDDEN = -1;
  const className = Astro2.props.class;
  const ADJ_DIST = 2;
  const VISIBLE = ADJ_DIST * 2 + 1;
  let count = 1;
  let l = page.currentPage, r = page.currentPage;
  while (0 < l - 1 && r + 1 <= page.lastPage && count + 2 <= VISIBLE) {
    count += 2;
    l--;
    r++;
  }
  while (0 < l - 1 && count < VISIBLE) {
    count++;
    l--;
  }
  while (r + 1 <= page.lastPage && count < VISIBLE) {
    count++;
    r++;
  }
  let pages = [];
  if (l > 1) pages.push(1);
  if (l == 3) pages.push(2);
  if (l > 3) pages.push(HIDDEN);
  for (let i = l; i <= r; i++) pages.push(i);
  if (r < page.lastPage - 2) pages.push(HIDDEN);
  if (r == page.lastPage - 2) pages.push(page.lastPage - 1);
  if (r < page.lastPage) pages.push(page.lastPage);
  const getPageUrl = (p) => {
    if (p == 1) return "/";
    return `/${p}/`;
  };
  return renderTemplate`${maybeRenderHead()}<div${addAttribute([className, "flex flex-row gap-3 justify-center"], "class:list")}${addAttribute(style, "style")}> <a${addAttribute(url(page.url.prev || ""), "href")}${addAttribute(page.url.prev ? "Previous Page" : null, "aria-label")}${addAttribute([
    "btn-card overflow-hidden rounded-lg text-[var(--primary)] w-11 h-11",
    { "disabled": page.url.prev == void 0 }
  ], "class:list")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "material-symbols:chevron-left-rounded", "class": "text-[1.75rem]" })} </a> <div class="bg-[var(--card-bg)] flex flex-row rounded-lg items-center text-neutral-700 dark:text-neutral-300 font-bold"> ${pages.map((p) => {
    if (p == HIDDEN)
      return renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": "material-symbols:more-horiz", "class": "mx-1" })}`;
    if (p == page.currentPage)
      return renderTemplate`<div class="h-11 w-11 rounded-lg bg-[var(--primary)] flex items-center justify-center
                    font-bold text-white dark:text-black/70"> ${p} </div>`;
    return renderTemplate`<a${addAttribute(url(getPageUrl(p)), "href")}${addAttribute(`Page ${p}`, "aria-label")} class="btn-card w-11 h-11 rounded-lg overflow-hidden active:scale-[0.85]">${p}</a>`;
  })} </div> <a${addAttribute(url(page.url.next || ""), "href")}${addAttribute(page.url.next ? "Next Page" : null, "aria-label")}${addAttribute([
    "btn-card overflow-hidden rounded-lg text-[var(--primary)] w-11 h-11",
    { "disabled": page.url.next == void 0 }
  ], "class:list")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "material-symbols:chevron-right-rounded", "class": "text-[1.75rem]" })} </a> </div>`;
}, "/Users/gy-gyoung/my_project/Rust_Lang/9999/blog/src/components/control/Pagination.astro", void 0);

const $$file = "/Users/gy-gyoung/my_project/Rust_Lang/9999/blog/src/components/control/Pagination.astro";
const $$url = undefined;

export { $$Pagination as default, $$file as file, $$url as url };
