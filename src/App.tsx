import React, { useState } from 'react';
import { useProject } from './context/ProjectContext';
import { Navbar, MainView } from './components/layout/Navbar';
import { DMAICHeader } from './components/layout/DMAICHeader';
import { ProjectDashboard } from './features/dashboard/ProjectDashboard';
import { ToolLibrary } from './features/library/ToolLibrary';
import { DefinePage } from './pages/DefinePage';
import { MeasurePage } from './pages/MeasurePage';
import { AnalyzePage } from './pages/AnalyzePage';
import { ImprovePage } from './pages/ImprovePage';
import { ControlPage } from './pages/ControlPage';

export const App: React.FC = () => {
  const { project } = useProject();
  const [currentView, setCurrentView] = useState<MainView>('dmaic');

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      
      {currentView === 'dmaic' && <DMAICHeader />}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {currentView === 'dashboard' && (
          <ProjectDashboard onSelectProjectPhase={() => setCurrentView('dmaic')} />
        )}

        {currentView === 'library' && (
          <ToolLibrary onOpenTool={() => setCurrentView('dmaic')} />
        )}

        {currentView === 'dmaic' && (
          <>
            {project.currentPhase === 'define' && <DefinePage />}
            {project.currentPhase === 'measure' && <MeasurePage />}
            {project.currentPhase === 'analyze' && <AnalyzePage />}
            {project.currentPhase === 'improve' && <ImprovePage />}
            {project.currentPhase === 'control' && <ControlPage />}
          </>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        Plataforma Lean Six Sigma (DMAIC Workspace) • Metodologia de Governança Conforme Prompt 01 • Todas as Fases & Ferramentas Operacionais
      </footer>
    </div>
  );
};
