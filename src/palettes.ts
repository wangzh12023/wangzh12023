// Shared by the homepage and the local palette review page.
export const palettes = {
 jade: { name: '青玉绿', english: 'Jade', description: '延续现在的绿色，加入青玉与浅薄荷，清透、平衡。', accent: '#2d795f', hover: '#1d5d46', secondary: '#638974', soft: '#f2f8f3', line: '#c9dfce', header: '#f5f9f7ed', glowA: '#bddfd0', glowB: '#cce6df', glowC: '#e3ead2' },
 sage: { name: '雾感鼠尾草', english: 'Sage', description: '灰绿搭配淡苔色，低饱和、安静，适合学术主页。', accent: '#4a6958', hover: '#344f40', secondary: '#71816b', soft: '#f3f6f0', line: '#d7dfce', header: '#f7f9f3ed', glowA: '#d4dec0', glowB: '#c8dcd1', glowC: '#e7e9d5' },
 mint: { name: '薄荷水绿', english: 'Mint', description: '薄荷向浅青蓝过渡，更清凉轻盈，也更有通透感。', accent: '#28766d', hover: '#19594f', secondary: '#58897e', soft: '#f0f8f6', line: '#cce4dd', header: '#f3faf9ed', glowA: '#bee7d9', glowB: '#c5e7ee', glowC: '#dceee3' },
 olive: { name: '浅苔橄榄', english: 'Olive', description: '偏暖的苔绿与浅米绿，柔和自然，带一点纸张气息。', accent: '#626d3d', hover: '#48512a', secondary: '#7c845a', soft: '#f6f7ee', line: '#dee2c9', header: '#f9f9f1ed', glowA: '#dde2ba', glowB: '#d2dfc8', glowC: '#eee8d0' },
 pine: { name: '冷杉森林', english: 'Pine', description: '更深的冷绿色，配浅尤加利与蓝灰，稳重且利落。', accent: '#305d50', hover: '#204337', secondary: '#607e73', soft: '#f0f5f3', line: '#ceddd5', header: '#f3f7f5ed', glowA: '#c1d9cb', glowB: '#cbdde2', glowC: '#dfe6d6' },
 goblin: { name: '皇冠叶绿', english: 'Goblin', description: '从皇冠哥布林的草叶绿出发，搭配浅黄绿，明快又有亲和力。', accent: '#427a26', hover: '#2e561b', secondary: '#6c924a', soft: '#f2f8e9', line: '#d1e4ba', header: '#f5faeeed', glowA: '#b8e49d', glowB: '#d0eab7', glowC: '#e3edcd' },
} as const;

export type PaletteId = keyof typeof palettes;
export const paletteIds = Object.keys(palettes) as PaletteId[];
export function resolvePalette(value: string | null): PaletteId {
 return paletteIds.find(id => id === value) ?? 'jade';
}
export function applyPalette() {
 const params = new URLSearchParams(location.search);
 const id = resolvePalette(params.get('palette'));
 const palette = palettes[id];
 document.documentElement.dataset.palette = id;
 document.documentElement.dataset.atmosphere = params.get('atmosphere') === 'off' ? 'off' : 'on';
 for (const [key, value] of Object.entries({ accent: palette.accent, 'accent-hover': palette.hover, secondary: palette.secondary, soft: palette.soft, line: palette.line, header: palette.header, 'glow-a': palette.glowA, 'glow-b': palette.glowB, 'glow-c': palette.glowC })) {
  document.documentElement.style.setProperty('--' + key, value);
 }
 document.querySelector('meta[name="theme-color"]')?.setAttribute('content', palette.soft);
}
