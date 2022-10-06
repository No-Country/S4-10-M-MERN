import React from 'react';
import { useLottie } from "lottie-react";
import spinner from './lf30_editor_i44sejoj.json'
import './loading.css'
const Loading = () => {
    
    const style ={
        height :200,
    }

    const options = {
        animationData:spinner,
        loop: true
    };

    const { View } = useLottie(options, style);
    
  return <div className='loading'>
      {View}
  </div>;
};

export default Loading;