import Head from "next/head";

const SEOHead = ({ blog }) => {
  const title = blog.metaTitle || blog.title;
  const desc = blog.metaDescription || blog.excerpt || "";
  const image = blog.ogImage || blog.featureImage || "";
  const url = blog.canonicalUrl || `http://localhost:3000/blog/${blog.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: desc,
    image,
    author: { "@type": "Person", name: blog.author?.name || "" },
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const faqSchema = blog.faqs?.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: blog.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } : null;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      {blog.canonicalUrl && <link rel="canonical" href={blog.canonicalUrl} />}

      <meta property="og:type" content="article" />
      <meta property="og:title" content={blog.ogTitle || title} />
      <meta property="og:description" content={blog.ogDescription || desc} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={blog.twitterTitle || title} />
      <meta name="twitter:description" content={blog.twitterDescription || desc} />
      {(blog.twitterImage || image) && <meta name="twitter:image" content={blog.twitterImage || image} />}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
    </Head>
  );
};

export default SEOHead;
