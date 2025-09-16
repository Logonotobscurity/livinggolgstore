'use client';

import React, { useState } from 'react';
import '../app/new-menu-icon.css';

export function NewMenuIcon() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <input
        type="checkbox"
        id="menu-toggle"
        className="menu-icon-checkbox"
        checked={isOpen}
        onChange={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      />
      <label htmlFor="menu-toggle" className="menu-icon-wrapper" aria-label="Toggle menu">
        <div className="menu-icon"></div>
      </label>
    </>
  );
}
