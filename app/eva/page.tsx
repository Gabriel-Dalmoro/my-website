'use client';

import React, { useState } from 'react';
import { Download, ArrowRight, X, Settings, Zap, ExternalLink, CalendarCheck, FileText, BellRing, ShieldCheck, Stethoscope, Sparkles } from 'lucide-react';

interface Task {
  id: number;
  name: string;
  timesPerWeek: number;
  minutesPerTask: number;
}

const DEFAULT_TASKS: Task[] = [
  { id: 1, name: 'Dispatching & chasing pre-visit medical history forms', timesPerWeek: 35, minutesPerTask: 5 },
  { id: 2, name: 'Sending multi-channel appointment & reminder confirmations', timesPerWeek: 45, minutesPerTask: 3 },
  { id: 3, name: 'Pre-procedure prep instructions (CBCT scans, implants, surgery)', timesPerWeek: 15, minutesPerTask: 8 },
  { id: 4, name: 'Informed consent & treatment plan signature chasing', timesPerWeek: 12, minutesPerTask: 10 },
  { id: 5, name: 'Post-operative recovery & aftercare check-in sequences', timesPerWeek: 20, minutesPerTask: 6 },
  { id: 6, name: 'Re-engaging overdue 6-month check-ups & hygiene recalls', timesPerWeek: 30, minutesPerTask: 7 },
  { id: 7, name: 'Answering repetitive inquiries & multi-language FAQs', timesPerWeek: 40, minutesPerTask: 4 },
  { id: 8, name: 'Manual data entry & patient record reconciliation across systems', timesPerWeek: 20, minutesPerTask: 6 },
];

