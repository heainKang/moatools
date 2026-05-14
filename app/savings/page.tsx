'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SavingsPage() {
  const [monthly, setMonthly] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('12');
  const [result, setResult] = useState<any>(null);

  const calc = () => {
    const m = parseInt(monthly.replace(/,/g, '')) * 10000;
    const r = parseFloat(rate) / 100 / 12;
    const n = parseInt(months);
    if (!m || !r || !n) return;
    const total = m * n;
    const interest = Math.round(m * r * n * (n + 1) / 2);
    const taxRate = 0.154;
    const afterTax = Math.round(interest * (1 - taxRate));
    setResult({ total, interest, afterTax, finalAmount: total + afterTax, taxAmount: Math.round(interest * taxRate) });
  };

  const won = (n: number) => n.toLocaleString('ko-KR') + '원';

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-emerald-400 text-sm mb-6 block">← 모아툴즈 홈</Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🐷 적금 계산기</h1>
          <p className="text-gray-400 text-sm">이자세(15.4%) 공제 후 실수령액 계산</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-2">월 납입금액 (만원)</label>
            <input type="text" value={monthly} onChange={e => setMonthly(e.target.value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','))} placeholder="30"
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-xl font-bold focus:border-emerald-300 focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">연이율 (%)</label>
              <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="4.0"
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-xl font-bold focus:border-emerald-300 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">기간</label>
              <select value={months} onChange={e => setMonths(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 font-bold focus:border-emerald-300 focus:outline-none">
                {[6,12,24,36].map(m => <option key={m} value={m}>{m >= 12 ? `${m/12}년` : `${m}개월`}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calc} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl text-xl transition-colors">계산하기</button>
        </div>
        {result && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
            <div className="text-center py-4 bg-emerald-50 rounded-xl mb-5">
              <p className="text-sm text-emerald-400 mb-1">세후 만기 수령액</p>
              <p className="text-4xl font-bold text-emerald-600">{won(result.finalAmount)}</p>
            </div>
            <div className="space-y-3">
              {[
                { label: '납입 원금', value: result.total, color: 'text-gray-700' },
                { label: '세전 이자', value: result.interest, color: 'text-emerald-600' },
                { label: '이자세 (15.4%)', value: -result.taxAmount, color: 'text-red-500' },
                { label: '세후 이자', value: result.afterTax, color: 'text-emerald-600' },
              ].map(item => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-gray-500">{item.label}</span>
                  <span className={`font-bold ${item.color}`}>{item.value < 0 ? '-' : ''}{won(Math.abs(item.value))}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <p className="text-xs text-gray-400 text-center mb-3">💰 더 높은 수익을 원한다면</p>
          <a href="https://link.coupang.com/a/재테크" target="_blank" rel="noopener noreferrer sponsored"
            className="block text-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors">
            📈 재테크 입문 베스트셀러 →
          </a>
          <p className="text-xs text-gray-300 text-center mt-2">쿠팡파트너스 활동의 일환으로 수수료를 받을 수 있습니다</p>
        </div>
      </div>
    </main>
  );
}
