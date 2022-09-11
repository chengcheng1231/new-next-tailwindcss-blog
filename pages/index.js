import Head from 'next/head'
import { blogPosts } from '../lib/postData'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Head>
        <title>MY BLOG</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 class="bg-blue-600">
          MY BLOG
        </h1>
      </main>
      <div>
        {blogPosts.map((post) => (
          <div key={post.slug}>
            <div>
              <Link href={`/blog/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </div>
            <div>{post.date.toString()}</div>
            <div>{post.content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
