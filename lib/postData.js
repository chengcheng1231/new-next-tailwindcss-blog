import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), '_content');

// export function getAllPosts () {
//     const allPosts = fs.readdirSync(contentDirectory, 'utf-8');

//     return allPosts.map((fileName) => {    
//         let slug;
//         if (fileName.includes('.mdx')) {
//             slug = fileName.replace('.mdx', '');
//         } else if (fileName.includes('.md')) {
//             slug = fileName.replace('.md', '');
//         }

//         const fileContent = fs.readFileSync(path.join(contentDirectory, fileName), 'utf-8');
//         const { data, content } = matter(fileContent);

//         return {
//             // data,
//             // content,
//             slug,
//         };
//     });
// }

export function getPostsSlug() {
    const posts = fs.readdirSync(path.join(process.cwd(), 'data', 'post'), 'utf-8');
    return posts.map((fileName) => {    
        let slug;
        if (fileName.includes('.mdx')) {
            slug = fileName.replace('.mdx', '');
        } else if (fileName.includes('.md')) {
            slug = fileName.replace('.md', '');
        }

        return {
            slug,
        };
    });
}

// export const blogPosts = [
//     {
//         title: 'My fist blog post1',
//         slug: 'first',
//         date: new Date().toISOString(),
//         content:
//             'Lorem isum test Lorem isum testLorem isum testLorem isum testLorem isum testLorem isum test 1234'
//     },
//     {
//         title: 'Second blog post',
//         slug: 'second',
//         date: new Date().toISOString(),
//         content:
//             'Lorem isum2'
//     },
//     {
//         title: 'Third blog post',
//         slug: 'third',
//         date: new Date().toISOString(),
//         content:
//             'Lorem isum3'
//     },
// ];