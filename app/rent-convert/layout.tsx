import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '전월세 계산기 - 전세 월세 전환 계산 | 모아툴즈',
  description: '전세를 월세로, 월세를 전세로 전환하는 계산기. 전월세 전환율 적용으로 정확한 금액을 계산하세요.',
  keywords: '전월세 계산기, 전세 월세 전환, 보증금 계산, 월세 전환율, 전세 대출',
  openGraph: {
    title: '전월세 계산기 - 전세 월세 전환 계산 | 모아툴즈',
    description: '전세·월세 전환 금액을 즉시 계산하세요.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
