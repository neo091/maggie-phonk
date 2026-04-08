import React from "react";

interface NavTab {
  id: string;
  label: string;
  icon?: string;
}

interface NavTabsProps {
  tabs: NavTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function NavTabs({
  tabs,
  activeTab,
  onTabChange,
}: NavTabsProps) {
  return (
    <div className="flex gap-0 border-b border-slate-700 bg-slate-900/50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 font-bold transition-all text-center text-xs sm:text-base ${
            activeTab === tab.id
              ? "bg-gradient-to-b from-fuchsia-500/20 to-transparent border-b-2 border-fuchsia-500 text-fuchsia-400 shadow-lg shadow-fuchsia-500/20"
              : "text-slate-400 hover:text-slate-300 hover:bg-slate-800/50"
          }`}
        >
          {tab.icon && <span className="mr-2">{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
