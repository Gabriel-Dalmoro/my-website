'use client';

import React, { useState } from 'react';
import { Download, X, Zap, ExternalLink, CalendarCheck, FileText, BellRing, Leaf, Link2 } from 'lucide-react';

interface Task {
  id: number;
  name: string;
  timesPerWeek: number;
  minutesPerTask: number;
}

const DEFAULT_TASKS: Task[] = [
  { id: 1, name: 'Sending appointment reminders to patients', timesPerWeek: 25, minutesPerTask: 3 },
  { id: 2, name: 'Dispatching patient intake & health history forms', timesPerWeek: 10, minutesPerTask: 5 },
  { id: 3, name: 'Chasing patients for incomplete intake forms', timesPerWeek: 8, minutesPerTask: 7 },
  { id: 4, name: 'Sending treatment preparation instructions (acupuncture, naturopathic protocols)', timesPerWeek: 12, minutesPerTask: 5 },
  { id: 5, name: 'Post-visit follow-up emails, care instructions & supplement recommendations', timesPerWeek: 15, minutesPerTask: 8 },
  { id: 6, name: 'Following up on missed or cancelled appointments', timesPerWeek: 4, minutesPerTask: 10 },
  { id: 7, name: 'Answering repetitive patient questions about treatments & what to expect', timesPerWeek: 15, minutesPerTask: 5 },
  { id: 8, name: 'Manual patient record updates in Jane', timesPerWeek: 10, minutesPerTask: 6 },
];

