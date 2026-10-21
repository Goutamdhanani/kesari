import React from 'react';

export default function StudioFrame({children, onBackgroundClick, className = ''}) {
 return <div className={`landing-shell ${className}`} onClick={e => {if (e.target === e.currentTarget) onBackgroundClick?.();}}>
  <div className="landing-phone"><div className="landing-island" aria-hidden="true"/>{children}</div>
 </div>;
}
