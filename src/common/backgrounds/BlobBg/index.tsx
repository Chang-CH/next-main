"use client";

import { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import debounce from "lodash/debounce";

// isolate the client component so children of background do not need to be client component
const BlobBg = () => {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveBlob = debounce((e: MouseEvent) => {
      if (!blobRef.current) return;
      blobRef.current.animate(
        {
          left: `${e.clientX + window.scrollX}px`,
          top: `${e.clientY + window.scrollY}px`,
        },
        {
          duration: 3000,
          fill: "forwards",
        }
      );
    }, 30);

    document.onmousemove = moveBlob;
  });

  return (
    <div className={styles.divContainer}>
      <div className={styles.divBlur} />
      <div className={styles.divBlob} ref={blobRef} />
    </div>
  );
};

export default BlobBg;
