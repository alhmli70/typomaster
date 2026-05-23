import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RefreshCw, ArrowLeftRight, Copy, Check, Search, Calendar, Settings, DollarSign, TrendingUp, Clock, Globe, ChevronDown, ExternalLink } from 'lucide-react';

const API_BASE = 'https://api.frankfurter.app';

interface CurrencyData {
  [code: string]: string;
}

interface RateData {
  [code: string]: number;
}

interface HistoryEntry {
  date: string;
  rate: number;
  change?: string;
}

const FALLBACK_RATES: RateData = {
  USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.5, CHF: 0.88, CAD: 1.36,
  AUD: 1.54, CNY: 7.24, INR: 83.12, MXN: 17.15, BRL: 4.97, KRW: 1325,
  SEK: 10.45, NOK: 10.65, DKK: 6.87, NZD: 1.63, SAR: 3.75, AED: 3.67,
  TRY: 30.85, ZAR: 18.75, SGD: 1.34, HKD: 7.82, MYR: 4.72, THB: 35.5,
  PLN: 4.02, CZK: 22.85, HUF: 358, ILS: 3.65, CLP: 960, PHP: 56.2,
  IDR: 15650, EGP: 30.9
};

const FALLBACK_CURRENCIES: CurrencyData = {
  USD: 'US Dollar', EUR: 'Euro', GBP: 'British Pound', JPY: 'Japanese Yen',
  CHF: 'Swiss Franc', CAD: 'Canadian Dollar', AUD: 'Australian Dollar',
  CNY: 'Chinese Yuan', INR: 'Indian Rupee', MXN: 'Mexican Peso',
  BRL: 'Brazilian Real', KRW: 'South Korean Won', SEK: 'Swedish Krona',
  NOK: 'Norwegian Krone', DKK: 'Danish Krone', NZD: 'New Zealand Dollar',
  SAR: 'Saudi Riyal', AED: 'UAE Dirham', TRY: 'Turkish Lira',
  ZAR: 'South African Rand', SGD: 'Singapore Dollar', HKD: 'Hong Kong Dollar',
  MYR: 'Malaysian Ringgit', THB: 'Thai Baht', PLN: 'Polish Zloty',
  CZK: 'Czech Koruna', HUF: 'Hungarian Forint', ILS: 'Israeli Shekel',
  CLP: 'Chilean Peso', PHP: 'Philippine Peso', IDR: 'Indonesian Rupiah',
  EGP: 'Egyptian Pound'
};

type TabType = 'convert' | 'rates' | 'history' | 'settings';

