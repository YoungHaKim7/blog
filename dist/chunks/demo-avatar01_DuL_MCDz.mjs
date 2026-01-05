const demoAvatar01 = new Proxy({"src":"/blog/_astro/demo-avatar01.CxcI0ivM.png","width":512,"height":512,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/gy-gyoung/my_project/Rust_Lang/9999/blog/src/assets/images/demo-avatar01.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/Users/gy-gyoung/my_project/Rust_Lang/9999/blog/src/assets/images/demo-avatar01.png");
							return target[name];
						}
					});

export { demoAvatar01 as default };
