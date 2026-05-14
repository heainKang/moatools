'use client';
import { useState } from 'react';
import Link from 'next/link';

const dogBreeds: Record<string, { minWeight: number; maxWeight: number }> = {
  '말티즈': { minWeight: 2, maxWeight: 4 }, '푸들(토이)': { minWeight: 2, maxWeight: 4 },
  '치와와': { minWeight: 1.5, maxWeight: 3 }, '포메라니안': { minWeight: 1.5, maxWeight: 3.5 },
  '비숑프리제': { minWeight: 3, maxWeight: 5 }, '시츄': { minWeight: 4, maxWeight: 7 },
  '닥스훈트': { minWeight: 4, maxWeight: 9 }, '비글': { minWeight: 10, maxWeight: 14 },
  '스피츠': { minWeight: 5, maxWeight: 10 }, '골든리트리버': { minWeight: 25, maxWeight: 34 },
  '라브라도': { minWeight: 25, maxWeight: 36 }, '허스키': { minWeight: 16, maxWeight: 27 },
};

export default function PetFoodPage() {
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('adult');
  const [activity, setActivity] = useState('normal');
  const [result, setResult] = useState<any>(null);

  const calc = () => {
    const w = parseFloat(weight);
    if (!w) return;

    // RER (휴식 에너지 요구량)
    const rer = 70 * Math.pow(w, 0.75);

    const multipliers: Record<string, number> = {
      puppy: 3.0, adult: petType === 'dog' ? (activity === 'high' ? 1.8 : activity === 'low' ? 1.2 : 1.6) : 1.2,
      senior: petType === 'dog' ? 1.4 : 1.1, neutered: petType === 'dog' ? 1.6 : 1.2,
    };

    const der = Math.round(rer * (multipliers[age] || 1.6));
    const dryFood = Math.round(der / 3.5); // 건식 사료 기준 3.5kcal/g
    const wetFood = Math.round(der / 0.9); // 습식 사료 기준 0.9kcal/g

    setResult({ der, dryFood, wetFood, w, petType });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-amber-500 text-sm mb-6 block">← 모아툴즈 홈</Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🐾 반려동물 사료량 계산기</h1>
          <p className="text-gray-400 text-sm">강아지 · 고양이 하루 적정 사료량 계산</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
          <div className="flex gap-2 mb-5">
            {[{ v: 'dog', label: '🐶 강아지' }, { v: 'cat', label: '🐱 고양이' }].map(p => (
              <button key={p.v} onClick={() => setPetType(p.v as any)}
                className={`flex-1 py-3 rounded-xl font-bold transition-colors ${petType === p.v ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {p.label}
              </button>
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-2">몸무게 (kg)</label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="5.0" step="0.1"
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-xl font-bold focus:border-amber-300 focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">나이/상태</label>
              <select value={age} onChange={e => setAge(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 font-bold focus:border-amber-300 focus:outline-none">
                <option value="puppy">강아지/새끼</option>
                <option value="adult">성체 (1-7세)</option>
                <option value="senior">노령 (7세+)</option>
                <option value="neutered">중성화</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">활동량</label>
              <select value={activity} onChange={e => setActivity(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 font-bold focus:border-amber-300 focus:outline-none">
                <option value="low">적음</option>
                <option value="normal">보통</option>
                <option value="high">많음</option>
              </select>
            </div>
          </div>
          <button onClick={calc} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl text-xl transition-colors">계산하기 🐾</button>
        </div>
        {result && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
            <div className="text-center py-4 bg-amber-50 rounded-xl mb-5">
              <p className="text-sm text-amber-500 mb-1">하루 필요 칼로리</p>
              <p className="text-4xl font-bold text-amber-600">{result.der} kcal</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-orange-50 rounded-xl p-4 text-center">
                <p className="text-xs font-bold text-orange-500 mb-1">🥣 건식사료</p>
                <p className="text-2xl font-bold text-orange-600">{result.dryFood}g</p>
                <p className="text-xs text-gray-400">약 {Math.round(result.dryFood / 1000 * 10) / 10}컵</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-xs font-bold text-blue-500 mb-1">🥫 습식사료</p>
                <p className="text-2xl font-bold text-blue-600">{result.wetFood}g</p>
                <p className="text-xs text-gray-400">약 {Math.round(result.wetFood / 100)}캔(100g기준)</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 text-center mt-3">※ 사료 칼로리에 따라 실제 급여량이 다를 수 있어요</p>
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <p className="text-xs text-gray-400 text-center mb-3">🐾 우리 아이에게 맞는 사료 찾기</p>
          <a href="https://link.coupang.com/a/사료" target="_blank" rel="noopener noreferrer sponsored"
            className="block text-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors mb-2">
            🐶 강아지 사료 베스트 →
          </a>
          <a href="https://link.coupang.com/a/고양이사료" target="_blank" rel="noopener noreferrer sponsored"
            className="block text-center bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-colors">
            🐱 고양이 사료 베스트 →
          </a>
          <p className="text-xs text-gray-300 text-center mt-2">쿠팡파트너스 활동의 일환으로 수수료를 받을 수 있습니다</p>
        </div>
      </div>
    </main>
  );
}
