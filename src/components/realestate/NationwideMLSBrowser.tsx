import React, { useState } from 'react';
import { MLSProperty, PlayerStats, StudentProfile } from '../../types/game';
import { sound } from '../../utils/audio';
import {
  Home,
  Building,
  Search,
  DollarSign,
  CheckCircle2,
  FileText,
  Key,
  ShieldCheck,
  TrendingUp,
  X,
  ExternalLink,
} from 'lucide-react';

interface NationwideMLSBrowserProps {
  playerStats: PlayerStats;
  onUpdateStats: (delta: Partial<PlayerStats>) => void;
  profile: StudentProfile;
  onUpdateProfile: (newProfile: StudentProfile) => void;
}

export const MLS_DATABASE: MLSProperty[] = [
  // DETROIT PROPERTIES
  {
    id: 'prop_detroit_4plex',
    mlsNumber: 'MI-DTR-904812',
    title: 'Historic Boston-Edison 4-Family Brick Flat',
    address: '2240 Boston Blvd, Detroit, MI 48206',
    city: 'Detroit',
    state: 'MI',
    price: 215000,
    units: 4,
    beds: 8,
    baths: 4,
    sqft: 4200,
    grossMonthlyRent: 3800,
    capRate: 11.4,
    propertyTaxAnnual: 5160,
    insuranceAnnual: 1800,
    description:
      'Solid brick 4-unit income property in historic Detroit neighborhood. Separately metered utilities, hardwood floors, high rental demand near Woodward corridor.',
  },
  {
    id: 'prop_detroit_midtown',
    mlsNumber: 'MI-DTR-773190',
    title: 'Midtown Commercial & Loft Mixed-Use Flat',
    address: '4480 Cass Ave, Detroit, MI 48201',
    city: 'Detroit',
    state: 'MI',
    price: 360000,
    units: 3,
    beds: 4,
    baths: 3,
    sqft: 3400,
    grossMonthlyRent: 4500,
    capRate: 9.8,
    propertyTaxAnnual: 8640,
    insuranceAnnual: 2400,
    description:
      'Ground floor retail storefront plus two upper residential lofts. Walking distance to Wayne State University and Detroit Medical Center.',
  },
  {
    id: 'prop_detroit_duplex',
    mlsNumber: 'MI-DTR-602914',
    title: 'West Village Turnkey 2-Family Flat',
    address: '1420 Van Dyke St, Detroit, MI 48214',
    city: 'Detroit',
    state: 'MI',
    price: 185000,
    units: 2,
    beds: 4,
    baths: 2,
    sqft: 2400,
    grossMonthlyRent: 2400,
    capRate: 10.2,
    propertyTaxAnnual: 4440,
    insuranceAnnual: 1400,
    description:
      'Fully renovated duplex with modern kitchens, updated electrical service panels, and large fenced yard.',
  },
  // NATIONWIDE PROPERTIES
  {
    id: 'prop_atlanta_triplex',
    mlsNumber: 'GA-ATL-481920',
    title: 'West End Atlanta Brick Triplex',
    address: '890 Ralph David Abernathy Blvd, Atlanta, GA 30310',
    city: 'Atlanta',
    state: 'GA',
    price: 295000,
    units: 3,
    beds: 6,
    baths: 3,
    sqft: 3100,
    grossMonthlyRent: 3300,
    capRate: 8.9,
    propertyTaxAnnual: 4720,
    insuranceAnnual: 1950,
    description:
      'Strong rental market near Atlanta BeltLine corridor, newly installed HVAC units, prime long-term appreciation.',
  },
  {
    id: 'prop_houston_duplex',
    mlsNumber: 'TX-HOU-338291',
    title: 'Houston Heights Income Duplex',
    address: '1210 Yale St, Houston, TX 77008',
    city: 'Houston',
    state: 'TX',
    price: 260000,
    units: 2,
    beds: 4,
    baths: 2,
    sqft: 2200,
    grossMonthlyRent: 2800,
    capRate: 9.1,
    propertyTaxAnnual: 5720,
    insuranceAnnual: 2200,
    description:
      'High-growth Texas corridor, open concept floor plans, low historical vacancy with steady energy and medical tenants.',
  },
  {
    id: 'prop_chicago_2flat',
    mlsNumber: 'IL-CHI-552194',
    title: 'Bronzeville Greystone 2-Flat',
    address: '4320 S King Dr, Chicago, IL 60653',
    city: 'Chicago',
    state: 'IL',
    price: 320000,
    units: 2,
    beds: 6,
    baths: 2,
    sqft: 2800,
    grossMonthlyRent: 3200,
    capRate: 8.5,
    propertyTaxAnnual: 6400,
    insuranceAnnual: 1900,
    description:
      'Classic historic Chicago Greystone with high ceilings, separate central heat, near transit train lines.',
  },
];

