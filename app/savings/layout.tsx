import { Metadata } from 'next';
export const metadata: Metadata = {
  title: '적금 계산기 - 이자세 공제 후 실수령액 | 모아툴즈',
  description: '월 납입금, 금리, 기간으로 적금 만기 수령액 계산. 이자세 15.4% 자동 공제.',
  keywords: '적금 계산기, 적금 이자 계산, 만기 수령액, 이자세, 세후 이자',
  openGraph: { title: '적금 계산기 - 이자세 공제 후 실수령액 | 모아툴즈', description: '월 납입금, 금리, 기간으로 적금 만기 수령액 계산. 이자세 15.4% 자동 공제.' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
