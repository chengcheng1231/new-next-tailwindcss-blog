/* eslint-disable react/display-name */
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from './Image'
import CustomLink from './Link'
import TOCInline from './TOCInline'
import { PostImage } from './PostImage'
import { YoutubeIFrameLayout } from './YoutubeIFrame'
import Pre from './Pre'
import Card from '@/components/Card'

export const MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  PostImage: PostImage,
  YoutubeIFrameLayout: YoutubeIFrameLayout,
  wrapper: ({ components, layout, ...rest }) => {
    const Layout = require(`../layouts/${layout}`).default
    return <Layout {...rest} />
  },
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}

export const MDXCardRenderer = ({ frontMatter, mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])
  return (
    <Card {...frontMatter}>
      <MDXLayout {...rest} />
    </Card>
  )
}
