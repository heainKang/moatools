import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '오늘의 운세 2026 - 띠별 무료 운세 | 모아툴즈',
  description: '오늘의 운세를 띠별로 무료로 확인하세요. 매일 업데이트되는 쥐·소·호랑이·토끼 등 12간지 운세.',
  keywords: '오늘의 운세, 띠별 운세, 무료 운세, 2026 운세, 12간지 운세',
  openGraph: {
    title: '오늘의 운세 2026 - 띠별 무료 운세 | 모아툴즈',
    description: '매일 업데이트되는 띠별 오늘의 운세를 확인하세요.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
