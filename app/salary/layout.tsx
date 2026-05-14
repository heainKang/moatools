import { Metadata } from 'next';
export const metadata: Metadata = {
  title: '연봉 실수령액 계산기 2024 - 4대보험 소득세 자동계산 | 모아툴즈',
  description: '2024년 연봉 실수령액 계산기. 국민연금, 건강보험, 고용보험, 근로소득세 자동계산. 월 실수령액 즉시 확인.',
  keywords: '연봉 실수령액, 연봉 계산기, 4대보험 계산, 소득세 계산, 월급 계산기',
  openGraph: { title: '연봉 실수령액 계산기 2024 - 4대보험 소득세 자동계산 | 모아툴즈', description: '2024년 연봉 실수령액 계산기. 국민연금, 건강보험, 고용보험, 근로소득세 자동계산. 월 실수령액 즉시 확인.' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
