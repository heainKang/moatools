'use client';
import { useState } from 'react';
import Link from 'next/link';

const won = (n: number) => n.toLocaleString('ko-KR') + '원';

export default function RentConvertPage() {
  const [mode, setMode] = useState<'to-monthly' | 'to-jeonse'>('to-monthly');
  const [jeonse, setJeonse] = useState('');
  const [deposit, setDeposit] = useState('');
  const [monthly, setMonthly] = useState('');
  const [rate, setRate] = useState('5.0');
  const [result, setResult] = useState<any>(null);

  const calc = () => {
    const r = parseFloat(rate) / 100 / 12;
    if (mode === 'to-monthly') {
      const j = parseInt(jeonse.replace(/,/g, '')) * 10000;
      const d = parseInt(deposit.replace(/,/g, '')) * 10000;
      if (!j || !d) return;
      const monthlyRent = Math.round((j - d) * r);
      setResult({ monthlyRent, jeonse: j, deposit: d, diff: j - d });
    } else {
      const m = parseInt(monthly.replace(/,/g, '')) * 10000;
      const d = parseInt(deposit.replace(/,/g, '')) * 10000;
      if (!m || d === undefined) return;
      const jeonseEquiv = Math.round(m / r) + d;
      setResult({ jeonseEquiv, monthly: m, deposit: d });
    }
  };

  const fmt = (v: string, set: (s: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      set(e.target.value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','));

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-violet-400 text-sm mb-6 block">← 모아툴즈 홈</Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🏘️ 전월세 계산기</h1>
          <p className="text-gray-400 text-sm">전세 ↔ 월세 전환 계산기</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
          <div className="flex gap-2 mb-5">
            {[{ v: 'to-monthly', label: '전세 → 월세' }, { v: 'to-jeonse', label: '월세 → 전세' }].map(m => (
              <button key={m.v} onClick={() => { setMode(m.v as any); setResult(null); }}
                className={`flex-1 py-3 rounded-xl font-medium text-sm transition-colors ${mode === m.v ? 'bg-violet-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {m.label}
              </button>
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-2">전환율 (%/년)</label>
            <input type="number" value={rate} onChange={e => setRate(e.target.value)} step="0.1"
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-xl font-bold focus:border-violet-300 focus:outline-none" />
          </div>
          {mode === 'to-monthly' ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600 mb-2">전세금 (만원)</label>
                <input type="text" value={jeonse} onChange={fmt(jeonse, setJeonse)} placeholder="30,000"
                  className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-xl font-bold focus:border-violet-300 focus:outline-none" />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-600 mb-2">보증금 (만원)</label>
                <input type="text" value={deposit} onChange={fmt(deposit, setDeposit)} placeholder="5,000"
                  className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-xl font-bold focus:border-violet-300 focus:outline-none" />
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600 mb-2">월세 (만원)</label>
                <input type="text" value={monthly} onChange={fmt(monthly, setMonthly)} placeholder="80"
                  className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-xl font-bold focus:border-violet-300 focus:outline-none" />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-600 mb-2">보증금 (만원)</label>
                <input type="text" value={deposit} onChange={fmt(deposit, setDeposit)} placeholder="1,000"
                  className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-xl font-bold focus:border-violet-300 focus:outline-none" />
              </div>
            </>
          )}
          <button onClick={calc} className="w-full bg-violet-500 hover:bg-violet-600 text-white font-bold py-4 rounded-xl text-xl transition-colors">계산하기</button>
        </div>
        {result && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
            <div className="text-center py-4 bg-violet-50 rounded-xl mb-4">
              {mode === 'to-monthly' ? (
                <>
                  <p className="text-sm text-violet-400 mb-1">전환 월세</p>
                  <p className="text-4xl font-bold text-violet-600">{won(result.monthlyRent)}</p>
                  <p className="text-gray-400 text-sm mt-1">매달</p>
                </>
              ) : (
                <>
                  <p className="text-sm text-violet-400 mb-1">전세 환산금</p>
                  <p className="text-4xl font-bold text-violet-600">{won(result.jeonseEquiv)}</p>
                </>
              )}
            </div>
            {mode === 'to-monthly' && (
              <p className="text-xs text-center text-gray-400">전세 {won(result.jeonse)} - 보증금 {won(result.deposit)} = {won(result.diff)} × {rate}% ÷ 12</p>
            )}
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <p className="text-xs text-gray-400 text-center mb-3">🏠 부동산 공부하기</p>
          <a href="https://link.coupang.com/a/dKrQ1NZad" target="_blank" rel="noopener noreferrer sponsored"
            className="block text-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors">
            📚 부동산 베스트셀러 →
          </a>
          <p className="text-xs text-gray-300 text-center mt-2">쿠팡파트너스 활동의 일환으로 수수료를 받을 수 있습니다</p>
        </div>
      </div>
    </main>
  );
}
