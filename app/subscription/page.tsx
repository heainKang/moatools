'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SubscriptionPage() {
  const [age, setAge] = useState('');
  const [marriageYears, setMarriageYears] = useState('0');
  const [dependents, setDependents] = useState('0');
  const [bankYears, setBankYears] = useState('');
  const [bankBalance, setBankBalance] = useState('');
  const [isFirstHome, setIsFirstHome] = useState(true);
  const [result, setResult] = useState<any>(null);

  const calc = () => {
    let score = 0;
    const details: { label: string; score: number; max: number }[] = [];

    // 무주택 기간 (만 30세 이상 또는 기혼)
    const a = parseInt(age) || 0;
    const ageScore = Math.min(Math.max(a - 30, 0), 15) * 2;
    score += ageScore;
    details.push({ label: '무주택 기간', score: ageScore, max: 32 });

    // 부양가족 수
    const dep = parseInt(dependents) || 0;
    const depScore = Math.min(dep * 5, 35);
    score += depScore;
    details.push({ label: '부양가족 수', score: depScore, max: 35 });

    // 청약통장 가입기간
    const by = parseFloat(bankYears) || 0;
    const bankScore = Math.min(Math.floor(by) * 1, 17);
    score += bankScore;
    details.push({ label: '청약통장 가입기간', score: bankScore, max: 17 });

    // 납입 횟수 (잔액 기준 추정)
    const bb = parseInt(bankBalance?.replace(/,/g, '') || '0') * 10000;
    const payCount = Math.min(Math.floor(bb / 100000), 96);
    const payScore = Math.min(Math.floor(payCount / 12), 17);
    score += payScore;
    details.push({ label: '납입 횟수 (추정)', score: payScore, max: 17 });

    setResult({ score: Math.min(score, 84), details, maxScore: 84 });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-sky-400 text-sm mb-6 block">← 모아툴즈 홈</Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🏠 청약 가점 계산기</h1>
          <p className="text-gray-400 text-sm">아파트 청약 가점 점수를 미리 계산해보세요</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
          {[
            { label: '현재 나이', value: age, set: setAge, placeholder: '35', type: 'number' },
            { label: '청약통장 가입기간 (년)', value: bankYears, set: setBankYears, placeholder: '5', type: 'number' },
            { label: '청약통장 잔액 (만원)', value: bankBalance, set: (v: string) => setBankBalance(v.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')), placeholder: '1,500', type: 'text' },
          ].map(f => (
            <div key={f.label} className="mb-4">
              <label className="block text-sm font-semibold text-gray-600 mb-2">{f.label}</label>
              <input type={f.type} value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-xl font-bold focus:border-sky-300 focus:outline-none" />
            </div>
          ))}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-600 mb-2">부양가족 수 (본인 제외)</label>
            <select value={dependents} onChange={e => setDependents(e.target.value)}
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 font-bold focus:border-sky-300 focus:outline-none">
              {Array.from({ length: 7 }, (_, i) => <option key={i} value={i}>{i}명</option>)}
            </select>
          </div>
          <button onClick={calc} className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-xl text-xl transition-colors">가점 계산하기</button>
        </div>
        {result && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
            <div className="text-center py-4 bg-sky-50 rounded-xl mb-5">
              <p className="text-sm text-sky-400 mb-1">내 청약 가점</p>
              <p className="text-5xl font-bold text-sky-600">{result.score}점</p>
              <p className="text-gray-400 text-sm mt-1">만점 {result.maxScore}점</p>
            </div>
            <div className="space-y-3">
              {result.details.map((d: any) => (
                <div key={d.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{d.label}</span>
                    <span className="font-bold text-sky-600">{d.score}/{d.max}점</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-full bg-sky-400 rounded-full" style={{ width: `${(d.score / d.max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <p className="text-xs text-gray-400 text-center mb-3">🏠 내 집 마련 전략 세우기</p>
          <a href="https://link.coupang.com/a/dKrQ1NZad" target="_blank" rel="noopener noreferrer sponsored"
            className="block text-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors">
            📚 부동산 청약 베스트셀러 →
          </a>
          <p className="text-xs text-gray-300 text-center mt-2">쿠팡파트너스 활동의 일환으로 수수료를 받을 수 있습니다</p>
        </div>
      </div>
    </main>
  );
}
