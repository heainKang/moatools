import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '띠 궁합 - 12간지 띠별 궁합 분석 | 모아툴즈',
  description: '12간지 띠별 궁합을 무료로 확인하세요. 쥐·소·호랑이·토끼·용·뱀·말·양·원숭이·닭·개·돼지 궁합 분석.',
  keywords: '띠 궁합, 12간지 궁합, 띠별 궁합, 연애 궁합, 결혼 궁합',
  openGraph: {
    title: '띠 궁합 - 12간지 띠별 궁합 분석 | 모아툴즈',
    description: '12간지 띠별 궁합을 무료로 분석하세요.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
