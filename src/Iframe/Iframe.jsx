import React, { useState, useEffect, useRef } from "react";
import Loader from "../Loader";

const Iframe = ({ source, iframeLoading, setIframeLoading }) => {
  const iframeRef = useRef(null);
  console.log({ source });

  const refreshIframe = () => {
    if (iframeRef.current) {
      // Resetting the src attribute to the same value forces the iframe to reload
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  useEffect(() => {
    if (source) {
      refreshIframe();
    }
  }, [source]);

  if (iframeLoading) {
    return <Loader loading={iframeLoading} />;
  }

  return (
    <>
      {source && (
        <iframe
          ref={iframeRef}
          src={source}
          width="100%"
          height="100%"
          title="iframe-example"
          frameBorder="0"
        />
      )}
    </>
  );
};

export default Iframe;
