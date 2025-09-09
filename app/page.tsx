import ProfileSection from '@/app/_components/ProfileSection';
import ContactSection from '@/app/_components/ContactSection';
import HeaderSection from '@/app/_components/HeaderSection';
import PostList from '@/components/features/blog/client/PostList';

interface HomeProps {
  searchParams: Promise<{ tag?: string; sort?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  // URL 파라미터에서 태그 필터 가져오기
  const { tag, sort } = await searchParams;

  const selectedTag = tag || '전체';
  // const selectedSort = sort || 'latest';

  // // 병렬로 데이터 가져오기
  // const [posts, allTags] = await Promise.all([
  //   getPublishedPosts(tag, selectedSort), // 필터링된 포스트
  //   getPublishedPostTags(), // 전체 태그 목록
  // ]);

  return (
    <div className="container py-8">
      <div className="grid grid-cols-[200px_1fr_220px] gap-6">
        {/* 좌측 사이드바 */}
        <aside>{/* <TagSection tags={allTags} selectedTag={tag} /> */}</aside>

        <div className="space-y-8">
          {/* 섹션 제목 */}
          <HeaderSection selectedTag={selectedTag} />

          {/* 블로그 카드 그리드 */}
          <PostList />
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
