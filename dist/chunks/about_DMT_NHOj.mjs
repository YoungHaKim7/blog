import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_BAOhLurc.mjs';

const html = () => "<section><h1 id=\"about\">About<a class=\"anchor\" href=\"#about\"><span class=\"anchor-icon\" data-pagefind-ignore=\"\">#</span></a></h1><p>This is the demo site for <a href=\"https://github.com/YoungHaKim7/\">Gyoung</a>.</p><a id=\"GCm9la6d-card\" class=\"card-github fetch-waiting no-styling\" href=\"https://github.com/YoungHaKim7/fuwari\" target=\"_blank\" repo=\"YoungHaKim7/fuwari\"><div class=\"gc-titlebar\"><div class=\"gc-titlebar-left\"><div class=\"gc-owner\"><div id=\"GCm9la6d-avatar\" class=\"gc-avatar\"></div><div class=\"gc-user\">YoungHaKim7</div></div><div class=\"gc-divider\">/</div><div class=\"gc-repo\">fuwari</div></div><div class=\"github-logo\"></div></div><div id=\"GCm9la6d-description\" class=\"gc-description\">Waiting for api.github.com...</div><div class=\"gc-infobar\"><div id=\"GCm9la6d-stars\" class=\"gc-stars\">00K</div><div id=\"GCm9la6d-forks\" class=\"gc-forks\">0K</div><div id=\"GCm9la6d-license\" class=\"gc-license\">0K</div><span id=\"GCm9la6d-language\" class=\"gc-language\">Waiting...</span></div><script id=\"GCm9la6d-script\" type=\"text/javascript\" defer>\n      fetch('https://api.github.com/repos/YoungHaKim7/fuwari', { referrerPolicy: \"no-referrer\" }).then(response => response.json()).then(data => {\n        if (data.description) {\n          document.getElementById('GCm9la6d-description').innerText = data.description.replace(/:[a-zA-Z0-9_]+:/g, '');\n        } else {\n          document.getElementById('GCm9la6d-description').innerText = \"Description not set\"\n        }\n        document.getElementById('GCm9la6d-language').innerText = data.language;\n        document.getElementById('GCm9la6d-forks').innerText = Intl.NumberFormat('en-us', { notation: \"compact\", maximumFractionDigits: 1 }).format(data.forks).replaceAll(\" \", '');\n        document.getElementById('GCm9la6d-stars').innerText = Intl.NumberFormat('en-us', { notation: \"compact\", maximumFractionDigits: 1 }).format(data.stargazers_count).replaceAll(\" \", '');\n        const avatarEl = document.getElementById('GCm9la6d-avatar');\n        avatarEl.style.backgroundImage = 'url(' + data.owner.avatar_url + ')';\n        avatarEl.style.backgroundColor = 'transparent';\n        if (data.license?.spdx_id) {\n          document.getElementById('GCm9la6d-license').innerText = data.license?.spdx_id\n        } else {\n          document.getElementById('GCm9la6d-license').innerText = \"no-license\"\n        };\n          document.getElementById('GCm9la6d-card').classList.remove(\"fetch-waiting\");\n          console.log(\"[GITHUB-CARD] Loaded card for YoungHaKim7/fuwari | GCm9la6d.\")\n      }).catch(err => {\n        const c = document.getElementById('GCm9la6d-card');\n        c.classList.add(\"fetch-error\");\n         console.warn(\"[GITHUB-CARD] (Error) Loading card for YoungHaKim7/fuwari | GCm9la6d.\")\n      })\n    </script></a><blockquote>\n<section><h3 id=\"sources-of-images-used-in-this-site\">Sources of images used in this site<a class=\"anchor\" href=\"#sources-of-images-used-in-this-site\"><span class=\"anchor-icon\" data-pagefind-ignore=\"\">#</span></a></h3><ul>\n<li><a href=\"https://unsplash.com/\">Unsplash</a></li>\n<li><a href=\"https://www.pixiv.net/artworks/108916539\">星と少女</a> by <a href=\"https://www.pixiv.net/users/93273965\">Stella</a></li>\n<li><a href=\"https://civitai.com/posts/586908\">Rabbit - v1.4 Showcase</a> by <a href=\"https://civitai.com/user/Rabbit_YourMajesty\">Rabbit_YourMajesty</a></li>\n</ul></section>\n</blockquote></section>";

				const frontmatter = {"minutes":1,"words":24,"excerpt":"This is the demo site for Gyoung."};
				const file = "/Users/gy-gyoung/my_project/Rust_Lang/9999/blog/src/content/spec/about.md";
				const url = undefined;
				function rawContent() {
					return "# About\nThis is the demo site for [Gyoung](https://github.com/YoungHaKim7/).\n\n::github{repo=\"YoungHaKim7/fuwari\"}\n\n> ### Sources of images used in this site\n> - [Unsplash](https://unsplash.com/)\n> - [星と少女](https://www.pixiv.net/artworks/108916539) by [Stella](https://www.pixiv.net/users/93273965)\n> - [Rabbit - v1.4 Showcase](https://civitai.com/posts/586908) by [Rabbit_YourMajesty](https://civitai.com/user/Rabbit_YourMajesty)";
				}
				async function compiledContent() {
					return await html();
				}
				function getHeadings() {
					return [{"depth":1,"slug":"about","text":"About#"},{"depth":3,"slug":"sources-of-images-used-in-this-site","text":"Sources of images used in this site#"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html())}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
