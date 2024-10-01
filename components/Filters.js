"use client";

import React, { useState, useEffect } from 'react';
import { Book, FileText, HelpCircle, Zap, Calendar, Menu } from 'lucide-react';

const FilterTab = () => {
  const [activeTab, setActiveTab] = useState('Wikis');
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const tabs = [
    { icon: <Book size={20} />, label: 'Wikis' },
    { icon: <FileText size={20} />, label: 'HY notes' },
    { icon: <HelpCircle size={20} />, label: 'Questions' },
    { icon: <Zap size={20} />, label: 'Flashcards' },
    { icon: <Calendar size={20} />, label: 'Calendar' },
    { icon: <FileText size={20} />, label: 'Summary' },
  ];

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleTabClick = (label) => {
    setActiveTab(label);
    if (isMobile) {
      setIsSpeedDialOpen(false);
    }
  };

  return (
    <div className="relative flex justify-center"> {/* Center the tab container */}
      {isMobile ? (
        <div className="fixed right-4 bottom-4">
          <button
            onClick={() => setIsSpeedDialOpen(!isSpeedDialOpen)}
            className="bg-[#22808D] text-white p-3 rounded-full shadow-lg"
          >
            <Menu size={24} />
          </button>
          {isSpeedDialOpen && (
            <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`flex items-center space-x-2 px-4 py-2 w-full ${
                    activeTab === tab.label
                      ? 'bg-[#E0E7E4] text-[#22808D]'
                      : 'hover:bg-[#E0E7E4]'
                  }`}
                  onClick={() => handleTabClick(tab.label)}
                >
                  {React.cloneElement(tab.icon, {
                    className: activeTab === tab.label ? 'text-[#22808D]' : 'text-gray-600'
                  })}
                  <span className={`text-sm font-medium ${
                    activeTab === tab.label ? 'text-[#22808D]' : 'text-gray-600'
                  }`}>
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex space-x-2 p-2 bg-transparent rounded-lg text-center overflow-x-auto">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors whitespace-nowrap
                ${activeTab === tab.label
                  ? 'bg-[#E0E7E4] text-[#22808D] border-2 border-[#22808D]'
                  : 'bg-[#E0E7E4] border border-[#CEDDDB] hover:bg-[#D3DCD8]'
              }`}
              onClick={() => handleTabClick(tab.label)}
            >
              {React.cloneElement(tab.icon, {
                className: activeTab === tab.label ? 'text-[#22808D]' : 'text-gray-600'
              })}
              <span className={`text-sm font-medium ${
                activeTab === tab.label ? 'text-[#22808D]' : 'text-gray-600'
              }`}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterTab;
