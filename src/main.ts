import './styles.css';
import './i18n.css';
import { getLocale, resolveLocale, setLocale, t, type Locale, type TranslationKey } from './i18n';
import { localizeWork, localizeSmallProjects } from './data-zh';
import { defaultTheme } from './theme-default';
import { research, projects, smallProjects, type Work } from './data';

const app = document.querySelector<HTMLDivElement>('#app')!;
const icons = {
 mail:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm9 9 9-6V6l-9 6-9-6v1Z"/></svg>',
 github:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .8A11.2 11.2 0 0 0 8.46 22.6c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.03-.7.08-.68.08-.68 1.13.08 1.73 1.16 1.73 1.16 1 .1.73 2.08 3.29 1.46.1-.72.39-1.2.71-1.48-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.11-.28-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.16a10.7 10.7 0 0 1 5.61 0c2.14-1.45 3.08-1.16 3.08-1.16.61 1.55.23 2.7.11 2.98.73.79 1.16 1.8 1.16 3.03 0 4.33-2.63 5.28-5.14 5.56.4.35.76 1.03.76 2.08v3.05c0 .3.21.65.77.54A11.2 11.2 0 0 0 12 .8Z"/></svg>',
 camera:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3h8l2 3h3a2 2 0 0 1 2 2v12H1V8a2 2 0 0 1 2-2h3Zm4 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"/></svg>',
 bilibili:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 1 4 4h2l4-4 1 1-3 3h5a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h5L6 2Zm-2 7v11h14V8Zm2 3h2v4H7Zm8 0h2v4h-2Z"/></svg>'
};
const escapeHtml = (s: string) => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const uiIcon = (name: string, cls = '') => `<span class="ui-icon ${cls}" aria-hidden="true" style="--icon:url('/assets/icons/${name}.svg')"></span>`;
const external = (url: string, label: string, cls = '') => `<a href="${escapeHtml(url)}"${url.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''}${cls ? ` class="${cls}"` : ''}>${label}</a>`;
const starBadge = (count: string, short: string) => `<span class="badge award star-badge" title="${t('upstreamStars',{count})}" aria-label="${t('upstreamStars',{count})}">${uiIcon('star')} ${short} stars</span>`;
const workCard = (original: Work) => { const w = localizeWork(original, getLocale()); return `<article class="work-card" data-kind="${w.kind}" data-selected="${!!w.selected}">
 <a href="#work/${w.id}" class="work-image-link" aria-label="${escapeHtml(t('readAbout', {title:w.title}))}"><img class="work-image ${w.imageFit || ''}" src="${w.image}" alt="${escapeHtml(w.subtitle)}" width="240" height="160" loading="lazy"/><span class="image-action">${uiIcon(w.video?'play':'arrow-up-right')} ${t(w.video ? 'watchExplore' : 'explore')}</span></a>
 <div class="work-body"><span class="badge ${w.id === 'objecttalk' ? 'award' : w.kind === 'research' ? 'research' : w.kind === 'systems' ? 'tool' : 'project'}">${w.badge}</span>
 <a href="#work/${w.id}" class="work-title">${w.title}</a><p class="work-meta">${w.meta}</p><p class="work-description">${w.description}</p>
 <div class="tags">${w.tags.map((t,i) => `<span class="tag ${t==='Selected' || t==='精选' ? 'rainbow' : `tag-tone-${i%4}`}">#${t}</span>`).join('')}</div>
 <div class="work-links">${w.links.map(l => `<span>${external(l.url,l.label)}</span>`).join('')}</div></div></article>`; };

let observer: IntersectionObserver | undefined;
let filterValue = 'selected';
let lastFocus: HTMLElement | null = null;
let dialogId: string | null = null;
const themeNames = ['pink', 'violet', 'green', 'blue', 'terracotta'];
const requestedTheme = new URLSearchParams(location.search).get('theme');
let storedTheme: string | null = null;
try { storedTheme = localStorage.getItem('zihan-colour-theme'); } catch { /* Preferences are optional. */ }
let currentTheme = themeNames.includes(requestedTheme || '') ? requestedTheme! : themeNames.includes(storedTheme || '') ? storedTheme! : defaultTheme;
const languageSwitcher = () => `<div class="locale-switcher" role="group" aria-label="${t('language')}"><button type="button" data-locale="en" lang="en" aria-label="${t('switchEnglish')}" aria-pressed="${getLocale()==='en'}">EN</button><span aria-hidden="true">/</span><button type="button" data-locale="zh" lang="zh-CN" aria-label="${t('switchChinese')}" aria-pressed="${getLocale()==='zh'}">中</button></div>`;
function render() {
 observer?.disconnect();
 document.documentElement.lang = getLocale() === 'zh' ? 'zh-CN' : 'en';
 document.title = t('pageTitle');
 document.querySelector('meta[name="description"]')?.setAttribute('content',t('pageDescription'));
 document.querySelector('meta[property="og:title"]')?.setAttribute('content',t('pageTitle'));
 document.querySelector('meta[property="og:description"]')?.setAttribute('content',t('ogDescription'));
 app.innerHTML = `
<a class="skip-link" href="#main">${t('skip')}</a>
<header class="site-header"><div class="header-inner">
 <a class="brand" href="#about" aria-label="${t('home')}"><span class="brand-monogram">W<span class="brand-star">${uiIcon('sparkle')}</span></span><span>${t('name')}</span></a>
 <div class="header-tools">${languageSwitcher()}<button class="menu-toggle" type="button" aria-label="${t('openNav')}" aria-controls="navigation" aria-expanded="false">${uiIcon('menu')}</button></div>
 <nav class="nav" id="navigation" aria-label="${t('mainNav')}">${(['about','news','research','projects','teaching','education','more'] as const).map(n=>`<a href="#${n}">${t(n)}</a>`).join('')}</nav>
</div></header>
<div class="layout">
 <aside class="profile" aria-label="${t('profileLabel')}">
  <img class="portrait" src="/assets/portrait.jpg" alt="${t('portraitAlt')}" width="256" height="300" fetchpriority="high"/>
  <h1>${getLocale()==='en'?'Zihan Wang <span lang="zh-CN">王子涵</span>':'王子涵 <span lang="en">Zihan Wang</span>'}</h1><p class="profile-role">${t('profileRole')}</p>
  <div class="profile-description"><span>${uiIcon('cpu')} ${t('profileResearch')}</span><span>${uiIcon('code-xml')} ${t('profileBuilder')}</span><span>${uiIcon('camera')} ${t('profilePhoto')}</span></div>
  <div class="profile-actions"><a class="profile-action" href="#projects">${t('projects')}</a><a class="profile-action" href="/cv.html?lang=${getLocale()}" target="_blank" rel="noopener">${t('cv')}</a></div>
  <div class="social-links">${external('mailto:wangzh12023@shanghaitech.edu.cn',icons.mail,'social-mail')}${external('https://github.com/wangzh12023',icons.github,'social-github')}${external('https://500px.com.cn/p/Lull1221',icons.camera,'social-camera')}${external('https://space.bilibili.com/455440626',icons.bilibili,'social-bilibili')}${external('https://www.xiaohongshu.com/user/profile/6503dab30000000016039f95','<span style="font-size:14px">'+t('xiaohongshu')+'</span>','social-red')}</div>
  <span class="updated">${t('updated')}</span>
  <div class="theme-switcher" role="group" aria-label="${t('colourTheme')}">${(['pink','violet','green','blue','terracotta'] as const).map(theme=>`<button class="theme-dot" data-theme="${theme}" aria-label="${t(`${theme}Theme`)}" title="${t(theme)}" aria-pressed="false"></button>`).join('')}</div>
 </aside>
 <main class="content" id="main">
  <section class="intro" id="about" aria-label="${t('aboutLabel')}">
   <p>${t('introFirst',{school:external('https://www.shanghaitech.edu.cn/eng/',t('school')),kewei:external('https://faculty.sist.shanghaitech.edu.cn/faculty/tukw/',t('kewei')),lan:external('https://sist.shanghaitech.edu.cn/xulan1/main.htm',t('lan'))})}</p>
   <p>${t('introSecond')}</p>
   <div class="callout">${t('callout',{contact:external('mailto:wangzh12023@shanghaitech.edu.cn',t('getInTouch'))})}</div>
  </section>
  <section class="section" id="news"><h2 class="section-heading">${t('news')}</h2>
   <ul class="news-list">
    <li><time class="news-time" datetime="2026-10-23">2026.10</time><span><span class="badge community">${t('upcoming')}</span> ${t('newsTalk')}</span></li>
    <li><time class="news-time" datetime="2026-09-20">2026.09</time><span>${t('newsPpt',{link:external('https://github.com/icip-cas/PPTAgent/pull/254',t('pptWorkflow'))})}</span></li>
    <li><time class="news-time" datetime="2026">2026</time><span>${t('newsObject',{award:uiIcon('trophy'),demo:external('https://objecttalk-demo.vercel.app/',t('tryDemo'))})}</span></li>
    <li><time class="news-time" datetime="2026">2026</time><span>${t('newsResearch')}</span></li>
   </ul>
  </section>
  <section class="section" id="research"><div class="heading-row"><h2 class="section-heading">${t('research')}</h2><span class="badge rainbow">${t('researchBadge')}</span></div><p class="section-note">${t('researchNote')}</p><div class="research-list">${research.map(workCard).join('')}</div></section>
  <section class="section" id="projects"><div class="heading-row"><h2 class="section-heading">${t('projects')}</h2><select class="filter" id="project-filter" aria-label="${t('filterLabel')}"><option value="selected">${t('selectedProjects')}</option><option value="all">${t('allProjects')}</option><option value="ai">${t('aiFilter')}</option><option value="systems">${t('systemsFilter')}</option><option value="vision">${t('visionFilter')}</option><option value="creative">${t('creativeFilter')}</option></select></div><p class="section-note">${t('projectNote')}</p><div class="project-list">${projects.map(workCard).join('')}</div><button id="show-projects" class="archive-toggle">${t('showAll',{count:projects.length})} ${uiIcon('arrow-down')}</button>
   <details class="more-details" id="project-archive"><summary>${t('archive')}</summary><div class="contribution-grid">${localizeSmallProjects(smallProjects,getLocale()).map(p=>`<article class="contribution"><a class="contribution-title" href="${p[2]}" target="_blank" rel="noopener noreferrer">${p[0]} ↗</a><span class="tag">${p[3]}</span><p>${p[1]}</p></article>`).join('')}</div></details>
  </section>
  <section class="section" id="open-source"><h2 class="section-heading">${t('openSource')}</h2><p class="section-note">${t('openSourceNote')}</p>
   <div class="contribution-grid">
    <article class="contribution"><a class="contribution-title" href="https://github.com/icip-cas/PPTAgent" target="_blank" rel="noopener noreferrer"><img src="/assets/projects/pptagent-logo.png" alt="" loading="lazy"/>PPTAgent</a><div class="contribution-badges"><span class="badge project">${t('openSourceContributor')}</span>${starBadge('5,133','5.1k')}</div><p>${t('pptContribution')}</p>${external('https://github.com/icip-cas/PPTAgent/pull/254',t('mergedContribution'),'evidence')}</article>
    <article class="contribution"><a class="contribution-title" href="https://github.com/HeZeBang/TechPie-flutter" target="_blank" rel="noopener noreferrer"><img src="/assets/projects/techpie-logo.png" alt="" loading="lazy"/>TechPie</a><p>${t('pieContribution')}</p>${external('https://github.com/HeZeBang/TechPie-flutter/pull/48',t('feature'),'evidence')} · ${external('https://github.com/HeZeBang/TechPie-flutter/pull/115',t('improvements'),'evidence')}</article>
    <article class="contribution"><a class="contribution-title" href="https://github.com/walkinglabs/hands-on-modern-rl" target="_blank" rel="noopener noreferrer">${t('rlName')}</a><div class="contribution-badges"><span class="badge project">${t('openSourceContributor')}</span>${starBadge('4,724','4.7k')}</div><p>${t('rlContribution')}</p>${external('https://github.com/walkinglabs/hands-on-modern-rl/pull/64',t('mathRendering'),'evidence')} · ${external('https://github.com/walkinglabs/hands-on-modern-rl/pull/72',t('teachingClarity'),'evidence')}</article>
    <article class="contribution"><span class="contribution-title">MotorMap / Windward</span><span class="badge community">${t('teamCollaboration')}</span><p>${t('motorContribution')}</p></article>
   </div>
  </section>
  <section class="section" id="teaching"><h2 class="section-heading">${t('teachingCommunity')}</h2>
   <p style="font-size:.82rem;margin:6px 0">${t('teachingIntro')}</p>
   <ul class="teaching-list"><li><span><b>${t('probabilityCourse')}</b><br>${t('taSchool')}</span><small>${t('spring2026')}</small></li><li><span><b>${t('calculusCourse')}</b><br>${t('taSchool')}</span><small>${t('fall2025')}</small></li></ul>
   <div class="work-card" style="border-bottom:1px dashed #bbb"><a href="https://openshtu.github.io/Baoyan-Wiki/" target="_blank" rel="noopener noreferrer" class="work-image-link"><img src="/assets/projects/baoyan-wiki.png" alt="${t('wikiAlt')}" class="work-image" width="240" height="160" loading="lazy"/></a><div class="work-body"><span class="badge community">${t('openEducation')}</span><a class="work-title" href="https://github.com/OpenSHTU" target="_blank" rel="noopener noreferrer">${t('openShtuTitle')}</a><p class="work-description">${t('openShtuCopy')}</p><div class="work-links"><span>${external('https://openshtu.github.io/Baoyan-Wiki/',t('baoyanWiki'))}</span><span>${external('https://github.com/OpenSHTU',t('organization'))}</span></div></div></div>
   <div class="community-links">${external('https://github.com/OpenSHTU/AI-Wiki',t('aiWiki'))}${external('https://github.com/OpenSHTU',t('schoolResources'))}${external('https://github.com/wangzh12023/baoyan-resume-template',t('resumeTemplate'))}${external('https://github.com/wangzh12023/baoyan-poster-template',t('posterToolkit'))}</div>
   <article class="talk"><a href="/assets/research/sharing-poster.webp" target="_blank" rel="noopener"><img src="/assets/research/sharing-poster-header.webp" alt="${t('posterAlt')}" loading="lazy"/></a><div><span class="badge community" id="talk-status">${t('talkUpcoming')}</span><h3 style="font-size:.9rem;margin-top:5px">${t('talkTitle')}</h3><p>${t('talkCopy')}</p><small style="color:#888">18:30–18:55 · SIST 1A-200</small></div></article>
  </section>
  <section class="section" id="experience"><h2 class="section-heading">${t('experience')}</h2><div class="timeline">
   <article class="timeline-item"><span class="timeline-date">2025<br>– 2026</span><div class="experience-card"><div class="experience-header"><div class="org-name"><span class="organization-mark">NLP</span><div><h3 class="experience-title">${t('school')}</h3><span class="experience-sub">${t('lmRole')}</span></div></div><span class="badge research">${t('research')}</span></div><ul><li>${t('expMntp')}</li><li>${t('expAlcot')}</li><li>${t('expPt')}</li></ul></div></article>
   <article class="timeline-item"><span class="timeline-date">2024</span><div class="experience-card"><div class="experience-header"><div class="org-name"><span class="organization-mark">3D</span><div><h3 class="experience-title">VRVC-MARS Lab</h3><span class="experience-sub">${t('visionRole')}</span></div></div><span class="badge project">${t('research')}</span></div><ul><li>${t('expPoint')}</li></ul><details class="more-details"><summary>${t('closerLook')}</summary><a href="/assets/research/point-sam-data.webp" target="_blank" rel="noopener"><img class="experience-figure" src="/assets/research/point-sam-data.webp" alt="${t('expPoint')}" loading="lazy"/></a></details></div></article>
   <article class="timeline-item"><span class="timeline-date">2024</span><div class="experience-card"><div class="experience-header"><div class="org-name"><span class="organization-mark">R</span><div><h3 class="experience-title">${external('https://hyper3d.ai/',t('deemos'))}</h3><span class="experience-sub">${t('rodinRole')}</span></div></div><span class="badge project">${t('projectCollaboration')}</span></div><p>${t('expRodin')}</p><a class="experience-link" href="https://hyper3d.ai/" target="_blank" rel="noopener noreferrer">${t('rodinPlatform')}</a></div></article>
   <article class="timeline-item"><span class="timeline-date">2023<br>– 2024</span><div class="experience-card"><div class="experience-header"><div class="org-name"><span class="organization-mark">G</span><div><h3 class="experience-title">${t('geekpie')}</h3><span class="experience-sub">${t('geekRole')}</span></div></div><span class="badge community">${t('community')}</span></div><p>${t('geekCopy')}</p></div></article>
  </div></section>
  <section class="section" id="education"><h2 class="section-heading">${t('education')}</h2><div class="education-card"><div class="education-head"><div class="org-name"><span class="organization-mark">S</span><h3 class="education-title">${t('school')}</h3></div><span class="education-date">${t('educationPeriod')}<br><small>${t('expectedLocation')}</small></span></div><p><strong>${t('degree')}</strong></p><p>${t('gpa')}: <b>3.80 / 4.00</b> · ${t('majorRank')}: <b>15 / 171</b></p><div class="tags">${(['courseNlp','courseMl','courseAi','courseConvex','courseProb'] as const).map(key=>`<span class="tag">${t(key)}</span>`).join('')}</div><details class="more-details" id="coursework-details" style="margin-top:8px"><summary>${t('moreCoursework')}</summary><p>${t('coursework')}</p></details></div></section>
  <section class="section" id="awards"><h2 class="section-heading">${t('honors')}</h2><ul class="award-list"><li><span class="award-icon">${uiIcon('trophy')}</span><span><strong>${t('firstPlace')}</strong> · ${t('hackathonAward')}</span><span class="award-year">2026</span></li><li><span class="award-icon">${uiIcon('badge-check')}</span><span><b>${t('outstandingStudent')}</b> · ${t('school')}</span><span class="award-year">2023–2024</span></li></ul></section>
  <section class="section" id="more"><h2 class="section-heading">${t('moreAbout')}</h2><div class="more-copy"><p>${t('beyondCopy')}</p><p>${t('socialCopy',{photo:external('https://500px.com.cn/p/Lull1221',t('photographyName')),red:external('https://www.xiaohongshu.com/user/profile/6503dab30000000016039f95',t('xiaohongshu')),bili:external('https://space.bilibili.com/455440626',t('bilibili'))})}</p></div><div id="photography"><p class="photography-credit">${t('photographerCredit')}</p><div class="photo-grid">${([
 ['shanghai-bund.jpg','photoBund','photoBundAlt'],['campus-autumn.jpg','photoCampus','photoCampusAlt'],['mountain-mist.jpg','photoMountain','photoMountainAlt']
 ] as const).map(([file,caption,alt])=>`<figure><a href="https://500px.com.cn/p/Lull1221" target="_blank" rel="noopener noreferrer"><img src="/assets/photography/${file}" alt="${t(alt)}" loading="lazy" width="600" height="450"/></a><figcaption>${t(caption)}</figcaption></figure>`).join('')}</div></div>
   <details class="more-details" id="personal-details"><summary>${t('givingBack')}</summary><p>${t('runningCopy')}</p><p>${t('volunteerCopy')}</p></details>
   <div class="contact-box" id="contact"><b>${t('keepInTouch')}</b><p>${external('mailto:wangzh12023@shanghaitech.edu.cn','wangzh12023@shanghaitech.edu.cn')}</p><p>${external('mailto:zhiycc1221@gmail.com','zhiycc1221@gmail.com')}</p><div class="contact-socials">${external('https://github.com/wangzh12023','GitHub ↗')}${external('https://wangzh12023.github.io/blog/',t('writing'))}${external('https://500px.com.cn/p/Lull1221',t('photography'))}${external('https://github.com/OpenSHTU','OpenSHTU ↗')}</div></div>
  </section>
 </main>
</div>
<footer class="site-footer"><span>© ${new Date().getFullYear()} ${getLocale()==='en'?'Zihan Wang · 王子涵':'王子涵 · Zihan Wang'}</span><span>${t('footer',{credits:external('/credits.html?lang='+getLocale(),t('credits'))})}</span></footer>
<button class="back-top" aria-label="${t('backTop')}" title="${t('backTop')}">${uiIcon('arrow-up')}</button>
<dialog class="project-dialog" aria-label="${t('projectDetails')}"><div class="dialog-language">${languageSwitcher()}</div><button class="dialog-close" aria-label="${t('closeProject')}">${uiIcon('x')}</button><div class="dialog-inner"></div></dialog>`;
 const labels: Record<string, TranslationKey> = {'.social-mail':'socialMail','.social-github':'socialGithub','.social-camera':'socialCamera','.social-bilibili':'socialBilibili','.social-red':'socialRed'};
 for (const [selector,key] of Object.entries(labels)) app.querySelector(selector)?.setAttribute('aria-label', t(key));
 setTheme(currentTheme);
 app.querySelectorAll<HTMLButtonElement>('.theme-dot').forEach(button=>button.addEventListener('click',()=>{
  setTheme(button.dataset.theme!);
  try { localStorage.setItem('zihan-colour-theme',currentTheme); } catch { /* Preferences are optional. */ }
  const url=new URL(location.href);url.searchParams.set('theme',currentTheme);history.replaceState(null,'',url);
 }));
 app.querySelector<HTMLButtonElement>('.menu-toggle')!.addEventListener('click',()=>setMenu(!app.querySelector('.nav')!.classList.contains('open')));
 app.querySelectorAll<HTMLAnchorElement>('.nav a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
 const filter=app.querySelector<HTMLSelectElement>('#project-filter')!;
 filter.value=filterValue;
 filter.addEventListener('change',()=>{filterValue=filter.value;filterProjects()});
 app.querySelector('#show-projects')!.addEventListener('click',()=>{filterValue='all';filter.value=filterValue;filterProjects()});
 filterProjects();
 app.querySelectorAll<HTMLButtonElement>('[data-locale]').forEach(button=>button.addEventListener('click',()=>changeLanguage(button.dataset.locale as Locale)));
 const dialog=app.querySelector<HTMLDialogElement>('.project-dialog')!;
 dialog.querySelector('.dialog-close')!.addEventListener('click',closeWork);
 dialog.addEventListener('click',event=>{
  if(event.target!==dialog)return;
  const rect=dialog.getBoundingClientRect();
  if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeWork();
 });
 dialog.addEventListener('close',()=>{
  document.body.style.overflow='';dialog.querySelector('video')?.pause();dialogId=null;
  if(location.hash.startsWith('#work/'))history.replaceState(null,'',location.pathname+location.search+'#projects');
  if(lastFocus?.isConnected)lastFocus.focus({preventScroll:true});
 });
 app.querySelector('.back-top')!.addEventListener('click',()=>{
  window.scrollTo({top:0,behavior:'smooth'});
  history.replaceState(null,'',location.pathname+location.search+'#about');
 });
 observer=new IntersectionObserver(entries=>{
  for(const entry of entries)if(entry.isIntersecting){
   app.querySelectorAll<HTMLAnchorElement>('.nav a').forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id));
  }
 },{rootMargin:'-10% 0px -75% 0px'});
 app.querySelectorAll<HTMLAnchorElement>('.nav a').forEach(link=>{
  const section=document.getElementById(link.hash.slice(1));if(section)observer!.observe(section);
 });
 updateTopButton();
}

function setTheme(theme:string) {
 currentTheme=theme;
 document.documentElement.dataset.theme=theme;
 app.querySelectorAll<HTMLButtonElement>('.theme-dot').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.theme===theme)));
 const colours:Record<string,string>={pink:'#fff6f8',violet:'#faf9f6',green:'#f2f8f3',blue:'#f3f7fb',terracotta:'#fcf5ef'};
 document.querySelector('meta[name="theme-color"]')?.setAttribute('content',colours[theme]);
}
function setMenu(open:boolean) {
 app.querySelector('.nav')?.classList.toggle('open',open);
 const button=app.querySelector<HTMLButtonElement>('.menu-toggle');if(!button)return;
 button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',t(open?'closeNav':'openNav'));button.innerHTML=uiIcon(open?'x':'menu');
}
function filterProjects() {
 app.querySelectorAll<HTMLElement>('.project-list .work-card').forEach(card=>{
  card.hidden=filterValue==='selected'?card.dataset.selected!=='true':filterValue==='all'?false:card.dataset.kind!==filterValue;
 });
 app.querySelector<HTMLButtonElement>('#show-projects')!.hidden=filterValue!=='selected';
}
function openWork(id:string, restore?:{scroll:number;videoTime?:number;wasPlaying?:boolean}) {
 const original=[...research,...projects].find(item=>item.id===id);if(!original)return;
 const work=localizeWork(original,getLocale());
 const dialog=app.querySelector<HTMLDialogElement>('.project-dialog')!;
 if(!restore)lastFocus=document.activeElement as HTMLElement;
 dialogId=id;
 dialog.querySelector<HTMLElement>('.dialog-inner')!.innerHTML=`<div class="dialog-eyebrow">${work.badge}</div><h2 class="dialog-title">${work.title}</h2><p class="dialog-lede">${work.subtitle}</p><p class="work-meta">${work.meta}</p><div class="dialog-links">${work.links.filter(link=>!link.url.startsWith('#')).map(link=>external(link.url,link.label+' ↗')).join('')}</div><img class="dialog-media" src="${work.image}" alt="${escapeHtml(work.subtitle)}"/><div class="dialog-body">${work.details}${work.video?`<h3>${t('inMotion')}</h3><video controls playsinline preload="none" poster="${work.image}"><source src="${work.video}" type="video/mp4"/></video>`:''}${work.gallery?`<h3>${t('closerLook')}</h3><div class="dialog-gallery">${work.gallery.map((src,index)=>`<a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${escapeHtml(t('projectFigure',{title:work.title,number:index+1}))}" loading="lazy"/></a>`).join('')}</div>`:''}</div>`;
 if(!dialog.open)dialog.showModal();
 document.body.style.overflow='hidden';
 dialog.scrollTop=restore?.scroll ?? 0;
 if(restore)requestAnimationFrame(()=>{dialog.scrollTop=restore.scroll});
 const video=dialog.querySelector('video');
 if(video&&restore?.videoTime){
  video.addEventListener('loadedmetadata',()=>{video.currentTime=restore.videoTime!;if(restore.wasPlaying)void video.play().catch(()=>{});},{once:true});
  video.load();
 }
}
function route() {
 const match=location.hash.match(/^#work\/([\w-]+)$/);
 if(match)openWork(match[1]);else {const dialog=app.querySelector<HTMLDialogElement>('.project-dialog');if(dialog?.open)dialog.close();}
}
function closeWork() {
 const dialog=app.querySelector<HTMLDialogElement>('.project-dialog');if(dialog?.open)dialog.close();
 if(location.hash.startsWith('#work/'))history.replaceState(null,'',location.pathname+location.search+'#projects');
}
function changeLanguage(next:Locale, remember=true) {
 if(next===getLocale()){setLocale(next,remember);return;}
 const scroll={left:window.scrollX,top:window.scrollY};
 const openDetails=[...app.querySelectorAll<HTMLDetailsElement>('details[open]')].map(details=>details.id).filter(Boolean);
 const menuOpen=app.querySelector('.nav')!.classList.contains('open');
 const activeNav=app.querySelector<HTMLAnchorElement>('.nav a.active')?.hash;
 const oldDialog=app.querySelector<HTMLDialogElement>('.project-dialog')!;
 const openId=oldDialog.open?dialogId:null;
 const video=oldDialog.querySelector('video');
 const dialogState={scroll:oldDialog.scrollTop,videoTime:video?.currentTime,wasPlaying:video?!video.paused:false};
 video?.pause();
 setLocale(next,remember);
 render();
 for(const id of openDetails){const details=document.getElementById(id) as HTMLDetailsElement|null;if(details)details.open=true;}
 setMenu(menuOpen);
 if(activeNav)app.querySelector<HTMLAnchorElement>(`.nav a[href="${activeNav}"]`)?.classList.add('active');
 if(openId){
  lastFocus=app.querySelector<HTMLAnchorElement>(`a[href="#work/${openId}"]`);
  openWork(openId,dialogState);
 } else document.body.style.overflow='';
 window.scrollTo({...scroll,behavior:'instant' as ScrollBehavior});
 requestAnimationFrame(()=>{
  window.scrollTo({...scroll,behavior:'instant' as ScrollBehavior});
  if(openId)app.querySelector<HTMLDialogElement>('.project-dialog')!.scrollTop=dialogState.scroll;
  app.querySelector<HTMLButtonElement>(`${openId?'.project-dialog ':'.header-tools '}[data-locale="${next}"]`)?.focus({preventScroll:true});
 });
}
function updateTopButton(){app.querySelector('.back-top')?.classList.toggle('visible',window.scrollY>500)}
window.addEventListener('scroll',updateTopButton,{passive:true});
window.addEventListener('hashchange',route);
window.addEventListener('popstate',()=>{
 const next=resolveLocale();
 if(next!==getLocale())changeLanguage(next,false);
 const nextTheme=new URLSearchParams(location.search).get('theme');if(nextTheme&&themeNames.includes(nextTheme))setTheme(nextTheme);
 route();
});
document.addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false)});
render();
route();
