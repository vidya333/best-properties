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
      className="fixed bottom-6 right-6 z-50 h-[74px] w-auto sm:w-auto overflow-hidden rounded-xl shadow-2xl max-sm:w-[74px]"
      style={{
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