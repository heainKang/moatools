import { Metadata } from 'next';
export const metadata: Metadata = {
  title: '청약 가점 계산기 - 아파트 청약 점수 | 모아툴즈',
  description: '무주택 기간, 부양가족, 청약통장 가입기간으로 청약 가점 자동 계산. 만점 84점 기준.',
  keywords: '청약 가점 계산기, 아파트 청약 점수, 청약 가점제, 주택청약, 청약 점수 계산',
  openGraph: { title: '청약 가점 계산기 - 아파트 청약 점수 | 모아툴즈', description: '무주택 기간, 부양가족, 청약통장 가입기간으로 청약 가점 자동 계산. 만점 84점 기준.' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
