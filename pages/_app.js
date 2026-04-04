import '../styles/globals.css'
import React from 'react'
import Head from 'next/head'
import InteractiveEffects from '../components/InteractiveEffects'

export default function MyApp({ Component, pageProps }) {
  // ArrowOverlay removed — was causing hydration failures

  return (
    <>
      <Head>
        <title>Ram Ventures | Colorado State University Student Venture Accelerator</title>
        <meta
          name="description"
          content="Ram Ventures helps Colorado State University student founders launch and scale innovative ventures across agriculture, climate, and technology."
        />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Ram Ventures" />
        <meta property="og:title" content="Ram Ventures | Colorado State University Student Venture Accelerator" />
        <meta
          property="og:description"
          content="CSU student venture accelerator supporting the next generation of founders in Colorado."
        />
        <meta property="og:url" content="https://ramventurelabs.com" />
        <meta property="og:image" content="https://ramventurelabs.com/ram-ventures-logo.png?v=2" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ram Ventures | Colorado State University Student Venture Accelerator" />
        <meta
          name="twitter:description"
          content="CSU student venture accelerator supporting the next generation of founders in Colorado."
        />
        <meta name="twitter:image" content="https://ramventurelabs.com/ram-ventures-logo.png?v=2" />
      </Head>
      <InteractiveEffects />
      <Component {...pageProps} />
    </>
  )
}
