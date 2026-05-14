'use client';
import { useState } from 'react';
import Link from 'next/link';

const MIN_WAGE_2024 = 9860;

export default function HourlyPage() {
  const [wage, setWage] = useState('');
  const [hours, setHours] = useState('40');
  const [days, setDays] = useState('5');
  const [result, setResult] = useState<any>(null);

  const calc = () => {
    const w = parseInt(wage.replace(/,/g, ''));
    const h = parseFloat(hours);
    const d = parseInt(days);
    if (!w || !h || !d) return;

    const weeklyPay = w * h;
    const weeklyHours = h;
    const maintenanceRatio = weeklyHours / 40;
    const weeklyHoliday = maintenanceRatio >= 1 ? w * 8 : weeklyHours >= 15 ? (weeklyHours / 40) * w * 8 : 0;
    const monthlyPay = Math.round((weeklyPay + weeklyHoliday) * 4.345);
    const annualPay = monthlyPay * 12;
    const isMinWage = w >= MIN_WAGE_2024;

    setResult({ w, h, d, weeklyPay, weeklyHoliday, monthlyPay, annualPay, isMinWage });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-yellow-500 text-sm mb-6 block">← 모아툴즈 홈</Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🕐 시급 계산기</h1>
          <p className="text-gray-400 text-sm">주휴수당 포함 월급 자동 계산 · 2024년 최저시급 9,860원</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-2">시급 (원)</label>
            <input type="text" value={wage}
              onChange={e => setWage(e.target.value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','))}
              placeholder="9,860"
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-xl font-bold focus:border-yellow-300 focus:outline-none" />
            <p className="text-xs text-gray-400 mt-1">2024 최저시급: 9,860원</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">하루 근무시간</label>
              <select value={hours} onChange={e => setHours(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 font-bold focus:border-yellow-300 focus:outline-none">
                {[4,5,6,7,8,9,10].map(h => <option key={h} value={h * (parseInt(days) || 5)}>{h}시간</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">주 근무일수</label>
              <select value={days} onChange={e => setDays(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 font-bold focus:border-yellow-300 focus:outline-none">
                {[3,4,5,6].map(d => <option key={d} value={d}>{d}일</option>)}
              </select>
            </div>
          </div>
          <button onClick={calc} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded-xl text-xl transition-colors">계산하기</button>
        </div>

        {result && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
            {!result.isMinWage && (
              <div className="bg-red-50 text-red-600 text-sm rounded-xl p-3 mb-4 text-center font-medium">
                ⚠️ 입력하신 시급이 최저시급({MIN_WAGE_2024.toLocaleString()}원)보다 낮습니다
              </div>
            )}
            <div className="text-center py-5 bg-yellow-50 rounded-xl mb-5">
              <p className="text-sm text-gray-400 mb-1">예상 월급 (주휴수당 포함)</p>
              <p className="text-5xl font-bold text-yellow-600">{result.monthlyPay.toLocaleString()}원</p>
            </div>
            <div className="space-y-3">
              {[
                { label: '주급 (근로분)', value: result.weeklyPay },
                { label: '주휴수당', value: result.weeklyHoliday },
                { label: '연봉 환산', value: result.annualPay },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-bold text-gray-700">{item.value.toLocaleString()}원</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-md p-5 mb-4">
          <p className="text-xs text-gray-400 text-center mb-3">💼 취업/이직 준비 중이라면</p>
          <a href="https://link.coupang.com/a/취업" target="_blank" rel="noopener noreferrer sponsored"
            className="block text-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors">
            📚 취업 합격 베스트셀러 보기 →
          </a>
          <p className="text-xs text-gray-300 text-center mt-2">쿠팡파트너스 활동의 일환으로 수수료를 받을 수 있습니다</p>
        </div>
      </div>
    </main>
  );
}
