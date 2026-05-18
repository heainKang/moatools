import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '만 나이 계산기 2026 - 법적 만 나이 즉시 확인 | 모아툴즈',
  description: '2026년 기준 만 나이 계산기. 생년월일 입력으로 법적 만 나이와 생일까지 D-day를 즉시 확인하세요.',
  keywords: '만 나이 계산기, 만나이 계산, 법적 나이, 만 나이 조회, 나이 계산기',
  openGraph: {
    title: '만 나이 계산기 2026 - 법적 만 나이 즉시 확인 | 모아툴즈',
    description: '생년월일로 법적 만 나이를 즉시 계산하세요.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
