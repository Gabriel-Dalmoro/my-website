'use client';

import React, { useState } from 'react';
import { Download, X, Zap, ExternalLink, CalendarCheck, FileText, BellRing, Link2 } from 'lucide-react';

interface Task {
  id: number;
  name: string;
  timesPerWeek: number;
  minutesPerTask: number;
}

const DEFAULT_TASKS: Task[] = [
  { id: 1, name: 'Sending appointment reminders to clients', timesPerWeek: 30, minutesPerTask: 3 },
  { id: 2, name: 'Dispatching intake & health history forms to new clients', timesPerWeek: 12, minutesPerTask: 5 },
  { id: 3, name: 'Chasing clients for incomplete intake forms', timesPerWeek: 8, minutesPerTask: 6 },
  { id: 4, name: 'Sending pre-session preparation instructions per treatment type', timesPerWeek: 20, minutesPerTask: 4 },
  { id: 5, name: 'Post-session aftercare emails & rebooking prompts', timesPerWeek: 20, minutesPerTask: 7 },
  { id: 6, name: 'Following up on missed or cancelled appointments', timesPerWeek: 5, minutesPerTask: 10 },
  { id: 7, name: 'Answering repetitive client questions (pricing, prep, insurance)', timesPerWeek: 18, minutesPerTask: 5 },
  { id: 8, name: 'Direct billing admin & insurance documentation follow-up', timesPerWeek: 10, minutesPerTask: 8 },
];

