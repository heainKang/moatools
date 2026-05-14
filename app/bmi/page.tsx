'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function BMIPage() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<{ bmi: number; label: string; color: string; advice: string } | null>(null);

  const calc = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w) return;
    const bmi = w / (h * h);
    let label, color, advice;
    if (bmi < 18.5) { label = '저체중'; color = 'text-blue-500'; advice = '체중 증가를 위한 고단백 식단을 추천해요'; }
    else if (bmi < 23) { label = '정상'; color = 'text-green-500'; advice = '건강한 체중을 유지하고 있어요! 꾸준히 유지하세요'; }
    else if (bmi < 25) { label = '과체중'; color = 'text-yellow-500'; advice = '가벼운 운동과 식단 조절을 시작해보세요'; }
    else if (bmi < 30) { label = '비만'; color = 'text-orange-500'; advice = '규칙적인 운동과 식단 관리가 필요해요'; }
    else { label = '고도비만'; color = 'text-red-500'; advice = '전문의 상담을 권장합니다'; }
    setResult({ bmi: Math.round(bmi * 10) / 10, label, color, advice });
  };

  const idealWeight = height ? (22.5 * (parseFloat(height) / 100) ** 2).toFixed(1) : null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-green-400 text-sm mb-6 block">← 모아툴즈 홈</Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">⚖️ BMI 계산기</h1>
          <p className="text-gray-400 text-sm">체질량지수로 건강 체중을 확인하세요</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">키 (cm)</label>
              <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="170"
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-xl font-bold focus:border-green-300 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">몸무게 (kg)</label>
              <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="65"
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-xl font-bold focus:border-green-300 focus:outline-none" />
            </div>
          </div>
          {idealWeight && <p className="text-center text-sm text-gray-400 mb-4">키 {height}cm 이상적인 체중: <span className="font-bold text-green-500">{idealWeight}kg</span></p>}
          <button onClick={calc} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl text-xl transition-colors">계산하기</button>
        </div>

        {result && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
            <div className="text-center py-5 bg-green-50 rounded-xl mb-5">
              <p className="text-sm text-gray-400 mb-1">내 BMI</p>
              <p className={`text-5xl font-bold ${result.color}`}>{result.bmi}</p>
              <p className={`text-xl font-bold mt-2 ${result.color}`}>{result.label}</p>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>저체중 ~18.5</span><span>정상 ~23</span><span>과체중 ~25</span><span>비만 30+</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-500 rounded-full"
                  style={{ width: `${Math.min((result.bmi / 35) * 100, 100)}%` }} />
              </div>
            </div>
            <p className="text-center text-gray-600 text-sm bg-gray-50 rounded-xl p-3">{result.advice}</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-md p-5 mb-4">
          <p className="text-xs text-gray-400 text-center mb-3">🏃 건강한 체중 관리를 위해</p>
          <a href="https://link.coupang.com/a/다이어트" target="_blank" rel="noopener noreferrer sponsored"
            className="block text-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors">
            💊 다이어트 보조제 베스트 보기 →
          </a>
          <p className="text-xs text-gray-300 text-center mt-2">쿠팡파트너스 활동의 일환으로 수수료를 받을 수 있습니다</p>
        </div>
      </div>
    </main>
  );
}
