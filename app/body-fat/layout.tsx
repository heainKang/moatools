import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '체지방률 계산기 - 해군 공식 기준 체지방 측정 | 모아툴즈',
  description: '해군 공식(Naval Method)으로 체지방률을 계산하세요. 성별·나이별 정상 범위와 비교합니다.',
  keywords: '체지방률 계산기, 체지방 측정, 체성분 계산, 해군 공식, 비만도 계산',
  openGraph: {
    title: '체지방률 계산기 - 해군 공식 기준 체지방 측정 | 모아툴즈',
    description: '해군 공식으로 체지방률을 정확하게 계산하세요.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
