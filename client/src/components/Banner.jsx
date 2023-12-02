// import React from 'react';

function Banner({ status, children }) {
  return <div className={`banner ${status} ` + 'my-2 text-xl'}>{children}</div>;
}

export default Banner;
