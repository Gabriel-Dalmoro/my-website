'use client';

import React, { useState } from 'react';
import { Download, ArrowRight, X, Clock, Settings, Brain, MessageSquare, Zap, Activity, ExternalLink, CalendarCheck, FileText, BellRing } from 'lucide-react';

interface Task {
  id: number;
  name: string;
  timesPerWeek: number;
  minutesPerTask: number;
}

const DEFAULT_TASKS: Task[] = [
  { id: 1, name: 'Sending TMS session appointment reminders', timesPerWeek: 30, minutesPerTask: 3 },
  { id: 2, name: 'Sending & chasing magnetic safety screening questionnaires', timesPerWeek: 10, minutesPerTask: 8 },
  { id: 3, name: 'Dispatching patient intake forms & consent documents', timesPerWeek: 10, minutesPerTask: 5 },
  { id: 4, name: 'Sending pre-session TMS preparation instructions', timesPerWeek: 20, minutesPerTask: 4 },
  { id: 5, name: 'Post-session follow-up emails & NeuroScore outcome tracking', timesPerWeek: 15, minutesPerTask: 10 },
  { id: 6, name: 'Following up on missed or cancelled sessions', timesPerWeek: 5, minutesPerTask: 10 },
  { id: 7, name: 'Answering repetitive patient questions about TMS', timesPerWeek: 20, minutesPerTask: 4 },
  { id: 8, name: 'Manual data entry & patient record updates in CareBit', timesPerWeek: 12, minutesPerTask: 6 },
];

