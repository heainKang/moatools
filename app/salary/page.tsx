'use client';
import { useState } from 'react';
import Link from 'next/link';

function calc(annual: number, dep: number) {
  const m = annual / 12;
  const pension = Math.min(m, 5530000) * 0.045;
  const health = m * 0.03545;
  const ltc = health * 0.1295;
  const employment = m * 0.009;

  let ded = 0;
  if (annual <= 5000000) ded = annual * 0.7;
  else if (annual <= 15000000) ded = 3500000 + (annual - 5000000) * 0.4;
  else if (annual <= 45000000) ded = 7500000 + (annual - 15000000) * 0.15;
  else if (annual <= 100000000) ded = 12000000 + (annual - 45000000) * 0.05;
  else ded = 14750000;

  const taxBase = Math.max(0, annual - ded - dep * 1500000);
  let annualTax = 0;
  if (taxBase <= 14000000) annualTax = taxBase * 0.06;
  else if (taxBase <= 50000000) annualTax = 840000 + (taxBase - 14000000) * 0.15;
  else if (taxBase <= 88000000) annualTax = 6240000 + (taxBase - 50000000) * 0.24;
  else if (taxBase <= 150000000) annualTax = 15360000 + (taxBase - 88000000) * 0.35;
  else annualTax = 37060000 + (taxBase - 150000000) * 0.38;

  const incomeTax = annualTax / 12;
  const localTax = incomeTax * 0.1;
  const total = pension + health + ltc + employment + incomeTax + localTax;

  return {
    monthly: Math.round(m),
    takeHome: Math.round(m - total),
    pension: Math.round(pension),
    health: Math.round(health),
    ltc: Math.round(ltc),
    employment: Math.round(employment),
    incomeTax: Math.round(incomeTax),
    localTax: Math.round(localTax),
    total: Math.round(total),
  };
}

const won = (n: number) => n.toLocaleString('ko-KR') + '원';

export default function SalaryPage() {
  const [salary, setSalary] = useState('');
  const [dep, setDep] = useState('1');
  const [result, setResult] = useState<ReturnType<typeof calc> | null>(null);

  const handleCalc = () => {
    const v = parseInt(salary.replace(/,/g, '')) * 10000;
    if (!v || v <= 0) return;
    setResult(calc(v, parseInt(dep)));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-indigo-400 text-sm mb-6 block">← 모아툴즈 홈</Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">💰 연봉 실수령액 계산기</h1>
          <p className="text-gray-400 text-sm">2024년 기준 · 4대보험 · 소득세 포함</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-2">연봉 (만원)</label>
            <input
              type="text"
              value={salary}
              onChange={e => setSalary(e.target.value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','))}
              placeholder="예) 4,000"
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-xl font-bold focus:border-indigo-300 focus:outline-none"
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-600 mb-2">부양가족 수 (본인 포함)</label>
            <select value={dep} onChange={e => setDep(e.target.value)}
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-lg focus:border-indigo-300 focus:outline-none">
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}명</option>)}
            </select>
          </div>
          <button onClick={handleCalc}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-xl text-xl transition-colors">
            계산하기
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
            <div className="text-center py-5 bg-indigo-50 rounded-xl mb-6">
              <p className="text-indigo-400 text-sm font-medium mb-1">월 실수령액</p>
              <p className="text-5xl font-bold text-indigo-600">{won(result.takeHome)}</p>
              <p className="text-gray-400 text-sm mt-2">월 총급여 {won(result.monthly)}</p>
            </div>

            <h2 className="font-bold text-gray-600 text-sm mb-3">📋 공제 내역</h2>
            <div className="space-y-2.5">
              {[
                { label: '국민연금 (4.5%)', value: result.pension, color: 'text-blue-500' },
                { label: '건강보험 (3.545%)', value: result.health, color: 'text-green-500' },
                { label: '장기요양보험', value: result.ltc, color: 'text-teal-500' },
                { label: '고용보험 (0.9%)', value: result.employment, color: 'text-yellow-600' },
                { label: '근로소득세', value: result.incomeTax, color: 'text-red-500' },
                { label: '지방소득세 (10%)', value: result.localTax, color: 'text-orange-500' },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{item.label}</span>
                  <span className={`font-semibold ${item.color}`}>- {won(item.value)}</span>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between items-center font-bold">
                <span className="text-gray-700">총 공제액</span>
                <span className="text-red-500 text-lg">- {won(result.total)}</span>
              </div>
            </div>
          </div>
        )}

        {/* 쿠팡파트너스 */}
        <div className="bg-white rounded-2xl shadow-md p-5 mb-4">
          <p className="text-xs text-gray-400 text-center mb-3">💡 연봉 협상 & 재테크 준비하기</p>
          <a href="https://link.coupang.com/a/재테크" target="_blank" rel="noopener noreferrer sponsored"
            className="block text-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors">
            📚 재테크 베스트셀러 보기 →
          </a>
          <p className="text-xs text-gray-300 text-center mt-2">쿠팡파트너스 활동의 일환으로 수수료를 받을 수 있습니다</p>
        </div>

        <p className="text-center text-xs text-gray-300">본 계산기는 참고용이며 실제 수령액과 다를 수 있습니다</p>
      </div>
    </main>
  );
}
