'use client';
import { useState } from 'react';
import Link from 'next/link';

const ZODIACS = ['쥐🐭','소🐮','호랑이🐯','토끼🐰','용🐲','뱀🐍','말🐴','양🐑','원숭이🐵','닭🐔','개🐶','돼지🐷'];
const ZODIAC_NAMES = ['쥐','소','호랑이','토끼','용','뱀','말','양','원숭이','닭','개','돼지'];

const COMPAT: Record<string, Record<string, { score: number; desc: string }>> = {
  쥐: { 소: {score:95,desc:'최고의 궁합! 서로의 부족함을 채워줘요'}, 용: {score:90,desc:'서로 끌리는 강한 인연'}, 원숭이: {score:88,desc:'활발하고 즐거운 관계'}, 말: {score:35,desc:'가치관 충돌이 잦아요'} },
  소: { 뱀: {score:92,desc:'신뢰와 안정의 완벽한 조합'}, 닭: {score:88,desc:'서로를 보완하는 관계'}, 쥐: {score:95,desc:'최고의 궁합!'}, 양: {score:30,desc:'상극! 갈등이 많아요'} },
  호랑이: { 말: {score:93,desc:'열정적이고 자유로운 관계'}, 개: {score:90,desc:'의리있고 든든한 파트너'}, 돼지: {score:85,desc:'서로 배려하는 따뜻한 관계'}, 뱀: {score:25,desc:'상극! 신뢰하기 어려워요'} },
  토끼: { 양: {score:95,desc:'감성이 통하는 천생연분'}, 돼지: {score:88,desc:'평화롭고 행복한 관계'}, 개: {score:85,desc:'믿음직한 파트너'}, 닭: {score:30,desc:'생각 차이가 커요'} },
  용: { 쥐: {score:90,desc:'서로를 빛나게 하는 관계'}, 원숭이: {score:92,desc:'지적이고 역동적인 조합'}, 닭: {score:88,desc:'강하고 안정적인 파트너'}, 개: {score:28,desc:'상극! 잦은 충돌'} },
  뱀: { 소: {score:92,desc:'깊은 신뢰로 쌓인 관계'}, 닭: {score:90,desc:'완벽한 조화'}, 원숭이: {score:85,desc:'지혜롭고 재미있는 관계'}, 호랑이: {score:25,desc:'상극! 서로 맞지 않아요'} },
  말: { 호랑이: {score:93,desc:'에너지 넘치는 최고의 궁합'}, 양: {score:90,desc:'자유롭고 낭만적인 관계'}, 개: {score:85,desc:'활발하고 신뢰있는 관계'}, 쥐: {score:35,desc:'가치관이 달라요'} },
  양: { 토끼: {score:95,desc:'예술적 감성이 통하는 천생연분'}, 말: {score:90,desc:'자유롭고 사랑스러운 관계'}, 돼지: {score:88,desc:'따뜻하고 평화로운 관계'}, 소: {score:30,desc:'상극! 갈등이 많아요'} },
  원숭이: { 쥐: {score:88,desc:'재치있고 즐거운 관계'}, 용: {score:92,desc:'지적 교류가 넘치는 관계'}, 뱀: {score:85,desc:'서로 배우는 관계'}, 호랑이: {score:30,desc:'경쟁이 심해요'} },
  닭: { 소: {score:88,desc:'믿음직하고 안정적인 관계'}, 뱀: {score:90,desc:'완벽한 조화와 신뢰'}, 용: {score:88,desc:'강하고 빛나는 관계'}, 토끼: {score:30,desc:'생각 차이가 커요'} },
  개: { 호랑이: {score:90,desc:'의리와 신뢰의 완벽한 조합'}, 말: {score:85,desc:'자유롭고 활발한 관계'}, 토끼: {score:85,desc:'믿음직한 파트너'}, 용: {score:28,desc:'상극! 충돌이 잦아요'} },
  돼지: { 토끼: {score:88,desc:'따뜻하고 평화로운 관계'}, 양: {score:88,desc:'풍요롭고 행복한 관계'}, 호랑이: {score:85,desc:'서로 배려하는 관계'}, 뱀: {score:30,desc:'가치관이 달라요'} },
};

function getYear(zodiac: string) {
  const idx = ZODIAC_NAMES.indexOf(zodiac);
  return idx >= 0 ? 2020 - (((2020 - 4) % 12) - idx + 12) % 12 : 0;
}

export default function ZodiacMatchPage() {
  const [z1, setZ1] = useState('');
  const [z2, setZ2] = useState('');
  const [result, setResult] = useState<any>(null);

  const calc = () => {
    if (!z1 || !z2) return;
    const data = COMPAT[z1]?.[z2] || COMPAT[z2]?.[z1];
    const score = data?.score ?? Math.floor(50 + (ZODIAC_NAMES.indexOf(z1) + ZODIAC_NAMES.indexOf(z2)) % 30 + 10);
    const desc = data?.desc ?? '독특한 조합이에요. 노력하면 좋은 관계를 만들 수 있어요';
    const emoji = score >= 90 ? '💕' : score >= 75 ? '😊' : score >= 50 ? '🤔' : '😅';
    setResult({ score, desc, emoji, z1, z2 });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-amber-500 text-sm mb-6 block">← 모아툴즈 홈</Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🐯 띠 궁합</h1>
          <p className="text-gray-400 text-sm">12간지 띠 궁합 분석</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
          <div className="grid grid-cols-2 gap-4 mb-5">
            {[{ label: '내 띠', value: z1, set: setZ1 }, { label: '상대방 띠', value: z2, set: setZ2 }].map(f => (
              <div key={f.label}>
                <label className="block text-sm font-semibold text-gray-600 mb-2">{f.label}</label>
                <select value={f.value} onChange={e => f.set(e.target.value)}
                  className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 font-bold focus:border-amber-300 focus:outline-none">
                  <option value="">선택</option>
                  {ZODIACS.map((z, i) => <option key={i} value={ZODIAC_NAMES[i]}>{z}</option>)}
                </select>
              </div>
            ))}
          </div>
          <button onClick={calc} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl text-xl transition-colors">띠 궁합 보기 🐯</button>
        </div>
        {result && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-5 text-center">
            <p className="text-5xl mb-3">{result.emoji}</p>
            <p className="text-gray-500 text-sm mb-3">{result.z1}띠 × {result.z2}띠</p>
            <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full" style={{ width: `${result.score}%` }} />
              <p className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">{result.score}점</p>
            </div>
            <p className="text-gray-600 bg-amber-50 rounded-xl p-4">{result.desc}</p>
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <p className="text-xs text-gray-400 text-center mb-3">🐯 사주·운세 더 알아보기</p>
          <a href="https://link.coupang.com/a/dKrI7wK8Yw" target="_blank" rel="noopener noreferrer sponsored"
            className="block text-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors">
            📚 운세·사주 베스트셀러 →
          </a>
          <p className="text-xs text-gray-300 text-center mt-2">쿠팡파트너스 활동의 일환으로 수수료를 받을 수 있습니다</p>
        </div>
      </div>
    </main>
  );
}
