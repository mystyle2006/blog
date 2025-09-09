import { Post } from '@/types/blog';
import { Client, PageObjectResponse, UserObjectResponse } from '@notionhq/client';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN!,
});

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

export const getPublishedPosts = async () => {
  const response = await notion.dataSources.query({
    data_source_id: process.env.NOTION_DATABASE_SOURCE_ID!,
    filter: {
      property: 'Status',
      select: {
        equals: 'Published',
      },
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
    .map((page) => {
      const properties = page.properties;
      return {
        id: page.id,
        title:
          properties.Title.type === 'title' ? properties.Title?.title?.[0]?.plain_text || '' : '',
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
          properties.Slug.type === 'rich_text'
            ? properties.Slug?.rich_text?.[0]?.plain_text || ''
            : '',
      };
    });

  return posts;
};
