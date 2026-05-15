'use client';
import { useState } from 'react';
import Link from 'next/link';

const SLEEP_CYCLE = 90; // 수면 주기 90분
const FALL_ASLEEP = 15; // 잠드는데 걸리는 시간

function getSleepTimes(wakeTime: string) {
  const [h, m] = wakeTime.split(':').map(Number);
  const wakeMinutes = h * 60 + m;
  const times = [];
  for (let cycles = 6; cycles >= 3; cycles--) {
    const sleepMinutes = wakeMinutes - (cycles * SLEEP_CYCLE) - FALL_ASLEEP;
    const adj = ((sleepMinutes % 1440) + 1440) % 1440;
    const sh = Math.floor(adj / 60).toString().padStart(2, '0');
    const sm = (adj % 60).toString().padStart(2, '0');
    times.push({ time: `${sh}:${sm}`, cycles, hours: (cycles * SLEEP_CYCLE / 60).toFixed(1) });
  }
  return times;
}

function getWakeTimes(sleepTime: string) {
  const [h, m] = sleepTime.split(':').map(Number);
  const sleepMinutes = h * 60 + m + FALL_ASLEEP;
  const times = [];
  for (let cycles = 3; cycles <= 6; cycles++) {
    const wakeMinutes = sleepMinutes + cycles * SLEEP_CYCLE;
    const adj = wakeMinutes % 1440;
    const wh = Math.floor(adj / 60).toString().padStart(2, '0');
    const wm = (adj % 60).toString().padStart(2, '0');
    times.push({ time: `${wh}:${wm}`, cycles, hours: (cycles * SLEEP_CYCLE / 60).toFixed(1) });
  }
  return times;
}

export default function SleepPage() {
  const [mode, setMode] = useState<'wake' | 'sleep'>('wake');
  const [time, setTime] = useState('07:00');
  const [results, setResults] = useState<{ time: string; cycles: number; hours: string }[]>([]);

  const calc = () => {
    setResults(mode === 'wake' ? getSleepTimes(time) : getWakeTimes(time));
  };

  const quality = (cycles: number) =>
    cycles >= 6 ? { label: '최상', color: 'text-green-500' } :
    cycles === 5 ? { label: '좋음', color: 'text-blue-500' } :
    cycles === 4 ? { label: '보통', color: 'text-yellow-500' } :
    { label: '부족', color: 'text-red-400' };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-indigo-300 text-sm mb-6 block">← 모아툴즈 홈</Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">🌙 수면 계산기</h1>
          <p className="text-indigo-300 text-sm">수면 주기 90분 기준 최적 취침/기상 시간</p>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-5">
          <div className="flex gap-2 mb-5">
            {[{ v: 'wake', label: '기상 시간으로 취침 계산' }, { v: 'sleep', label: '취침 시간으로 기상 계산' }].map(m => (
              <button key={m.v} onClick={() => { setMode(m.v as any); setResults([]); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${mode === m.v ? 'bg-white text-indigo-900' : 'bg-white/20 text-white'}`}>
                {m.label}
              </button>
            ))}
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-indigo-200 mb-2">
              {mode === 'wake' ? '기상 시간' : '취침 시간'}
            </label>
            <input type="time" value={time} onChange={e => setTime(e.target.value)}
              className="w-full bg-white/20 text-white rounded-xl px-4 py-4 text-2xl font-bold focus:outline-none focus:bg-white/30" />
          </div>
          <button onClick={calc}
            className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-4 rounded-xl text-lg transition-colors">
            계산하기 🌙
          </button>
        </div>

        {results.length > 0 && (
          <div className="space-y-3 mb-5">
            <p className="text-indigo-300 text-sm text-center">
              {mode === 'wake' ? `${time} 기상을 위한 추천 취침 시간` : `${time} 취침 후 추천 기상 시간`}
            </p>
            {results.map((r, i) => {
              const q = quality(r.cycles);
              return (
                <div key={i} className={`bg-white/10 backdrop-blur rounded-2xl p-4 flex items-center justify-between ${i === 1 ? 'ring-2 ring-indigo-400' : ''}`}>
                  <div>
                    <p className="text-2xl font-bold text-white">{r.time}</p>
                    <p className="text-indigo-300 text-sm">{r.cycles}사이클 · {r.hours}시간</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-lg ${q.color}`}>{q.label}</p>
                    {i === 1 && <p className="text-indigo-300 text-xs">추천</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="bg-white/10 backdrop-blur rounded-2xl p-5">
          <p className="text-xs text-indigo-300 text-center mb-3">😴 숙면을 위한 준비</p>
          <a href="https://link.coupang.com/a/dKqU2n5GSq" target="_blank" rel="noopener noreferrer sponsored"
            className="block text-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors">
            🛏️ 수면 보조제 베스트 →
          </a>
          <p className="text-xs text-indigo-300 text-center mt-2">쿠팡파트너스 활동의 일환으로 수수료를 받을 수 있습니다</p>
        </div>
      </div>
    </main>
  );
}
