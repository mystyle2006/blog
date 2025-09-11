import TagSection from '@/app/_components/client/TagSelection';
import ProfileSection from '@/app/_components/ProfileSection';
import { getPublishedPosts, getPublishedPostTags } from '@/lib/notion';
import HeaderSection from '@/app/_components/HeaderSection';
import PostListSuspense from '@/components/features/blog/PostListSuspense';
import TagSectionSkeleton from '@/app/_components/TagSelectionSkeleton';
import { Suspense } from 'react';
import PostListSkeleton from '@/components/features/blog/PostListSkeleton';
import { Metadata } from 'next';

interface HomeProps {
  searchParams: Promise<{ tag?: string; sort?: string }>;
}

export const metadata: Metadata = {
  title: 'Home',
  description:
    "INHO's Blog is a blog about development and sharing various knowledge and experiences.",
  alternates: {
    canonical: '/',
  },
};

export default async function Home({ searchParams }: HomeProps) {
  const { tag, sort } = await searchParams;
  const selectedTag = tag || 'ALL';
  const selectedSort = sort || 'latest';

  const tags = getPublishedPostTags();
  const posts = getPublishedPosts({ tag: selectedTag, sort: selectedSort });

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[200px_1fr_220px]">
        {/* 좌측 사이드바 */}
        <aside className="order-2 md:order-none">
          <Suspense fallback={<TagSectionSkeleton />}>
            <TagSection tags={tags} selectedTag={selectedTag} />
          </Suspense>
        </aside>
        <div className="order-3 space-y-8 md:order-none">
          {/* 섹션 제목 */}
          <HeaderSection selectedTag={selectedTag} />
          {/* 블로그 카드 그리드 */}
          <Suspense fallback={<PostListSkeleton />}>
            <PostListSuspense posts={posts} />
          </Suspense>
        </div>
        {/* 우측 사이드바 */}
        <aside className="order-1 flex flex-col gap-6 md:order-none">
          <ProfileSection />
          {/* <ContactSection /> */}
        </aside>
      </div>
    </div>
  );
}
