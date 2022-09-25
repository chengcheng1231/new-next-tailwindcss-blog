import fs from 'fs'
import path from 'path'

const pipe =
  (...fns) => {
    // console.log('fns', ...fns)
    return function test (x) {
        // console.log('what is x', x)
        // console.log('result', fns.reduce((v, f) => f(v), x));
        return fns.reduce((v, f) => {
            console.log('v', v)
            console.log('f', f)
            return f(v)
        }, x);
    }
  }

const flattenArray = (input) =>
  input.reduce((acc, item) => [...acc, ...(Array.isArray(item) ? item : [item])], [])

const mapTest = (fn) => {
  console.log('fn 4', fn)
  return function mapFun (input) {
    // console.log('input 3', input)
    return input.map(fn)
  }
}

const walkDir = (fullPath) => {
  // console.log('fullPath 2', fullPath)
  return fs.statSync(fullPath).isFile() ? fullPath : getAllFilesRecursively(fullPath)
}

const pathJoinPrefix = (prefix) => {
  // console.log('prefix', prefix)
  return function pathTest (extraPath) {
    return path.join(prefix, extraPath)
  }
}

const getAllFilesRecursively = (folder) => {
    // console.log('pathJoinPrefix(folder)', pathJoinPrefix(folder))
    console.log('mapTest', mapTest(pipe(pathJoinPrefix(folder), walkDir)))
    // console.log(pipe(fs.readdirSync))
    // console.log('folder', mapTest(pipe(pathJoinPrefix(folder), walkDir))([]))
    // console.log(map(pipe(pathJoinPrefix(folder), walkDir)))
    // console.log('hihi', pipe(fs.readdirSync, mapTest(pipe(pathJoinPrefix(folder), walkDir)), flattenArray)(folder))
    return (
        [
            '/Users/yucheng/Desktop/personal/practice-blog-nextjs-tailwind/new-tailwind-next-blog/_content/first.md',
            '/Users/yucheng/Desktop/personal/practice-blog-nextjs-tailwind/new-tailwind-next-blog/_content/second.md',
            '/Users/yucheng/Desktop/personal/practice-blog-nextjs-tailwind/new-tailwind-next-blog/_content/third.md'
        ]
    )
}

export default getAllFilesRecursively

