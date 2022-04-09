import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth, innerHeight } = window;
  return {
    innerWidth,
    innerHeight,
  };
}

export default function useWindowDimensions() {
  const [isLandscape, setIsLandscape] = useState(false);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      const { innerWidth, innerHeight } = getWindowDimensions();
      setHeight(innerHeight);
      setWidth(innerWidth);
      setIsLandscape(innerWidth > innerHeight);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isLandscape, windowWidth: width, windowHeight: height };
}
