import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '계산기 가이드 블로그 | 모아툴즈',
  description: '연봉 실수령액, 청약 가점, MBTI 궁합 등 생활 계산기 완벽 가이드 모음',
};

function getPosts() {
  const dir = path.join(process.cwd(), 'content/blog');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')))
    .filter(p => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function BlogPage() {
  const posts = getPosts();

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-gray-400 text-sm mb-6 block">← 모아툴즈 홈</Link>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📝 계산기 가이드</h1>
        <p className="text-gray-400 text-sm mb-8">연봉, 청약, MBTI 등 생활 계산기 완벽 가이드</p>

        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-4">📝</p>
            <p>곧 글이 올라올 예정이에요!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <p className="text-xs text-gray-300 mb-2">{post.date}</p>
                  <h2 className="font-bold text-gray-800 text-lg mb-2">{post.title}</h2>
                  <p className="text-sm text-indigo-500">#{post.keyword}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
