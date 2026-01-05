import { b as createAstro, c as createComponent, g as defineStyleVars, r as renderTemplate, m as maybeRenderHead, d as addAttribute, a as renderComponent } from './astro/server_BAOhLurc.mjs';
import path from 'path';
import $$PostMeta from './PostMeta_BgFcmvyE.mjs';
import { c as getDir, b as $$ImageWrapper, a as $$Icon } from './MainGridLayout_BD3E6ahT.mjs';
import { i as i18n, I as I18nKey } from './content-utils_LccCArHN.mjs';

const $$Astro = createAstro("https://younghakim7.github.io");
const $$PostCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PostCard;
  const {
    entry,
    title,
    url,
    published,
    updated,
    tags,
    category,
    image,
    description,
    style
  } = Astro2.props;
  const className = Astro2.props.class;
  const hasCover = image !== void 0 && image !== null && image !== "";
  const coverWidth = "28%";
  const { remarkPluginFrontmatter } = await entry.render();
  const $$definedVars = defineStyleVars([{ coverWidth }]);
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["card-base flex flex-col-reverse md:flex-col w-full rounded-[var(--radius-large)] overflow-hidden relative", className], "class:list")}${addAttribute(`${style}; ${$$definedVars}`, "style")} data-astro-cid-iyiqi2so> <div${addAttribute(["pl-6 md:pl-9 pr-6 md:pr-2 pt-6 md:pt-7 pb-6 relative", { "w-full md:w-[calc(100%_-_52px_-_12px)]": !hasCover, "w-full md:w-[calc(100%_-_var(--coverWidth)_-_12px)]": hasCover }], "class:list")} data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}> <a${addAttribute(url, "href")} class="transition group w-full block font-bold mb-3 text-3xl text-90
        hover:text-[var(--primary)] dark:hover:text-[var(--primary)]
        active:text-[var(--title-active)] dark:active:text-[var(--title-active)]
        before:w-1 before:h-5 before:rounded-md before:bg-[var(--primary)]
        before:absolute before:top-[35px] before:left-[18px] before:hidden md:before:block
        " data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}> ${title} ${renderComponent($$result, "Icon", $$Icon, { "class": "inline text-[2rem] text-[var(--primary)] md:hidden translate-y-0.5 absolute", "name": "material-symbols:chevron-right-rounded", "data-astro-cid-iyiqi2so": true })} ${renderComponent($$result, "Icon", $$Icon, { "class": "text-[var(--primary)] text-[2rem] transition hidden md:inline absolute translate-y-0.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0", "name": "material-symbols:chevron-right-rounded", "data-astro-cid-iyiqi2so": true })} </a> <!-- metadata --> ${renderComponent($$result, "PostMetadata", $$PostMeta, { "published": published, "updated": updated, "tags": tags, "category": category, "hideTagsForMobile": true, "hideUpdateDate": true, "class": "mb-4", "data-astro-cid-iyiqi2so": true })} <!-- description --> <div${addAttribute(["transition text-75 mb-3.5 pr-4", { "line-clamp-2 md:line-clamp-1": !description }], "class:list")} data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}> ${description || remarkPluginFrontmatter.excerpt} </div> <!-- word count and read time  --> <div class="text-sm text-black/30 dark:text-white/30 flex gap-4 transition" data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}> <div data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}>${remarkPluginFrontmatter.words} ${" " + i18n(I18nKey.wordsCount)}</div> <div data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}>|</div> <div data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}>${remarkPluginFrontmatter.minutes} ${" " + i18n(I18nKey.minutesCount)}</div> </div> </div> ${hasCover && renderTemplate`<a${addAttribute(url, "href")}${addAttribute(title, "aria-label")}${addAttribute([
    "group",
    "max-h-[20vh] md:max-h-none mx-4 mt-4 -mb-2 md:mb-0 md:mx-0 md:mt-0",
    "md:w-[var(--coverWidth)] relative md:absolute md:top-3 md:bottom-3 md:right-3 rounded-xl overflow-hidden active:scale-95"
  ], "class:list")} data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}> <div class="absolute pointer-events-none z-10 w-full h-full group-hover:bg-black/30 group-active:bg-black/50 transition" data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}></div> <div class="absolute pointer-events-none z-20 w-full h-full flex items-center justify-center " data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "material-symbols:chevron-right-rounded", "class": "transition opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 text-white text-5xl", "data-astro-cid-iyiqi2so": true })} </div> ${renderComponent($$result, "ImageWrapper", $$ImageWrapper, { "src": image, "basePath": path.join("content/posts/", getDir(entry.id)), "alt": "Cover Image of the Post", "class": "w-full h-full", "data-astro-cid-iyiqi2so": true })} </a>`} ${!hasCover && renderTemplate`<a${addAttribute(url, "href")}${addAttribute(title, "aria-label")} class="!hidden md:!flex btn-regular w-[3.25rem]
         absolute right-3 top-3 bottom-3 rounded-xl bg-[var(--enter-btn-bg)]
         hover:bg-[var(--enter-btn-bg-hover)] active:bg-[var(--enter-btn-bg-active)] active:scale-95
        " data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "material-symbols:chevron-right-rounded", "class": "transition text-[var(--primary)] text-4xl mx-auto", "data-astro-cid-iyiqi2so": true })} </a>`} </div> <div class="transition border-t-[1px] border-dashed mx-6 border-black/10 dark:border-white/[0.15] last:border-t-0 md:hidden" data-astro-cid-iyiqi2so${addAttribute($$definedVars, "style")}></div> `;
}, "/Users/gy-gyoung/my_project/Rust_Lang/9999/blog/src/components/PostCard.astro", void 0);

const $$file = "/Users/gy-gyoung/my_project/Rust_Lang/9999/blog/src/components/PostCard.astro";
const $$url = undefined;

export { $$PostCard as default, $$file as file, $$url as url };
