'use client';
import Giscus from '@giscus/react';

export default function GiscusComments() {
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
      theme="light"
      lang="ko"
      loading="lazy"
    />
  );
}
