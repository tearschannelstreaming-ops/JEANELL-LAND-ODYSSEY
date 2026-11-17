import React from 'react';
import {
  Award,
  X,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Scale,
  Sparkles,
  Download,
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface GraduateContractCredentialModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  completedCount: number;
  totalCoursesCount: number;
}

export const GraduateContractCredentialModal: React.FC<GraduateContractCredentialModalProps> = ({
  isOpen,
  onClose,
  studentName,
  completedCount,
  totalCoursesCount,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const isFullGraduate = completedCount >= 8;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-4 sm:p-8 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto text-slate-100">
        {/* Ambient Glow */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Controls Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-950/70 border border-amber-500/40">
              Institutional Credential
            </span>
            <span className="text-xs text-slate-400">
              Curriculum Progress: {completedCount}/{totalCoursesCount} Courses
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Certificate</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Canvas */}
        <div className="mt-6 p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#0d1527] via-[#090d16] to-[#04070e] border-4 border-double border-amber-500/50 shadow-2xl relative text-center space-y-6">
          {/* Certificate Corner Ornaments */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400/70" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400/70" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-400/70" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400/70" />

          {/* Institution Header */}
          <div className="space-y-1">
            <div className="text-[11px] font-mono tracking-widest text-amber-400 uppercase font-bold">
              ONE STOP REHABILITATION CENTER 501(C)(3) · S.T.E.A.REALITY ACADEMY
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-white font-serif tracking-tight">
              GRADUATE DIPLOMA IN LEGAL JURISPRUDENCE &amp; CONTRACT EXECUTION
            </h1>
            <p className="text-xs sm:text-sm text-cyan-300 font-mono">
              2nd Grade Manuscript Foundations · Real Estate Deeds · 501(c)(3) Filings · Consumer, Constitutional, CFPB &amp; Business Law
            </p>
          </div>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />

          {/* Recipient Conferral */}
          <div className="space-y-2">
            <p className="text-xs text-slate-400 font-serif italic">This official credential certifies that</p>
            <div className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 font-serif">
              {studentName || 'Amari Land'}
            </div>
            <p className="text-xs text-slate-300 max-w-2xl mx-auto leading-relaxed">
              has satisfactorily completed the comprehensive fifteen-stage curriculum (Courses 100, 101, 102, 103, 200, 201, 202,
              203, 300, 310, 400, 410, 420, 430, and 440) mastering manuscript penmanship as a prerequisite to contract signing, fine print
              auditing, notarized acknowledgments, warranty deed conveyances, registered agent representations, IRS
              Forms 1023-EZ, 1023, and 990, and advanced later learning in <strong>Consumer Law (FDCPA/FCRA), Constitutional Due Process (5th/14th Amendments), CFPB Rules (Regulation F/Z &amp; RESPA), Business Law (LLC Operating Agreements &amp; UCC Article 2), and Advanced Contract Law</strong>.
            </p>
          </div>

          {/* Competency Badges Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono text-slate-300 max-w-3xl mx-auto pt-2">
            <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-800">
              ✓ Manuscript Penmanship (100)
            </div>
            <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-800">
              ✓ Fine Print &amp; Notary Seals (201/202)
            </div>
            <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-800">
              ✓ Deeds &amp; 501(c)(3) (300/310)
            </div>
            <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-800 text-purple-300 border-purple-500/40">
              ✓ Consumer Law &amp; FDCPA (400)
            </div>
            <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-800 text-cyan-300 border-cyan-500/40">
              ✓ Constitutional Due Process (410)
            </div>
            <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-800 text-amber-300 border-amber-500/40">
              ✓ CFPB Rules &amp; Reg F/Z (420)
            </div>
            <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-800 text-emerald-300 border-emerald-500/40">
              ✓ Business Law &amp; LLC Veil (430)
            </div>
            <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-800 text-rose-300 border-rose-500/40">
              ✓ Contract Unconscionability (440)
            </div>
          </div>

          {/* Signatures & Seal Section */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
            {/* Signature 1: Registrar */}
            <div className="text-center space-y-1">
              <div className="font-serif italic text-lg text-slate-200">One Stop Academic Board</div>
              <div className="w-36 h-0.5 bg-slate-700 mx-auto" />
              <div className="text-[10px] font-mono text-slate-400 uppercase">Academic Registrar</div>
            </div>

            {/* Official Gold Embossed Seal */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="w-20 h-20 rounded-full border-4 border-amber-400/80 bg-gradient-to-br from-amber-500/20 to-yellow-600/30 flex items-center justify-center shadow-lg shadow-amber-500/20 text-amber-300">
                <Scale className="w-10 h-10" />
              </div>
              <div className="text-[9px] font-mono text-amber-400 uppercase font-bold tracking-wider">
                OFFICIAL NOTARIZED SEAL
              </div>
            </div>

            {/* Signature 2: Jeanell Land */}
            <div className="text-center space-y-1">
              <div className="font-serif italic font-bold text-lg text-amber-200">Jeanell Land</div>
              <div className="w-36 h-0.5 bg-amber-400/60 mx-auto" />
              <div className="text-[10px] font-mono text-slate-300 font-bold uppercase">Jeanell Land</div>
              <div className="text-[9px] text-slate-400">Founder &amp; Director, One Stop 501(c)(3)</div>
            </div>
          </div>

          {/* Certificate Hash & Verification Footer */}
          <div className="pt-4 text-[9px] font-mono text-slate-500 flex flex-wrap items-center justify-between gap-2 border-t border-slate-900">
            <span>Docket: CERT-LAW-2026-JL-84920</span>
            <span>Accreditation: One Stop Rehabilitation Center · LARA ID #802536743</span>
            <span>Verify: onestoprehabilitationcenters.org</span>
          </div>
        </div>
      </div>
    </div>
  );
};
