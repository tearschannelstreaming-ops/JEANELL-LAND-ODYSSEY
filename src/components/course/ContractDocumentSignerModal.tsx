import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  CheckCircle2,
  X,
  PenTool,
  RotateCcw,
  Stamp,
  ShieldCheck,
  AlertTriangle,
  Building2,
  Scale,
  Award,
  Sparkles,
  Download,
  Printer,
  Check,
  Search,
} from 'lucide-react';
import { LegalDocumentTemplate, ContractClause, NotaryVerificationData } from '../../types/contractEducation';
import { sound } from '../../utils/audio';

interface ContractDocumentSignerModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: LegalDocumentTemplate;
  studentName: string;
  onCompleteExecution: (docId: string) => void;
}

export const ContractDocumentSignerModal: React.FC<ContractDocumentSignerModalProps> = ({
  isOpen,
  onClose,
  document,
  studentName,
  onCompleteExecution,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawnSignature, setHasDrawnSignature] = useState(false);
  const [adoptedSignatureDataUrl, setAdoptedSignatureDataUrl] = useState<string | null>(null);
  const [inspectedClauseIds, setInspectedClauseIds] = useState<string[]>([]);
  const [isNotarySealApplied, setIsNotarySealApplied] = useState(false);
  const [isFullyExecuted, setIsFullyExecuted] = useState(false);
  const [activeClauseDetail, setActiveClauseDetail] = useState<ContractClause | null>(null);

  // Initialize Canvas
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawnSignature(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClearSignature = () => {
    sound.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawnSignature(false);
    setAdoptedSignatureDataUrl(null);
  };

  const handleAdoptSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawnSignature) return;
    sound.playSuccess();
    const dataUrl = canvas.toDataURL('image/png');
    setAdoptedSignatureDataUrl(dataUrl);
  };

  const handleInspectClause = (clause: ContractClause) => {
    sound.playClick();
    setActiveClauseDetail(clause);
    if (!inspectedClauseIds.includes(clause.id)) {
      setInspectedClauseIds((prev) => [...prev, clause.id]);
    }
  };

  const handleApplyNotarySeal = () => {
    sound.playSuccess();
    setIsNotarySealApplied(true);
  };

  const handleExecuteContract = () => {
    if (!adoptedSignatureDataUrl) {
      alert('Please adopt your manuscript signature before executing the legal document!');
      return;
    }
    if (document.notaryRequired && !isNotarySealApplied) {
      alert('This document requires an official Notary Public seal and attestation under Michigan law before execution!');
      return;
    }

    sound.playSuccess();
    setIsFullyExecuted(true);
    onCompleteExecution(document.documentId);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-5xl w-full p-4 sm:p-6 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto text-slate-100 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-950 via-slate-900 to-cyan-950 border border-indigo-500/40 text-indigo-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30">
                  Legal Execution Studio
                </span>
                <span className="text-xs text-slate-400 font-mono">Auth: {document.officialFilingAuthority}</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">{document.title}</h2>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close Execution Studio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Content: Split View (Document Viewer & Execution Desk) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4 overflow-y-auto pr-1 flex-1">
          {/* LEFT 7 COLS: The Authentic Legal Document */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col space-y-4">
            {/* Document Header Banner */}
            <div className="border-b border-slate-800 pb-3 text-center space-y-1">
              <div className="text-[11px] font-mono text-cyan-400 font-semibold tracking-wider uppercase">
                {document.governingLaw}
              </div>
              <h3 className="text-base font-bold text-white font-serif">{document.title}</h3>
              <p className="text-xs text-slate-400 italic">{document.subtitle}</p>
            </div>

            {/* Parties Table */}
            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
              <div>
                <span className="text-slate-400 font-mono text-[10px]">PARTY OF THE FIRST PART:</span>
                <div className="font-bold text-white truncate">{document.parties.partyA}</div>
                <div className="text-[11px] text-slate-400">{document.parties.roleA}</div>
              </div>
              <div>
                <span className="text-slate-400 font-mono text-[10px]">PARTY OF THE SECOND PART:</span>
                <div className="font-bold text-white truncate">{document.parties.partyB}</div>
                <div className="text-[11px] text-slate-400">{document.parties.roleB}</div>
              </div>
            </div>

            {/* Clauses List with Clickable Fine-Print Scanner */}
            <div className="space-y-3 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 font-semibold text-slate-300">
                  <Search className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Interactive Clauses (Click to Scan Fine Print):</span>
                </span>
                <span className="text-[10px] font-mono text-cyan-400">
                  {inspectedClauseIds.length}/{document.clauses.length} Inspected
                </span>
              </div>

              {document.clauses.map((clause) => {
                const isInspected = inspectedClauseIds.includes(clause.id);
                return (
                  <div
                    key={clause.id}
                    onClick={() => handleInspectClause(clause)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      clause.isFinePrintTrap
                        ? 'bg-red-950/20 border-red-500/40 hover:border-red-400 hover:bg-red-950/30'
                        : isInspected
                        ? 'bg-slate-900/80 border-cyan-500/40 hover:border-cyan-400'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white flex items-center gap-1.5 font-mono">
                        <span>{clause.sectionNumber}:</span>
                        <span>{clause.title}</span>
                      </span>
                      {clause.isFinePrintTrap ? (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-red-950/80 text-red-300 border border-red-500/40 flex items-center gap-1">
                          <AlertTriangle className="w-2.5 h-2.5 text-red-400" />
                          <span>Fine Print Trap</span>
                        </span>
                      ) : isInspected ? (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                          <Check className="w-2.5 h-2.5" />
                          <span>Audited</span>
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-mono">Click to audit</span>
                      )}
                    </div>
                    <p className="text-slate-300 font-serif leading-relaxed line-clamp-3 text-[11px]">
                      {clause.content}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Execution Signature Block On Document */}
            <div className="mt-4 pt-3 border-t border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                Execution &amp; Attestation Block
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {/* Signer 1: Student / Signatory */}
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between min-h-[90px]">
                  <div className="text-[10px] text-slate-400 font-mono">PRIMARY SIGNATORY / AFFIANT</div>
                  {adoptedSignatureDataUrl ? (
                    <div className="py-1">
                      <img
                        src={adoptedSignatureDataUrl}
                        alt="Adopted Legal Signature"
                        className="h-10 max-w-full object-contain filter invert opacity-90"
                      />
                      <div className="text-[10px] font-mono text-cyan-300 border-t border-slate-700 pt-0.5 mt-0.5 truncate">
                        By: {studentName || 'Student Signatory'} (SEAL)
                      </div>
                    </div>
                  ) : (
                    <div className="h-10 border-b border-dashed border-slate-700 flex items-center justify-center text-[10px] text-amber-400 italic">
                      [Awaiting Signature Adoption on Right Panel]
                    </div>
                  )}
                </div>

                {/* Signer 2: Notary / Registrar Attestation */}
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between min-h-[90px]">
                  <div className="text-[10px] text-slate-400 font-mono">
                    {document.notaryRequired ? 'NOTARY PUBLIC ATTESTATION' : 'ATTESTING REGISTRAR'}
                  </div>
                  {document.notaryRequired ? (
                    isNotarySealApplied ? (
                      <div className="py-0.5 space-y-0.5">
                        <div className="flex items-center gap-1.5 text-amber-300 text-[10px] font-bold">
                          <Stamp className="w-3.5 h-3.5 text-amber-400" />
                          <span>NOTARIAL SEAL AFFIXED</span>
                        </div>
                        <div className="text-[9px] font-mono text-slate-300 leading-tight">
                          {document.notaryData?.notaryPublicName} · Exp: {document.notaryData?.commissionExpirationDate}
                        </div>
                      </div>
                    ) : (
                      <div className="h-10 border-b border-dashed border-slate-700 flex items-center justify-center text-[10px] text-rose-400 italic">
                        [Notary Stamp &amp; Jurat Required]
                      </div>
                    )
                  ) : (
                    <div className="py-1">
                      <div className="text-xs font-serif font-bold text-slate-200">Jeanell Land</div>
                      <div className="text-[9px] font-mono text-slate-400">Director, One Stop Center 501(c)(3)</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLS: Manuscript Canvas, Notary Desk & Execution Controls */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {/* Clause Inspector Drawer if active */}
            {activeClauseDetail && (
              <div
                className={`p-3.5 rounded-xl border text-xs space-y-2 animate-in fade-in duration-150 ${
                  activeClauseDetail.isFinePrintTrap
                    ? 'bg-red-950/40 border-red-500/60 text-red-200'
                    : 'bg-cyan-950/40 border-cyan-500/50 text-cyan-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold flex items-center gap-1.5 font-mono">
                    {activeClauseDetail.isFinePrintTrap ? (
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    ) : (
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    )}
                    <span>{activeClauseDetail.title}</span>
                  </span>
                  <button
                    onClick={() => setActiveClauseDetail(null)}
                    className="text-slate-400 hover:text-white text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <div className="text-[11px] leading-relaxed text-slate-300">
                  <strong className="text-white">Plain-English Meaning: </strong>
                  {activeClauseDetail.plainEnglishExplanation}
                </div>
                {activeClauseDetail.isFinePrintTrap && (
                  <div className="p-2 rounded bg-black/40 border border-red-500/30 text-[11px] space-y-1 text-red-300">
                    <div>
                      <strong className="text-red-200">Trap Warning: </strong>
                      {activeClauseDetail.trapWarning}
                    </div>
                    <div>
                      <strong className="text-emerald-300">Negotiation Remedy: </strong>
                      {activeClauseDetail.negotiationRemedy}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Manuscript & Signature Drawing Pad */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <PenTool className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Manuscript &amp; Signature Practice Pad</span>
                </div>
                <button
                  onClick={handleClearSignature}
                  className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  <span>Clear</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400">
                Practice writing your name with manuscript baseline discipline. Draw your authenticated signature mark
                below:
              </p>

              {/* Drawing Canvas with 2nd grade manuscript baseline guide */}
              <div className="relative rounded-lg overflow-hidden border border-slate-700 bg-slate-900 touch-none">
                {/* Guide lines (Top headline, dashed midline, bottom baseline) */}
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-2 opacity-25">
                  <div className="w-full border-t border-slate-400" />
                  <div className="w-full border-t border-dashed border-cyan-400" />
                  <div className="w-full border-b-2 border-slate-300" />
                </div>

                <canvas
                  ref={canvasRef}
                  width={380}
                  height={130}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-[130px] block cursor-crosshair"
                />
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="text-[10px] text-slate-500 font-mono">
                  {adoptedSignatureDataUrl ? '✓ Signature Adopted' : 'Draw signature above'}
                </span>
                <button
                  onClick={handleAdoptSignature}
                  disabled={!hasDrawnSignature}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    hasDrawnSignature
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 text-white shadow-md'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Adopt Signature</span>
                </button>
              </div>
            </div>

            {/* Notary Public Verification Desk (If required by document) */}
            {document.notaryRequired && document.notaryData && (
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <Stamp className="w-3.5 h-3.5 text-amber-400" />
                    <span>Michigan Notary Public Verification Desk</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40">
                    MCL 55.287
                  </span>
                </div>

                <div className="text-[11px] text-slate-300 space-y-1 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Notary Public:</span>
                    <span className="font-bold text-white">{document.notaryData.notaryPublicName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Jurisdiction:</span>
                    <span>County of Wayne, State of Michigan</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Notarial Act:</span>
                    <span className="text-amber-300 font-bold">{document.notaryData.juratOrAcknowledgment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">ID Presented:</span>
                    <span className="text-cyan-300">{document.notaryData.signatoryIdentifiedBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Commission Expires:</span>
                    <span>{document.notaryData.commissionExpirationDate}</span>
                  </div>
                </div>

                <button
                  onClick={handleApplyNotarySeal}
                  disabled={isNotarySealApplied}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isNotarySealApplied
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                      : 'bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 text-slate-950 shadow-md font-black'
                  }`}
                >
                  <Stamp className="w-4 h-4" />
                  <span>{isNotarySealApplied ? '✓ Notary Seal & Jurat Applied' : 'Administer Oath & Affix Notary Seal'}</span>
                </button>
              </div>
            )}

            {/* Execute & Deliver Final Button */}
            <div className="pt-2">
              <button
                onClick={handleExecuteContract}
                disabled={isFullyExecuted}
                className={`w-full py-3 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg ${
                  isFullyExecuted
                    ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                    : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-cyan-500/20 hover:scale-[1.01]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {isFullyExecuted
                    ? 'Document Successfully Executed & Recorded! 🏛️'
                    : 'Execute, Bind & Deliver Legal Instrument'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
