import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '육아휴직급여 계산기 2026 - 고용보험 육아휴직 급여 | 모아툴즈',
  description: '2026년 육아휴직급여 계산기. 통상임금 기준 육아휴직급여 상한액·하한액을 자동 계산합니다.',
  keywords: '육아휴직급여 계산기, 육아휴직 급여, 고용보험 육아휴직, 육아휴직 신청, 2026 육아휴직',
  openGraph: {
    title: '육아휴직급여 계산기 2026 - 고용보험 육아휴직 급여 | 모아툴즈',
    description: '2026년 육아휴직급여를 즉시 계산하세요.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
