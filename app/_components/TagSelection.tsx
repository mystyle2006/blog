import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TagFilterItem } from '@/types/blog';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TagSectionProps {
  tags: TagFilterItem[];
  selectedTag?: string | undefined;
}

export default function TagSelection({ tags, selectedTag }: TagSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>태그 목록</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {tags.map((tag) => {
            const isSelected =
              selectedTag === tag.name || (selectedTag === undefined && tag.name === '전체');
            const href = tag.name === '전체' ? '/' : `?tag=${tag.name}`;

            return (
              <Link href={href} key={tag.name}>
                <div
                  className={cn(
                    'flex items-center justify-between rounded-md p-1.5 text-sm transition-colors',
                    isSelected
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted-foreground/10 text-muted-foreground'
                  )}
                >
                  <span>{tag.name}</span>
                  <span>{tag.count}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
