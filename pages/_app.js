import '../styles/globals.css'
import Link from 'next/link'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import siteMetadata from '@/data/siteMetadata'
import LayoutWrapper from '@/components/LayoutWrapper'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
    // <div className="">
    //   <headher>
    //     <h1 className="text-6xl font-bold text-center">My Blog</h1>
    //     <nav className="my-4">
    //       <ul className="flex flex-row justify-center space-x-4">
    //         <li>
    //           <Link href="/">
    //             <a>Home</a>
    //           </Link>
    //         </li>
    //         <li>
    //           <Link href="/about">
    //             <a>About</a>
    //           </Link>
    //         </li>
    //       </ul>
    //     </nav>
    //   </headher>
    // </div>
  )
}

export default MyApp
