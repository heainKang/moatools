import { Metadata } from 'next';
export const metadata: Metadata = {
  title: '퇴직금 실업급여 계산기 - 예상 수령액 | 모아툴즈',
  description: '근속연수, 월급으로 퇴직금 예상액 계산. 실업급여 수급 기간 및 예상 금액 확인.',
  keywords: '퇴직금 계산기, 실업급여 계산, 퇴직금 계산 방법, 실업급여 수급액',
  openGraph: { title: '퇴직금 실업급여 계산기 - 예상 수령액 | 모아툴즈', description: '근속연수, 월급으로 퇴직금 예상액 계산. 실업급여 수급 기간 및 예상 금액 확인.' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
