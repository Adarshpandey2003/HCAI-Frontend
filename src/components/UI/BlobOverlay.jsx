// src/components/UI/BlobOverlay.jsx
import React, { useEffect, useRef } from 'react';
import Rellax from 'rellax';

export default function BlobOverlay({ style }) {
  const ref = useRef();
  useEffect(() => {
    new Rellax(ref.current, { speed: -2, center: true });
  }, []);
  return (
    <img
      ref={ref}
      src="/blob.svg"            // ← public/blob.svg is served at the root
      alt=""
      className="blob"
      style={style}
    />
  );
}
