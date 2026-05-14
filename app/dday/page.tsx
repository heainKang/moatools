'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function DdayPage() {
  const [targetDate, setTargetDate] = useState('');
  const [label, setLabel] = useState('');
  const [result, setResult] = useState<{ days: number; isPast: boolean; label: string } | null>(null);

  const calc = () => {
    if (!targetDate) return;
    const target = new Date(targetDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    const diff = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    setResult({ days: Math.abs(diff), isPast: diff < 0, label: label || '목표일' });
  };

  const quickDates = [
    { label: '수능', month: 11, day: 14 },
    { label: '크리스마스', month: 12, day: 25 },
    { label: '새해', month: 1, day: 1, nextYear: true },
  ];

  const setQuick = (q: typeof quickDates[0]) => {
    const now = new Date();
    let year = now.getFullYear();
    if (q.nextYear) year += 1;
    else if (new Date(year, q.month - 1, q.day) < now) year += 1;
    setTargetDate(`${year}-${String(q.month).padStart(2, '0')}-${String(q.day).padStart(2, '0')}`);
    setLabel(q.label);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-pink-400 text-sm mb-6 block">← 모아툴즈 홈</Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📅 D-day 계산기</h1>
          <p className="text-gray-400 text-sm">목표일까지 남은 날짜를 확인하세요</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
          <div className="flex gap-2 mb-4">
            {quickDates.map(q => (
              <button key={q.label} onClick={() => setQuick(q)}
                className="flex-1 bg-pink-50 hover:bg-pink-100 text-pink-600 text-sm font-medium py-2 rounded-lg transition-colors">
                {q.label}
              </button>
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-2">목표 이름</label>
            <input type="text" value={label} onChange={e => setLabel(e.target.value)} placeholder="예) 수능, 생일, 여행"
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-lg font-bold focus:border-pink-300 focus:outline-none" />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-600 mb-2">목표 날짜</label>
            <input type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)}
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-lg font-bold focus:border-pink-300 focus:outline-none" />
          </div>
          <button onClick={calc} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl text-xl transition-colors">계산하기</button>
        </div>

        {result && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-5 text-center">
            <p className="text-gray-500 text-sm mb-2">{result.label}까지</p>
            {result.days === 0 ? (
              <p className="text-5xl font-bold text-pink-500">🎉 오늘!</p>
            ) : (
              <>
                <p className="text-7xl font-bold text-pink-500">{result.days}</p>
                <p className="text-2xl font-bold text-gray-600 mt-2">{result.isPast ? '일 전이었어요' : '일 남았어요'}</p>
              </>
            )}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-md p-5 mb-4">
          <p className="text-xs text-gray-400 text-center mb-3">🗓️ 목표 달성을 위한 준비</p>
          <a href="https://link.coupang.com/a/dKrLmXCeJg" target="_blank" rel="noopener noreferrer sponsored"
            className="block text-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors">
            📔 다이어리 · 플래너 베스트 보기 →
          </a>
          <p className="text-xs text-gray-300 text-center mt-2">쿠팡파트너스 활동의 일환으로 수수료를 받을 수 있습니다</p>
        </div>
      </div>
    </main>
  );
}
