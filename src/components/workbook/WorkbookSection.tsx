import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, DollarSign, Award, CheckCircle2, Save, Download, Sparkles, Smartphone, Tv } from 'lucide-react';
import { sound } from '../../utils/audio';
import { PWAInstallButton } from '../pwa/PWAInstallButton';

export const WorkbookSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'covers' | 'career' | 'weekly' | 'budget' | 'reflection'>('covers');

  // 5-Year Career Plan State
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const [careerGoals, setCareerGoals] = useState<Record<string, { q1: string; q2: string; q3: string; q4: string }>>({
    '1': {
      q1: 'Master calculus fundamentals and set up a structured weekly study schedule.',
      q2: 'Complete resume and identify personal assets vs liabilities.',
      q3: 'Join a collegiate aeronautics or robotics design team.',
      q4: 'Build emergency reserve account of $1,000.',
    },
    '2': {
      q1: 'Enroll in fluid dynamics and computer-aided design (CAD) coursework.',
      q2: 'Secure work-study or data analyst internship in Detroit metro.',
      q3: 'Distinguish between personal passion and long-term purpose.',
      q4: 'Establish credit profile with no late marks or high-interest balances.',
    },
    '3': {
      q1: 'Conduct research on 5 local nonprofit organizations to volunteer with.',
      q2: 'Apply to 5 high-impact aerospace and engineering firms.',
      q3: 'Pass technical certification in project management or programming.',
      q4: 'Mentor a first-generation high school STEM student.',
    },
    '4': {
      q1: 'Master the ABCs of Financial Terms (NACA, ROI, Depreciation, Zoning).',
      q2: 'Complete licensing examinations in insurance and real estate.',
      q3: 'Evaluate first multi-family duplex property pro forma for acquisition.',
      q4: 'Establish long-term family estate trust and life insurance policy.',
    },
    '5': {
      q1: 'Found or co-lead a community development program in my neighborhood.',
      q2: 'Achieve financial stability with positive cash-flow asset ownership.',
      q3: 'Publish educational resources or mentor 20+ young women in STEM.',
      q4: 'Review 5-year journey and establish next decade generational legacy goals.',
    },
  });

  // Weekly Planner State
  const [weeklySchedule, setWeeklySchedule] = useState<{
    mon: string;
    tue: string;
    wed: string;
    thu: string;
    fri: string;
    sat: string;
  }>({
    mon: 'Calculus review · Engineering physics lab (2h) · Childcare routine',
    tue: 'Data collection work shift · Review fluid dynamics chapter',
    wed: 'Wind tunnel simulation analysis · Financial budget reconciliation',
    thu: 'Work-study team sync · Practice NACA airfoil problem sets',
    fri: 'Review weekly income & expense receipts · Family dinner',
    sat: 'Community volunteering · Weekend goal review & rest',
  });

  // Monthly Budget & Savings State
  const [budgetData, setBudgetData] = useState({
    income1: 2400,
    income2: 850,
    otherIncome: 300,
    rentMortgage: 1100,
    utilities: 180,
    foodGroceries: 450,
    childcare: 400,
    transportation: 250,
    savingsTarget: 500,
  });

  // Reflection Quiz State (authentic questions from Pages 15 & 22)
  const [reflections, setReflections] = useState({
    whoDoYouLove: 'My daughter and my community, who inspire me to never quit.',
    dreamLife: 'Leading innovative aeronautical systems while creating housing and financial education that frees families from poverty.',
    legacy: 'To prove that adversity is a launchpad, leaving behind lasting community institutions, generational wealth, and open doors for women in STEM.',
    mostImportant: 'Faith, family resilience, intellectual curiosity, and service to others.',
  });

  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: false,
    6: true,
    7: true,
    8: true,
  });

  const [savedNotification, setSavedNotification] = useState<string>('');

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('steareality_workbook');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.careerGoals) setCareerGoals(parsed.careerGoals);
        if (parsed.weeklySchedule) setWeeklySchedule(parsed.weeklySchedule);
        if (parsed.budgetData) setBudgetData(parsed.budgetData);
        if (parsed.reflections) setReflections(parsed.reflections);
      } catch {
        // ignore
      }
    }
  }, []);

  const handleSaveAll = () => {
    sound.playSuccess();
    const payload = {
      careerGoals,
      weeklySchedule,
      budgetData,
      reflections,
    };
    localStorage.setItem('steareality_workbook', JSON.stringify(payload));
    setSavedNotification('All workbook entries and career milestones saved locally!');
    setTimeout(() => setSavedNotification(''), 3000);
  };

  const totalIncome = budgetData.income1 + budgetData.income2 + budgetData.otherIncome;
  const totalExpenses =
    budgetData.rentMortgage +
    budgetData.utilities +
    budgetData.foodGroceries +
    budgetData.childcare +
    budgetData.transportation;
  const netSavings = totalIncome - totalExpenses;

  const assessmentQuestions = [
    'Have you fully assessed your goals and expectations for your life?',
    'Are you being the best version of yourself?',
    'Have you used information you’ve recently learned to implement changes in your life?',
    'Do you feel you have an adequate support system to complete goals?',
    'Are there any unaddressed barriers preventing you from completing goals?',
    'Are you open-minded to learning strategies and techniques to improve your progress?',
    'Are you willing to help others learn how to build generational wealth once you learn?',
    'Do you understand how education and distance learning create unlimited access to knowledge?',
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Workbook Header */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <BookOpen className="w-4 h-4" />
            <span>BETTER FOREVER · OFFICIAL EDUCATIONAL WORKBOOK</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            ABC’s of Financial Literacy &amp; Career Roadmap
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Authored by Jeanell Land · Financial Consultant &amp; Community Developer
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveAll}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save My Plan</span>
          </button>
        </div>
      </div>

      {savedNotification && (
        <div className="bg-emerald-950/80 border-b border-emerald-500/40 px-6 py-2.5 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{savedNotification}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-950/50 px-6 overflow-x-auto">
        {[
          { id: 'covers', label: 'Official Workbook Covers', icon: BookOpen },
          { id: 'career', label: '5-Year Career Plan', icon: Award },
          { id: 'weekly', label: 'Weekly Time Planner', icon: Calendar },
          { id: 'budget', label: 'Monthly Budget & Savings', icon: DollarSign },
          { id: 'reflection', label: 'Self-Assessment & Reflection', icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(tab.id as any);
              }}
              className={`flex items-center gap-2 px-4 py-3.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                isActive
                  ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-6">
        {/* Tab 0: Official Workbook Covers & Hybrid Guide */}
        {activeTab === 'covers' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wide">
                  Official Published Covers · Jeanell Land
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  The ABC's of Financial Literacy Workbook — A 6-Week Hybrid Training Guide to Financial Stability.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 shrink-0">
                A to Z in Financial Stability
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary Showcase: Official ABC Phonics & Stars Hybrid Training Guide */}
              <div className="bg-slate-950 rounded-2xl p-5 border border-amber-500/40 space-y-4 shadow-xl">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>The ABC's of Financial Literacy Workbook</span>
                  </span>
                  <span className="font-mono text-cyan-400 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
                    ABC Phonics &amp; Stars
                  </span>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-700 bg-white aspect-[16/10] flex items-center justify-center shadow-2xl">
                  <img
                    src="/assets/aistudio/IMG_4808_05d783d1.PNG"
                    alt="The ABC's of Financial Literacy Workbook - Official ABC Phonics and Stars Publication"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-1 text-xs text-slate-300">
                  <div className="font-bold text-amber-300">A 6-Week Hybrid Training Guide to Financial Stability</div>
                  <p className="text-slate-400 leading-relaxed">
                    Published author Jeanell Land's comprehensive workbook featuring AURA (AI Learning Architect), integrated TV remote navigation, touchscreen access, and weekly core modules: Finance, Credit, Invest, Budget, Savings, Taxes, and Community Rehabilitation Resources.
                  </p>
                </div>
              </div>

              {/* Multi-Platform & PWA Hybrid Access Guide */}
              <div className="bg-slate-950 rounded-2xl p-5 border border-cyan-500/40 space-y-4 flex flex-col justify-between shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold text-white flex items-center gap-2">
                      <Tv className="w-4 h-4 text-cyan-400" />
                      <span>Multi-Platform PWA &amp; Living Room Access</span>
                    </span>
                    <span className="font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                      All Platforms
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
                    <div className="font-bold text-white flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-cyan-400" />
                      <span>Progressive Web App (PWA) Cross-Platform Support</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Develop and learn seamlessly across all devices. The workbook and academy can be installed directly to home screens and desktops with offline service worker caching:
                    </p>
                    <ul className="space-y-2 text-slate-400">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span><strong>Smartphones &amp; Tablets</strong> (iOS Safari &amp; Android Chrome)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-400" />
                        <span><strong>Laptops &amp; Desktops</strong> (Windows, macOS &amp; ChromeOS)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span><strong>Smart TVs &amp; Big Screens</strong> (Living Room Touchscreen &amp; Remote)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-xs text-cyan-200">
                    <strong>Weeks 6, 7 &amp; 8 Milestones:</strong> Week 6 Final Examination leads to optional Weeks 7 &amp; 8 trade specializations (AI Training, Insurance, Real Estate, Project Management, Notary Public, and CDL Class A/B).
                  </div>
                </div>

                <div className="pt-2">
                  <PWAInstallButton />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: 5-Year Career Plan */}
        {activeTab === 'career' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  CAREER PLAN · YEAR {selectedYear}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  “Goals can be Physical, Financial, Spiritual, Educational, Marital, and Emotional.”
                </p>
              </div>

              {/* Year Selectors */}
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((y) => (
                  <button
                    key={y}
                    onClick={() => {
                      sound.playClick();
                      setSelectedYear(y);
                    }}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                      selectedYear === y
                        ? 'bg-amber-600 border-amber-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Year {y}
                  </button>
                ))}
              </div>
            </div>

            {/* Quarters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { q: 'q1', num: '01', title: 'First Quarter Goals', color: 'border-emerald-500/40 text-emerald-400' },
                { q: 'q2', num: '02', title: 'Second Quarter Goals', color: 'border-blue-500/40 text-blue-400' },
                { q: 'q3', num: '03', title: 'Third Quarter Goals', color: 'border-amber-500/40 text-amber-400' },
                { q: 'q4', num: '04', title: 'Fourth Quarter Goals', color: 'border-rose-500/40 text-rose-400' },
              ].map((item) => (
                <div key={item.q} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold bg-slate-900 border ${item.color}`}>
                      {item.num}
                    </span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{item.title}</span>
                  </div>
                  <textarea
                    rows={3}
                    value={careerGoals[String(selectedYear)]?.[item.q as 'q1'] || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCareerGoals((prev) => ({
                        ...prev,
                        [String(selectedYear)]: {
                          ...prev[String(selectedYear)],
                          [item.q]: val,
                        },
                      }));
                    }}
                    placeholder="Fill in your quarter goals..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:border-amber-500 focus:outline-none leading-relaxed resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Weekly Time Planner */}
        {activeTab === 'weekly' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                WEEKLY TIME PLANNER (MON – SAT)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Faithfully reconstructed from Page 4 of the Better Forever workbook. Time-blocking is the secret to mastering STEM while managing family duties.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { day: 'mon', label: 'Monday' },
                { day: 'tue', label: 'Tuesday' },
                { day: 'wed', label: 'Wednesday' },
                { day: 'thu', label: 'Thursday' },
                { day: 'fri', label: 'Friday' },
                { day: 'sat', label: 'Saturday' },
              ].map((d) => (
                <div key={d.day} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">{d.label}</span>
                    <span className="text-[10px] text-slate-500 font-mono">Time-Blocked</span>
                  </div>
                  <textarea
                    rows={4}
                    value={weeklySchedule[d.day as 'mon']}
                    onChange={(e) => {
                      const val = e.target.value;
                      setWeeklySchedule((prev) => ({ ...prev, [d.day]: val }));
                    }}
                    placeholder="Enter tasks, study hours, and commitments..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:border-amber-500 focus:outline-none leading-relaxed resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Monthly Budget & Savings */}
        {activeTab === 'budget' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  MONTHLY BUDGET &amp; SAVINGS TRACKER
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Page 13 &amp; 14 of the Better Forever workbook. Track every dollar to ensure assets exceed liabilities.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div>Total Inflow: <strong className="text-emerald-400 tabular-nums">${totalIncome.toLocaleString()}</strong></div>
                <div>Total Outflow: <strong className="text-amber-400 tabular-nums">${totalExpenses.toLocaleString()}</strong></div>
                <div>Net Difference: <strong className={`${netSavings >= 0 ? 'text-emerald-300' : 'text-red-400'} tabular-nums`}>${netSavings.toLocaleString()}</strong></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Income Streams */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Monthly Income Sources
                </h4>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Income 1 (Primary / Engineering / W2)</label>
                    <input
                      type="number"
                      value={budgetData.income1}
                      onChange={(e) => setBudgetData({ ...budgetData, income1: parseInt(e.target.value, 10) || 0 })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Income 2 (Real Estate / Tax Prep / Consulting)</label>
                    <input
                      type="number"
                      value={budgetData.income2}
                      onChange={(e) => setBudgetData({ ...budgetData, income2: parseInt(e.target.value, 10) || 0 })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Other Income (Dividends / Notary / Grants)</label>
                    <input
                      type="number"
                      value={budgetData.otherIncome}
                      onChange={(e) => setBudgetData({ ...budgetData, otherIncome: parseInt(e.target.value, 10) || 0 })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Expenses */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Monthly Fixed &amp; Living Expenses
                </h4>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Rent or Mortgage</span>
                    <input
                      type="number"
                      value={budgetData.rentMortgage}
                      onChange={(e) => setBudgetData({ ...budgetData, rentMortgage: parseInt(e.target.value, 10) || 0 })}
                      className="w-28 bg-slate-900 border border-slate-800 rounded p-1.5 font-mono text-right text-slate-200"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Utilities &amp; High-Speed Internet</span>
                    <input
                      type="number"
                      value={budgetData.utilities}
                      onChange={(e) => setBudgetData({ ...budgetData, utilities: parseInt(e.target.value, 10) || 0 })}
                      className="w-28 bg-slate-900 border border-slate-800 rounded p-1.5 font-mono text-right text-slate-200"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Food &amp; Groceries (Nutritious Meals)</span>
                    <input
                      type="number"
                      value={budgetData.foodGroceries}
                      onChange={(e) => setBudgetData({ ...budgetData, foodGroceries: parseInt(e.target.value, 10) || 0 })}
                      className="w-28 bg-slate-900 border border-slate-800 rounded p-1.5 font-mono text-right text-slate-200"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Childcare &amp; Youth Development</span>
                    <input
                      type="number"
                      value={budgetData.childcare}
                      onChange={(e) => setBudgetData({ ...budgetData, childcare: parseInt(e.target.value, 10) || 0 })}
                      className="w-28 bg-slate-900 border border-slate-800 rounded p-1.5 font-mono text-right text-slate-200"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Transportation / Gas / Insurance</span>
                    <input
                      type="number"
                      value={budgetData.transportation}
                      onChange={(e) => setBudgetData({ ...budgetData, transportation: parseInt(e.target.value, 10) || 0 })}
                      className="w-28 bg-slate-900 border border-slate-800 rounded p-1.5 font-mono text-right text-slate-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Reflection Quiz & Self-Assessment */}
        {activeTab === 'reflection' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                FINAL REFLECTION &amp; ASSESSMENT EXAM
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                “Unlike most exams with right and wrong answers, this exam gives you a compass to evaluate your life goals and self-motivation.” (Page 15 &amp; 20)
              </p>
            </div>

            {/* The 4 Core Soul Questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-cyan-400 block">Question 1: Who do you love?</span>
                <textarea
                  rows={3}
                  value={reflections.whoDoYouLove}
                  onChange={(e) => setReflections({ ...reflections, whoDoYouLove: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 leading-relaxed resize-none"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 block">Question 2: What does your dream life look like?</span>
                <textarea
                  rows={3}
                  value={reflections.dreamLife}
                  onChange={(e) => setReflections({ ...reflections, dreamLife: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 leading-relaxed resize-none"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 block">Question 3: What type of legacy do you want to leave behind?</span>
                <textarea
                  rows={3}
                  value={reflections.legacy}
                  onChange={(e) => setReflections({ ...reflections, legacy: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 leading-relaxed resize-none"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-rose-400 block">Question 4: What are the most important things in your life?</span>
                <textarea
                  rows={3}
                  value={reflections.mostImportant}
                  onChange={(e) => setReflections({ ...reflections, mostImportant: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-rose-500 leading-relaxed resize-none"
                />
              </div>
            </div>

            {/* Assessment Checklist (Page 22) */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                8-POINT LIFE &amp; WEALTH READINESS ASSESSMENT (PAGE 19)
              </h4>

              <div className="space-y-2">
                {assessmentQuestions.map((q, idx) => {
                  const num = idx + 1;
                  const isYes = assessmentAnswers[num];

                  return (
                    <div key={num} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/70 border border-slate-800/80 text-xs">
                      <span className="text-slate-300 pr-4">
                        <strong className="text-amber-400 mr-2 font-mono">{num}.</strong>
                        {q}
                      </span>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => {
                            sound.playClick();
                            setAssessmentAnswers({ ...assessmentAnswers, [num]: true });
                          }}
                          className={`px-3 py-1 rounded font-semibold text-xs transition-colors ${
                            isYes ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          YES
                        </button>
                        <button
                          onClick={() => {
                            sound.playClick();
                            setAssessmentAnswers({ ...assessmentAnswers, [num]: false });
                          }}
                          className={`px-3 py-1 rounded font-semibold text-xs transition-colors ${
                            !isYes ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          NO
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
