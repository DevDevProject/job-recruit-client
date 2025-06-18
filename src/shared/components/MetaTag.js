import React from 'react';
import { Helmet } from 'react-helmet-async';
import { categories } from '../../commons/data/RecruitOptions';

const MetaTag = ({
  title = '기본 제목',
  description = '기본 설명',
  keywords,
  image = 'https://alldevhub.com/default-image.png',
  url = typeof window !== 'undefined' ? window.location.href : 'https://alldevhub.com',
}) => {
  return (
    <Helmet>
      {/* 일반 메타 */}
      <title>{title}</title>
      <meta name="description" content={description} data-react-helmet="true"/>
      <meta name="keywords" content={keywords} data-react-helmet="true"/>

      {/* Open Graph (Facebook, LinkedIn 등) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default MetaTag;
