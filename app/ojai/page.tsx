'use client';

import React, { useState } from 'react';
import { Download, ArrowRight, X, Settings, Zap, ExternalLink, CalendarCheck, FileText, BellRing, Sparkles } from 'lucide-react';

interface Task {
  id: number;
  name: string;
  timesPerWeek: number;
  minutesPerTask: number;
}

const DEFAULT_TASKS: Task[] = [
  { id: 1, name: 'Sending appointment reminders manually', timesPerWeek: 25, minutesPerTask: 3 },
  { id: 2, name: 'Dispatching intake & skin consultation forms', timesPerWeek: 10, minutesPerTask: 5 },
  { id: 3, name: 'Chasing clients for incomplete forms', timesPerWeek: 6, minutesPerTask: 8 },
  { id: 4, name: 'Sending treatment-specific prep instructions', timesPerWeek: 12, minutesPerTask: 6 },
  { id: 5, name: 'Post-treatment aftercare emails & follow-ups', timesPerWeek: 10, minutesPerTask: 10 },
  { id: 6, name: 'Following up on no-shows & cancellations', timesPerWeek: 5, minutesPerTask: 10 },
  { id: 7, name: 'Answering repetitive questions (products, prep, etc.)', timesPerWeek: 18, minutesPerTask: 5 },
  { id: 8, name: 'Manual data entry & client record updates', timesPerWeek: 8, minutesPerTask: 6 },
];

