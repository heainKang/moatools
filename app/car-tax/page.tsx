'use client';
import { useState } from 'react';
import Link from 'next/link';

const CAR_TYPES = [
  { label: '비영업용 승용차', rates: [{ cc: 1000, rate: 80 }, { cc: 1600, rate: 140 }, { cc: 2000, rate: 200 }, { cc: 2500, rate: 260 }, { cc: 99999, rate: 520 }] },
  { label: '영업용 승용차', rates: [{ cc: 99999, rate: 25 }] },
  { label: '승합차(비영업)', rates: [{ cc: 99999, rate: 65 }] },
  { label: '화물차', rates: [{ cc: 99999, rate: 28 }] },
];

function calcCarTax(cc: number, typeIdx: number, years: number) {
  const type = CAR_TYPES[typeIdx];
  const bracket = type.rates.find(r => cc <= r.cc) || type.rates[type.rates.length - 1];
  const baseTax = cc * bracket.rate;
  // 3년 이상 경감: 5%씩 최대 50%
  const discount = Math.min(Math.max(years - 2, 0) * 5, 50);
  const tax = Math.round(baseTax * (1 - discount / 100));
  const edu = Math.round(tax * 0.3); // 지방교육세 30%
  return { tax, edu, total: tax + edu, discount, rate: bracket.rate };
}

const won = (n: number) => n.toLocaleString('ko-KR') + '원';

export default function CarTaxPage() {
  const [cc, setCc] = useState('');
  const [typeIdx, setTypeIdx] = useState(0);
  const [years, setYears] = useState('1');
  const [result, setResult] = useState<any>(null);

  const calc = () => {
    const c = parseInt(cc.replace(/,/g, ''));
    if (!c) return;
    setResult(calcCarTax(c, typeIdx, parseInt(years)));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-gray-400 text-sm mb-6 block">← 모아툴즈 홈</Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🚗 자동차세 계산기</h1>
          <p className="text-gray-400 text-sm">2024년 기준 · 연납 할인 포함</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-2">차량 종류</label>
            <div className="grid grid-cols-2 gap-2">
              {CAR_TYPES.map((t, i) => (
                <button key={i} onClick={() => setTypeIdx(i)}
                  className={`py-2.5 rounded-xl text-sm font-medium transition-colors ${typeIdx === i ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-2">배기량 (cc)</label>
            <input type="text" value={cc} onChange={e => setCc(e.target.value.replace(/[^0-9]/g, ''))} placeholder="예) 1998"
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-xl font-bold focus:border-slate-300 focus:outline-none" />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-600 mb-2">차령 (년)</label>
            <select value={years} onChange={e => setYears(e.target.value)}
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 font-bold focus:border-slate-300 focus:outline-none">
              {Array.from({length: 15}, (_, i) => i + 1).map(y => <option key={y} value={y}>{y}년</option>)}
            </select>
          </div>
          <button onClick={calc} className="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-4 rounded-xl text-xl transition-colors">계산하기</button>
        </div>
        {result && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
            <div className="text-center py-4 bg-slate-50 rounded-xl mb-5">
              <p className="text-sm text-slate-400 mb-1">연간 자동차세 (지방교육세 포함)</p>
              <p className="text-4xl font-bold text-slate-700">{won(result.total)}</p>
              {result.discount > 0 && <p className="text-sm text-green-500 mt-1">차령 경감 -{result.discount}% 적용</p>}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">자동차세</span><span className="font-bold">{won(result.tax)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">지방교육세 (30%)</span><span className="font-bold">{won(result.edu)}</span></div>
              <div className="border-t pt-2 flex justify-between"><span className="text-gray-500">1월 연납 시 (5% 할인)</span><span className="font-bold text-green-600">{won(Math.round(result.total * 0.95))}</span></div>
            </div>
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <p className="text-xs text-gray-400 text-center mb-3">🚗 차량 관리 용품</p>
          <a href="https://link.coupang.com/a/dKqZ1hz3n2" target="_blank" rel="noopener noreferrer sponsored"
            className="block text-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors">
            🔧 자동차 용품 베스트 →
          </a>
          <p className="text-xs text-gray-300 text-center mt-2">쿠팡파트너스 활동의 일환으로 수수료를 받을 수 있습니다</p>
        </div>
      </div>
    </main>
  );
}
