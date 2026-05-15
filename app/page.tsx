import Link from 'next/link';

const tools = [
  { href: '/salary', emoji: '💰', title: '연봉 실수령액 계산기', desc: '4대보험, 소득세 자동 계산', badge: '인기', color: 'bg-indigo-50 border-indigo-200' },
  { href: '/bmi', emoji: '⚖️', title: 'BMI 계산기', desc: '체질량지수로 건강 체중 확인', badge: '', color: 'bg-green-50 border-green-200' },
  { href: '/hourly', emoji: '🕐', title: '시급 계산기', desc: '주휴수당 포함 월급 계산', badge: '', color: 'bg-yellow-50 border-yellow-200' },
  { href: '/dday', emoji: '📅', title: 'D-day 계산기', desc: '목표일까지 남은 날짜 계산', badge: '', color: 'bg-pink-50 border-pink-200' },
  { href: '/loan', emoji: '🏦', title: '대출 이자 계산기', desc: '원리금균등·원금균등 상환 계산', badge: '인기', color: 'bg-blue-50 border-blue-200' },
  { href: '/savings', emoji: '🐷', title: '적금 계산기', desc: '이자세 공제 후 실수령액 계산', badge: '', color: 'bg-emerald-50 border-emerald-200' },
  { href: '/calorie', emoji: '🔥', title: '칼로리 계산기', desc: '하루 권장 칼로리 자동 계산', badge: '', color: 'bg-orange-50 border-orange-200' },
  { href: '/mbti-match', emoji: '💜', title: 'MBTI 궁합', desc: '16가지 유형별 궁합 분석', badge: '인기', color: 'bg-purple-50 border-purple-200' },
  { href: '/blood-type', emoji: '🩸', title: '혈액형 궁합', desc: 'A·B·O·AB형 궁합 분석', badge: '', color: 'bg-red-50 border-red-200' },
  { href: '/severance', emoji: '📋', title: '퇴직금·실업급여 계산기', desc: '퇴직금 및 실업급여 예상액', badge: 'NEW', color: 'bg-slate-50 border-slate-200' },
  { href: '/subscription', emoji: '🏠', title: '청약 가점 계산기', desc: '아파트 청약 가점 미리 계산', badge: 'NEW', color: 'bg-sky-50 border-sky-200' },
  { href: '/pet-food', emoji: '🐾', title: '반려동물 사료량 계산기', desc: '강아지·고양이 적정 사료량', badge: '', color: 'bg-amber-50 border-amber-200' },
  { href: '/sleep', emoji: '🌙', title: '수면 계산기', desc: '최적 취침·기상 시간 계산', badge: 'NEW', color: 'bg-indigo-50 border-indigo-200' },
  { href: '/lotto', emoji: '🍀', title: '로또 번호 생성기', desc: '랜덤 로또 번호 자동 생성', badge: 'NEW', color: 'bg-yellow-50 border-yellow-200' },
  { href: '/exchange', emoji: '💱', title: '환율 계산기', desc: '실시간 환율 · USD JPY EUR', badge: 'NEW', color: 'bg-blue-50 border-blue-200' },
  { href: '/property-tax', emoji: '🏠', title: '취득세 계산기', desc: '부동산 취득세 자동 계산', badge: '', color: 'bg-orange-50 border-orange-200' },
  { href: '/fortune', emoji: '🔮', title: '오늘의 운세', desc: '띠별 오늘 운세 · 매일 업데이트', badge: 'NEW', color: 'bg-purple-50 border-purple-200' },
  { href: '/korean-age', emoji: '🎂', title: '만 나이 계산기', desc: '법적 만 나이 · 생일까지 D-day', badge: 'NEW', color: 'bg-rose-50 border-rose-200' },
  { href: '/car-tax', emoji: '🚗', title: '자동차세 계산기', desc: '차종·배기량·차령별 세금 계산', badge: 'NEW', color: 'bg-slate-50 border-slate-200' },
  { href: '/body-fat', emoji: '💪', title: '체지방률 계산기', desc: '해군 공식 기준 체지방 측정', badge: 'NEW', color: 'bg-teal-50 border-teal-200' },
  { href: '/rent-convert', emoji: '🏘️', title: '전월세 계산기', desc: '전세 ↔ 월세 전환 계산', badge: 'NEW', color: 'bg-violet-50 border-violet-200' },
  { href: '/parental-leave', emoji: '👶', title: '육아휴직급여 계산기', desc: '고용보험 육아휴직급여 계산', badge: 'NEW', color: 'bg-pink-50 border-pink-200' },
  { href: '/compound-interest', emoji: '📈', title: '복리 계산기', desc: '시간이 만드는 복리의 마법', badge: 'NEW', color: 'bg-green-50 border-green-200' },
  { href: '/zodiac-match', emoji: '🐯', title: '띠 궁합', desc: '12간지 띠별 궁합 분석', badge: 'NEW', color: 'bg-amber-50 border-amber-200' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">🧰 모아툴즈</h1>
          <p className="text-gray-500">생활에 필요한 계산기 · 도구 모음</p>
        </div>

        <div className="grid gap-4">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href}>
              <div className={`border-2 ${tool.color} bg-white rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer flex items-center gap-4`}>
                <span className="text-4xl">{tool.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-bold text-gray-800 text-lg">{tool.title}</h2>
                    {tool.badge && (
                      <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">{tool.badge}</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm">{tool.desc}</p>
                </div>
                <span className="text-gray-300 text-2xl">›</span>
              </div>
            </Link>
          ))}
        </div>

        <Link href="/blog">
          <div className="mt-4 border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center hover:border-gray-300 transition-colors cursor-pointer">
            <span className="text-gray-400 text-sm">📝 계산기 가이드 블로그 보기 →</span>
          </div>
        </Link>

        <p className="text-center text-xs text-gray-300 mt-6">
          더 많은 도구가 추가될 예정입니다
        </p>
      </div>
    </main>
  );
}
