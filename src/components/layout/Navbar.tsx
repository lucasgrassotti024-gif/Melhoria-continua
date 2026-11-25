import React from 'react';
import { LayoutDashboard, BookOpen, Layers } from 'lucide-react';

export type MainView = 'dmaic' | 'dashboard' | 'library';

interface NavbarProps {
  currentView: MainView;
  onNavigate: (view: MainView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  return (
    <header className="bg-slate-900 text-white px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow border-b border-slate-800">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-xl font-black text-white text-base tracking-wider shadow-xs">
          LSS
        </div>
        <div>
          <div className="font-bold text-sm tracking-tight leading-tight flex items-center gap-2">
            LEAN SIX SIGMA <span className="text-[10px] bg-slate-800 text-blue-400 px-2 py-0.5 rounded font-mono border border-slate-700">PRO WORKSPACE</span>
          </div>
          <div className="text-[11px] text-slate-400">Plataforma Profissional DMAIC de Melhoria Contínua</div>
        </div>
      </div>

      {/* Navegação Principal Superior */}
      <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
        <button
          onClick={() => onNavigate('dashboard')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition ${
            currentView === 'dashboard' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          Dashboard
        </button>

        <button
          onClick={() => onNavigate('dmaic')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition ${
            currentView === 'dmaic' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Fases DMAIC
        </button>

        <button
          onClick={() => onNavigate('library')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition ${
            currentView === 'library' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Biblioteca (26)
        </button>
      </div>
    </header>
  );
};
