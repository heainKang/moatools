'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function BodyFatPage() {
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const [hip, setHip] = useState('');
  const [result, setResult] = useState<any>(null);

  const calc = () => {
    const h = parseFloat(height), w = parseFloat(weight);
    const wa = parseFloat(waist), ne = parseFloat(neck), hi = parseFloat(hip);
    if (!h || !w || !wa || !ne) return;

    let bf: number;
    if (gender === 'male') {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(wa - ne) + 0.15456 * Math.log10(h)) - 450;
    } else {
      if (!hi) return;
      bf = 495 / (1.29579 - 0.35004 * Math.log10(wa + hi - ne) + 0.22100 * Math.log10(h)) - 450;
    }
    bf = Math.round(bf * 10) / 10;

    const bmi = w / (h / 100) ** 2;
    const fatMass = Math.round(w * bf / 100 * 10) / 10;
    const leanMass = Math.round((w - fatMass) * 10) / 10;

    let label, color;
    if (gender === 'male') {
      if (bf < 6) { label = '필수지방'; color = 'text-blue-500'; }
      else if (bf < 14) { label = '운동선수'; color = 'text-green-500'; }
      else if (bf < 18) { label = '건강'; color = 'text-green-400'; }
      else if (bf < 25) { label = '보통'; color = 'text-yellow-500'; }
      else { label = '비만'; color = 'text-red-500'; }
    } else {
      if (bf < 14) { label = '필수지방'; color = 'text-blue-500'; }
      else if (bf < 21) { label = '운동선수'; color = 'text-green-500'; }
      else if (bf < 25) { label = '건강'; color = 'text-green-400'; }
      else if (bf < 32) { label = '보통'; color = 'text-yellow-500'; }
      else { label = '비만'; color = 'text-red-500'; }
    }
    setResult({ bf, label, color, fatMass, leanMass, bmi: Math.round(bmi * 10) / 10 });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-teal-400 text-sm mb-6 block">← 모아툴즈 홈</Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">💪 체지방률 계산기</h1>
          <p className="text-gray-400 text-sm">해군 공식 (Navy Method) 기준</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
          <div className="flex gap-2 mb-4">
            {[{ v: 'male', label: '남성 ♂' }, { v: 'female', label: '여성 ♀' }].map(g => (
              <button key={g.v} onClick={() => setGender(g.v)}
                className={`flex-1 py-3 rounded-xl font-bold transition-colors ${gender === g.v ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {g.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: '키(cm)', value: height, set: setHeight, placeholder: '175' },
              { label: '몸무게(kg)', value: weight, set: setWeight, placeholder: '70' },
              { label: '허리둘레(cm)', value: waist, set: setWaist, placeholder: '80' },
              { label: '목둘레(cm)', value: neck, set: setNeck, placeholder: '38' },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-xs font-semibold text-gray-600 mb-1">{f.label}</label>
                <input type="number" value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                  className="w-full border-2 border-gray-100 rounded-xl px-3 py-2.5 text-lg font-bold focus:border-teal-300 focus:outline-none" />
              </div>
            ))}
            {gender === 'female' && (
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1">엉덩이둘레(cm)</label>
                <input type="number" value={hip} onChange={e => setHip(e.target.value)} placeholder="95"
                  className="w-full border-2 border-gray-100 rounded-xl px-3 py-2.5 text-lg font-bold focus:border-teal-300 focus:outline-none" />
              </div>
            )}
          </div>
          <button onClick={calc} className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 rounded-xl text-xl transition-colors">계산하기</button>
        </div>
        {result && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
            <div className="text-center py-4 bg-teal-50 rounded-xl mb-5">
              <p className="text-sm text-teal-400 mb-1">체지방률</p>
              <p className="text-5xl font-bold text-teal-600">{result.bf}%</p>
              <p className={`text-xl font-bold mt-2 ${result.color}`}>{result.label}</p>
            </div>
            <div className="space-y-2 text-sm">
              {[
                { label: '지방 무게', value: `${result.fatMass}kg` },
                { label: '근육 무게', value: `${result.leanMass}kg` },
                { label: 'BMI', value: result.bmi },
              ].map(item => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-bold text-gray-700">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <p className="text-xs text-gray-400 text-center mb-3">💪 체지방 관리를 위해</p>
          <a href="https://link.coupang.com/a/dKqU2n5GSq" target="_blank" rel="noopener noreferrer sponsored"
            className="block text-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors">
            🥗 다이어트 보조제 베스트 →
          </a>
          <p className="text-xs text-gray-300 text-center mt-2">쿠팡파트너스 활동의 일환으로 수수료를 받을 수 있습니다</p>
        </div>
      </div>
    </main>
  );
}