export const NationwideMLSBrowser: React.FC<NationwideMLSBrowserProps> = ({
  playerStats,
  onUpdateStats,
  profile,
  onUpdateProfile,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPropForPurchase, setSelectedPropForPurchase] = useState<MLSProperty | null>(null);
  const [financingType, setFinancingType] = useState<'naca' | 'fha' | 'conventional'>('naca');
  const [purchaseNotice, setPurchaseNotice] = useState<string>('');

  const ownedIds = profile.ownedPropertyIds || [];
  const ownedProperties = MLS_DATABASE.filter((p) => ownedIds.includes(p.id));

  const cities = ['All', 'Detroit', 'Atlanta', 'Houston', 'Chicago'];

  const filteredProperties = MLS_DATABASE.filter((p) => {
    const matchesCity = selectedCity === 'All' || p.city === selectedCity;
    const matchesQuery =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.mlsNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesQuery;
  });

  // Calculate Portfolio Income
  const totalMonthlyPortfolioRent = ownedProperties.reduce((acc, p) => acc + p.grossMonthlyRent, 0);

  const handlePurchase = (prop: MLSProperty) => {
    const earnestDeposit = Math.round(prop.price * 0.015); // 1.5% EMD
    const downPayment = financingType === 'naca' ? 0 : financingType === 'fha' ? prop.price * 0.035 : prop.price * 0.2;
    const totalCashNeeded = earnestDeposit + downPayment;

    if ((playerStats.earningsBalance || 0) < totalCashNeeded) {
      sound.playAlert();
      setPurchaseNotice(
        `Insufficient Funds for Closing Escrow: Requires $${totalCashNeeded.toLocaleString()} (Wallet: $${playerStats.earningsBalance || 0}). Earn commissions in Trade Arena or Virtual Interviews!`
      );
      setTimeout(() => setPurchaseNotice(''), 5000);
      return;
    }

    sound.playSuccess();
    const updatedOwned = [...ownedIds, prop.id];
    onUpdateProfile({
      ...profile,
      ownedPropertyIds: updatedOwned,
    });

    onUpdateStats({
      financialAcumen: 35,
      communityLegacy: 25,
      earningsBalance: -totalCashNeeded,
    });

    setSelectedPropForPurchase(null);
    setPurchaseNotice(
      `Escrow Closed! Congratulations on acquiring ${prop.title} on MLS! Generating +$${prop.grossMonthlyRent}/mo in rental equity.`
    );
    setTimeout(() => setPurchaseNotice(''), 6000);
  };

  const handleCollectCashflow = () => {
    if (totalMonthlyPortfolioRent <= 0) return;
    sound.playSuccess();
    onUpdateStats({
      earningsBalance: totalMonthlyPortfolioRent,
      financialAcumen: 10,
    });
    setPurchaseNotice(`Collected $${totalMonthlyPortfolioRent.toLocaleString()} monthly cashflow into your wallet!`);
    setTimeout(() => setPurchaseNotice(''), 4000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-amber-500/50 bg-white p-1 shadow-lg shrink-0 hidden sm:block">
            <img
              src="/assets/aistudio/All_Your_Needs_Broker_Jeanell_Land_logo_eee8bd91.png"
              alt="All Your Needs Reality LLC Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-amber-400">
              <Home className="w-4 h-4 text-amber-400" />
              <span className="font-mono uppercase tracking-wide">ALL YOUR NEEDS REALITY LLC · REAL ESTATE BROKERAGE</span>
              <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/50 text-[10px] font-mono">
                BROKER / PRINCIPAL: JEANELL LAND
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              Multiple Listing Service (MLS) Property Marketplace
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Official real estate brokerage led by <strong className="text-amber-300">Jeanell Land, Broker/Principal</strong> (State of Michigan License #6504432062 · EIN: 93-3773484 · Detroit, Michigan).
            </p>
          </div>
        </div>

        {/* Portfolio Cashflow Collector */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-950 px-3.5 py-1.5 rounded-lg border border-slate-800 text-xs">
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Portfolio Rent</span>
            <span className="text-emerald-400 font-bold font-mono tabular-nums">
              +${totalMonthlyPortfolioRent.toLocaleString()}/mo
            </span>
          </div>

          {totalMonthlyPortfolioRent > 0 && (
            <button
              onClick={handleCollectCashflow}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Collect Rent Cashflow
            </button>
          )}
        </div>
      </div>

      {/* Official Brokerage Verification Bar */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-4 text-slate-300">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white">Brokerage:</span>
            <span className="text-amber-300 font-semibold">All Your Needs Reality LLC</span>
          </div>
          <span className="text-slate-600 hidden md:inline">|</span>
          <div>
            <span className="text-slate-400">Principal Broker:</span>{' '}
            <span className="font-bold text-white">Jeanell Land (Broker/Principal)</span>
          </div>
          <span className="text-slate-600 hidden md:inline">|</span>
          <div className="font-mono text-cyan-400">
            <span>MI License: #6504432062 (Exp: 08/06/2028)</span>
          </div>
          <span className="text-slate-600 hidden md:inline">|</span>
          <div className="font-mono text-slate-300">
            <span>EIN: 93-3773484</span>
          </div>
        </div>
        <div className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-600/40">
          DAR REALTOR® AFFILIATED · DETROIT, MI
        </div>
      </div>

      {purchaseNotice && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{purchaseNotice}</span>
        </div>
      )}

      {/* Search & City Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search MLS#, address, city, or property type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => {
                sound.playClick();
                setSelectedCity(city);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                selectedCity === city
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProperties.map((prop) => {
          const isOwned = ownedIds.includes(prop.id);

          return (
            <div
              key={prop.id}
              className={`p-5 rounded-xl border flex flex-col justify-between transition-all space-y-4 ${
                isOwned
                  ? 'bg-slate-950 border-emerald-500/50 ring-1 ring-emerald-500/30'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-mono text-cyan-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    MLS: {prop.mlsNumber}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-600/30">
                    Cap Rate: {prop.capRate}%
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white leading-snug">{prop.title}</h3>
                  <span className="text-xs text-slate-400">{prop.address}</span>
                </div>

                <div className="text-lg font-bold text-white font-mono">
                  ${prop.price.toLocaleString()}
                </div>

                <div className="grid grid-cols-3 gap-1.5 text-center text-[11px] font-mono bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase">Units</span>
                    <span className="text-slate-200 font-bold">{prop.units}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase">Sqft</span>
                    <span className="text-slate-200 font-bold">{prop.sqft}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase">Gross Rent</span>
                    <span className="text-emerald-400 font-bold">${prop.grossMonthlyRent}/mo</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {prop.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800">
                {isOwned ? (
                  <div className="flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 rounded-lg border border-emerald-500/30">
                    <Key className="w-4 h-4" />
                    <span>Deed Owned · Generating Monthly Rent</span>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      sound.playClick();
                      setSelectedPropForPurchase(prop);
                    }}
                    className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>Structure Purchase Offer</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Escrow Purchase Modal */}
      {selectedPropForPurchase && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 block mb-0.5">
                  MLS CONTRACT ESCROW · {selectedPropForPurchase.mlsNumber}
                </span>
                <h3 className="text-base font-bold text-white">{selectedPropForPurchase.title}</h3>
                <span className="text-xs text-slate-400">{selectedPropForPurchase.address}</span>
              </div>
              <button
                onClick={() => setSelectedPropForPurchase(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Purchase Breakdown */}
            <div className="space-y-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center text-slate-300">
                <span>Agreed Purchase Price:</span>
                <strong className="text-white font-mono">${selectedPropForPurchase.price.toLocaleString()}</strong>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Select Financing Structure:</label>
                <select
                  value={financingType}
                  onChange={(e) => setFinancingType(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200"
                >
                  <option value="naca">N.A.C.A. Community Mortgage (0% Down · 4.5% Fixed Rate)</option>
                  <option value="fha">F.H.A. Loan (3.5% Down · 5.5% Fixed Rate)</option>
                  <option value="conventional">Conventional Commercial (20% Down · 6.5% Fixed Rate)</option>
                </select>
              </div>

              <div className="pt-2 border-t border-slate-800/80 space-y-1 font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Earnest Money Deposit (1.5% EMD):</span>
                  <span>${Math.round(selectedPropForPurchase.price * 0.015).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Down Payment Due at Closing:</span>
                  <span>
                    ${financingType === 'naca'
                      ? '0 (NACA No-Down)'
                      : (
                          selectedPropForPurchase.price * (financingType === 'fha' ? 0.035 : 0.2)
                        ).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-emerald-400 font-bold pt-1 border-t border-slate-800">
                  <span>Total Escrow Cash Due from Wallet:</span>
                  <span>
                    ${(
                      Math.round(selectedPropForPurchase.price * 0.015) +
                      (financingType === 'naca'
                        ? 0
                        : selectedPropForPurchase.price * (financingType === 'fha' ? 0.035 : 0.2))
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setSelectedPropForPurchase(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handlePurchase(selectedPropForPurchase)}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Sign Purchase Agreement &amp; Close Escrow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
