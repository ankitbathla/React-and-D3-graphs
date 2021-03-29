/* eslint-disable react-hooks/exhaustive-deps */
import React, {  useRef ,useEffect ,useState, useContext } from 'react';
import { DimensionsContext } from './DimensionsProvider';
import TheLine from './TheLineChart';
const ReactNode = (props)=>{
  const {data} =props
  const domNode = useRef(null)
  const {dimensions}= useContext(DimensionsContext)
  const [vizInitialized, setVizInitialized]= useState(false);
 
  const [canvas, createCanvas] = useState(null);
  useEffect(()=>{
    createCanvas(()=>new TheLine(domNode.current))
  },[]);
  useEffect(()=>{
    if(data.length>1 && dimensions.width && vizInitialized===false){
      canvas.init(data, dimensions);
      setVizInitialized(()=>true);
    };
  },[canvas, data, dimensions, vizInitialized]);

  useEffect(()=>{
    vizInitialized && canvas.updateDimensions(dimensions);
  },[dimensions])
  return (
    <div ref={domNode} style={{display: 'grid', height: '100%'}}/>
  )
  

};
export default (ReactNode)