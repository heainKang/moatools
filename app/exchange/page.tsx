'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const CURRENCIES = [
  { code: 'USD', name: '미국 달러', flag: '🇺🇸' },
  { code: 'JPY', name: '일본 엔', flag: '🇯🇵' },
  { code: 'EUR', name: '유로', flag: '🇪🇺' },
  { code: 'CNY', name: '중국 위안', flag: '🇨🇳' },
  { code: 'GBP', name: '영국 파운드', flag: '🇬🇧' },
  { code: 'VND', name: '베트남 동', flag: '🇻🇳' },
];

export default function ExchangePage() {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [amount, setAmount] = useState('1');
  const [from, setFrom] = useState('USD');
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState('');

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.frankfurter.app/latest?base=KRW');
      const data = await res.json();
      const krwRates: Record<string, number> = {};
      for (const [cur, rate] of Object.entries(data.rates as Record<string, number>)) {
        krwRates[cur] = 1 / rate;
      }
      setRates(krwRates);
      setUpdated(new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }));
    } catch {
      // 오프라인용 기본 환율
      setRates({ USD: 1350, JPY: 9.2, EUR: 1480, CNY: 188, GBP: 1730, VND: 0.055 });
      setUpdated('기본값');
    }
    setLoading(false);
  };

  const krwAmount = parseFloat(amount.replace(/,/g, '')) || 0;
  const converted = rates[from] ? (krwAmount / rates[from]).toFixed(from === 'JPY' || from === 'VND' ? 0 : 2) : '-';

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-blue-400 text-sm mb-6 block">← 모아툴즈 홈</Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">💱 환율 계산기</h1>
          <p className="text-gray-400 text-sm">
            실시간 환율 기준 {updated && `· 기준: ${updated}`}
            <button onClick={fetchRates} className="ml-2 text-blue-400 text-xs">새로고침</button>
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-2">원화 금액 (KRW)</label>
            <input type="text" value={amount}
              onChange={e => setAmount(e.target.value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','))}
              placeholder="1,000,000"
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-2xl font-bold focus:border-blue-300 focus:outline-none" />
          </div>

          <div className="grid grid-cols-3 gap-2 mb-5">
            {CURRENCIES.map(c => (
              <button key={c.code} onClick={() => setFrom(c.code)}
                className={`py-2.5 rounded-xl font-medium text-sm transition-colors ${from === c.code ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {c.flag} {c.code}
              </button>
            ))}
          </div>

          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">
              {amount || 0} 원 =
            </p>
            <p className="text-4xl font-bold text-blue-600">
              {loading ? '로딩...' : `${Number(converted).toLocaleString()} ${from}`}
            </p>
            {rates[from] && (
              <p className="text-xs text-gray-400 mt-2">
                1 {from} = {rates[from].toLocaleString('ko-KR', { maximumFractionDigits: 2 })} 원
              </p>
            )}
          </div>
        </div>

        {/* 전체 환율 목록 */}
        <div className="bg-white rounded-2xl shadow-md p-5 mb-5">
          <h2 className="font-bold text-gray-700 text-sm mb-3">주요 환율 (1 외화 → 원)</h2>
          <div className="space-y-2">
            {CURRENCIES.map(c => (
              <div key={c.code} className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{c.flag} {c.name} ({c.code})</span>
                <span className="font-bold text-gray-700">{rates[c.code] ? rates[c.code].toLocaleString('ko-KR', { maximumFractionDigits: 2 }) + '원' : '-'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5">
          <p className="text-xs text-gray-400 text-center mb-3">✈️ 해외여행 준비 중이라면</p>
          <a href="https://link.coupang.com/a/dKrLmXCeJg" target="_blank" rel="noopener noreferrer sponsored"
            className="block text-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors">
            🧳 여행 필수품 베스트 →
          </a>
          <p className="text-xs text-gray-300 text-center mt-2">쿠팡파트너스 활동의 일환으로 수수료를 받을 수 있습니다</p>
        </div>
      </div>
    </main>
  );
}
