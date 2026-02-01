import React, { useState } from 'react';
import { 
  X, ChevronRight, ChevronLeft, Upload, Building2, 
  GraduationCap, FileText, ShieldCheck, CheckCircle2, 
  AlertCircle, Save, User, Link as LinkIcon, Microscope,
  Search
} from 'lucide-react';

interface ResearcherOnboardingProps {
  onClose: () => void;
}

type Step = 'welcome' | 'identity' | 'verification' | 'focus' | 'compliance' | 'review';

export const ResearcherOnboarding: React.FC<ResearcherOnboardingProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [progress, setProgress] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '', // Must be .edu
    institution: '',
    department: '',
    title: '',
    orcid: '',
    facultyUrl: '',
    bio: '',
    focusAreas: [] as string[],
    agreedToTerms: false,
    agreedToRouting: false,
    agreedToEthics: false
  });

  const updateProgress = (step: Step) => {
    switch (step) {
      case 'welcome': setProgress(0); break;
      case 'identity': setProgress(20); break;
      case 'verification': setProgress(40); break;
      case 'focus': setProgress(60); break;
      case 'compliance': setProgress(80); break;
      case 'review': setProgress(95); break;
    }
    setCurrentStep(step);
  };

  const handleNext = () => {
    if (currentStep === 'welcome') updateProgress('identity');
    if (currentStep === 'identity') updateProgress('verification');
    if (currentStep === 'verification') updateProgress('focus');
    if (currentStep === 'focus') updateProgress('compliance');
    if (currentStep === 'compliance') updateProgress('review');
  };

  const handleBack = () => {
    if (currentStep === 'identity') updateProgress('welcome');
    if (currentStep === 'verification') updateProgress('identity');
    if (currentStep === 'focus') updateProgress('verification');
    if (currentStep === 'compliance') updateProgress('focus');
    if (currentStep === 'review') updateProgress('compliance');
  };

  return (
    <div className="fixed inset-0 z-[100] bg-nexus-dark flex flex-col animate-in fade-in duration-300">
      
      {/* Top Navigation Bar */}
      <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-nexus-panel">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-nexus-secondary rounded-lg flex items-center justify-center font-bold text-nexus-dark">C</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">Creating Researcher Profile</span>
            <span className="text-xs text-gray-500 font-mono tracking-wider">DRAFT • {progress}% COMPLETE</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Progress
          </button>
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-white/10 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-800">
        <div 
          className="h-full bg-nexus-secondary transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-12">
          
          {/* STEP 1: WELCOME */}
          {currentStep === 'welcome' && (
            <div className="text-center animate-in slide-in-from-bottom-4 duration-500">
              <div className="w-20 h-20 bg-nexus-secondary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-nexus-secondary/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                <Microscope className="w-10 h-10 text-nexus-secondary" />
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-6">Create Your Researcher Profile</h1>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                Join the CureNexus network to amplify the reach of your research and connect directly 
                with funders who care about your specific area of focus.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
                {[
                  {
                    icon: <ShieldCheck className="w-6 h-6 text-nexus-accent" />,
                    title: "Institutional Verification",
                    desc: "We verify affiliation to ensure donor trust and 501(c)(3) compliance."
                  },
                  {
                    icon: <User className="w-6 h-6 text-purple-400" />,
                    title: "Professional Identity",
                    desc: "Sync with ORCID to populate your publication history automatically."
                  },
                  {
                    icon: <FileText className="w-6 h-6 text-amber-400" />,
                    title: "Grant Readiness",
                    desc: "Prepare to receive funds via your Office of Sponsored Research."
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors">
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>

              <button 
                onClick={handleNext}
                className="px-8 py-4 bg-nexus-secondary text-nexus-dark font-bold text-lg rounded-full hover:bg-emerald-400 transition-all shadow-lg shadow-nexus-secondary/20 flex items-center gap-2 mx-auto"
              >
                Let's Get Started <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* STEP 2: IDENTITY */}
          {currentStep === 'identity' && (
            <div className="animate-in slide-in-from-right-8 duration-300">
              <div className="mb-8">
                <span className="text-xs font-bold text-nexus-secondary tracking-wider uppercase">Step 1 of 5</span>
                <h2 className="text-3xl font-bold text-white mt-2">Basic Information</h2>
                <p className="text-gray-400 mt-2">Please provide your legal name and institutional contact details.</p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-nexus-dark border border-white/10 rounded-lg p-3 text-white focus:border-nexus-secondary focus:outline-none transition-colors"
                      placeholder="Jane"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-nexus-dark border border-white/10 rounded-lg p-3 text-white focus:border-nexus-secondary focus:outline-none transition-colors"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Institutional Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-nexus-dark border border-white/10 rounded-lg p-3 text-white focus:border-nexus-secondary focus:outline-none transition-colors"
                    placeholder="jane.doe@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Must be a valid .edu, .org, or .gov address associated with your institution.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Institution</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                      <input 
                        type="text" 
                        className="w-full bg-nexus-dark border border-white/10 rounded-lg pl-10 p-3 text-white focus:border-nexus-secondary focus:outline-none transition-colors"
                        placeholder="Harvard Medical School"
                        value={formData.institution}
                        onChange={(e) => setFormData({...formData, institution: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Department / Division</label>
                    <input 
                      type="text" 
                      className="w-full bg-nexus-dark border border-white/10 rounded-lg p-3 text-white focus:border-nexus-secondary focus:outline-none transition-colors"
                      placeholder="Neurology"
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Professional Title</label>
                  <select 
                    className="w-full bg-nexus-dark border border-white/10 rounded-lg p-3 text-white focus:border-nexus-secondary focus:outline-none transition-colors appearance-none"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  >
                    <option value="">Select your title...</option>
                    <option value="pi">Principal Investigator / Professor</option>
                    <option value="associate">Associate Professor</option>
                    <option value="assistant">Assistant Professor</option>
                    <option value="postdoc">Postdoctoral Fellow</option>
                    <option value="clinician">Clinical Researcher (MD)</option>
                    <option value="grad">Graduate Student (requires PI sponsorship)</option>
                  </select>
                </div>

                <div>
                   <label className="block text-sm font-medium text-gray-300 mb-2">ORCID iD (Optional)</label>
                   <div className="flex gap-4">
                     <input 
                        type="text" 
                        className="flex-1 bg-nexus-dark border border-white/10 rounded-lg p-3 text-white focus:border-nexus-secondary focus:outline-none transition-colors"
                        placeholder="0000-0000-0000-0000"
                        value={formData.orcid}
                        onChange={(e) => setFormData({...formData, orcid: e.target.value})}
                      />
                      <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 font-medium transition-colors">
                        Verify
                      </button>
                   </div>
                   <div className="mt-4 p-4 bg-nexus-accent/5 border border-nexus-accent/10 rounded-lg flex gap-3">
                      <div className="mt-1"><GraduationCap className="w-5 h-5 text-nexus-accent" /></div>
                      <div className="text-sm text-gray-400">
                        <span className="text-nexus-accent font-bold block mb-1">Why link your ORCID?</span>
                        Linking your ORCID allows us to automatically import your publication history, which significantly increases donor trust scores.
                      </div>
                   </div>
                </div>

              </div>
              
              <div className="flex justify-between mt-12 pt-6 border-t border-white/10">
                 <button onClick={handleBack} className="text-gray-400 hover:text-white px-6 py-3 font-medium">Back</button>
                 <button onClick={handleNext} className="bg-nexus-secondary text-nexus-dark px-8 py-3 rounded-lg font-bold hover:bg-emerald-400 transition-colors">Continue</button>
              </div>
            </div>
          )}

          {/* STEP 3: VERIFICATION */}
          {currentStep === 'verification' && (
            <div className="animate-in slide-in-from-right-8 duration-300">
               <div className="mb-8">
                <span className="text-xs font-bold text-nexus-secondary tracking-wider uppercase">Step 2 of 5</span>
                <h2 className="text-3xl font-bold text-white mt-2">Institutional Verification</h2>
                <p className="text-gray-400 mt-2">We adhere to strict KYC (Know Your Customer) standards for fund distribution.</p>
              </div>

              <div className="space-y-8">
                
                <div className="p-6 bg-nexus-panel border border-white/10 rounded-xl">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <LinkIcon className="w-5 h-5 text-nexus-accent" /> Faculty Profile Link
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                        Please provide the URL to your official faculty or lab profile page on your institution's website.
                    </p>
                    <input 
                      type="url" 
                      className="w-full bg-nexus-dark border border-white/10 rounded-lg p-3 text-white focus:border-nexus-secondary focus:outline-none transition-colors"
                      placeholder="https://medschool.harvard.edu/faculty/jane-doe"
                      value={formData.facultyUrl}
                      onChange={(e) => setFormData({...formData, facultyUrl: e.target.value})}
                    />
                </div>

                <div className="p-6 bg-nexus-panel border border-white/10 rounded-xl">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-nexus-accent" /> Verification Document
                    </h3>
                    <p className="text-sm text-gray-400 mb-6">
                        Please upload one of the following to verify your current status:
                        <ul className="list-disc list-inside mt-2 text-gray-500 ml-2">
                            <li>Institutional ID Badge (Front/Back)</li>
                            <li>Official Appointment Letter (dated within last 12 months)</li>
                            <li>Screenshot of Internal Portal (showing Name & Department)</li>
                        </ul>
                    </p>
                    
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-nexus-accent/50 transition-colors cursor-pointer bg-nexus-dark/50">
                        <Upload className="w-10 h-10 text-gray-500 mx-auto mb-4" />
                        <h4 className="text-white font-medium mb-1">Click to upload document</h4>
                        <p className="text-xs text-gray-500">PDF, JPG, or PNG (Max 5MB)</p>
                    </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-200/80">
                        <strong>Note:</strong> Verification typically takes 24-48 hours. You can draft projects immediately, but they cannot be published until verification is complete.
                    </p>
                </div>

              </div>

              <div className="flex justify-between mt-12 pt-6 border-t border-white/10">
                 <button onClick={handleBack} className="text-gray-400 hover:text-white px-6 py-3 font-medium">Back</button>
                 <button onClick={handleNext} className="bg-nexus-secondary text-nexus-dark px-8 py-3 rounded-lg font-bold hover:bg-emerald-400 transition-colors">Continue</button>
              </div>
            </div>
          )}

          {/* STEP 4: RESEARCH FOCUS */}
          {currentStep === 'focus' && (
            <div className="animate-in slide-in-from-right-8 duration-300">
               <div className="mb-8">
                <span className="text-xs font-bold text-nexus-secondary tracking-wider uppercase">Step 3 of 5</span>
                <h2 className="text-3xl font-bold text-white mt-2">Research Focus</h2>
                <p className="text-gray-400 mt-2">Help donors find you by tagging your specific expertise.</p>
              </div>

              <div className="space-y-6">
                
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Short Professional Bio</label>
                    <textarea 
                        className="w-full bg-nexus-dark border border-white/10 rounded-lg p-4 text-white focus:border-nexus-secondary focus:outline-none transition-colors h-32 resize-none"
                        placeholder="Dr. Doe focuses on the molecular mechanisms of synaptic plasticity in pediatric neurodevelopmental disorders..."
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    />
                    <div className="text-right text-xs text-gray-500 mt-2">0/500 characters</div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Primary Discipline</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {['Neuroscience', 'Genetics', 'Immunology', 'Cell Biology', 'Pharmacology', 'Bioengineering'].map(tag => (
                            <div key={tag} className="flex items-center gap-2 p-3 bg-nexus-dark border border-white/10 rounded-lg hover:border-white/30 cursor-pointer">
                                <div className="w-4 h-4 rounded-full border border-gray-500"></div>
                                <span className="text-sm text-gray-300">{tag}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Specific Conditions / Keywords</label>
                    <div className="relative mb-3">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                        <input 
                            type="text" 
                            className="w-full bg-nexus-dark border border-white/10 rounded-lg pl-10 p-3 text-white focus:border-nexus-secondary focus:outline-none"
                            placeholder="e.g. Cerebral Palsy, HIE, Angelman Syndrome..."
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {['Pediatric Epilepsy', 'Rare Disease', 'Mitochondrial Disorders'].map(tag => (
                            <span key={tag} className="px-3 py-1 bg-nexus-secondary/10 border border-nexus-secondary/20 text-nexus-secondary rounded-full text-sm flex items-center gap-2">
                                {tag} <X className="w-3 h-3 cursor-pointer hover:text-white" />
                            </span>
                        ))}
                    </div>
                </div>

              </div>

              <div className="flex justify-between mt-12 pt-6 border-t border-white/10">
                 <button onClick={handleBack} className="text-gray-400 hover:text-white px-6 py-3 font-medium">Back</button>
                 <button onClick={handleNext} className="bg-nexus-secondary text-nexus-dark px-8 py-3 rounded-lg font-bold hover:bg-emerald-400 transition-colors">Continue</button>
              </div>
            </div>
          )}

          {/* STEP 5: COMPLIANCE */}
          {currentStep === 'compliance' && (
            <div className="animate-in slide-in-from-right-8 duration-300">
               <div className="mb-8">
                <span className="text-xs font-bold text-red-400 tracking-wider uppercase">Step 4 of 5</span>
                <h2 className="text-3xl font-bold text-white mt-2">Fiscal & Ethical Compliance</h2>
                <p className="text-gray-400 mt-2">CureNexus is a funding infrastructure, not a personal donation platform. Please confirm your understanding.</p>
              </div>

              <div className="space-y-6">
                
                <label className="flex items-start gap-4 p-6 bg-nexus-panel border border-white/10 rounded-xl cursor-pointer hover:border-white/20 transition-colors">
                    <div className="mt-1 relative">
                        <input type="checkbox" className="peer sr-only" checked={formData.agreedToRouting} onChange={(e) => setFormData({...formData, agreedToRouting: e.target.checked})} />
                        <div className="w-6 h-6 border-2 border-gray-500 rounded peer-checked:bg-nexus-secondary peer-checked:border-nexus-secondary transition-all"></div>
                        <CheckCircle2 className="w-6 h-6 text-nexus-dark absolute top-0 left-0 opacity-0 peer-checked:opacity-100" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-1">Institutional Fund Routing</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            I understand that all funds raised on CureNexus must be disbursed to a designated account at my institution's Office of Sponsored Research (or equivalent). Funds cannot be routed to personal bank accounts.
                        </p>
                    </div>
                </label>

                <label className="flex items-start gap-4 p-6 bg-nexus-panel border border-white/10 rounded-xl cursor-pointer hover:border-white/20 transition-colors">
                    <div className="mt-1 relative">
                        <input type="checkbox" className="peer sr-only" checked={formData.agreedToEthics} onChange={(e) => setFormData({...formData, agreedToEthics: e.target.checked})} />
                        <div className="w-6 h-6 border-2 border-gray-500 rounded peer-checked:bg-nexus-secondary peer-checked:border-nexus-secondary transition-all"></div>
                        <CheckCircle2 className="w-6 h-6 text-nexus-dark absolute top-0 left-0 opacity-0 peer-checked:opacity-100" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-1">Ethical Approval (IRB/IACUC)</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            I certify that any research involving human subjects or animals funded through this platform will obtain necessary Institutional Review Board (IRB) or IACUC approval before funds are spent.
                        </p>
                    </div>
                </label>

                <label className="flex items-start gap-4 p-6 bg-nexus-panel border border-white/10 rounded-xl cursor-pointer hover:border-white/20 transition-colors">
                    <div className="mt-1 relative">
                        <input type="checkbox" className="peer sr-only" checked={formData.agreedToTerms} onChange={(e) => setFormData({...formData, agreedToTerms: e.target.checked})} />
                        <div className="w-6 h-6 border-2 border-gray-500 rounded peer-checked:bg-nexus-secondary peer-checked:border-nexus-secondary transition-all"></div>
                        <CheckCircle2 className="w-6 h-6 text-nexus-dark absolute top-0 left-0 opacity-0 peer-checked:opacity-100" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-1">Authorization to Solicit</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            I confirm that I am authorized by my institution to solicit philanthropic funding for my research program.
                        </p>
                    </div>
                </label>

              </div>

              <div className="flex justify-between mt-12 pt-6 border-t border-white/10">
                 <button onClick={handleBack} className="text-gray-400 hover:text-white px-6 py-3 font-medium">Back</button>
                 <button 
                    onClick={handleNext} 
                    disabled={!formData.agreedToRouting || !formData.agreedToEthics || !formData.agreedToTerms}
                    className="bg-nexus-secondary disabled:opacity-50 disabled:cursor-not-allowed text-nexus-dark px-8 py-3 rounded-lg font-bold hover:bg-emerald-400 transition-colors"
                 >
                    Review & Submit
                 </button>
              </div>
            </div>
          )}

           {/* STEP 6: REVIEW */}
           {currentStep === 'review' && (
            <div className="animate-in slide-in-from-right-8 duration-300 text-center py-10">
               <div className="w-24 h-24 bg-nexus-secondary/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-12 h-12 text-nexus-secondary" />
               </div>
               
               <h2 className="text-4xl font-bold text-white mb-4">You're All Set!</h2>
               <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                 Your profile has been created and is pending verification. You can now access your dashboard and start drafting your first project proposal.
               </p>

               <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-lg mx-auto mb-12 text-left">
                  <h3 className="text-white font-bold mb-4 border-b border-white/10 pb-2">Next Steps</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3 text-gray-300 text-sm">
                      <div className="w-6 h-6 rounded-full bg-nexus-secondary/20 text-nexus-secondary flex items-center justify-center font-bold text-xs">1</div>
                      Verify your email address (check your inbox).
                    </li>
                    <li className="flex gap-3 text-gray-300 text-sm">
                      <div className="w-6 h-6 rounded-full bg-nexus-secondary/20 text-nexus-secondary flex items-center justify-center font-bold text-xs">2</div>
                      Our team reviews your credentials (approx. 24 hours).
                    </li>
                    <li className="flex gap-3 text-gray-300 text-sm">
                      <div className="w-6 h-6 rounded-full bg-nexus-secondary/20 text-nexus-secondary flex items-center justify-center font-bold text-xs">3</div>
                      Once verified, you can publish projects to donors.
                    </li>
                  </ul>
               </div>

               <button 
                onClick={onClose}
                className="px-8 py-4 bg-nexus-secondary text-nexus-dark font-bold text-lg rounded-full hover:bg-emerald-400 transition-all shadow-lg shadow-nexus-secondary/20"
               >
                 Go to Researcher Dashboard
               </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};