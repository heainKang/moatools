import { Metadata } from 'next';
export const metadata: Metadata = {
  title: '칼로리 계산기 - 하루 권장 칼로리 TDEE 계산 | 모아툴즈',
  description: '나이, 키, 몸무게, 활동량으로 하루 권장 칼로리 계산. 다이어트/벌크업 목표 칼로리 제공.',
  keywords: '칼로리 계산기, TDEE, 기초대사량, 하루 칼로리, 다이어트 칼로리',
  openGraph: { title: '칼로리 계산기 - 하루 권장 칼로리 TDEE 계산 | 모아툴즈', description: '나이, 키, 몸무게, 활동량으로 하루 권장 칼로리 계산. 다이어트/벌크업 목표 칼로리 제공.' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
