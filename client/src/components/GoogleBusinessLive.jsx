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
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 50,
        height: '74px', 
        overflow: 'hidden',
        borderRadius: '12px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)'
      }}
    >
      <div 
        className="grwidget-embed" 
        data-grwidget-key="ueVCwwDu7fKiE4z0V4nhRGaz"
      ></div>
    </div>
  );
}