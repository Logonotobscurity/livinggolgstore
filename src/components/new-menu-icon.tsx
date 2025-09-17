
'use client';

import { useState } from 'react';

export function NewMenuIcon() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
        className="menu-icon-wrapper" 
        data-state={isOpen ? 'open' : 'closed'}
        onClick={() => setIsOpen(!isOpen)}
    >
      <div className="menu-icon"></div>
    </div>
  );
}
