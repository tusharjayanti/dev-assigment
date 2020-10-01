import React from 'react';
import Trend from 'react-trend';


function pp() {
  return (
    <Trend
    smooth
    autoDraw
    autoDrawDuration={3000}
    autoDrawEasing="ease-out"
    // data={[0,2,5,9,5,10,3,5,0,0,1,8,2,9,0]}
    data={[178, 166, 153, 162, 185, 192, 187, 153, 154, 128, 159, 160, 186, 180, 167, 155, 148, 156, 178, 207]}
    gradient={['#42b3f4']}
    radius={0}
    strokeWidth={4.4}
    strokeLinecap={'square'}
  />
  );
}

export default pp;
