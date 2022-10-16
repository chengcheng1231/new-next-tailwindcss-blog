import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
// import generateRss from '@/lib/generate-rss'
import { getAllFilesFrontMatter, getAllFile } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'
import kebabCase from '@/lib/utils/kebabCase'
// import fs from 'fs'
// import path from 'path'

const root = process.cwd()

export async function getStaticPaths() {
  const tags = await getAllTags('post')

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter('blog')
  const getMdxPosts = await getAllFile('all');
  const filteredPosts = getMdxPosts.filter(
    (post) => post.frontMatter.draft !== true && post.frontMatter.tags.map((t) => kebabCase(t)).includes(params.tag)
  )

  // rss
  // if (filteredPosts.length > 0) {
  //   const rss = generateRss(filteredPosts, `tags/${params.tag}/feed.xml`)
  //   const rssPath = path.join(root, 'public', 'tags', params.tag)
  //   fs.mkdirSync(rssPath, { recursive: true })
  //   fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)
  // }

  return { props: { posts: filteredPosts, tag: params.tag } }
}

export default function Tag({ posts, tag }) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return (
    <>
      <TagSEO
        title={`${tag} - ${siteMetadata.author}`}
        description={`${tag} tags - ${siteMetadata.author}`}
      />
      <h1 className="text-2xl font-bold leading-9 tracking-tight text-gray-500 sm:text-2xl sm:leading-10 md:text-2xl md:leading-14 mr-8">Tag: {tag}</h1>
      <ListLayout posts={posts} title={title} />
    </>
  )
}
