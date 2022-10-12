import fs from 'fs'
import path from 'path'

const pipe =
  (...fns) => {
    return function test (x) {
        return fns.reduce((v, f) => {
            return f(v)
        }, x);
    }
  }

const flattenArray = (input) =>
  input.reduce((acc, item) => [...acc, ...(Array.isArray(item) ? item : [item])], [])

const mapTest = (fn) => {
  return function mapFun (input) {
    return input.map(fn)
  }
}

const walkDir = (fullPath) => {
  return fs.statSync(fullPath).isFile() ? fullPath : getAllFilesRecursively(fullPath)
}

const pathJoinPrefix = (prefix) => {
  return function pathTest (extraPath) {
    return path.join(prefix, extraPath)
  }
}

const getAllFilesRecursively = (folder) => {
    return pipe(fs.readdirSync, mapTest(pipe(pathJoinPrefix(folder), walkDir)), flattenArray)(folder)
}

export default getAllFilesRecursively

