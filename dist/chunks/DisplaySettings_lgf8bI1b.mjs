import { p as push, b as escape_html, a as attr, c as pop, s as stringify } from './global.d_C9-At0if.mjs';
import { i as i18n, I as I18nKey } from './content-utils_LccCArHN.mjs';
import { getHue, getDefaultHue, setHue } from './setting-utils_rP2jN2fg.mjs';
import { I as Icon } from './MainGridLayout_BD3E6ahT.mjs';
import './_page_.712d4e38_CZ3ZuNus.mjs';

function DisplaySettings($$payload, $$props) {
	push();

	let hue = getHue();
	const defaultHue = getDefaultHue();

	if (hue || hue === 0) {
		setHue(hue);
	}

	$$payload.out += `<div id="display-setting" class="float-panel float-panel-closed absolute transition-all w-80 right-4 px-4 py-4 svelte-1s19bex"><div class="flex flex-row gap-2 mb-3 items-center justify-between"><div class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3 before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)] before:absolute before:-left-3 before:top-[0.33rem]">${escape_html(i18n(I18nKey.themeColor))} <button aria-label="Reset to Default"${attr("class", `btn-regular w-7 h-7 rounded-md active:scale-90 ${stringify([
		hue === defaultHue ? "opacity-0" : "",
		hue === defaultHue ? "pointer-events-none" : ""
	].filter(Boolean).join(" "))}`)}><div class="text-[var(--btn-content)]">`;

	Icon($$payload, {
		icon: "fa6-solid:arrow-rotate-left",
		class: "text-[0.875rem]"
	});

	$$payload.out += `<!----></div></button></div> <div class="flex gap-1"><div id="hueValue" class="transition bg-[var(--btn-regular-bg)] w-10 h-7 rounded-md flex justify-center font-bold text-sm items-center text-[var(--btn-content)]">${escape_html(hue)}</div></div></div> <div class="w-full h-6 px-1 bg-[oklch(0.80_0.10_0)] dark:bg-[oklch(0.70_0.10_0)] rounded select-none"><input${attr("aria-label", i18n(I18nKey.themeColor))} type="range" min="0" max="360"${attr("value", hue)} class="slider svelte-1s19bex" id="colorSlider" step="5" style="width: 100%"></div></div>`;
	pop();
}

export { DisplaySettings as default };