export default function OjaiDemoPage() {
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);
  const [hourlyRate, setHourlyRate] = useState<number>(120);

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
        { header: 'OJAI Clinic Admin Task', key: 'task', width: 48 },
        { header: 'Times per Week', key: 'tpw', width: 18 },
        { header: 'Minutes per Task', key: 'mpt', width: 18 },
        { header: 'Weekly Hours Lost', key: 'wh', width: 22 },
      ];

      const headerRow = sheet.getRow(1);
      headerRow.font = { name: 'Arial', bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
      headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2C2620' } }; // OJAI deep warm dark
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
        row.font = { size: 11, name: 'Arial', color: { argb: 'FF2C2620' } };
        row.getCell(4).font = { bold: true, color: { argb: 'FFA5976D' } };
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
      titleRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFA5976D' } }; // OJAI gold
      titleRow.alignment = { horizontal: 'center', vertical: 'middle' };
      titleRow.height = 30;

      const sumQuery = tasks.map((_, i) => `D${i + 2}`).join('+');

      const wRow = sheet.addRow(['Weekly Hours Lost', '', '', { formula: `ROUND(${sumQuery}, 1)` }]);
      const mRow = sheet.addRow(['Monthly Hours Lost', '', '', { formula: `ROUND(D${sumStart + 1}*4.33, 1)` }]);
      const aRow = sheet.addRow(['Annual Hours Lost', '', '', { formula: `ROUND(D${sumStart + 1}*52, 1)` }]);
      const rateRow = sheet.addRow(['Your Hourly Rate (€)', '', '', hourlyRate]);

      rateRow.getCell(4).numFmt = '€#,##0.00';
      rateRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF3EEE8' } };

      const costRow = sheet.addRow(['Annual Cost Unoptimized', '', '', { formula: `ROUND(D${sumStart + 3}*D${sumStart + 4}, 0)` }]);
      costRow.font = { bold: true, color: { argb: 'FF2C2620' }, size: 14 };
      costRow.getCell(4).numFmt = '€#,##0';
      costRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8DFD0' } }; // Warm callout
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
      sheet.addRow(['Prepared for: OJAI']);
      sheet.addRow([`Exported: ${new Date().toLocaleDateString()}`]);
      sheet.addRow(['Generated natively via gabrieldalmoro.com metrics platform']);

      sheet.getRow(sheet.rowCount - 2).font = { italic: true, color: { argb: 'FF888888' } };
      sheet.getRow(sheet.rowCount - 1).font = { italic: true, color: { argb: 'FF888888' } };
      sheet.getRow(sheet.rowCount).font = { italic: true, color: { argb: 'FFBBBBBB' }, size: 10 };

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `OJAI-Time-Audit-${new Date().toISOString().split('T')[0]}.xlsx`);

    } catch (e) {
      console.error('Core Export Engine failure:', e);
      alert('Export mechanism loading, please execute again in one moment.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F3EEE8] text-[#2C2620] font-sans selection:bg-[#FACE0D] selection:text-[#2C2620]">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');
        .font-ojai { font-family: 'Cormorant Garamond', serif; }
        .font-ojai-italic { font-family: 'Cormorant Garamond', serif; font-style: italic; }
      `}} />

      {/* Header */}
      <header className="border-b border-[#2C2620]/10 py-5 px-6 sticky top-0 z-[100] bg-[#F3EEE8]/95 backdrop-blur-md shadow-sm transition-all">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <img
              src="https://cdn.prod.website-files.com/6197c5af75db261a5cc41247/61eaf0636773467f6c976806_ojai_logo_transparent%20white.svg"
              alt="OJAI"
              className="h-8 sm:h-10 w-auto object-contain shrink-0 invert"
            />
            <X className="w-3 h-3 text-[#2C2620]/30 shrink-0" strokeWidth={3} />
            <div className="flex items-center gap-3">
              <img src="/favicon.png" alt="Gabriel Dalmoro" className="h-10 sm:h-12 w-auto rounded object-contain shrink-0" />
              <span className="font-ojai text-xl tracking-wide hidden sm:block text-[#2C2620] leading-none mt-1">Gabriel Dalmoro</span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <a href="https://gabrieldalmoro.com/en/clinic" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#2C2620]/70 hover:text-[#2C2620] transition-colors hover:underline underline-offset-4 hidden sm:block">
              Visit Main Site
            </a>
            <div className="text-xs font-semibold tracking-widest uppercase border border-[#A5976D]/50 px-4 py-2 rounded-full bg-[#A5976D]/10 text-[#A5976D]">
              Automation Demo
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative w-full overflow-hidden bg-[#2C2620] text-[#F3EEE8] py-20 px-6">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          {/* Subtle warm gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#A5976D]/10 via-transparent to-transparent pointer-events-none"></div>
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-widest text-[#A5976D] uppercase mb-8">
              <Sparkles className="w-3.5 h-3.5" /> OJAI · Holistic Beauty & Care
            </div>
            <h1 className="text-5xl md:text-7xl mb-6 tracking-tight font-ojai drop-shadow-sm">
              Automation for Holistic Beauty
            </h1>
            <p className="text-xl md:text-2xl font-light text-[#A5976D] mb-8 font-ojai-italic">
              Built exclusively for OJAI.
            </p>
            <p className="text-lg opacity-80 max-w-2xl mx-auto leading-relaxed mb-8">
              Alisa and her team create a sanctum of care and restoration. Let intelligent automation<br className="hidden md:block" /> handle the repetitive admin — so you can stay fully present with your clients.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-semibold tracking-wider text-[#D4C9A8]">
              <Settings className="w-4 h-4" /> Works natively with Salonized
            </div>
          </div>
        </div>

        {/* SECTION 1: Wasted Hours Calculator */}
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-[#A5976D] font-bold mb-3">Time Audit</p>
            <h2 className="text-4xl font-ojai text-[#2C2620] mb-4">Where Is Your Time Going?</h2>
            <p className="text-lg text-[#2C2620]/70 font-light max-w-2xl mx-auto">
              Adjust the numbers to match OJAI's weekly reality. See exactly how much time is spent on admin that could run entirely on its own.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-[#2C2620]/10 overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap text-[#2C2620]">
                <thead>
                  <tr className="bg-[#2C2620]/5 text-[#2C2620]/70 border-b border-[#2C2620]/10 uppercase text-[10px] tracking-wider font-semibold">
                    <th className="py-5 px-6 font-semibold w-full">OJAI Clinic Admin Task</th>
                    <th className="py-5 px-6 font-semibold text-center w-32 border-l border-[#2C2620]/10">Times per Week</th>
                    <th className="py-5 px-6 font-semibold text-center w-32 border-l border-[#2C2620]/10">Mins per Task</th>
                    <th className="py-5 px-6 font-semibold text-right w-32 border-l border-[#2C2620]/10 text-white bg-[#2C2620]">Weekly Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2C2620]/5">
                  {tasks.map((t) => {
                    const rowHours = (t.timesPerWeek * t.minutesPerTask / 60).toFixed(1);
                    return (
                      <tr key={t.id} className="hover:bg-[#F3EEE8] transition-colors group">
                        <td className="py-4 px-6 font-medium text-[15px]">{t.name}</td>
                        <td className="py-4 px-6 text-center border-l border-[#2C2620]/10">
                          <input
                            type="number"
                            min="0"
                            value={t.timesPerWeek}
                            onChange={(e) => updateTask(t.id, 'timesPerWeek', e.target.value)}
                            className="w-16 bg-[#F3EEE8] border border-[#2C2620]/20 focus:border-[#A5976D] focus:ring-1 focus:ring-[#A5976D] outline-none py-1.5 px-2 text-center rounded tabular-nums font-bold text-[14px] transition-all"
                          />
                        </td>
                        <td className="py-4 px-6 text-center border-l border-[#2C2620]/10">
                          <input
                            type="number"
                            min="0"
                            value={t.minutesPerTask}
                            onChange={(e) => updateTask(t.id, 'minutesPerTask', e.target.value)}
                            className="w-16 bg-[#F3EEE8] border border-[#2C2620]/20 focus:border-[#A5976D] focus:ring-1 focus:ring-[#A5976D] outline-none py-1.5 px-2 text-center rounded tabular-nums font-bold text-[14px] transition-all"
                          />
                        </td>
                        <td className="py-4 px-6 text-right font-bold text-[#A5976D] font-ojai text-xl border-l border-[#2C2620]/5 bg-[#2C2620]/[0.02]">
                          {rowHours} <span className="text-xs font-sans text-[#2C2620]/40 font-semibold uppercase">hrs</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Results Section */}
            <div className="bg-[#2C2620] text-white p-8 md:p-12 border-t-4 border-[#A5976D] relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-5 w-64 h-64 -translate-y-1/2 translate-x-1/4 rounded-full bg-white blur-3xl"></div>

              <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white/10 p-6 rounded-2xl border border-white/10 text-center">
                    <p className="text-xs uppercase tracking-widest text-[#A5976D] font-bold mb-2">Weekly Hours</p>
                    <p className="text-4xl font-ojai font-bold text-white">{weeklyHours}</p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-2xl border border-white/10 text-center">
                    <p className="text-xs uppercase tracking-widest text-[#A5976D] font-bold mb-2">Monthly Hours</p>
                    <p className="text-4xl font-ojai font-bold text-white">{monthlyHours}</p>
                  </div>
                  <div className="bg-[#A5976D] p-6 rounded-2xl border border-[#A5976D] text-center shadow-lg transform md:-translate-y-2">
                    <p className="text-xs uppercase tracking-widest text-white/70 font-bold mb-2">Annual Hours</p>
                    <p className="text-5xl font-ojai font-bold text-white">{annualHours}</p>
                  </div>
                </div>

                <div className="md:col-span-4 pl-0 md:pl-8 border-t md:border-t-0 md:border-l border-white/20 pt-8 md:pt-0 pb-2">
                  <label className="text-xs uppercase tracking-widest text-white/70 font-bold block mb-3">Your Hourly Rate</label>
                  <div className="flex items-center gap-3 mb-6 focus-within:text-[#D4C9A8] transition-colors">
                    <span className="text-2xl font-bold font-ojai">€</span>
                    <input
                      type="number"
                      className="text-3xl font-bold font-ojai text-white w-24 bg-transparent border-b-2 border-white/30 focus:border-[#D4C9A8] outline-none pb-1 placeholder-white/30 transition-colors"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(parseInt(e.target.value) || 0)}
                      placeholder="120"
                    />
                  </div>
                  <p className="text-sm font-medium text-white/90 leading-snug">
                    That's <span className="text-2xl font-ojai font-bold text-[#D4C9A8]">€{annualCost}</span> per year spent on tasks that could be seamlessly automated.
                  </p>
                </div>
              </div>
            </div>

            {/* Export Button */}
            <div className="bg-white p-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-[#2C2620]/60 italic font-ojai">Calculations update in real-time. No data is stored.</p>
              <button onClick={() => generateExport()} className="w-full sm:w-auto justify-center flex items-center gap-3 px-8 py-4 bg-[#2C2620] text-[#F3EEE8] hover:bg-[#3d342c] border border-[#2C2620] rounded-lg font-bold text-[15px] tracking-wide shadow-sm hover:-translate-y-0.5 transition-all">
                <Download className="w-5 h-5 opacity-80" /> Save this calculation to Excel
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: What Could Be Automated */}
        <div className="bg-[#2C2620] py-24 px-6 text-[#F3EEE8] relative overflow-hidden">
          <div className="max-w-5xl mx-auto relative z-10">
            <p className="text-xs uppercase tracking-widest text-[#A5976D] font-bold text-center mb-4">Automation Architecture</p>
            <h2 className="text-4xl font-ojai-italic text-center mb-16 text-[#D4C9A8]">What Could Be Automated at OJAI</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-[#A5976D]/20 flex items-center justify-center mb-6">
                  <CalendarCheck className="w-6 h-6 text-[#A5976D]" />
                </div>
                <h3 className="font-bold text-xl mb-3 font-ojai">1. New Booking Confirmed</h3>
                <p className="opacity-70 text-sm leading-relaxed">The moment a client books via Salonized, a welcome sequence fires immediately — confirmation, intake & skin consultation forms dispatched and chased, without anyone lifting a finger.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl relative">
                <ArrowRight className="w-6 h-6 text-[#A5976D] absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block opacity-50" />
                <div className="w-12 h-12 rounded-full bg-[#D4C9A8]/20 flex items-center justify-center mb-6">
                  <FileText className="w-6 h-6 text-[#D4C9A8]" />
                </div>
                <h3 className="font-bold text-xl mb-3 font-ojai">2. Pre-Treatment Preparation</h3>
                <p className="opacity-70 text-sm leading-relaxed">Treatment-specific preparation instructions and consent documents sent automatically before each appointment — tailored per treatment type (sculpting massage, non-surgical facelifts, scalp treatments, and more).</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                  <BellRing className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 font-ojai">3. Reminders & Aftercare</h3>
                <p className="opacity-70 text-sm leading-relaxed">24-hour reminders before every session. Post-treatment, personalised aftercare instructions and product recommendations go out automatically — keeping the client experience warm and complete, long after they leave.</p>
              </div>
            </div>

            <div className="text-center mt-12 bg-white/5 border border-white/10 py-6 px-4 rounded-xl max-w-3xl mx-auto">
              <p className="font-ojai-italic text-lg opacity-90">
                Every step above runs completely automatically. <br className="hidden md:block" />
                <span className="text-[#A5976D] font-semibold not-italic">No copy-pasting. No forgetting. No chasing clients.</span>
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: Salonized Integration */}
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="mb-10 flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#2C2620]/5 border border-[#2C2620]/10">
              <img
                src="https://cdn.prod.website-files.com/6197c5af75db261a5cc41247/61c8d0f32174cd3b3078c796_ojai_logomark_trasparent%20black.svg"
                alt="OJAI icon"
                className="h-8 w-8 object-contain"
              />
              <span className="font-ojai text-2xl text-[#2C2620] font-semibold tracking-wide">× Salonized</span>
            </div>
          </div>
          <h2 className="text-4xl font-ojai text-[#2C2620] mb-6">Built around Salonized.</h2>
          <p className="text-lg text-[#2C2620]/70 font-light max-w-3xl mx-auto leading-relaxed mb-4">
            Salonized already manages OJAI's bookings, client records, and online scheduling.
            Custom automation layers on top — connecting Salonized to your email sequences, intake flows, consent forms, aftercare programs, and product follow-ups —
            <strong className="font-semibold text-[#2C2620]"> without replacing anything you already use or changing how you work</strong>.
          </p>
          <p className="text-sm text-[#2C2620]/50 font-light max-w-2xl mx-auto mb-12 italic">
            This is built to work alongside Salonized's existing notification system and booking workflows — not against them.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#2C2620]/5 border border-[#2C2620]/10 font-semibold text-sm text-[#2C2620]">
              <Zap className="w-4 h-4 text-[#A5976D] shrink-0" /> Automated Client Reminders
            </div>
            <div className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#2C2620]/5 border border-[#2C2620]/10 font-semibold text-sm text-[#2C2620]">
              <Zap className="w-4 h-4 text-[#A5976D] shrink-0" /> Intake Form Dispatch & Chase
            </div>
            <div className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#2C2620]/5 border border-[#2C2620]/10 font-semibold text-sm text-[#2C2620]">
              <Zap className="w-4 h-4 text-[#A5976D] shrink-0" /> Treatment Prep Sequences
            </div>
            <div className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#2C2620]/5 border border-[#2C2620]/10 font-semibold text-sm text-[#2C2620]">
              <Zap className="w-4 h-4 text-[#A5976D] shrink-0" /> Post-Treatment Aftercare
            </div>
            <div className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#2C2620]/5 border border-[#2C2620]/10 font-semibold text-sm text-[#2C2620]">
              <Zap className="w-4 h-4 text-[#A5976D] shrink-0" /> No-Show Follow-ups
            </div>
            <div className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#2C2620]/5 border border-[#2C2620]/10 font-semibold text-sm text-[#2C2620]">
              <Zap className="w-4 h-4 text-[#A5976D] shrink-0" /> Product Recommendation Emails
            </div>
          </div>
        </div>

        {/* SECTION 4: CTA */}
        <div className="bg-[#2C2620] text-white py-24 px-6 border-t-8 border-[#A5976D]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-ojai mb-6 tracking-tight">Want to reclaim those hours?</h2>
            <p className="text-xl font-light text-[#A5976D] mb-10 leading-relaxed font-ojai-italic">
              Let's talk specifically about what automation could look like for OJAI.
            </p>
            <a
              href="https://calendly.com/ghdalmoro/30-minute"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FACE0D] text-[#2C2620] hover:bg-white hover:text-[#2C2620] font-bold tracking-wider uppercase text-[15px] px-10 py-5 rounded-xl transition-all shadow-xl hover:-translate-y-1 w-full sm:w-auto justify-center"
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
      <footer className="py-12 bg-white border-t border-[#2C2620]/10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-5 text-center">
          <div className="flex items-center gap-5">
            <img
              src="https://cdn.prod.website-files.com/6197c5af75db261a5cc41247/61eaf0636773467f6c976806_ojai_logo_transparent%20white.svg"
              alt="OJAI"
              className="h-6 w-auto object-contain opacity-40 grayscale invert"
            />
            <X className="w-3 h-3 text-[#2C2620]/30 shrink-0" strokeWidth={3} />
            <img src="/favicon.png" alt="Gabriel Dalmoro" className="h-10 w-auto rounded-sm opacity-60 grayscale filter mix-blend-multiply" />
          </div>
          <div className="flex flex-col gap-2 items-center mt-4">
            <p className="text-[#2C2620]/80 font-ojai font-semibold tracking-wide text-lg">Gabriel Dalmoro</p>
            <p className="text-[#2C2620]/40 text-xs tracking-wider uppercase font-semibold">
              Less admin. More presence.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="mailto:gabriel@gabrieldalmoro.com" className="text-[#A5976D] hover:text-[#2C2620] text-sm font-semibold transition-colors">gabriel@gabrieldalmoro.com</a>
              <span className="text-[#2C2620]/20">|</span>
              <a href="https://gabrieldalmoro.com/en/clinic" target="_blank" rel="noopener noreferrer" className="text-[#A5976D] hover:text-[#2C2620] text-sm font-semibold transition-colors">Visit Main Site</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
