import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '복리 계산기 - 복리 수익 시뮬레이션 | 모아툴즈',
  description: '원금, 연 수익률, 투자 기간을 입력하면 복리 수익을 자동 계산합니다. 단리와 복리 비교도 가능합니다.',
  keywords: '복리 계산기, 복리 수익 계산, 투자 수익 계산, 복리의 마법, 장기 투자 계산',
  openGraph: {
    title: '복리 계산기 - 복리 수익 시뮬레이션 | 모아툴즈',
    description: '원금과 수익률로 복리 수익을 즉시 계산하세요.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
