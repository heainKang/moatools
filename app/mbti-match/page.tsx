'use client';
import { useState } from 'react';
import Link from 'next/link';

const compatibility: Record<string, Record<string, { score: number; desc: string }>> = {
  INFP: { ENFJ: { score: 98, desc: '천생연분! 서로의 감성을 완벽히 이해해요' }, INTJ: { score: 92, desc: '깊은 유대감을 형성할 수 있어요' }, ENFP: { score: 85, desc: '창의적인 에너지가 잘 맞아요' }, INFP: { score: 72, desc: '서로 이해하지만 갈등도 생길 수 있어요' }, ISTJ: { score: 45, desc: '가치관 차이로 어려움이 있을 수 있어요' }, ESTJ: { score: 38, desc: '많은 노력이 필요한 관계예요' } },
  ENFJ: { INFP: { score: 98, desc: '천생연분! 완벽한 이해와 지지' }, ISFP: { score: 90, desc: '서로를 성장시키는 관계예요' }, ENFP: { score: 80, desc: '열정과 에너지가 넘쳐요' } },
  INTJ: { ENFP: { score: 95, desc: '완벽한 균형! 서로의 부족함을 채워요' }, INFP: { score: 92, desc: '깊이 있는 관계를 만들어가요' }, INTP: { score: 78, desc: '지적 교류가 활발해요' }, ENTJ: { score: 70, desc: '목표지향적 두 사람의 만남' } },
  ENFP: { INTJ: { score: 95, desc: '완벽한 균형! 서로의 부족함을 채워요' }, INFJ: { score: 90, desc: '깊은 감성적 교류가 있어요' }, ENFJ: { score: 80, desc: '넘치는 에너지와 열정' } },
  ISFJ: { ESTP: { score: 88, desc: '서로의 다름이 매력이 돼요' }, ESFP: { score: 85, desc: '활기차고 따뜻한 관계' }, ISFJ: { score: 75, desc: '안정적이고 편안한 관계' } },
  ISTJ: { ESFP: { score: 85, desc: '안정감과 활력의 균형' }, ESTP: { score: 80, desc: '현실적인 두 사람의 만남' }, ISTJ: { score: 70, desc: '안정적이지만 변화가 필요해요' } },
};

const mbtiList = ['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP','ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP'];

export default function MbtiMatchPage() {
  const [m1, setM1] = useState('');
  const [m2, setM2] = useState('');
  const [result, setResult] = useState<any>(null);

  const calc = () => {
    if (!m1 || !m2) return;
    const data = compatibility[m1]?.[m2] || compatibility[m2]?.[m1];
    const score = data?.score ?? Math.floor(Math.random() * 30 + 50);
    const desc = data?.desc ?? '독특한 조합이에요. 서로 이해하려는 노력이 필요해요';
    const emoji = score >= 90 ? '💕' : score >= 75 ? '😊' : score >= 60 ? '🤔' : '😅';
    setResult({ score, desc, emoji });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-purple-400 text-sm mb-6 block">← 모아툴즈 홈</Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">💜 MBTI 궁합</h1>
          <p className="text-gray-400 text-sm">나와 그 사람의 MBTI 궁합을 확인해보세요</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
          <div className="grid grid-cols-2 gap-4 mb-5">
            {[{ label: '내 MBTI', value: m1, set: setM1 }, { label: '상대방 MBTI', value: m2, set: setM2 }].map(f => (
              <div key={f.label}>
                <label className="block text-sm font-semibold text-gray-600 mb-2">{f.label}</label>
                <select value={f.value} onChange={e => f.set(e.target.value)}
                  className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-lg font-bold focus:border-purple-300 focus:outline-none">
                  <option value="">선택</option>
                  {mbtiList.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            ))}
          </div>
          <button onClick={calc} className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 rounded-xl text-xl transition-colors">궁합 보기 💕</button>
        </div>
        {result && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-5 text-center">
            <p className="text-6xl mb-3">{result.emoji}</p>
            <p className="text-gray-500 text-sm mb-2">{m1} × {m2} 궁합</p>
            <div className="relative mb-4">
              <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-1000"
                  style={{ width: `${result.score}%` }} />
              </div>
              <p className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">{result.score}%</p>
            </div>
            <p className="text-gray-600 bg-purple-50 rounded-xl p-4">{result.desc}</p>
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <p className="text-xs text-gray-400 text-center mb-3">💌 관계를 더 깊게 이해하고 싶다면</p>
          <a href="https://link.coupang.com/a/dKrI7wK8Yw" target="_blank" rel="noopener noreferrer sponsored"
            className="block text-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors">
            📚 MBTI 심리 베스트셀러 보기 →
          </a>
          <p className="text-xs text-gray-300 text-center mt-2">쿠팡파트너스 활동의 일환으로 수수료를 받을 수 있습니다</p>
        </div>
      </div>
    </main>
  );
}
