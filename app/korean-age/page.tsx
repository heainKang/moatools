'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function KoreanAgePage() {
  const [birth, setBirth] = useState('');
  const [result, setResult] = useState<any>(null);

  const calc = () => {
    if (!birth) return;
    const b = new Date(birth);
    const today = new Date();
    const korean = today.getFullYear() - b.getFullYear() + 1;
    let western = today.getFullYear() - b.getFullYear();
    const hadBirthday = today.getMonth() > b.getMonth() || (today.getMonth() === b.getMonth() && today.getDate() >= b.getDate());
    if (!hadBirthday) western--;
    const nextBirthday = new Date(today.getFullYear(), b.getMonth(), b.getDate());
    if (nextBirthday <= today) nextBirthday.setFullYear(today.getFullYear() + 1);
    const daysUntil = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const totalDays = Math.floor((today.getTime() - b.getTime()) / (1000 * 60 * 60 * 24));
    setResult({ korean, western, daysUntil, totalDays,
      birthMonth: b.getMonth() + 1, birthDay: b.getDate(),
      hadBirthday });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-rose-400 text-sm mb-6 block">← 모아툴즈 홈</Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🎂 만 나이 계산기</h1>
          <p className="text-gray-400 text-sm">2023년 6월부터 법적 나이는 만 나이 기준</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-600 mb-2">생년월일</label>
            <input type="date" value={birth} onChange={e => setBirth(e.target.value)}
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-xl font-bold focus:border-rose-300 focus:outline-none" />
          </div>
          <button onClick={calc} className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-xl text-xl transition-colors">계산하기 🎂</button>
        </div>
        {result && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="bg-rose-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">만 나이 (법적)</p>
                <p className="text-4xl font-bold text-rose-500">{result.western}</p>
                <p className="text-xs text-gray-400 mt-1">세</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">한국 나이</p>
                <p className="text-4xl font-bold text-gray-500">{result.korean}</p>
                <p className="text-xs text-gray-400 mt-1">세</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">생일까지</span><span className="font-bold text-rose-500">{result.daysUntil}일 남음</span></div>
              <div className="flex justify-between"><span className="text-gray-500">태어난 지</span><span className="font-bold">{result.totalDays.toLocaleString()}일째</span></div>
              <div className="flex justify-between"><span className="text-gray-500">올해 생일</span><span className="font-bold">{result.hadBirthday ? '지났어요 🎉' : '아직 안 지났어요'}</span></div>
            </div>
            <div className="mt-4 bg-blue-50 rounded-xl p-3 text-xs text-blue-600 text-center">
              💡 2023년 6월부터 법, 행정에서 만 나이를 사용합니다
            </div>
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <p className="text-xs text-gray-400 text-center mb-3">🎁 생일 선물 준비하기</p>
          <a href="https://link.coupang.com/a/dKrLmXCeJg" target="_blank" rel="noopener noreferrer sponsored"
            className="block text-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors">
            🎁 생일 선물 베스트 →
          </a>
          <p className="text-xs text-gray-300 text-center mt-2">쿠팡파트너스 활동의 일환으로 수수료를 받을 수 있습니다</p>
        </div>
      </div>
    </main>
  );
}
