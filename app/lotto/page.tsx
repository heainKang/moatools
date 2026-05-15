'use client';
import { useState } from 'react';
import Link from 'next/link';

const COLORS = ['bg-yellow-400','bg-blue-500','bg-red-500','bg-gray-700','bg-green-500','bg-red-600'];

function getBallColor(n: number) {
  if (n <= 10) return COLORS[0];
  if (n <= 20) return COLORS[1];
  if (n <= 30) return COLORS[2];
  if (n <= 40) return COLORS[3];
  return COLORS[4];
}

function generate() {
  const nums = new Set<number>();
  while (nums.size < 6) nums.add(Math.floor(Math.random() * 45) + 1);
  return [...nums].sort((a, b) => a - b);
}

export default function LottoPage() {
  const [sets, setSets] = useState<number[][]>([]);
  const [count, setCount] = useState('5');
  const [animating, setAnimating] = useState(false);

  const generateSets = async () => {
    setAnimating(true);
    setSets([]);
    await new Promise(r => setTimeout(r, 300));
    setSets(Array.from({ length: parseInt(count) }, generate));
    setAnimating(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-yellow-600 text-sm mb-6 block">← 모아툴즈 홈</Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🍀 로또 번호 생성기</h1>
          <p className="text-gray-400 text-sm">랜덤 로또 번호 자동 생성 · 1~45</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-600 mb-2">생성할 게임 수</label>
            <div className="flex gap-2">
              {['1','3','5','10'].map(n => (
                <button key={n} onClick={() => setCount(n)}
                  className={`flex-1 py-3 rounded-xl font-bold transition-colors ${count === n ? 'bg-yellow-400 text-gray-900' : 'bg-gray-100 text-gray-600'}`}>
                  {n}게임
                </button>
              ))}
            </div>
          </div>
          <button onClick={generateSets} disabled={animating}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 rounded-xl text-xl transition-colors disabled:opacity-50">
            {animating ? '생성 중...' : '번호 생성하기 🍀'}
          </button>
        </div>

        {sets.length > 0 && (
          <div className="space-y-3 mb-5">
            {sets.map((nums, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">{i + 1}게임</span>
                  <div className="flex gap-2">
                    {nums.map(n => (
                      <div key={n} className={`w-10 h-10 ${getBallColor(n)} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                        {n}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <button onClick={generateSets}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-3 rounded-xl transition-colors">
              다시 생성 🔄
            </button>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-md p-4 text-center">
          <p className="text-xs text-gray-300">로또는 운입니다 😄 매주 토요일 추첨</p>
        </div>
      </div>
    </main>
  );
}
