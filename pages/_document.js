import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "George Hadow",
              "jobTitle": "Drummer and Avant-Garde Percussionist",
              "url": "https://www.georgehadow.com",
              "homeLocation": {
                "@type": "Place",
                "name": "Amsterdam, Netherlands"
              },
              "description": "English drummer and avant-garde percussionist based in Amsterdam, active in experimental, improvised, and contemporary music since 2012."
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}