export default function NayaDemoPage() {
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);
  const [hourlyRate, setHourlyRate] = useState<number>(85);

  const updateTask = (id: number, field: keyof Task, value: string) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    setTasks(tasks.map(t => t.id === id ? { ...t, [field]: numValue } : t));
  };

  const totalWeeklyMinutes = tasks.reduce((acc, t) => acc + (t.timesPerWeek * t.minutesPerTask), 0);
  const weeklyHours = (totalWeeklyMinutes / 60).toFixed(1);
  const monthlyHours = (parseFloat(weeklyHours) * 4.33).toFixed(1);
  const annualHours = (parseFloat(weeklyHours) * 52).toFixed(1);
  const annualCost = (parseFloat(annualHours) * hourlyRate).toLocaleString('en-GB');

  const generateExport = async () => {
    try {
      const ExcelJS = (await import('exceljs')).default || await import('exceljs');
      const { saveAs } = (await import('file-saver')).default || await import('file-saver');

      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Gabriel Dalmoro';
      workbook.created = new Date();

      const sheet = workbook.addWorksheet('Impact Analysis');

      sheet.columns = [
        { header: 'Naya Clinic Admin Task', key: 'task', width: 48 },
        { header: 'Times per Week', key: 'tpw', width: 18 },
        { header: 'Minutes per Task', key: 'mpt', width: 18 },
        { header: 'Weekly Hours Lost', key: 'wh', width: 22 },
      ];

      const headerRow = sheet.getRow(1);
      headerRow.font = { name: 'Arial', bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
      headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF392A0D' } }; // Naya deep brown
      headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
      headerRow.height = 35;
      headerRow.getCell(1).alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };

      tasks.forEach((t, index) => {
        const rowNum = index + 2;
        const row = sheet.addRow({
          task: t.name,
          tpw: t.timesPerWeek,
          mpt: t.minutesPerTask,
          wh: { formula: `ROUND(B${rowNum}*C${rowNum}/60, 1)`, date1904: false }
        });

        row.getCell(1).alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
        row.getCell(2).alignment = { horizontal: 'center', vertical: 'middle' };
        row.getCell(3).alignment = { horizontal: 'center', vertical: 'middle' };
        row.getCell(4).alignment = { horizontal: 'center', vertical: 'middle' };
        row.font = { size: 11, name: 'Arial', color: { argb: 'FF392A0D' } };
        row.getCell(4).font = { bold: true, color: { argb: 'FFC4975A' } };
      });

      for (let r = 1; r <= tasks.length + 1; r++) {
        for (let c = 1; c <= 4; c++) {
          sheet.getCell(r, c).border = {
            top: { style: 'thin', color: { argb: 'FFDDDDDD' } },
            left: { style: 'thin', color: { argb: 'FFDDDDDD' } },
            bottom: { style: 'thin', color: { argb: 'FFDDDDDD' } },
            right: { style: 'thin', color: { argb: 'FFDDDDDD' } }
          };
        }
      }

      sheet.addRow([]);

      const sumStart = tasks.length + 3;

      const titleRow = sheet.addRow(['SUMMARY & IMPACT ANALYSIS', '', '', '']);
      sheet.mergeCells(`A${sumStart}:D${sumStart}`);
      titleRow.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 13, name: 'Arial' };
      titleRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFC4975A' } }; // Warm gold
      titleRow.alignment = { horizontal: 'center', vertical: 'middle' };
      titleRow.height = 30;

      const sumQuery = tasks.map((_, i) => `D${i + 2}`).join('+');

      const wRow = sheet.addRow(['Weekly Hours Lost', '', '', { formula: `ROUND(${sumQuery}, 1)` }]);
      const mRow = sheet.addRow(['Monthly Hours Lost', '', '', { formula: `ROUND(D${sumStart + 1}*4.33, 1)` }]);
      const aRow = sheet.addRow(['Annual Hours Lost', '', '', { formula: `ROUND(D${sumStart + 1}*52, 1)` }]);
      const rateRow = sheet.addRow(['Your Hourly Rate (£)', '', '', hourlyRate]);

      rateRow.getCell(4).numFmt = '£#,##0.00';
      rateRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFAF8F5' } };

      const costRow = sheet.addRow(['Annual Cost Unoptimized', '', '', { formula: `ROUND(D${sumStart + 3}*D${sumStart + 4}, 0)` }]);
      costRow.font = { bold: true, color: { argb: 'FF392A0D' }, size: 14 };
      costRow.getCell(4).numFmt = '£#,##0';
      costRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8D5A3' } }; // Light gold callout
      costRow.height = 40;
      costRow.alignment = { vertical: 'middle' };

      [wRow, mRow, aRow, rateRow, costRow].forEach(row => {
        sheet.mergeCells(`A${row.number}:C${row.number}`);
        row.getCell(1).alignment = { horizontal: 'right', indent: 1, vertical: 'middle' };
        row.getCell(1).font = { bold: true, name: 'Arial', color: { argb: 'FF444444' } };
        row.getCell(4).alignment = { horizontal: 'center', vertical: 'middle' };
        row.getCell(4).font = row === costRow ? { bold: true, size: 18 } : { bold: true, size: 12 };
      });

      sheet.addRow([]);
      sheet.addRow(['Prepared for: Naya Clinic']);
      sheet.addRow([`Exported: ${new Date().toLocaleDateString()}`]);
      sheet.addRow(['Generated natively via gabrieldalmoro.com metrics platform']);

      sheet.getRow(sheet.rowCount - 2).font = { italic: true, color: { argb: 'FF888888' } };
      sheet.getRow(sheet.rowCount - 1).font = { italic: true, color: { argb: 'FF888888' } };
      sheet.getRow(sheet.rowCount).font = { italic: true, color: { argb: 'FFBBBBBB' }, size: 10 };

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `Naya-Clinic-Time-Audit-${new Date().toISOString().split('T')[0]}.xlsx`);

    } catch (e) {
      console.error('Core Export Engine failure:', e);
      alert('Export mechanism loading, please execute again in one moment.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#392A0D] font-sans selection:bg-[#E8D5A3] selection:text-[#392A0D]">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400;1,600&display=swap');
        .font-naya { font-family: 'Lora', serif; }
        .font-naya-heading { font-family: 'Lora', serif; font-style: italic; font-weight: 400; }
      `}} />

      {/* Header */}
      <header className="border-b border-[#392A0D]/10 py-5 px-6 sticky top-0 z-[100] bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm transition-all">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <img src="/demo/Naya_Logo_black.avif" alt="Naya Clinic" className="h-10 sm:h-12 w-auto object-contain shrink-0" />
            <X className="w-3 h-3 text-[#392A0D]/30 shrink-0" strokeWidth={3} />
            <div className="flex items-center gap-3">
              <img src="/favicon.png" alt="Gabriel Dalmoro" className="h-10 sm:h-12 w-auto rounded object-contain shrink-0" />
              <span className="font-naya text-xl tracking-wide hidden sm:block text-[#392A0D] leading-none mt-1">Gabriel Dalmoro</span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <a href="https://gabrieldalmoro.com/en/clinic" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#392A0D]/70 hover:text-[#392A0D] transition-colors hover:underline underline-offset-4 hidden sm:block">
              Visit Main Site
            </a>
            <div className="text-xs font-semibold tracking-widest uppercase border border-[#C4975A]/50 px-4 py-2 rounded-full bg-[#C4975A]/10 text-[#C4975A]">
              Automation Demo
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative w-full overflow-hidden bg-[#392A0D] text-[#FAF8F5] py-20 px-6">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-widest text-[#C4975A] uppercase mb-8">
              <Brain className="w-3.5 h-3.5" /> Naya Clinic · London
            </div>
            <h1 className="text-5xl md:text-7xl mb-6 tracking-tight font-naya-heading drop-shadow-sm">
              Automation for Neurological Care
            </h1>
            <p className="text-xl md:text-2xl font-light text-[#C4975A] mb-8 font-naya italic">
              Built exclusively for Naya Clinic.
            </p>
            <p className="text-lg opacity-80 max-w-2xl mx-auto leading-relaxed mb-8">
              Your team focuses on restoring neural pathways and giving patients their lives back. Let intelligent automation handle the repetitive admin, reminders, and data entry — without disrupting how you care.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-semibold tracking-wider text-[#E8D5A3]">
              <Settings className="w-4 h-4" /> Works natively with CareBit
            </div>
          </div>
        </div>

        {/* SECTION 1: Wasted Hours Calculator */}
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-[#C4975A] font-bold mb-3">Time Audit</p>
            <h2 className="text-4xl font-naya-heading text-[#392A0D] mb-4">Where Is Clinical Time Going?</h2>
            <p className="text-lg text-[#392A0D]/70 font-light max-w-2xl mx-auto">
              Adjust the numbers below to match your team's weekly reality. See exactly how much time is spent on tasks that never needed a human in the loop.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-[#392A0D]/10 overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap text-[#392A0D]">
                <thead>
                  <tr className="bg-[#392A0D]/5 text-[#392A0D]/70 border-b border-[#392A0D]/10 uppercase text-[10px] tracking-wider font-semibold">
                    <th className="py-5 px-6 font-semibold w-full">Naya Clinic Admin Task</th>
                    <th className="py-5 px-6 font-semibold text-center w-32 border-l border-[#392A0D]/10">Times per Week</th>
                    <th className="py-5 px-6 font-semibold text-center w-32 border-l border-[#392A0D]/10">Mins per Task</th>
                    <th className="py-5 px-6 font-semibold text-right w-32 border-l border-[#392A0D]/10 text-white bg-[#392A0D]">Weekly Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#392A0D]/5">
                  {tasks.map((t) => {
                    const rowHours = (t.timesPerWeek * t.minutesPerTask / 60).toFixed(1);
                    return (
                      <tr key={t.id} className="hover:bg-[#FAF8F5] transition-colors group">
                        <td className="py-4 px-6 font-medium text-[15px]">{t.name}</td>
                        <td className="py-4 px-6 text-center border-l border-[#392A0D]/10">
                          <input
                            type="number"
                            min="0"
                            value={t.timesPerWeek}
                            onChange={(e) => updateTask(t.id, 'timesPerWeek', e.target.value)}
                            className="w-16 bg-[#FAF8F5] border border-[#392A0D]/20 focus:border-[#C4975A] focus:ring-1 focus:ring-[#C4975A] outline-none py-1.5 px-2 text-center rounded tabular-nums font-bold text-[14px] transition-all"
                          />
                        </td>
                        <td className="py-4 px-6 text-center border-l border-[#392A0D]/10">
                          <input
                            type="number"
                            min="0"
                            value={t.minutesPerTask}
                            onChange={(e) => updateTask(t.id, 'minutesPerTask', e.target.value)}
                            className="w-16 bg-[#FAF8F5] border border-[#392A0D]/20 focus:border-[#C4975A] focus:ring-1 focus:ring-[#C4975A] outline-none py-1.5 px-2 text-center rounded tabular-nums font-bold text-[14px] transition-all"
                          />
                        </td>
                        <td className="py-4 px-6 text-right font-bold text-[#C4975A] font-naya text-xl border-l border-[#392A0D]/5 bg-[#392A0D]/[0.02]">
                          {rowHours} <span className="text-xs font-sans text-[#392A0D]/40 font-semibold uppercase">hrs</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Results Section */}
            <div className="bg-[#392A0D] text-white p-8 md:p-12 border-t-4 border-[#C4975A] relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-5 w-64 h-64 -translate-y-1/2 translate-x-1/4 rounded-full bg-white blur-3xl"></div>

              <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white/10 p-6 rounded-2xl border border-white/10 text-center">
                    <p className="text-xs uppercase tracking-widest text-[#C4975A] font-bold mb-2">Weekly Hours</p>
                    <p className="text-4xl font-naya font-bold text-white">{weeklyHours}</p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-2xl border border-white/10 text-center">
                    <p className="text-xs uppercase tracking-widest text-[#C4975A] font-bold mb-2">Monthly Hours</p>
                    <p className="text-4xl font-naya font-bold text-white">{monthlyHours}</p>
                  </div>
                  <div className="bg-[#E8D5A3] p-6 rounded-2xl border border-[#E8D5A3] text-center shadow-lg transform md:-translate-y-2">
                    <p className="text-xs uppercase tracking-widest text-[#392A0D]/70 font-bold mb-2">Annual Hours</p>
                    <p className="text-5xl font-naya font-bold text-[#392A0D]">{annualHours}</p>
                  </div>
                </div>

                <div className="md:col-span-4 pl-0 md:pl-8 border-t md:border-t-0 md:border-l border-white/20 pt-8 md:pt-0 pb-2">
                  <label className="text-xs uppercase tracking-widest text-white/70 font-bold block mb-3">Your Hourly Rate</label>
                  <div className="flex items-center gap-3 mb-6 focus-within:text-[#E8D5A3] transition-colors">
                    <span className="text-2xl font-bold font-naya">£</span>
                    <input
                      type="number"
                      className="text-3xl font-bold font-naya text-white w-24 bg-transparent border-b-2 border-white/30 focus:border-[#E8D5A3] outline-none pb-1 placeholder-white/30 transition-colors"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(parseInt(e.target.value) || 0)}
                      placeholder="85"
                    />
                  </div>
                  <p className="text-sm font-medium text-white/90 leading-snug">
                    That's <span className="text-2xl font-naya font-bold text-[#E8D5A3]">£{annualCost}</span> per year spent on tasks that could be seamlessly automated.
                  </p>
                </div>
              </div>
            </div>

            {/* Export Button */}
            <div className="bg-white p-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-[#392A0D]/60 italic font-naya">Calculations update in real-time. No data is stored.</p>
              <button onClick={() => generateExport()} className="w-full sm:w-auto justify-center flex items-center gap-3 px-8 py-4 bg-[#392A0D] text-[#FAF8F5] hover:bg-[#4d3a15] border border-[#392A0D] rounded-lg font-bold text-[15px] tracking-wide shadow-sm hover:-translate-y-0.5 transition-all">
                <Download className="w-5 h-5 opacity-80" /> Save this calculation to Excel
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: What Could Be Automated */}
        <div className="bg-[#392A0D] py-24 px-6 text-[#FAF8F5] relative overflow-hidden">
          <div className="max-w-5xl mx-auto relative z-10">
            <p className="text-xs uppercase tracking-widest text-[#C4975A] font-bold text-center mb-4">Automation Architecture</p>
            <h2 className="text-4xl font-naya-heading text-center mb-16 text-[#E8D5A3]">What Could Be Automated at Naya</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-[#C4975A]/20 flex items-center justify-center mb-6">
                  <CalendarCheck className="w-6 h-6 text-[#C4975A]" />
                </div>
                <h3 className="font-bold text-xl mb-3 font-naya">1. New Patient Booked</h3>
                <p className="opacity-70 text-sm leading-relaxed">The moment a new patient books, a CareBit record is created and a welcome sequence fires automatically — intake forms, health history, and the magnetic safety screening questionnaire sent and chased without anyone touching a keyboard.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl relative">
                <ArrowRight className="w-6 h-6 text-[#C4975A] absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block opacity-50" />
                <div className="w-12 h-12 rounded-full bg-[#E8D5A3]/20 flex items-center justify-center mb-6">
                  <FileText className="w-6 h-6 text-[#E8D5A3]" />
                </div>
                <h3 className="font-bold text-xl mb-3 font-naya">2. Consent & Pre-Treatment Pack</h3>
                <p className="opacity-70 text-sm leading-relaxed">Consent documents, treatment expectations, and NeuroScore baseline assessments dispatched before the first session — with smart follow-ups for any incomplete responses. Nothing waits for a human to remember.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                  <BellRing className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 font-naya">3. Session Reminders & Outcome Tracking</h3>
                <p className="opacity-70 text-sm leading-relaxed">24-hour reminders with personalised TMS prep instructions sent before every session. Post-session, outcome tracking forms dispatch automatically — feeding into NeuroScore progress data without any manual entry.</p>
              </div>
            </div>

            <div className="text-center mt-12 bg-white/5 border border-white/10 py-6 px-4 rounded-xl max-w-3xl mx-auto">
              <p className="font-naya italic text-lg opacity-90">
                Every step above runs completely automatically. <br className="hidden md:block" />
                <span className="text-[#C4975A] font-semibold not-italic">No copy-pasting. No forgetting. No chasing patients.</span>
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: CareBit Integration */}
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="mb-10 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#392A0D]/20 bg-[#392A0D]/5 text-[#392A0D] font-bold tracking-widest text-sm uppercase">
              <Activity className="w-4 h-4 text-[#C4975A]" /> CareBit
            </div>
          </div>
          <h2 className="text-4xl font-naya-heading text-[#392A0D] mb-6">Built around CareBit.</h2>
          <p className="text-lg text-[#392A0D]/70 font-light max-w-3xl mx-auto leading-relaxed mb-4">
            CareBit already handles your bookings, patient records, invoicing, and clinical letters.
            Custom automation layers on top — connecting CareBit to your email sequences, safety screening flows, outcome-tracking forms, and NeuroScore data —
            <strong className="font-semibold text-[#392A0D]">without changing how your clinical team operates or replacing any existing tool</strong>.
          </p>
          <p className="text-sm text-[#392A0D]/50 font-light max-w-2xl mx-auto mb-12 italic">
            CareBit doesn't offer a public API — so this is built around CareBit's existing notification system, email triggers, and form workflows, not through a direct integration.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#392A0D]/5 border border-[#392A0D]/10 font-semibold text-sm text-[#392A0D]">
              <Zap className="w-4 h-4 text-[#C4975A] shrink-0" /> Automated Patient Reminders
            </div>
            <div className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#392A0D]/5 border border-[#392A0D]/10 font-semibold text-sm text-[#392A0D]">
              <Zap className="w-4 h-4 text-[#C4975A] shrink-0" /> Safety Screening Dispatch & Chase
            </div>
            <div className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#392A0D]/5 border border-[#392A0D]/10 font-semibold text-sm text-[#392A0D]">
              <Zap className="w-4 h-4 text-[#C4975A] shrink-0" /> NeuroScore Outcome Tracking
            </div>
            <div className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#392A0D]/5 border border-[#392A0D]/10 font-semibold text-sm text-[#392A0D]">
              <Zap className="w-4 h-4 text-[#C4975A] shrink-0" /> Google Calendar Sync
            </div>
            <div className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#392A0D]/5 border border-[#392A0D]/10 font-semibold text-sm text-[#392A0D]">
              <Zap className="w-4 h-4 text-[#C4975A] shrink-0" /> Missed Session Follow-ups
            </div>
            <div className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#392A0D]/5 border border-[#392A0D]/10 font-semibold text-sm text-[#392A0D]">
              <Zap className="w-4 h-4 text-[#C4975A] shrink-0" /> Intake Form Automation
            </div>
          </div>
        </div>

        {/* SECTION 4: CTA */}
        <div className="bg-[#392A0D] text-white py-24 px-6 border-t-8 border-[#C4975A]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-naya-heading mb-6 tracking-tight">Want to reclaim those hours?</h2>
            <p className="text-xl font-light text-[#C4975A] mb-10 leading-relaxed font-naya italic">
              Let's talk specifically about what automation architecture could look like for Naya Clinic.
            </p>
            <a
              href="https://calendly.com/ghdalmoro/30-minute"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E8D5A3] text-[#392A0D] hover:bg-white hover:text-[#392A0D] font-bold tracking-wider uppercase text-[15px] px-10 py-5 rounded-xl transition-all shadow-xl hover:-translate-y-1 w-full sm:w-auto justify-center"
            >
              Book a 30-Minute Alignment Call <ExternalLink className="w-5 h-5 ml-2" />
            </a>
            <p className="mt-8 text-sm opacity-60">
              No obligation. No pitch. Just a focused conversation about what's possible.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-[#392A0D]/10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-5 text-center">
          <div className="flex items-center gap-4">
            <img src="/demo/Naya_Logo_black.avif" alt="Naya Clinic" className="h-8 w-auto object-contain opacity-50 grayscale" />
            <X className="w-3 h-3 text-[#392A0D]/30 shrink-0" strokeWidth={3} />
            <img src="/favicon.png" alt="Gabriel Dalmoro" className="h-8 w-auto rounded-sm opacity-60 grayscale filter mix-blend-multiply" />
          </div>
          <div className="flex flex-col gap-2 items-center mt-4">
            <p className="text-[#392A0D]/80 font-naya font-semibold tracking-wide text-lg">Gabriel Dalmoro</p>
            <p className="text-[#392A0D]/40 text-xs tracking-wider uppercase font-semibold">
              Less admin. More patient care.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="mailto:gabriel@gabrieldalmoro.com" className="text-[#C4975A] hover:text-[#392A0D] text-sm font-semibold transition-colors">gabriel@gabrieldalmoro.com</a>
              <span className="text-[#392A0D]/20">|</span>
              <a href="https://gabrieldalmoro.com/en/clinic" target="_blank" rel="noopener noreferrer" className="text-[#C4975A] hover:text-[#392A0D] text-sm font-semibold transition-colors">Visit Main Site</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
