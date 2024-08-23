import React, { useState } from 'react';
import Image from 'next/image';

const CustomToolbar = () => {
  // Warna default kuning
  const defaultColor = '#ECFDB1';

  const [showColorPicker, setShowColorPicker] = useState(false);
  const colors = ['#ECFDB1', '#C2E7F1', '#CAF6BE', '#F6BECA'];
  const [selectedColor, setSelectedColor] = useState(defaultColor);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setShowColorPicker(false);
  };

  return (
    <div id="toolbar">
      <span className="ql-formats">
        <button className="ql-color"></button>
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered"></button>
        <button className="ql-list" value="bullet"></button>
      </span>
      <span className="ql-formats">
        <button className="ql-link"></button>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            marginLeft: '8px', // memberi jarak antara tombol link dan color picker
          }}
        >
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            style={{
              width: '24px',
              height: '24px',
              padding: 0,
              backgroundColor: selectedColor || 'transparent',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <svg
              viewBox="0 0 19 18"
              style={{
                width: '25px',
                height: '25px',
                clipPath: 'circle(50%)',
              }}
            >
              <circle cx="9" cy="9" r="8.5" fill={selectedColor || 'white'} />
            </svg>
          </button>
          <Image
            src="/icons/sidebar/arrow-up.svg"
            alt="Toggle arrow"
            width={8}
            height={8}
            className="transition-transform"
            style={{
              transform: showColorPicker ? 'rotate(0deg)' : 'rotate(180deg)',
              marginLeft: '4px',
            }}
          />
          {showColorPicker && (
            <div
              className="absolute z-10 flex space-x-2 mt-6 p-2 bg-white shadow-lg rounded-md"
              style={{ top: '100%' }}
            >
              {colors.map((color) => (
                <button
                  key={color}
                  className="w-6 h-6 rounded-full border border-gray-500"
                  style={{
                    backgroundColor: color,
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                  }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>
          )}
        </span>
      </span>
    </div>
  );
};

export default CustomToolbar;
