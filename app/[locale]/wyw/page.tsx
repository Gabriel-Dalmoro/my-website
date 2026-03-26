'use client';

import React, { useState, useRef } from 'react';
import { Upload, ChevronRight, Check, X, CheckCircle2, FileOutput, Settings, Box, Wine, Euro, Calendar, Sparkles, ArrowRight } from 'lucide-react';
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
      
      setToastMsg('Données copiées. Dans la version finale, ces données seront automatiquement synchronisées sur votre Google Drive partagé dès votre validation.');
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

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#453B36] font-sans selection:bg-[#FACE0D] selection:text-[#453B36]">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
        .font-serif-brand { font-family: 'Cormorant Garamond', serif; }
      `}} />
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-[#FACE0D] text-[#453B36] px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center gap-3 font-medium animate-in fade-in slide-in-from-top-4 duration-300 max-w-lg w-full">
          <CheckCircle2 className="w-6 h-6 shrink-0" />
          <p className="text-sm leading-snug">{toastMsg}</p>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-[#453B36]/10 pt-8 pb-6 px-6 relative z-10 bg-[#FFFFFF] shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Image 
              src="/demo/logo-wine-you-want.svg" 
              alt="Wine You Want" 
              width={100} 
              height={35} 
              className="object-contain"
            />
            <X className="w-3 h-3 text-[#453B36]/30" strokeWidth={3} />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded overflow-hidden border border-[#453B36]/10 shadow-sm relative shrink-0">
                <Image 
                  src="/favicon.png" 
                  alt="Gabriel Dalmoro Company Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-serif-brand text-2xl tracking-wide hidden sm:block text-[#453B36] font-medium leading-none mt-1">Gabriel Dalmoro</span>
            </div>
          </div>
          <div className="text-xs font-semibold tracking-widest uppercase border border-[#CBBEAA]/50 px-4 py-2 rounded-full bg-[#CBBEAA]/10 text-[#453B36]">
            Projet Pilote DEMO
          </div>
        </div>
      </header>

      <main className="pb-20 bg-[#FFFFFF]">
        {/* Dynamic Image Hero Header */}
        <div className="relative w-full overflow-hidden bg-white">
          <div 
            className="w-full h-[50vh] min-h-[400px] bg-cover bg-center"
            style={{ backgroundImage: `url('/demo/bg-perso-x2.webp')` }}
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center text-[#453B36] top-10">
            <h1 className="text-5xl md:text-7xl mb-4 tracking-tight max-w-4xl leading-tight font-serif-brand font-light drop-shadow-sm">
              Moins d'administratif.<br/>
              <span className="italic font-medium text-[#c4952a]">Plus d'impact.</span>
            </h1>
            <p className="text-lg md:text-2xl font-light max-w-2xl text-[#453B36]/90 mt-2 font-serif-brand">
              Du PDF vers Google Sheets en quelques secondes.
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
              <div className="inline-flex p-5 rounded-full bg-[#c4952a]/10 mb-8 border border-[#c4952a]/20 align-middle">
                <Sparkles className="w-12 h-12 animate-pulse text-[#c4952a]" />
              </div>
              <h2 className="text-4xl font-serif-brand font-light mb-4 text-[#453B36]">La logique de Gabriel explore la cave...</h2>
              <p className="text-lg text-[#453B36]/80 mb-10 font-serif-brand italic">...pour simplifier la vie de Sabrina.</p>
              
              <div className="bg-[#F5F0E8] text-[#453B36] text-left p-8 rounded-xl font-mono text-sm max-h-56 overflow-y-auto space-y-3 shadow-inner border border-[#CBBEAA]/40">
                {logMessages.map((log, i) => (
                  <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <span className="text-[#c4952a] font-bold opacity-80 mr-3">›</span>{log}
                  </div>
                ))}
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
                    <p className="text-[#453B36]/70 text-lg font-serif-brand">Fournisseur analysé : <strong className="text-[#453B36] font-semibold">{data?.agent}</strong> ({data?.references.length} références trouvées)</p>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => { setFile(null); setStatus('idle'); }} className="px-6 py-3 border border-[#453B36]/20 bg-white hover:bg-[#F5F0E8] rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm">
                      Recommencer
                    </button>
                    <button onClick={handleExport} className="px-8 py-3 bg-[#453B36] text-white hover:bg-[#4A7A4A] hover:text-white font-semibold rounded-lg flex items-center gap-2 shadow-lg hover:-translate-y-1 transition-all">
                      <FileOutput className="w-5 h-5" /> Copier & Ouvrir Sheets
                    </button>
                  </div>
                </div>

                {/* Editable Table */}
                <div className="rounded-xl overflow-hidden border border-[#CBBEAA]/80 bg-white">
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
              </div>
            </div>
          )}

          {/* Bottom Overview Blocks */}
          {(status === 'idle' || status === 'error' || status === 'success') && (
            <div className="bg-[#F5F0E8] border border-[#CBBEAA] rounded-2xl flex flex-col max-w-4xl mx-auto shadow-sm mt-4">
              <div className="bg-[#453B36] text-white px-6 py-4 flex items-center justify-between border-b border-[#453B36] rounded-t-2xl">
                <div className="flex items-center gap-2 text-sm uppercase tracking-wider font-semibold text-[#CBBEAA]">
                  <Settings className="w-4 h-4 text-[#FACE0D]" />
                  Aperçu de la suite du processus
                </div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#CBBEAA]/50">
                  <span className="w-2 h-2 rounded-full bg-[#FACE0D] animate-pulse"></span>
                  Google Sheets WYW
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex-1 bg-white rounded-b-2xl">
                <p className="text-sm text-[#453B36]/70 leading-relaxed mb-6 font-serif-brand italic">
                  En production, chaque référence extraite par l'IA sera soumise automatiquement à votre feuille de calcul existante. Le système y joindra vos propres formules.
                </p>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[#F5F0E8]/50 p-4 rounded-xl border border-[#CBBEAA]/50 opacity-90">
                    <Box className="w-5 h-5 text-[#c4952a] mb-2" />
                    <h4 className="text-xs font-bold mb-1">Contrat</h4>
                    <p className="text-[10px] text-[#453B36]/60 leading-tight">Tier, conditions</p>
                  </div>
                  <div className="bg-[#F5F0E8]/50 p-4 rounded-xl border border-[#CBBEAA]/50 opacity-90">
                    <Wine className="w-5 h-5 text-[#c4952a] mb-2" />
                    <h4 className="text-xs font-bold mb-1">Catégorie</h4>
                    <p className="text-[10px] text-[#453B36]/60 leading-tight">Appellation prestige</p>
                  </div>
                  <div className="bg-[#F5F0E8]/50 p-4 rounded-xl border border-[#CBBEAA]/50 opacity-90">
                    <Euro className="w-5 h-5 text-[#c4952a] mb-2" />
                    <h4 className="text-xs font-bold mb-1">Prix unitaire</h4>
                    <p className="text-[10px] text-[#453B36]/60 leading-tight">Tranches de prix</p>
                  </div>
                  <div className="bg-[#F5F0E8]/50 p-4 rounded-xl border border-[#CBBEAA]/50 opacity-90">
                    <Calendar className="w-5 h-5 text-[#c4952a] mb-2" />
                    <h4 className="text-xs font-bold mb-1">Millésime</h4>
                    <p className="text-[10px] text-[#453B36]/60 leading-tight">Rareté, cote marché</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-[#453B36]/10 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-3">
             <Image src="/demo/logo-wine-you-want.svg" alt="W" width={80} height={25} className="object-contain opacity-50 grayscale" />
             <Image src="/favicon.png" alt="G" width={20} height={20} className="rounded-sm opacity-60 grayscale filter" />
          </div>
          <p className="text-[#453B36]/40 text-xs tracking-wider uppercase font-semibold">
            Un projet pilote d'automatisation sur mesure
          </p>
        </div>
      </footer>
    </div>
  );
}
