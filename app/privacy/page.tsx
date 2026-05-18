import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '개인정보 처리방침 | 모아툴즈',
  description: '모아툴즈의 개인정보 처리방침을 확인하세요.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-500 text-sm hover:underline">← 홈으로</Link>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">개인정보 처리방침</h1>
          <p className="text-gray-400 text-sm mb-8">최종 수정일: 2026년 5월 18일</p>

          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-3">1. 개요</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              모아툴즈(moatools.vercel.app, 이하 &quot;서비스&quot;)는 사용자의 개인정보를 소중히 여깁니다.
              본 방침은 서비스 이용 과정에서 수집되는 정보와 그 처리 방법을 안내합니다.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-3">2. 수집하는 정보</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-2">
              모아툴즈는 계산기 도구 특성상 <strong>별도의 회원가입이나 개인정보 수집을 하지 않습니다.</strong>
              사용자가 계산기에 입력하는 값(연봉, 체중 등)은 서버에 저장되지 않으며 브라우저 내에서만 처리됩니다.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              단, 서비스 품질 향상을 위해 아래 정보가 자동 수집될 수 있습니다:
            </p>
            <ul className="list-disc list-inside text-gray-600 text-sm mt-2 space-y-1">
              <li>방문 페이지, 체류 시간 등 서비스 이용 기록 (Google Analytics)</li>
              <li>기기 종류, 브라우저 종류, 운영체제 등 기기 정보</li>
              <li>IP 주소 (Vercel 서버 로그)</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-3">3. 광고 서비스 (Google AdSense)</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              본 서비스는 Google AdSense를 통해 광고를 게재합니다. Google은 쿠키를 사용하여
              사용자의 관심사에 맞는 광고를 표시할 수 있습니다. Google의 광고 쿠키 사용을
              거부하려면{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Google 광고 설정
              </a>
              을 방문하세요.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-3">4. 쿠키(Cookie)</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              서비스는 Google AdSense 광고 게재를 위해 쿠키를 사용합니다. 브라우저 설정에서
              쿠키를 비활성화할 수 있으나, 일부 기능이 제한될 수 있습니다.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-3">5. 제3자 링크</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              서비스에는 쿠팡 등 제3자 사이트로의 링크가 포함될 수 있습니다.
              해당 사이트의 개인정보 처리방침은 각 사이트의 정책을 따르며, 모아툴즈는 책임을 지지 않습니다.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-3">6. 정보 보유 기간</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              서버에 개인정보를 저장하지 않으므로 별도의 보유 기간이 없습니다.
              Google Analytics 데이터는 Google의 정책에 따라 26개월간 보관됩니다.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-3">7. 문의</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              개인정보 처리방침에 관한 문의사항은 아래 이메일로 연락주세요.
            </p>
            <p className="text-blue-500 text-sm mt-2">a01023906731@gmail.com</p>
          </section>
        </div>
      </div>
    </main>
  );
}