export default function RachelLamDemoPage() {
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);
  const [hourlyRate, setHourlyRate] = useState<number>(65);

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
        { header: 'Dr. Rachel Lam Clinic Admin Task', key: 'task', width: 52 },
        { header: 'Times per Week', key: 'tpw', width: 18 },
        { header: 'Minutes per Task', key: 'mpt', width: 18 },
        { header: 'Weekly Hours Lost', key: 'wh', width: 22 },
      ];

      const headerRow = sheet.getRow(1);
      headerRow.font = { name: 'Arial', bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
      headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A38' } };
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
        row.font = { size: 11, name: 'Arial', color: { argb: 'FF1E3A38' } };
        row.getCell(4).font = { bold: true, color: { argb: 'FF54ACA2' } };
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
      titleRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF54ACA2' } };
      titleRow.alignment = { horizontal: 'center', vertical: 'middle' };
      titleRow.height = 30;

      const sumQuery = tasks.map((_, i) => `D${i + 2}`).join('+');

      const wRow = sheet.addRow(['Weekly Hours Lost', '', '', { formula: `ROUND(${sumQuery}, 1)` }]);
      const mRow = sheet.addRow(['Monthly Hours Lost', '', '', { formula: `ROUND(D${sumStart + 1}*4.33, 1)` }]);
      const aRow = sheet.addRow(['Annual Hours Lost', '', '', { formula: `ROUND(D${sumStart + 1}*52, 1)` }]);
      const rateRow = sheet.addRow(['Your Hourly Rate (CAD)', '', '', hourlyRate]);

      rateRow.getCell(4).numFmt = '$#,##0.00';
      rateRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0F7F6' } };

      const costRow = sheet.addRow(['Annual Cost Unoptimized', '', '', { formula: `ROUND(D${sumStart + 3}*D${sumStart + 4}, 0)` }]);
      costRow.font = { bold: true, color: { argb: 'FF1E3A38' }, size: 14 };
      costRow.getCell(4).numFmt = '$#,##0';
      costRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFB8DDD9' } };
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
      sheet.addRow(['Prepared for: Dr. Rachel Lam, ND, RAc']);
      sheet.addRow([`Exported: ${new Date().toLocaleDateString()}`]);
      sheet.addRow(['Generated natively via gabrieldalmoro.com metrics platform']);

      sheet.getRow(sheet.rowCount - 2).font = { italic: true, color: { argb: 'FF888888' } };
      sheet.getRow(sheet.rowCount - 1).font = { italic: true, color: { argb: 'FF888888' } };
      sheet.getRow(sheet.rowCount).font = { italic: true, color: { argb: 'FFBBBBBB' }, size: 10 };

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `DrRachelLam-Time-Audit-${new Date().toISOString().split('T')[0]}.xlsx`);

    } catch (e) {
      console.error('Core Export Engine failure:', e);
      alert('Export mechanism loading, please execute again in one moment.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F7F6] text-[#1E3A38] font-sans selection:bg-[#B8DDD9] selection:text-[#1E3A38]">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&display=swap');
        /* Replace the Cinzel import above with your Adobe Fonts (Typekit) kit once available:
           <link rel="stylesheet" href="https://use.typekit.net/YOUR_KIT_ID.css">
           Then swap font-family references below to 'trajan-sans-pro', serif */
        .font-heading { font-family: 'trajan-sans-pro', 'Cinzel', Georgia, serif; font-weight: 400; }
      `}} />

      {/* Header */}
      <header className="border-b border-[#1E3A38]/10 py-5 px-6 sticky top-0 z-[100] bg-[#F0F7F6]/95 backdrop-blur-md shadow-sm transition-all">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-[#54ACA2]" />
              <span className="font-heading text-lg tracking-widest text-[#1E3A38] uppercase">Dr. Rachel Lam, ND, RAc</span>
            </div>
            <X className="w-3 h-3 text-[#1E3A38]/30 shrink-0" strokeWidth={3} />
            <div className="flex items-center gap-3">
              <img src="/favicon.png" alt="Gabriel Dalmoro" className="h-10 sm:h-12 w-auto rounded object-contain shrink-0" />
              <span className="font-heading text-xl tracking-wide hidden sm:block text-[#1E3A38] leading-none mt-1">Gabriel Dalmoro</span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <a href="https://gabrieldalmoro.com/en/clinic" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#1E3A38]/70 hover:text-[#1E3A38] transition-colors hover:underline underline-offset-4 hidden sm:block">
              Visit Main Site
            </a>
            <div className="text-xs font-semibold tracking-widest uppercase border border-[#54ACA2]/50 px-4 py-2 rounded-full bg-[#54ACA2]/10 text-[#54ACA2]">
              Automation Demo
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section — replace the background colour below with the hero image once available:
            style={{ backgroundImage: `url('/demo/rachel-lam-hero.webp')` }}
            and add bg-cover bg-center to the className */}
        <div
          className="relative w-full overflow-hidden text-white"
          style={{ backgroundImage: `url('/demo/rachel-lam-hero.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          {/* Dark overlay so text stays readable over any image */}
          <div className="absolute inset-0 bg-[#1E3A38]/70 z-0" />

          <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 py-28 px-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-widest text-white/80 uppercase mb-8">
              <Leaf className="w-3.5 h-3.5" /> Naturopathic Medicine · British Columbia
            </div>
            <h1 className="font-heading text-5xl md:text-7xl mb-6 tracking-widest drop-shadow-sm uppercase">
              Less Admin.<br className="hidden md:block" /> More Healing.
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/90 mb-8 font-heading">
              Built exclusively for Dr. Rachel Lam's practice.
            </p>
            <p className="text-lg opacity-80 max-w-2xl mx-auto leading-relaxed mb-8">
              Your patients come to you motivated to improve their health. Let intelligent automation handle the reminders, intake forms, and follow-ups — so your energy stays where it matters most: on tailored, whole-person care.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-sm font-semibold tracking-wider text-white/80">
              <Link2 className="w-4 h-4" /> Works alongside Jane
            </div>
          </div>
        </div>

        {/* SECTION 1: Wasted Hours Calculator */}
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-[#54ACA2] font-bold mb-3">Time Audit</p>
            <h2 className="font-heading text-4xl text-[#1E3A38] mb-4 uppercase tracking-widest">Where Is Clinical Time Going?</h2>
            <p className="text-lg text-[#1E3A38]/70 font-light max-w-2xl mx-auto">
              Adjust the numbers to match your weekly reality. See exactly how much time is spent on tasks that never needed a practitioner in the loop.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-[#1E3A38]/10 overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#1E3A38]">
                <thead>
                  <tr className="bg-[#1E3A38]/5 text-[#1E3A38]/70 border-b border-[#1E3A38]/10 uppercase text-[10px] tracking-wider font-semibold">
                    <th className="py-5 px-6 font-semibold">Practice Admin Task</th>
                    <th className="py-5 px-6 font-semibold text-center whitespace-nowrap w-32 border-l border-[#1E3A38]/10">Times per Week</th>
                    <th className="py-5 px-6 font-semibold text-center whitespace-nowrap w-32 border-l border-[#1E3A38]/10">Mins per Task</th>
                    <th className="py-5 px-6 font-semibold text-right whitespace-nowrap w-36 border-l border-[#1E3A38]/10 text-white bg-[#1E3A38]">Weekly Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E3A38]/5">
                  {tasks.map((t) => {
                    const rowHours = (t.timesPerWeek * t.minutesPerTask / 60).toFixed(1);
                    return (
                      <tr key={t.id} className="hover:bg-[#F0F7F6] transition-colors group">
                        <td className="py-4 px-6 font-medium text-[15px]">{t.name}</td>
                        <td className="py-4 px-6 text-center whitespace-nowrap border-l border-[#1E3A38]/10">
                          <input
                            type="number"
                            min="0"
                            value={t.timesPerWeek}
                            onChange={(e) => updateTask(t.id, 'timesPerWeek', e.target.value)}
                            className="w-16 bg-[#F0F7F6] border border-[#1E3A38]/20 focus:border-[#54ACA2] focus:ring-1 focus:ring-[#54ACA2] outline-none py-1.5 px-2 text-center rounded tabular-nums font-bold text-[14px] transition-all"
                          />
                        </td>
                        <td className="py-4 px-6 text-center whitespace-nowrap border-l border-[#1E3A38]/10">
                          <input
                            type="number"
                            min="0"
                            value={t.minutesPerTask}
                            onChange={(e) => updateTask(t.id, 'minutesPerTask', e.target.value)}
                            className="w-16 bg-[#F0F7F6] border border-[#1E3A38]/20 focus:border-[#54ACA2] focus:ring-1 focus:ring-[#54ACA2] outline-none py-1.5 px-2 text-center rounded tabular-nums font-bold text-[14px] transition-all"
                          />
                        </td>
                        <td className="py-4 px-6 text-right whitespace-nowrap font-bold text-[#54ACA2] font-heading text-xl border-l border-[#1E3A38]/5 bg-[#1E3A38]/[0.02]">
                          {rowHours} <span className="text-xs font-sans text-[#1E3A38]/40 font-semibold uppercase">hrs</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Results */}
            <div className="bg-[#1E3A38] text-white p-8 md:p-12 border-t-4 border-[#54ACA2] relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-5 w-64 h-64 -translate-y-1/2 translate-x-1/4 rounded-full bg-white blur-3xl"></div>

              <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white/10 p-6 rounded-2xl border border-white/10 text-center">
                    <p className="text-xs uppercase tracking-widest text-[#54ACA2] font-bold mb-2">Weekly Hours</p>
                    <p className="text-4xl font-heading font-bold text-white">{weeklyHours}</p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-2xl border border-white/10 text-center">
                    <p className="text-xs uppercase tracking-widest text-[#54ACA2] font-bold mb-2">Monthly Hours</p>
                    <p className="text-4xl font-heading font-bold text-white">{monthlyHours}</p>
                  </div>
                  <div className="bg-[#54ACA2] p-6 rounded-2xl text-center shadow-lg transform md:-translate-y-2">
                    <p className="text-xs uppercase tracking-widest text-white/80 font-bold mb-2">Annual Hours</p>
                    <p className="text-5xl font-heading font-bold text-white">{annualHours}</p>
                  </div>
                </div>

                <div className="md:col-span-4 pl-0 md:pl-8 border-t md:border-t-0 md:border-l border-white/20 pt-8 md:pt-0 pb-2">
                  <label className="text-xs uppercase tracking-widest text-white/70 font-bold block mb-3">Your Hourly Rate</label>
                  <div className="flex items-center gap-3 mb-6 focus-within:text-[#B8DDD9] transition-colors">
                    <span className="text-2xl font-bold font-heading">$</span>
                    <input
                      type="number"
                      className="text-3xl font-bold font-heading text-white w-24 bg-transparent border-b-2 border-white/30 focus:border-[#B8DDD9] outline-none pb-1 placeholder-white/30 transition-colors"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(parseInt(e.target.value) || 0)}
                      placeholder="65"
                    />
                    <span className="text-sm text-white/50 font-semibold uppercase tracking-wider">CAD</span>
                  </div>
                  <p className="text-sm font-medium text-white/90 leading-snug">
                    That's <span className="text-2xl font-heading font-bold text-[#B8DDD9]">${annualCost}</span> per year spent on tasks that could run automatically.
                  </p>
                </div>
              </div>
            </div>

            {/* Export */}
            <div className="bg-white p-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-[#1E3A38]/60 italic font-heading">Calculations update in real-time. No data is stored.</p>
              <button onClick={() => generateExport()} className="w-full sm:w-auto justify-center flex items-center gap-3 px-8 py-4 bg-[#1E3A38] text-white hover:bg-[#2a4f4c] border border-[#1E3A38] rounded-lg font-bold text-[15px] tracking-wide shadow-sm hover:-translate-y-0.5 transition-all">
                <Download className="w-5 h-5 opacity-80" /> Save this calculation to Excel
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: What Could Be Automated */}
        <div className="bg-[#0F2220] py-24 px-6 text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto relative z-10">
            <p className="text-xs uppercase tracking-widest text-[#54ACA2] font-bold text-center mb-4">Automation Architecture</p>
            <h2 className="font-heading text-4xl text-center mb-16 text-[#B8DDD9] uppercase tracking-widest">What Could Be Automated in Your Practice</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-[#54ACA2]/20 flex items-center justify-center mb-6">
                  <CalendarCheck className="w-6 h-6 text-[#54ACA2]" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3 uppercase tracking-wider">1. New Patient Books Online</h3>
                <p className="opacity-70 text-sm leading-relaxed">The moment a patient books through Jane, their intake forms and health history questionnaire fire automatically — welcomed, chased, and completed before their first visit, without anyone lifting a finger.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-[#B8DDD9]/20 flex items-center justify-center mb-6">
                  <FileText className="w-6 h-6 text-[#B8DDD9]" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3 uppercase tracking-wider">2. Pre-Appointment Preparation</h3>
                <p className="opacity-70 text-sm leading-relaxed">Treatment-specific preparation instructions — acupuncture protocols, naturopathic dietary guidance, what to avoid before a session — sent automatically tailored to each appointment type. No copy-pasting required.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                  <BellRing className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3 uppercase tracking-wider">3. Post-Visit Care & Follow-Up</h3>
                <p className="opacity-70 text-sm leading-relaxed">After each visit, personalised aftercare instructions, supplement plans via Fullscript, and outcome check-ins send automatically — keeping patients engaged in their health journey between appointments.</p>
              </div>
            </div>

            <div className="text-center mt-12 bg-white/5 border border-white/10 py-6 px-4 rounded-xl max-w-3xl mx-auto">
              <p className="font-heading text-lg opacity-90 tracking-wide">
                Every step above runs completely automatically. <br className="hidden md:block" />
                <span className="text-[#54ACA2] font-semibold">No copy-pasting. No forgetting. No chasing patients.</span>
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: Jane Integration */}
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="mb-10 flex flex-col items-center gap-4">
            <img src="/demo/jane-logo.png" alt="Jane" className="h-20 w-auto object-contain" />
          </div>
          <h2 className="font-heading text-4xl text-[#1E3A38] mb-6 uppercase tracking-widest">Built Around Jane.</h2>
          <p className="text-lg text-[#1E3A38]/70 font-light max-w-3xl mx-auto leading-relaxed mb-4">
            Jane already manages your bookings, patient records, scheduling, and clinical charting across Richmond, Vancouver, and all of BC.
            Custom automation layers on top — connecting Jane to intelligent email sequences, intake workflows, follow-up programs, and engagement flows —
            <strong className="font-semibold text-[#1E3A38]"> without changing how you practice or replacing any tool you rely on.</strong>
          </p>
          <p className="text-sm text-[#1E3A38]/50 font-light max-w-2xl mx-auto mb-10 italic">
            Jane doesn't offer a public API — so this is built to work intelligently around Jane's existing notification system, booking triggers, and form workflows, not through a direct integration.
          </p>

          {/* Possible future connections */}
          <div className="bg-[#1E3A38] border border-[#54ACA2]/30 rounded-2xl p-8 max-w-3xl mx-auto text-left shadow-xl">
            <p className="text-xs uppercase tracking-widest text-[#54ACA2] font-bold mb-6 text-center">Possible Future Connections via Jane's Integrations</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/80">
              <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10"><Zap className="w-4 h-4 text-[#54ACA2] shrink-0 mt-0.5" /><span><strong className="text-white">Fullscript</strong> — auto-send supplement plans post-visit, documented in Jane</span></div>
              <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10"><Zap className="w-4 h-4 text-[#54ACA2] shrink-0 mt-0.5" /><span><strong className="text-white">Physitrack / Wibbi</strong> — home exercise programs shared from Jane, auto-logged</span></div>
              <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10"><Zap className="w-4 h-4 text-[#54ACA2] shrink-0 mt-0.5" /><span><strong className="text-white">MailChimp</strong> — opted-in patients sync to your email lists automatically</span></div>
              <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10"><Zap className="w-4 h-4 text-[#54ACA2] shrink-0 mt-0.5" /><span><strong className="text-white">Google Calendar</strong> — Jane appointments pushed to your external calendar</span></div>
              <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10"><Zap className="w-4 h-4 text-[#54ACA2] shrink-0 mt-0.5" /><span><strong className="text-white">Jane Payments</strong> — pre-payment flows and e-invoice sequences</span></div>
              <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10"><Zap className="w-4 h-4 text-[#54ACA2] shrink-0 mt-0.5" /><span><strong className="text-white">Google Analytics</strong> — booking conversion tracking for your online presence</span></div>
            </div>
          </div>
        </div>

        {/* SECTION 4: CTA */}
        <div className="bg-[#1E3A38] text-white py-24 px-6 border-t-8 border-[#54ACA2]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-4xl md:text-5xl mb-6 tracking-widest uppercase">Ready to reclaim those hours?</h2>
            <p className="text-xl font-light text-[#54ACA2] mb-10 leading-relaxed font-heading">
              Let's talk specifically about what automation could look like for your practice.
            </p>
            <a
              href="https://calendly.com/ghdalmoro/30-minute"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FACC14] text-[#1E3A38] hover:bg-white hover:text-[#1E3A38] font-bold tracking-wider uppercase text-[15px] px-10 py-5 rounded-xl transition-all shadow-xl hover:-translate-y-1 w-full sm:w-auto justify-center"
            >
              Book a 30-Minute Alignment Call <ExternalLink className="w-5 h-5 ml-2" />
            </a>
            <p className="mt-8 text-sm opacity-60">
              No obligation. No pitch. Just a focused conversation about what's actually possible.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-[#1E3A38]/10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-5 text-center">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 opacity-40">
              <Leaf className="w-4 h-4 text-[#1E3A38]" />
              <span className="font-heading text-sm tracking-widest text-[#1E3A38] uppercase">Dr. Rachel Lam, ND</span>
            </div>
            <X className="w-3 h-3 text-[#1E3A38]/30 shrink-0" strokeWidth={3} />
            <img src="/favicon.png" alt="Gabriel Dalmoro" className="h-10 w-auto rounded-sm opacity-60 grayscale filter mix-blend-multiply" />
          </div>
          <div className="flex flex-col gap-2 items-center mt-4">
            <p className="text-[#1E3A38]/80 font-heading font-semibold tracking-widest text-lg uppercase">Gabriel Dalmoro</p>
            <p className="text-[#1E3A38]/40 text-xs tracking-wider uppercase font-semibold">
              Less admin. More patient care.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="mailto:gabriel@gabrieldalmoro.com" className="text-[#54ACA2] hover:text-[#1E3A38] text-sm font-semibold transition-colors">gabriel@gabrieldalmoro.com</a>
              <span className="text-[#1E3A38]/20">|</span>
              <a href="https://gabrieldalmoro.com/en/clinic" target="_blank" rel="noopener noreferrer" className="text-[#54ACA2] hover:text-[#1E3A38] text-sm font-semibold transition-colors">Visit Main Site</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
