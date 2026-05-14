'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function LoanPage() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('12');
  const [type, setType] = useState('equal');
  const [result, setResult] = useState<any>(null);

  const calc = () => {
    const p = parseInt(principal.replace(/,/g, '')) * 10000;
    const r = parseFloat(rate) / 100 / 12;
    const n = parseInt(months);
    if (!p || !r || !n) return;

    if (type === 'equal') {
      const monthly = Math.round(p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
      setResult({ monthly, totalPay: monthly * n, totalInterest: monthly * n - p, type: 'equal' });
    } else {
      const principalPerMonth = Math.round(p / n);
      const firstMonth = principalPerMonth + Math.round(p * r);
      const totalInterest = Array.from({ length: n }, (_, i) => Math.round((p - principalPerMonth * i) * r)).reduce((a, b) => a + b, 0);
      setResult({ monthly: firstMonth, totalPay: p + totalInterest, totalInterest, principalPerMonth, type: 'principal' });
    }
  };

  const won = (n: number) => n.toLocaleString('ko-KR') + '원';

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-blue-400 text-sm mb-6 block">← 모아툴즈 홈</Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🏦 대출 이자 계산기</h1>
          <p className="text-gray-400 text-sm">원리금균등 · 원금균등 상환 계산</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-2">대출금액 (만원)</label>
            <input type="text" value={principal} onChange={e => setPrincipal(e.target.value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','))} placeholder="10,000"
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-xl font-bold focus:border-blue-300 focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">연이율 (%)</label>
              <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="4.5"
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-xl font-bold focus:border-blue-300 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">대출기간</label>
              <select value={months} onChange={e => setMonths(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 font-bold focus:border-blue-300 focus:outline-none">
                {[6,12,24,36,48,60,120,180,240,360].map(m => <option key={m} value={m}>{m >= 12 ? `${m/12}년` : `${m}개월`}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-2 mb-5">
            {[{ v: 'equal', label: '원리금균등' }, { v: 'principal', label: '원금균등' }].map(t => (
              <button key={t.v} onClick={() => setType(t.v)}
                className={`flex-1 py-2 rounded-xl font-medium text-sm transition-colors ${type === t.v ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {t.label}
              </button>
            ))}
          </div>
          <button onClick={calc} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl text-xl transition-colors">계산하기</button>
        </div>
        {result && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
            <div className="text-center py-4 bg-blue-50 rounded-xl mb-5">
              <p className="text-sm text-blue-400 mb-1">월 상환금액 {result.type === 'principal' ? '(첫달)' : ''}</p>
              <p className="text-4xl font-bold text-blue-600">{won(result.monthly)}</p>
            </div>
            <div className="space-y-3">
              {[
                { label: '총 상환금액', value: result.totalPay },
                { label: '총 이자액', value: result.totalInterest },
              ].map(item => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-bold text-gray-700">{won(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <p className="text-xs text-gray-400 text-center mb-3">💳 낮은 금리 대출 비교하기</p>
          <a href="https://link.coupang.com/a/대출" target="_blank" rel="noopener noreferrer sponsored"
            className="block text-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors">
            💰 재테크 베스트셀러 보기 →
          </a>
          <p className="text-xs text-gray-300 text-center mt-2">쿠팡파트너스 활동의 일환으로 수수료를 받을 수 있습니다</p>
        </div>
      </div>
    </main>
  );
}
