'use client';

import React, { useState } from 'react';
import { Download, ArrowRight, X, Clock, Settings, Brain, MessageSquare, Zap, Activity, ExternalLink } from 'lucide-react';

interface Task {
  id: number;
  name: string;
  timesPerWeek: number;
  minutesPerTask: number;
}

const DEFAULT_TASKS: Task[] = [
  { id: 1, name: 'Sending appointment reminders', timesPerWeek: 20, minutesPerTask: 3 },
  { id: 2, name: 'Sending intake forms manually', timesPerWeek: 8, minutesPerTask: 5 },
  { id: 3, name: 'Chasing clients for incomplete forms', timesPerWeek: 5, minutesPerTask: 10 },
  { id: 4, name: 'Sending test prep (DUTCH, gut tests, etc.)', timesPerWeek: 6, minutesPerTask: 8 },
  { id: 5, name: 'Post-consultation summary emails', timesPerWeek: 10, minutesPerTask: 15 },
  { id: 6, name: 'Following up on missed appointments', timesPerWeek: 4, minutesPerTask: 10 },
  { id: 7, name: 'Answering repetitive client questions', timesPerWeek: 15, minutesPerTask: 5 },
  { id: 8, name: 'Manual data entry between systems', timesPerWeek: 10, minutesPerTask: 5 },
];

