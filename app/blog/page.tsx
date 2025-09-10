import TagSection from '@/app/_components/client/TagSelection';
import ProfileSection from '@/app/_components/ProfileSection';
import ContactSection from '@/app/_components/ContactSection';
import { getPublishedPostTags } from '@/lib/notion';
import HeaderSection from '@/app/_components/HeaderSection';
import PostListSuspense from '@/components/features/blog/PostListSuspense';
import TagSectionSkeleton from '@/app/_components/TagSelectionSkeleton';
import { Suspense } from 'react';
import PostListSkeleton from '@/components/features/blog/PostListSkeleton';

interface BlogProps {
  searchParams: Promise<{ tag?: string; sort?: string }>;
}

export default async function Blog({ searchParams }: BlogProps) {
  const { tag, sort } = await searchParams;
  const selectedTag = tag || '전체';
  const selectedSort = sort || 'latest';

  const tags = getPublishedPostTags();
  return (
    <div className="container py-8">
      <div className="grid grid-cols-[200px_1fr_220px] gap-6">
        {/* 좌측 사이드바 */}
        <aside>
          <Suspense fallback={<TagSectionSkeleton />}>
            <TagSection tags={tags} selectedTag={selectedTag} />
          </Suspense>
        </aside>
        <div className="space-y-8">
          {/* 섹션 제목 */}
          <HeaderSection selectedTag={selectedTag} />
          {/* 블로그 카드 그리드 */}
          <Suspense fallback={<PostListSkeleton />}>
            <PostListSuspense selectedTag={selectedTag} selectedSort={selectedSort} />
          </Suspense>
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
