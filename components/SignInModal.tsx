import React, { useState } from 'react';
import { X, User, Lock, Beaker, Fingerprint, ArrowRight, Mail } from 'lucide-react';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'donor' | 'researcher'>('donor');
  
  // Form states (mock)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [researcherId, setResearcherId] = useState('');
  const [projectId, setProjectId] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-nexus-dark/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-nexus-panel border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Section */}
        <div className="px-8 pt-8 pb-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-sm text-gray-400">Access your dashboard to track impact or manage research.</p>
        </div>

        {/* Toggle Tabs */}
        <div className="px-8 mb-6">
            <div className="bg-nexus-dark p-1 rounded-xl border border-white/5 flex">
                <button
                    onClick={() => setMode('donor')}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${mode === 'donor' ? 'bg-white text-nexus-dark shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                    <User className="w-4 h-4" /> Donor
                </button>
                <button
                    onClick={() => setMode('researcher')}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${mode === 'researcher' ? 'bg-nexus-accent text-nexus-dark shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                    <Beaker className="w-4 h-4" /> Researcher
                </button>
            </div>
        </div>

        {/* Forms */}
        <div className="px-8 pb-8">
            {mode === 'donor' ? (
                <div className="space-y-4 animate-in slide-in-from-left-4 fade-in duration-300">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="alice@example.com"
                                className="w-full bg-nexus-dark border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-nexus-secondary/50 transition-colors"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-nexus-dark border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-nexus-secondary/50 transition-colors"
                            />
                        </div>
                    </div>
                    <button className="w-full bg-white text-nexus-dark font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors mt-2 shadow-lg shadow-white/10">
                        Sign In as Donor
                    </button>
                    <div className="text-center pt-2">
                        <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Forgot password?</a>
                    </div>
                </div>
            ) : (
                <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-300">
                     <div className="p-3 bg-nexus-accent/10 border border-nexus-accent/20 rounded-xl text-xs text-nexus-accent mb-2">
                        Research Portal access requires institutional credentials.
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Researcher ID (ORCID)</label>
                        <div className="relative">
                            <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input 
                                type="text" 
                                value={researcherId}
                                onChange={(e) => setResearcherId(e.target.value)}
                                placeholder="0000-0000-0000-0000"
                                className="w-full bg-nexus-dark border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-nexus-accent/50 transition-colors"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Project ID / Grant Ref</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input 
                                type="text" 
                                value={projectId}
                                onChange={(e) => setProjectId(e.target.value)}
                                placeholder="CN-2024-XXXX"
                                className="w-full bg-nexus-dark border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-nexus-accent/50 transition-colors"
                            />
                        </div>
                    </div>
                    <button className="w-full bg-nexus-accent text-nexus-dark font-bold py-3 rounded-xl hover:bg-cyan-300 transition-colors mt-2 flex items-center justify-center gap-2 shadow-lg shadow-nexus-accent/20">
                        Access Lab Dashboard <ArrowRight className="w-4 h-4" />
                    </button>
                    <div className="text-center pt-2">
                        <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Apply for Researcher Account</a>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};