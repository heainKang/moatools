import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '자동차세 계산기 2026 - 차종·배기량별 세금 자동계산 | 모아툴즈',
  description: '2026년 자동차세 계산기. 배기량, 차령에 따른 세금 자동계산. 연납 할인 포함 실납부액 즉시 확인.',
  keywords: '자동차세 계산기, 자동차세 조회, 차량세금, 자동차세 연납, 배기량별 세금',
  openGraph: {
    title: '자동차세 계산기 2026 - 배기량별 세금 자동계산 | 모아툴즈',
    description: '2026년 자동차세를 배기량과 차령에 따라 즉시 계산하세요.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
