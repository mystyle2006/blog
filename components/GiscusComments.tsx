'use client';
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export default function GiscusComments() {
  const { theme } = useTheme();
  return (
    <Giscus
      repo="mystyle2006/blog-comment"
      repoId="R_kgDOPtYTTA"
      category="Announcements"
      categoryId="DIC_kwDOPtYTTM4CvP2N"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme === 'dark' ? 'dark' : 'light'}
      lang="ko"
      loading="lazy"
    />
  );
}
