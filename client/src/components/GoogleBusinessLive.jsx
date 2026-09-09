import React, { useEffect } from 'react';

export default function GoogleBusinessLive() {
  useEffect(() => {
    const scriptSrc = "https://grwidget.com/v1/grwidget.js";
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div 
      className="fixed bottom-0 left-4 z-40 overflow-hidden rounded-xl 
       transition-all duration-300 scale-90 origin-bottom-left hover:scale-100"
    >
      <div 
        className="grwidget-embed" 
        data-grwidget-key="ueVCwwDu7fKiE4z0V4nhRGaz"
      ></div>
    </div>
  );
}