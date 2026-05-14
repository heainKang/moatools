import { Metadata } from 'next';
export const metadata: Metadata = {
  title: '반려동물 사료량 계산기 - 강아지 고양이 | 모아툴즈',
  description: '강아지 고양이 몸무게, 나이, 활동량으로 하루 적정 사료량 계산. 건식/습식 사료 급여량.',
  keywords: '강아지 사료량, 고양이 사료량, 반려동물 사료 계산, 하루 사료량, 강아지 하루 밥량',
  openGraph: { title: '반려동물 사료량 계산기 - 강아지 고양이 | 모아툴즈', description: '강아지 고양이 몸무게, 나이, 활동량으로 하루 적정 사료량 계산. 건식/습식 사료 급여량.' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
