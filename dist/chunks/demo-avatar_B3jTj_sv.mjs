const demoAvatar = new Proxy({"src":"/blog/_astro/demo-avatar.Cvm6gCwe.png","width":453,"height":334,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/gy-gyoung/my_project/Rust_Lang/9999/blog/src/assets/images/demo-avatar.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/Users/gy-gyoung/my_project/Rust_Lang/9999/blog/src/assets/images/demo-avatar.png");
							return target[name];
						}
					});

export { demoAvatar as default };
