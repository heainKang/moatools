import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content/blog');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => ({ slug: f.replace('.json', '') }));
}

function getPost(slug: string) {
  const filePath = path.join(process.cwd(), 'content/blog', `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | 모아툴즈`,
    description: `${post.keyword} 완벽 가이드. 모아툴즈에서 직접 계산해보세요.`,
    keywords: post.keyword,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const paragraphs = post.content
    .split('\n')
    .map((line: string, i: number) => {
      if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-bold text-gray-700 mt-6 mb-2">{line.replace('### ', '')}</h3>;
      if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-gray-800 mt-8 mb-3">{line.replace('## ', '')}</h2>;
      if (line.startsWith('- ')) return <li key={i} className="text-gray-600 ml-4 list-disc">{line.replace('- ', '')}</li>;
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="text-gray-600 leading-relaxed mb-2">{line}</p>;
    });

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/blog" className="text-gray-400 text-sm mb-6 block">← 블로그 목록</Link>

        <article className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-xs text-gray-300 mb-3">{post.date}</p>
          <h1 className="text-2xl font-bold text-gray-800 mb-6">{post.title}</h1>
          <div className="prose">{paragraphs}</div>
        </article>

        <div className="mt-6 bg-indigo-50 rounded-2xl p-5 text-center">
          <p className="text-sm text-indigo-600 font-medium mb-3">👆 직접 계산해보세요!</p>
          <Link href={post.url}
            className="block bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl transition-colors">
            {post.keyword} 계산기 바로가기 →
          </Link>
        </div>
      </div>
    </main>
  );
}
