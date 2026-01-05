import Head from 'next/head';
import { useRouter } from 'next/router';

export default function SEO({ title, description, image = "/og-image.jpg" }) {
  const router = useRouter();
  const canonicalUrl = `https://www.georgehadow.com${router.pathname}`;

  return (
    <Head>
      <title>{title}</title>
      <link rel="canonical" href={canonicalUrl} />
      <meta name="description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}