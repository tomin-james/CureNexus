import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { X, Sparkles, Search, ArrowRight, Loader2, ChevronLeft } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { FEATURED_PROJECTS } from '../constants';
import { Project } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';

interface FundOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FundOverlay: React.FC<FundOverlayProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [view, setView] = useState<'input' | 'results'>('input');
  const [results, setResults] = useState<Project[]>([]);
  const [aiMessage, setAiMessage] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setInput('');
      setView('input');
      setResults([]);
      setAiMessage('');
      setIsThinking(false);
      setSelectedProject(null);
    }
  }, [isOpen]);

  const handleSearch = async () => {
    if (!input.trim()) return;

    setIsThinking(true);
    
    try {
      const apiKey = process.env.API_KEY; // In a real app, this comes from env
      
      // If we don't have an API key in this mocked environment, we'll simulate the AI logic
      // to ensure the UI demo works for the user.
      if (!apiKey) {
        console.warn("No API Key found. Simulating AI response.");
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simple mock logic for demonstration purposes if API key is missing
        const lowerInput = input.toLowerCase();
        let matches = FEATURED_PROJECTS;
        let message = "We found these projects that might interest you.";

        if (lowerInput.includes('hie') || lowerInput.includes('hypoxic')) {
           matches = FEATURED_PROJECTS.filter(p => p.title.includes('HIE') || p.brief.includes('hypothermia'));
           message = "Searching for HIE treatments is critical. Here are researchers working on neuroprotection.";
        } else if (lowerInput.includes('down syndrome')) {
           matches = FEATURED_PROJECTS.filter(p => p.title.includes('Down Syndrome'));
           message = "Improving cognition in Down Syndrome is a major frontier. These labs are leading the way.";
        } else if (lowerInput.includes('gene')) {
           matches = FEATURED_PROJECTS.filter(p => p.category === 'Gene Therapy');
           message = "Gene therapy offers hope for root-cause cures. Here are our active gene editing protocols.";
        }

        setResults(matches);
        setAiMessage(message);
        setView('results');
        setIsThinking(false);
        return;
      }

      // Real Gemini API Call
      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `The user is searching for medical research to fund. 
        User Input: "${input}"
        
        Available Categories: 'Gene Therapy', 'Drug Repurposing', 'Basic Science', 'Clinical Trial', 'Disease Modeling'.
        
        Please analyze the input and return a JSON object with:
        1. 'compassionateResponse': A short, 1-sentence empathetic response acknowledging their situation or goal.
        2. 'keywords': An array of strings representing the disease, condition, or scientific approach mentioned (e.g., 'HIE', 'Mitochondrial', 'Down Syndrome').
        3. 'categoryFilter': (Optional) One of the available categories if the user specifically requested a type of research.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              compassionateResponse: { type: Type.STRING },
              keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
              categoryFilter: { type: Type.STRING }
            }
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      setAiMessage(data.compassionateResponse || "Here are the projects we found.");
      
      // Client-side filtering based on AI extraction
      let filtered = FEATURED_PROJECTS;
      
      if (data.categoryFilter) {
        filtered = filtered.filter(p => p.category === data.categoryFilter);
      }

      if (data.keywords && data.keywords.length > 0) {
        filtered = filtered.filter(p => {
          const text = (p.title + ' ' + p.brief + ' ' + p.milestones.join(' ')).toLowerCase();
          return data.keywords.some((k: string) => text.includes(k.toLowerCase()));
        });
      }

      // If strict filtering returns nothing, fall back to broad search or show all
      if (filtered.length === 0 && FEATURED_PROJECTS.length > 0) {
        filtered = FEATURED_PROJECTS; 
        setAiMessage(data.compassionateResponse + " We couldn't find an exact match, but here are our most urgent projects.");
      }

      setResults(filtered);
      setView('results');

    } catch (error) {
      console.error("AI Search Error", error);
      // Fallback
      setResults(FEATURED_PROJECTS);
      setAiMessage("We encountered an error, but here are all our active projects.");
      setView('results');
    } finally {
      setIsThinking(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-nexus-dark/90 backdrop-blur-xl transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main Container */}
      <div className="relative w-full max-w-5xl h-[85vh] bg-nexus-panel/50 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* View: Input */}
        {view === 'input' && (
          <div className="flex flex-col items-center justify-center h-full px-6 md:px-20 text-center">
            
            <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nexus-accent/10 border border-nexus-accent/20 text-nexus-accent text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Discovery</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Change the world from <br/>
              <span className="gradient-text">your living room.</span>
            </h2>

            <p className="text-lg text-gray-400 mb-12 max-w-2xl">
              Science is personal. You don't need to know the jargon to find the cure.
              Just tell us what you're looking for, or share your story.
            </p>

            <div className="w-full max-w-3xl relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-nexus-accent to-nexus-secondary rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-nexus-dark border border-white/10 rounded-2xl p-4 flex flex-col">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="E.g., 'I want to fund research for HIE,' or 'Show me gene therapies for rare diseases at Stanford...'"
                  className="w-full bg-transparent text-white text-lg placeholder:text-gray-600 focus:outline-none resize-none min-h-[120px]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSearch();
                    }
                  }}
                />
                <div className="flex justify-between items-center mt-4 border-t border-white/5 pt-4">
                  <div className="text-xs text-gray-500">
                    Powered by Gemini AI
                  </div>
                  <button 
                    onClick={handleSearch}
                    disabled={!input.trim() || isThinking}
                    className="flex items-center gap-2 px-6 py-2.5 bg-white text-nexus-dark rounded-full font-bold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isThinking ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Thinking...
                      </>
                    ) : (
                      <>
                        Find Projects <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <span className="text-gray-500 text-sm py-1.5">Or try exploring:</span>
              {['Pediatric Neurology', 'Gene Therapy', 'Clinical Trials', 'Stanford', 'Rare Disease'].map((tag) => (
                <button 
                  key={tag}
                  onClick={() => { setInput(tag); }}
                  className="px-4 py-1.5 rounded-full border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 text-sm transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* View: Results */}
        {view === 'results' && (
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex-shrink-0 px-8 py-6 border-b border-white/5 bg-nexus-dark/50 flex items-center gap-4">
              <button 
                onClick={() => setView('input')}
                className="p-2 -ml-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex-grow">
                 <p className="text-nexus-accent text-sm font-medium mb-1 flex items-center gap-2">
                    <Sparkles className="w-3 h-3" /> AI Assistant
                 </p>
                 <p className="text-white text-lg leading-snug">
                   {aiMessage}
                 </p>
              </div>
            </div>

            {/* Scrollable Grid */}
            <div className="flex-grow overflow-y-auto p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
                {results.map(project => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onClick={setSelectedProject}
                  />
                ))}
              </div>
              
              {results.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>No active projects found specifically for that query.</p>
                  <button onClick={() => setView('input')} className="text-nexus-accent hover:underline mt-2">Try a broader search</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Nested Modal for Project Details */}
      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
};