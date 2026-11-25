import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';

type AuthView = 'login' | 'signup' | 'forgot_password';

export const AuthModal: React.FC = () => {
  const { login, signup, resetPassword, isConfigured } = useAuth();
  const [view, setView] = useState<AuthView>('login');

  // Campos de Formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estados de feedback
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const getFirebaseErrorMessage = (error: unknown): string => {
    if (typeof error === 'object' && error !== null && 'code' in error) {
      const code = (error as { code: string }).code;
      switch (code) {
        case 'auth/invalid-email':
          return 'Endereço de e-mail inválido.';
        case 'auth/user-disabled':
          return 'Esta conta de usuário foi desativada.';
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          return 'E-mail ou senha incorretos.';
        case 'auth/email-already-in-use':
          return 'Este e-mail já está cadastrado em outra conta.';
        case 'auth/weak-password':
          return 'A senha deve conter no mínimo 6 caracteres.';
        case 'auth/too-many-requests':
          return 'Muitas tentativas sem sucesso. Aguarde alguns minutos ou redefina a senha.';
        case 'auth/network-request-failed':
          return 'Falha de conexão com os servidores de autenticação.';
        default:
          return `Erro de autenticação: ${code}`;
      }
    }
    return 'Ocorreu um erro inesperado durante a autenticação.';
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim() || !password) {
      setErrorMsg('Preencha seu e-mail e senha.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setErrorMsg(getFirebaseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!name.trim()) {
      setErrorMsg('Informe seu nome completo.');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Informe um e-mail válido.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('A senha deve conter no mínimo 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('As senhas digitadas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      await signup(name, email, password);
      setSuccessMsg('Conta criada com sucesso! Verifique seu e-mail para confirmação.');
    } catch (err) {
      setErrorMsg(getFirebaseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim()) {
      setErrorMsg('Informe seu e-mail para receber o link de recuperação.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      setSuccessMsg('Link de redefinição de senha enviado para seu e-mail!');
    } catch (err) {
      setErrorMsg(getFirebaseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        
        {/* Cabeçalho da Identidade Visual Six Sigma */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-black text-white tracking-tight">
            Plataforma Lean Six Sigma
          </h1>
          <p className="text-xs text-slate-400">
            Ambiente de Governança e Aplicação Prática DMAIC
          </p>
        </div>

        {/* Alerta caso variáveis de ambiente não estejam preenchidas */}
        {!isConfigured && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold">Aviso de Configuração Firebase</p>
              <p className="text-[11px] text-amber-400/90 mt-0.5">
                Variáveis do Firebase Console não detectadas em <code>.env</code>. Preencha as chaves em <code>.env</code> para conectar ao seu projeto real.
              </p>
            </div>
          </div>
        )}

        {/* Feedback de Erro ou Sucesso */}
        {errorMsg && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Visão de LOGIN */}
        {view === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">E-mail Corporativo</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@empresa.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-300">Senha</label>
                <button
                  type="button"
                  onClick={() => { setView('forgot_password'); setErrorMsg(null); setSuccessMsg(null); }}
                  className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold transition"
                >
                  Esqueci minha senha
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-lg shadow-blue-600/20"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Entrar no Workspace <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="pt-2 text-center">
              <span className="text-xs text-slate-400">Novo na plataforma? </span>
              <button
                type="button"
                onClick={() => { setView('signup'); setErrorMsg(null); setSuccessMsg(null); }}
                className="text-xs font-bold text-blue-400 hover:text-blue-300"
              >
                Criar uma conta
              </button>
            </div>
          </form>
        )}

        {/* Visão de CADASTRO */}
        {view === 'signup' && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Nome Completo</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Carlos Mendes"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">E-mail Corporativo</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@empresa.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Senha (Mín. 6 caracteres)</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Confirmar Senha</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-lg shadow-emerald-600/20"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                'Finalizar Cadastro'
              )}
            </button>

            <div className="pt-2 text-center">
              <span className="text-xs text-slate-400">Já possui uma conta? </span>
              <button
                type="button"
                onClick={() => { setView('login'); setErrorMsg(null); setSuccessMsg(null); }}
                className="text-xs font-bold text-blue-400 hover:text-blue-300"
              >
                Fazer login
              </button>
            </div>
          </form>
        )}

        {/* Visão de RECUPERAÇÃO DE SENHA */}
        {view === 'forgot_password' && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <p className="text-xs text-slate-400 leading-relaxed">
              Insira o e-mail cadastrado. Enviaremos um link seguro para você redefinir sua senha de acesso.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">E-mail Cadastrado</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@empresa.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-lg shadow-blue-600/20"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                'Enviar Link de Recuperação'
              )}
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => { setView('login'); setErrorMsg(null); setSuccessMsg(null); }}
                className="text-xs font-bold text-slate-400 hover:text-white"
              >
                Voltar para o Login
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
