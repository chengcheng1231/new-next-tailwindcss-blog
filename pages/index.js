import Head from 'next/head'
import { PageSEO } from '@/components/SEO'
import { getAllPosts } from '../lib/postData'
import { format, parseISO } from 'date-fns'
import siteMetadata from '@/data/siteMetadata'
import Link from 'next/link'
import Card from '@/components/Card'
import { getAllFile } from '@/lib/mdx'
import { MDXCardRenderer } from '@/components/MDXComponents'
// import { getAllFilesFrontMatter } from '../lib/mdx'

// export async function getStaticProps() {
//   const posts = await getAllFilesFrontMatter('_content')

//   return { props: { posts } }
// }

export default function Home({ posts, sortDatePosts }) {
  return (
    <div>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="relative max-w-lg mx-auto md:mx-0 my-0">
        <input
          aria-label="Search articles"
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search articles"
          className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
        />
        <svg
          className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <div className="container py-6 mx-auto my-0">
        <ul className="grid md:grid-cols-3 gap-4 auto-cols-fr">
          {/* {posts.map((post) => (
            <Card
              key={post.title}
              title={post.title}
              description={post.content}
              imgSrc={post.imgSrc}
              href={post.slug}
              date={post.date}
            />
          ))} */}
          {sortDatePosts.map((post) => (
            <MDXCardRenderer
              key={post.frontMatter.slug}
              toc={post.toc}
              mdxSource={post.mdxSource}
              frontMatter={post.frontMatter}
              href={post.frontMatter.slug}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  const allPosts = getAllPosts();

  const getMdxPosts = await getAllFile();
  const sortDatePosts = getMdxPosts.sort((a, b) => Date.parse(b.frontMatter.date) - Date.parse(a.frontMatter.date));

  return { props: {
    sortDatePosts,
    // posts: allPosts.map(({ data, content, slug}) => ({
    //   ...data,
    //   date: data.date.toISOString(),
    //   content,
    //   slug,
    // }))
  } }
}