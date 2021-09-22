// from https://loading.io/css/
import React from 'react';
import "./loader.css";

export function Loader() {

  // Alternate: Just loading text
  //   <div className="loading">Loading...</div>
  return (
   <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
  );
}
