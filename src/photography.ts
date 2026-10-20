import { photoLayout } from './photo-layout';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import './photography.css';
import photos from './photography-source.json';
import { getLocale, t } from './i18n';

const escape = (s: string) => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
export function photographyMarkup() {
 return `<div class="photography-heading"><div><h3 class="interest-heading">${t('photographyHeading')}</h3><p class="photography-credit">${t('photographerCredit')}</p></div><div class="portfolio-links"><a class="portfolio-link chip-color chip-sky" href="https://500px.com.cn/p/Lull1221" target="_blank" rel="noopener noreferrer"><span class="ui-icon" aria-hidden="true" style="--icon:url('/assets/icons/500px.svg')"></span><span>${t('morePhotography')} ↗</span></a><a class="portfolio-link chip-color chip-rose" href="https://www.xiaohongshu.com/user/profile/6503dab30000000016039f95" target="_blank" rel="noopener noreferrer"><span class="ui-icon" aria-hidden="true" style="--icon:url('/assets/icons/xiaohongshu.svg')"></span><span>${t('moreXiaohongshu')} ↗</span></a></div></div>
 <div class="photo-mosaic" id="photo-gallery">${photos.map(p => {
  const caption = getLocale()==='zh' ? p.title : p.en;
  const base='/assets/photography/'+p.file.replace(/\.jpg$/, '');
  return `<a class="photo-tile" href="${base}.jpg" data-pswp-width="${p.width}" data-pswp-height="${p.height}" data-caption="${escape(caption)}" data-source="${p.source}" aria-label="${escape(caption)} · ${t('viewPhoto')}" target="_blank" rel="noopener noreferrer"><img src="${base}-320.webp" srcset="${base}-320.webp 320w, ${base}-640.webp 640w, ${base}.jpg ${p.width}w" sizes="(max-width:620px) 46vw, 260px" width="${p.width}" height="${p.height}" alt="${escape(caption)}" loading="lazy" decoding="async"/><span class="photo-caption">${escape(caption)}<span aria-hidden="true">↗</span></span></a>`;
 }).join('')}</div><p class="gallery-note"><span>${photos.length} ${t('photographs')}</span><span>${t('galleryHint')}</span></p>`;
}

export function installPhotography(root: HTMLElement) {
 const gallery=root.querySelector<HTMLElement>('#photo-gallery')!;
 const tiles=Array.from(gallery.querySelectorAll<HTMLElement>('.photo-tile'));
 const layout=() => {
  const width=gallery.clientWidth;
  if(!width)return;
  const geometry=photoLayout(photos.map(p=>p.width/p.height),width);
  gallery.style.height=geometry.containerHeight+'px';
  gallery.classList.add('is-laid-out');
  geometry.boxes.forEach((box,i)=>{
   Object.assign(tiles[i].style,{left:box.left+'px',top:box.top+'px',width:box.width+'px',height:box.height+'px'});
   tiles[i].querySelector('img')!.sizes=Math.ceil(box.width)+'px';
  });
 };
 const resize=new ResizeObserver(layout);resize.observe(gallery);layout();
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const lightbox=new PhotoSwipeLightbox({gallery:'#photo-gallery, #running',children:'a[data-pswp-width]',pswpModule:()=>import('photoswipe'),bgOpacity:.96,showHideAnimationType:reduced?'none':'fade',closeTitle:t('closePhoto'),zoomTitle:t('zoomPhoto'),arrowPrevTitle:t('previousPhoto'),arrowNextTitle:t('nextPhoto'),errorMsg:t('photoError')});
 lightbox.on('uiRegister',()=>{
  const pswp=lightbox.pswp!;
  pswp.ui?.registerElement({name:'photo-info',order:9,isButton:false,appendTo:'root',onInit:(element)=>{
   const title=document.createElement('span');
   const source=document.createElement('a');source.target='_blank';source.rel='noopener noreferrer';source.textContent=t('photoSource')+' ↗';
   element.append(title,source);
   const update=()=>{
    const anchor=pswp.currSlide?.data.element as HTMLAnchorElement|undefined;
    title.textContent=anchor?.dataset.caption||anchor?.querySelector('img')?.alt||'';
    const url=anchor?.dataset.source;source.hidden=!url;source.href=url||'#';
   };
   pswp.on('change',update);update();
  }});
 });
 lightbox.init();
 return ()=>{resize.disconnect();lightbox.destroy();};
}
