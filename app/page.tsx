import { PostCard } from '@/components/features/blog/PostCard';
import TagSection from '@/app/_components/TagSection';
import ProfileSection from '@/app/_components/ProfileSection';
import ContactSection from '@/app/_components/ContactSection';
import { getPublishedPosts, getPublishedPostTags } from '@/lib/notion';
import Link from 'next/link';
import SortSelect from '@/app/_components/client/SortSelect';

interface HomeProps {
  searchParams: Promise<{ tag?: string; sort?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  // URL 파라미터에서 태그 필터 가져오기
  const { tag, sort } = await searchParams;

  const selectedTag = tag || '전체';
  const selectedSort = sort || 'latest';

  // 병렬로 데이터 가져오기
  const [posts, allTags] = await Promise.all([
    getPublishedPosts(tag, selectedSort), // 필터링된 포스트
    getPublishedPostTags(), // 전체 태그 목록
  ]);

  return (
    <div className="container py-8">
      <div className="grid grid-cols-[200px_1fr_220px] gap-6">
        {/* 좌측 사이드바 */}
        <aside>
          <TagSection tags={allTags} selectedTag={tag} />
        </aside>

        <div className="space-y-8">
          {/* 섹션 제목 */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">
              {selectedTag === '전체' ? '블로그 목록' : `${selectedTag} 관련 글`}
            </h2>
            <SortSelect />
          </div>

          {/* 블로그 카드 그리드 */}
          <div className="grid gap-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.id}>
                  <PostCard post={post} />
                </Link>
              ))
            ) : (
              <div className="py-12 text-center">
                <p className="text-muted-foreground text-lg">아직 게시된 포스트가 없습니다.</p>
              </div>
            )}
          </div>
        </div>

        {/* 우측 사이드바 */}
        <aside className="flex flex-col gap-6">
          <ProfileSection />
          <ContactSection />
        </aside>
      </div>
    </div>
  );
}
