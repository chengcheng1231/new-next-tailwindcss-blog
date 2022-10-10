import fs from 'fs';
import path from 'path';
import { bundleMDX } from 'mdx-bundler'
import matter from 'gray-matter'
import getAllFilesRecursively from './utils/files.js'

const root = process.cwd()

export function formatSlug(slug) {
    return slug.replace(/\.(mdx|md)/, '')
}

export function dateSortDesc(a, b) {
    if (a > b) return -1
    if (a < b) return 1
    return 0
}

export async function getAllFilesFrontMatter(folder) {
    const prefixPaths = path.join(root, '', folder)
    // console.log('prefixPaths', prefixPaths)
    // const files = getAllFilesRecursively(prefixPaths)
    const allFrontMatter = []

    // files.forEach((file) => {
    //     // Replace is needed to work on Windows
    //     const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/')
    //     // Remove Unexpected File
    //     if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
    //         return
    //     }
    //     const source = fs.readFileSync(file, 'utf8')
    //     const { data: frontmatter, content } = matter(source)
    //     if (frontmatter.draft !== true) {
    //         allFrontMatter.push({
    //             ...frontmatter,
    //             slug: formatSlug(fileName),
    //             date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
    //             content,
    //         })
    //     }
    // })
  
    return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date));
}

export async function getFileBySlug(type, slug) {
    const mdxPath = path.join(root, '_content', `${slug}.mdx`)
    const mdPath = path.join(root, '_content', `${slug}.md`)
    const source = fs.existsSync(mdxPath)
        ? fs.readFileSync(mdxPath, 'utf8')
        : fs.readFileSync(mdPath, 'utf8')

    // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
    if (process.platform === 'win32') {
        process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'esbuild.exe')
    } else {
        process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'bin', 'esbuild')
    }

    let toc = []

    const { code, frontmatter } = await bundleMDX({
        source,
        // mdx imports can be automatically source from the components directory
        cwd: path.join(root, 'components'),
        xdmOptions(options, frontmatter) {
        // this is the recommended way to add custom remark/rehype plugins:
        // The syntax might look weird, but it protects you in case we add/remove
        // plugins in the future.
        options.remarkPlugins = [
            ...(options.remarkPlugins ?? []),
            remarkExtractFrontmatter,
            [remarkTocHeadings, { exportRef: toc }],
            remarkGfm,
            remarkCodeTitles,
            [remarkFootnotes, { inlineNotes: true }],
            remarkMath,
            remarkImgToJsx,
        ]
        options.rehypePlugins = [
            ...(options.rehypePlugins ?? []),
            rehypeSlug,
            rehypeAutolinkHeadings,
            rehypeKatex,
            [rehypeCitation, { path: path.join(root, 'data') }],
            [rehypePrismPlus, { ignoreMissing: true }],
            rehypePresetMinify,
        ]
            return options
        },
        esbuildOptions: (options) => {
            options.loader = {
                ...options.loader,
                '.js': 'jsx',
            }
            return options
        },
    })

    console.log({toc})

    return {
        mdxSource: code,
        toc,
        frontMatter: {
        slug: slug || null,
        fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
        ...frontmatter,
        date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
        },
    }
}