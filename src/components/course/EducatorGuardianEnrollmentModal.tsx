import React, { useState, useEffect } from 'react';
import {
  X,
  Users,
  GraduationCap,
  School,
  UserCheck,
  CheckCircle2,
  Sparkles,
  CreditCard,
  Gift,
  Printer,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Award,
  FileText,
  Plus,
  Trash2,
  Lock,
  Building2,
  Home,
  Shield,
  Briefcase,
  Calculator,
  TrendingUp,
  Check,
  ExternalLink,
  Layers,
  Scale,
  Calendar,
  Percent,
  Download,
  HelpCircle,
  Moon,
  Sun,
  Laptop,
  Scan,
  Camera,
} from 'lucide-react';
import { GuardianRole, RegisteredStudent, HomeschoolPackageConfig, VirtualCharterSchoolBlueprint, CteCareerPathway } from '../../types/kidsCourse';
import { INITIAL_REGISTERED_STUDENTS, HOMESCHOOL_DEFAULT_PACKAGE, VIRTUAL_CHARTER_SCHOOL_BLUEPRINT } from '../../data/kidsCourseData';
import { StudentProfile } from '../../types/game';
import { sound } from '../../utils/audio';

interface EducatorGuardianEnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectActiveStudent?: (student: RegisteredStudent) => void;
}

