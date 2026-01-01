import Head from 'next/head';

export default function SEO({ title, description, image = "/og-image.jpg" }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}