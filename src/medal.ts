// Compact outline medals, using the site's muted palette and flat SVG fills.
export const medalIcon = (tone: 'gold' | 'silver') => `<span class="medal-art ${tone}" aria-hidden="true"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 44" fill="none" stroke-linecap="round" stroke-linejoin="round">
 <path class="medal-ribbon" d="M9 3h7l8 14-6 4zM20 3h7l-9 18-6-4z"/>
 <circle class="medal-disc" cx="18" cy="27" r="13.5"/>
 <circle class="medal-ring" cx="18" cy="27" r="10"/>
 <path class="medal-rank" d="${tone === 'gold' ? 'M15.5 24l3-2v10m-3 0h6' : 'M14.5 24a3.5 3.5 0 0 1 7 0c0 2-2 3.5-7 8h7'}"/>
 </svg></span>`;
