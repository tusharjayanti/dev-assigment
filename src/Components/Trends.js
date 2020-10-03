import React from 'react';
import Trend from 'react-trend';


function TrendCharts(props) {

   const dataTrend = props.data
  return (
    <Trend
    smooth
    autoDraw
    autoDrawDuration={3000}
    autoDrawEasing="ease-out"
    data = {dataTrend}
    gradient={['#42b3f4']}
    radius={0}
    strokeWidth={4.4}
    strokeLinecap={'square'}
  />
  );
}

export default TrendCharts;
