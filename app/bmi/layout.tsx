import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'BMI 계산기 - 체질량지수 비만도 측정 | 모아툴즈',
  description: '키와 몸무게로 BMI 체질량지수 계산. 저체중/정상/과체중/비만 판정, 이상 체중 확인.',
  keywords: 'BMI 계산기, 체질량지수, 비만도 계산, 키 몸무게 계산, 이상체중',
  openGraph: { title: 'BMI 계산기 - 체질량지수 비만도 측정 | 모아툴즈', description: '키와 몸무게로 BMI 체질량지수 계산. 저체중/정상/과체중/비만 판정, 이상 체중 확인.' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
