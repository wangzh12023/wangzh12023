import justifiedLayout from 'justified-layout';

export function photoLayout(ratios: number[], width: number) {
 const gap=6;
 const geometry=justifiedLayout(ratios,{containerWidth:width,containerPadding:0,boxSpacing:gap,targetRowHeight:width<500?145:185,targetRowHeightTolerance:.2});
 // Fill the final row by adjusting its height, preserving each photograph's ratio.
 // Flickr's default widow behavior intentionally leaves the final row incomplete.
 if(geometry.widowCount){
  const row=geometry.boxes.slice(-geometry.widowCount);
  const height=(width-gap*(row.length-1))/row.reduce((sum,box)=>sum+box.aspectRatio,0);
  let left=0;
  for(const box of row){box.left=left;box.height=height;box.width=height*box.aspectRatio;left+=box.width+gap;}
  geometry.containerHeight=row[0].top+height;
 }
 return geometry;
}
