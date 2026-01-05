import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_BAOhLurc.mjs';

const html = () => "<p>Just copy the embed code from YouTube or other platforms, and paste it in the markdown file.</p>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"yaml\"><code><span class=\"line\"><span style=\"color:#B392F0\">---</span></span>\n<span class=\"line\"><span style=\"color:#85E89D\">title</span><span style=\"color:#E1E4E8\">: </span><span style=\"color:#9ECBFF\">Include Video in the Post</span></span>\n<span class=\"line\"><span style=\"color:#85E89D\">published</span><span style=\"color:#E1E4E8\">: </span><span style=\"color:#79B8FF\">2023-10-19</span></span>\n<span class=\"line\"><span style=\"color:#9ECBFF\">// ...</span></span>\n<span class=\"line\"><span style=\"color:#B392F0\">---</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#9ECBFF\">&#x3C;iframe width=\"100%\" height=\"468\" src=\"https://www.youtube.com/embed/5gIf0_xpFPI?si=N1WTorLKL0uwLsU_\" title=\"YouTube video player\" frameborder=\"0\" allowfullscreen>&#x3C;/iframe></span></span></code></pre>\n<section><h2 id=\"youtube\">YouTube<a class=\"anchor\" href=\"#youtube\"><span class=\"anchor-icon\" data-pagefind-ignore=\"\">#</span></a></h2><iframe width=\"100%\" height=\"468\" src=\"https://www.youtube.com/embed/5gIf0_xpFPI?si=N1WTorLKL0uwLsU_\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe></section>\n<section><h2 id=\"bilibili\">Bilibili<a class=\"anchor\" href=\"#bilibili\"><span class=\"anchor-icon\" data-pagefind-ignore=\"\">#</span></a></h2><iframe width=\"100%\" height=\"468\" src=\"//player.bilibili.com/player.html?bvid=BV1fK4y1s7Qf&#x26;p=1\" scrolling=\"no\" border=\"0\" frameborder=\"no\" framespacing=\"0\" allowfullscreen> </iframe></section>";

				const frontmatter = {"title":"Include Video in the Posts","published":"2023-08-01T00:00:00.000Z","description":"This post demonstrates how to include embedded video in a blog post.","tags":["Example","Video"],"category":"Examples","draft":false,"minutes":1,"words":61,"excerpt":"Just copy the embed code from YouTube or other platforms, and paste it in the markdown file."};
				const file = "/Users/gy-gyoung/my_project/Rust_Lang/9999/blog/src/content/posts/video.md";
				const url = undefined;
				function rawContent() {
					return "   \n                                 \n                     \n                                                                                 \n                      \n                  \n            \n   \n\nJust copy the embed code from YouTube or other platforms, and paste it in the markdown file.\n\n```yaml\n---\ntitle: Include Video in the Post\npublished: 2023-10-19\n// ...\n---\n\n<iframe width=\"100%\" height=\"468\" src=\"https://www.youtube.com/embed/5gIf0_xpFPI?si=N1WTorLKL0uwLsU_\" title=\"YouTube video player\" frameborder=\"0\" allowfullscreen></iframe>\n```\n\n## YouTube\n\n<iframe width=\"100%\" height=\"468\" src=\"https://www.youtube.com/embed/5gIf0_xpFPI?si=N1WTorLKL0uwLsU_\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>\n\n## Bilibili\n\n<iframe width=\"100%\" height=\"468\" src=\"//player.bilibili.com/player.html?bvid=BV1fK4y1s7Qf&p=1\" scrolling=\"no\" border=\"0\" frameborder=\"no\" framespacing=\"0\" allowfullscreen=\"true\"> </iframe>\n";
				}
				async function compiledContent() {
					return await html();
				}
				function getHeadings() {
					return [{"depth":2,"slug":"youtube","text":"YouTube#"},{"depth":2,"slug":"bilibili","text":"Bilibili#"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html())}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
