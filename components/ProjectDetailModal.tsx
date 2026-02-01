import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { 
  X, 
  BadgeCheck, 
  Clock, 
  Users, 
  ChevronRight, 
  FileText, 
  Microscope, 
  Heart, 
  PieChart, 
  Share2,
  Loader2,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  Send
} from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [mode, setMode] = useState<'family' | 'scientist'>('family');
  const [content, setContent] = useState<{family: string, scientist: string} | null>(null);
  const [loading, setLoading] = useState(false);
  
  // AI Interaction State
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    if (project) {
      generateContent(project);
      setAiResponse(null); // Reset AI chat on project change
      setAiQuestion('');
    } else {
      setContent(null);
    }
    setMode('family');
  }, [project]);

  const generateContent = async (p: Project) => {
    setLoading(true);
    try {
      const apiKey = process.env.API_KEY;
      
      // Fallback if no API key
      if (!apiKey) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setContent({
          family: `This research is vital because it directly addresses the root cause of the condition. By supporting Dr. ${p.researcher.name}, you are helping to move a promising therapy out of the lab and closer to the children who need it. The focus is on safety and efficacy, ensuring that every dollar brings us closer to a clinical trial.`,
          scientist: `This project aims to elucidate the molecular mechanisms underlying the pathology. Utilizing ${p.category} approaches, we propose to modulate the target pathway. Preliminary in-vitro data suggests a statistically significant rescue of the cellular phenotype. The funds will be allocated towards IND-enabling studies, specifically toxicology and pharmacokinetics.`
        });
        setLoading(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate two descriptions for a medical research project titled "${p.title}" by ${p.researcher.name} at ${p.researcher.institution}.
        The project category is ${p.category} and the brief is: "${p.brief}".
        
        1. "family": A warm, hopeful, and clear explanation for a parent of a sick child. Focus on the 'Why' and the hope it brings. No jargon. (Max 150 words)
        2. "scientist": A technical, rigorous description using appropriate medical terminology, referencing hypothetical mechanisms of action relevant to this field. (Max 150 words)
        
        Return JSON.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              family: { type: Type.STRING },
              scientist: { type: Type.STRING }
            }
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      setContent(data);
    } catch (e) {
      console.error(e);
      setContent({
        family: p.brief,
        scientist: p.brief
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAskAI = async (question: string) => {
    if (!project || !question.trim()) return;
    
    setAiLoading(true);
    setAiQuestion(question);
    
    try {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setAiResponse("I can't connect to the live AI right now, but this project is critical because it addresses a significant gap in current treatment options. Funding now accelerates the timeline to clinical trials.");
            setAiLoading(false);
            return;
        }

        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `You are an empathetic scientific advocate explaining a research project to a potential donor who is not a scientist.
            
            Project: "${project.title}"
            Researcher: ${project.researcher.name} (${project.researcher.institution})
            Context: ${project.brief}
            
            User Question: "${question}"
            
            Answer the question simply, accurately, and with emotional resonance. Explain why this matters NOW. Mention patient impact if relevant. Keep it under 100 words.`
        });
        
        setAiResponse(response.text || "I couldn't generate a response at this time.");

    } catch (err) {
        console.error("AI Chat Error", err);
        setAiResponse("We encountered an issue connecting to the knowledge base.");
    } finally {
        setAiLoading(false);
    }
  };

  if (!project) return null;

  const percentComplete = Math.min((project.fundingRaised / project.fundingGoal) * 100, 100);

  const presetQuestions = [
      "How does this help patients?",
      "Why is funding urgent?",
      "What happens if this succeeds?"
  ];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-0 md:p-4">
      <div 
        className="absolute inset-0 bg-nexus-dark/95 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-6xl h-full md:h-[90vh] bg-nexus-dark md:rounded-3xl border border-white/10 shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button Mobile */}
        <button 
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full text-white"
        >
          <X className="w-6 h-6" />
        </button>

        {/* LEFT COLUMN: Visuals & Context */}
        <div className="w-full md:w-2/5 h-64 md:h-full relative flex flex-col">
          <div className="absolute inset-0">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-nexus-dark via-nexus-dark/80 to-transparent md:bg-gradient-to-r" />
          </div>

          <div className="relative z-10 p-6 md:p-10 mt-auto md:mt-0 md:h-full flex flex-col">
            {/* Institution Badge */}
            <div className="hidden md:flex items-center gap-3 mb-8 bg-white/5 w-fit px-4 py-2 rounded-lg border border-white/5 backdrop-blur-md">
               <GraduationCap className="w-6 h-6 text-gray-300" />
               <span className="text-gray-200 font-serif font-bold tracking-wide uppercase text-sm">
                 {project.researcher.institution}
               </span>
            </div>

            <div className="mt-auto">
              <div className="inline-block px-3 py-1 bg-nexus-accent/20 border border-nexus-accent/30 text-nexus-accent rounded-full text-xs font-bold mb-4">
                {project.category}
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {project.title}
              </h2>

              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={project.researcher.avatarUrl} 
                  alt={project.researcher.name} 
                  className="w-14 h-14 rounded-full border-2 border-white/10"
                />
                <div>
                  <div className="text-white font-bold text-lg flex items-center gap-2">
                    {project.researcher.name}
                    <BadgeCheck className="w-5 h-5 text-nexus-secondary" />
                  </div>
                  <div className="text-nexus-muted text-sm">{project.researcher.title}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Content & Funding */}
        <div className="w-full md:w-3/5 bg-nexus-panel overflow-y-auto custom-scrollbar flex flex-col">
          <div className="p-6 md:p-10 space-y-8 flex-grow">
            
            {/* Close Button Desktop */}
            <div className="hidden md:flex justify-end mb-2">
              <button 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Toggle Switch */}
            <div className="flex justify-center md:justify-start">
               <div className="bg-nexus-dark p-1 rounded-full border border-white/10 flex relative">
                  <div 
                    className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white/10 rounded-full transition-all duration-300 ${mode === 'family' ? 'left-1' : 'left-[50%]'}`}
                  />
                  <button 
                    onClick={() => setMode('family')}
                    className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${mode === 'family' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    <Heart className="w-4 h-4" /> Explain for Families
                  </button>
                  <button 
                    onClick={() => setMode('scientist')}
                    className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${mode === 'scientist' ? 'text-nexus-accent' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    <Microscope className="w-4 h-4" /> Technical Details
                  </button>
               </div>
            </div>

            {/* Dynamic Content */}
            <div className="min-h-[160px]">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-40 gap-3 text-gray-500">
                  <Loader2 className="w-8 h-8 animate-spin text-nexus-accent" />
                  <span className="text-sm">Retrieving scientific details...</span>
                </div>
              ) : (
                <div className="animate-in fade-in duration-300">
                   <p className={`text-lg leading-relaxed ${mode === 'family' ? 'text-gray-200' : 'text-gray-300 font-mono text-sm border-l-2 border-nexus-accent pl-4'}`}>
                     {mode === 'family' ? content?.family : content?.scientist}
                   </p>
                </div>
              )}
            </div>

            {/* NEW: Why This Matters Now Section */}
            <div className="border border-nexus-accent/20 bg-nexus-accent/5 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles className="w-24 h-24 text-nexus-accent" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-nexus-accent" /> Why This Matters Now
                </h3>
                
                <p className="text-sm text-gray-400 mb-4">
                    Ask our research assistant to understand the potential impact, patient statistics, and urgency of this specific project.
                </p>

                {/* Response Area */}
                {(aiLoading || aiResponse) && (
                    <div className="mb-4 bg-nexus-dark/50 border border-white/5 rounded-xl p-4 animate-in fade-in slide-in-from-bottom-2">
                         {aiLoading ? (
                             <div className="flex items-center gap-2 text-nexus-accent text-sm">
                                 <Loader2 className="w-4 h-4 animate-spin" /> Analyzing research context...
                             </div>
                         ) : (
                             <div className="text-gray-200 text-sm leading-relaxed">
                                 <span className="text-nexus-accent font-bold block mb-1">Answer:</span>
                                 {aiResponse}
                             </div>
                         )}
                    </div>
                )}

                {/* Input Area */}
                <div className="flex flex-col gap-3">
                     <div className="flex gap-2">
                        {presetQuestions.map((q, i) => (
                            <button 
                                key={i}
                                onClick={() => handleAskAI(q)}
                                disabled={aiLoading}
                                className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 hover:border-nexus-accent/30 text-gray-300 rounded-full px-3 py-1.5 transition-all whitespace-nowrap"
                            >
                                {q}
                            </button>
                        ))}
                     </div>
                     
                     <div className="relative">
                        <input 
                            type="text" 
                            value={aiQuestion}
                            onChange={(e) => setAiQuestion(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAskAI(aiQuestion)}
                            placeholder="Ask a custom question about this research..."
                            className="w-full bg-nexus-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-nexus-accent/50 pr-10"
                        />
                        <button 
                            onClick={() => handleAskAI(aiQuestion)}
                            disabled={!aiQuestion.trim() || aiLoading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-nexus-accent disabled:opacity-50 transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                     </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="border-t border-white/5 pt-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Path to Clinical Application
              </h3>
              <div className="relative pl-4 border-l border-white/10 space-y-8">
                {project.milestones.map((milestone, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 ${idx === 0 ? 'bg-nexus-secondary border-nexus-secondary' : 'bg-nexus-dark border-gray-600'}`} />
                    <h4 className={`text-sm font-medium ${idx === 0 ? 'text-white' : 'text-gray-500'}`}>
                      {milestone}
                    </h4>
                    {idx === 0 && <p className="text-xs text-nexus-secondary mt-1">Current Focus</p>}
                  </div>
                ))}
                <div className="relative">
                   <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-dashed border-gray-600 bg-transparent" />
                   <h4 className="text-sm font-medium text-gray-600">Review & Publication</h4>
                </div>
              </div>
            </div>

             {/* Budget Breakdown (Mock Data for Visual) */}
             <div className="border-t border-white/5 pt-8">
               <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                 <PieChart className="w-4 h-4" /> Use of Funds
               </h3>
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-nexus-dark p-3 rounded-lg border border-white/5">
                    <div className="text-xs text-gray-500">Lab Supplies & Reagents</div>
                    <div className="text-white font-mono">45%</div>
                  </div>
                  <div className="bg-nexus-dark p-3 rounded-lg border border-white/5">
                    <div className="text-xs text-gray-500">Research Personnel</div>
                    <div className="text-white font-mono">30%</div>
                  </div>
                  <div className="bg-nexus-dark p-3 rounded-lg border border-white/5">
                    <div className="text-xs text-gray-500">Core Facility Fees</div>
                    <div className="text-white font-mono">15%</div>
                  </div>
                  <div className="bg-nexus-dark p-3 rounded-lg border border-white/5">
                    <div className="text-xs text-gray-500">Data Analysis</div>
                    <div className="text-white font-mono">10%</div>
                  </div>
               </div>
               <p className="text-xs text-gray-600 mt-2 italic">
                 *CureNexus takes 0% platform fees. Third-party payment processing fees apply.
               </p>
             </div>

          </div>

          {/* Sticky Footer: Action */}
          <div className="p-6 md:p-10 bg-nexus-dark border-t border-white/10 sticky bottom-0">
             <div className="flex justify-between items-end mb-3">
               <div>
                 <div className="text-3xl font-bold text-white">${project.fundingRaised.toLocaleString()}</div>
                 <div className="text-sm text-gray-400">raised of ${project.fundingGoal.toLocaleString()} goal</div>
               </div>
               <div className="text-right">
                  <span className="text-nexus-secondary font-bold">{Math.round(percentComplete)}%</span>
               </div>
             </div>
             
             {/* Progress Bar */}
             <div className="w-full bg-gray-800 rounded-full h-3 mb-6">
                <div 
                  className="bg-gradient-to-r from-nexus-accent to-nexus-secondary h-full rounded-full transition-all duration-1000"
                  style={{ width: `${percentComplete}%` }}
                />
             </div>

             <div className="flex gap-4">
               <button className="flex-1 bg-white text-nexus-dark font-bold py-4 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                 Fund this Project <ArrowRight className="w-5 h-5" />
               </button>
               <button className="px-4 py-4 border border-gray-700 rounded-xl hover:bg-white/5 text-white transition-colors">
                 <Share2 className="w-5 h-5" />
               </button>
             </div>
             <p className="text-center text-xs text-gray-500 mt-4">
               <ShieldCheck className="w-3 h-3 inline mr-1" />
               Verified Institution Account • 501(c)(3) Tax Deductible
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};