export default function AlpineDemoPage() {
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);
  const [hourlyRate, setHourlyRate] = useState<number>(75);

  const updateTask = (id: number, field: keyof Task, value: string) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    setTasks(tasks.map(t => t.id === id ? { ...t, [field]: numValue } : t));
  };

  const totalWeeklyMinutes = tasks.reduce((acc, t) => acc + (t.timesPerWeek * t.minutesPerTask), 0);
  const weeklyHours = (totalWeeklyMinutes / 60).toFixed(1);
  const monthlyHours = (parseFloat(weeklyHours) * 4.33).toFixed(1);
  const annualHours = (parseFloat(weeklyHours) * 52).toFixed(1);
  const annualCost = (parseFloat(annualHours) * hourlyRate).toLocaleString('en-CA');

  const generateExport = async () => {
    try {
      const ExcelJS = (await import('exceljs')).default || await import('exceljs');
      const { saveAs } = (await import('file-saver')).default || await import('file-saver');

      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Gabriel Dalmoro';
      workbook.created = new Date();

      const sheet = workbook.addWorksheet('Impact Analysis');

      sheet.columns = [
        { header: 'Alpine Massage Admin Task', key: 'task', width: 52 },
        { header: 'Times per Week', key: 'tpw', width: 18 },
        { header: 'Minutes per Task', key: 'mpt', width: 18 },
        { header: 'Weekly Hours Lost', key: 'wh', width: 22 },
      ];

      const headerRow = sheet.getRow(1);
      headerRow.font = { name: 'Arial', bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
      headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1A3024' } };
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
        row.font = { size: 11, name: 'Arial', color: { argb: 'FF1A3024' } };
        row.getCell(4).font = { bold: true, color: { argb: 'FF508A64' } };
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
      titleRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF508A64' } };
      titleRow.alignment = { horizontal: 'center', vertical: 'middle' };
      titleRow.height = 30;

      const sumQuery = tasks.map((_, i) => `D${i + 2}`).join('+');

      const wRow = sheet.addRow(['Weekly Hours Lost', '', '', { formula: `ROUND(${sumQuery}, 1)` }]);
      const mRow = sheet.addRow(['Monthly Hours Lost', '', '', { formula: `ROUND(D${sumStart + 1}*4.33, 1)` }]);
      const aRow = sheet.addRow(['Annual Hours Lost', '', '', { formula: `ROUND(D${sumStart + 1}*52, 1)` }]);
      const rateRow = sheet.addRow(['Your Hourly Rate (CAD)', '', '', hourlyRate]);

      rateRow.getCell(4).numFmt = '$#,##0.00';
      rateRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF2F7F4' } };

      const costRow = sheet.addRow(['Annual Cost Unoptimized', '', '', { formula: `ROUND(D${sumStart + 3}*D${sumStart + 4}, 0)` }]);
      costRow.font = { bold: true, color: { argb: 'FF1A3024' }, size: 14 };
      costRow.getCell(4).numFmt = '$#,##0';
      costRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFA8C9B5' } };
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
      sheet.addRow(['Prepared for: Alpine Massage — Vancouver']);
      sheet.addRow([`Exported: ${new Date().toLocaleDateString()}`]);
      sheet.addRow(['Generated natively via gabrieldalmoro.com metrics platform']);

      sheet.getRow(sheet.rowCount - 2).font = { italic: true, color: { argb: 'FF888888' } };
      sheet.getRow(sheet.rowCount - 1).font = { italic: true, color: { argb: 'FF888888' } };
      sheet.getRow(sheet.rowCount).font = { italic: true, color: { argb: 'FFBBBBBB' }, size: 10 };

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `AlpineMassage-Time-Audit-${new Date().toISOString().split('T')[0]}.xlsx`);

    } catch (e) {
      console.error('Core Export Engine failure:', e);
      alert('Export mechanism loading, please execute again in one moment.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F7F4] text-[#1A3024] font-sans selection:bg-[#A8C9B5] selection:text-[#1A3024]">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@200;300;400;600&display=swap');
        .font-alpine { font-family: 'Raleway', sans-serif; font-weight: 200; }
        .font-alpine-med { font-family: 'Raleway', sans-serif; font-weight: 300; }
      `}} />

      {/* Header */}
      <header className="border-b border-[#1A3024]/10 py-5 px-6 sticky top-0 z-[100] bg-[#F2F7F4]/95 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="/demo/alpine-logo.png" alt="Alpine Massage" className="h-10 w-auto object-contain shrink-0" />
              <span className="font-alpine text-2xl tracking-[0.2em] text-[#1A3024] uppercase hidden sm:block">Alpine Massage</span>
            </div>
            <X className="w-3 h-3 text-[#1A3024]/30 shrink-0" strokeWidth={3} />
            <div className="flex items-center gap-3">
              <img src="/favicon.png" alt="Gabriel Dalmoro" className="h-10 sm:h-12 w-auto rounded object-contain shrink-0" />
              <span className="font-alpine-med text-xl tracking-wide hidden sm:block text-[#1A3024] leading-none">Gabriel Dalmoro</span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <a href="https://gabrieldalmoro.com/en/clinic" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#1A3024]/60 hover:text-[#1A3024] transition-colors hover:underline underline-offset-4 hidden sm:block">
              Visit Main Site
            </a>
            <div className="text-xs font-semibold tracking-widest uppercase border border-[#508A64]/50 px-4 py-2 rounded-full bg-[#508A64]/10 text-[#508A64]">
              Automation Demo
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <div
          className="relative w-full overflow-hidden text-white py-28 px-6"
          style={{ backgroundImage: `url('/demo/alpine-mountain-bg.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-[#1A3024]/75" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#508A64]/30 via-transparent to-[#1A3024]/40 pointer-events-none" />
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-widest text-white/70 uppercase mb-10">
              Massage Therapy · Vancouver, BC
            </div>
            <h1 className="font-alpine text-5xl md:text-7xl mb-6 tracking-[0.15em] uppercase leading-tight drop-shadow-sm">
              Less Admin.<br className="hidden md:block" /> More Healing.
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 font-alpine tracking-widest">
              Built exclusively for Alpine Massage.
            </p>
            <p className="text-lg opacity-70 max-w-2xl mx-auto leading-relaxed mb-8 font-alpine-med">
              Your RMTs are focused on helping clients recover faster, manage chronic pain, and feel genuinely better. Let intelligent automation handle the reminders, intake forms, and follow-ups — so your team stays present and your clinic runs itself.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-sm font-semibold tracking-wider text-white/70">
              <Link2 className="w-4 h-4" /> Works alongside Jane
            </div>
          </div>
        </div>

        {/* SECTION 1: Time Audit */}
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-[#508A64] font-bold mb-3">Time Audit</p>
            <h2 className="font-alpine text-4xl text-[#1A3024] mb-4 uppercase tracking-[0.15em]">Where Is Clinical Time Going?</h2>
            <p className="text-lg text-[#1A3024]/60 font-alpine-med max-w-2xl mx-auto">
              Adjust the numbers to match your weekly reality. See exactly how much time is spent on tasks that never needed an RMT or admin in the loop.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-[#1A3024]/10 overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#1A3024]">
                <thead>
                  <tr className="bg-[#1A3024]/5 text-[#1A3024]/60 border-b border-[#1A3024]/10 uppercase text-[10px] tracking-wider font-semibold">
                    <th className="py-5 px-6 font-semibold">Clinic Admin Task</th>
                    <th className="py-5 px-6 font-semibold text-center whitespace-nowrap w-32 border-l border-[#1A3024]/10">Times per Week</th>
                    <th className="py-5 px-6 font-semibold text-center whitespace-nowrap w-32 border-l border-[#1A3024]/10">Mins per Task</th>
                    <th className="py-5 px-6 font-semibold text-right whitespace-nowrap w-36 border-l border-[#1A3024]/10 text-white bg-[#1A3024]">Weekly Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A3024]/5">
                  {tasks.map((t) => {
                    const rowHours = (t.timesPerWeek * t.minutesPerTask / 60).toFixed(1);
                    return (
                      <tr key={t.id} className="hover:bg-[#F2F7F4] transition-colors">
                        <td className="py-4 px-6 font-medium text-[15px]">{t.name}</td>
                        <td className="py-4 px-6 text-center whitespace-nowrap border-l border-[#1A3024]/10">
                          <input
                            type="number"
                            min="0"
                            value={t.timesPerWeek}
                            onChange={(e) => updateTask(t.id, 'timesPerWeek', e.target.value)}
                            className="w-16 bg-[#F2F7F4] border border-[#1A3024]/20 focus:border-[#508A64] focus:ring-1 focus:ring-[#508A64] outline-none py-1.5 px-2 text-center rounded tabular-nums font-bold text-[14px] transition-all"
                          />
                        </td>
                        <td className="py-4 px-6 text-center whitespace-nowrap border-l border-[#1A3024]/10">
                          <input
                            type="number"
                            min="0"
                            value={t.minutesPerTask}
                            onChange={(e) => updateTask(t.id, 'minutesPerTask', e.target.value)}
                            className="w-16 bg-[#F2F7F4] border border-[#1A3024]/20 focus:border-[#508A64] focus:ring-1 focus:ring-[#508A64] outline-none py-1.5 px-2 text-center rounded tabular-nums font-bold text-[14px] transition-all"
                          />
                        </td>
                        <td className="py-4 px-6 text-right whitespace-nowrap font-bold text-[#508A64] font-alpine text-xl border-l border-[#1A3024]/5 bg-[#1A3024]/[0.02]">
                          {rowHours} <span className="text-xs font-sans text-[#1A3024]/40 font-semibold uppercase">hrs</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Results */}
            <div className="bg-[#1A3024] text-white p-8 md:p-12 border-t-4 border-[#508A64] relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-5 w-64 h-64 -translate-y-1/2 translate-x-1/4 rounded-full bg-white blur-3xl" />
              <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white/10 p-6 rounded-2xl border border-white/10 text-center">
                    <p className="text-xs uppercase tracking-widest text-[#508A64] font-bold mb-2">Weekly Hours</p>
                    <p className="text-4xl font-alpine font-bold text-white">{weeklyHours}</p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-2xl border border-white/10 text-center">
                    <p className="text-xs uppercase tracking-widest text-[#508A64] font-bold mb-2">Monthly Hours</p>
                    <p className="text-4xl font-alpine font-bold text-white">{monthlyHours}</p>
                  </div>
                  <div className="bg-[#508A64] p-6 rounded-2xl text-center shadow-lg transform md:-translate-y-2">
                    <p className="text-xs uppercase tracking-widest text-white/80 font-bold mb-2">Annual Hours</p>
                    <p className="text-5xl font-alpine font-bold text-white">{annualHours}</p>
                  </div>
                </div>
                <div className="md:col-span-4 pl-0 md:pl-8 border-t md:border-t-0 md:border-l border-white/20 pt-8 md:pt-0 pb-2">
                  <label className="text-xs uppercase tracking-widest text-white/60 font-bold block mb-3">Your Hourly Rate</label>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl font-bold font-alpine">$</span>
                    <input
                      type="number"
                      className="text-3xl font-bold font-alpine text-white w-24 bg-transparent border-b-2 border-white/30 focus:border-[#A8C9B5] outline-none pb-1 placeholder-white/30 transition-colors"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(parseInt(e.target.value) || 0)}
                      placeholder="75"
                    />
                    <span className="text-sm text-white/50 font-semibold uppercase tracking-wider">CAD</span>
                  </div>
                  <p className="text-sm font-medium text-white/90 leading-snug">
                    That's <span className="text-2xl font-alpine font-bold text-[#A8C9B5]">${annualCost}</span> per year spent on tasks that could run automatically.
                  </p>
                </div>
              </div>
            </div>

            {/* Export */}
            <div className="bg-white p-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-[#1A3024]/50 italic font-alpine-med">Calculations update in real-time. No data is stored.</p>
              <button onClick={() => generateExport()} className="w-full sm:w-auto justify-center flex items-center gap-3 px-8 py-4 bg-[#1A3024] text-white hover:bg-[#2a4a38] rounded-lg font-bold text-[15px] tracking-wide shadow-sm hover:-translate-y-0.5 transition-all">
                <Download className="w-5 h-5 opacity-80" /> Save this calculation to Excel
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: Automation Architecture */}
        <div className="bg-[#0F1F18] py-24 px-6 text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto relative z-10">
            <p className="text-xs uppercase tracking-widest text-[#508A64] font-bold text-center mb-4">Automation Architecture</p>
            <h2 className="font-alpine text-4xl text-center mb-16 text-[#A8C9B5] uppercase tracking-[0.15em]">What Could Be Automated at Alpine</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-[#508A64]/20 flex items-center justify-center mb-6">
                  <CalendarCheck className="w-6 h-6 text-[#508A64]" />
                </div>
                <h3 className="font-alpine text-xl mb-3 uppercase tracking-wider">1. New Client Books Online</h3>
                <p className="opacity-70 text-sm leading-relaxed font-alpine-med">The moment a client books through Jane, a welcome sequence fires — intake forms, health history, and insurance information dispatched and chased automatically, so your team walks in prepared, not scrambling.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-[#A8C9B5]/20 flex items-center justify-center mb-6">
                  <FileText className="w-6 h-6 text-[#A8C9B5]" />
                </div>
                <h3 className="font-alpine text-xl mb-3 uppercase tracking-wider">2. Pre-Session Preparation</h3>
                <p className="opacity-70 text-sm leading-relaxed font-alpine-med">Tailored prep instructions sent automatically before each appointment — different guidance for deep tissue, prenatal, sports therapy, or stress relief sessions. Every client arrives knowing exactly what to expect.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                  <BellRing className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-alpine text-xl mb-3 uppercase tracking-wider">3. Aftercare & Rebooking</h3>
                <p className="opacity-70 text-sm leading-relaxed font-alpine-med">After every session, personalised aftercare instructions go out automatically. A well-timed rebooking prompt follows — keeping clients on track with their long-term health outcomes without anyone chasing them.</p>
              </div>
            </div>

            <div className="text-center mt-12 bg-white/5 border border-white/10 py-6 px-4 rounded-xl max-w-3xl mx-auto">
              <p className="font-alpine text-lg opacity-90 tracking-wide">
                Every step above runs completely automatically. <br className="hidden md:block" />
                <span className="text-[#508A64]">No copy-pasting. No forgetting. No chasing clients.</span>
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: Jane Integration */}
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="mb-10 flex justify-center">
            <img src="/demo/jane-logo.png" alt="Jane" className="h-20 w-auto object-contain" />
          </div>
          <h2 className="font-alpine text-4xl text-[#1A3024] mb-6 uppercase tracking-[0.15em]">Built Around Jane.</h2>
          <p className="text-lg text-[#1A3024]/60 font-alpine-med max-w-3xl mx-auto leading-relaxed mb-4">
            Jane already manages Alpine's bookings, client records, scheduling, and direct billing workflows.
            Custom automation layers on top — connecting Jane to intelligent email sequences, intake flows, aftercare programs, and rebooking campaigns —
            <strong className="font-semibold text-[#1A3024]"> without changing how your team operates or replacing anything you already use.</strong>
          </p>
          <p className="text-sm text-[#1A3024]/40 font-alpine-med max-w-2xl mx-auto mb-10 italic">
            Jane doesn't offer a public API — so this is built to work intelligently around Jane's existing notification system, booking triggers, and form workflows, not through a direct integration.
          </p>

          <div className="bg-[#1A3024] border border-[#508A64]/30 rounded-2xl p-8 max-w-3xl mx-auto text-left shadow-xl">
            <p className="text-xs uppercase tracking-widest text-[#508A64] font-bold mb-6 text-center">Possible Future Connections via Jane's Integrations</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/80">
              <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10"><Zap className="w-4 h-4 text-[#508A64] shrink-0 mt-0.5" /><span><strong className="text-white">Jane Payments</strong> — pre-payment collection and e-invoice sequences for outstanding balances</span></div>
              <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10"><Zap className="w-4 h-4 text-[#508A64] shrink-0 mt-0.5" /><span><strong className="text-white">Physitrack / Wibbi</strong> — home exercise programs shared from Jane, auto-logged in the patient chart</span></div>
              <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10"><Zap className="w-4 h-4 text-[#508A64] shrink-0 mt-0.5" /><span><strong className="text-white">MailChimp</strong> — opted-in clients sync to your email lists automatically for campaigns</span></div>
              <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10"><Zap className="w-4 h-4 text-[#508A64] shrink-0 mt-0.5" /><span><strong className="text-white">Google Calendar</strong> — Jane appointments pushed to your external calendar in real time</span></div>
              <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10"><Zap className="w-4 h-4 text-[#508A64] shrink-0 mt-0.5" /><span><strong className="text-white">Fullscript</strong> — supplement recommendations dispatched post-visit, documented in Jane</span></div>
              <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10"><Zap className="w-4 h-4 text-[#508A64] shrink-0 mt-0.5" /><span><strong className="text-white">Google Analytics</strong> — booking conversion tracking tied to your online presence</span></div>
            </div>
          </div>
        </div>

        {/* SECTION 4: CTA */}
        <div className="bg-[#1A3024] text-white py-24 px-6 border-t-8 border-[#508A64]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-alpine text-4xl md:text-5xl mb-6 tracking-[0.15em] uppercase">Ready to reclaim those hours?</h2>
            <p className="text-xl text-[#508A64] mb-10 leading-relaxed font-alpine tracking-wide">
              Let's talk specifically about what automation could look like for Alpine Massage.
            </p>
            <a
              href="https://calendly.com/ghdalmoro/30-minute"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FACC14] text-[#1A3024] hover:bg-white hover:text-[#1A3024] font-bold tracking-wider uppercase text-[15px] px-10 py-5 rounded-xl transition-all shadow-xl hover:-translate-y-1 w-full sm:w-auto justify-center"
            >
              Book a 30-Minute Alignment Call <ExternalLink className="w-5 h-5 ml-2" />
            </a>
            <p className="mt-8 text-sm opacity-50">
              No obligation. No pitch. Just a focused conversation about what's actually possible.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-[#1A3024]/10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-5 text-center">
          <div className="flex items-center gap-5">
            <img src="/demo/alpine-logo.png" alt="Alpine Massage" className="h-10 w-auto object-contain opacity-30 grayscale" />
            <X className="w-3 h-3 text-[#1A3024]/30 shrink-0" strokeWidth={3} />
            <img src="/favicon.png" alt="Gabriel Dalmoro" className="h-10 w-auto rounded-sm opacity-60 grayscale filter mix-blend-multiply" />
          </div>
          <div className="flex flex-col gap-2 items-center mt-4">
            <p className="text-[#1A3024]/70 font-alpine tracking-widest text-lg uppercase">Gabriel Dalmoro</p>
            <p className="text-[#1A3024]/40 text-xs tracking-wider uppercase font-semibold">Less admin. More healing.</p>
            <div className="flex gap-4 mt-2">
              <a href="mailto:gabriel@gabrieldalmoro.com" className="text-[#508A64] hover:text-[#1A3024] text-sm font-semibold transition-colors">gabriel@gabrieldalmoro.com</a>
              <span className="text-[#1A3024]/20">|</span>
              <a href="https://gabrieldalmoro.com/en/clinic" target="_blank" rel="noopener noreferrer" className="text-[#508A64] hover:text-[#1A3024] text-sm font-semibold transition-colors">Visit Main Site</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
