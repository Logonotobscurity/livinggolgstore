
'use client';

import { useState, useEffect } from 'react';

const breakpoints = {
  mobile: 768,
  tablet: 1024,
};

export function useResponsive() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
        setWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
        setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return {
    isMobile: width > 0 && width < breakpoints.mobile,
    isTablet: width >= breakpoints.mobile && width < breakpoints.tablet,
    isDesktop: width >= breakpoints.tablet,
  };
}
