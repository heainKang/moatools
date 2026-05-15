'use client';
import { useState } from 'react';
import Link from 'next/link';

const won = (n: number) => n.toLocaleString('ko-KR') + '원';

export default function CompoundPage() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('10');
  const [monthly, setMonthly] = useState('');
  const [result, setResult] = useState<any>(null);

  const calc = () => {
    const p = parseInt(principal.replace(/,/g, '')) * 10000;
    const r = parseFloat(rate) / 100;
    const y = parseInt(years);
    const m = parseInt(monthly.replace(/,/g, '') || '0') * 10000;
    if (!p || !r || !y) return;

    // 원금 복리
    const principalFV = Math.round(p * Math.pow(1 + r, y));
    // 월 납입 복리 (월 이율)
    const mr = r / 12;
    const months = y * 12;
    const monthlyFV = m > 0 ? Math.round(m * (Math.pow(1 + mr, months) - 1) / mr) : 0;
    const total = principalFV + monthlyFV;
    const invested = p + m * months;
    const interest = total - invested;

    const yearly = Array.from({ length: Math.min(y, 10) }, (_, i) => {
      const yr = i + 1;
      const pv = Math.round(p * Math.pow(1 + r, yr));
      const mv = m > 0 ? Math.round(m * (Math.pow(1 + mr, yr * 12) - 1) / mr) : 0;
      return { year: yr, total: pv + mv };
    });

    setResult({ total, invested, interest, principalFV, monthlyFV, yearly });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-green-400 text-sm mb-6 block">← 모아툴즈 홈</Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📈 복리 계산기</h1>
          <p className="text-gray-400 text-sm">시간이 돈을 만드는 복리의 마법</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
          {[
            { label: '초기 투자금 (만원)', value: principal, set: setPrincipal, placeholder: '1,000' },
            { label: '월 추가 투자 (만원, 선택)', value: monthly, set: setMonthly, placeholder: '0' },
          ].map(f => (
            <div key={f.label} className="mb-4">
              <label className="block text-sm font-semibold text-gray-600 mb-2">{f.label}</label>
              <input type="text" value={f.value} onChange={e => f.set(e.target.value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','))} placeholder={f.placeholder}
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-xl font-bold focus:border-green-300 focus:outline-none" />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">연이율 (%)</label>
              <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="7"
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-xl font-bold focus:border-green-300 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">기간 (년)</label>
              <select value={years} onChange={e => setYears(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 font-bold focus:border-green-300 focus:outline-none">
                {[5,10,15,20,25,30].map(y => <option key={y} value={y}>{y}년</option>)}
              </select>
            </div>
          </div>
          <button onClick={calc} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl text-xl transition-colors">계산하기 📈</button>
        </div>
        {result && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
            <div className="text-center py-4 bg-green-50 rounded-xl mb-5">
              <p className="text-sm text-green-400 mb-1">{years}년 후 예상 자산</p>
              <p className="text-4xl font-bold text-green-600">{won(result.total)}</p>
            </div>
            <div className="space-y-2 text-sm mb-5">
              <div className="flex justify-between"><span className="text-gray-500">총 투자금</span><span className="font-bold">{won(result.invested)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">이자 수익</span><span className="font-bold text-green-600">+{won(result.interest)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">수익률</span><span className="font-bold text-green-600">+{Math.round((result.interest / result.invested) * 100)}%</span></div>
            </div>
            <div className="space-y-1">
              {result.yearly.map((y: any) => (
                <div key={y.year} className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">{y.year}년 후</span>
                  <div className="flex-1 mx-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-400 rounded-full" style={{ width: `${(y.total / result.total) * 100}%` }} />
                  </div>
                  <span className="font-medium text-gray-700 text-xs">{won(y.total)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <p className="text-xs text-gray-400 text-center mb-3">📚 재테크 공부 시작하기</p>
          <a href="https://link.coupang.com/a/dKqZ1hz3n2" target="_blank" rel="noopener noreferrer sponsored"
            className="block text-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors">
            💰 투자 입문 베스트셀러 →
          </a>
          <p className="text-xs text-gray-300 text-center mt-2">쿠팡파트너스 활동의 일환으로 수수료를 받을 수 있습니다</p>
        </div>
      </div>
    </main>
  );
}
