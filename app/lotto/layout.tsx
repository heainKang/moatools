import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로또 번호 생성기 - 무료 랜덤 번호 자동 생성 | 모아툴즈',
  description: '로또 번호를 무료로 자동 생성하세요. 1~45 사이 랜덤 번호 6개를 즉시 생성합니다.',
  keywords: '로또 번호 생성기, 로또 자동번호, 무료 로또, 행운 번호, 로또 1등',
  openGraph: {
    title: '로또 번호 생성기 - 무료 랜덤 번호 자동 생성 | 모아툴즈',
    description: '로또 행운 번호를 무료로 즉시 생성하세요.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
