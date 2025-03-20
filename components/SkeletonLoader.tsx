import React from 'react';

const SkeletonLoader = ({ width, height, borderRadius }: {width:string, height:string, borderRadius:string}) => {
  const style = {
    width: width || '100%',
    height: height || '1rem',
    borderRadius: borderRadius || '4px',
  };

  return <div className="skeleton-loader" style={style}></div>;
};

export default SkeletonLoader;