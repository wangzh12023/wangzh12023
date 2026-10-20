import './styles.css';
import './i18n.css';
import { getLocale, resolveLocale, setLocale, t, type Locale, type TranslationKey } from './i18n';
import { localizeWork, localizeSmallProjects } from './data-zh';
import { defaultTheme } from './theme-default';
import { research, projects, smallProjects, type Work } from './data';

const app = document.querySelector<HTMLDivElement>('#app')!;

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

type ArchiveMedia = { file: string; en: string; zh: string };
const archiveMedia: Record<string, ArchiveMedia> = {
 Sonnet: { file: 'sonnet.png', en: 'Sonnet’s music-memory wall with movable photo postcards', zh: 'Sonnet 音乐回忆墙中的可移动照片明信片' },
 'Spatial Inventory': { file: 'spatial-inventory-3d.png', en: 'Spatial Inventory’s interactive 3D workspace', zh: 'Spatial Inventory 的交互式三维工作区' },
 Lingxi: { file: 'lingxi.png', en: 'Lingxi’s customer-service console with synthetic demonstration dialogue', zh: '灵犀客服控制台与合成演示对话' },
 'Twin Campus': { file: 'twin-campus.jpg', en: 'The procedural 3D campus scene in Twin Campus', zh: 'Twin Campus 中程序化构建的三维校园场景' },
 'Douyin Toolkit': { file: 'douyin-toolkit-settings.png', en: 'Douyin Toolkit’s actual settings interface', zh: '抖音工具箱的实际设置界面' },
 CourseBench: { file: 'coursebench.png', en: 'CourseBench’s course-sharing interface', zh: 'CourseBench 的课程分享界面' },
 'Physics Lab Resources': { file: 'physics-lab-young-modulus.png', en: 'Young’s modulus experiment: loading and unloading measurements with linear fits', zh: '杨氏模量实验：加载、卸载测量结果与线性拟合' },
 'Scientific computing & course projects': { file: 'numerical-opt-risk-return.png', en: 'Risk–return comparison of portfolio optimisation methods', zh: '投资组合优化方法的风险与收益对比' },
};
const archiveCard = (original: string[]) => {
 const p = localizeSmallProjects([original], getLocale())[0];
 const media = archiveMedia[original[0]];
 return `<article class="contribution archive-card">${media ? `<a class="archive-image-link" href="${escapeHtml(p[2])}" target="_blank" rel="noopener noreferrer"><img class="archive-image" src="/assets/projects/${media.file}" alt="${escapeHtml(media[getLocale()])}" loading="lazy" width="640" height="400"/></a>` : ''}<a class="contribution-title" href="${escapeHtml(p[2])}" target="_blank" rel="noopener noreferrer">${p[0]} ↗</a><span class="tag">${p[3]}</span><p>${p[1]}</p></article>`;
};

