import React, { useState } from 'react';
import { 
  Search, 
  Microscope, 
  Dna, 
  HeartHandshake, 
  Brain, 
  ArrowRight, 
  ShieldCheck,
  Menu,
  X,
  PlayCircle,
  BadgeCheck,
  Users,
  Heart,
  Beaker
} from 'lucide-react';
import { FEATURED_PROJECTS, IMPACT_STATS } from './constants';
import { ProjectCard } from './components/ProjectCard';
import { FundOverlay } from './components/FundOverlay';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { Project } from './types';
import { ResearcherView } from './components/ResearcherView';
import { SignInModal } from './components/SignInModal';

// View State Type
type ViewState = 'home' | 'researcher';

// --- Navbar Component ---
interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onSignInClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onSignInClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-0 border-b border-white/5 bg-nexus-dark/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="w-8 h-8 bg-nexus-accent rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
              <Dna className="text-nexus-dark w-5 h-5" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white group-hover:text-nexus-accent transition-colors">CureNexus</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {currentView === 'home' ? (
              <button 
                onClick={() => onNavigate('researcher')}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                For Researchers
              </button>
            ) : (
              <button 
                onClick={() => onNavigate('home')}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                Explore Science
              </button>
            )}
            
            {/* Search only visible on Home for now */}
            {currentView === 'home' && (
              <button className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
                <Search className="w-4 h-4" /> Search
              </button>
            )}

            <button 
              onClick={onSignInClick}
              className="bg-white text-nexus-dark px-5 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors text-sm"
            >
              Sign In
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-nexus-panel border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <button 
               onClick={() => { onNavigate('home'); setIsOpen(false); }}
               className={`block w-full text-left px-3 py-2 text-base font-medium ${currentView === 'home' ? 'text-white' : 'text-gray-400'}`}
             >
               Explore Science
             </button>
             <button 
               onClick={() => { onNavigate('researcher'); setIsOpen(false); }}
               className={`block w-full text-left px-3 py-2 text-base font-medium ${currentView === 'researcher' ? 'text-white' : 'text-gray-400'}`}
             >
               For Researchers
             </button>
             <button 
               onClick={() => { onSignInClick(); setIsOpen(false); }}
               className="block w-full text-left px-3 py-2 text-base font-medium text-nexus-accent"
             >
               Sign In
             </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// --- Home Components (Keep inline as requested to minimize file churn, but organized) ---

interface HeroProps {
  onFundClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onFundClick }) => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-nexus-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-nexus-secondary/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nexus-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-nexus-secondary"></span>
          </span>
          <span className="text-sm font-medium text-nexus-accent tracking-wide uppercase">The Future of Philanthropy</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight max-w-5xl mx-auto">
          Rebuilding the Infrastructure for <br className="hidden md:block" />
          <span className="gradient-text">Scientific Discovery</span>
        </h1>
        
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400 mb-10 leading-relaxed">
           The first marketplace connecting philanthropic capital directly with high-impact researchers. No black boxes. No bureaucracy. Just science.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button 
            onClick={onFundClick}
            className="w-full sm:w-auto px-8 py-4 bg-nexus-accent text-nexus-dark rounded-full font-bold text-lg hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] flex items-center justify-center gap-2"
          >
            Fund a Breakthrough <ArrowRight className="w-5 h-5" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-gray-700 text-white rounded-full font-bold text-lg hover:bg-white/5 transition-all flex items-center justify-center gap-2">
            <PlayCircle className="w-5 h-5" /> How it Works
          </button>
        </div>
        
        <div className="mt-16 flex justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Mock University Logos - Just text for now, representative of the idea */}
          <span className="text-lg font-serif font-bold tracking-wider">STANFORD</span>
          <span className="text-lg font-serif font-bold tracking-wider">UCSF</span>
          <span className="text-lg font-serif font-bold tracking-wider">BOSTON CHILDREN'S</span>
          <span className="text-lg font-serif font-bold tracking-wider">MIT</span>
        </div>
      </div>
    </div>
  );
};

