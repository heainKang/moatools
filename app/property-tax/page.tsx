'use client';
import { useState } from 'react';
import Link from 'next/link';

function calcTax(price: number, isAdjusted: boolean, houseCount: number) {
  // 취득세율 계산 (2024년 기준)
  let rate = 0;
  if (houseCount === 0) { // 무주택
    if (price <= 600000000) rate = 0.01;
    else if (price <= 900000000) rate = 0.02;
    else rate = 0.03;
  } else if (houseCount === 1) {
    rate = 0.01; // 1주택자 일시적 2주택
    if (price > 600000000) rate = 0.02;
  } else {
    rate = 0.08; // 2주택 이상 조정대상지역
    if (!isAdjusted) rate = 0.04;
  }

  const acquisitionTax = Math.round(price * rate);
  const localEduTax = Math.round(acquisitionTax * 0.1); // 지방교육세 10%
  const specialTax = rate > 0.01 ? Math.round(price * 0.003) : 0; // 농어촌특별세
  const total = acquisitionTax + localEduTax + specialTax;

  return { rate: rate * 100, acquisitionTax, localEduTax, specialTax, total };
}

const won = (n: number) => n.toLocaleString('ko-KR') + '원';

export default function PropertyTaxPage() {
  const [price, setPrice] = useState('');
  const [isAdjusted, setIsAdjusted] = useState(true);
  const [houseCount, setHouseCount] = useState('0');
  const [result, setResult] = useState<ReturnType<typeof calcTax> | null>(null);

  const calc = () => {
    const p = parseInt(price.replace(/,/g, '')) * 10000;
    if (!p) return;
    setResult(calcTax(p, isAdjusted, parseInt(houseCount)));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-amber-600 text-sm mb-6 block">← 모아툴즈 홈</Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🏠 취득세 계산기</h1>
          <p className="text-gray-400 text-sm">2024년 기준 부동산 취득세 자동 계산</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-2">매매가 (만원)</label>
            <input type="text" value={price}
              onChange={e => setPrice(e.target.value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','))}
              placeholder="50,000"
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-xl font-bold focus:border-amber-300 focus:outline-none" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-2">현재 보유 주택 수</label>
            <div className="flex gap-2">
              {[{ v: '0', label: '무주택' }, { v: '1', label: '1주택' }, { v: '2', label: '2주택 이상' }].map(o => (
                <button key={o.v} onClick={() => setHouseCount(o.v)}
                  className={`flex-1 py-3 rounded-xl font-medium text-sm transition-colors ${houseCount === o.v ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-600 mb-2">지역</label>
            <div className="flex gap-2">
              {[{ v: true, label: '조정대상지역' }, { v: false, label: '비조정지역' }].map(o => (
                <button key={String(o.v)} onClick={() => setIsAdjusted(o.v)}
                  className={`flex-1 py-3 rounded-xl font-medium text-sm transition-colors ${isAdjusted === o.v ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={calc}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl text-xl transition-colors">
            취득세 계산하기
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-5">
            <div className="text-center py-4 bg-amber-50 rounded-xl mb-5">
              <p className="text-sm text-amber-500 mb-1">총 납부 세금 (세율 {result.rate}%)</p>
              <p className="text-4xl font-bold text-amber-600">{won(result.total)}</p>
            </div>
            <div className="space-y-3">
              {[
                { label: '취득세', value: result.acquisitionTax },
                { label: '지방교육세 (10%)', value: result.localEduTax },
                { label: '농어촌특별세', value: result.specialTax },
              ].map(item => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-bold text-gray-700">{won(item.value)}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 text-center mt-4">실제 세금은 개별 상황에 따라 다를 수 있습니다</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-md p-5">
          <p className="text-xs text-gray-400 text-center mb-3">🏠 내 집 마련 가이드</p>
          <a href="https://link.coupang.com/a/dKrQ1NZad" target="_blank" rel="noopener noreferrer sponsored"
            className="block text-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors">
            📚 부동산 투자 베스트셀러 →
          </a>
          <p className="text-xs text-gray-300 text-center mt-2">쿠팡파트너스 활동의 일환으로 수수료를 받을 수 있습니다</p>
        </div>
      </div>
    </main>
  );
}