export const CurrencyConverter = () => {
  const [activeTab, setActiveTab] = useState<TabType>('convert');
  const [currencies, setCurrencies] = useState<CurrencyData>({});
  const [rates, setRates] = useState<RateData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isOnline, setIsOnline] = useState(true);

  const [amount, setAmount] = useState('1.00');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const [historyFrom, setHistoryFrom] = useState('USD');
  const [historyTo, setHistoryTo] = useState('EUR');
  const [historyData, setHistoryData] = useState<HistoryEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyDays, setHistoryDays] = useState(30);

  const [decimalPlaces, setDecimalPlaces] = useState(4);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const sortedCodes = Object.keys(currencies).sort();
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchCurrencies = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/currencies`);
      if (!res.ok) throw new Error('Failed to fetch currencies');
      const data = await res.json();
      setCurrencies(data);
      return data;
    } catch {
      setCurrencies(FALLBACK_CURRENCIES);
      return FALLBACK_CURRENCIES;
    }
  }, []);

  const fetchRates = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/latest?from=USD`, { signal });
      if (!res.ok) throw new Error('Failed to fetch rates');
      const data = await res.json();
      const newRates: RateData = { USD: 1, ...data.rates };
      setRates(newRates);
      setLastUpdate(new Date());
      setIsOnline(true);
      return newRates;
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      setIsOnline(false);
      setRates(FALLBACK_RATES);
      setError('Using offline rates — API unreachable');
      return FALLBACK_RATES;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const abort = new AbortController();
    const init = async () => {
      await fetchCurrencies();
      await fetchRates(abort.signal);
    };
    init();
    return () => abort.abort();
  }, [fetchCurrencies, fetchRates]);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => fetchRates(), 300000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchRates]);

  const getRate = useCallback((from: string, to: string): number | null => {
    if (from === to) return 1;
    const rFrom = rates[from];
    const rTo = rates[to];
    if (!rFrom || !rTo) return null;
    return rTo / rFrom;
  }, [rates]);

  const doConvert = useCallback(() => {
    const amt = parseFloat(amount.replace(',', '.'));
    if (isNaN(amt) || amt <= 0) { setResult(null); return; }
    const rate = getRate(fromCurrency, toCurrency);
    if (rate === null) { setResult('N/A'); return; }
    setResult((amt * rate).toFixed(decimalPlaces));
  }, [amount, fromCurrency, toCurrency, getRate, decimalPlaces]);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(doConvert, 300);
    return () => { if (debounceTimer.current) clearTimeout(debounceTimer.current); };
  }, [doConvert]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const copyResult = async () => {
    if (!result || result === 'N/A') return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  const fetchHistory = useCallback(async () => {
    setHistoryLoading(true);
    try {
      const end = new Date().toISOString().split('T')[0];
      const start = new Date(Date.now() - historyDays * 86400000).toISOString().split('T')[0];
      const res = await fetch(`${API_BASE}/${start}..${end}?from=${historyFrom}&to=${historyTo}`);
      if (!res.ok) throw new Error('History fetch failed');
      const data = await res.json();
      const entries: HistoryEntry[] = Object.entries(data.rates || {}).map(([date, rateObj]: any) => ({
        date,
        rate: parseFloat(rateObj[historyTo]) || 0
      })).sort((a, b) => a.date.localeCompare(b.date));
      let prev = entries.length > 0 ? entries[0].rate : 0;
      entries.forEach(e => {
        e.change = (e.rate - prev) >= 0 ? `+${(e.rate - prev).toFixed(6)}` : (e.rate - prev).toFixed(6);
        prev = e.rate;
      });
      setHistoryData(entries);
    } catch {
      setHistoryData([]);
    } finally {
      setHistoryLoading(false);
    }
  }, [historyFrom, historyTo, historyDays]);

  const displayRate = fromCurrency && toCurrency ? getRate(fromCurrency, toCurrency) : null;

  const tabButton = (id: TabType, label: string, icon: React.ReactNode) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
        activeTab === id
          ? 'bg-app-accent/20 text-app-accent border border-app-accent/40 shadow-[0_0_20px_rgba(255,200,0,0.1)]'
          : 'text-app-text-muted hover:text-white hover:bg-white/5 border border-transparent'
      }`}
    >
      {icon}{label}
    </button>
  );

  const currencySelect = (
    value: string,
    onChange: (v: string) => void,
    label: string,
    extraClass = ''
  ) => (
    <div className={`relative ${extraClass}`}>
      <label className="text-xs text-app-text-muted mb-1 block font-bold">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-app-bg border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-bold appearance-none cursor-pointer focus:border-app-accent/50 focus:outline-none transition-all"
      >
        {sortedCodes.map(code => (
          <option key={code} value={code} className="bg-app-surface">
            {code} — {currencies[code] || code}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className="absolute left-3 top-[38px] text-app-text-muted pointer-events-none" />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto" dir="ltr">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <DollarSign size={28} className="text-app-accent" />
            Currency Converter
          </h1>
          <p className="text-app-text-muted text-sm mt-1">
            Real-time exchange rates — {lastUpdate ? lastUpdate.toLocaleTimeString() : 'loading...'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${
            isOnline ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'}`} />
            {isOnline ? 'Live' : 'Offline'}
          </div>
          <button
            onClick={() => fetchRates()}
            disabled={loading}
            className="p-2.5 rounded-xl bg-app-surface border border-white/10 text-app-text-muted hover:text-white hover:border-app-accent/30 transition-all disabled:opacity-50"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm mb-4 flex items-center gap-2">
          <ExternalLink size={14} />
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap bg-app-surface/50 p-1.5 rounded-2xl border border-white/5">
        {tabButton('convert', 'Convert', <DollarSign size={16} />)}
        {tabButton('rates', 'Live Rates', <TrendingUp size={16} />)}
        {tabButton('history', 'History', <Calendar size={16} />)}
        {tabButton('settings', 'Settings', <Settings size={16} />)}
      </div>

      {/* ============ TAB: CONVERT ============ */}
      {activeTab === 'convert' && (
        <div className="space-y-4">
          {/* Amount Input */}
          <div className="bg-app-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <label className="text-xs text-app-text-muted font-bold mb-2 block">Amount</label>
            <div className="flex gap-4 items-start">
              <div className="flex-1">
                <input
                  type="text"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="w-full bg-app-bg border border-white/10 rounded-xl px-5 py-4 text-3xl font-black text-white font-mono focus:border-app-accent/50 focus:outline-none transition-all"
                />
              </div>
              <div className="w-40">
                {currencySelect(fromCurrency, setFromCurrency, 'From')}
              </div>
            </div>
          </div>

          {/* Swap */}
          <div className="flex justify-center -my-2 relative z-10">
            <button
              onClick={swapCurrencies}
              className="w-12 h-12 rounded-full bg-app-accent text-black flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,200,0,0.3)]"
            >
              <ArrowLeftRight size={20} />
            </button>
          </div>

          {/* Result */}
          <div className="bg-app-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <label className="text-xs text-app-text-muted font-bold mb-2 block">Converted To</label>
            <div className="flex gap-4 items-start">
              <div className="w-40">
                {currencySelect(toCurrency, setToCurrency, 'To')}
              </div>
              <div className="flex-1 flex items-center gap-4">
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-app-accent to-orange-400 font-mono">
                  {result || '—'}
                </span>
                <span className="text-xl font-bold text-app-text-muted">{toCurrency}</span>
                <button
                  onClick={copyResult}
                  className="p-2.5 rounded-xl bg-app-bg border border-white/10 text-app-text-muted hover:text-app-accent hover:border-app-accent/30 transition-all"
                >
                  {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                </button>
              </div>
            </div>
            {displayRate !== null && (
              <div className="mt-4 pt-4 border-t border-white/5 text-sm text-app-text-muted flex items-center gap-2">
                <TrendingUp size={14} />
                1 {fromCurrency} = {displayRate.toFixed(6)} {toCurrency}
              </div>
            )}
          </div>

          {/* Quick Convert */}
          <div className="bg-app-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
            <label className="text-xs text-app-text-muted font-bold mb-3 block">Quick Convert</label>
            <div className="flex gap-2 flex-wrap">
              {[
                { from: 'USD', to: 'EUR' }, { from: 'EUR', to: 'GBP' },
                { from: 'USD', to: 'JPY' }, { from: 'GBP', to: 'USD' },
                { from: 'EUR', to: 'USD' }, { from: 'USD', to: 'EGP' },
                { from: 'USD', to: 'AED' }, { from: 'USD', to: 'SAR' }
              ].map(({ from, to }) => (
                <button
                  key={`${from}-${to}`}
                  onClick={() => { setFromCurrency(from); setToCurrency(to); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    fromCurrency === from && toCurrency === to
                      ? 'bg-app-accent/20 border-app-accent/40 text-app-accent'
                      : 'bg-app-bg border-white/10 text-app-text-muted hover:text-white hover:border-white/20'
                  }`}
                >
                  {from} → {to}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============ TAB: RATES ============ */}
      {activeTab === 'rates' && (
        <div className="bg-app-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/5">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-app-text-muted" />
              <input
                type="text"
                placeholder="Search currency..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value.toUpperCase())}
                className="w-full bg-app-bg border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-app-text-muted focus:border-app-accent/50 focus:outline-none transition-all"
              />
            </div>
          </div>
          <div className="overflow-y-auto max-h-[400px]">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-app-surface">
                <tr className="text-app-text-muted text-xs border-b border-white/5">
                  <th className="text-right py-3 px-4 font-bold">Code</th>
                  <th className="text-right py-3 px-4 font-bold">Currency</th>
                  <th className="text-left py-3 px-4 font-bold">Rate (1 USD)</th>
                </tr>
              </thead>
              <tbody>
                {sortedCodes.filter(c => !searchQuery || c.includes(searchQuery)).map(code => (
                  <tr key={code} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-bold text-app-accent">{code}</td>
                    <td className="py-3 px-4 text-app-text-muted">{currencies[code] || code}</td>
                    <td className="py-3 px-4 text-left font-mono text-white">
                      {rates[code] ? rates[code].toFixed(6) : '—'}
                    </td>
                  </tr>
                ))}
                {sortedCodes.filter(c => !searchQuery || c.includes(searchQuery)).length === 0 && (
                  <tr><td colSpan={3} className="text-center py-8 text-app-text-muted">No currencies found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============ TAB: HISTORY ============ */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="bg-app-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
            <div className="flex gap-4 items-end flex-wrap">
              <div className="w-36">{currencySelect(historyFrom, v => { setHistoryFrom(v); }, 'From')}</div>
              <div className="w-36">{currencySelect(historyTo, v => { setHistoryTo(v); }, 'To')}</div>
              <div>
                <label className="text-xs text-app-text-muted font-bold mb-1 block">Period</label>
                <select
                  value={historyDays}
                  onChange={e => setHistoryDays(Number(e.target.value))}
                  className="bg-app-bg border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-bold appearance-none cursor-pointer focus:border-app-accent/50 focus:outline-none transition-all"
                >
                  <option value={7}>7 days</option>
                  <option value={30}>30 days</option>
                  <option value={90}>90 days</option>
                  <option value={365}>1 year</option>
                </select>
              </div>
              <button
                onClick={fetchHistory}
                disabled={historyLoading}
                className="px-6 py-3 rounded-xl bg-app-accent text-black font-bold text-sm hover:brightness-110 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {historyLoading ? <RefreshCw size={16} className="animate-spin" /> : <Calendar size={16} />}
                Load
              </button>
            </div>
          </div>

          <div className="bg-app-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-app-bg/50">
                <tr className="text-app-text-muted text-xs">
                  <th className="text-right py-3 px-4 font-bold">Date</th>
                  <th className="text-center py-3 px-4 font-bold">Rate</th>
                  <th className="text-left py-3 px-4 font-bold">Change</th>
                </tr>
              </thead>
              <tbody>
                {historyData.length === 0 ? (
                  <tr><td colSpan={3} className="text-center py-10 text-app-text-muted">
                    <Clock size={24} className="mx-auto mb-2 opacity-50" />
                    Click "Load" to view historical data
                  </td></tr>
                ) : historyData.map(entry => (
                  <tr key={entry.date} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-2.5 px-4 text-app-text-muted">{entry.date}</td>
                    <td className="py-2.5 px-4 text-center font-mono text-white">{entry.rate.toFixed(6)}</td>
                    <td className={`py-2.5 px-4 font-mono text-left ${
                      entry.change?.startsWith('+') ? 'text-green-400' :
                      entry.change?.startsWith('-') ? 'text-red-400' : 'text-app-text-muted'
                    }`}>
                      {entry.change || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============ TAB: SETTINGS ============ */}
      {activeTab === 'settings' && (
        <div className="space-y-4">
          <div className="bg-app-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Settings size={16} className="text-app-accent" />
              Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-app-text-muted">Decimal places</span>
                <select
                  value={decimalPlaces}
                  onChange={e => setDecimalPlaces(Number(e.target.value))}
                  className="bg-app-bg border border-white/10 rounded-xl px-4 py-2 text-white text-sm font-bold focus:outline-none focus:border-app-accent/50"
                >
                  {[0, 2, 4, 6, 8].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-app-text-muted">Auto-refresh rates (every 5 min)</span>
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`w-12 h-6 rounded-full transition-all ${
                    autoRefresh ? 'bg-app-accent' : 'bg-white/20'
                  } relative`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${
                    autoRefresh ? 'left-6' : 'left-0.5'
                  }`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-app-text-muted">Default pair</span>
                <div className="flex gap-2">
                  <select
                    value={fromCurrency}
                    onChange={e => setFromCurrency(e.target.value)}
                    className="bg-app-bg border border-white/10 rounded-xl px-3 py-2 text-white text-sm font-bold w-28 focus:outline-none focus:border-app-accent/50"
                  >
                    {sortedCodes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select
                    value={toCurrency}
                    onChange={e => setToCurrency(e.target.value)}
                    className="bg-app-bg border border-white/10 rounded-xl px-3 py-2 text-white text-sm font-bold w-28 focus:outline-none focus:border-app-accent/50"
                  >
                    {sortedCodes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-app-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Globe size={16} className="text-app-accent" />
              About
            </h3>
            <div className="text-sm text-app-text-muted space-y-1">
              <p>Currency Converter Pro v3.0</p>
              <p>Powered by Frankfurter API (European Central Bank data)</p>
              <p>{Object.keys(rates).length} currencies available</p>
              {lastUpdate && <p>Last updated: {lastUpdate.toLocaleString()}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