export const EducatorGuardianEnrollmentModal: React.FC<EducatorGuardianEnrollmentModalProps> = ({
  isOpen,
  onClose,
  onSelectActiveStudent,
}) => {
  // Active Tab: 'register' | 'roster' | 'homeschool' | 'charter_school' | 'passport'
  const [activeTab, setActiveTab] = useState<'register' | 'roster' | 'homeschool' | 'charter_school' | 'passport'>('register');

  // Registered Students List
  const [students, setStudents] = useState<RegisteredStudent[]>(() => {
    try {
      const saved = localStorage.getItem('steareality_registered_students');
      return saved ? JSON.parse(saved) : INITIAL_REGISTERED_STUDENTS;
    } catch {
      return INITIAL_REGISTERED_STUDENTS;
    }
  });

  // Active student for passport view
  const [viewingStudent, setViewingStudent] = useState<RegisteredStudent | null>(null);

  // Form states
  const [selectedRole, setSelectedRole] = useState<GuardianRole>('teacher');
  const [guardianName, setGuardianName] = useState<string>('Ms. Clara Davis');
  const [guardianEmail, setGuardianEmail] = useState<string>('cdavis@detroitschools.org');
  const [studentFullName, setStudentFullName] = useState<string>('');
  const [generationalSuffix, setGenerationalSuffix] = useState<string>('None');
  const [studentAge, setStudentAge] = useState<number>(7);
  const [gradeLevel, setGradeLevel] = useState<string>('1st Grade');
  const [schoolDistrict, setSchoolDistrict] = useState<string>('Detroit Public Schools Community District');
  const [isNightSchool, setIsNightSchool] = useState<boolean>(false);
  const [enrollmentPlan, setEnrollmentPlan] = useState<'free_open_world' | 'certified_institutional_pass' | 'charter_school_grant_funded'>('charter_school_grant_funded');
  const [voucherCode, setVoucherCode] = useState<string>('');
  const [voucherApplied, setVoucherApplied] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Adult Student Identification & Facial Recognition States
  const [governmentIdType, setGovernmentIdType] = useState<'Michigan Real ID Driver License' | 'Michigan State ID' | 'US Passport' | 'Military ID'>('Michigan Real ID Driver License');
  const [governmentIdNumber, setGovernmentIdNumber] = useState<string>('C-489-210-942-88');
  const [isFaceScanning, setIsFaceScanning] = useState<boolean>(false);
  const [isFaceScanned, setIsFaceScanned] = useState<boolean>(false);
  const [facialRecognitionHash, setFacialRecognitionHash] = useState<string>('');

  // Homeschool Package State
  const [homeschoolConfig, setHomeschoolConfig] = useState<HomeschoolPackageConfig>(HOMESCHOOL_DEFAULT_PACKAGE);
  const [showHomeschoolCert, setShowHomeschoolCert] = useState<boolean>(false);

  // Virtual Charter School State
  const [selectedPathwayId, setSelectedPathwayId] = useState<string>('cte_re');
  const [selectedAuthorizer, setSelectedAuthorizer] = useState<string>(VIRTUAL_CHARTER_SCHOOL_BLUEPRINT.authorizerOptions[0].name);
  const [showCharterProspectus, setShowCharterProspectus] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('steareality_registered_students', JSON.stringify(students));
  }, [students]);

  if (!isOpen) return null;

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (voucherCode.trim().toUpperCase() === 'DETROITKIDS100' || voucherCode.trim().toUpperCase() === 'JEANELL101') {
      sound.playSuccess();
      setVoucherApplied(true);
      setSuccessMessage('Voucher Applied: 100% Educational Title I Grant Waiver!');
    } else {
      sound.playAlert();
      setSuccessMessage('Invalid voucher. (Try: DETROITKIDS100 for 100% grant waiver)');
    }
  };

  const handleTriggerFaceScan = () => {
    sound.playClick();
    setIsFaceScanning(true);
    let counter = 0;
    const interval = setInterval(() => {
      counter += 1;
      if (counter % 3 === 0) {
        sound.playAeroTone(300 + counter * 30);
      }
      if (counter >= 12) {
        clearInterval(interval);
        setIsFaceScanning(false);
        setIsFaceScanned(true);
        const hash = 'BIO-SHA256-' + Array.from({ length: 12 }, () => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase();
        setFacialRecognitionHash(hash);
        sound.playSuccess();
      }
    }, 120);
  };

  const handleRegisterStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentFullName.trim()) {
      sound.playAlert();
      return;
    }

    // Require face recognition for adult students if adult / high school completion
    if ((studentAge >= 18 || gradeLevel.includes('Adult')) && !isFaceScanned) {
      sound.playAlert();
      alert('Adult Students must pass Biometric Face Recognition verification to insure the diploma and transcript are issued to the exact legal individual, and not Jr., Sr., I, II, or relatives by mistake.');
      return;
    }

    sound.playSuccess();
    const isAdult = studentAge >= 18 || gradeLevel.includes('Adult');
    const isSenior = studentAge >= 60;
    const isCharterGrant = enrollmentPlan === 'charter_school_grant_funded' || voucherApplied;

    const newStudent: RegisteredStudent = {
      id: `stu_${Date.now()}`,
      fullName: studentFullName.trim(),
      generationalSuffix,
      age: studentAge,
      gradeLevel,
      schoolOrDistrict: schoolDistrict.trim() || 'The ABC\'s of Financial Literacy Cyber Academy',
      registeredByRole: selectedRole,
      guardianName: guardianName.trim(),
      guardianEmail: guardianEmail.trim(),
      registeredDate: new Date().toISOString().split('T')[0],
      enrollmentPlan,
      currentAcademicLevel: 1,
      earnedStars: 10,
      completedLetters: ['A', 'B'],
      watchedVideoIds: ['vid_anti_bullying_1'],
      isCertifiedEnrolled: true,
      isAdultStudent: isAdult,
      isSeniorLifelongLearner: isSenior,
      isNightSchoolEnrolled: isNightSchool,
      governmentIdType: isAdult ? governmentIdType : undefined,
      governmentIdNumber: isAdult ? governmentIdNumber : undefined,
      isBiometricallyVerifiedFace: isFaceScanned,
      facialRecognitionHash: isFaceScanned ? facialRecognitionHash : undefined,
      grantLaptopAssigned: isCharterGrant,
      grantLaptopStatus: isCharterGrant ? 'Provisioned' : undefined,
      grantLaptopModel: 'Lenovo ThinkPad S.T.E.A.M. Homework Edition (15.6" FHD, HD Webcam, 16GB RAM, WiFi 6)',
      notes: `Registered via ${selectedRole.toUpperCase()} portal. Track: ${isNightSchool ? 'Night School (100% Virtual)' : 'Day School'}. Suffix: ${generationalSuffix}. ${isSenior ? '"Never Give Up" Senior Lifelong Learner.' : ''}`,
    };

    setStudents([newStudent, ...students]);
    setSuccessMessage(`🎉 Success! ${newStudent.fullName} ${generationalSuffix !== 'None' ? generationalSuffix : ''} is now enrolled in The ABC's of Financial Literacy Academy!`);
    setStudentFullName('');

    setTimeout(() => {
      setViewingStudent(newStudent);
      setActiveTab('roster');
      setSuccessMessage('');
    }, 1200);
  };

  const handleBatchEnrollClassroom = () => {
    sound.playSuccess();
    const sampleStudents: RegisteredStudent[] = [
      {
        id: `stu_batch_1_${Date.now()}`,
        fullName: 'Jordan Washington',
        age: 7,
        gradeLevel: '1st Grade',
        schoolOrDistrict: schoolDistrict,
        registeredByRole: selectedRole,
        guardianName,
        guardianEmail,
        registeredDate: new Date().toISOString().split('T')[0],
        enrollmentPlan: 'certified_institutional_pass',
        currentAcademicLevel: 2,
        earnedStars: 15,
        completedLetters: ['A', 'B', 'C', 'D'],
        watchedVideoIds: ['vid_anti_bullying_1'],
        isCertifiedEnrolled: true,
      },
      {
        id: `stu_batch_2_${Date.now()}`,
        fullName: 'Mia Chen',
        age: 6,
        gradeLevel: 'Kindergarten',
        schoolOrDistrict: schoolDistrict,
        registeredByRole: selectedRole,
        guardianName,
        guardianEmail,
        registeredDate: new Date().toISOString().split('T')[0],
        enrollmentPlan: 'free_open_world',
        currentAcademicLevel: 1,
        earnedStars: 12,
        completedLetters: ['A', 'B', 'C'],
        watchedVideoIds: ['vid_anti_bullying_1'],
        isCertifiedEnrolled: false,
      },
    ];

    setStudents([...sampleStudents, ...students]);
    setSuccessMessage('Classroom cohort added! 2 student passports generated.');
    setActiveTab('roster');
  };

  const handleDeleteStudent = (id: string) => {
    sound.playClick();
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        {/* Top Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  Educator, Administrator &amp; Guardian Student Portal
                </h2>
                <span className="hidden sm:inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  Open World &amp; Certified Passes
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Register students for the ABC's courses or enroll them free in the best virtual learning course game in the world.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center gap-3 text-xs">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('register');
            }}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'register'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Enroll New Student</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('roster');
            }}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'roster'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Classroom &amp; Family Roster ({students.length})</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('homeschool');
            }}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'homeschool'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-emerald-400" />
            <span>Homeschool Package &amp; Public Alignment</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('charter_school');
            }}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'charter_school'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Virtual Charter School Blueprint (MCL 380.551)</span>
          </button>

          {viewingStudent && (
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('passport');
              }}
              className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'passport'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Passport: {viewingStudent.fullName}</span>
            </button>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {successMessage && (
            <div className="mb-5 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs sm:text-sm font-semibold flex items-center gap-3 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* TAB 1: REGISTRATION FORM */}
          {activeTab === 'register' && (
            <div className="space-y-6">
              {/* Role Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  1. Select Your Relationship to the Student
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'teacher', label: 'Teacher / Educator', desc: 'Classroom & Homeroom', icon: '👨‍🏫' },
                    { id: 'administrator', label: 'School Admin', desc: 'Principal & District', icon: '🏛️' },
                    { id: 'parent', label: 'Parent', desc: 'Mother / Father', icon: '👨‍👩‍👧' },
                    { id: 'guardian', label: 'Legal Guardian', desc: 'Family Custodian', icon: '🛡️' },
                  ].map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setSelectedRole(role.id as GuardianRole);
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        selectedRole === role.id
                          ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-md shadow-cyan-500/20 ring-1 ring-cyan-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-2xl mb-1">{role.icon}</div>
                      <div>
                        <div className="text-xs font-bold text-white">{role.label}</div>
                        <div className="text-[10px] text-slate-400">{role.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Body */}
              <form onSubmit={handleRegisterStudent} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Guardian / Educator Full Name
                    </label>
                    <input
                      type="text"
                      value={guardianName}
                      onChange={(e) => setGuardianName(e.target.value)}
                      required
                      placeholder="e.g. Ms. Clara Davis"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Guardian Email (For Progress Reports)
                    </label>
                    <input
                      type="email"
                      value={guardianEmail}
                      onChange={(e) => setGuardianEmail(e.target.value)}
                      required
                      placeholder="e.g. teacher@school.edu or parent@gmail.com"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Student Legal Full Name *
                    </label>
                    <input
                      type="text"
                      value={studentFullName}
                      onChange={(e) => setStudentFullName(e.target.value)}
                      required
                      placeholder="e.g. Elijah Carter or Amara Davis"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Generational Suffix *
                    </label>
                    <select
                      value={generationalSuffix}
                      onChange={(e) => setGenerationalSuffix(e.target.value as any)}
                      className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-bold"
                      title="Prevents diploma/transcript misallocation between family members"
                    >
                      <option value="None">None (Standard)</option>
                      <option value="Jr.">Jr. (Junior)</option>
                      <option value="Sr.">Sr. (Senior)</option>
                      <option value="I">I (The First)</option>
                      <option value="II">II (The Second)</option>
                      <option value="III">III (The Third)</option>
                      <option value="IV">IV (The Fourth)</option>
                      <option value="V">V (The Fifth)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Age (4 ½ to 90+)
                    </label>
                    <input
                      type="number"
                      min={4.5}
                      max={99}
                      step={0.5}
                      value={studentAge}
                      onChange={(e) => setStudentAge(parseFloat(e.target.value) || 4.5)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-cyan-300 bg-cyan-950/40 border border-cyan-800/60 rounded-xl px-3.5 py-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🌟</span>
                    <span>
                      <strong>The ABC’s of Financial Literacy Academy:</strong> 100% Virtual K–12 for ages <strong>4 ½ to post-retirement</strong>. Never give up — complete at your own pace at 90 years old to earn your High School Diploma!
                    </span>
                  </div>
                  {studentAge >= 60 && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] whitespace-nowrap">
                      ⭐ Senior Lifelong Learner
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Academic Grade / Completion Track
                    </label>
                    <select
                      value={gradeLevel}
                      onChange={(e) => setGradeLevel(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Pre-K (Age 4.5 - 5)">Pre-K (Early Literacy · Ages 4 ½ - 5)</option>
                      <option value="Kindergarten">Kindergarten (Ages 5 - 6)</option>
                      <option value="1st Grade">1st Grade (Ages 6 - 7)</option>
                      <option value="2nd Grade">2nd Grade (Ages 7 - 8 · Manuscript Penmanship Prerequisite)</option>
                      <option value="3rd Grade">3rd Grade (Ages 8 - 9)</option>
                      <option value="4th Grade">4th Grade (Ages 9 - 10)</option>
                      <option value="5th Grade">5th Grade (Ages 10 - 11)</option>
                      <option value="Middle School">Middle School (6th - 8th Grades)</option>
                      <option value="High School">High School (9th - 12th Grades)</option>
                      <option value="Adult / Senior High School Completion (Never Give Up Track)">Adult / Senior High School Completion (Never Give Up Track · Ages 18 - 90+)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      School, District, or Charter Academy
                    </label>
                    <input
                      type="text"
                      value={schoolDistrict}
                      onChange={(e) => setSchoolDistrict(e.target.value)}
                      placeholder="e.g. The ABC's of Financial Literacy Cyber Academy"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* Night School Mode Option */}
                <div
                  onClick={() => setIsNightSchool(!isNightSchool)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isNightSchool
                      ? 'bg-purple-950/70 border-purple-400 text-white shadow-md shadow-purple-500/20'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${isNightSchool ? 'bg-purple-500/20 text-purple-300' : 'bg-slate-900 text-slate-400'}`}>
                      <Moon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-wider text-purple-300">
                          🌙 100% Virtual Night School Option
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-200">
                          24/7 Self-Paced
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Flexible evening, overnight, and anytime self-paced virtual attendance. Designed for working adults, parents, and senior scholars learning at their own schedule.
                      </p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center border font-bold text-xs ${
                    isNightSchool ? 'bg-purple-500 border-purple-400 text-slate-950' : 'bg-slate-900 border-slate-700 text-transparent'
                  }`}>
                    ✓
                  </div>
                </div>

                {/* ADULT IDENTIFICATION & BIOMETRIC FACE RECOGNITION (Required for Ages 18+ and Adult High School Completion) */}
                {(studentAge >= 18 || gradeLevel.includes('Adult')) && (
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-950 to-slate-950 border border-amber-500/40 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <Scan className="w-4 h-4 text-amber-400" />
                          <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider">
                            Adult Student Identification &amp; Biometric Face Recognition
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            Required by Law
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-1">
                          Adult students must provide identification and pass face recognition when registering to ensure the diploma is received by the right person — not <strong>Jr., Sr., I, II</strong>, or relatives by mistake.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Government ID Type
                        </label>
                        <select
                          value={governmentIdType}
                          onChange={(e) => setGovernmentIdType(e.target.value as any)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                        >
                          <option value="Michigan Real ID Driver License">Michigan Real ID Driver License</option>
                          <option value="Michigan State ID">Michigan State ID Card</option>
                          <option value="US Passport">US Passport</option>
                          <option value="Military ID">US Military ID</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Government ID / Document Number *
                        </label>
                        <input
                          type="text"
                          value={governmentIdNumber}
                          onChange={(e) => setGovernmentIdNumber(e.target.value)}
                          placeholder="e.g. C-489-210-942-88"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                        />
                      </div>
                    </div>

                    {/* Face Recognition Scanner Simulator */}
                    <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl border ${
                          isFaceScanned
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                            : isFaceScanning
                            ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400 animate-pulse'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}>
                          <Camera className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-2">
                            <span>Biometric Facial Match:</span>
                            {isFaceScanned ? (
                              <span className="text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> PASSED &amp; BOUND
                              </span>
                            ) : isFaceScanning ? (
                              <span className="text-cyan-400">Scanning 3D Facial Nodes...</span>
                            ) : (
                              <span className="text-amber-400">Action Required</span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            {isFaceScanned
                              ? `Hash: ${facialRecognitionHash} (Unique Legal Identity Match)`
                              : 'Verifies biometric facial topography against ID to prevent generational namesake confusion.'}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleTriggerFaceScan}
                        disabled={isFaceScanning}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                          isFaceScanned
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                            : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                        }`}
                      >
                        <Scan className={`w-3.5 h-3.5 ${isFaceScanning ? 'animate-spin' : ''}`} />
                        <span>{isFaceScanned ? 'Re-Verify Face' : isFaceScanning ? 'Scanning Face...' : 'Pass Face Recognition'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Enrollment Pathway Selection */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    2. Select Enrollment Pathway
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* OPTION 1: PUBLIC CHARTER SCHOOL GRANT FUNDED (FREE HOMEWORK LAPTOP) */}
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setEnrollmentPlan('charter_school_grant_funded');
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        enrollmentPlan === 'charter_school_grant_funded'
                          ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-md ring-2 ring-cyan-400/80'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-black text-cyan-400 uppercase tracking-wide flex items-center gap-1">
                            <Laptop className="w-3.5 h-3.5" /> Charter Grant Funded
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                            $0 Free
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white">
                          Public Charter Grant + Free Homework Laptop
                        </h4>
                        <p className="text-[11px] text-slate-300 mt-1">
                          All students funded through public charter school grants receive a <strong>homework laptop</strong> (Lenovo ThinkPad S.T.E.A.M. Edition with HD webcam &amp; WiFi 6) to do schoolwork at home.
                        </p>
                      </div>
                      <div className="mt-2 text-[10px] text-cyan-300 font-bold bg-cyan-900/30 px-2 py-1 rounded-lg">
                        💻 Laptop Included for All Grant Enrollees
                      </div>
                    </button>

                    {/* OPTION 2: FREE OPEN WORLD ACCESS */}
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setEnrollmentPlan('free_open_world');
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        enrollmentPlan === 'free_open_world'
                          ? 'bg-emerald-950/70 border-emerald-400 text-white shadow-md ring-2 ring-emerald-400/80'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-black text-emerald-400 uppercase tracking-wide">
                            🌟 Free Open World
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                            100% Free
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white">
                          "Best Virtual Learning Game"
                        </h4>
                        <p className="text-[11px] text-slate-300 mt-1">
                          Sponsored by All Your Needs Reality LLC &amp; Jeanell Land. Complete interactive A-Z alphabet deck, phonics, and motivational ad-break checkpoints.
                        </p>
                      </div>
                      <div className="mt-2 text-[10px] text-emerald-300 font-bold bg-emerald-900/30 px-2 py-1 rounded-lg">
                        ✨ Open 24/7 to the Public
                      </div>
                    </button>

                    {/* OPTION 3: CERTIFIED INSTITUTIONAL PASS */}
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setEnrollmentPlan('certified_institutional_pass');
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        enrollmentPlan === 'certified_institutional_pass'
                          ? 'bg-indigo-950/70 border-indigo-400 text-white shadow-md ring-2 ring-indigo-400/80'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-black text-indigo-400 uppercase tracking-wide">
                            🎓 Certified Pass
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                            $29.99 / Grant
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white">
                          Official Diploma &amp; Gradebook
                        </h4>
                        <p className="text-[11px] text-slate-300 mt-1">
                          Includes verified tamper-evident diploma certificate, teacher CSV gradebook export, student achievement passport, and priority curriculum roadmap.
                        </p>
                      </div>
                      <div className="mt-2 text-[10px] text-indigo-300 font-bold bg-indigo-900/30 px-2 py-1 rounded-lg">
                        📜 Official Graduation Transcript
                      </div>
                    </button>
                  </div>
                </div>

                {/* Optional Voucher for Certified Pass */}
                {enrollmentPlan === 'certified_institutional_pass' && (
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
                    <div className="flex items-center gap-2 text-xs text-slate-300 w-full sm:w-auto">
                      <Gift className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Title I / Grant Voucher Code:</span>
                    </div>
                    <input
                      type="text"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      placeholder="e.g. DETROITKIDS100"
                      className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white uppercase font-mono flex-1 w-full"
                    />
                    <button
                      type="button"
                      onClick={handleApplyVoucher}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold whitespace-nowrap cursor-pointer"
                    >
                      Apply Code
                    </button>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleBatchEnrollClassroom}
                    className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer"
                  >
                    <School className="w-4 h-4" />
                    <span>Quick-Enroll Sample Classroom Cohort</span>
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105"
                  >
                    <span>Complete Student Registration</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: CLASSROOM & ROSTER TABLE */}
          {activeTab === 'roster' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Registered Students Roster ({students.length})
                  </h3>
                  <p className="text-xs text-slate-400">
                    Track student achievement levels, ABC progress, and print official learning passports.
                  </p>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('register');
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Enroll Another Student</span>
                </button>
              </div>

              <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900 border-b border-slate-800 text-[11px] uppercase font-bold text-slate-400">
                      <tr>
                        <th className="py-3 px-4">Student &amp; ID</th>
                        <th className="py-3 px-3">Grade &amp; Age</th>
                        <th className="py-3 px-3">Academic Lvl</th>
                        <th className="py-3 px-3">ABCs Completed</th>
                        <th className="py-3 px-3">Enrollment Plan</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 font-medium">
                      {students.map((stu) => (
                        <tr key={stu.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-xs">
                                {stu.fullName} {stu.generationalSuffix && stu.generationalSuffix !== 'None' ? (
                                  <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] border border-amber-500/30">
                                    {stu.generationalSuffix}
                                  </span>
                                ) : null}
                              </span>
                              {stu.isNightSchoolEnrolled && (
                                <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold text-[9px] border border-purple-500/30 flex items-center gap-1">
                                  <Moon className="w-2.5 h-2.5" /> Night School
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                              ID: {stu.id} · {stu.schoolOrDistrict}
                            </div>
                            {stu.isAdultStudent && (
                              <div className="mt-1">
                                {stu.isBiometricallyVerifiedFace ? (
                                  <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                                    <Scan className="w-2.5 h-2.5" /> Face Verified: {stu.facialRecognitionHash?.slice(0, 18)} (Namesake Protection)
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[9px] font-mono text-amber-400 bg-amber-950/60 border border-amber-500/30 px-1.5 py-0.5 rounded">
                                    <Scan className="w-2.5 h-2.5" /> Face Scan Pending
                                  </span>
                                )}
                              </div>
                            )}
                            {stu.grantLaptopAssigned && (
                              <div className="mt-0.5">
                                <span className="inline-flex items-center gap-1 text-[9px] text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-1.5 py-0.5 rounded">
                                  <Laptop className="w-2.5 h-2.5" /> Grant Laptop: {stu.grantLaptopStatus || 'Provisioned'} (Lenovo ThinkPad)
                                </span>
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className="text-xs">{stu.gradeLevel}</span>
                            <span className="text-slate-400 text-[10px] block">
                              Age {stu.age} {stu.isSeniorLifelongLearner ? '· ⭐ Senior Lifelong' : ''}
                            </span>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-[10px]">
                              Level {stu.currentAcademicLevel} ({stu.earnedStars} ★)
                            </span>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className="text-emerald-400 font-bold">
                              {stu.completedLetters.length} / 26
                            </span>
                            <span className="text-slate-500 text-[10px] block">Letters</span>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            {stu.enrollmentPlan === 'charter_school_grant_funded' ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                                <Laptop className="w-3 h-3 text-cyan-400" />
                                Charter Grant + Laptop
                              </span>
                            ) : stu.isCertifiedEnrolled ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-300 bg-indigo-950/60 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                                <Award className="w-3 h-3 text-indigo-400" />
                                Certified Pass
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                Free Open World
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  sound.playClick();
                                  setViewingStudent(stu);
                                  setActiveTab('passport');
                                }}
                                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold transition-colors cursor-pointer"
                              >
                                View Passport
                              </button>

                              {onSelectActiveStudent && (
                                <button
                                  onClick={() => {
                                    sound.playClick();
                                    onSelectActiveStudent(stu);
                                    onClose();
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-cyan-600/30 hover:bg-cyan-600 text-cyan-300 hover:text-white border border-cyan-500/40 text-[11px] font-bold transition-colors cursor-pointer"
                                  title="Switch game profile to this student"
                                >
                                  Play As
                                </button>
                              )}

                              <button
                                onClick={() => handleDeleteStudent(stu.id)}
                                className="p-1 rounded-lg text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                                title="Remove student from roster"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: HOMESCHOOL PACKAGE CREATOR & PUBLIC ALIGNMENT */}
          {activeTab === 'homeschool' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header Box */}
              <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/40 rounded-3xl p-6 shadow-xl space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      <Home className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-white">
                        Homeschool Package Creator &amp; Local Public School Alignment
                      </h3>
                      <p className="text-xs text-emerald-300 font-mono">
                        Statutory Authority: Michigan Compulsory School Attendance Act (MCL 380.1561(3)(f))
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      sound.playClick();
                      setShowHomeschoolCert(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Homeschool Compliance Plan</span>
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  In Michigan, parents and legal guardians have the sovereign legal right to homeschool their children. Parents may choose to create an independent, customized S.T.E.A.M. &amp; wealth-building curriculum <strong>OR</strong> utilize the exact curriculum standards adopted by their local public school district (e.g., Detroit Public Schools Community District / Common Core / Michigan Merit Curriculum).
                </p>
              </div>

              {/* Curriculum Model Chooser */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  1. Choose Your Homeschool Curriculum Foundation
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setHomeschoolConfig({ ...homeschoolConfig, curriculumModel: 'steam_wealth_custom' });
                    }}
                    className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      homeschoolConfig.curriculumModel === 'steam_wealth_custom'
                        ? 'bg-emerald-950/70 border-emerald-400 text-white shadow-lg ring-1 ring-emerald-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black text-emerald-400 uppercase tracking-wide">
                          🌟 S.T.E.A.M. &amp; Wealth Custom Package
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                          Jeanell Land Pedagogy
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">
                        Independent Mastery Track
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Combines aerospace fluid physics, wind tunnel experiments, biometrics, real estate MLS evaluation, insurance fundamentals, and compound wealth engineering tailored to your child's pace.
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-300 font-medium">
                      ✓ Complete flexibility · Portfolio assessment · S.T.E.A.M. laboratory integration
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setHomeschoolConfig({ ...homeschoolConfig, curriculumModel: 'public_school_aligned' });
                    }}
                    className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      homeschoolConfig.curriculumModel === 'public_school_aligned'
                        ? 'bg-cyan-950/70 border-cyan-400 text-white shadow-lg ring-1 ring-cyan-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black text-cyan-400 uppercase tracking-wide">
                          🏛️ Local Public School Aligned Curriculum
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                          DPSCD &amp; Michigan Standards
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">
                        Michigan Merit Curriculum (MMC) Standards
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Follows the exact scope and sequence utilized by Detroit Public Schools and Michigan K-12 public academies (Common Core ELA, Math, Next Generation Science Standards NGSS, Social Studies GLCEs).
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-cyan-300 font-medium">
                      ✓ Seamless re-entry into public school · Standardized test readiness · State standards
                    </div>
                  </button>
                </div>
              </div>

              {/* Michigan Shared Time Program Explainer (MCL 388.1766b) */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <School className="w-5 h-5 text-amber-400" />
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        Michigan Shared Time Program: Dual-Enroll in Public School Electives
                      </h4>
                      <span className="text-[10px] text-amber-400 font-mono">
                        Michigan State School Aid Act (MCL 388.1766b)
                      </span>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={homeschoolConfig.sharedTimePublicSchoolElectives}
                      onChange={(e) =>
                        setHomeschoolConfig({
                          ...homeschoolConfig,
                          sharedTimePublicSchoolElectives: e.target.checked,
                        })
                      }
                      className="w-4 h-4 accent-amber-500 rounded"
                    />
                    <span className="text-xs font-bold text-slate-200">Enable Shared Time Electives</span>
                  </label>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Under Michigan law, homeschooled students can enroll part-time in nonessential elective classes at their local public school district (such as CTE vocational trades, computer science, band, art, physical education, or advanced sciences) <strong>100% tuition-free</strong>. The state funds the public school district for the time your student attends!
                </p>
              </div>

              {/* Specialized Subject Tracks (Real Estate, Insurance, Finance, Math, Business) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    2. Specialized Career &amp; Life Tracks (Select All That Apply)
                  </label>
                  <span className="text-[11px] text-emerald-400 font-bold">
                    Integrated with All Your Needs Reality &amp; DIFS Lore
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    {
                      key: 'realEstate',
                      title: 'Real Estate & Land Principles',
                      badge: 'Brokerage & Titles',
                      desc: 'Property deed analysis, zoning (B4/M4), MLS navigation, and fair housing ethics with Broker Jeanell Land.',
                      icon: Building2,
                      color: 'text-amber-400',
                    },
                    {
                      key: 'insurance',
                      title: 'Insurance & Risk Underwriting',
                      badge: 'DIFS Standards',
                      desc: 'Michigan Department of Insurance & Financial Services foundations, life/property coverage, and risk mitigation.',
                      icon: Shield,
                      color: 'text-rose-400',
                    },
                    {
                      key: 'financeAndBanking',
                      title: 'Banking, Mortgages & Capital',
                      badge: 'Generational Wealth',
                      desc: 'Commercial lending, amortization schedules, NACA programs, trust funds, and family bank creation.',
                      icon: TrendingUp,
                      color: 'text-emerald-400',
                    },
                    {
                      key: 'financialMath',
                      title: 'Applied Financial Mathematics',
                      badge: 'Algebra & Compound Int',
                      desc: 'Practical financial algebra, compound interest calculations, property tax percentages, and budget matrices.',
                      icon: Calculator,
                      color: 'text-cyan-400',
                    },
                    {
                      key: 'businessDevelopment',
                      title: 'Business Development & LARA LLCs',
                      badge: 'Corporate Law',
                      desc: 'Michigan LARA entity filing, operating agreements, commercial trademarking, and business accounting.',
                      icon: Briefcase,
                      color: 'text-indigo-400',
                    },
                  ].map((track) => {
                    const Icon = track.icon;
                    const isChecked = homeschoolConfig.specializedTracks[track.key as keyof typeof homeschoolConfig.specializedTracks];

                    return (
                      <button
                        key={track.key}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setHomeschoolConfig({
                            ...homeschoolConfig,
                            specializedTracks: {
                              ...homeschoolConfig.specializedTracks,
                              [track.key]: !isChecked,
                            },
                          });
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isChecked
                            ? 'bg-slate-900 border-emerald-500 shadow-md ring-1 ring-emerald-500/40'
                            : 'bg-slate-950 border-slate-800/80 opacity-70 hover:opacity-100 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                              {track.badge}
                            </span>
                            <div className={`w-4 h-4 rounded flex items-center justify-center text-xs font-bold ${
                              isChecked ? 'bg-emerald-500 text-slate-950' : 'border border-slate-700 text-transparent'
                            }`}>
                              ✓
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mb-1">
                            <Icon className={`w-4 h-4 ${track.color}`} />
                            <h5 className="text-xs font-bold text-white">{track.title}</h5>
                          </div>

                          <p className="text-[11px] text-slate-400 leading-snug">
                            {track.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Weekly Pacing & Schedule Plan */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Weekly Study Pacing &amp; Attendance Commitment
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Michigan law requires providing an organized educational program in good faith.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-300">Target Hours / Week:</span>
                    <input
                      type="number"
                      min={10}
                      max={40}
                      value={homeschoolConfig.weeklyHoursTarget}
                      onChange={(e) =>
                        setHomeschoolConfig({
                          ...homeschoolConfig,
                          weeklyHoursTarget: parseInt(e.target.value, 10) || 25,
                        })
                      }
                      className="w-16 px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-cyan-300 text-center font-bold"
                    />
                    <span className="text-xs text-slate-400">hours</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, idx) => (
                    <div key={day} className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="font-bold text-white text-xs">{day}</div>
                      <div className="text-[10px] text-cyan-400 mt-1 font-mono">
                        {Math.round(homeschoolConfig.weeklyHoursTarget / 5)} hrs/day
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">
                        {idx % 2 === 0 ? 'Math + Real Estate' : 'ELA + Science/Risk'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-400">
                  Compliant with Michigan Exemption (f) Non-Public Education Standards
                </span>

                <button
                  type="button"
                  onClick={() => {
                    sound.playSuccess();
                    setShowHomeschoolCert(true);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20"
                >
                  <Printer className="w-4 h-4" />
                  <span>Generate &amp; Print Homeschool Declaration</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB: VIRTUAL CHARTER SCHOOL BLUEPRINT (MCL 380.551) */}
          {activeTab === 'charter_school' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Direct Legal & Operational Verdict Banner */}
              <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/40 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300">
                      <Scale className="w-6 h-6" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-black uppercase">
                          ✓ 100% Legal &amp; Authorized
                        </span>
                        <span className="text-xs text-indigo-300 font-mono">
                          Michigan Public Act 129 of 2011
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-white mt-0.5">
                        Virtual Online Charter School Feasibility &amp; Blueprint
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      sound.playClick();
                      setShowCharterProspectus(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-black text-xs flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-500/20"
                  >
                    <Download className="w-4 h-4" />
                    <span>View &amp; Print Charter Prospectus</span>
                  </button>
                </div>

                {/* Direct Answer to User's Legal Question */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-indigo-500/30 space-y-2">
                  <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Legal Statute: Michigan Revised School Code Part 6E (MCL 380.551–380.561)</span>
                  </h4>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    <strong>Is creating a virtual online charter school legal and possible? YES.</strong> Michigan statute explicitly establishes and authorizes <strong>"Cyber Schools"</strong> (Public School Academies delivering instruction through online technology).
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px]">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-slate-400 font-medium">Statewide Enrollment</div>
                      <div className="text-emerald-400 font-bold mt-0.5">Any Michigan K-12 Student</div>
                      <div className="text-[10px] text-slate-500">100% Tuition-Free to families</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-slate-400 font-medium">State Foundation Allowance</div>
                      <div className="text-amber-400 font-bold mt-0.5">~$9,608 per Pupil / Year</div>
                      <div className="text-[10px] text-slate-500">State School Aid Act Section 20</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-slate-400 font-medium">Authorizing Body</div>
                      <div className="text-cyan-400 font-bold mt-0.5">Public Universities &amp; ISDs</div>
                      <div className="text-[10px] text-slate-500">GVSU, CMU, Wayne State, Wayne RESA</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5 Specialized CTE Career Pathways */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    5 Specialized Career &amp; Technical Education (CTE) Pathways
                  </label>
                  <span className="text-[11px] text-indigo-400 font-bold">
                    Federal CIP Codes Aligned
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {VIRTUAL_CHARTER_SCHOOL_BLUEPRINT.pathways.map((pathway) => {
                    const isSelected = selectedPathwayId === pathway.id;

                    return (
                      <button
                        key={pathway.id}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setSelectedPathwayId(pathway.id);
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-slate-900 border-indigo-400 ring-1 ring-indigo-400 shadow-md'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/30 text-indigo-300 font-bold">
                              CIP {pathway.cipCode}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400">
                              {pathway.specialization}
                            </span>
                          </div>

                          <h4 className="text-xs font-bold text-white leading-snug">
                            {pathway.name}
                          </h4>

                          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                            {pathway.description}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-emerald-400 font-semibold truncate">
                          ★ {pathway.industryCertifications[0]}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Detailed View of Selected CTE Pathway */}
              {(() => {
                const active = VIRTUAL_CHARTER_SCHOOL_BLUEPRINT.pathways.find((p) => p.id === selectedPathwayId) || VIRTUAL_CHARTER_SCHOOL_BLUEPRINT.pathways[0];
                return (
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-indigo-400">
                            CIP #{active.cipCode} · {active.specialization} Track
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-0.5">
                          {active.name}
                        </h4>
                      </div>
                      <span className="text-xs text-slate-400">
                        Meets Michigan Merit Curriculum High School Electives
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Key Courses */}
                      <div className="space-y-2">
                        <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                          Required Pathway Courses
                        </h5>
                        <div className="space-y-1.5">
                          {active.keyCourses.map((c, i) => (
                            <div key={i} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono text-[10px] font-bold">
                                {i + 1}
                              </span>
                              <span>{c}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Industry Certifications */}
                      <div className="space-y-2">
                        <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                          Industry Certifications Conferred
                        </h5>
                        <div className="space-y-1.5">
                          {active.industryCertifications.map((cert, i) => (
                            <div key={i} className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>{cert}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* 5-Step Charter Authorizer Application Milestones */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      5-Step Charter Authorizer Application &amp; Launch Roadmap
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Step-by-step statutory execution to open a fully funded Michigan public cyber charter school.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400">Target Authorizer:</span>
                    <select
                      value={selectedAuthorizer}
                      onChange={(e) => setSelectedAuthorizer(e.target.value)}
                      className="px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                    >
                      {VIRTUAL_CHARTER_SCHOOL_BLUEPRINT.authorizerOptions.map((a) => (
                        <option key={a.name} value={a.name}>
                          {a.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {VIRTUAL_CHARTER_SCHOOL_BLUEPRINT.legalMilestones.map((m) => (
                    <div
                      key={m.step}
                      className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3"
                    >
                      <div className="w-7 h-7 rounded-xl bg-indigo-500/20 text-indigo-300 font-bold font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {m.step}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h5 className="text-xs font-bold text-white">{m.title}</h5>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                            m.status === 'Ready'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : m.status === 'In Progress'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                          }`}>
                            {m.status}
                          </span>
                        </div>
                        <div className="text-[10px] text-indigo-400 font-mono mt-0.5">
                          {m.legalStatute}
                        </div>
                        <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* State Foundation Funding Projection Table */}
                <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="text-slate-400">Projected Initial Cohort (500 Students × $9,608 / student):</span>
                    <div className="text-lg font-black text-emerald-400 mt-0.5">
                      $4,804,000 / Year in State Foundation Aid
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Funds certified faculty, accredited online LMS technology, and CTE industry credentialing.
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      sound.playClick();
                      setShowCharterProspectus(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Full Charter Proposal</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STUDENT LEARNING PASSPORT */}
          {activeTab === 'passport' && viewingStudent && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('roster');
                  }}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  ← Back to Roster
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    window.print();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Learning Passport</span>
                </button>
              </div>

              {/* Passport Document Container */}
              <div className="border-4 border-slate-700 bg-slate-950 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg">
                      {viewingStudent.fullName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-black">
                        Official Student Learning Passport
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white">
                        {viewingStudent.fullName}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {viewingStudent.gradeLevel} · {viewingStudent.schoolOrDistrict}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                      Academic Level {viewingStudent.currentAcademicLevel}
                    </span>
                    <div className="text-[10px] text-slate-500 font-mono mt-1">
                      ID: {viewingStudent.id}
                    </div>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                    <div className="text-xs text-slate-400">Letters Mastered</div>
                    <div className="text-xl font-black text-emerald-400 mt-0.5">
                      {viewingStudent.completedLetters.length} / 26
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                    <div className="text-xs text-slate-400">Stars Earned</div>
                    <div className="text-xl font-black text-amber-400 mt-0.5">
                      {viewingStudent.earnedStars} ★
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                    <div className="text-xs text-slate-400">Videos &amp; PSAs</div>
                    <div className="text-xl font-black text-cyan-400 mt-0.5">
                      {viewingStudent.watchedVideoIds.length} Watched
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                    <div className="text-xs text-slate-400">Enrollment Status</div>
                    <div className="text-xs font-black text-indigo-300 mt-1">
                      {viewingStudent.isCertifiedEnrolled ? 'Certified Scholar' : 'Open World Access'}
                    </div>
                  </div>
                </div>

                {/* Completed Letters Stamp Grid */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Alphabet Mastery Stamp Deck
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((char) => {
                      const isDone = viewingStudent.completedLetters.includes(char);
                      return (
                        <div
                          key={char}
                          className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center border transition-all ${
                            isDone
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-sm'
                              : 'bg-slate-900/60 border-slate-800 text-slate-600'
                          }`}
                        >
                          {char}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Guardian / Endorsement Seal */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
                  <div>
                    <span className="text-slate-300 font-bold">Registered by {viewingStudent.registeredByRole.toUpperCase()}:</span>{' '}
                    <span>{viewingStudent.guardianName} ({viewingStudent.guardianEmail})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Verified by All Your Needs Reality LLC &amp; Jeanell Land</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>All Your Needs Reality LLC · Educational Licensing Division</span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>

      {/* HOMESCHOOL DECLARATION & CURRICULUM PLAN MODAL */}
      {showHomeschoolCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-slate-900 border-2 border-emerald-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400">
                  <Home className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold">
                    Official Statutory Education Filing Document
                  </div>
                  <h3 className="text-xl font-black text-white">
                    Homeschool Curriculum Plan &amp; Exemption F Declaration
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setShowHomeschoolCert(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Formal Parchment Document */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-4 border-double border-amber-900/40 rounded-2xl p-6 text-slate-900 space-y-4 font-serif text-xs shadow-xl">
              <div className="text-center space-y-1 border-b border-amber-900/20 pb-3">
                <div className="font-mono text-[10px] tracking-widest uppercase text-amber-900 font-black">
                  State of Michigan · Department of Education Compulsory Attendance Exemption
                </div>
                <h2 className="text-xl font-black tracking-tight uppercase text-amber-950">
                  Declaration of Home Education &amp; Curriculum Standards Plan
                </h2>
                <p className="text-[11px] italic text-slate-700">
                  Pursuant to Michigan Revised School Code Section 1561(3)(f) [MCL § 380.1561(3)(f)]
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-2 border-b border-amber-900/20">
                <div>
                  <span className="font-bold uppercase text-[10px] text-slate-600 block">Student Name:</span>
                  <span className="text-base font-black text-slate-950">{homeschoolConfig.studentName}</span>
                </div>
                <div>
                  <span className="font-bold uppercase text-[10px] text-slate-600 block">Grade Band &amp; Target Hours:</span>
                  <span className="text-base font-black text-slate-950">{homeschoolConfig.gradeLevel} · {homeschoolConfig.weeklyHoursTarget} hrs/week</span>
                </div>
                <div>
                  <span className="font-bold uppercase text-[10px] text-slate-600 block">Curriculum Foundation:</span>
                  <span className="font-bold text-slate-900">
                    {homeschoolConfig.curriculumModel === 'steam_wealth_custom'
                      ? 'Jeanell Land S.T.E.A.M. & Wealth Custom Mastery Framework'
                      : `Local Public School Aligned (${homeschoolConfig.schoolDistrictAlignment})`}
                  </span>
                </div>
                <div>
                  <span className="font-bold uppercase text-[10px] text-slate-600 block">Shared Time Election (MCL 388.1766b):</span>
                  <span className="font-bold text-slate-900">
                    {homeschoolConfig.sharedTimePublicSchoolElectives
                      ? 'Elected: Eligible for Tuition-Free Electives in Local District'
                      : 'Not Elected'}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 py-1">
                <div className="font-bold text-slate-900 uppercase text-[10px]">Core Academic Subjects &amp; Life Specializations Provided:</div>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-800">
                  <li>English Language Arts, Reading, Writing &amp; Phonics Mastery</li>
                  <li>Mathematics: Applied Financial Mathematics, Algebra &amp; Compound Interest</li>
                  <li>Science: Aeronautical Fluid Mechanics, Wind Tunnels &amp; Earth Systems (NGSS)</li>
                  <li>Social Studies: Detroit &amp; American Civics, Constitutional Rights &amp; History</li>
                  {homeschoolConfig.specializedTracks.realEstate && (
                    <li>Specialization: Real Estate Brokerage, Land Title &amp; Property Law (All Your Needs Reality LLC)</li>
                  )}
                  {homeschoolConfig.specializedTracks.insurance && (
                    <li>Specialization: Michigan DIFS Insurance Standards &amp; Actuarial Risk Management</li>
                  )}
                  {homeschoolConfig.specializedTracks.financeAndBanking && (
                    <li>Specialization: Banking, Mortgages &amp; Generational Wealth Compounding</li>
                  )}
                  {homeschoolConfig.specializedTracks.businessDevelopment && (
                    <li>Specialization: Entrepreneurship, Michigan LARA LLC &amp; 501(c)(3) Entity Formations</li>
                  )}
                </ul>
              </div>

              <div className="pt-4 border-t border-amber-900/20 flex items-center justify-between text-[11px]">
                <div>
                  <div className="font-bold">{guardianName}</div>
                  <div className="text-slate-600">Parent / Sovereign Educator ({guardianEmail})</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">Dated &amp; Executed</div>
                  <div className="text-slate-600">{new Date().toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  window.print();
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Print Document</span>
              </button>
              <button
                onClick={() => setShowHomeschoolCert(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CHARTER PROSPECTUS MODAL */}
      {showCharterProspectus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-slate-900 border-2 border-indigo-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-mono tracking-widest uppercase text-indigo-400 font-bold">
                    Official Public Cyber Charter School Charter Prospectus
                  </div>
                  <h3 className="text-xl font-black text-white">
                    Michigan Cyber Academy of Real Estate, Insurance &amp; Financial Commerce
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setShowCharterProspectus(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Content */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5 text-xs text-slate-300">
              <div className="space-y-1 border-b border-slate-800 pb-4">
                <div className="text-[11px] font-mono text-emerald-400 font-bold">
                  AUTHORIZING STATUTE: MICHIGAN REVISED SCHOOL CODE PART 6E (MCL 380.551–380.561)
                </div>
                <h2 className="text-base font-black text-white">
                  Statewide Cyber Charter Public School Academy Application Prospectus
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  Submitted pursuant to Michigan Public Act 129 of 2011 to establish a tuition-free, statewide public cyber school providing comprehensive Michigan Merit Curriculum graduation standards synthesized with rigorous Career &amp; Technical Education (CTE) in real estate, insurance, corporate finance, applied math, and business development.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] uppercase text-slate-400 font-bold block">Target Authorizer:</span>
                  <span className="font-bold text-white text-xs">{selectedAuthorizer}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] uppercase text-slate-400 font-bold block">Grade Span &amp; Enrollment:</span>
                  <span className="font-bold text-white text-xs">Grades 6–12 (500 Students Year 1)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] uppercase text-slate-400 font-bold block">Per-Pupil State Aid:</span>
                  <span className="font-bold text-emerald-400 text-xs">$9,608 / student ($4.8M / year)</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-black text-white uppercase tracking-wider">
                  Approved Career &amp; Technical Education (CTE) Pathways:
                </h4>
                <div className="space-y-2">
                  {VIRTUAL_CHARTER_SCHOOL_BLUEPRINT.pathways.map((p) => (
                    <div key={p.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                      <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                        <span>{p.name}</span>
                        <span className="text-[10px] font-mono text-indigo-400">CIP #{p.cipCode}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">{p.description}</p>
                      <div className="mt-2 text-[10px] text-emerald-400 font-semibold">
                        Credentials: {p.industryCertifications.join(' · ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-black text-white uppercase tracking-wider">
                  Governance &amp; Pupil Accounting Assurance:
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  The Academy is governed by a sovereign 501(c)(3) nonprofit public board of trustees under MCL 450.2101. Virtual pupil accounting complies with Michigan State School Aid Act Section 21f and Michigan Department of Education (MDE) two-way certified teacher contact standards.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  window.print();
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-black text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Print Charter Prospectus</span>
              </button>
              <button
                onClick={() => setShowCharterProspectus(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