const StatsSection: React.FC = () => {
  return (
    <div className="bg-nexus-panel border-y border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {IMPACT_STATS.map((stat, idx) => (
            <div key={idx} className="text-center md:text-left border-b md:border-b-0 md:border-r border-white/5 last:border-0 pb-8 md:pb-0">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-lg text-nexus-accent font-medium mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.subtext}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface FeaturedSectionProps {
  onProjectClick: (project: Project) => void;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ onProjectClick }) => {
  const [mode, setMode] = useState<'simple' | 'technical'>('simple');

  return (
    <div className="py-24 bg-nexus-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* New Banner Area */}
        <div className="mb-16 text-center">
           <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
             Change the world from <br/>
             <span className="gradient-text">your living room.</span>
           </h2>
           <p className="text-xl text-gray-400 max-w-3xl mx-auto">
             You don't need a PhD to save a life. You just need to care. 
             Scroll down to find a project that moves you.
           </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h3 className="text-3xl font-bold text-white mb-2">Active Research Opportunities</h3>
            <p className="text-gray-400 max-w-xl">
              Verified projects from accredited institutions seeking immediate funding.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
             {/* Complexity Toggle */}
             <div className="bg-white/5 p-1 rounded-full border border-white/10 flex">
                <button 
                  onClick={() => setMode('simple')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${mode === 'simple' ? 'bg-white text-nexus-dark shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                  <Heart className={`w-4 h-4 ${mode === 'simple' ? 'fill-red-500 text-red-500' : ''}`} /> 
                  For Families
                </button>
                <button 
                  onClick={() => setMode('technical')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${mode === 'technical' ? 'bg-nexus-accent text-nexus-dark shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                  <Beaker className="w-4 h-4" /> 
                  For Scientists
                </button>
             </div>

            <a href="#" className="hidden md:flex items-center text-nexus-accent font-medium hover:text-white transition-colors">
              View all 840 projects <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_PROJECTS.slice(0, 6).map((project) => ( // Limiting to 6 for initial view to save space
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={onProjectClick}
              mode={mode}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
           <a href="#" className="inline-flex items-center text-nexus-accent font-medium hover:text-white transition-colors">
            View all projects <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

const ProcessSection: React.FC = () => {
  return (
    <div className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-nexus-accent/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">The End of Scientific Serendipity</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Traditional funding relies on who you know. CureNexus relies on what you can solve.
            We've digitized the due diligence process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-nexus-accent/30 to-transparent border-t border-dashed border-gray-600 z-0" />

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-2xl bg-nexus-panel border border-white/10 flex items-center justify-center mb-6 shadow-xl shadow-nexus-dark/50">
              <Microscope className="w-10 h-10 text-nexus-accent" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">1. Discovery & Verification</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Researchers post projects linked to their ORCID and institutional credentials. Our platform verifies affiliation and ethical approvals automatically.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center text-center">
             <div className="w-24 h-24 rounded-2xl bg-nexus-panel border border-white/10 flex items-center justify-center mb-6 shadow-xl shadow-nexus-dark/50">
              <HeartHandshake className="w-10 h-10 text-nexus-secondary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">2. Direct Funding</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Donors fund specific milestones via DAFs, crypto, or fiat. Capital flows directly to the university's restricted research accounts.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center text-center">
             <div className="w-24 h-24 rounded-2xl bg-nexus-panel border border-white/10 flex items-center justify-center mb-6 shadow-xl shadow-nexus-dark/50">
              <Brain className="w-10 h-10 text-nexus-accent" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">3. Radical Transparency</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Get quarterly updates, raw data access, and publication alerts. Watch your capital turn into data, and data into cures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FamilySectionProps {
  onFundClick: () => void;
}

const FamilySection: React.FC<FamilySectionProps> = ({ onFundClick }) => {
  return (
    <div className="py-24 bg-nexus-dark relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Column: Content */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nexus-secondary/10 border border-nexus-secondary/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-nexus-secondary animate-pulse"></span>
              <span className="text-xs font-bold text-nexus-secondary tracking-wide uppercase">For Families</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Take Control of the <br/>
              <span className="gradient-text">Research Agenda</span>
            </h2>
            
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              When a diagnosis changes your world, waiting 10 years for a breakthrough feels like an eternity. CureNexus gives you the tools to speed up the clock.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-4 group">
                <div className="mt-1 w-10 h-10 shrink-0 rounded-full bg-nexus-panel border border-white/10 flex items-center justify-center group-hover:border-nexus-accent/50 group-hover:bg-nexus-accent/10 transition-colors">
                  <Search className="w-5 h-5 text-nexus-accent" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Find Your Champions</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Don't just Google in the dark. Discover researchers actively working on your specific condition, from gene therapy to drug repurposing, with verified academic credentials.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="mt-1 w-10 h-10 shrink-0 rounded-full bg-nexus-panel border border-white/10 flex items-center justify-center group-hover:border-nexus-secondary/50 group-hover:bg-nexus-secondary/10 transition-colors">
                   <Users className="w-5 h-5 text-nexus-secondary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Pool Resources & Scale Impact</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Connect with other families. A single $50 donation helps, but 1,000 families pooling funds can launch a clinical trial that big pharma ignores.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="mt-1 w-10 h-10 shrink-0 rounded-full bg-nexus-panel border border-white/10 flex items-center justify-center group-hover:border-purple-400/50 group-hover:bg-purple-400/10 transition-colors">
                   <Brain className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Own the Progress</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Receive direct updates from the lab bench. Know when the mice are cured, when the paper is published, and exactly how your contribution moved the needle.
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={onFundClick}
              className="mt-10 px-8 py-4 bg-white text-nexus-dark rounded-full font-bold hover:bg-gray-100 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Find Research for My Child <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right Column: Testimonial Card */}
          <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-nexus-secondary/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 bg-nexus-accent/20 rounded-full blur-2xl"></div>

              <div className="glass-panel rounded-3xl p-8 md:p-12 relative border border-white/10 shadow-2xl">
                <div className="absolute top-8 right-10 text-8xl text-white/5 font-serif leading-none select-none">"</div>
                
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light italic mb-10 relative z-10">
                  For years we felt helpless waiting for a pharmaceutical company to take interest in our son's rare condition. CureNexus allowed us to directly fund a lab at UCSF that is now moving towards a clinical trial. <span className="text-white font-semibold not-italic block mt-4">We aren't just waiting anymore; we're fighting.</span>
                </p>
                
                <div className="flex items-center gap-5 pt-8 border-t border-white/5">
                  <img 
                    src="https://picsum.photos/id/64/200/200" 
                    alt="Maria S." 
                    className="w-16 h-16 rounded-full border-2 border-nexus-accent/50 object-cover" 
                  />
                  <div>
                    <div className="font-bold text-white text-lg">Maria S.</div>
                    <div className="text-sm text-nexus-accent font-medium">Mother & Research Advocate</div>
                    <div className="text-xs text-gray-500 mt-1">Funded 3 Projects for 22q11.2 DS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const TrustSection: React.FC = () => {
  return (
    <div className="py-20 bg-nexus-panel border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-6">Institutional Grade Compliance</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1">
                  <ShieldCheck className="w-6 h-6 text-nexus-secondary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Direct-to-Institution Routing</h4>
                  <p className="text-gray-400 text-sm mt-1">Funds never touch a personal bank account. We integrate directly with University Offices of Sponsored Research.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1">
                  <BadgeCheck className="w-6 h-6 text-nexus-secondary" /> {/* Using Lucide directly here if imported, mocked above otherwise */}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Tax Deductible & DAF Compatible</h4>
                  <p className="text-gray-400 text-sm mt-1">Instant 501(c)(3) receipts. Seamless integration with Fidelity Charitable, Schwab Charitable, and others.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="bg-nexus-dark rounded-2xl p-8 border border-white/5 relative">
              <div className="absolute -top-4 -right-4 bg-nexus-accent text-nexus-dark font-bold px-4 py-1 rounded-full text-sm">
                Live Transaction
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700"></div>
                    <div>
                      <div className="text-white text-sm font-medium">Anonymous Donor</div>
                      <div className="text-gray-500 text-xs">via Fidelity Charitable</div>
                    </div>
                  </div>
                  <div className="text-nexus-secondary font-mono font-bold">+$25,000.00</div>
                </div>
                <div className="text-xs text-gray-400 font-mono">
                  To: Stanford School of Medicine<br/>
                  Ref: Project #9921 (Pediatric HIE Neuroprotection)
                </div>
                <div className="flex items-center gap-2 text-xs text-nexus-accent pt-2">
                  <div className="w-2 h-2 rounded-full bg-nexus-accent animate-pulse"></div>
                  Funds Settled & Cleared
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-nexus-dark border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-nexus-accent rounded flex items-center justify-center">
                <Dna className="text-nexus-dark w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-white">CureNexus</span>
            </div>
            <p className="text-gray-500 text-sm">
              Accelerating the timeline from bench to bedside by democratizing research philanthropy.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-nexus-accent">Browse Projects</a></li>
              <li><a href="#" className="hover:text-nexus-accent">For Researchers</a></li>
              <li><a href="#" className="hover:text-nexus-accent">Institutional Partners</a></li>
              <li><a href="#" className="hover:text-nexus-accent">Success Stories</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-nexus-accent">The Science (Blog)</a></li>
              <li><a href="#" className="hover:text-nexus-accent">Help Center</a></li>
              <li><a href="#" className="hover:text-nexus-accent">Tax Info</a></li>
              <li><a href="#" className="hover:text-nexus-accent">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-nexus-accent">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-nexus-accent">Terms of Service</a></li>
              <li><a href="#" className="hover:text-nexus-accent">Cookie Settings</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-600 text-sm">
            © 2024 CureNexus Inc. All rights reserved.
          </div>
          <div className="flex gap-6">
            {/* Social placeholders */}
            <div className="w-5 h-5 bg-gray-700 rounded-full hover:bg-white transition-colors cursor-pointer"></div>
            <div className="w-5 h-5 bg-gray-700 rounded-full hover:bg-white transition-colors cursor-pointer"></div>
            <div className="w-5 h-5 bg-gray-700 rounded-full hover:bg-white transition-colors cursor-pointer"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('home');

  return (
    <div className="min-h-screen bg-nexus-dark text-nexus-text font-sans selection:bg-nexus-accent selection:text-nexus-dark">
      <Navbar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        onSignInClick={() => setIsSignInModalOpen(true)}
      />
      
      {currentView === 'home' && (
        <div className="animate-in fade-in duration-500">
          <Hero onFundClick={() => setIsFundModalOpen(true)} />
          <StatsSection />
          <FeaturedSection onProjectClick={setSelectedProject} />
          <ProcessSection />
          <FamilySection onFundClick={() => setIsFundModalOpen(true)} />
          <TrustSection />
        </div>
      )}

      {currentView === 'researcher' && (
        <ResearcherView />
      )}

      <Footer />
      
      <FundOverlay isOpen={isFundModalOpen} onClose={() => setIsFundModalOpen(false)} />
      <SignInModal isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)} />
      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
}