export default function LanternDemoPage() {
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);
  const [hourlyRate, setHourlyRate] = useState<number>(150);

  const updateTask = (id: number, field: keyof Task, value: string) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    setTasks(tasks.map(t => t.id === id ? { ...t, [field]: numValue } : t));
  };

  const totalWeeklyMinutes = tasks.reduce((acc, t) => acc + (t.timesPerWeek * t.minutesPerTask), 0);
  const weeklyHours = (totalWeeklyMinutes / 60).toFixed(1);
  const monthlyHours = (parseFloat(weeklyHours) * 4.33).toFixed(1);
  const annualHours = (parseFloat(weeklyHours) * 52).toFixed(1);
  const annualCost = (parseFloat(annualHours) * hourlyRate).toLocaleString('en-GB');

  const exportCSV = (asExcel: boolean = false) => {
    const headers = ['Task', 'Times per Week', 'Minutes per Task', 'Weekly Hours'];
    
    // We compute exact row indices for our math formulas dynamically
    const taskCount = tasks.length;
    const summaryStartRow = taskCount + 4; // Headers(1) + Tasks(N) + Empty(1) + SUMMARY(1) + Next line is first summary items
    
    // Create locale-independent sum query: D2+D3+D4... instead of SUM(D2:D5) so French Excel doesn't break
    const sumQuery = tasks.map((_, i) => `D${i + 2}`).join('+');

    if (asExcel) {
      // Export Native Excel Layout with Formulas AND STYLING
      const tableHtml = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <head>
          <meta charset="utf-8">
          <style>
            .th-header { background-color: #2E3423; color: #FFFFFF; font-weight: bold; font-family: 'Arial'; text-transform: uppercase; border: 1px solid #000000; padding: 10px; }
            .td-cell { border: 1px solid #DDDDDD; padding: 6px; font-family: 'Arial'; text-align: center; }
            .td-cell-left { border: 1px solid #DDDDDD; padding: 6px; font-family: 'Arial'; text-align: left; }
            .td-calc { border: 1px solid #DDDDDD; padding: 6px; font-family: 'Arial'; text-align: center; font-weight: bold; color: #D4967D; }
            .sum-header { background-color: #D4967D; color: #FFFFFF; font-weight: bold; font-family: 'Arial'; text-align: center; padding: 8px; font-size: 14px; }
            .total-cost { background-color: #FACE0D; color: #2E3423; font-weight: bold; font-family: 'Arial'; text-align: center; font-size: 16px; border: 2px solid #2E3423; }
          </style>
        </head>
        <body>
          <table border="1" style="border-collapse: collapse; width: 100%;">
            <thead>
              <tr>${headers.map(h => `<th class="th-header">${h}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${tasks.map((t, i) => {
                const r = i + 2;
                return `<tr>
                  <td class="td-cell-left">${t.name}</td>
                  <td class="td-cell">${t.timesPerWeek}</td>
                  <td class="td-cell">${t.minutesPerTask}</td>
                  <td class="td-calc" x:fmla="=B${r}*C${r}/60">${(t.timesPerWeek * t.minutesPerTask / 60).toFixed(2)}</td>
                </tr>`;
              }).join('')}
              <tr><td colspan="4"></td></tr>
              <tr><td colspan="4" class="sum-header">SUMMARY & IMPACT ANALYSIS</td></tr>
              
              <tr><td colspan="3" class="td-cell-left" style="font-weight: bold;">Weekly Hours Lost</td><td class="td-calc" x:fmla="=${sumQuery}">${weeklyHours}</td></tr>
              <tr><td colspan="3" class="td-cell-left">Monthly Hours Lost</td><td class="td-calc" x:fmla="=D${summaryStartRow}*4.33">${monthlyHours}</td></tr>
              <tr><td colspan="3" class="td-cell-left">Annual Hours Lost</td><td class="td-calc" x:fmla="=D${summaryStartRow}*52">${annualHours}</td></tr>
              <tr><td colspan="2" class="td-cell-left">Your Hourly Rate (£)</td><td class="td-cell" style="background-color: #FDFBF7; font-weight: bold;">${hourlyRate}</td><td class="td-cell"></td></tr>
              <tr><td colspan="3" class="total-cost">Annual Cost Unoptimized GBP (£)</td><td class="total-cost" x:fmla="=D${summaryStartRow + 2}*C${summaryStartRow + 3}">${annualCost.replace(/,/g, '')}</td></tr>
              
              <tr><td colspan="4"></td></tr>
              <tr><td colspan="4" style="color: #666666;"><i>Prepared for: Lantern Clinic</i></td></tr>
              <tr><td colspan="4" style="color: #666666;"><i>Exported: ${new Date().toLocaleDateString()}</i></td></tr>
            </tbody>
          </table>
        </body>
        </html>
      `;
      const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `Lantern-Clinic-Time-Audit-${new Date().toISOString().split('T')[0]}.xls`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // Export standard European CSV (Semicolon Delimited) with Formulas
    const csvContent = [
      headers.join(';'),
      ...tasks.map((t, i) => [
        t.name.replace(/;/g, '-'), 
        t.timesPerWeek, 
        t.minutesPerTask, 
        `=B${i + 2}*C${i + 2}/60` // Raw formula block natively evaluated by Excel
      ].join(';')),
      '',
      'SUMMARY;;;',
      `Weekly Hours Lost;;;=${sumQuery}`,
      `Monthly Hours Lost;;;=D${summaryStartRow}*4.33`,
      `Annual Hours Lost;;;=D${summaryStartRow}*52`,
      `Your Hourly Rate (£);;${hourlyRate};`,
      `Annual Cost GBP (£);;;=D${summaryStartRow + 2}*C${summaryStartRow + 3}`,
      '',
      `Prepared for: Lantern Clinic;;;`,
      `Exported: ${new Date().toLocaleDateString()};;;`
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Lantern-Clinic-Time-Audit-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2E3423] font-sans selection:bg-[#FACE0D] selection:text-[#2E3423]">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Marcellus&display=swap');
        .font-lantern { font-family: 'Marcellus', serif; }
      `}} />

      {/* Header */}
      <header className="border-b border-[#2E3423]/10 py-5 px-6 sticky top-0 z-[100] bg-[#FDFBF7]/95 backdrop-blur-md shadow-sm transition-all">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <img src="/demo/lantern-logo.png" alt="Lantern Clinic" className="h-10 sm:h-12 w-auto object-contain shrink-0" />
            <X className="w-3 h-3 text-[#2E3423]/30 shrink-0" strokeWidth={3} />
            <div className="flex items-center gap-3">
              <img src="/favicon.png" alt="Gabriel Dalmoro" className="h-10 sm:h-12 w-auto rounded object-contain shrink-0" />
              <span className="font-lantern text-xl tracking-wide hidden sm:block text-[#2E3423] leading-none mt-1">Gabriel Dalmoro</span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-xs font-semibold tracking-widest uppercase border border-[#D4967D]/50 px-4 py-2 rounded-full bg-[#D4967D]/10 text-[#D4967D]">
              Automation Demo
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative w-full overflow-hidden bg-[#2E3423] text-[#FDFBF7] py-20 px-6">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
            <h1 className="text-5xl md:text-7xl mb-6 tracking-tight font-lantern drop-shadow-sm">
              Automation for Functional Medicine
            </h1>
            <p className="text-xl md:text-2xl font-light text-[#D4967D] mb-8 font-lantern italic">
              Built exclusively for Lantern Clinic.
            </p>
            <p className="text-lg opacity-80 max-w-2xl mx-auto leading-relaxed mb-8">
              You focus on providing transformative, root-cause care. Let robust automation handle the repetitive back-office work, follow-ups, and data entry.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-semibold tracking-wider text-[#FACE0D]">
              <Settings className="w-4 h-4 animate-spin-slow duration-[3000ms]" /> Works natively with Practice Better
            </div>
          </div>
        </div>

        {/* SECTION 1: Wasted Hours Calculator */}
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-lantern text-[#2E3423] mb-4">Where Is Your Time Going?</h2>
            <p className="text-lg text-[#2E3423]/70 font-light max-w-2xl mx-auto">
              Adjust the numbers below to match your clinic's weekly reality. See exactly how much clinical time you could reclaim.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-[#2E3423]/10 overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap text-[#2E3423]">
                <thead>
                  <tr className="bg-[#2E3423]/5 text-[#2E3423]/70 border-b border-[#2E3423]/10 uppercase text-[10px] tracking-wider font-semibold">
                    <th className="py-5 px-6 font-semibold w-full">Functional Medicine Task</th>
                    <th className="py-5 px-6 font-semibold text-center w-32 border-l border-[#2E3423]/10">Times per Week</th>
                    <th className="py-5 px-6 font-semibold text-center w-32 border-l border-[#2E3423]/10">Mins per Task</th>
                    <th className="py-5 px-6 font-semibold text-right w-32 border-l border-[#2E3423]/10 text-white bg-[#2E3423]">Weekly Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2E3423]/5">
                  {tasks.map((t) => {
                    const rowHours = (t.timesPerWeek * t.minutesPerTask / 60).toFixed(1);
                    return (
                      <tr key={t.id} className="hover:bg-[#FDFBF7] transition-colors group">
                        <td className="py-4 px-6 font-medium text-[15px]">{t.name}</td>
                        <td className="py-4 px-6 text-center border-l border-[#2E3423]/10">
                          <input 
                            type="number"
                            min="0"
                            value={t.timesPerWeek} 
                            onChange={(e) => updateTask(t.id, 'timesPerWeek', e.target.value)}
                            className="w-16 bg-[#FDFBF7] border border-[#2E3423]/20 focus:border-[#D4967D] focus:ring-1 focus:ring-[#D4967D] outline-none py-1.5 px-2 text-center rounded tabular-nums font-bold text-[14px] transition-all"
                          />
                        </td>
                        <td className="py-4 px-6 text-center border-l border-[#2E3423]/10">
                          <input 
                            type="number"
                            min="0"
                            value={t.minutesPerTask} 
                            onChange={(e) => updateTask(t.id, 'minutesPerTask', e.target.value)}
                            className="w-16 bg-[#FDFBF7] border border-[#2E3423]/20 focus:border-[#D4967D] focus:ring-1 focus:ring-[#D4967D] outline-none py-1.5 px-2 text-center rounded tabular-nums font-bold text-[14px] transition-all"
                          />
                        </td>
                        <td className="py-4 px-6 text-right font-bold text-[#D4967D] font-lantern text-xl border-l border-[#2E3423]/5 bg-[#2E3423]/[0.02]">
                          {rowHours} <span className="text-xs font-sans text-[#2E3423]/40 font-semibold uppercase">hrs</span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Results Section */}
            <div className="bg-[#2E3423] text-white p-8 md:p-12 border-t-4 border-[#FACE0D] relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-5 w-64 h-64 -translate-y-1/2 translate-x-1/4 rounded-full bg-white blur-3xl"></div>
              
              <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white/10 p-6 rounded-2xl border border-white/10 text-center">
                    <p className="text-xs uppercase tracking-widest text-[#D4967D] font-bold mb-2">Weekly Hours</p>
                    <p className="text-4xl font-lantern font-bold text-white">{weeklyHours}</p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-2xl border border-white/10 text-center">
                    <p className="text-xs uppercase tracking-widest text-[#D4967D] font-bold mb-2">Monthly Hours</p>
                    <p className="text-4xl font-lantern font-bold text-white">{monthlyHours}</p>
                  </div>
                  <div className="bg-[#FACE0D] p-6 rounded-2xl border border-[#FACE0D] text-center shadow-lg transform md:-translate-y-2">
                    <p className="text-xs uppercase tracking-widest text-[#2E3423]/70 font-bold mb-2">Annual Hours</p>
                    <p className="text-5xl font-lantern font-bold text-[#2E3423]">{annualHours}</p>
                  </div>
                </div>

                <div className="md:col-span-4 pl-0 md:pl-8 border-t md:border-t-0 md:border-l border-white/20 pt-8 md:pt-0 pb-2">
                  <label className="text-xs uppercase tracking-widest text-white/70 font-bold block mb-3">Your Hourly Rate</label>
                  <div className="flex items-center gap-3 mb-6 focus-within:text-[#FACE0D] transition-colors">
                    <span className="text-2xl font-bold font-lantern">£</span>
                    <input 
                      type="number" 
                      className="text-3xl font-bold font-lantern text-white w-24 bg-transparent border-b-2 border-white/30 focus:border-[#FACE0D] outline-none pb-1 placeholder-white/30 transition-colors"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(parseInt(e.target.value) || 0)}
                      placeholder="150"
                    />
                  </div>
                  <p className="text-sm font-medium text-white/90 leading-snug">
                    That's <span className="text-2xl font-lantern font-bold text-[#FACE0D]">£{annualCost}</span> per year spent on tasks that could be seamlessly automated.
                  </p>
                </div>
              </div>
            </div>

            {/* Export Buttons */}
            <div className="bg-white p-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
               <p className="text-sm text-[#2E3423]/60 italic font-lantern">Calculations update purely in real-time. No data is stored.</p>
               <div className="flex gap-3 w-full sm:w-auto">
                 <button onClick={() => exportCSV(false)} className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-6 py-3 border border-[#2E3423]/20 bg-white hover:bg-[#FDFBF7] rounded-lg font-bold text-sm tracking-wide transition-colors">
                   <Download className="w-4 h-4 text-[#D4967D]" /> Download as CSV
                 </button>
                 <button onClick={() => exportCSV(true)} className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-6 py-3 bg-[#FACE0D] text-[#2E3423] hover:bg-[#eab308] border border-[#dca204] rounded-lg font-bold text-sm tracking-wide shadow-sm hover:-translate-y-0.5 transition-all">
                   <Download className="w-4 h-4 text-[#2E3423]/80" /> Download as Excel
                 </button>
               </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: What Could Be Automated */}
        <div className="bg-[#2E3423] py-24 px-6 text-[#FDFBF7] relative overflow-hidden">
          <div className="max-w-5xl mx-auto relative z-10">
            <h2 className="text-4xl font-lantern text-center mb-16 text-[#FACE0D]">What Could Be Automated</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-[#D4967D]/20 flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6 text-[#D4967D]" />
                </div>
                <h3 className="font-bold text-xl mb-3">1. Discovery Call Booked</h3>
                <p className="opacity-70 text-sm leading-relaxed">Runs entirely through Practice Better. Syncs instantly to your master schedule and initiates protocol.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl relative">
                <ArrowRight className="w-6 h-6 text-[#D4967D] absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block opacity-50" />
                <div className="w-12 h-12 rounded-full bg-[#FACE0D]/20 flex items-center justify-center mb-6">
                  <MessageSquare className="w-6 h-6 text-[#FACE0D]" />
                </div>
                <h3 className="font-bold text-xl mb-3">2. Welcome & Intake Flow</h3>
                <p className="opacity-70 text-sm leading-relaxed">Welcome email and required functional medicine intake forms dispatched automatically to the client.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3">3. Pre-Consult Reminders</h3>
                <p className="opacity-70 text-sm leading-relaxed">24h automated notification bundled perfectly with specific prep instructions (e.g., DUTCH test constraints).</p>
              </div>
            </div>

            <div className="text-center mt-12 bg-white/5 border border-white/10 py-6 px-4 rounded-xl max-w-3xl mx-auto">
              <p className="font-lantern italic text-lg opacity-90">
                Every single step above happens completely automatically. <br className="hidden md:block" />
                <span className="text-[#D4967D] font-semibold not-italic">No copy-pasting. No forgetting. No chasing.</span>
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: Integration Matrix */}
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="mb-10 flex justify-center">
             <img src="/demo/practice-better.png" alt="Practice Better" className="h-14 w-auto object-contain shrink-0" />
          </div>
          <h2 className="text-4xl font-lantern text-[#2E3423] mb-6">Works natively with Practice Better.</h2>
          <p className="text-lg text-[#2E3423]/70 font-light max-w-3xl mx-auto leading-relaxed mb-12">
            Your booking system already inherently tracks your clients, appointments, and protocol programs. 
            Custom automation elegantly patches Practice Better into everything else—your email sequences, automated reminders, CRM, and accounting engines—<strong className="font-semibold text-[#2E3423]">without changing how you actually practice</strong>.
          </p>

          <div className="flex flex-wrap justify-center gap-6 opacity-70">
            <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#2E3423]/5 font-semibold text-sm">
              <Zap className="w-4 h-4 text-[#D4967D]" /> Automated Email Delivery
            </div>
            <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#2E3423]/5 font-semibold text-sm">
              <Zap className="w-4 h-4 text-[#D4967D]" /> Google Workspace Sync
            </div>
            <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#2E3423]/5 font-semibold text-sm">
              <Zap className="w-4 h-4 text-[#D4967D]" /> Dynamic Follow-ups
            </div>
          </div>
        </div>

        {/* SECTION 4: CTA */}
        <div className="bg-[#2E3423] text-white py-24 px-6 border-t-8 border-[#D4967D]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-lantern mb-6 tracking-tight">Want to reclaim those hours?</h2>
            <p className="text-xl font-light text-[#D4967D] mb-10 leading-relaxed font-lantern italic">
              Let's talk specifically about what automation architecture could look like for Lantern Clinic.
            </p>
            <a 
              href="https://calendly.com/ghdalmoro/30-minute" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FACE0D] text-[#2E3423] hover:bg-white hover:text-[#2E3423] font-bold tracking-wider uppercase text-[15px] px-10 py-5 rounded-xl transition-all shadow-xl hover:-translate-y-1 w-full sm:w-auto justify-center"
            >
              Book a 30-Minute Alignment Call <ExternalLink className="w-5 h-5 ml-2" />
            </a>
            <p className="mt-8 text-sm opacity-60">
              No obligation. No pitch. Just a strictly focused conversation about capability and what's technically possible.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-[#2E3423]/10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-5 text-center">
          <div className="flex items-center gap-4">
             <img src="/demo/lantern-logo.png" alt="Lantern Clinic" className="h-8 w-auto object-contain opacity-50 grayscale" />
             <X className="w-3 h-3 text-[#2E3423]/30 shrink-0" strokeWidth={3} />
             <img src="/favicon.png" alt="Gabriel Dalmoro" className="h-8 w-auto rounded-sm opacity-60 grayscale filter mix-blend-multiply" />
          </div>
          <div className="flex flex-col gap-2 items-center mt-4">
            <p className="text-[#2E3423]/80 font-lantern font-semibold tracking-wide text-lg">Gabriel Dalmoro</p>
            <p className="text-[#2E3423]/40 text-xs tracking-wider uppercase font-semibold">
              Less admin. More impact.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="mailto:gabriel@gabrieldalmoro.com" className="text-[#D4967D] hover:text-[#2E3423] text-sm font-semibold transition-colors">gabriel@gabrieldalmoro.com</a>
              <span className="text-[#2E3423]/20">|</span>
              <a href="https://gabrieldalmoro.com" target="_blank" rel="noopener noreferrer" className="text-[#D4967D] hover:text-[#2E3423] text-sm font-semibold transition-colors">gabrieldalmoro.com</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
