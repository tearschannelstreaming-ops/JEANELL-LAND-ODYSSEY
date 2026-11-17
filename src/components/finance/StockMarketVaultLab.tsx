import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PiggyBank,
  LineChart,
  Sparkles,
  Zap,
  ArrowRight,
  Shield,
  Award,
  AlertCircle,
  CheckCircle2,
  Lock,
  Unlock,
  Radio,
  RefreshCw,
  Bell,
  Scale,
  Compass,
} from 'lucide-react';
import { MarketStock, PlayerStats, PlayerPortfolioHolding, StockPredictionRound } from '../../types/game';
import { INITIAL_STOCKS, STOCK_PREDICTION_ROUNDS } from '../../data/stockMarketData';
import { sound } from '../../utils/audio';

interface StockMarketVaultLabProps {
  playerStats: PlayerStats;
  onUpdateStats: (delta: Partial<PlayerStats>) => void;
  onNavigateToTab?: (tab: string) => void;
  onTriggerNotification?: (title: string, message: string) => void;
}

export const StockMarketVaultLab: React.FC<StockMarketVaultLabProps> = ({
  playerStats,
  onUpdateStats,
  onNavigateToTab,
  onTriggerNotification,
}) => {
  // Navigation tabs within lab
  const [activeTab, setActiveTab] = useState<'savings' | 'prediction' | 'phaseTwo'>('savings');

  // Savings Account state
  const [savingsBalance, setSavingsBalance] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('steareality_savings_balance');
      return saved ? parseFloat(saved) : 1200;
    } catch {
      return 1200;
    }
  });
  const [depositAmount, setDepositAmount] = useState<string>('250');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('100');

  // Stock Market stocks state
  const [stocks, setStocks] = useState<MarketStock[]>(INITIAL_STOCKS);
  const [portfolio, setPortfolio] = useState<PlayerPortfolioHolding[]>(() => {
    try {
      const saved = localStorage.getItem('steareality_portfolio');
      return saved ? JSON.parse(saved) : [{ symbol: 'AERO', shares: 5, avgBuyPrice: 135 }];
    } catch {
      return [{ symbol: 'AERO', shares: 5, avgBuyPrice: 135 }];
    }
  });

  // Stock Prediction Game state
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
  const [predictionWager, setPredictionWager] = useState<number>(100);
  const [roundResult, setRoundResult] = useState<{
    guessed: 'bullish' | 'bearish';
    isCorrect: boolean;
    payout: number;
    explanation: string;
  } | null>(null);

  // Phase Two Launch Trigger state
  const [isPhaseTwoUnlocked, setIsPhaseTwoUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('steareality_phase_two_market') === 'true';
    } catch {
      return false;
    }
  });
  const [liveOrderQuantity, setLiveOrderQuantity] = useState<number>(1);
  const [selectedStockSymbol, setSelectedStockSymbol] = useState<string>('AERO');

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('steareality_savings_balance', savingsBalance.toString());
  }, [savingsBalance]);

  useEffect(() => {
    localStorage.setItem('steareality_portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  // Periodic interest accrual simulation (4.5% APY simulated every 30s)
  useEffect(() => {
    const interval = setInterval(() => {
      if (savingsBalance > 0) {
        const interest = +(savingsBalance * 0.0005).toFixed(2);
        setSavingsBalance((prev) => +(prev + interest).toFixed(2));
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [savingsBalance]);

  // Handlers for Savings
  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) return;
    if (playerStats.earningsBalance < amount) {
      sound.playAlert();
      return;
    }

    sound.playSuccess();
    setSavingsBalance((prev) => +(prev + amount).toFixed(2));
    onUpdateStats({
      earningsBalance: -amount,
      financialAcumen: 5,
      resilience: 3,
    });
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0 || amount > savingsBalance) {
      sound.playAlert();
      return;
    }

    sound.playClick();
    setSavingsBalance((prev) => +(prev - amount).toFixed(2));
    onUpdateStats({
      earningsBalance: amount,
    });
  };

  // Prediction Game Handler
  const currentRound = STOCK_PREDICTION_ROUNDS[currentRoundIndex] || STOCK_PREDICTION_ROUNDS[0];

  const handleGuess = (guess: 'bullish' | 'bearish') => {
    if (playerStats.earningsBalance < predictionWager) {
      sound.playAlert();
      return;
    }

    const isCorrect = guess === currentRound.actualTrend;
    const payout = isCorrect ? Math.round(predictionWager * currentRound.payoutMultiplier) : 0;

    if (isCorrect) {
      sound.playSuccess();
      onUpdateStats({
        earningsBalance: payout - predictionWager,
        financialAcumen: 12,
        resilience: 8,
      });
    } else {
      sound.playAlert();
      onUpdateStats({
        earningsBalance: -predictionWager,
        financialAcumen: 2,
      });
    }

    setRoundResult({
      guessed: guess,
      isCorrect,
      payout: isCorrect ? payout : -predictionWager,
      explanation: currentRound.explanation,
    });
  };

  const handleNextRound = () => {
    sound.playClick();
    setRoundResult(null);
    setCurrentRoundIndex((prev) => (prev + 1) % STOCK_PREDICTION_ROUNDS.length);
  };

  // Trigger Phase Two Launch
  const handleTriggerPhaseTwo = () => {
    sound.playMantraChime();
    setIsPhaseTwoUnlocked(true);
    localStorage.setItem('steareality_phase_two_market', 'true');

    onUpdateStats({
      financialAcumen: 25,
      resilience: 20,
    });

    if (onTriggerNotification) {
      onTriggerNotification(
        'Phase Two Launch Triggered: Real Stock Market Trading Live',
        'Congratulations! You have unlocked Phase Two live simulated order routing, portfolio equity charting, and real-time stock execution.'
      );
    }
  };

  // Buy stock in Phase Two
  const handleBuyStock = (stock: MarketStock) => {
    const cost = stock.currentPrice * liveOrderQuantity;
    if (playerStats.earningsBalance < cost) {
      sound.playAlert();
      return;
    }

    sound.playSuccess();
    onUpdateStats({
      earningsBalance: -cost,
      financialAcumen: 8,
    });

    setPortfolio((prev) => {
      const existing = prev.find((p) => p.symbol === stock.symbol);
      if (existing) {
        const totalCost = existing.shares * existing.avgBuyPrice + cost;
        const totalShares = existing.shares + liveOrderQuantity;
        return prev.map((p) =>
          p.symbol === stock.symbol
            ? { ...p, shares: totalShares, avgBuyPrice: +(totalCost / totalShares).toFixed(2) }
            : p
        );
      }
      return [...prev, { symbol: stock.symbol, shares: liveOrderQuantity, avgBuyPrice: stock.currentPrice }];
    });
  };

  // Sell stock in Phase Two
  const handleSellStock = (stock: MarketStock) => {
    const holding = portfolio.find((p) => p.symbol === stock.symbol);
    if (!holding || holding.shares < liveOrderQuantity) {
      sound.playAlert();
      return;
    }

    sound.playSuccess();
    const proceeds = stock.currentPrice * liveOrderQuantity;
    onUpdateStats({
      earningsBalance: proceeds,
      financialAcumen: 5,
    });

    setPortfolio((prev) =>
      prev
        .map((p) => {
          if (p.symbol === stock.symbol) {
            return { ...p, shares: p.shares - liveOrderQuantity };
          }
          return p;
        })
        .filter((p) => p.shares > 0)
    );
  };

  // Portfolio total value
  const totalPortfolioValue = portfolio.reduce((acc, h) => {
    const current = stocks.find((s) => s.symbol === h.symbol)?.currentPrice || h.avgBuyPrice;
    return acc + current * h.shares;
  }, 0);

  const selectedStock = stocks.find((s) => s.symbol === selectedStockSymbol) || stocks[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 pb-16 animate-fadeIn">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-950 via-emerald-950/40 to-slate-950 border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <PiggyBank className="w-3.5 h-3.5 text-emerald-400" />
              Wealth Acumen &amp; Capital Growth Lab
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Savings Vault, Market Predictions &amp; Phase Two Trading
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Earn money by solving engineering challenges and completing levels. Save into compound-interest accounts,
              predict stock trends from real-world market catalysts, and trigger the Phase Two real stock market trading launch!
            </p>
          </div>

          {/* Player Balance Card */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 shrink-0 max-w-sm w-full space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Liquid Cash Balance:</span>
              <span className="font-mono text-emerald-400 font-bold text-base">
                ${playerStats.earningsBalance.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Savings Vault (4.5% APY):</span>
              <span className="font-mono text-cyan-400 font-bold">
                ${savingsBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-2">
              <span>Total Net Worth:</span>
              <span className="font-mono text-amber-300 font-bold text-sm">
                ${(playerStats.earningsBalance + savingsBalance + totalPortfolioValue).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-800/80 overflow-x-auto pb-1">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('savings');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'savings'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <PiggyBank className="w-4 h-4" />
            <span>Savings Vault (+Acumen &amp; Interest)</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('prediction');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'prediction'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <LineChart className="w-4 h-4" />
            <span>Market Guessing Game (+Cash &amp; Resilience)</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('phaseTwo');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'phaseTwo'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Phase Two: Live Stock Market Trading</span>
            {isPhaseTwoUnlocked ? (
              <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded text-[9px]">
                ACTIVE
              </span>
            ) : (
              <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded text-[9px]">
                READY TO TRIGGER
              </span>
            )}
          </button>
        </div>
      </div>

      {/* TAB 1: SAVINGS VAULT */}
      {activeTab === 'savings' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <PiggyBank className="w-5 h-5 text-emerald-400" />
                  <span>Compound Interest Emergency Vault</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Depositing money earned by completing levels earns Financial Acumen points and 4.5% annual yield.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                4.50% APY
              </span>
            </div>

            {/* Deposit Box */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Deposit Level Earnings to Vault
              </label>
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white font-mono"
                    placeholder="Amount to save"
                  />
                </div>
                <button
                  onClick={handleDeposit}
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Save &amp; Gain Acumen
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                Bonus: +5 Financial Acumen &amp; +3 Resilience points on every deposit milestone!
              </p>
            </div>

            {/* Withdraw Box */}
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Withdraw Cash from Vault
              </label>
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white font-mono"
                    placeholder="Amount to withdraw"
                  />
                </div>
                <button
                  onClick={handleWithdraw}
                  className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Withdraw Cash
                </button>
              </div>
            </div>
          </div>

          {/* Savings Educational Sidebar */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Jeanell Land's Rule of Financial Defense</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                “When I was braiding hair and driving that cab in Detroit, every dollar not saved was an emergency waiting to happen.
                Saving your first $1,000 creates psychological armor against street panic.”
              </p>
              <div className="p-3 bg-slate-900 rounded-xl text-xs font-mono text-emerald-300 border border-emerald-500/20">
                Emergency Buffer: 3–6 Months Living Expenses
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MARKET GUESSING GAME */}
      {activeTab === 'prediction' && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400">Round {currentRoundIndex + 1} of {STOCK_PREDICTION_ROUNDS.length}</span>
              <h2 className="text-xl font-black text-white">Stock Market Trend Prediction Game</h2>
              <p className="text-xs text-slate-400 mt-1">
                Analyze real-world corporate news catalysts to guess whether the stock will rise (Bullish) or drop (Bearish).
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-xs text-slate-400">
                Wager:
                <select
                  value={predictionWager}
                  onChange={(e) => setPredictionWager(parseInt(e.target.value))}
                  className="ml-2 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-mono text-xs"
                >
                  <option value={50}>$50</option>
                  <option value={100}>$100</option>
                  <option value={250}>$250</option>
                  <option value={500}>$500</option>
                </select>
              </div>
            </div>
          </div>

          {/* Scenario News Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border-2 border-cyan-500/30 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs border border-cyan-500/40">
                Ticker: {currentRound.stockSymbol}
              </span>
              <span className="text-xs text-amber-300 font-mono">
                Payout Multiplier: {currentRound.payoutMultiplier}x
              </span>
            </div>

            <h3 className="text-lg font-bold text-white leading-snug">
              “{currentRound.headlineNews}”
            </h3>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
              <strong className="text-cyan-400 block mb-1">Market Analyst Clue:</strong>
              {currentRound.marketClue}
            </div>

            {/* Guessing Buttons */}
            {!roundResult ? (
              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  onClick={() => handleGuess('bullish')}
                  className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>Predict Bullish (Price Up)</span>
                </button>
                <button
                  onClick={() => handleGuess('bearish')}
                  className="py-3 px-4 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <TrendingDown className="w-5 h-5" />
                  <span>Predict Bearish (Price Down)</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4 pt-2 animate-fadeIn">
                <div
                  className={`p-4 rounded-xl border flex items-start gap-3 ${
                    roundResult.isCorrect
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                      : 'bg-rose-950/60 border-rose-500/50 text-rose-200'
                  }`}
                >
                  {roundResult.isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <div className="font-bold text-sm">
                      {roundResult.isCorrect
                        ? `Correct Prediction! You earned +$${roundResult.payout} cash, +12 Acumen, +8 Resilience!`
                        : `Prediction Missed. You lost $${Math.abs(roundResult.payout)}.`}
                    </div>
                    <p className="text-xs opacity-90 leading-relaxed">{roundResult.explanation}</p>
                  </div>
                </div>

                <button
                  onClick={handleNextRound}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Next Market Scenario →</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: PHASE TWO REAL STOCK MARKET TRADING */}
      {activeTab === 'phaseTwo' && (
        <div className="space-y-6">
          {/* Phase Two Launch Trigger Card */}
          <div className="bg-gradient-to-r from-amber-950/60 via-slate-950 to-slate-950 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/40">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Phase Two Production Feature
                </div>
                <h2 className="text-2xl font-black text-white">
                  Real Stock Market Trading Portal
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Phase Two connects players to simulated real-market order execution, real-time aerospace/energy equities,
                  and live portfolio management with SEC and FINRA educational compliance.
                </p>
              </div>

              {!isPhaseTwoUnlocked ? (
                <button
                  onClick={handleTriggerPhaseTwo}
                  className="px-6 py-3.5 bg-gradient-to-r from-amber-500 via-rose-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-xl transition-all cursor-pointer flex items-center gap-2 shrink-0 animate-pulse"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Trigger Phase Two Launch</span>
                </button>
              ) : (
                <div className="px-5 py-2.5 bg-emerald-950 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Phase Two Trading Active</span>
                </div>
              )}
            </div>
          </div>

          {/* Active Live Market Dashboard */}
          {isPhaseTwoUnlocked && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Equities List */}
              <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between">
                  <span>Phase Two Live Equities Feed</span>
                  <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Market Open
                  </span>
                </h3>

                <div className="space-y-3">
                  {stocks.map((stock) => {
                    const isSelected = selectedStockSymbol === stock.symbol;
                    const isPositive = stock.dailyChangePercent >= 0;

                    return (
                      <div
                        key={stock.symbol}
                        onClick={() => setSelectedStockSymbol(stock.symbol)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-slate-900 border-amber-500 shadow-md ring-1 ring-amber-500/40'
                            : 'bg-slate-950 hover:bg-slate-900/60 border-slate-800'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-white text-sm">{stock.symbol}</span>
                            <span className="text-xs text-slate-400 truncate max-w-xs">{stock.companyName}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 uppercase">{stock.sector}</span>
                        </div>

                        <div className="text-right space-y-0.5">
                          <div className="font-mono font-bold text-white text-sm">
                            ${stock.currentPrice.toFixed(2)}
                          </div>
                          <div className={`text-xs font-mono font-semibold flex items-center justify-end gap-1 ${
                            isPositive ? 'text-emerald-400' : 'text-rose-400'
                          }`}>
                            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            <span>{isPositive ? '+' : ''}{stock.dailyChangePercent}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Execution Terminal */}
              <div className="lg:col-span-4 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5">
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Order Terminal</span>
                  <h4 className="text-base font-bold text-white">{selectedStock.symbol} · {selectedStock.companyName}</h4>
                  <div className="text-xs text-slate-400 mt-1">Current Price: ${selectedStock.currentPrice.toFixed(2)}</div>
                </div>

                <div className="space-y-3 text-xs">
                  <label className="block text-slate-400 font-bold uppercase tracking-wider">Number of Shares</label>
                  <div className="flex items-center gap-2">
                    {[1, 5, 10, 25].map((qty) => (
                      <button
                        key={qty}
                        onClick={() => setLiveOrderQuantity(qty)}
                        className={`px-3 py-1.5 rounded-lg font-mono font-bold transition-colors cursor-pointer ${
                          liveOrderQuantity === qty
                            ? 'bg-cyan-500 text-slate-950'
                            : 'bg-slate-900 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {qty} sh
                      </button>
                    ))}
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl text-slate-300 space-y-1 font-mono text-xs">
                    <div className="flex justify-between">
                      <span>Order Total:</span>
                      <span className="text-white font-bold">${(selectedStock.currentPrice * liveOrderQuantity).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => handleBuyStock(selectedStock)}
                      className="py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Buy {selectedStock.symbol}
                    </button>
                    <button
                      onClick={() => handleSellStock(selectedStock)}
                      className="py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Sell {selectedStock.symbol}
                    </button>
                  </div>
                </div>

                {/* Portfolio Summary */}
                <div className="border-t border-slate-800 pt-4 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Your Holdings</div>
                  {portfolio.length === 0 ? (
                    <div className="text-xs text-slate-500 italic">No shares owned yet.</div>
                  ) : (
                    portfolio.map((h) => (
                      <div key={h.symbol} className="flex justify-between text-xs font-mono">
                        <span className="text-slate-300">{h.shares}x {h.symbol}</span>
                        <span className="text-emerald-400 font-bold">Avg ${h.avgBuyPrice.toFixed(2)}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
