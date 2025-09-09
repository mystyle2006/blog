import { Post } from '@/types/blog';
import { Client, PageObjectResponse, UserObjectResponse } from '@notionhq/client';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN!,
});

function getPostMetadata(page: PageObjectResponse): Post {
  const properties = page.properties;
  return {
    id: page.id,
    title: properties.Title.type === 'title' ? properties.Title?.title?.[0]?.plain_text || '' : '',
    description:
      properties.Description.type === 'rich_text'
        ? properties.Description?.rich_text?.[0]?.plain_text || ''
        : '',
    coverImage: getCoverImageUrl(page.cover),
    tags:
      properties.Tags.type === 'multi_select'
        ? properties.Tags?.multi_select?.map((tag) => tag.name) || []
        : [],
    author:
      properties.Author.type === 'people'
        ? (properties.Author?.people?.[0] as UserObjectResponse)?.name || ''
        : '',
    date: properties.Date.type === 'date' ? properties.Date?.date?.start || '' : '',
    modifiedDate:
      properties['Modified Date'].type === 'date'
        ? properties['Modified Date']?.date?.start || ''
        : '',
    slug:
      properties.Slug.type === 'rich_text' ? properties.Slug?.rich_text?.[0]?.plain_text || '' : '',
  };
}

// 커버 이미지 URL 추출 함수
const getCoverImageUrl = (cover: PageObjectResponse['cover']): string => {
  if (cover?.type === 'external') {
    return cover?.external?.url || '';
  }

  if (cover?.type === 'file') {
    return cover?.file?.url || '';
  }

  return '';
};

export const getPostBySlug = async (
  slug: string
): Promise<{
  markdown: string;
  post: Post;
}> => {
  const response = await notion.dataSources.query({
    data_source_id: process.env.NOTION_DATABASE_SOURCE_ID!,
    filter: {
      and: [
        {
          property: 'Slug',
          rich_text: {
            equals: slug,
          },
        },
        {
          property: 'Status',
          select: {
            equals: 'Published',
          },
        },
      ],
    },
  });

  return {
    markdown: '',
    post: getPostMetadata(response.results[0] as PageObjectResponse),
  };
};

export const getPublishedPosts = async (tagFilter?: string) => {
  // 기본 필터: Published 상태
  const baseFilter = {
    property: 'Status',
    select: {
      equals: 'Published',
    },
  };

  // 태그 필터가 있는 경우 추가
  const filters = tagFilter
    ? [
        baseFilter,
        {
          property: 'Tags',
          multi_select: {
            contains: tagFilter,
          },
        },
      ]
    : [baseFilter];

  const response = await notion.dataSources.query({
    data_source_id: process.env.NOTION_DATABASE_SOURCE_ID!,
    filter:
      filters.length === 1
        ? baseFilter
        : {
            and: filters,
          },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  });

  // 노션 응답 데이터를 Post 타입으로 변환
  const posts: Post[] = response.results
    .filter((page): page is PageObjectResponse => page.object === 'page')
    .map(getPostMetadata);

  return posts;
};

// 태그 데이터 추출 함수
export const getPublishedPostTags = async () => {
  // 모든 게시된 포스트 가져오기 (필터링 없이)
  const allPosts = await getPublishedPosts();

  // 태그 개수 계산
  const tagCounts = allPosts.reduce(
    (acc, post) => {
      post.tags?.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>
  );

  // 태그 목록 생성
  const tags = [
    { id: 'all', name: '전체', count: allPosts.length },
    ...Object.entries(tagCounts).map(([name, count]) => ({
      id: name.toLowerCase(),
      name,
      count,
    })),
  ];

  return tags;
};
