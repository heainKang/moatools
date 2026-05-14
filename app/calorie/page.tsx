'use client';
import { useState } from 'react';
import Link from 'next/link';

const activities = [
  { label: '거의 안 함', value: 1.2 },
  { label: '가벼운 운동 (주 1-3일)', value: 1.375 },
  { label: '보통 운동 (주 3-5일)', value: 1.55 },
  { label: '격렬한 운동 (주 6-7일)', value: 1.725 },
  { label: '매우 격렬 (운동선수)', value: 1.9 },
];

export default function CaloriePage() {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('1.55');
  const [result, setResult] = useState<any>(null);

  const calc = () => {
    const h = parseFloat(height), w = parseFloat(weight), a = parseInt(age);
    if (!h || !w || !a) return;
    const bmr = gender === 'male'
      ? 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a)
      : 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
    const tdee = Math.round(bmr * parseFloat(activity));
    setResult({ bmr: Math.round(bmr), tdee, diet: tdee - 500, bulk: tdee + 300 });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-orange-400 text-sm mb-6 block">← 모아툴즈 홈</Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🔥 칼로리 계산기</h1>
          <p className="text-gray-400 text-sm">하루 권장 칼로리 · 다이어트 목표 칼로리 계산</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
          <div className="flex gap-2 mb-4">
            {[{ v: 'male', label: '남성 ♂' }, { v: 'female', label: '여성 ♀' }].map(g => (
              <button key={g.v} onClick={() => setGender(g.v)}
                className={`flex-1 py-3 rounded-xl font-bold transition-colors ${gender === g.v ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {g.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: '나이', value: age, set: setAge, unit: '세', placeholder: '25' },
              { label: '키', value: height, set: setHeight, unit: 'cm', placeholder: '170' },
              { label: '몸무게', value: weight, set: setWeight, unit: 'kg', placeholder: '65' },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-xs font-semibold text-gray-600 mb-1">{f.label} ({f.unit})</label>
                <input type="number" value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                  className="w-full border-2 border-gray-100 rounded-xl px-3 py-2.5 text-lg font-bold focus:border-orange-300 focus:outline-none" />
              </div>
            ))}
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-600 mb-2">활동 수준</label>
            <select value={activity} onChange={e => setActivity(e.target.value)}
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 font-medium focus:border-orange-300 focus:outline-none">
              {activities.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
            </select>
          </div>
          <button onClick={calc} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl text-xl transition-colors">계산하기</button>
        </div>
        {result && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
            <div className="text-center py-4 bg-orange-50 rounded-xl mb-5">
              <p className="text-sm text-orange-400 mb-1">하루 유지 칼로리 (TDEE)</p>
              <p className="text-4xl font-bold text-orange-500">{result.tdee.toLocaleString()} kcal</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: '기초대사량', value: result.bmr, color: 'bg-gray-50 text-gray-600' },
                { label: '다이어트', value: result.diet, color: 'bg-blue-50 text-blue-600' },
                { label: '벌크업', value: result.bulk, color: 'bg-red-50 text-red-600' },
              ].map(item => (
                <div key={item.label} className={`${item.color} rounded-xl p-3 text-center`}>
                  <p className="text-xs font-medium mb-1">{item.label}</p>
                  <p className="text-lg font-bold">{item.value.toLocaleString()}</p>
                  <p className="text-xs">kcal</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <p className="text-xs text-gray-400 text-center mb-3">🥗 건강한 다이어트를 위해</p>
          <a href="https://link.coupang.com/a/dKqU2n5GSq" target="_blank" rel="noopener noreferrer sponsored"
            className="block text-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors">
            💊 다이어트 보조제 베스트 →
          </a>
          <p className="text-xs text-gray-300 text-center mt-2">쿠팡파트너스 활동의 일환으로 수수료를 받을 수 있습니다</p>
        </div>
      </div>
    </main>
  );
}
