import React, { useState } from 'react';
import { ShopItem, PlayerStats, StudentProfile } from '../../types/game';
import { sound } from '../../utils/audio';
import {
  Store,
  DollarSign,
  ShoppingBag,
  CheckCircle2,
  Sparkles,
  Shield,
  Briefcase,
  Wrench,
  BookOpen,
  Heart,
} from 'lucide-react';

interface CityShopProps {
  playerStats: PlayerStats;
  onUpdateStats: (delta: Partial<PlayerStats>) => void;
  profile: StudentProfile;
  onUpdateProfile: (newProfile: StudentProfile) => void;
}

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'item_blazer',
    name: 'Executive Interview Blazer & Attire',
    category: 'Professional Attire',
    price: 180,
    description: 'Crisp navy blazer and professional portfolio designed for corporate aerospace & banking interviews.',
    perkDescription: '+15% First Impression & Professionalism bonus during Virtual Zoom Interviews.',
    statBonus: { resilience: 10, kindnessPoints: 10 },
  },
  {
    id: 'item_multimeter',
    name: 'Industrial Electrical Digital Multimeter',
    category: 'Engineering Equipment',
    price: 140,
    description: 'True-RMS diagnostic meter with safety probes to test GFCI breaker loads and voltage continuity.',
    perkDescription: '+15% Accuracy boost in Vocational Electrical trade simulations.',
    statBonus: { steamMastery: 20 },
  },
  {
    id: 'item_plumbing_kit',
    name: 'Professional P-Trap & Pipe Wrench Toolkit',
    category: 'Engineering Equipment',
    price: 110,
    description: 'Precision adjustable wrench, Teflon thread tape, and rubber beveled washers for sink assembly.',
    perkDescription: '+15% Speed & leak diagnostic precision in Plumbing assessments.',
    statBonus: { steamMastery: 15 },
  },
  {
    id: 'item_workbook_physical',
    name: 'Better Forever: ABC’s of Financial Literacy (Hardcover)',
    category: 'Study Materials',
    price: 35,
    description: 'Authored by Jeanell Land: 5-year career planners, savings trackers, and complete A-Z wealth terms.',
    perkDescription: '+25 Financial Acumen & permanent lifetime reference.',
    statBonus: { financialAcumen: 25, resilience: 10 },
  },
  {
    id: 'item_calculus_codex',
    name: 'Navier-Stokes & Aerospace Aerodynamics Manual',
    category: 'Study Materials',
    price: 75,
    description: 'Advanced fluid mechanics, airfoil boundary layer equations, and rocket propulsion staging guides.',
    perkDescription: '+20 S.T.E.A.M. Mastery & +1.5° wind tunnel stall margin.',
    statBonus: { steamMastery: 20 },
  },
  {
    id: 'item_pantry_donation',
    name: '50 Family Food & Hygiene Care Package',
    category: 'Community Aid',
    price: 250,
    description: 'Nutritious meals, infant supplies, and warm blankets for One Stop Rehabilitation Center shelter families.',
    perkDescription: '+35 Community Legacy & +25 Kindness rating across Detroit.',
    statBonus: { communityLegacy: 35, kindnessPoints: 25, resilience: 15 },
  },
];

export const CityShop: React.FC<CityShopProps> = ({
  playerStats,
  onUpdateStats,
  profile,
  onUpdateProfile,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [purchaseNotice, setPurchaseNotice] = useState<string>('');

  const inventory = profile.inventory || [];

  const categories = ['All', 'Professional Attire', 'Engineering Equipment', 'Study Materials', 'Community Aid'];

  const filteredItems = SHOP_ITEMS.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  const handleBuy = (item: ShopItem) => {
    if ((playerStats.earningsBalance || 0) < item.price) {
      sound.playAlert();
      setPurchaseNotice(`Insufficient Funds: You need $${item.price} (Balance: $${playerStats.earningsBalance || 0}). Complete trade levels or contracts to earn commissions!`);
      setTimeout(() => setPurchaseNotice(''), 4000);
      return;
    }

    sound.playSuccess();
    const updatedInv = [...inventory, item.id];
    onUpdateProfile({
      ...profile,
      inventory: updatedInv,
    });

    onUpdateStats({
      ...item.statBonus,
      earningsBalance: -item.price,
    });

    setPurchaseNotice(`Purchased ${item.name}! ${item.perkDescription}`);
    setTimeout(() => setPurchaseNotice(''), 4000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <Store className="w-4 h-4" />
            <span>DETROIT CITY COMMERCE &amp; TRADE SUPPLY</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">
            Life Skills, Interview Attire &amp; Tool Marketplace
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Equip yourself with interview clothing, diagnostic tools, the Better Forever workbook, or donate to community shelters.
          </p>
        </div>

        {/* Current Balance */}
        <div className="bg-slate-950 px-4 py-2 rounded-xl border border-emerald-500/50 flex items-center gap-3">
          <DollarSign className="w-5 h-5 text-emerald-400" />
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Available Wallet</span>
            <span className="text-base font-bold text-emerald-400 font-mono tabular-nums">
              ${(playerStats.earningsBalance || 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {purchaseNotice && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{purchaseNotice}</span>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              sound.playClick();
              setSelectedCategory(cat);
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Shop Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const isOwned = inventory.includes(item.id);

          return (
            <div
              key={item.id}
              className={`p-5 rounded-xl border space-y-3 flex flex-col justify-between transition-all ${
                isOwned
                  ? 'bg-slate-950 border-emerald-500/40 opacity-90'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {item.category}
                  </span>
                  <span className="text-sm font-bold text-emerald-400 font-mono tabular-nums">
                    ${item.price}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white leading-snug">{item.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-cyan-300">
                  ⚡ <strong>Perk:</strong> {item.perkDescription}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800">
                {isOwned ? (
                  <div className="flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 rounded-lg border border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>In Inventory / Equipped</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleBuy(item)}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Purchase for ${item.price}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
