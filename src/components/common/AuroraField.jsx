import React, {useEffect, useRef} from 'react';

export default function AuroraField({variant = 'ambient'}) {
 const field = useRef(null);
 useEffect(() => {
  const update = () => {if (field.current) field.current.dataset.paused = String(document.hidden);};
  update(); document.addEventListener('visibilitychange', update);
  return () => document.removeEventListener('visibilitychange', update);
 }, []);
 return <div ref={field} className={`aurora-field aurora-field--${variant}`} aria-hidden="true">
  <img className="liquid-reference-art" src="/assets/liquid-flow-reference-v1.png" alt="" fetchPriority={variant === 'landing' ? 'high' : 'auto'} draggable="false"/>
 </div>;
}
