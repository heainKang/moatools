'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SeverancePage() {
  const [salary, setSalary] = useState('');
  const [years, setYears] = useState('');
  const [months, setMonths] = useState('0');
  const [tab, setTab] = useState<'severance' | 'unemployment'>('severance');
  const [result, setResult] = useState<any>(null);

  const won = (n: number) => n.toLocaleString('ko-KR') + '원';

  const calc = () => {
    const s = parseInt(salary.replace(/,/g, '')) * 10000;
    const y = parseInt(years) || 0;
    const m = parseInt(months) || 0;
    if (!s || (!y && !m)) return;

    const totalMonths = y * 12 + m;
    const dailySalary = Math.round(s / 365);
    const severance = Math.round(dailySalary * 30 * (totalMonths / 12));

    // 실업급여 계산 (이직확인서 기준)
    const dailyUnemployment = Math.min(Math.round(dailySalary * 0.6), 66000);
    const unemploymentDays = totalMonths >= 120 ? 270 : totalMonths >= 60 ? 210 : totalMonths >= 36 ? 180 : totalMonths >= 12 ? 150 : 120;
    const totalUnemployment = dailyUnemployment * unemploymentDays;

    setResult({ severance, dailySalary, dailyUnemployment, unemploymentDays, totalUnemployment });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-slate-400 text-sm mb-6 block">← 모아툴즈 홈</Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📋 퇴직금 · 실업급여 계산기</h1>
          <p className="text-gray-400 text-sm">퇴직금 및 실업급여 예상금액 계산</p>
        </div>
        <div className="flex gap-2 mb-5">
          {[{ v: 'severance', label: '퇴직금' }, { v: 'unemployment', label: '실업급여' }].map(t => (
            <button key={t.v} onClick={() => setTab(t.v as any)}
              className={`flex-1 py-3 rounded-xl font-bold transition-colors ${tab === t.v ? 'bg-slate-700 text-white' : 'bg-white text-gray-600 shadow-sm'}`}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-2">월 평균임금 (만원)</label>
            <input type="text" value={salary} onChange={e => setSalary(e.target.value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','))} placeholder="300"
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-xl font-bold focus:border-slate-300 focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">근속 년수</label>
              <input type="number" value={years} onChange={e => setYears(e.target.value)} placeholder="3"
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-xl font-bold focus:border-slate-300 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">추가 개월수</label>
              <select value={months} onChange={e => setMonths(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 font-bold focus:border-slate-300 focus:outline-none">
                {Array.from({ length: 12 }, (_, i) => <option key={i} value={i}>{i}개월</option>)}
              </select>
            </div>
          </div>
          <button onClick={calc} className="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-4 rounded-xl text-xl transition-colors">계산하기</button>
        </div>
        {result && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
            {tab === 'severance' ? (
              <>
                <div className="text-center py-4 bg-slate-50 rounded-xl mb-5">
                  <p className="text-sm text-slate-400 mb-1">예상 퇴직금</p>
                  <p className="text-4xl font-bold text-slate-700">{won(result.severance)}</p>
                </div>
                <p className="text-sm text-gray-500 text-center">일 평균임금: {won(result.dailySalary)}</p>
              </>
            ) : (
              <>
                <div className="text-center py-4 bg-slate-50 rounded-xl mb-5">
                  <p className="text-sm text-slate-400 mb-1">예상 실업급여 총액</p>
                  <p className="text-4xl font-bold text-slate-700">{won(result.totalUnemployment)}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">일일 실업급여</span><span className="font-bold">{won(result.dailyUnemployment)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">수급 기간</span><span className="font-bold">{result.unemploymentDays}일</span></div>
                </div>
              </>
            )}
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <p className="text-xs text-gray-400 text-center mb-3">💼 이직 · 재취업 준비하기</p>
          <a href="https://link.coupang.com/a/dKrTqRMGvQ" target="_blank" rel="noopener noreferrer sponsored"
            className="block text-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors">
            📚 이직 성공 전략 베스트셀러 →
          </a>
          <p className="text-xs text-gray-300 text-center mt-2">쿠팡파트너스 활동의 일환으로 수수료를 받을 수 있습니다</p>
        </div>
      </div>
    </main>
  );
}
