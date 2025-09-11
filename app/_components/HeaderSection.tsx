import SortSelect from '@/app/_components/client/SortSelect';

interface HeaderSectionProps {
  selectedTag: string;
}

export default function HeaderSection({ selectedTag }: HeaderSectionProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold tracking-tight">
        {selectedTag === 'ALL' ? 'All posts' : `${selectedTag} related posts`}
      </h2>
      <SortSelect />
    </div>
  );
}
