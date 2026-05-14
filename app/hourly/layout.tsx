import { Metadata } from 'next';
export const metadata: Metadata = {
  title: '시급 계산기 - 주휴수당 포함 월급 계산 2024 | 모아툴즈',
  description: '시급 입력하면 주휴수당 포함 월급 자동 계산. 2024년 최저시급 9,860원 기준.',
  keywords: '시급 계산기, 주휴수당 계산, 월급 계산, 최저시급, 아르바이트 월급',
  openGraph: { title: '시급 계산기 - 주휴수당 포함 월급 계산 2024 | 모아툴즈', description: '시급 입력하면 주휴수당 포함 월급 자동 계산. 2024년 최저시급 9,860원 기준.' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
