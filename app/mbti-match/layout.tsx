import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'MBTI 궁합 - 16가지 유형별 연애 궁합 | 모아툴즈',
  description: 'MBTI 유형으로 연애 궁합 점수 확인. INFP, ENFJ, INTJ 등 16가지 유형 궁합 분석.',
  keywords: 'MBTI 궁합, MBTI 연애 궁합, 인프피 궁합, INFP 궁합, MBTI compatibility',
  openGraph: { title: 'MBTI 궁합 - 16가지 유형별 연애 궁합 | 모아툴즈', description: 'MBTI 유형으로 연애 궁합 점수 확인. INFP, ENFJ, INTJ 등 16가지 유형 궁합 분석.' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
