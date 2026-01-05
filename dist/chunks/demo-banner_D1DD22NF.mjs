const demoBanner = new Proxy({"src":"/blog/_astro/demo-banner.WD4SMgz_.png","width":1920,"height":1369,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/gy-gyoung/my_project/Rust_Lang/9999/blog/src/assets/images/demo-banner.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/Users/gy-gyoung/my_project/Rust_Lang/9999/blog/src/assets/images/demo-banner.png");
							return target[name];
						}
					});

export { demoBanner as default };
