import './select.css';

/** Theme-aware, select-only combobox; the native select remains the value source. */
export function enhanceSelect(select: HTMLSelectElement): () => void {
 const events = new AbortController();
 const { signal } = events;
 const options = [...select.options];
 const wrapper = document.createElement('div');
 wrapper.className = 'theme-select';
 const trigger = document.createElement('button');
 trigger.type = 'button';
 trigger.className = 'select-trigger';
 trigger.id = `${select.id}-trigger`;
 trigger.setAttribute('role', 'combobox');
 trigger.setAttribute('aria-haspopup', 'listbox');
 trigger.setAttribute('aria-expanded', 'false');
 trigger.setAttribute('aria-label', select.getAttribute('aria-label') || select.name);
 const label = document.createElement('span');
 label.className = 'select-value';
 const chevron = document.createElement('span');
 chevron.className = 'select-chevron';
 chevron.setAttribute('aria-hidden', 'true');
 trigger.append(label, chevron);
 const panel = document.createElement('ul');
 panel.className = 'select-options';
 panel.id = `${select.id}-options`;
 panel.setAttribute('role', 'listbox');
 panel.setAttribute('aria-label', trigger.getAttribute('aria-label')!);
 panel.hidden = true;
 trigger.setAttribute('aria-controls', panel.id);
 const items = options.map((option, index) => {
  const item = document.createElement('li');
  item.id = `${select.id}-option-${index}`;
  item.className = 'select-option';
  item.setAttribute('role', 'option');
  item.textContent = option.text;
  item.addEventListener('pointerdown', event => event.preventDefault(), { signal });
  item.addEventListener('click', () => { active = index; commit(); close(); trigger.focus(); }, { signal });
  panel.append(item);
  return item;
 });
 select.before(wrapper);
 wrapper.append(select, trigger, panel);
 select.hidden = true;
 let active = select.selectedIndex;
 let search = '';
 let lastTyped = 0;
 const isOpen = () => !panel.hidden;
 function sync() {
  label.textContent = select.selectedOptions[0]?.text || '';
  items.forEach((item, index) => item.setAttribute('aria-selected', String(index === select.selectedIndex)));
 }
 function highlight() {
  items.forEach((item, index) => item.classList.toggle('is-active', index === active));
  trigger.setAttribute('aria-activedescendant', items[active].id);
  const item = items[active];
  if (item.offsetTop < panel.scrollTop) panel.scrollTop = item.offsetTop;
  else if (item.offsetTop + item.offsetHeight > panel.scrollTop + panel.clientHeight) panel.scrollTop = item.offsetTop + item.offsetHeight - panel.clientHeight;
 }
 function open() {
  if (isOpen()) return;
  active = select.selectedIndex;
  search = '';
  panel.hidden = false;
  trigger.setAttribute('aria-expanded', 'true');
  const rect = trigger.getBoundingClientRect();
  const below = window.innerHeight - rect.bottom - 16;
  panel.style.maxHeight = `${Math.max(96, Math.min(260, below))}px`;
  const width = panel.getBoundingClientRect().width;
  panel.style.left = `${Math.min(0, window.innerWidth - 16 - rect.left - width)}px`;
  highlight();
 }
 function close() {
  panel.hidden = true;
  trigger.setAttribute('aria-expanded', 'false');
  trigger.removeAttribute('aria-activedescendant');
  search = '';
 }
 function commit() {
  if (select.selectedIndex === active) return;
  select.selectedIndex = active;
  select.dispatchEvent(new Event('change', { bubbles: true }));
 }
 trigger.addEventListener('click', () => isOpen() ? close() : open(), { signal });
 trigger.addEventListener('keydown', event => {
  const { key } = event;
  if (key === 'Tab') { if (isOpen()) commit(); close(); return; }
  if (key === 'Escape') { if (isOpen()) { event.preventDefault(); event.stopPropagation(); close(); } return; }
  if (key === 'Enter' || key === ' ') {
   event.preventDefault();
   if (isOpen()) { commit(); close(); } else open();
   return;
  }
  if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(key)) {
   event.preventDefault();
   const wasOpen = isOpen();
   open();
   if (key === 'Home') active = 0;
   else if (key === 'End') active = items.length - 1;
   else if (wasOpen) active = Math.max(0, Math.min(items.length - 1, active + (key === 'ArrowDown' ? 1 : -1)));
   highlight();
  } else if (key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
   event.preventDefault();
   open();
   const now = Date.now();
   search = (now - lastTyped < 700 ? search : '') + key.toLocaleLowerCase();
   lastTyped = now;
   const query = [...search].every(letter => letter === search[0]) ? search[0] : search;
   for (let offset = 1; offset <= options.length; offset++) {
    const index = (active + offset) % options.length;
    if (options[index].text.toLocaleLowerCase().startsWith(query)) { active = index; highlight(); break; }
   }
  }
 }, { signal });
 select.addEventListener('change', sync, { signal });
 wrapper.addEventListener('focusout', event => { if (!wrapper.contains(event.relatedTarget as Node | null)) close(); }, { signal });
 document.addEventListener('pointerdown', event => { if (!wrapper.contains(event.target as Node)) close(); }, { signal });
 window.addEventListener('resize', close, { signal });
 sync();
 return () => { events.abort(); wrapper.replaceWith(select); select.hidden = false; };
}
