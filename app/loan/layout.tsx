import { Metadata } from 'next';
export const metadata: Metadata = {
  title: '대출 이자 계산기 - 원리금균등 원금균등 상환 | 모아툴즈',
  description: '대출금액, 금리, 기간 입력하면 월 상환금액 자동 계산. 원리금균등/원금균등 상환 비교.',
  keywords: '대출 이자 계산기, 월 상환금, 원리금균등, 원금균등, 주택담보대출 계산',
  openGraph: { title: '대출 이자 계산기 - 원리금균등 원금균등 상환 | 모아툴즈', description: '대출금액, 금리, 기간 입력하면 월 상환금액 자동 계산. 원리금균등/원금균등 상환 비교.' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
