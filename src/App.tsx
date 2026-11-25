import React, { useState } from 'react';
import { useProject } from './context/ProjectContext';
import { useAuth } from './context/AuthContext';
import { Navbar, MainView } from './components/layout/Navbar';
import { DMAICHeader } from './components/layout/DMAICHeader';
import { AuthModal } from './components/auth/AuthModal';
import { ProjectDashboard } from './features/dashboard/ProjectDashboard';
import { ToolLibrary } from './features/library/ToolLibrary';
import { DefinePage } from './pages/DefinePage';
import { MeasurePage } from './pages/MeasurePage';
import { AnalyzePage } from './pages/AnalyzePage';
import { ImprovePage } from './pages/ImprovePage';
import { ControlPage } from './pages/ControlPage';
import { Loader2 } from 'lucide-react';

export const App: React.FC = () => {
  const { currentUser, loading } = useAuth();
  const { project } = useProject();
  const [currentView, setCurrentView] = useState<MainView>('dmaic');

  // Estado de carregamento da sessão Firebase
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-3" />
        <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
          Carregando Sessão DMAIC...
        </p>
      </div>
    );
  }

  // Se não autenticado, bloqueia o acesso e exibe a tela de Login/Cadastro
  if (!currentUser) {
    return <AuthModal />;
  }

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
