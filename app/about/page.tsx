import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '모아툴즈 소개 | 생활 계산기 도구 모음',
  description: '모아툴즈는 연봉 계산기, BMI, 대출이자, MBTI 궁합 등 24가지 생활 계산기를 무료로 제공하는 서비스입니다.',
};

export default function AboutPage() {
  const tools = [
    '연봉 실수령액 계산기', 'BMI 계산기', '시급 계산기', '대출 이자 계산기',
    '적금 계산기', '칼로리 계산기', 'MBTI 궁합', '혈액형 궁합',
    '퇴직금·실업급여 계산기', '청약 가점 계산기', '수면 계산기', '로또 번호 생성기',
    '환율 계산기', '취득세 계산기', '오늘의 운세', '만 나이 계산기',
    '자동차세 계산기', '체지방률 계산기', '전월세 계산기', '육아휴직급여 계산기',
    '복리 계산기', '띠 궁합', '반려동물 사료량 계산기', 'D-day 계산기',
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-500 text-sm hover:underline">← 홈으로</Link>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">🧰 모아툴즈 소개</h1>
          <p className="text-gray-500 text-sm mb-6">생활에 필요한 계산기를 한곳에서</p>

          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            모아툴즈는 <strong>연봉 실수령액, 대출 이자, BMI, MBTI 궁합</strong> 등
            일상에서 자주 필요한 계산기와 도구를 한 곳에서 무료로 이용할 수 있는 서비스입니다.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            복잡한 공식을 몰라도 간단히 입력만 하면 즉시 결과를 확인할 수 있으며,
            모든 계산은 브라우저 내에서 처리되어 개인정보가 서버에 저장되지 않습니다.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-gray-700 mb-4">제공 도구 ({tools.length}가지)</h2>
          <div className="grid grid-cols-2 gap-2">
            {tools.map((tool) => (
              <div key={tool} className="text-gray-600 text-sm py-1 border-b border-gray-50">
                • {tool}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-lg font-bold text-gray-700 mb-4">문의</h2>
          <p className="text-gray-600 text-sm mb-2">서비스 관련 문의, 오류 제보, 도구 추가 요청은 이메일로 연락주세요.</p>
          <p className="text-blue-500 text-sm">a01023906731@gmail.com</p>
        </div>
      </div>
    </main>
  );
}