let observer: IntersectionObserver | undefined;
let filterValue = 'selected';
let lastFocus: HTMLElement | null = null;
let dialogId: string | null = null;
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
  <div class="profile-contacts"><a href="mailto:wangzh12023@shanghaitech.edu.cn">${uiIcon('mail')}<span>wangzh12023@shanghaitech.edu.cn</span></a><a href="mailto:zhiycc1221@gmail.com">${uiIcon('mail')}<span>zhiycc1221@gmail.com</span></a></div>
  <div class="social-links">${external('https://github.com/wangzh12023',uiIcon('github'),'social-github')}${external('https://wangzh12023.github.io/blog/',uiIcon('pen-line'),'social-writing')}${external('https://500px.com.cn/p/Lull1221',uiIcon('camera'),'social-camera')}${external('https://github.com/OpenSHTU',uiIcon('graduation-cap'),'social-openshtu')}${external('https://space.bilibili.com/455440626',uiIcon('bilibili'),'social-bilibili')}${external('https://www.xiaohongshu.com/user/profile/6503dab30000000016039f95',uiIcon('xiaohongshu'),'social-red')}</div>
  <span class="updated">${t('updated')}</span>
 </aside>
 <main class="content" id="main">
  <section class="intro" id="about" aria-label="${t('aboutLabel')}">
   <p>${t('introFirst',{school:external('https://www.shanghaitech.edu.cn/eng/',t('school')),ailab:external('https://www.shlab.org.cn/',t('ailab')),icip:external('https://www.icip.org.cn/',t('icip')),iscas:external('https://www.iscas.ac.cn/',t('iscas')),sun:external('https://www.icip.org.cn/team/sunle/',t('sun')),lu:external('https://yaojie.lu/',t('lu')),kewei:external('https://faculty.sist.shanghaitech.edu.cn/faculty/tukw/',t('kewei'))})}</p>
   <p>${t('introSecond',{school:external('https://www.shanghaitech.edu.cn/eng/',t('school')),ailab:external('https://www.shlab.org.cn/',t('ailab')),icip:external('https://www.icip.org.cn/',t('icip')),iscas:external('https://www.iscas.ac.cn/',t('iscas')),sun:external('https://www.icip.org.cn/team/sunle/',t('sun')),lu:external('https://yaojie.lu/',t('lu')),kewei:external('https://faculty.sist.shanghaitech.edu.cn/faculty/tukw/',t('kewei'))})}</p>
   <div class="callout">${t('callout',{contact:external('mailto:wangzh12023@shanghaitech.edu.cn',t('getInTouch'))})}</div>
  </section>
  <section class="section" id="news"><h2 class="section-heading">${t('news')}</h2>
   <ul class="news-list">
    <li><time class="news-time" datetime="2026-10-23">2026.10</time><span><span class="badge community">${t('upcoming')}</span> ${t('newsTalk')}</span></li>
    <li><time class="news-time" datetime="2026-09-20">2026.09</time><span>${t('newsPpt',{link:external('https://github.com/icip-cas/PPTAgent',t('pptWorkflow'))})}</span></li>
    <li><time class="news-time" datetime="2026">2026</time><span>${t('newsObject',{award:uiIcon('trophy'),demo:external('https://objecttalk-demo.vercel.app/',t('tryDemo'))})}</span></li>
    <li><time class="news-time" datetime="2026">2026</time><span>${t('newsResearch')}</span></li>
   </ul>
  </section>
  <section class="section" id="research"><div class="heading-row"><h2 class="section-heading">${t('research')}</h2><span class="badge rainbow">${t('researchBadge')}</span></div><p class="section-note">${t('researchNote')}</p><div class="research-list">${research.map(workCard).join('')}</div></section>
  <section class="section" id="open-source"><h2 class="section-heading">${t('openSource')}</h2><p class="section-note">${t('openSourceNote')}</p>
   <div class="contribution-grid">
    <article class="contribution"><a class="contribution-title" href="https://github.com/icip-cas/PPTAgent" target="_blank" rel="noopener noreferrer"><img src="/assets/projects/pptagent-logo.png" alt="" loading="lazy"/>PPTAgent</a><div class="contribution-badges"><span class="badge project">${t('openSourceContributor')}</span>${starBadge('5,133','5.1k')}</div><p>${t('pptContribution')}</p>${external('https://github.com/icip-cas/PPTAgent','GitHub ↗','evidence')}</article>
    <article class="contribution"><a class="contribution-title" href="https://github.com/HeZeBang/TechPie-flutter" target="_blank" rel="noopener noreferrer"><img src="/assets/projects/techpie-logo.png" alt="" loading="lazy"/>TechPie</a><p>${t('pieContribution')}</p>${external('https://github.com/HeZeBang/TechPie-flutter','GitHub ↗','evidence')}</article>
    <article class="contribution"><a class="contribution-title" href="https://github.com/walkinglabs/hands-on-modern-rl" target="_blank" rel="noopener noreferrer">${t('rlName')}</a><figure class="contribution-preview contribution-preview-wordmark"><img src="/assets/projects/hands-on-modern-rl.svg" alt="Hands-On Modern RL" loading="lazy" width="1600" height="440"/></figure><div class="contribution-badges"><span class="badge project">${t('openSourceContributor')}</span>${starBadge('4,724','4.7k')}</div><p>${t('rlContribution')}</p>${external('https://github.com/walkinglabs/hands-on-modern-rl','GitHub ↗','evidence')}</article>
    <article class="contribution"><span class="contribution-title">MotorMap / Windward</span><span class="badge community">${t('teamCollaboration')}</span><figure class="contribution-preview contribution-preview-portrait"><img src="/assets/projects/motormap-device.png" alt="${getLocale()==='en'?'MotorMap’s native iOS device interface':'MotorMap 原生 iOS 设备界面'}" loading="lazy" width="1206" height="2622"/><figcaption>${getLocale()==='en'?'SwiftUI prototype · Device view':'SwiftUI 原型 · 设备界面'}</figcaption></figure><p>${t('motorContribution')}</p></article>
   </div>
  </section>
  <section class="section" id="projects"><div class="heading-row"><h2 class="section-heading">${t('projects')}</h2><select class="filter" id="project-filter" aria-label="${t('filterLabel')}"><option value="selected">${t('selectedProjects')}</option><option value="all">${t('allProjects')}</option><option value="ai">${t('aiFilter')}</option><option value="systems">${t('systemsFilter')}</option><option value="vision">${t('visionFilter')}</option><option value="creative">${t('creativeFilter')}</option></select></div><p class="section-note">${t('projectNote')}</p><div class="project-list">${projects.map(workCard).join('')}</div><button id="show-projects" class="archive-toggle">${t('showAll',{count:projects.length})} ${uiIcon('arrow-down')}</button>
   <details class="more-details" id="project-archive"><summary>${t('archive')}</summary><div class="contribution-grid">${smallProjects.map(archiveCard).join('')}</div></details>
  </section>
  <section class="section" id="teaching"><h2 class="section-heading">${t('teachingCommunity')}</h2>
   <p style="font-size:.82rem;margin:6px 0">${t('teachingIntro')}</p>
   <ul class="teaching-list"><li><span><b>${t('probabilityCourse')}</b><br>${t('taSchool')}</span><small>${t('spring2026')}</small></li><li><span><b>${t('calculusCourse')}</b><br>${t('taSchool')}</span><small>${t('fall2025')}</small></li></ul>
   <div class="work-card" style="border-bottom:1px dashed #bbb"><a href="https://openshtu.github.io/Baoyan-Wiki/" target="_blank" rel="noopener noreferrer" class="work-image-link"><img src="/assets/projects/baoyan-wiki.png" alt="${t('wikiAlt')}" class="work-image" width="240" height="160" loading="lazy"/></a><div class="work-body"><span class="badge community">${t('openEducation')}</span><a class="work-title" href="https://github.com/OpenSHTU" target="_blank" rel="noopener noreferrer">${t('openShtuTitle')}</a><p class="work-description">${t('openShtuCopy')}</p><div class="work-links"><span>${external('https://openshtu.github.io/Baoyan-Wiki/',t('baoyanWiki'))}</span><span>${external('https://github.com/OpenSHTU',t('organization'))}</span></div></div></div>
   <div class="community-links">${external('https://github.com/OpenSHTU/AI-Wiki',t('aiWiki'))}${external('https://github.com/OpenSHTU',t('schoolResources'))}${external('https://github.com/wangzh12023/baoyan-resume-template',t('resumeTemplate'))}${external('https://github.com/wangzh12023/baoyan-poster-template',t('posterToolkit'))}</div>
   <article class="talk"><a href="/assets/research/sharing-poster.webp" target="_blank" rel="noopener"><img src="/assets/research/sharing-poster.webp" alt="${t('posterAlt')}" loading="lazy"/></a><div><span class="badge community" id="talk-status">${t('talkUpcoming')}</span><h3 style="font-size:.9rem;margin-top:5px">${t('talkTitle')}</h3><p>${t('talkCopy')}</p><small style="color:#888">18:30–18:55 · SIST 1A-200</small></div></article>
  </section>
  <section class="section" id="experience"><h2 class="section-heading">${t('experience')}</h2><div class="timeline">
   <article class="timeline-item"><span class="timeline-date">2025<br>– 2026</span><div class="experience-card"><div class="experience-header"><div class="org-name"><a class="organization-image organization-wide" href="https://sist.shanghaitech.edu.cn/" target="_blank" rel="noopener noreferrer"><img src="/assets/organizations/sist-logo.png" alt="" loading="lazy"/></a><div><h3 class="experience-title">${t('school')}</h3><span class="experience-sub">${t('lmRole')}</span></div></div><span class="badge research">${t('research')}</span></div><ul><li>${t('expMntp')}</li><li>${t('expAlcot')}</li><li>${t('expPt')}</li></ul></div></article>
   <article class="timeline-item"><span class="timeline-date">2024</span><div class="experience-card"><div class="experience-header"><div class="org-name"><a class="organization-image organization-lab" href="https://ieeevr.org/2023/program/social-events/" target="_blank" rel="noopener noreferrer"><img src="/assets/organizations/mars-lab-tour.png" alt="" loading="lazy"/></a><div><h3 class="experience-title">VRVC-MARS Lab</h3><span class="experience-sub">${t('visionRole')}</span></div></div><span class="badge project">${t('research')}</span></div><ul><li>${t('expPoint')}</li></ul><details class="more-details" id="point-sam-details"><summary>${t('closerLook')}</summary><a href="/assets/research/point-sam-data.webp" target="_blank" rel="noopener"><img class="experience-figure" src="/assets/research/point-sam-data.webp" alt="${t('expPoint')}" loading="lazy"/></a></details></div></article>
   <article class="timeline-item"><span class="timeline-date">2024</span><div class="experience-card"><div class="experience-header"><div class="org-name"><a class="organization-image organization-dark" href="https://hyper3d.ai/" target="_blank" rel="noopener noreferrer"><img src="/assets/organizations/hyper3d-logo.png" alt="" loading="lazy"/></a><div><h3 class="experience-title">${external('https://hyper3d.ai/',t('deemos'))}</h3><span class="experience-sub">${t('rodinRole')}</span></div></div><span class="badge project">${t('projectCollaboration')}</span></div><p>${t('expRodin')}</p><a class="experience-link" href="https://hyper3d.ai/" target="_blank" rel="noopener noreferrer">${t('rodinPlatform')}</a></div></article>
   <article class="timeline-item"><span class="timeline-date">2023<br>– 2024</span><div class="experience-card"><div class="experience-header"><div class="org-name"><a class="organization-image organization-dark" href="https://geekpie.club/" target="_blank" rel="noopener noreferrer"><img src="/assets/organizations/geekpie-icon.png" alt="" loading="lazy"/></a><div><h3 class="experience-title">${t('geekpie')}</h3><span class="experience-sub">${t('geekRole')}</span></div></div><span class="badge community">${t('community')}</span></div><p>${t('geekCopy')}</p></div></article>
  </div></section>
  <section class="section" id="education"><h2 class="section-heading">${t('education')}</h2><div class="education-card"><div class="education-head"><a class="education-brand" href="https://www.shanghaitech.edu.cn/" target="_blank" rel="noopener noreferrer"><img src="/assets/organizations/university-logo.svg" alt="${t('school')}" width="190" height="40" loading="lazy"/></a><div class="education-period">2023 — 2027<span>${t('expectedGraduation')}</span></div></div><h3 class="education-degree">${t('degree')}</h3><div class="education-metrics"><div><span class="metric-label">${t('gpa')}</span><strong>3.80<small> / 4.00</small></strong></div><div><span class="metric-label">${t('majorRank')}</span><strong>15<small> / 171</small></strong></div></div><div class="study-focus"><span>NLP</span><span>Machine Learning</span><span>Artificial Intelligence</span><span>Optimization</span></div></div></section>
  <section class="section" id="awards"><h2 class="section-heading">${t('honors')}</h2><ul class="award-list"><li><span class="award-icon">${uiIcon('trophy')}</span><span><strong>${t('firstPlace')}</strong> · ${t('hackathonAward')}</span><span class="award-year">2026</span></li><li><span class="award-icon">${uiIcon('badge-check')}</span><span><b>${t('outstandingStudent')}</b> · ${t('school')}</span><span class="award-year">2023–2024</span></li></ul></section>
  <section class="section" id="more"><h2 class="section-heading">${t('moreAbout')}</h2><div class="more-copy"><p>${t('beyondCopy')}</p><p>${t('socialCopy',{photo:external('https://500px.com.cn/p/Lull1221',t('photographyName')),red:external('https://www.xiaohongshu.com/user/profile/6503dab30000000016039f95',t('xiaohongshu')),bili:external('https://space.bilibili.com/455440626',t('bilibili'))})}</p></div><div id="photography"><p class="photography-credit">${t('photographerCredit')}</p><div class="photo-grid">${([
 ['shanghai-bund.jpg','photoBund','photoBundAlt'],['campus-autumn.jpg','photoCampus','photoCampusAlt'],['mountain-mist.jpg','photoMountain','photoMountainAlt']
 ] as const).map(([file,caption,alt])=>`<figure><a href="https://500px.com.cn/p/Lull1221" target="_blank" rel="noopener noreferrer"><img src="/assets/photography/${file}" alt="${t(alt)}" loading="lazy" width="600" height="450"/></a><figcaption>${t(caption)}</figcaption></figure>`).join('')}</div></div>
   <div class="activities" aria-label="${t('activitiesLabel')}"><div class="activity-grid"><article class="activity-card race-card"><div class="activity-eyebrow">${uiIcon('footprints')} ${t('distanceRunning')}</div><div class="race-time">1:43:17</div><h3>${t('halfMarathon')}</h3><span class="activity-year">2025 · 21.0975 km</span></article><article class="activity-card track-card"><div class="activity-eyebrow">${t('trackField')}</div><h3>${t('sportsMeet')}</h3><div class="podium-result"><span class="medal-mark silver">${uiIcon('medal')}</span><div><strong>400 m</strong><small>${t('silverMedal')}</small></div><span class="activity-year">2025</span></div><div class="podium-result"><span class="medal-mark gold">${uiIcon('medal')}</span><div><strong>4 × 100 m</strong><small>${t('goldMedal')}</small></div><span class="activity-year">2025</span></div></article></div><article class="volunteer-card"><div class="volunteer-heading">${uiIcon('heart-handshake')}<h3>${t('volunteerService')}</h3></div><div class="volunteer-event"><span>2023</span><b>${t('shanghaiMarathon')}</b></div><div class="volunteer-event"><span>2026</span><b>${t('halfMarathon')}</b></div></article></div>
  </section>
 </main>
