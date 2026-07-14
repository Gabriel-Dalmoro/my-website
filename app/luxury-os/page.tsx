'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Brain, 
  Activity, 
  Zap, 
  Award, 
  FileText, 
  Check, 
  X,
  MessageSquare,
  ClipboardList,
  ShieldCheck,
  Compass
} from 'lucide-react';

// Interfaces for our visual simulation steps
interface SimulationStep {
  title: string;
  system: string;
  description: string;
  badge: string;
  highlightNode: 'mindbody' | 'weave' | 'tool' | 'none';
  visualData: React.ReactNode;
}

export default function LuxuryOSProposal() {
  const [activePillar, setActivePillar] = useState<'record' | 'engagement' | 'operations'>('operations');
  const [simStep, setSimStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Logo Assets
  const MINDBODY_LOGO = "https://www.mindbodyonline.com/sites/default/files/public/styles/scale_1470w/public/2025-10/brand-toolkit-logomark.png.webp?itok=9kdwgqHQ";
  const WEAVE_LOGO = "https://mms.businesswire.com/media/20230413005832/en/1763692/22/Weave_Logo.jpg";
  const SHEETS_LOGO = "https://cdn-icons-png.flaticon.com/512/5968/5968557.png";

  // Data simulation timeline steps
  const simulationSteps: SimulationStep[] = [
    {
      title: "Patient Booking Confirmed",
      system: "Mindbody (System of Record)",
      description: "Sarah Booker schedules a luxury 'Custom Dermaplaning & Infusion' for tomorrow at 2:00 PM with Provider Claire.",
      badge: "Inbound Trigger",
      highlightNode: 'mindbody',
      visualData: (
        <div className="bg-[#FAF9F6] border border-neutral-100 rounded-xl p-4 shadow-sm text-left max-w-sm mx-auto">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-neutral-100">
            <span className="font-sans-clean text-[10px] font-bold text-neutral-400 uppercase">Mindbody API Payload</span>
            <span className="text-[10px] bg-[#C5A059]/10 text-[#C5A059] px-2 py-0.5 rounded font-bold">STATUS: CONFIRMED</span>
          </div>
          <p className="font-serif-luxury text-sm font-semibold text-[#222222]">Sarah Booker</p>
          <p className="font-sans-clean text-xs text-neutral-500 mt-1">Treatment: Dermaplaning & Infusion (90 min)</p>
          <p className="font-sans-clean text-xs text-neutral-500">Provider: Claire · Room 3</p>
        </div>
      )
    },
    {
      title: "Intelligent Triage & Middleware Routing",
      system: "Business Operations Core",
      description: "The system reads treatment rules: Dermaplaning requires 24-hour pre-treatment instructions (avoid retinol, direct sunlight). System checks if Sarah has a signed consent form.",
      badge: "Decision Logic",
      highlightNode: 'none',
      visualData: (
        <div className="bg-[#FAF9F6] border border-neutral-100 rounded-xl p-4 shadow-sm text-left max-w-sm mx-auto flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#C5A059]">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span className="font-sans-clean text-xs font-semibold">Validating Workflows</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-sans-clean text-neutral-600">
              <span>Consent Form Status:</span>
              <span className="text-amber-600 font-semibold">Missing (needs dispatch)</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-sans-clean text-neutral-600">
              <span>Pre-Care Notice:</span>
              <span className="text-emerald-600 font-semibold">Retinol Precaution Required</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Personalized Outreach Queued",
      system: "Weave (System of Engagement)",
      description: "Instead of a cold automated text, Weave prepares a personalized SMS containing instructions and the digital consent form link, staging it cleanly for instant dispatch.",
      badge: "Patient Outreach",
      highlightNode: 'weave',
      visualData: (
        <div className="bg-[#FAF9F6] border border-neutral-100 rounded-xl p-4 shadow-sm text-left max-w-sm mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
            <span className="font-sans-clean text-[10px] font-bold text-neutral-400 uppercase">Staged SMS Notification</span>
          </div>
          <div className="p-3 bg-white rounded-lg border border-neutral-100">
            <p className="font-sans-clean text-xs text-neutral-700 leading-relaxed">
              "Hi Sarah, we're looking forward to your Dermaplaning treatment tomorrow at 2:00 PM with Claire. Please avoid using retinol tonight. Kindly review and sign your consent form here: <span className="text-[#C5A059] underline font-medium">luxe.os/form-422</span>"
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Operations Hub Updated",
      system: "The TOOL (System of Operations)",
      description: "Google Sheets is populated automatically.Claire's daily schedule updates, room checklists are assigned, and commissions are projected, eliminating double entry.",
      badge: "Operational Sync",
      highlightNode: 'tool',
      visualData: (
        <div className="bg-[#FAF9F6] border border-neutral-100 rounded-xl p-4 shadow-sm text-left max-w-sm mx-auto">
          <span className="font-sans-clean text-[10px] font-bold text-neutral-400 uppercase block mb-2">Google Sheets Sync Result</span>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px] font-mono border-collapse">
              <thead>
                <tr className="bg-neutral-100 border-b border-neutral-200">
                  <th className="p-1 text-left font-semibold">Provider</th>
                  <th className="p-1 text-left font-semibold">Room</th>
                  <th className="p-1 text-left font-semibold">Task Checklist</th>
                  <th className="p-1 text-right font-semibold">Commission</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-100">
                  <td className="p-1 text-[#222222]">Claire</td>
                  <td className="p-1">3</td>
                  <td className="p-1 text-amber-600">Form Required</td>
                  <td className="p-1 text-right text-emerald-600 font-bold">$48.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    }
  ];

  // Simulation runner logic
  const startSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(1);
  };

  useEffect(() => {
    if (!isSimulating) return;
    if (simStep === 0) return;

    if (simStep <= simulationSteps.length) {
      const timer = setTimeout(() => {
        setSimStep(prev => prev + 1);
      }, 3500); // 3.5s per step to let the user easily read the UI state
      return () => clearTimeout(timer);
    } else {
      setIsSimulating(false);
      setSimStep(0);
    }
  }, [simStep, isSimulating]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#222222] font-sans selection:bg-[#FACE0D] selection:text-[#222222] overflow-x-hidden">
      {/* Import luxury fonts */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Inter:wght@200;300;400;500;600;700&display=swap');
        .font-serif-luxury { font-family: 'Cormorant Garamond', serif; }
        .font-sans-clean { font-family: 'Inter', sans-serif; }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
      `}} />

      {/* 1. Header (Collaboration Focus) */}
      <header className="border-b border-[#FAF9F6] bg-[#FAF9F6]/80 backdrop-blur-md sticky top-0 z-[100] transition-all duration-300 py-6 px-8 shadow-[0_1px_15px_-10px_rgba(0,0,0,0.05)] border-b-neutral-200/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Logo & Collaboration */}
          <div className="flex items-center gap-5">
            {/* Prospect Luxury Logo placeholder */}
            <div className="flex items-center gap-2">
              <span className="font-serif-luxury text-2xl tracking-[0.2em] font-semibold text-[#222222]">LUXURY</span>
              <span className="font-sans-clean text-[10px] tracking-[0.3em] font-light text-[#C5A059] uppercase px-2 py-0.5 border border-[#C5A059]/30 rounded">OS</span>
            </div>
            
            <X className="w-3.5 h-3.5 text-neutral-300 shrink-0" strokeWidth={2.5} />
            
            {/* Gabriel Dalmoro Brand Collaboration Logo */}
            <div className="flex items-center gap-3 bg-white pl-3 pr-4 py-2 rounded-full border border-neutral-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div className="relative">
                <img 
                  src="/favicon.png" 
                  alt="Gabriel Dalmoro Logo" 
                  className="h-7 w-7 rounded-full object-contain shrink-0 border border-neutral-200"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#FACE0D] rounded-full border-2 border-white"></span>
              </div>
              <div className="leading-none text-left">
                <span className="font-serif-luxury text-sm font-semibold tracking-wide text-[#222222] block">Gabriel Dalmoro</span>
                <span className="font-sans-clean text-[8px] tracking-[0.1em] font-semibold text-neutral-400 uppercase">Partner Architect</span>
              </div>
            </div>
          </div>

          {/* Right Status */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A059]"></span>
              </span>
              <span className="font-sans-clean text-xs font-medium tracking-widest text-[#C5A059] uppercase">Interactive Proposal</span>
            </div>
            <a 
              href="#alignment" 
              className="font-sans-clean text-xs font-semibold tracking-widest text-[#222222] bg-[#FACE0D] hover:bg-[#ebd038] px-5 py-2.5 rounded transition-all duration-200 shadow-sm uppercase"
            >
              Align Proposal
            </a>
          </div>

        </div>
      </header>

      {/* Background soft glow decoration */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-radial-gradient from-[#C5A059]/5 to-transparent rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[80vh] left-0 w-[40vw] h-[40vw] bg-radial-gradient from-[#FACE0D]/5 to-transparent rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* 2. Hero Section */}
      <section className="relative z-10 pt-20 pb-28 px-6 text-center max-w-6xl mx-auto">
        
        {/* Passphrase Badge */}
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-[#C5A059]/20 shadow-[0_4px_20px_rgba(197,160,89,0.04)] mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FACE0D]" />
          <span className="font-sans-clean text-xs font-semibold tracking-[0.25em] text-[#C5A059] uppercase">Project Code: Luxury OS</span>
        </div>

        {/* Serif Headline */}
        <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl text-[#222222] tracking-tight leading-[1.1] mb-8 font-light max-w-5xl mx-auto">
          Architecture Before Automation:<br />
          <span className="font-serif-luxury italic font-normal text-[#C5A059]">Scaling the Modern</span> Medical Spa Operating System
        </h1>

        {/* Subheadline */}
        <p className="font-serif-luxury text-xl sm:text-2xl font-light text-neutral-500 max-w-3xl mx-auto leading-relaxed mb-12 italic">
          "A strategic response for a visionary founder scaling operations from manual processes to an unshakeable, automated foundation."
        </p>

        {/* Intro Paragraph & Bio */}
        <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-sm p-8 sm:p-12 rounded-3xl border border-neutral-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)] text-left">
          
          <div className="border-l-2 border-[#C5A059] pl-6 mb-8 py-1">
            <span className="font-sans-clean text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.2em] block mb-1">Architectural Philosophy</span>
            <p className="font-serif-luxury text-lg text-[#222222] italic font-light">
              "Build the business processes correctly first, and automate them second."
            </p>
          </div>

          <p className="font-sans-clean text-sm sm:text-base text-neutral-600 leading-relaxed mb-6">
            I understand that your project isn't about rushing to write lines of code or deploying complex bots. It is about strategic design. I act as your <strong>Business Systems Architect & Solutions Architect</strong> to design the technical blueprint of your entire ecosystem first, ensuring your operational workflows are robust, documented, and repeatable before a single line of software is run.
          </p>
          
          <p className="font-sans-clean text-sm sm:text-base text-neutral-600 leading-relaxed mb-6">
            Drawing on a <strong>Business Administration degree</strong> combined with hands-on experience as a former business operator, I align tech decisions with spa economics and staff habits. Backed by deep <strong>Full-Stack Software Engineering experience</strong>, I partner with you to dissect your documented patient journeys, coordinate Mindbody and Weave APIs, and map out precisely which workflows should remain manual today vs. transition to code tomorrow.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-neutral-100">
            <div className="flex items-center gap-4">
              <Award className="w-8 h-8 text-[#C5A059] shrink-0" strokeWidth={1.2} />
              <div>
                <p className="font-serif-luxury text-base font-semibold text-[#222222]">Systems Architecture</p>
                <p className="font-sans-clean text-xs text-neutral-400">Process modeling & API blueprinting</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Brain className="w-8 h-8 text-[#FACE0D] shrink-0" strokeWidth={1.2} />
              <div>
                <p className="font-serif-luxury text-base font-semibold text-[#222222]">Pragmatic Automation</p>
                <p className="font-sans-clean text-xs text-neutral-400">Stable data layer before AI concierge</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 3. The Three Pillars Section */}
      <section className="bg-[#F5F5F3] py-24 sm:py-32 px-6 border-y border-neutral-200/40 relative">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <p className="font-sans-clean text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold mb-3">Ecosystem Mapping</p>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#222222] font-light">The Three Pillars of Spa Operations</h2>
            <p className="font-sans-clean text-neutral-500 max-w-2xl mx-auto mt-4 text-sm sm:text-base">
              Connecting patient records, communications, and checkouts into a unified, secure system of truth.
            </p>
          </div>

          {/* Pillars Cards (Interactive Tabs) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left selector cards */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              {/* Pillar 1 */}
              <button 
                onClick={() => { setActivePillar('record'); }}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 ${
                  activePillar === 'record' 
                    ? 'bg-white border-[#C5A059] shadow-[0_8px_30px_rgba(197,160,89,0.06)]' 
                    : 'bg-white/40 border-neutral-200/60 hover:bg-white/80'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Mindbody Logo Box */}
                  <div className="w-12 h-12 rounded-xl shrink-0 overflow-hidden border border-neutral-100 flex items-center justify-center bg-white shadow-sm">
                    <img 
                      src={MINDBODY_LOGO} 
                      alt="Mindbody" 
                      className={`h-7 w-7 object-contain transition-all duration-300 ${activePillar === 'record' ? 'grayscale-0' : 'grayscale opacity-75'}`}
                    />
                  </div>
                  <div>
                    <h3 className="font-serif-luxury text-lg font-bold text-[#222222] mb-1">Pillar 1: System of Record</h3>
                    <p className="font-sans-clean text-xs font-semibold text-[#C5A059] tracking-wider uppercase mb-2">Mindbody Core</p>
                    <p className="font-sans-clean text-xs text-neutral-500 leading-relaxed">
                      Manages scheduling, memberships, patient record states, check-ins, medical charts, and financial transactions.
                    </p>
                  </div>
                </div>
              </button>

              {/* Pillar 2 */}
              <button 
                onClick={() => { setActivePillar('engagement'); }}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 ${
                  activePillar === 'engagement' 
                    ? 'bg-white border-[#C5A059] shadow-[0_8px_30px_rgba(197,160,89,0.06)]' 
                    : 'bg-white/40 border-neutral-200/60 hover:bg-white/80'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Weave Logo Box */}
                  <div className="w-12 h-12 rounded-xl shrink-0 overflow-hidden border border-neutral-100 flex items-center justify-center bg-white shadow-sm">
                    <img 
                      src={WEAVE_LOGO} 
                      alt="Weave" 
                      className={`h-7 w-7 object-contain transition-all duration-300 ${activePillar === 'engagement' ? 'grayscale-0' : 'grayscale opacity-75'}`}
                    />
                  </div>
                  <div>
                    <h3 className="font-serif-luxury text-lg font-bold text-[#222222] mb-1">Pillar 2: System of Engagement</h3>
                    <p className="font-sans-clean text-xs font-semibold text-[#C5A059] tracking-wider uppercase mb-2">Weave Communications</p>
                    <p className="font-sans-clean text-xs text-neutral-500 leading-relaxed">
                      Powers real-time touchpoints across texting, phone lines, patient check-in notifications, and review prompts.
                    </p>
                  </div>
                </div>
              </button>

              {/* Pillar 3 */}
              <button 
                onClick={() => { setActivePillar('operations'); }}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 ${
                  activePillar === 'operations' 
                    ? 'bg-white border-[#C5A059] shadow-[0_8px_30px_rgba(197,160,89,0.06)]' 
                    : 'bg-white/40 border-neutral-200/60 hover:bg-white/80'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Google Sheets Logo Box */}
                  <div className="w-12 h-12 rounded-xl shrink-0 overflow-hidden border border-neutral-100 flex items-center justify-center bg-white shadow-sm">
                    <img 
                      src={SHEETS_LOGO} 
                      alt="Google Sheets" 
                      className={`h-6 w-6 object-contain transition-all duration-300 ${activePillar === 'operations' ? 'grayscale-0' : 'grayscale opacity-75'}`}
                    />
                  </div>
                  <div>
                    <h3 className="font-serif-luxury text-lg font-bold text-[#222222] mb-1">Pillar 3: System of Operations</h3>
                    <p className="font-sans-clean text-xs font-semibold text-[#C5A059] tracking-wider uppercase mb-2">The Custom TOOL</p>
                    <p className="font-sans-clean text-xs text-neutral-500 leading-relaxed">
                      Google Sheets hub managing daily checklists, provider commissions, treatment room assignments, and KPI reports.
                    </p>
                  </div>
                </div>
              </button>

            </div>

            {/* Right Display Console - Redesigned, Beautiful & Non-Technical */}
            <div className="lg:col-span-7 flex flex-col bg-white rounded-3xl border border-neutral-200/60 shadow-[0_15px_50px_rgba(0,0,0,0.02)] overflow-hidden">
              
              {/* Screen Top Bar */}
              <div className="bg-[#FAF9F6] px-6 py-4 flex items-center justify-between border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-200"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-200"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-200"></span>
                  <span className="font-sans-clean text-[10px] text-neutral-400 font-semibold tracking-wider uppercase ml-4">
                    Ecosystem Blueprints
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-sans-clean font-light">
                  <Activity className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
                  <span>Pipeline Sync</span>
                </div>
              </div>

              {/* Console Body */}
              <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
                
                {/* Active Details */}
                <div className="mb-8">
                  <AnimatePresence mode="wait">
                    {activePillar === 'record' && (
                      <motion.div
                        key="record"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <img src={MINDBODY_LOGO} alt="Mindbody Logo" className="h-6 w-6 object-contain" />
                          <h4 className="font-serif-luxury text-2xl text-[#222222] font-semibold">Mindbody Integration Core</h4>
                        </div>
                        <p className="font-sans-clean text-sm text-neutral-500 leading-relaxed mb-6">
                          Mindbody holds patient record histories and active schedule coordinates. We study its webhooks to track exactly when bookings are made, updated, or canceled, laying down the groundwork to feed downstream engagement pipelines automatically.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                            <span className="text-[10px] font-semibold tracking-widest text-[#C5A059] uppercase block mb-1">Architecture Goal</span>
                            <span className="text-xs font-medium text-[#222222]">Zero-latency capture of booking schedules.</span>
                          </div>
                          <div className="p-4 bg-[#C5A059]/5 rounded-xl border border-[#C5A059]/10">
                            <span className="text-[10px] font-semibold tracking-widest text-[#C5A059] uppercase block mb-1">Process Standard</span>
                            <span className="text-xs font-medium text-[#222222]">Maintains clinical data integrity at the source.</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activePillar === 'engagement' && (
                      <motion.div
                        key="engagement"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <img src={WEAVE_LOGO} alt="Weave Logo" className="h-6 w-6 object-contain" />
                          <h4 className="font-serif-luxury text-2xl text-[#222222] font-semibold">Weave Patient outreach</h4>
                        </div>
                        <p className="font-sans-clean text-sm text-neutral-500 leading-relaxed mb-6">
                          Weave regulates the customer communication lifecycle. Once the underlying business logic decides a patient requires a specific message (like a skin preparation guide before a chemical peel), Weave APIs dispatch it automatically.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                            <span className="text-[10px] font-semibold tracking-widest text-[#C5A059] uppercase block mb-1">Architecture Goal</span>
                            <span className="text-xs font-medium text-[#222222]">Eliminates manual templates and delays.</span>
                          </div>
                          <div className="p-4 bg-[#C5A059]/5 rounded-xl border border-[#C5A059]/10">
                            <span className="text-[10px] font-semibold tracking-widest text-[#C5A059] uppercase block mb-1">Process Standard</span>
                            <span className="text-xs font-medium text-[#222222]">Warm, precise patient touches on SMS & Phone.</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activePillar === 'operations' && (
                      <motion.div
                        key="operations"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <img src={SHEETS_LOGO} alt="Google Sheets Logo" className="h-6 w-6 object-contain" />
                          <h4 className="font-serif-luxury text-2xl text-[#222222] font-semibold">Google Sheets Operational Hub</h4>
                        </div>
                        <p className="font-sans-clean text-sm text-neutral-500 leading-relaxed mb-6">
                          Google Sheets functions as the brain for staff checklists and payroll. Keeping this manual initially is a smart decision—it refines business rules before coding. When ready, sheets sync with Mindbody to remove double data entry.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                            <span className="text-[10px] font-semibold tracking-widest text-[#C5A059] uppercase block mb-1">Architecture Goal</span>
                            <span className="text-xs font-medium text-[#222222]">Autofills provider logs and checklists.</span>
                          </div>
                          <div className="p-4 bg-[#C5A059]/5 rounded-xl border border-[#C5A059]/10">
                            <span className="text-[10px] font-semibold tracking-widest text-[#C5A059] uppercase block mb-1">Process Standard</span>
                            <span className="text-xs font-medium text-[#222222]">Protects business calculations from manual slips.</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Graphical & Non-Technical Simulation Interface */}
                <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-neutral-100">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <span className="font-sans-clean text-xs font-bold text-[#222222] uppercase tracking-wide block">Data Flow Blueprint</span>
                      <span className="font-sans-clean text-[11px] text-neutral-400">Visualizing how systems synchronize</span>
                    </div>
                    
                    {!isSimulating ? (
                      <button 
                        onClick={startSimulation}
                        className="px-4 py-2 bg-[#222222] text-[#FAF9F6] hover:bg-neutral-800 transition-all font-sans-clean text-xs font-semibold tracking-wider rounded uppercase flex items-center gap-2"
                      >
                        <Zap className="w-3.5 h-3.5 text-[#FACE0D]" /> Simulate Journey
                      </button>
                    ) : (
                      <div className="px-4 py-2 bg-[#C5A059]/10 text-[#C5A059] font-sans-clean text-[10px] font-bold tracking-widest rounded uppercase animate-pulse">
                        Simulating Flow...
                      </div>
                    )}
                  </div>

                  {/* Graphical Workflow Layout - 4 Interactive Nodes */}
                  <div className="grid grid-cols-4 gap-2 sm:gap-4 items-center relative py-6 px-2 bg-white rounded-xl border border-neutral-100 shadow-sm mb-6">
                    
                    {/* Node 1: Mindbody */}
                    <button 
                      onClick={() => { setIsSimulating(false); setSimStep(1); }}
                      className="flex flex-col items-center text-center relative z-10 focus:outline-none group"
                    >
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-white border-2 transition-all duration-300 shadow-sm ${
                        simStep === 1 
                          ? 'border-[#C5A059] scale-110 ring-4 ring-[#C5A059]/10 shadow-[0_0_15px_rgba(197,160,89,0.2)]' 
                          : 'border-neutral-200 group-hover:border-neutral-300'
                      }`}>
                        <img src={MINDBODY_LOGO} alt="Mindbody Node" className="h-6 w-6 object-contain" />
                      </div>
                      <span className="font-sans-clean text-[9px] sm:text-[10px] font-semibold text-neutral-500 mt-2">Mindbody</span>
                    </button>

                    {/* Node 2: Middleware Logic */}
                    <button 
                      onClick={() => { setIsSimulating(false); setSimStep(2); }}
                      className="flex flex-col items-center text-center relative z-10 focus:outline-none group"
                    >
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-white border-2 transition-all duration-300 shadow-sm ${
                        simStep === 2 
                          ? 'border-[#C5A059] scale-110 ring-4 ring-[#C5A059]/10 shadow-[0_0_15px_rgba(197,160,89,0.2)]' 
                          : 'border-neutral-200 group-hover:border-neutral-300'
                      }`}>
                        <Compass className={`w-5 h-5 transition-colors ${simStep === 2 ? 'text-[#C5A059]' : 'text-neutral-400 group-hover:text-neutral-600'}`} />
                      </div>
                      <span className="font-sans-clean text-[9px] sm:text-[10px] font-semibold text-neutral-500 mt-2">Middleware</span>
                    </button>

                    {/* Node 3: Weave SMS */}
                    <button 
                      onClick={() => { setIsSimulating(false); setSimStep(3); }}
                      className="flex flex-col items-center text-center relative z-10 focus:outline-none group"
                    >
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-white border-2 transition-all duration-300 shadow-sm ${
                        simStep === 3 
                          ? 'border-[#C5A059] scale-110 ring-4 ring-[#C5A059]/10 shadow-[0_0_15px_rgba(197,160,89,0.2)]' 
                          : 'border-neutral-200 group-hover:border-neutral-300'
                      }`}>
                        <img src={WEAVE_LOGO} alt="Weave Node" className="h-6 w-6 object-contain" />
                      </div>
                      <span className="font-sans-clean text-[9px] sm:text-[10px] font-semibold text-neutral-500 mt-2">Weave SMS</span>
                    </button>

                    {/* Node 4: The TOOL */}
                    <button 
                      onClick={() => { setIsSimulating(false); setSimStep(4); }}
                      className="flex flex-col items-center text-center relative z-10 focus:outline-none group"
                    >
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-white border-2 transition-all duration-300 shadow-sm ${
                        simStep === 4 
                          ? 'border-[#C5A059] scale-110 ring-4 ring-[#C5A059]/10 shadow-[0_0_15px_rgba(197,160,89,0.2)]' 
                          : 'border-neutral-200 group-hover:border-neutral-300'
                      }`}>
                        <img src={SHEETS_LOGO} alt="Sheets Node" className="h-5 h-5 sm:h-6 sm:w-6 object-contain" />
                      </div>
                      <span className="font-sans-clean text-[9px] sm:text-[10px] font-semibold text-neutral-500 mt-2">The TOOL</span>
                    </button>

                    {/* Connecting Visual Lines */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-4 h-0.5 bg-neutral-100 z-0 px-8 sm:px-14">
                      {/* Active Connection Line Glow */}
                      <div className="h-full bg-[#C5A059]/30 transition-all duration-500" style={{
                        width: simStep === 0 ? '0%' : simStep === 1 ? '0%' : simStep === 2 ? '33%' : simStep === 3 ? '66%' : '100%'
                      }}></div>
                    </div>

                  </div>

                  {/* Flow Step Description Console */}
                  <div className="bg-white p-5 rounded-xl border border-neutral-100 shadow-sm min-h-[160px] flex items-center justify-center text-center">
                    <AnimatePresence mode="wait">
                      {simStep === 0 ? (
                        <motion.div
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col items-center"
                        >
                          <Zap className="w-8 h-8 text-[#C5A059]/30 mb-2 animate-float" />
                          <p className="font-serif-luxury text-sm text-neutral-400 italic">
                            Click "Simulate Journey" to animate the workflow flow.
                          </p>
                        </motion.div>
                      ) : (
                        simulationSteps[simStep - 1] && (
                          <motion.div
                            key={simStep}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.25 }}
                            className="w-full text-left"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-sans-clean text-[10px] font-bold text-[#C5A059] uppercase tracking-wider bg-[#C5A059]/10 px-2.5 py-1 rounded">
                                Step {simStep}: {simulationSteps[simStep - 1].badge}
                              </span>
                              <span className="font-sans-clean text-[10px] text-neutral-400 font-semibold">
                                {simulationSteps[simStep - 1].system}
                              </span>
                            </div>
                            <h5 className="font-serif-luxury text-lg font-bold text-[#222222] mb-1">
                              {simulationSteps[simStep - 1].title}
                            </h5>
                            <p className="font-sans-clean text-xs text-neutral-500 leading-relaxed mb-4">
                              {simulationSteps[simStep - 1].description}
                            </p>
                            {simulationSteps[simStep - 1].visualData}
                          </motion.div>
                        )
                      )}
                    </AnimatePresence>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. Challenging the Assumptions (Strategic Insights) */}
      <section className="py-24 sm:py-32 px-6 max-w-6xl mx-auto">
        <div className="mb-20 text-center md:text-left md:flex md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-sans-clean text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold mb-3">Strategic Blueprinting</p>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#222222] font-light">Architectural Realities</h2>
          </div>
          <p className="font-sans-clean text-neutral-500 mt-4 md:mt-0 max-w-xs text-sm leading-relaxed">
            Thoughtful operational structure yields reliable automation. We build the processes first.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Card A */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-neutral-100 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:border-[#C5A059]/20 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center mb-6">
                <ClipboardList className="w-5 h-5" />
              </div>
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#222222] mb-4">
                A. The Evolution of "TOOL" (From Sheet to Software)
              </h3>
              <p className="font-sans-clean text-neutral-600 text-sm leading-relaxed mb-4">
                Google Sheets is excellent for mapping active business rules initially. Keeping it manual now is the correct choice to refine calculations and checklists.
              </p>
              <p className="font-sans-clean text-neutral-600 text-sm leading-relaxed">
                As transactions increase, spreadsheet constraints arise—lack of user permissions, data drift, and formula breaks. When ready, we formulate a migration path, syncing calculations into a PostgreSQL database with a clean, spreadsheet-like interface that locks critical rows automatically.
              </p>
            </div>
            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-neutral-100">
              <img src={SHEETS_LOGO} alt="Sheets Logo" className="h-4 w-auto" />
              <span className="font-sans-clean text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Operational Lifecycle</span>
            </div>
          </div>

          {/* Card B */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-neutral-100 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:border-[#C5A059]/20 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center mb-6">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#222222] mb-4">
                B. "Chloe" – The Invisible Concierge
              </h3>
              <p className="font-sans-clean text-neutral-600 text-sm leading-relaxed mb-4">
                In a luxury market, customer-facing AI bots can feel clinical or impersonal. High-value patients demand human care. Postponing "Chloe" until business workflows are completely mapped is a highly strategic move.
              </p>
              <p className="font-sans-clean text-neutral-600 text-sm leading-relaxed">
                When ready, we implement "Chloe" as an <strong>invisible backend processor</strong> first. Chloe reads incoming messages, parses sentiment, pulls clinic record histories from Mindbody, and tags events for spa staff, letting your team respond with high-touch personalization.
              </p>
            </div>
            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-neutral-100">
              <span className="w-2 h-2 rounded-full bg-[#FACE0D]"></span>
              <span className="font-sans-clean text-[10px] text-neutral-400 font-bold uppercase tracking-wider">AI Operations Integration</span>
            </div>
          </div>

          {/* Card C (Full Width on Large Screens) */}
          <div className="md:col-span-2 bg-white p-8 sm:p-10 rounded-3xl border border-neutral-100 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:border-[#C5A059]/20 transition-all duration-300 flex flex-col md:flex-row gap-6 md:gap-10 items-start">
            <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center mb-0 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#222222] mb-4">
                C. Mindbody Custom Event Scaling & Security
              </h3>
              <p className="font-sans-clean text-neutral-600 text-sm leading-relaxed mb-4">
                Standard webhook patterns drop messages when booking services crash or APIs refresh. A dropped webhook means lost commission tracking or missed treatment prep cards.
              </p>
              <p className="font-sans-clean text-neutral-600 text-sm leading-relaxed">
                To guarantee scaling, we build an asynchronous queue system. If Mindbody is overloaded, bookings are preserved and processed sequentially once resources clear. This protects provider checks, checklist configurations, and financial records from data loss.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Proof of Concept Section (Case Study) */}
      <section className="bg-white py-24 sm:py-32 px-6 border-t border-neutral-200/40">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16">
            <p className="font-sans-clean text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold mb-3">Case Study Profile</p>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#222222] font-light">Medical Niche Case Study</h2>
          </div>

          {/* Lantern Case study card */}
          <div className="border border-neutral-200/60 rounded-3xl bg-[#FAF9F6] p-8 sm:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.015)] relative overflow-hidden">
            
            {/* Absolute accent stripe */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C5A059] via-[#FACE0D] to-[#C5A059]"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-6 border-b border-neutral-200/60">
              <div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#222222]">Lantern Clinic</h3>
                <p className="font-sans-clean text-xs text-neutral-400 uppercase tracking-widest mt-1">Private Medical & Aesthetics Clinic</p>
              </div>
              <div className="flex items-center gap-2 bg-[#C5A059]/10 border border-[#C5A059]/20 px-4 py-1.5 rounded-full text-[#C5A059] text-xs font-semibold uppercase tracking-wider font-sans-clean">
                Production-Grade Suite
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Context */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif-luxury text-lg font-bold text-[#222222] mb-3">The Context</h4>
                  <p className="font-sans-clean text-neutral-500 text-sm leading-relaxed mb-6">
                    Successfully architected and deployed a production-grade operations and automation suite for a private clinical environment. The clinic needed to handle patient intake securely while reducing hours of manual coordination.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm">
                  <div className="flex items-center gap-3 text-[#C5A059] font-sans-clean font-bold text-sm mb-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" /> Realized Value
                  </div>
                  <p className="font-sans-clean text-xs text-neutral-600 leading-normal">
                    Saved clinical staff hours of manual administrative paperwork every week while strictly maintaining required data privacy and security guardrails.
                  </p>
                </div>
              </div>

              {/* Right Blueprint */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-100 shadow-sm">
                <h4 className="font-serif-luxury text-lg font-bold text-[#222222] mb-4">The Technical Blueprint</h4>
                
                <div className="space-y-4">
                  
                  {/* Step 1 */}
                  <div className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-neutral-100 text-neutral-600 font-sans-clean font-bold text-xs flex items-center justify-center shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-serif-luxury text-sm font-semibold text-[#222222] mb-1">Automated Lead Ingest Routing</p>
                      <p className="font-sans-clean text-neutral-500 text-xs leading-normal">
                        Routed inquiry data from various platforms directly into a real-time tracking interface (similar to your custom TOOL), removing double-data entry.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-neutral-100 text-neutral-600 font-sans-clean font-bold text-xs flex items-center justify-center shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-serif-luxury text-sm font-semibold text-[#222222] mb-1">Gemini AI Inbound Triage</p>
                      <p className="font-sans-clean text-neutral-500 text-xs leading-normal">
                        Implemented Gemini AI via Vertex AI to parse and classify incoming patient questions, flagging urgent symptoms instantly.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-neutral-100 text-neutral-600 font-sans-clean font-bold text-xs flex items-center justify-center shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-serif-luxury text-sm font-semibold text-[#222222] mb-1">Nightly Executive Summaries</p>
                      <p className="font-sans-clean text-neutral-500 text-xs leading-normal">
                        Generated and delivered daily executive summaries containing provider metrics and clinic stats directly to leadership.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 6. Call to Action (Compliant with Upwork Rules) */}
      <section id="alignment" className="py-24 sm:py-32 px-6 max-w-4xl mx-auto">
        <div className="border border-[#C5A059]/30 rounded-3xl bg-white p-8 sm:p-12 shadow-[0_20px_50px_rgba(197,160,89,0.05)] relative overflow-hidden text-center">
          
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#FACE0D]/5 blur-3xl pointer-events-none"></div>
          
          <span className="font-sans-clean text-xs font-semibold tracking-[0.25em] text-[#C5A059] uppercase block mb-4">Let's Collaborate</span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#222222] font-light leading-[1.2] mb-6">
            Strategic Alignment on Upwork
          </h2>
          <p className="font-sans-clean text-[#555555] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8">
            I am highly interested in partnering to architect your luxury operating system. To remain fully compliant with Upwork policies, all project communications, scheduling of alignment calls, and contract coordination will take place directly through the Upwork platform.
          </p>

          <div className="bg-[#FAF9F6] border border-neutral-100 p-6 rounded-2xl max-w-lg mx-auto mb-8 text-left">
            <h4 className="font-serif-luxury text-base font-bold text-[#222222] mb-3 text-center">Our Proposed Phase 1 Scope:</h4>
            <div className="space-y-3 text-xs font-sans-clean text-[#555555]">
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold text-[#222222]">Map the Data Flow:</strong> Trace exactly how patient records, payments, and communications should move natively between <strong className="font-semibold">Mindbody</strong>, <strong className="font-semibold">Weave</strong>, and your Google Sheets-based <strong className="font-semibold">TOOL</strong>.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold text-[#222222]">Define the Automation Boundaries:</strong> Identify which touchpoints require a human, luxury-tier luxury spa experience, and which backend tasks (like data duplication, KPI tracking, and follow-up triggers) should be offloaded to background workflows.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold text-[#222222]">Prepare for "Chloe" (The AI Concierge):</strong> Ensure that the data architecture we build today is perfectly structured so that when you <em className="italic">are</em> ready to deploy AI triage or concierge systems, the model has clean, well-routed data to interact with.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold text-[#222222]">Create the Implementation Roadmap:</strong> Build a prioritized, step-by-step technical roadmap so that when you do decide to hire software engineers, they have an exact blueprint to build from without guessing your business intent.
                </div>
              </div>
            </div>
          </div>

          <a 
            href="https://www.upwork.com/freelancers/gabrieldalmoro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#FACE0D] hover:bg-[#ebd038] text-[#222222] font-sans-clean text-xs font-bold tracking-widest uppercase px-8 py-4 rounded shadow-sm transition-all"
          >
            <MessageSquare className="w-4 h-4" /> Message Me on Upwork
          </a>
          
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="py-16 bg-[#F5F5F3] border-t border-neutral-200/50">
        <div className="max-w-6xl mx-auto px-8 flex flex-col items-center gap-6 text-center">
          
          <div className="flex items-center gap-5">
            <span className="font-serif-luxury text-base tracking-[0.2em] font-semibold text-neutral-400 uppercase">LUXURY OS</span>
            <X className="w-3 h-3 text-neutral-300 shrink-0" strokeWidth={3} />
            <img src="/favicon.png" alt="Gabriel Dalmoro" className="h-8 w-auto rounded-full opacity-60 grayscale" />
          </div>

          <div className="flex flex-col gap-1 items-center">
            <p className="text-neutral-700 font-serif-luxury font-semibold tracking-wide text-lg">Gabriel Dalmoro</p>
            <p className="text-neutral-400 text-[10px] tracking-widest uppercase font-semibold font-sans-clean">
              Architecture Before Automation.
            </p>
            <p className="text-neutral-500 text-xs font-sans-clean mt-2">
              Proposals, scheduling, and messages managed exclusively on Upwork.
            </p>
          </div>

          <p className="text-neutral-400 text-[10px] font-sans-clean italic mt-6">
            © {new Date().getFullYear()} Gabriel Dalmoro. Prepared exclusively for luxury partner collaboration.
          </p>

        </div>
      </footer>
    </div>
  );
}
