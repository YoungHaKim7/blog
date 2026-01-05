import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_BAOhLurc.mjs';

const html = () => "<section><h1 id=\"this-article-is-a-draft\">This Article is a Draft<a class=\"anchor\" href=\"#this-article-is-a-draft\"><span class=\"anchor-icon\" data-pagefind-ignore=\"\">#</span></a></h1><p>This article is currently in a draft state and is not published. Therefore, it will not be visible to the general audience. The content is still a work in progress and may require further editing and review.</p><p>When the article is ready for publication, you can update the “draft” field to “false” in the Frontmatter:</p><pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"markdown\"><code><span class=\"line\"><span style=\"color:#E1E4E8\">---</span></span>\n<span class=\"line\"><span style=\"color:#85E89D\">title</span><span style=\"color:#E1E4E8\">: </span><span style=\"color:#9ECBFF\">Draft Example</span></span>\n<span class=\"line\"><span style=\"color:#85E89D\">published</span><span style=\"color:#E1E4E8\">: </span><span style=\"color:#79B8FF\">2024-01-11T04:40:26.381Z</span></span>\n<span class=\"line\"><span style=\"color:#85E89D\">tags</span><span style=\"color:#E1E4E8\">: [</span><span style=\"color:#9ECBFF\">Markdown</span><span style=\"color:#E1E4E8\">, </span><span style=\"color:#9ECBFF\">Blogging</span><span style=\"color:#E1E4E8\">, </span><span style=\"color:#9ECBFF\">Demo</span><span style=\"color:#E1E4E8\">]</span></span>\n<span class=\"line\"><span style=\"color:#85E89D\">category</span><span style=\"color:#E1E4E8\">: </span><span style=\"color:#9ECBFF\">Examples</span></span>\n<span class=\"line\"><span style=\"color:#85E89D\">draft</span><span style=\"color:#E1E4E8\">: </span><span style=\"color:#79B8FF\">false</span></span>\n<span class=\"line\"><span style=\"color:#E1E4E8\">---</span></span></code></pre></section>";

				const frontmatter = {"title":"Draft Example","published":"2022-07-01T00:00:00.000Z","tags":["Markdown","Blogging","Demo"],"category":"Examples","draft":true,"minutes":1,"words":72,"excerpt":"This article is currently in a draft state and is not published. Therefore, it will not be visible to the general audience. The content is still a work in progress and may require further editing and review."};
				const file = "/Users/gy-gyoung/my_project/Rust_Lang/9999/blog/src/content/posts/draft.md";
				const url = undefined;
				function rawContent() {
					return "   \n                    \n                     \n                                \n                  \n           \n   \n\n# This Article is a Draft\n\nThis article is currently in a draft state and is not published. Therefore, it will not be visible to the general audience. The content is still a work in progress and may require further editing and review.\n\nWhen the article is ready for publication, you can update the \"draft\" field to \"false\" in the Frontmatter:\n\n```markdown\n---\ntitle: Draft Example\npublished: 2024-01-11T04:40:26.381Z\ntags: [Markdown, Blogging, Demo]\ncategory: Examples\ndraft: false\n---\n";
				}
				async function compiledContent() {
					return await html();
				}
				function getHeadings() {
					return [{"depth":1,"slug":"this-article-is-a-draft","text":"This Article is a Draft#"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html())}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
