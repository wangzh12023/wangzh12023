import './palette-review.css';
import { palettes, paletteIds, resolvePalette, type PaletteId } from './palettes';

let selected = resolvePalette(new URLSearchParams(location.search).get('palette'));
const homepageUrl = (id: PaletteId, atmosphere = true) => `/?lang=en&palette=${id}${atmosphere ? '' : '&atmosphere=off'}`;
document.querySelector('#review')!.innerHTML = `
 <header class="review-heading"><div><p class="eyebrow">COLOR STUDY / 01—06</p><h1>挑一种，刚刚好的绿。</h1><p class="review-lede">通透的导航，留在身边的一点雾感。</p></div><span class="local-note">本地审阅 · 尚未发布</span></header>
 <div class="review-intro"><p>弥散背景现在<strong>随左侧个人信息持续保留</strong>，透明导航融入背景；正文保持浅白。六组使用相同布局与 Pacifico 标题。</p><p class="recommendation">新增 <b>06 皇冠叶绿</b>：呼应头像衣服和皇冠哥布林，更鲜活的一组绿色。</p></div>
 <section class="palette-grid" aria-label="六组绿色配色">${paletteIds.map((id, index) => {
  const p = palettes[id];
  return `<article class="palette-card" style="--card-accent:${p.accent};--card-a:${p.glowA};--card-b:${p.glowB};--card-c:${p.glowC}">
   <button type="button" class="palette-preview" data-palette="${id}" aria-pressed="${selected === id}" aria-label="预览${p.name}"><span class="palette-number">0${index + 1}</span><span class="sample-title">Hello,<br>a little greener.</span><span class="sample-rule"></span><span class="sample-caption">${p.english.toUpperCase()} / ${p.accent.toUpperCase()}</span><span class="selected-mark" aria-hidden="true">✓</span></button>
   <div class="palette-copy"><h2>${p.name}<span>${p.english}</span></h2><p>${p.description}</p><div class="swatches" aria-label="配色值">${[p.accent, p.glowA, p.glowB].map(color => `<span><i style="background:${color}"></i>${color.toUpperCase()}</span>`).join('')}</div><a href="${homepageUrl(id)}" target="_blank" rel="noopener">打开完整主页 ↗</a></div>
  </article>`;
 }).join('')}</section>
 <section class="live-section" aria-labelledby="live-title"><div class="preview-toolbar"><div><p class="eyebrow">IN CONTEXT</p><h2 id="live-title">放回主页，看整体效果</h2></div><div class="preview-controls"><label><input id="atmosphere" type="checkbox" checked /> 弥散背景</label><a id="full-preview" target="_blank" rel="noopener">完整预览 ↗</a></div></div><p class="preview-hint">点击上方色卡切换；关闭「弥散背景」可对比纯色效果。完整预览支持中英文和手机布局。</p><iframe id="live-preview" title="所选绿色方案的主页实时预览" src="${homepageUrl(selected)}"></iframe></section>
 <footer>本页仅用于本地选择配色；不会出现在主页导航中。中文预览：完整主页右上角「中」。</footer>`;

const toggle = document.querySelector<HTMLInputElement>('#atmosphere')!;
function updatePreview() {
 const url = homepageUrl(selected, toggle.checked);
 document.querySelector<HTMLIFrameElement>('#live-preview')!.src = url;
 document.querySelector<HTMLAnchorElement>('#full-preview')!.href = url;
 document.querySelectorAll<HTMLButtonElement>('[data-palette]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.palette === selected)));
 const reviewUrl = new URL(location.href);
 reviewUrl.searchParams.set('palette', selected);
 history.replaceState(null, '', reviewUrl);
}
document.querySelectorAll<HTMLButtonElement>('[data-palette]').forEach(button => button.addEventListener('click', () => {
 selected = resolvePalette(button.dataset.palette ?? null);
 updatePreview();
}));
toggle.addEventListener('change', updatePreview);
document.querySelector<HTMLAnchorElement>('#full-preview')!.href = homepageUrl(selected);
