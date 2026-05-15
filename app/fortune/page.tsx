'use client';
import { useState } from 'react';
import Link from 'next/link';

const FORTUNES = {
  쥐: ['오늘은 새로운 기회가 찾아오는 날입니다. 주변의 작은 신호를 놓치지 마세요.', '재물운이 상승하는 날. 중요한 결정은 오늘 하는 것이 좋습니다.', '인간관계에서 뜻밖의 좋은 소식이 올 수 있습니다.'],
  소: ['꾸준한 노력이 빛을 발하는 시기입니다. 서두르지 마세요.', '건강에 각별히 신경 쓰세요. 무리한 일정은 피하는 것이 좋습니다.', '재물에 관한 좋은 기운이 있습니다. 계획적으로 움직이세요.'],
  호랑이: ['오늘은 당신의 날! 리더십을 발휘할 기회가 옵니다.', '용기 있게 도전하면 좋은 결과가 따릅니다.', '주변에서 당신의 능력을 인정받는 날입니다.'],
  토끼: ['평화로운 하루가 예상됩니다. 내면의 소리에 귀를 기울이세요.', '창의적인 아이디어가 빛을 발하는 날입니다.', '사랑운이 상승하는 날. 소중한 사람에게 마음을 표현해보세요.'],
  용: ['큰 그림을 그리는 날입니다. 장기적인 목표를 세워보세요.', '자신감을 가지고 행동하면 좋은 결과가 따릅니다.', '금전적인 기회가 찾아올 수 있습니다. 신중하게 판단하세요.'],
  뱀: ['직관을 믿으세요. 오늘은 논리보다 감이 중요합니다.', '숨겨진 정보가 드러나는 날. 새로운 사실을 알게 될 수 있습니다.', '조용히 준비하는 것이 유리한 날입니다.'],
  말: ['활발한 활동이 좋은 결과를 가져옵니다. 적극적으로 움직이세요.', '여행이나 이동에 관한 좋은 기운이 있습니다.', '스포츠나 운동에서 좋은 성과를 낼 수 있습니다.'],
  양: ['예술적 감각이 발휘되는 날입니다. 창작 활동에 도전해보세요.', '따뜻한 인간관계가 당신을 도와줍니다.', '봉사와 나눔이 복을 불러오는 날입니다.'],
  원숭이: ['재치와 유머로 어려운 상황을 돌파하세요.', '다재다능한 능력이 빛을 발하는 날입니다.', '새로운 기술이나 지식을 습득하기 좋은 날입니다.'],
  닭: ['세심한 준비가 성공을 이끕니다. 꼼꼼하게 확인하세요.', '직장에서 능력을 인정받을 기회가 옵니다.', '건강 관리에 신경 쓰면 좋은 날입니다.'],
  개: ['의리와 신뢰가 빛나는 날입니다. 주변을 도와주세요.', '오랜 친구에게서 좋은 소식이 올 수 있습니다.', '정직하게 행동하면 반드시 좋은 결과가 따릅니다.'],
  돼지: ['풍요롭고 행복한 기운이 가득한 날입니다.', '맛있는 음식과 즐거운 만남이 기다리고 있습니다.', '재물운이 상승하는 날. 투자나 저축을 고려해보세요.'],
};

const ZODIACS = ['쥐','소','호랑이','토끼','용','뱀','말','양','원숭이','닭','개','돼지'];
const STARS = ['⭐','⭐⭐','⭐⭐⭐','⭐⭐⭐⭐','⭐⭐⭐⭐⭐'];
const COLORS = ['text-red-500','text-orange-500','text-yellow-500','text-green-500','text-blue-500'];

function getZodiac(year: number) {
  return ZODIACS[(year - 4) % 12];
}

function getDailyFortune(zodiac: string) {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth()+1) * 100 + today.getDate() + ZODIACS.indexOf(zodiac);
  const idx = seed % FORTUNES[zodiac as keyof typeof FORTUNES].length;
  const starIdx = seed % 5;
  return { text: FORTUNES[zodiac as keyof typeof FORTUNES][idx], stars: STARS[starIdx], color: COLORS[starIdx] };
}

const CATEGORIES = [
  { label: '종합운', emoji: '🌟' },
  { label: '재물운', emoji: '💰' },
  { label: '애정운', emoji: '❤️' },
  { label: '건강운', emoji: '💪' },
];

export default function FortunePage() {
  const [year, setYear] = useState('');
  const [result, setResult] = useState<any>(null);

  const calc = () => {
    const y = parseInt(year);
    if (!y || y < 1900 || y > 2025) return;
    const zodiac = getZodiac(y);
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth()+1) * 100 + today.getDate();
    const cats = CATEGORIES.map((c, i) => ({
      ...c,
      stars: STARS[(seed + i + ZODIACS.indexOf(zodiac)) % 5],
      color: COLORS[(seed + i + ZODIACS.indexOf(zodiac)) % 5],
    }));
    setResult({ zodiac, fortune: getDailyFortune(zodiac), categories: cats,
      date: today.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' }) });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-purple-300 text-sm mb-6 block">← 모아툴즈 홈</Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">🔮 오늘의 운세</h1>
          <p className="text-purple-300 text-sm">{new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })} 운세</p>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-5">
          <label className="block text-sm font-semibold text-purple-200 mb-2">태어난 년도</label>
          <input type="number" value={year} onChange={e => setYear(e.target.value)} placeholder="예) 1995"
            className="w-full bg-white/20 text-white placeholder-white/40 rounded-xl px-4 py-4 text-2xl font-bold focus:outline-none focus:bg-white/30 mb-4" />
          <button onClick={calc} className="w-full bg-purple-500 hover:bg-purple-400 text-white font-bold py-4 rounded-xl text-lg transition-colors">
            오늘의 운세 보기 🔮
          </button>
        </div>
        {result && (
          <>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-4 text-center">
              <p className="text-purple-300 text-sm mb-2">{result.date}</p>
              <p className="text-5xl mb-2">✨</p>
              <p className="text-2xl font-bold text-white mb-1">{result.zodiac}띠 운세</p>
              <p className={`text-2xl mb-4 ${result.fortune.color}`}>{result.fortune.stars}</p>
              <p className="text-purple-100 leading-relaxed">{result.fortune.text}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {result.categories.map((c: any) => (
                <div key={c.label} className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                  <p className="text-2xl mb-1">{c.emoji}</p>
                  <p className="text-white text-sm font-medium mb-1">{c.label}</p>
                  <p className={`text-sm ${c.color}`}>{c.stars}</p>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-5">
          <p className="text-xs text-purple-300 text-center mb-3">🌙 오늘 하루도 행복하게</p>
          <a href="https://link.coupang.com/a/dKrI7wK8Yw" target="_blank" rel="noopener noreferrer sponsored"
            className="block text-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors">
            📚 심리·운세 베스트셀러 →
          </a>
          <p className="text-xs text-purple-300 text-center mt-2">쿠팡파트너스 활동의 일환으로 수수료를 받을 수 있습니다</p>
        </div>
      </div>
    </main>
  );
}