</div>
<footer class="site-footer"><span>© ${new Date().getFullYear()} ${getLocale()==='en'?'Zihan Wang · 王子涵':'王子涵 · Zihan Wang'}</span><span>${t('footer',{credits:external('/credits.html?lang='+getLocale(),t('credits'))})}</span></footer>
<button class="back-top" aria-label="${t('backTop')}" title="${t('backTop')}">${uiIcon('arrow-up')}</button>
<dialog class="project-dialog" aria-label="${t('projectDetails')}"><div class="dialog-language">${languageSwitcher()}</div><button class="dialog-close" aria-label="${t('closeProject')}">${uiIcon('x')}</button><div class="dialog-inner"></div></dialog>`;
 const labels: Record<string, TranslationKey> = {'.social-github':'socialGithub','.social-camera':'socialCamera','.social-bilibili':'socialBilibili','.social-red':'socialRed','.social-writing':'socialWriting','.social-openshtu':'socialOpenShtu'};
 for (const [selector,key] of Object.entries(labels)){const link=app.querySelector(selector);link?.setAttribute('aria-label',t(key));link?.setAttribute('title',t(key));}
 setTheme();
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

function setTheme() {
 document.documentElement.dataset.theme=defaultTheme;
 const colours:Record<string,string>={green:'#f2f8f3',violet:'#faf9f6'};
 document.querySelector('meta[name="theme-color"]')?.setAttribute('content',colours[defaultTheme]);
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
 dialog.querySelector<HTMLElement>('.dialog-inner')!.innerHTML=`<div class="dialog-eyebrow">${work.badge}</div><h2 class="dialog-title">${work.title}</h2><p class="dialog-lede">${work.subtitle}</p><p class="work-meta">${work.meta}</p><div class="dialog-links">${work.links.filter(link=>!link.url.startsWith('#')).map(link=>external(link.url,link.label+' ↗')).join('')}</div><img class="dialog-media" src="${work.image}" alt="${escapeHtml(work.subtitle)}"/><div class="dialog-body">${work.details}${work.video?`<h3>${t('inMotion')}</h3><video controls playsinline preload="none" poster="${work.image}"><source src="${work.video}" type="video/mp4"/></video>`:''}${work.gallery?`<h3>${escapeHtml(work.galleryHeading ?? t('closerLook'))}</h3><div class="dialog-gallery">${work.gallery.map((src,index)=>{const caption=work.galleryCaptions?.[index] ?? t('projectFigure',{title:work.title,number:index+1});return `<figure><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${escapeHtml(caption)}" loading="lazy"/></a><figcaption>${escapeHtml(caption)}</figcaption></figure>`}).join('')}</div>`:''}</div>`;
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
 route();
});
document.addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false)});
render();
route();
