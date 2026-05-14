import Link from 'next/link';

const tools = [
  { href: '/salary', emoji: '💰', title: '연봉 실수령액 계산기', desc: '4대보험, 소득세 자동 계산', badge: '인기', color: 'bg-indigo-50 border-indigo-200' },
  { href: '/bmi', emoji: '⚖️', title: 'BMI 계산기', desc: '체질량지수로 건강 체중 확인', badge: '', color: 'bg-green-50 border-green-200' },
  { href: '/hourly', emoji: '🕐', title: '시급 계산기', desc: '주휴수당 포함 월급 계산', badge: 'NEW', color: 'bg-yellow-50 border-yellow-200' },
  { href: '/dday', emoji: '📅', title: 'D-day 계산기', desc: '목표일까지 남은 날짜 계산', badge: 'NEW', color: 'bg-pink-50 border-pink-200' },
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

        <p className="text-center text-xs text-gray-300 mt-10">
          더 많은 도구가 추가될 예정입니다
        </p>
      </div>
    </main>
  );
}
