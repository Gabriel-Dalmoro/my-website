'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, ChevronRight, Check, X, CheckCircle2, FileOutput, Settings, Box, Wine, Euro, Calendar, Sparkles, ArrowRight, Minus, Plus, ExternalLink, Loader2 } from 'lucide-react';
import Image from 'next/image';

type ExtractStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

interface RefRow {
  appellation: string;
  domaine: string;
  millesime: string;
  type: string;
  quantite: number;
  unite: string;
  prix_ht: number;
}

export default function WyWDemoPage() {
  const [status, setStatus] = useState<ExtractStatus>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [data, setData] = useState<{ agent: string; references: RefRow[] } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [toastMsg, setToastMsg] = useState('');
  
  // Pain Quantifier States
  const [devisParMois, setDevisParMois] = useState<number>(8);
  const [tauxHoraire, setTauxHoraire] = useState<number>(35);

  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Soft expiry check
    if (new Date() > new Date('2026-04-18T23:59:59')) {
      setIsExpired(true);
    }
  }, []);

  const addLog = (msg: string) => {
    setLogMessages((prev) => [...prev, msg]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const f = e.dataTransfer.files[0];
      if (f.type === 'application/pdf') {
        setFile(f);
      } else {
        setErrorMsg('Veuillez sélectionner un document PDF valide.');
      }
    }
  };

  const processFile = async () => {
    if (!file) return;
    setStatus('processing');
    setLogMessages([]);
    setErrorMsg('');
    addLog("Connexion sécurisée au moteur d'extraction...");
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      addLog('Envoi du document en cours...');

      const response = await fetch('/api/wyw', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Impossible d'analyser le document.");
      }

      addLog('Extraction des références du devis...');
      const result = await response.json();
      
      if (!result.references || result.references.length === 0) {
        throw new Error("Aucune référence n'a pu être extraite automatiquement de ce document.");
      }

      addLog(`Trouvé ${result.references.length} références uniques.`);
      addLog('Nettoyage et structuration des données...');
      
      setData({
        agent: result.agent || 'Fournisseur Inconnu',
        references: result.references.map((r: any) => ({
          appellation: r.appellation || '',
          domaine: r.domaine || '',
          millesime: r.millesime || '',
          type: r.type || '',
          quantite: r.quantite || 1,
          unite: r.unite || 'btl',
          prix_ht: r.prix_ht || 0,
        }))
      });
      
      setStatus('success');
    } catch (err: any) {
      setErrorMsg(err.message || "Une erreur inattendue s'est produite.");
      setStatus('error');
    }
  };

  const updateField = (index: number, field: keyof RefRow, value: string | number) => {
    if (!data) return;
    const newRefs = [...data.references];
    newRefs[index] = { ...newRefs[index], [field]: value };
    setData({ ...data, references: newRefs });
  };

  const handleExport = async () => {
    if (!data) return;
    const headers = ['Appellation', 'Domaine', 'Millésime', 'Type', 'Quantité', 'Unité', 'Prix HT (€)'];
    
    // Tab Separated Values (Fallback)
    const rows = data.references.map((r) => [
      r.appellation, r.domaine, r.millesime, r.type, r.quantite, r.unite, r.prix_ht
    ]);
    const tsv = [headers, ...rows]
      .map(row => row.map(c => String(c || '').replace(/\\t/g, ' ')).join('\\t'))
      .join('\\n');
    
    // HTML Table logic for strictly formatted Sheets columns
    const htmlTable = `
      <table border="1">
        <thead>
          <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    `;

    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const htmlBlob = new Blob([htmlTable], { type: 'text/html' });
        const textBlob = new Blob([tsv], { type: 'text/plain' });
        const clipboardItem = new ClipboardItem({
          'text/html': htmlBlob,
          'text/plain': textBlob
        });
        await navigator.clipboard.write([clipboardItem]);
      } else {
        await navigator.clipboard.writeText(tsv);
      }
      
      setToastMsg('Données copiées ! Collez simplement (Cmd+V / Ctrl+V) dans la nouvelle feuille.');
      setTimeout(() => setToastMsg(''), 8000);
      window.open('https://sheets.new', '_blank');
    } catch (err) {
      console.error('Clipboard failed', err);
      try {
        await navigator.clipboard.writeText(tsv);
      } catch (e) {
        alert("Le presse-papier n'est pas disponible.");
      }
    }
  };

  const isStepActive = (stepNum: 1 | 2 | 3) => {
    if (stepNum === 1) return status === 'idle' || status === 'error';
    if (stepNum === 2) return status === 'uploading' || status === 'processing';
    if (stepNum === 3) return status === 'success';
    return false;
  };

  const isStepPast = (stepNum: 1 | 2 | 3) => {
    if (stepNum === 1) return status !== 'idle' && status !== 'error';
    if (stepNum === 2) return status === 'success';
    return false;
  };

  const formatTime = (totalMinutes: number) => {
    if (totalMinutes < 60) return `${Math.round(totalMinutes)} min`;
    const hours = Math.floor(totalMinutes / 60);
    const mins = Math.round(totalMinutes % 60);
    if (mins === 0) return `${hours} h`;
    return `${hours} h ${mins} min`;
  };

  if (isExpired) {
    return (
      <div className="min-h-screen bg-[#453B36] text-[#CBBEAA] font-sans selection:bg-[#FACE0D] selection:text-[#453B36] flex flex-col justify-between">
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
          .font-serif-brand { font-family: 'Cormorant Garamond', serif; }
        `}} />
        <header className="py-8 px-6 border-b border-[#CBBEAA]/10">
          <div className="max-w-6xl mx-auto flex items-center justify-center gap-6">
            <img src="/demo/logo-wine-you-want.svg" className="h-10 sm:h-12 w-auto object-contain brightness-0 invert opacity-80" alt="Wine You Want" />
            <X className="w-4 h-4 text-[#CBBEAA]/30" strokeWidth={3} />
            <img src="/favicon.png" className="h-10 sm:h-12 w-auto rounded object-contain opacity-90" alt="Gabriel Dalmoro Company Logo" />
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-xl md:text-2xl font-serif-brand font-light mb-8 max-w-xl mx-auto text-[#F5F0E8]">
            Cette démonstration n'est plus disponible en ligne.
          </p>
          <div className="text-base text-[#CBBEAA]/80 font-serif-brand italic flex flex-col items-center gap-1">
            <span>Pour en savoir plus sur ce projet, contactez Gabriel Dalmoro.</span>
            <a href="mailto:gabriel@gabrieldalmoro.com" className="text-[#FACE0D] hover:underline hover:text-white transition-colors mt-2 not-italic tracking-wider text-sm font-sans font-semibold">gabriel@gabrieldalmoro.com</a>
          </div>
        </main>
      </div>
    );
  }

  // Calculations for Pain Quantifier
  const numReferences = data?.references.length || 0;
  const timePerLine = 3.5;
  const timeForDevisMins = numReferences * timePerLine;
  const monthlyTimeLostHours = (timeForDevisMins * devisParMois) / 60;
  const annualTimeLostHours = monthlyTimeLostHours * 12;
  const annualCostEuros = annualTimeLostHours * tauxHoraire;

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#453B36] font-sans selection:bg-[#FACE0D] selection:text-[#453B36] flex flex-col">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
        .font-serif-brand { font-family: 'Cormorant Garamond', serif; }
      `}} />
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-28 left-1/2 -translate-x-1/2 bg-[#FACE0D] text-[#453B36] px-6 py-4 rounded-xl shadow-2xl z-[999] flex items-center gap-3 font-medium animate-in fade-in slide-in-from-top-4 duration-300 max-w-lg w-full border border-[#453B36]/10">
          <CheckCircle2 className="w-6 h-6 shrink-0" />
          <p className="text-sm leading-snug font-semibold">{toastMsg}</p>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-[#453B36]/10 py-5 px-6 sticky top-0 z-[100] bg-[#FBF9F5]/95 backdrop-blur-md shadow-sm transition-all">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img 
              src="/demo/logo-wine-you-want.svg" 
              alt="Wine You Want" 
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <X className="w-3 h-3 text-[#453B36]/30 shrink-0" strokeWidth={3} />
            <div className="flex items-center gap-3">
              <img 
                src="/favicon.png" 
                alt="Gabriel Dalmoro Company Logo" 
                className="h-10 sm:h-12 w-auto rounded object-contain shrink-0"
              />
              <span className="font-serif-brand text-2xl tracking-wide hidden sm:block text-[#453B36] font-medium leading-none mt-1">Gabriel Dalmoro</span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <a href="/fr/chef" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold tracking-widest uppercase hover:text-[#c4952a] transition-colors text-[#453B36]/60 underline decoration-[#CBBEAA] underline-offset-4">
              Visiter le site principal
            </a>
            <div className="text-xs font-semibold tracking-widest uppercase border border-[#CBBEAA]/50 px-4 py-2 rounded-full bg-[#CBBEAA]/10 text-[#453B36]">
              Projet Pilote DEMO
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-[#FFFFFF]">
        {/* Dynamic Image Hero Header */}
        <div className="relative w-full overflow-hidden bg-white">
          <div 
            className="w-full h-[50vh] min-h-[400px] bg-cover bg-center"
            style={{ backgroundImage: `url('/demo/bg-perso-x2.webp')` }}
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center text-[#453B36] top-10">
            <h1 className="text-5xl md:text-7xl mb-4 tracking-tight max-w-4xl leading-tight font-serif-brand font-bold drop-shadow-sm uppercase">
              Projet Pilote DEMO
            </h1>
            <p className="text-xl md:text-3xl font-light max-w-2xl text-[#c4952a] mt-2 font-serif-brand italic">
              Moins d’admin. Plus d’impact.
            </p>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="max-w-3xl mx-auto px-6 mt-12 mb-8 relative z-30">
          <div className="flex items-center justify-between gap-4">
            {/* Step 1 */}
            <div className={`text-center w-full transition-all duration-500 ${isStepActive(1) ? 'opacity-100 scale-105' : 'opacity-60'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto text-sm font-bold mb-3 transition-colors duration-500 ${isStepPast(1) || isStepActive(1) ? 'bg-[#c4952a] text-white shadow-md' : 'border border-[#CBBEAA] text-[#453B36]/50 bg-white'}`}>
                {isStepPast(1) ? <Check className="w-5 h-5 text-white" /> : '1'}
              </div>
              <p className={`text-xs uppercase font-bold tracking-wide ${isStepActive(1) ? 'text-[#c4952a]' : 'text-[#453B36]'}`}>PDF Extrait</p>
              <p className={`text-[10px] uppercase tracking-wide mt-1 ${isStepActive(1) ? 'text-[#c4952a]/80' : 'text-[#453B36]/50'}`}>L'IA (Ici)</p>
            </div>
            
            <ArrowRight className={`w-6 h-6 shrink-0 transition-opacity duration-500 ${isStepPast(1) ? 'text-[#c4952a]' : 'text-[#CBBEAA]'}`} />
            
            {/* Step 2 */}
            <div className={`text-center w-full transition-all duration-500 ${isStepActive(2) ? 'opacity-100 scale-105' : 'opacity-60'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto text-sm font-bold mb-3 transition-colors duration-500 ${isStepPast(2) || isStepActive(2) ? 'bg-[#c4952a] text-white shadow-md' : 'border border-[#CBBEAA] text-[#453B36]/50 bg-white'}`}>
                {isStepPast(2) ? <Check className="w-5 h-5 text-white" /> : '2'}
              </div>
              <p className={`text-xs uppercase font-bold tracking-wide ${isStepActive(2) ? 'text-[#c4952a]' : 'text-[#453B36]'}`}>Calcul</p>
              <p className={`text-[10px] uppercase tracking-wide mt-1 ${isStepActive(2) ? 'text-[#c4952a]/80' : 'text-[#453B36]/50'}`}>Vos formules</p>
            </div>
            
            <ArrowRight className={`w-6 h-6 shrink-0 transition-opacity duration-500 ${isStepPast(2) ? 'text-[#c4952a]' : 'text-[#CBBEAA]'}`} />
            
            {/* Step 3 */}
            <div className={`text-center w-full transition-all duration-500 ${isStepActive(3) ? 'opacity-100 scale-105' : 'opacity-60'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto text-sm font-bold mb-3 transition-colors duration-500 ${isStepActive(3) ? 'bg-[#c4952a] text-white shadow-md' : 'border border-[#CBBEAA] text-[#453B36]/50 bg-white'}`}>
                3
              </div>
              <p className={`text-xs uppercase font-bold tracking-wide ${isStepActive(3) ? 'text-[#c4952a]' : 'text-[#453B36]'}`}>Résultat</p>
              <p className={`text-[10px] uppercase tracking-wide mt-1 ${isStepActive(3) ? 'text-[#c4952a]/80' : 'text-[#453B36]/50'}`}>Tableau Final</p>
            </div>
          </div>
        </div>

        {/* Action Container */}
        <div className="max-w-6xl mx-auto px-6 pb-12 relative z-30 bg-[#FFFFFF]">
          
          {status === 'idle' || status === 'error' ? (
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-[#453B36]/10 animate-in fade-in flex flex-col justify-center max-w-4xl mx-auto">
              <div>
                <h2 className="text-3xl font-serif-brand mb-4 flex items-center gap-3 text-[#453B36]">
                  <span className="bg-[#453B36] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans">1</span>
                  Importer le devis PDF
                </h2>
                <p className="opacity-80 mb-8 max-w-xl text-[#453B36]/80 text-lg">
                  Déposez n'importe quel devis ou catalogue de fournisseur. L'IA scannera et structurera automatiquement les variables requises.
                </p>

                <div 
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed ${file ? 'border-[#4A7A4A] bg-[#4A7A4A]/5' : 'border-[#453B36]/20 hover:border-[#c4952a] hover:bg-[#c4952a]/5'} rounded-xl p-10 text-center transition-all cursor-pointer bg-[#F5F0E8]/30`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {file ? (
                    <div className="flex flex-col items-center gap-4">
                      <div className="bg-[#4A7A4A]/20 p-4 rounded-full text-[#4A7A4A]">
                        <Check className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{file.name}</p>
                        <p className="text-sm opacity-60">{(file.size / 1024 / 1024).toFixed(2)} Mo</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <div className="bg-[#453B36]/5 p-4 rounded-full text-[#453B36]/50">
                        <Upload className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">Sélectionnez ou glissez un fichier</p>
                        <p className="text-sm opacity-60 mt-1">Accepte tous types de devis (jusqu'à 50 Mo)</p>
                      </div>
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" onChange={(e) => {
                    if (e.target.files?.[0]) setFile(e.target.files[0]);
                  }} />
                </div>

                {errorMsg && (
                  <div className="mt-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm mb-4">
                    <strong>Erreur :</strong> {errorMsg}
                  </div>
                )}

                <div className="mt-8 flex justify-end">
                  <button 
                    onClick={processFile}
                    disabled={!file}
                    className={`flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-md ${!file ? 'bg-[#453B36]/10 text-[#453B36]/40 cursor-not-allowed' : 'bg-[#453B36] text-white hover:bg-[#c4952a] hover:text-white hover:-translate-y-1'}`}
                  >
                    Lancer l'extraction <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : status === 'processing' ? (
            <div className="bg-white rounded-2xl p-16 shadow-xl border border-[#453B36]/10 text-center mx-auto w-full max-w-2xl animate-in zoom-in-95 duration-500">
              <div className="relative inline-flex mb-8 align-middle w-28 h-28 items-center justify-center">
                {/* Outer rotating dashed ring */}
                <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-[#c4952a]/40 animate-[spin_4s_linear_infinite]"></div>
                <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-[#c4952a] animate-spin"></div>
                {/* Inner bouncing Sparkles */}
                <div className="p-5 rounded-full bg-[#c4952a]/10 shadow-inner">
                  <Sparkles className="w-10 h-10 animate-pulse text-[#c4952a]" />
                </div>
              </div>
              <h2 className="text-4xl font-serif-brand font-light mb-4 text-[#453B36]">La logique de Gabriel explore la cave...</h2>
              <p className="text-lg text-[#453B36]/80 mb-10 font-serif-brand italic">...pour simplifier la vie de Sabrina.</p>
              
              <div className="bg-[#F5F0E8] text-[#453B36] text-left p-8 rounded-xl font-mono text-sm max-h-56 overflow-y-auto space-y-3 shadow-inner border border-[#CBBEAA]/40">
                {logMessages.map((log, i) => (
                  <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-300 flex items-start gap-3">
                    <span className="text-[#c4952a] font-bold opacity-80 shrink-0">›</span>
                    <span>{log}</span>
                  </div>
                ))}
                <div className="flex items-center gap-3 pt-2 opacity-60">
                  <Loader2 className="w-4 h-4 animate-spin text-[#c4952a] shrink-0" />
                  <span className="animate-pulse">Analyse de la structure complexe par l'IA...</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 w-full mb-12">
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-[#453B36]/10">
                
                {/* Success Heading */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                  <div>
                    <h2 className="text-4xl font-serif-brand font-light text-[#453B36] mb-3 flex items-center gap-3">
                      <CheckCircle2 className="w-8 h-8 text-[#4A7A4A]" />
                      Données Structurées
                    </h2>
                    <p className="text-[#453B36]/70 text-lg font-serif-brand">Fournisseur analysé : <strong className="text-[#453B36] font-semibold">{data?.agent}</strong> ({numReferences} références trouvées)</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-4">
                      <button onClick={() => { setFile(null); setStatus('idle'); setData(null); }} className="px-6 py-3 border border-[#453B36]/20 bg-white hover:bg-[#F5F0E8] rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm">
                        Recommencer
                      </button>
                      <button onClick={handleExport} className="px-8 py-3 bg-[#453B36] text-white hover:bg-[#4A7A4A] hover:text-white font-semibold rounded-lg flex items-center gap-2 shadow-lg hover:-translate-y-1 transition-all">
                        <FileOutput className="w-5 h-5" /> Copier & Ouvrir Sheets
                      </button>
                    </div>
                    <p className="text-[11px] text-[#453B36]/60 text-right pr-2">
                      Collez simplement (Cmd+V) une fois la feuille ouverte.
                    </p>
                  </div>
                </div>

                {/* Editable Table */}
                <div className="rounded-xl overflow-hidden border border-[#CBBEAA]/80 bg-white mb-10">
                  <div className="p-4 bg-[#F5F0E8] border-b border-[#CBBEAA]/80 flex items-center gap-4">
                    <div className="bg-[#c4952a] w-3 h-3 rounded-full animate-pulse shadow-sm"></div>
                    <p className="text-[#453B36] font-medium tracking-wide text-sm uppercase">Validateur Quantitatif — Corrigez simplement un champ pour l'enregistrer.</p>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap text-[#453B36]">
                      <thead>
                        <tr className="bg-[#F5F0E8]/50 text-[#453B36]/70 border-b border-[#CBBEAA]/40 uppercase text-[10px] tracking-wider font-semibold">
                          <th className="py-5 px-6 font-semibold">Appellation / Cuvée</th>
                          <th className="py-5 px-6 font-semibold">Domaine</th>
                          <th className="py-5 px-6 font-semibold">Millésime</th>
                          <th className="py-5 px-6 font-semibold">Type</th>
                          <th className="py-5 px-6 font-semibold text-right">Qté</th>
                          <th className="py-5 px-6 font-semibold text-right">Prix Unitaire</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#CBBEAA]/30">
                        {data?.references.map((r, i) => (
                          <tr key={i} className="hover:bg-[#F5F0E8]/40 transition-colors group">
                            <td className="py-3 px-6">
                              <input 
                                value={r.appellation} 
                                onChange={(e) => updateField(i, 'appellation', e.target.value)}
                                className="w-full bg-transparent border-b border-transparent focus:border-[#453B36]/30 outline-none font-serif-brand text-[17px] py-1 text-[#453B36]"
                              />
                            </td>
                            <td className="py-3 px-6">
                              <input 
                                value={r.domaine} 
                                onChange={(e) => updateField(i, 'domaine', e.target.value)}
                                className="w-full bg-transparent border-b border-transparent focus:border-[#453B36]/30 outline-none py-1 text-[#453B36]/80 text-[13px]"
                              />
                            </td>
                            <td className="py-3 px-6 text-[13px]">
                              <input 
                                value={r.millesime} 
                                onChange={(e) => updateField(i, 'millesime', e.target.value)}
                                className="w-20 bg-transparent border-b border-transparent focus:border-[#453B36]/30 outline-none py-1 tabular-nums font-semibold"
                              />
                            </td>
                            <td className="py-3 px-6 text-[13px]">
                              <span className="inline-block px-3 py-1 bg-[#453B36]/5 rounded-sm border border-[#453B36]/10 font-medium text-[11px] uppercase tracking-wide">
                                <input 
                                  value={r.type} 
                                  onChange={(e) => updateField(i, 'type', e.target.value)}
                                  className="w-16 bg-transparent outline-none text-center"
                                />
                              </span>
                            </td>
                            <td className="py-3 px-6 text-right">
                              <div className="flex items-center justify-end gap-1.5 focus-within:text-[#453B36]">
                                <input 
                                  type="number"
                                  value={r.quantite} 
                                  onChange={(e) => updateField(i, 'quantite', parseInt(e.target.value) || 0)}
                                  className="w-16 bg-transparent border-b border-transparent focus:border-[#453B36]/30 outline-none py-1 text-right tabular-nums font-bold text-[14px]"
                                />
                                <span className="opacity-40 text-[10px] font-bold uppercase tracking-wider">{r.unite}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-right">
                              <div className="flex items-center justify-end gap-1.5 focus-within:text-[#c4952a]">
                                <input 
                                  type="number"
                                  step="0.01"
                                  value={r.prix_ht} 
                                  onChange={(e) => updateField(i, 'prix_ht', parseFloat(e.target.value) || 0)}
                                  className="w-20 bg-transparent border-b border-transparent focus:border-[#453B36]/30 outline-none py-1 text-right tabular-nums text-[15px] font-semibold"
                                />
                                <span className="opacity-40 text-xs font-semibold">€ HT</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* PAIN QUANTIFIER BLOCK */}
                <div className="bg-[#F5F0E8] rounded-2xl p-8 border border-[#CBBEAA]/50 shadow-inner mt-12 mb-8 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#453B36] text-[#CBBEAA] px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase shadow-md flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-[#FACE0D]" />
                    Analyse d'Impact
                  </div>
                  
                  <h3 className="text-3xl font-serif-brand font-light text-[#453B36] text-center mb-8 mt-2">Ce que ce devis représente en temps</h3>
                  
                  <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                    {/* Left: Stats for this quote & Settings */}
                    <div className="space-y-6">
                      <div className="bg-white/60 p-5 rounded-xl border border-[#CBBEAA]/40 flex justify-between items-center">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-[#453B36]/60 font-semibold">Temps moyen / ligne</p>
                          <p className="text-[10px] text-[#453B36]/40">Fixé selon la moyenne métier</p>
                        </div>
                        <div className="text-xl font-bold font-serif-brand text-[#453B36]">3.5 min</div>
                      </div>

                      <div className="bg-white/60 p-5 rounded-xl border border-[#CBBEAA]/40 flex justify-between items-center">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-[#453B36]/60 font-semibold">Temps pour ce devis</p>
                          <p className="text-[10px] text-[#453B36]/40">{numReferences} références lues</p>
                        </div>
                        <div className="text-xl font-bold font-serif-brand text-[#453B36]">{formatTime(timeForDevisMins)}</div>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-[#CBBEAA] shadow-sm transform transition-all focus-within:ring-2 ring-[#c4952a]/20">
                        <label className="text-xs uppercase tracking-wider text-[#453B36]/80 font-bold block mb-3">Devis traités par mois</label>
                        <div className="flex items-center gap-4">
                          <button onClick={() => setDevisParMois(Math.max(1, devisParMois - 1))} className="w-8 h-8 rounded-full bg-[#F5F0E8] text-[#453B36] flex items-center justify-center hover:bg-[#c4952a]/20 transition-colors border border-[#CBBEAA]/50">
                            <Minus className="w-4 h-4" />
                          </button>
                          <input 
                            type="number" 
                            className="text-2xl font-bold font-serif-brand text-[#453B36] w-16 text-center outline-none bg-transparent"
                            value={devisParMois}
                            onChange={(e) => setDevisParMois(parseInt(e.target.value) || 0)}
                          />
                          <button onClick={() => setDevisParMois(devisParMois + 1)} className="w-8 h-8 rounded-full bg-[#F5F0E8] text-[#453B36] flex items-center justify-center hover:bg-[#c4952a]/20 transition-colors border border-[#CBBEAA]/50">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-[#CBBEAA] shadow-sm transform transition-all focus-within:ring-2 ring-[#c4952a]/20">
                        <label className="text-xs uppercase tracking-wider text-[#453B36]/80 font-bold block mb-3 flex items-center justify-between">
                          <span>Valeur de votre temps</span>
                          <span className="text-[#453B36]/40">€/heure</span>
                        </label>
                        <div className="flex items-center gap-3">
                          <input 
                            type="number" 
                            className="text-2xl font-bold font-serif-brand text-[#453B36] w-20 px-3 py-1 bg-[#F5F0E8] rounded-md outline-none focus:ring-1 ring-[#c4952a]"
                            value={tauxHoraire}
                            onChange={(e) => setTauxHoraire(parseInt(e.target.value) || 0)}
                          />
                          <span className="text-xl font-bold font-serif-brand text-[#453B36]">€</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: The Pain Value */}
                    <div className="bg-white rounded-2xl border border-[#CBBEAA]/80 shadow-md p-8 flex flex-col justify-center text-center">
                      <div className="mb-6 pb-6 border-b border-[#CBBEAA]/30">
                        <p className="text-sm uppercase tracking-widest text-[#453B36]/60 font-semibold mb-2">Temps Administratif Annuel</p>
                        <p className="text-4xl font-serif-brand font-bold text-[#453B36]">{Math.round(annualTimeLostHours)} <span className="text-xl text-[#453B36]/60 font-light">heures perdues</span></p>
                      </div>
                      
                      <div>
                        <p className="text-sm uppercase tracking-widest text-[#c4952a] font-bold mb-2">Coût Annuel Invisible</p>
                        <p className="text-7xl font-serif-brand font-bold text-[#453B36] drop-shadow-sm leading-none bg-gradient-to-br from-[#453B36] to-[#60554f] bg-clip-text text-transparent">
                          {Math.round(annualCostEuros).toLocaleString('fr-FR')} <span className="text-4xl font-light">€</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* REFRAME SECTION */}
                <div className="max-w-2xl mx-auto space-y-4 text-[15px] font-medium text-[#453B36]/70 leading-relaxed mb-16 pl-4 border-l-2 border-[#c4952a]/30">
                  <p className="flex items-start gap-4 transition-all hover:text-[#453B36]">
                    <span className="text-xl">🍷</span> <span>Préparer votre dossier MOF — sans les dimanches soir sur Excel.</span>
                  </p>
                  <p className="flex items-start gap-4 transition-all hover:text-[#453B36]">
                    <span className="text-xl">📅</span> <span>Coordonner plus d'événements privés — sans que ça déborde sur votre service.</span>
                  </p>
                  <p className="flex items-start gap-4 transition-all hover:text-[#453B36]">
                    <span className="text-xl">🧠</span> <span>Être pleinement présente en salle — pas dans votre boîte mail.</span>
                  </p>
                </div>

                {/* CALENDLY CTA */}
                <div className="text-center bg-[#FBF9F5] p-10 rounded-2xl border border-[#CBBEAA]/40 mb-4 shadow-sm">
                  <h4 className="text-2xl font-serif-brand font-semibold text-[#453B36] mb-6">Vous voulez voir comment ça s'intègre dans vos Google Sheets ?</h4>
                  <a 
                    href="https://calendly.com/ghdalmoro/30-minute-fr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#453B36] text-[#CBBEAA] hover:bg-[#FACE0D] hover:text-[#453B36] font-bold tracking-wider uppercase text-sm px-10 py-5 rounded-xl transition-all shadow-lg hover:-translate-y-1 hover:shadow-xl"
                  >
                    Réserver 30 minutes <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </div>
          )}


        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-[#453B36]/10 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-5 text-center">
          <div className="flex items-center gap-4">
             <img src="/demo/logo-wine-you-want.svg" alt="Wine You Want" className="h-8 w-auto object-contain opacity-50 grayscale" />
             <X className="w-3 h-3 text-[#453B36]/30 shrink-0" strokeWidth={3} />
             <img src="/favicon.png" alt="Gabriel Dalmoro" className="h-8 w-auto rounded-sm opacity-60 grayscale filter bg-white" />
          </div>
          <div className="flex flex-col gap-2 items-center">
            <p className="text-[#453B36]/40 text-xs tracking-wider uppercase font-semibold">
              Un projet pilote d'automatisation sur mesure
            </p>
            <a href="/fr/chef" target="_blank" rel="noopener noreferrer" className="text-[#c4952a]/70 hover:text-[#c4952a] text-[10px] tracking-wider uppercase font-bold transition-colors">
              Visiter le site principal
            </a>
          </div>
        </div>
      </footer>
      
      {/* Exclusivity Notice */}
      <div className="bg-[#FFFFFF] text-center pb-6">
        <p className="text-[10px] text-[#453B36]/40 italic max-w-xl mx-auto px-4">
          Cette démonstration est mise à disposition à titre exclusif pour WineYouWant dans le cadre d'une présentation commerciale.
        </p>
      </div>
    </div>
  );
}
