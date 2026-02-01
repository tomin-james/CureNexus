import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  PlayCircle, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Users, 
  Search, 
  BarChart3, 
  Microscope,
  ChevronDown,
  ChevronUp,
  FileText,
  Building2,
  Lock,
  Zap,
  Check,
  AlertCircle
} from 'lucide-react';
import { ResearcherOnboarding } from './ResearcherOnboarding';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl bg-nexus-panel overflow-hidden transition-all duration-300 hover:border-nexus-secondary/30">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex justify-between items-center text-white font-medium hover:bg-white/5 transition-colors"
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-nexus-secondary" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 pt-2 text-gray-400 text-sm leading-relaxed border-t border-white/5">
          {answer}
        </div>
      )}
    </div>
  );
};

export const ResearcherView: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  if (showOnboarding) {
    return <ResearcherOnboarding onClose={() => setShowOnboarding(false)} />;
  }

  return (
    <div className="bg-nexus-dark min-h-screen text-nexus-text animate-in fade-in duration-500">
      
      {/* 1. HERO SECTION */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-[#0f4c5c] to-[#0B0F19]">
         {/* Background Glows */}
         <div className="absolute top-0 right-0 w-[60%] h-[80%] bg-nexus-secondary/10 rounded-full blur-[120px] -z-10" />
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-nexus-secondary"></span>
                <span className="text-xs font-bold text-white tracking-wide uppercase">For Researchers</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                Your Research Deserves Funding. <br className="hidden md:block" />
                <span className="text-nexus-secondary opacity-90">We'll Help You Find It.</span>
              </h1>
              
              <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl font-light">
                Bridge the gap between laboratory breakthroughs and life-changing clinical applications. 
                CureNexus provides pediatric researchers with the AI-powered tools and visibility 
                needed to attract institutional partners, manage protocols, and accelerate the path to patient impact.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                <button 
                  onClick={() => setShowOnboarding(true)}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-[#0f4c5c] rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  Create Your Profile <ArrowRight className="w-5 h-5" />
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                  <PlayCircle className="w-5 h-5" /> Watch Demo
                </button>
              </div>
              
              <div className="flex flex-wrap gap-6 text-sm font-medium text-nexus-secondary">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5" /> Free to join
                </div>
                <div className="flex items-center gap-2">
                   <Check className="w-5 h-5" /> 3% fee only when funded
                </div>
                <div className="flex items-center gap-2">
                   <Check className="w-5 h-5" /> Institution-compliant
                </div>
              </div>
            </div>
         </div>
      </div>

      {/* 2. STATS BANNER */}
      <div className="bg-[#080b12] border-y border-white/5 py-12">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               <div className="text-center">
                  <div className="text-4xl font-bold text-nexus-secondary mb-2">$640 M+</div>
                  <div className="text-sm text-gray-400">Funded to Research</div>
                  <div className="h-1 w-8 bg-nexus-secondary/30 mx-auto mt-4 rounded-full"></div>
               </div>
               <div className="text-center">
                  <div className="text-4xl font-bold text-nexus-secondary mb-2">1,200+</div>
                  <div className="text-sm text-gray-400">Researchers</div>
                  <div className="h-1 w-8 bg-nexus-secondary/30 mx-auto mt-4 rounded-full"></div>
               </div>
               <div className="text-center">
                  <div className="text-4xl font-bold text-nexus-secondary mb-2">240,000+</div>
                  <div className="text-sm text-gray-400">Active Donors</div>
                  <div className="h-1 w-8 bg-nexus-secondary/30 mx-auto mt-4 rounded-full"></div>
               </div>
               <div className="text-center">
                  <div className="text-4xl font-bold text-nexus-secondary mb-2">94%</div>
                  <div className="text-sm text-gray-400">Repeat Funders</div>
                  <div className="h-1 w-8 bg-nexus-secondary/30 mx-auto mt-4 rounded-full"></div>
               </div>
            </div>
         </div>
      </div>

      {/* 3. PROBLEM / OLD WAY */}
      <div className="py-24 bg-nexus-panel/50 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">The Efficiency Gap</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Researchers spend up to <span className="text-red-400 font-semibold">40% of their time</span> writing grants instead of conducting experiments. 
            In a field where time equals lives, this systemic inefficiency is the single biggest bottleneck to cures.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Left: The Reality */}
             <div className="bg-[#0f1219] rounded-2xl p-8 border border-red-900/20 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
                 
                 <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Traditional Roadblocks</h3>
                 </div>

                 <div className="space-y-6">
                    {[
                        "Federal grant success rates <20% with 18-month timelines",
                        "High administrative burden for small-dollar fundraising",
                        "Limited visibility to non-academic philanthropic capital",
                        "'Valley of Death' funding gaps for translational work",
                        "Development offices prioritized for 8-figure gifts"
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4 items-start">
                            <div className="mt-1 w-4 h-4 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                                <XCircle className="w-2.5 h-2.5 text-red-400" />
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed font-medium">{item}</p>
                        </div>
                    ))}
                 </div>
             </div>

             {/* Right: The Solution */}
             <div className="bg-[#0f1219] rounded-2xl p-8 border border-nexus-secondary/20 relative overflow-hidden group shadow-[0_0_40px_rgba(16,185,129,0.05)]">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-nexus-secondary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
                 
                 <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
                    <div className="w-10 h-10 rounded-full bg-nexus-secondary/10 flex items-center justify-center border border-nexus-secondary/20">
                        <CheckCircle2 className="w-5 h-5 text-nexus-secondary" />
                    </div>
                    <h3 className="text-xl font-bold text-white">The CureNexus Model</h3>
                 </div>

                 <div className="space-y-6">
                    {[
                        "Immediate access to a global liquidity pool of donors",
                        "Automated compliance and institutional gift processing",
                        "Direct visibility to patient advocacy groups",
                        "Milestone-based funding for agile, iterative research",
                        "Democratized access regardless of network or seniority"
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4 items-start">
                            <div className="mt-1 w-4 h-4 rounded-full bg-nexus-secondary/10 border border-nexus-secondary/30 flex items-center justify-center shrink-0">
                                <Check className="w-2.5 h-2.5 text-nexus-secondary" />
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed font-medium">{item}</p>
                        </div>
                    ))}
                 </div>
             </div>
          </div>
        </div>
      </div>

      {/* 4. BENEFITS GRID */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8 text-amber-500" />,
                title: "Access Untapped Funding",
                desc: "Connect with philanthropists, patient families, and foundations actively seeking research to fund. Skip the grant cycle."
              },
              {
                icon: <Clock className="w-8 h-8 text-purple-500" />,
                title: "Spend Time on Science",
                desc: "Stop spending 40% of your time fundraising. Our platform handles discovery, payment processing, and donor relations."
              },
              {
                icon: <Users className="w-8 h-8 text-blue-500" />,
                title: "Build Your Community",
                desc: "Grow a following of supporters who believe in your work. Turn one-time donors into long-term advocates."
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-pink-500" />,
                title: "Track Your Impact",
                desc: "Show funders exactly how their dollars translate to progress. Automated milestone tracking and update tools."
              },
              {
                icon: <Microscope className="w-8 h-8 text-nexus-secondary" />,
                title: "Focus on Rare Diseases",
                desc: "We specialize in pediatric neurological conditions—where traditional funding falls short and families are desperate to help."
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
                title: "Institutional Compliance",
                desc: "All donations flow through your institution's gift processing. We handle tax receipts and documentation."
              }
            ].map((item, i) => (
              <div key={i} className="bg-nexus-panel border border-white/5 p-8 rounded-3xl hover:border-nexus-secondary/30 transition-colors">
                <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. HOW IT WORKS */}
      <div className="py-24 bg-nexus-panel border-y border-white/5">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
               <p className="text-gray-400 text-lg">From signup to funded in five simple steps</p>
            </div>
            
            <div className="space-y-8">
              {[
                {
                   step: "01",
                   title: "Create Your Profile",
                   desc: "Verify your institutional affiliation, link your ORCID, and showcase your credentials. Takes about 15 minutes.",
                   tags: ["Institution verification", "ORCID publication sync", "Research focus areas"]
                },
                {
                   step: "02",
                   title: "Post Your Project",
                   desc: "Describe your research in accessible language. Set funding goals, milestones, and upload supporting documents.",
                   tags: ["Plain-language summary", "Detailed research plan", "Budget breakdown"]
                },
                {
                   step: "03",
                   title: "Get Discovered",
                   desc: "Our matching algorithm connects you with donors interested in your condition area. Share your profile to amplify.",
                   tags: ["Condition-based matching", "Foundation RFP alerts", "Search optimization"]
                },
                {
                   step: "04",
                   title: "Receive Funding",
                   desc: "Donations go directly to your institution's gift account. We handle processing, receipts, and compliance.",
                   tags: ["Secure payment processing", "Institutional gift routing", "Automatic tax receipts"]
                },
                {
                   step: "05",
                   title: "Share Progress",
                   desc: "Post updates as your research advances. Celebrate milestones. Build lasting relationships with your supporters.",
                   tags: ["Progress updates", "Milestone completion", "Impact reporting"]
                }
              ].map((step, i) => (
                <div key={i} className="flex gap-6 md:gap-12">
                   <div className="hidden md:flex flex-col items-center">
                      <div className="w-16 h-16 rounded-2xl border-2 border-white/10 flex items-center justify-center text-xl font-bold text-nexus-secondary/50">
                        {step.step}
                      </div>
                      {i !== 4 && <div className="w-0.5 h-full bg-white/5 my-4"></div>}
                   </div>
                   
                   <div className="flex-1 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                        <span className="md:hidden text-nexus-secondary">{step.step}.</span> {step.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{step.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {step.tags.map(tag => (
                           <span key={tag} className="px-3 py-1 bg-nexus-secondary/10 text-nexus-secondary text-xs font-bold rounded-full">
                             {tag}
                           </span>
                        ))}
                      </div>
                   </div>
                </div>
              ))}
            </div>
         </div>
      </div>

      {/* 6. TESTIMONIALS */}
      <div className="py-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white text-center mb-16">
              From Researchers Like You
              <div className="h-1 w-12 bg-nexus-secondary mx-auto mt-4 rounded-full"></div>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-nexus-secondary/5 border border-nexus-secondary/20 p-8 rounded-3xl relative">
                  <div className="text-4xl text-nexus-secondary mb-4 opacity-50">“</div>
                  <p className="text-lg text-gray-300 italic mb-8">
                    "Within three months, I raised more philanthropic funding than I had in five years of traditional outreach. And I spent maybe 10 hours total on the platform."
                  </p>
                  <div>
                     <div className="font-bold text-white">Dr. Sarah Chen</div>
                     <div className="text-sm text-nexus-secondary">Assistant Professor of Neuroscience</div>
                     <div className="text-xs text-gray-500">Stanford University</div>
                  </div>
               </div>
               
               <div className="bg-nexus-secondary/5 border border-nexus-secondary/20 p-8 rounded-3xl relative">
                  <div className="text-4xl text-nexus-secondary mb-4 opacity-50">“</div>
                  <p className="text-lg text-gray-300 italic mb-8">
                    "The families who fund my research through CureNexus are now my biggest advocates. Two of them connected me with foundation program officers I never would have met otherwise."
                  </p>
                  <div>
                     <div className="font-bold text-white">Dr. Michael Roberts</div>
                     <div className="text-sm text-nexus-secondary">Associate Professor of Pediatric Neurology</div>
                     <div className="text-xs text-gray-500">Boston Children's Hospital</div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* 7. COMPLIANCE */}
      <div className="py-24 bg-[#080b12] border-t border-white/5">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">Built for Institutional</h2>
               <h2 className="text-3xl md:text-5xl font-bold text-nexus-secondary mb-8">Compliance</h2>
               
               <p className="text-lg text-gray-400 mb-10 leading-relaxed">
                  We understand the administrative landscape of academia. CureNexus is designed to 
                  slide seamlessly into your institution's existing gift-processing framework without 
                  creating legal or operational friction.
               </p>
               
               <div className="space-y-4 mb-10">
                  {[
                    "All donations processed as charitable gifts to your 501(c)(3) institution",
                    "Funds deposited directly to your designated research account",
                    "Tax receipts generated per IRS requirements",
                    "No IP claims—donations are gifts, not investments",
                    "Works with your development office, not around them"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                       <CheckCircle2 className="w-5 h-5 text-nexus-secondary shrink-0" />
                       <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
               </div>
               
               <button className="px-6 py-3 border border-gray-600 rounded-lg text-gray-300 hover:text-white hover:border-white transition-colors">
                  View Full Legal Checklist →
               </button>
            </div>
         </div>
      </div>

      {/* 8. BEFORE YOU START CHECKLIST */}
      <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="bg-nexus-panel border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-2">Before You Start</h2>
            <p className="text-gray-400 text-sm mb-8">Quick Eligibility Checklist</p>
            
            <div className="space-y-4 mb-8">
               {[
                 "Notified department chair / PI",
                 "Contacted development office",
                 "Reviewed institutional fundraising policy",
                 "Confirmed gift account can receive funds",
                 "Checked existing grant terms"
               ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer">
                     <div className="w-6 h-6 rounded-md border-2 border-gray-600 group-hover:border-nexus-secondary transition-colors"></div>
                     <span className="text-gray-300 font-medium group-hover:text-white transition-colors">{item}</span>
                  </div>
               ))}
            </div>
            
            <div className="bg-nexus-dark/50 rounded-xl p-4 border border-white/5 flex gap-3">
               <div className="text-amber-500">
                 <Building2 className="w-5 h-5" />
               </div>
               <p className="text-xs text-gray-400 leading-relaxed">
                 Most researchers complete institutional approval in 1-2 weeks. We provide templates and guidance to assist your development office.
               </p>
            </div>
         </div>
      </div>

      {/* 9. FAQ */}
      <div className="py-24 bg-white text-nexus-dark">
         <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-nexus-dark mb-4">Frequently Asked Questions</h2>
               <div className="h-1 w-12 bg-nexus-secondary mx-auto rounded-full"></div>
            </div>
            
            <div className="space-y-4">
              <div className="border border-nexus-secondary/30 rounded-xl bg-nexus-secondary/5 overflow-hidden">
                <div className="px-6 py-6">
                   <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-[#0f4c5c] text-lg">How much does CureNexus cost?</h4>
                      <div className="bg-nexus-secondary text-white rounded-full p-1"><Check className="w-4 h-4" /></div>
                   </div>
                   <p className="text-gray-600 leading-relaxed">
                     CureNexus charges a 3% platform fee on donations received. This covers payment processing, 
                     platform maintenance, donor tools, and tax receipt generation. There are no upfront costs or monthly fees.
                   </p>
                </div>
              </div>
              
              <FAQItem 
                question="How do donations reach my lab?" 
                answer="Donations are aggregated by CureNexus and dispersed via wire transfer directly to your institution's Office of Sponsored Research (or equivalent) designated gift account. We provide full donor data for reconciliation." 
              />
              <FAQItem 
                question="Do I need approval from my institution?" 
                answer="Yes. Because funds are routed to your institution, you must comply with their external fundraising and gift acceptance policies. We provide a 'Development Office Kit' to help speed up this approval." 
              />
              <FAQItem 
                question="Can I accept donations for any research?" 
                answer="Projects must meet our safety and ethical guidelines. Generally, we fund basic science, translational research, and early-stage clinical work in pediatric neurology. All projects must have IRB/IACUC approval if applicable." 
              />
              <FAQItem 
                question="What if I don't reach my funding goal?" 
                answer="CureNexus operates on a 'keep-what-you-raise' model for most project types, ensuring you can use funds for smaller milestones even if the full goal isn't met." 
              />
            </div>
         </div>
      </div>
    </div>
  );
};