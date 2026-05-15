'use client';
import { useState } from 'react';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';

export default function BlogPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const post = blogPosts.find(p => p.slug === selected);
  const sorted = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (post) {
    const lines = post.content.split('\n');
    return (
      <main className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setSelected(null)} className="text-gray-400 text-sm mb-6 block">← 블로그 목록</button>
          <article className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <p className="text-xs text-gray-300 mb-3">{post.date}</p>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">{post.title}</h1>
            <div>
              {lines.map((line, i) => {
                if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-bold text-gray-700 mt-6 mb-2">{line.replace('### ', '')}</h3>;
                if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-gray-800 mt-8 mb-3">{line.replace('## ', '')}</h2>;
                if (line.startsWith('# ')) return null;
                if (line.startsWith('- ')) return <li key={i} className="text-gray-600 ml-5 list-disc mb-1">{line.replace('- ', '')}</li>;
                if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-bold text-gray-700 mb-2">{line.replace(/\*\*/g, '')}</p>;
                if (line.trim() === '' || line.trim() === '---') return <br key={i} />;
                return <p key={i} className="text-gray-600 leading-relaxed mb-2">{line.replace(/\*\*/g, '')}</p>;
              })}
            </div>
          </article>
          <div className="bg-indigo-50 rounded-2xl p-5 text-center">
            <p className="text-sm text-indigo-600 font-medium mb-3">직접 계산해보세요!</p>
            <Link href={post.url} className="block bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl transition-colors">
              {post.keyword} 계산기 바로가기 →
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-gray-400 text-sm mb-6 block">← 모아툴즈 홈</Link>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📝 계산기 가이드</h1>
        <p className="text-gray-400 text-sm mb-8">생활 계산기 완벽 가이드 모음</p>
        <div className="space-y-4">
          {sorted.map(p => (
            <button key={p.slug} onClick={() => setSelected(p.slug)} className="w-full text-left">
              <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                <p className="text-xs text-gray-300 mb-2">{p.date}</p>
                <h2 className="font-bold text-gray-800 text-lg mb-2">{p.title}</h2>
                <p className="text-sm text-indigo-500">#{p.keyword}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
