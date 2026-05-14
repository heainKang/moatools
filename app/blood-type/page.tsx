'use client';
import { useState } from 'react';
import Link from 'next/link';

const bloodData: Record<string, Record<string, { score: number; desc: string; good: string; bad: string }>> = {
  A: {
    A: { score: 85, desc: '안정적이고 신중한 두 사람', good: '서로의 감정을 잘 이해해요', bad: '소통이 부족할 수 있어요' },
    B: { score: 60, desc: '정반대의 매력이 충돌해요', good: '서로에게 자극이 돼요', bad: '가치관 차이로 갈등 가능' },
    O: { score: 88, desc: 'A형의 세심함 + O형의 리더십', good: '서로 보완하는 관계', bad: 'O형의 직설이 상처 줄 수 있어요' },
    AB: { score: 78, desc: '이성적인 두 사람의 만남', good: '서로 존중해요', bad: 'AB형의 변덕이 불안감 줄 수 있어요' },
  },
  B: {
    A: { score: 60, desc: '다름이 매력이자 갈등 원인', good: 'B형의 활력이 A형에게 자극', bad: '서로 답답함을 느낄 수 있어요' },
    B: { score: 75, desc: '자유로운 두 영혼의 만남', good: '서로를 완전히 이해해요', bad: '안정감이 부족할 수 있어요' },
    O: { score: 70, desc: '활발하지만 자존심 충돌 주의', good: '함께하면 에너지가 넘쳐요', bad: '둘 다 고집이 세요' },
    AB: { score: 82, desc: 'B형의 개성 + AB형의 지성', good: '서로의 다양성을 인정해요', bad: '예측 불가능한 관계' },
  },
  O: {
    A: { score: 88, desc: '든든한 리더 + 세심한 서포터', good: 'O형이 A형을 이끌어줘요', bad: 'O형의 강함이 부담될 수 있어요' },
    B: { score: 70, desc: '서로 끌리지만 갈등도 많아요', good: '열정적인 관계', bad: '자존심 싸움 주의' },
    O: { score: 80, desc: '강한 두 사람의 만남', good: '서로 믿고 의지해요', bad: '둘 다 고집이 강해요' },
    AB: { score: 85, desc: '현실 + 이상의 균형', good: 'AB형이 O형을 흥미롭게 해요', bad: 'O형은 AB형을 이해하기 어려울 수 있어요' },
  },
  AB: {
    A: { score: 78, desc: '이성과 감성의 조화', good: '서로 배울 게 많아요', bad: 'AB형의 다중적 성격이 혼란스러울 수 있어요' },
    B: { score: 82, desc: '개성 강한 두 사람', good: '서로의 자유를 존중해요', bad: '감정적 교류가 부족할 수 있어요' },
    O: { score: 85, desc: '지성 + 행동력의 조합', good: '서로를 발전시켜요', bad: 'AB형이 O형에게 차갑게 보일 수 있어요' },
    AB: { score: 72, desc: 'AB형끼리는 서로 미스터리', good: '지적 교류가 활발해요', bad: '감정 표현이 서툴러서 멀어질 수 있어요' },
  },
};

export default function BloodTypePage() {
  const [b1, setB1] = useState('');
  const [b2, setB2] = useState('');
  const [result, setResult] = useState<any>(null);

  const calc = () => {
    if (!b1 || !b2) return;
    const data = bloodData[b1]?.[b2] || bloodData[b2]?.[b1];
    if (data) setResult({ ...data, b1, b2 });
  };

  const types = ['A', 'B', 'O', 'AB'];

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-red-400 text-sm mb-6 block">← 모아툴즈 홈</Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🩸 혈액형 궁합</h1>
          <p className="text-gray-400 text-sm">나와 그 사람의 혈액형 궁합을 확인해보세요</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
          <div className="grid grid-cols-2 gap-4 mb-5">
            {[{ label: '내 혈액형', value: b1, set: setB1 }, { label: '상대방 혈액형', value: b2, set: setB2 }].map(f => (
              <div key={f.label}>
                <label className="block text-sm font-semibold text-gray-600 mb-2">{f.label}</label>
                <div className="grid grid-cols-2 gap-2">
                  {types.map(t => (
                    <button key={t} onClick={() => f.set(t)}
                      className={`py-3 rounded-xl font-bold transition-colors ${f.value === t ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-red-50'}`}>
                      {t}형
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={calc} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl text-xl transition-colors">궁합 보기 🩸</button>
        </div>
        {result && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
            <div className="text-center py-4 bg-red-50 rounded-xl mb-5">
              <p className="text-gray-500 text-sm mb-2">{result.b1}형 × {result.b2}형</p>
              <p className="text-4xl font-bold text-red-500">{result.score}점</p>
              <p className="text-gray-600 mt-2 font-medium">{result.desc}</p>
            </div>
            <div className="space-y-3">
              <div className="bg-green-50 rounded-xl p-3">
                <p className="text-xs font-bold text-green-600 mb-1">✅ 잘 맞는 점</p>
                <p className="text-sm text-gray-600">{result.good}</p>
              </div>
              <div className="bg-red-50 rounded-xl p-3">
                <p className="text-xs font-bold text-red-500 mb-1">⚠️ 주의할 점</p>
                <p className="text-sm text-gray-600">{result.bad}</p>
              </div>
            </div>
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <p className="text-xs text-gray-400 text-center mb-3">💑 관계 심리학이 궁금하다면</p>
          <a href="https://link.coupang.com/a/심리" target="_blank" rel="noopener noreferrer sponsored"
            className="block text-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors">
            📚 관계 심리 베스트셀러 →
          </a>
          <p className="text-xs text-gray-300 text-center mt-2">쿠팡파트너스 활동의 일환으로 수수료를 받을 수 있습니다</p>
        </div>
      </div>
    </main>
  );
}
