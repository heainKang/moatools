'use client';
import { useState } from 'react';
import Link from 'next/link';

const won = (n: number) => n.toLocaleString('ko-KR') + '원';

export default function ParentalLeavePage() {
  const [salary, setSalary] = useState('');
  const [months, setMonths] = useState('12');
  const [result, setResult] = useState<any>(null);

  const calc = () => {
    const m = parseInt(salary.replace(/,/g, '')) * 10000;
    const totalMonths = parseInt(months);
    if (!m) return;

    const MAX_FIRST3 = 2500000;
    const MAX_AFTER = 1500000;
    const MIN = 700000;

    // 첫 3개월: 통상임금 80% (상한 250만, 하한 70만)
    const first3 = Math.min(Math.max(Math.round(m * 0.8), MIN), MAX_FIRST3);
    // 나머지: 통상임금 50% (상한 150만, 하한 70만)
    const after = Math.min(Math.max(Math.round(m * 0.5), MIN), MAX_AFTER);

    const month3Total = first3 * Math.min(3, totalMonths);
    const remainMonths = Math.max(0, totalMonths - 3);
    const afterTotal = after * remainMonths;
    const total = month3Total + afterTotal;

    setResult({ first3, after, month3Total, afterTotal, total, totalMonths });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-pink-400 text-sm mb-6 block">← 모아툴즈 홈</Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">👶 육아휴직급여 계산기</h1>
          <p className="text-gray-400 text-sm">2024년 기준 · 고용보험 육아휴직급여</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-2">통상임금 (만원/월)</label>
            <input type="text" value={salary} onChange={e => setSalary(e.target.value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','))} placeholder="300"
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-xl font-bold focus:border-pink-300 focus:outline-none" />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-600 mb-2">육아휴직 기간</label>
            <div className="flex gap-2">
              {['3','6','9','12'].map(m => (
                <button key={m} onClick={() => setMonths(m)}
                  className={`flex-1 py-3 rounded-xl font-bold transition-colors ${months === m ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {m}개월
                </button>
              ))}
            </div>
          </div>
          <button onClick={calc} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl text-xl transition-colors">계산하기 👶</button>
        </div>
        {result && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
            <div className="text-center py-4 bg-pink-50 rounded-xl mb-5">
              <p className="text-sm text-pink-400 mb-1">총 육아휴직급여 ({result.totalMonths}개월)</p>
              <p className="text-4xl font-bold text-pink-600">{won(result.total)}</p>
            </div>
            <div className="space-y-3 text-sm">
              <div className="bg-pink-50 rounded-xl p-3">
                <p className="font-bold text-pink-600 mb-1">첫 3개월 (통상임금 80%)</p>
                <div className="flex justify-between"><span className="text-gray-500">월 급여</span><span className="font-bold">{won(result.first3)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">소계</span><span className="font-bold">{won(result.month3Total)}</span></div>
              </div>
              {result.totalMonths > 3 && (
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="font-bold text-gray-600 mb-1">4개월 이후 (통상임금 50%)</p>
                  <div className="flex justify-between"><span className="text-gray-500">월 급여</span><span className="font-bold">{won(result.after)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">소계</span><span className="font-bold">{won(result.afterTotal)}</span></div>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-400 text-center mt-3">상한: 첫 3개월 250만 / 이후 150만 | 하한 70만원</p>
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <p className="text-xs text-gray-400 text-center mb-3">👶 육아 필수품 준비하기</p>
          <a href="https://link.coupang.com/a/dKrNcsBSmG" target="_blank" rel="noopener noreferrer sponsored"
            className="block text-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors">
            🛒 육아용품 베스트 →
          </a>
          <p className="text-xs text-gray-300 text-center mt-2">쿠팡파트너스 활동의 일환으로 수수료를 받을 수 있습니다</p>
        </div>
      </div>
    </main>
  );
}
