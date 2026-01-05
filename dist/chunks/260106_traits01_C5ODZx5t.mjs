import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_BAOhLurc.mjs';

const html = () => "";

				const frontmatter = {"title":"260106_traits01","published":"2026-01-06T00:00:00.000Z","description":"trait basic 01","image":"","tags":["rust"],"category":"rust","draft":false,"lang":"","minutes":1,"words":0,"excerpt":""};
				const file = "/Users/gy-gyoung/my_project/Rust_Lang/9999/blog/src/content/posts/260106_traits01.md";
				const url = undefined;
				function rawContent() {
					return "   \n                      \n                     \n                             \n         \n            \n                \n             \n        \n   \n";
				}
				async function compiledContent() {
					return await html();
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html())}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
