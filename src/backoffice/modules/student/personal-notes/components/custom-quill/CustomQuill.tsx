import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sketch } from '@uiw/react-color';

interface CustomToolbarProps {
  onColorChange: (color: string) => void;
}

const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const CustomToolbar: React.FC<CustomToolbarProps> = ({ onColorChange }) => {
  const defaultColor = '#ECFDB1';
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [customColors, setCustomColors] = useState<string[]>(() => {
    const savedColors = localStorage.getItem('customColors');
    return savedColors ? JSON.parse(savedColors) : ['#ECFDB1', '#C2E7F1', '#CAF6BE', '#F6BECA'];
  });
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [showCustomColorPicker, setShowCustomColorPicker] = useState(false);
  const [customColor, setCustomColor] = useState('');

  useEffect(() => {
    localStorage.setItem('customColors', JSON.stringify(customColors));
  }, [customColors]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setShowColorPicker(false);
    onColorChange(color);
  };

  const handleCustomColorChange = (color: string) => {
    setCustomColor(color);
  };

  const handleAddCustomColor = () => {
    if (customColor && !customColors.includes(customColor)) {
      setCustomColors((prevColors) => [...prevColors, customColor]);
      setSelectedColor(customColor);
      setShowCustomColorPicker(false);
      onColorChange(customColor);
    }
  };

  return (
    <div id="toolbar">
      <span className="ql-formats">
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
            marginLeft: '8px',
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
              {customColors.map((color) => (
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
              <button
                className="w-6 h-6 rounded-full border border-gray-500"
                style={{
                  background: 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                }}
                onClick={() => setShowCustomColorPicker(true)}
              />
              {showCustomColorPicker && (
                <div className="absolute z-20 mt-6 p-2 bg-white shadow-lg rounded-md">
                  <Sketch
                    color={customColor}
                    onChange={(color) => handleCustomColorChange(color.hex)}
                  />
                  <div className="flex justify-between mt-2">
                    <button 
                      onClick={handleAddCustomColor}
                      className="px-2 py-1 bg-blue-500 text-black rounded whitespace-nowrap"
                    >
                      Add Color
                    </button>
                    <button 
                      onClick={() => setShowCustomColorPicker(false)}
                      className="py-1 mr-9 bg-gray-300 text-red-500 rounded whitespace-nowrap"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </span>
      </span>
    </div>
  );
};

export default CustomToolbar;