export default function EvaDemoPage() {
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);
  const [hourlyRate, setHourlyRate] = useState<number>(110);

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
        { header: 'Eva Clinic Admin & Clinical Task', key: 'task', width: 50 },
        { header: 'Times per Week', key: 'tpw', width: 18 },
        { header: 'Minutes per Task', key: 'mpt', width: 18 },
        { header: 'Weekly Hours Lost', key: 'wh', width: 22 },
      ];

      const headerRow = sheet.getRow(1);
      headerRow.font = { name: 'Arial', bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
      headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF003320' } }; // Eva Clinic deep emerald green
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
        row.font = { size: 11, name: 'Arial', color: { argb: 'FF003320' } };
        row.getCell(4).font = { bold: true, color: { argb: 'FFD4AF37' } }; // Gold accent
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
      titleRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD4AF37' } }; // Gold
      titleRow.alignment = { horizontal: 'center', vertical: 'middle' };
      titleRow.height = 30;

      const sumQuery = tasks.map((_, i) => `D${i + 2}`).join('+');

      const wRow = sheet.addRow(['Weekly Hours Lost', '', '', { formula: `ROUND(${sumQuery}, 1)` }]);
      const mRow = sheet.addRow(['Monthly Hours Lost', '', '', { formula: `ROUND(D${sumStart + 1}*4.33, 1)` }]);
      const aRow = sheet.addRow(['Annual Hours Lost', '', '', { formula: `ROUND(D${sumStart + 1}*52, 1)` }]);
      const rateRow = sheet.addRow(['Blended Hourly Staff Rate (£)', '', '', hourlyRate]);

      rateRow.getCell(4).numFmt = '£#,##0.00';
      rateRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF7FAF8' } };

      const costRow = sheet.addRow(['Annual Cost of Routine Admin', '', '', { formula: `ROUND(D${sumStart + 3}*D${sumStart + 4}, 0)` }]);
      costRow.font = { bold: true, color: { argb: 'FF003320' }, size: 14 };
      costRow.getCell(4).numFmt = '£#,##0';
      costRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFACE0D' } }; // Signature yellow callout
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
      sheet.addRow(['Prepared for: Eva Clinic · Quinton, Birmingham']);
      sheet.addRow([`Exported: ${new Date().toLocaleDateString('en-GB')}`]);
      sheet.addRow(['Generated natively via gabrieldalmoro.com metrics platform']);

      sheet.getRow(sheet.rowCount - 2).font = { italic: true, color: { argb: 'FF888888' } };
      sheet.getRow(sheet.rowCount - 1).font = { italic: true, color: { argb: 'FF888888' } };
      sheet.getRow(sheet.rowCount).font = { italic: true, color: { argb: 'FFBBBBBB' }, size: 10 };

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `Eva-Clinic-Practice-Audit-${new Date().toISOString().split('T')[0]}.xlsx`);

    } catch (e) {
      console.error('Core Export Engine failure:', e);
      alert('Export mechanism loading, please execute again in one moment.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F4] text-[#11231A] font-sans selection:bg-[#FACE0D] selection:text-[#003320]">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        .font-eva-serif { font-family: 'Playfair Display', Georgia, serif; }
        .font-eva-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}} />

      {/* Header */}
      <header className="border-b border-[#003320]/10 py-4 px-6 sticky top-0 z-[100] bg-[#F4F7F4]/95 backdrop-blur-md shadow-sm transition-all">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3">
              <img
                src="/demo/eva-logo.png"
                alt="Eva Clinic"
                className="h-10 sm:h-12 w-auto object-contain shrink-0 drop-shadow-sm"
              />
              <div className="flex flex-col">
                <span className="font-eva-serif text-lg font-bold tracking-wider text-[#003320] leading-tight">EVA CLINIC</span>
                <span className="text-[10px] tracking-widest text-[#987827] uppercase font-semibold">Birmingham</span>
              </div>
            </div>
            <X className="w-3.5 h-3.5 text-[#003320]/30 shrink-0" strokeWidth={2.5} />
            <div className="flex items-center gap-3">
              <img src="/favicon.png" alt="Gabriel Dalmoro" className="h-9 sm:h-11 w-auto rounded object-contain shrink-0" />
              <span className="font-eva-serif text-lg tracking-wide hidden sm:block text-[#003320] leading-none">Gabriel Dalmoro</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://gabrieldalmoro.com/en/clinic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#003320]/75 hover:text-[#003320] transition-colors hover:underline underline-offset-4 hidden sm:block"
            >
              Visit Main Site
            </a>
            <div className="text-xs font-semibold tracking-widest uppercase border border-[#D4AF37]/50 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#8E7020]">
              Practice Automation Demo
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#002617] via-[#003320] to-[#001c12] text-[#F4F7F4] pt-20 pb-24 px-6 border-b border-[#D4AF37]/20">
          {/* Ambient Glow Lights */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D4AF37]/15 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute top-1/3 -left-32 w-80 h-80 bg-[#16583A]/30 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 -right-32 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

          <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
            {/* Top Status & Location Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-[#D4AF37]/30 backdrop-blur-md text-xs font-semibold tracking-wider text-[#E5C158] uppercase mb-8 shadow-lg shadow-black/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5C158] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E5C158]"></span>
              </span>
              <span>Eva Clinic · Quinton, Birmingham · Launching October 2026</span>
            </div>

            {/* Main Headline with Gold Gradient Shimmer */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight font-eva-serif drop-shadow-lg leading-[1.12]">
              Intelligent Practice Automation for{' '}
              <span className="bg-gradient-to-r from-[#E5C158] via-[#FFF3D1] to-[#D4AF37] bg-clip-text text-transparent italic">
                Private Dentistry & Medical Care
              </span>
            </h1>

            <p className="text-lg sm:text-xl font-light text-[#F4F7F4]/85 mb-10 max-w-3xl leading-relaxed font-eva-sans">
              Built exclusively for Eva Clinic's clinical launch. While your GDC & GMC specialists deliver considered, unhurried consultations, bespoke automation runs your 7-day intake, CBCT/implant prep, and patient retention.
            </p>

            {/* Practice Highlights Visual Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full max-w-3xl mb-10">
              <div className="bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-[#D4AF37]/40 rounded-2xl p-4 text-left backdrop-blur-sm shadow-md">
                <div className="flex items-center gap-2 text-[#E5C158] text-xs font-bold uppercase tracking-wider mb-1.5">
                  <CalendarCheck className="w-4 h-4 text-[#E5C158]" /> 7 Days a Week
                </div>
                <div className="text-white font-eva-serif font-bold text-lg">09:00 – 19:00</div>
                <p className="text-white/60 text-xs mt-1">Autonomous booking & instant confirmation</p>
              </div>

              <div className="bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-[#D4AF37]/40 rounded-2xl p-4 text-left backdrop-blur-sm shadow-md">
                <div className="flex items-center gap-2 text-[#E5C158] text-xs font-bold uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-4 h-4 text-[#E5C158]" /> 5 Languages
                </div>
                <div className="text-white font-eva-serif font-bold text-lg">Smart Triage</div>
                <p className="text-white/60 text-xs mt-1">EN, RO, RU, PT & ES automated routing</p>
              </div>

              <div className="bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-[#D4AF37]/40 rounded-2xl p-4 text-left backdrop-blur-sm shadow-md">
                <div className="flex items-center gap-2 text-[#FACE0D] text-xs font-bold uppercase tracking-wider mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#FACE0D]" /> Clinical Care
                </div>
                <div className="text-white font-eva-serif font-bold text-lg">GDC / GMC Ready</div>
                <p className="text-white/60 text-xs mt-1">CBCT, implant & medical history protocols</p>
              </div>
            </div>

            {/* Platform Integration Badge */}
            <div className="inline-flex flex-wrap items-center justify-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium tracking-wide text-white/80 backdrop-blur-sm">
              <span className="text-[#FACE0D] flex items-center gap-1.5 font-semibold">
                <Settings className="w-3.5 h-3.5 animate-spin-slow duration-[8000ms]" /> Native Integration:
              </span>
              <span>Dentally</span>
              <span className="text-white/30">•</span>
              <span>Software of Excellence (EXACT)</span>
              <span className="text-white/30">•</span>
              <span>WhatsApp Business API</span>
              <span className="text-white/30">•</span>
              <span>Online Portals</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: Wasted Hours Calculator */}
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#003320]/5 text-[#8E7020] text-xs font-bold uppercase tracking-widest mb-3">
              <ShieldCheck className="w-3.5 h-3.5" /> Practice Efficiency Audit
            </div>
            <h2 className="text-3xl sm:text-4xl font-eva-serif text-[#003320] mb-4">Where Is Clinical & Front-Desk Time Lost?</h2>
            <p className="text-base sm:text-lg text-[#003320]/70 font-light max-w-2xl mx-auto">
              Adjust the numbers below to match Eva Clinic's projected operational volume across your 7-day schedule. See exactly how many hours your team can reclaim.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-[#003320]/10 overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap text-[#003320]">
                <thead>
                  <tr className="bg-[#003320]/5 text-[#003320]/80 border-b border-[#003320]/10 uppercase text-[11px] tracking-wider font-semibold">
                    <th className="py-5 px-6 font-semibold w-full">Eva Clinic Operational Task</th>
                    <th className="py-5 px-6 font-semibold text-center w-32 border-l border-[#003320]/10">Times per Week</th>
                    <th className="py-5 px-6 font-semibold text-center w-32 border-l border-[#003320]/10">Mins per Task</th>
                    <th className="py-5 px-6 font-semibold text-right w-32 border-l border-[#003320]/10 text-white bg-[#003320]">Weekly Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#003320]/5 font-eva-sans">
                  {tasks.map((t) => {
                    const rowHours = (t.timesPerWeek * t.minutesPerTask / 60).toFixed(1);
                    return (
                      <tr key={t.id} className="hover:bg-[#F4F7F4] transition-colors group">
                        <td className="py-4 px-6 font-medium text-[15px] text-[#003320]">{t.name}</td>
                        <td className="py-4 px-6 text-center border-l border-[#003320]/10">
                          <input
                            type="number"
                            min="0"
                            value={t.timesPerWeek}
                            onChange={(e) => updateTask(t.id, 'timesPerWeek', e.target.value)}
                            className="w-16 bg-[#F4F7F4] border border-[#003320]/20 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none py-1.5 px-2 text-center rounded tabular-nums font-bold text-[14px] transition-all text-[#003320]"
                          />
                        </td>
                        <td className="py-4 px-6 text-center border-l border-[#003320]/10">
                          <input
                            type="number"
                            min="0"
                            value={t.minutesPerTask}
                            onChange={(e) => updateTask(t.id, 'minutesPerTask', e.target.value)}
                            className="w-16 bg-[#F4F7F4] border border-[#003320]/20 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none py-1.5 px-2 text-center rounded tabular-nums font-bold text-[14px] transition-all text-[#003320]"
                          />
                        </td>
                        <td className="py-4 px-6 text-right font-bold text-[#8E7020] font-eva-serif text-xl border-l border-[#003320]/5 bg-[#003320]/[0.02]">
                          {rowHours} <span className="text-xs font-sans text-[#003320]/40 font-semibold uppercase">hrs</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Results Section */}
            <div className="bg-[#003320] text-white p-8 md:p-12 border-t-4 border-[#D4AF37] relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10 w-72 h-72 -translate-y-1/2 translate-x-1/4 rounded-full bg-[#D4AF37] blur-3xl"></div>

              <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white/10 p-6 rounded-2xl border border-white/10 text-center backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-widest text-[#E5C158] font-bold mb-2">Weekly Hours</p>
                    <p className="text-4xl font-eva-serif font-bold text-white">{weeklyHours}</p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-2xl border border-white/10 text-center backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-widest text-[#E5C158] font-bold mb-2">Monthly Hours</p>
                    <p className="text-4xl font-eva-serif font-bold text-white">{monthlyHours}</p>
                  </div>
                  <div className="bg-[#FACE0D] p-6 rounded-2xl border border-[#FACE0D] text-center shadow-lg transform md:-translate-y-2">
                    <p className="text-xs uppercase tracking-widest text-[#003320]/80 font-bold mb-2">Annual Hours</p>
                    <p className="text-5xl font-eva-serif font-bold text-[#003320]">{annualHours}</p>
                  </div>
                </div>

                <div className="md:col-span-4 pl-0 md:pl-8 border-t md:border-t-0 md:border-l border-white/20 pt-8 md:pt-0 pb-2">
                  <label className="text-xs uppercase tracking-widest text-white/80 font-bold block mb-3">Blended Hourly Staff Rate</label>
                  <div className="flex items-center gap-3 mb-6 focus-within:text-[#FACE0D] transition-colors">
                    <span className="text-3xl font-bold font-eva-serif text-[#E5C158]">£</span>
                    <input
                      type="number"
                      className="text-3xl font-bold font-eva-serif text-white w-28 bg-transparent border-b-2 border-white/30 focus:border-[#FACE0D] outline-none pb-1 placeholder-white/30 transition-colors"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(parseInt(e.target.value) || 0)}
                      placeholder="110"
                    />
                  </div>
                  <p className="text-sm font-medium text-white/90 leading-snug">
                    That is <span className="text-2xl font-eva-serif font-bold text-[#FACE0D]">£{annualCost}</span> every year spent on repetitive admin that runs automatically with bespoke clinical workflows.
                  </p>
                </div>
              </div>
            </div>

            {/* Export Button */}
            <div className="bg-white p-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-[#003320]/60 italic font-eva-serif">Calculations compute instantly in real time. No patient or practice data is stored.</p>
              <button
                onClick={() => generateExport()}
                className="w-full sm:w-auto justify-center flex items-center gap-3 px-8 py-4 bg-[#FACE0D] text-[#003320] hover:bg-[#eab308] border border-[#dca204] rounded-xl font-bold text-[15px] tracking-wide shadow-sm hover:-translate-y-0.5 transition-all"
              >
                <Download className="w-5 h-5 text-[#003320] opacity-90" /> Save Time Audit to Excel
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: What Could Be Automated */}
        <div className="bg-[#003320] py-24 px-6 text-[#F4F7F4] relative overflow-hidden">
          <div className="max-w-5xl mx-auto relative z-10">
            <p className="text-xs uppercase tracking-widest text-[#E5C158] font-bold text-center mb-3">Clinical Workflow Engine</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-eva-serif text-center mb-16 text-white">
              What Could Be Automated at Eva Clinic
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mb-6">
                    <CalendarCheck className="w-6 h-6 text-[#E5C158]" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 font-eva-serif text-white">1. Patient Inquiry & Multi-Language Triage</h3>
                  <p className="opacity-80 text-sm leading-relaxed font-light">
                    When a patient reaches out via WhatsApp or the booking portal, an intelligent triage flow identifies their language (English, Romanian, Russian, Portuguese, or Spanish), treatment interest, and urgency — routing them to the right clinician and scheduling their consultation instantly.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 text-xs text-[#E5C158] font-semibold tracking-wider uppercase">
                  Zero Delay · Multi-Language
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col justify-between relative">
                <ArrowRight className="w-6 h-6 text-[#E5C158] absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block opacity-60" />
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#FACE0D]/20 flex items-center justify-center mb-6">
                    <FileText className="w-6 h-6 text-[#FACE0D]" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 font-eva-serif text-white">2. Medical History & Prep Packs</h3>
                  <p className="opacity-80 text-sm leading-relaxed font-light">
                    Digital medical history declarations, consent forms, and treatment-specific prep (e.g. 3D CBCT imaging protocols, sedation advice, implant checklists) are sent and automatically chased beforehand. Patients arrive fully prepared with complete clinical files.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 text-xs text-[#FACE0D] font-semibold tracking-wider uppercase">
                  Automated Chasing · GDC Compliant
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                    <BellRing className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 font-eva-serif text-white">3. Post-Op Care & Recall Retention</h3>
                  <p className="opacity-80 text-sm leading-relaxed font-light">
                    Following surgery, root canals, or cosmetic bonding, automated aftercare guidelines and recovery check-ins dispatch on day 1 and day 3. At 6 months, smart hygiene and check-up recall reminders activate, maintaining full chair occupancy year-round.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/70 font-semibold tracking-wider uppercase">
                  Patient Retention · High Satisfaction
                </div>
              </div>
            </div>

            <div className="text-center mt-12 bg-white/5 border border-white/10 py-6 px-6 rounded-2xl max-w-3xl mx-auto">
              <p className="font-eva-serif italic text-lg opacity-90">
                Every step above runs completely automatically in the background. <br className="hidden md:block" />
                <span className="text-[#E5C158] font-semibold not-italic">No manual chasing. No missed follow-ups. No front-desk bottleneck.</span>
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: PMS & Dental Infrastructure */}
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="mb-8 flex justify-center items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-[#003320]/10 flex items-center justify-center border border-[#003320]/15">
              <Stethoscope className="w-7 h-7 text-[#003320]" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-eva-serif text-[#003320] mb-6">
            Engineered Around Your Dental & Medical Workflow
          </h2>
          <p className="text-base sm:text-lg text-[#003320]/75 font-light max-w-3xl mx-auto leading-relaxed mb-4">
            Whether your surgery runs on <strong className="font-semibold text-[#003320]">Dentally, Software of Excellence (EXACT), Carestream R4</strong> or web/WhatsApp booking pipelines, custom automation layers over your existing tools.
          </p>
          <p className="text-sm text-[#003320]/60 font-light max-w-2xl mx-auto mb-12 italic">
            Connecting patient records, automated consent chasing, pre-procedure guidance, and recall workflows — without disrupting your clinicians or requiring your staff to learn complicated new software.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
            <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white border border-[#003320]/10 shadow-sm font-semibold text-sm text-[#003320]">
              <Zap className="w-4 h-4 text-[#8E7020] shrink-0" /> WhatsApp & SMS Reminders
            </div>
            <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white border border-[#003320]/10 shadow-sm font-semibold text-sm text-[#003320]">
              <Zap className="w-4 h-4 text-[#8E7020] shrink-0" /> Medical History Auto-Chasing
            </div>
            <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white border border-[#003320]/10 shadow-sm font-semibold text-sm text-[#003320]">
              <Zap className="w-4 h-4 text-[#8E7020] shrink-0" /> 3D CBCT & Implant Prep Packs
            </div>
            <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white border border-[#003320]/10 shadow-sm font-semibold text-sm text-[#003320]">
              <Zap className="w-4 h-4 text-[#8E7020] shrink-0" /> Post-Op Recovery Check-ins
            </div>
            <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white border border-[#003320]/10 shadow-sm font-semibold text-sm text-[#003320]">
              <Zap className="w-4 h-4 text-[#8E7020] shrink-0" /> 6-Month Hygiene Recalls
            </div>
            <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white border border-[#003320]/10 shadow-sm font-semibold text-sm text-[#003320]">
              <Zap className="w-4 h-4 text-[#8E7020] shrink-0" /> Multi-Language Patient Routing
            </div>
          </div>
        </div>

        {/* SECTION 4: CTA */}
        <div className="bg-[#003320] text-white py-24 px-6 border-t-8 border-[#D4AF37]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-eva-serif mb-6 tracking-tight">Ready to Reclaim Those Clinical Hours?</h2>
            <p className="text-xl font-light text-[#E5C158] mb-10 leading-relaxed font-eva-serif italic">
              Let us discuss what a bespoke automation architecture would look like for Eva Clinic ahead of your opening.
            </p>
            <a
              href="https://calendly.com/ghdalmoro/30-minute"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FACE0D] text-[#003320] hover:bg-white hover:text-[#003320] font-bold tracking-wider uppercase text-[15px] px-10 py-5 rounded-xl transition-all shadow-xl hover:-translate-y-1 w-full sm:w-auto justify-center"
            >
              Book a 30-Minute Alignment Call <ExternalLink className="w-5 h-5 ml-2" />
            </a>
            <p className="mt-8 text-sm opacity-60">
              No pressure. No sales pitch. Just a clear, clinical conversation about what is technically possible.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-[#003320]/10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-5 text-center">
          <div className="flex items-center gap-4">
            <img
              src="/demo/eva-logo.png"
              alt="Eva Clinic"
              className="h-8 w-auto object-contain opacity-60 grayscale"
            />
            <X className="w-3 h-3 text-[#003320]/30 shrink-0" strokeWidth={3} />
            <img src="/favicon.png" alt="Gabriel Dalmoro" className="h-8 w-auto rounded-sm opacity-60 grayscale filter mix-blend-multiply" />
          </div>
          <div className="flex flex-col gap-2 items-center mt-3">
            <p className="text-[#003320]/80 font-eva-serif font-semibold tracking-wide text-lg">Gabriel Dalmoro</p>
            <p className="text-[#003320]/50 text-xs tracking-wider uppercase font-semibold">
              Less admin. More clinical impact.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="mailto:gabriel@gabrieldalmoro.com" className="text-[#8E7020] hover:text-[#003320] text-sm font-semibold transition-colors">
                gabriel@gabrieldalmoro.com
              </a>
              <span className="text-[#003320]/20">|</span>
              <a href="https://gabrieldalmoro.com/en/clinic" target="_blank" rel="noopener noreferrer" className="text-[#8E7020] hover:text-[#003320] text-sm font-semibold transition-colors">
                Visit Main Site
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
