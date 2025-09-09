import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PostCard } from '@/components/features/blog/PostCard';
import TagSection from '@/app/_components/TagSection';
import ProfileSection from '@/app/_components/ProfileSection';
import ContactSection from '@/app/_components/ContactSection';
import { getPublishedPosts } from '@/lib/notion';
import { Post } from '@/types/blog';

export default async function Home() {
  // 노션에서 게시된 포스트 데이터 가져오기
  const posts: Post[] = await getPublishedPosts();

  // 태그 데이터를 실제 포스트 데이터에서 추출하여 생성
  const tagCounts = posts.reduce(
    (acc, post) => {
      post.tags?.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>
  );

  const allTags = [
    { id: 'all', name: '전체', count: posts.length },
    ...Object.entries(tagCounts).map(([name, count]) => ({
      id: name.toLowerCase(),
      name,
      count,
    })),
  ];

  return (
    <div className="container py-8">
      <div className="grid grid-cols-[200px_1fr_220px] gap-6">
        {/* 좌측 사이드바 */}
        <aside>
          <TagSection tags={allTags} />
        </aside>

        <div className="space-y-8">
          {/* 섹션 제목 */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">블로그 목록 ({posts.length}개)</h2>
            <Select defaultValue="latest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 방식 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">최신순</SelectItem>
                <SelectItem value="oldest">오래된순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 블로그 카드 그리드 */}
          <div className="grid gap-4">
            {posts.length > 0 ? (
              posts.map((post) => <PostCard key={post.id} post={post} />)
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
