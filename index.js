import path from "node:path"
import fs from "node:fs/promises"

const types = {
  keepPathOnKey: "boolean",
  prefixKey: "string",
  removeExtensionFile: "boolean",
}

export const DEFAULT_EXTENSIONS = Object.freeze([".js", ".cjs", ".mjs", ".jsx", ".ts", ".cts", ".mts", ".tsx"])

export async function importDirectory(dirPath, opts = {}) {
  const {keepPathOnKey = false, prefixKey = "", removeExtensionFile = false, extensions = DEFAULT_EXTENSIONS} = opts

  for (const key in types) {
    if (key in opts && opts[key] !== undefined && typeof opts[key] !== types[key]) {
      throw TypeError(`Expected option "${key}" to be type "${types[key]}"`)
    }
  }

  if (!Array.isArray(extensions)) {
    throw TypeError(`Expected option "extentions" to be an array`)
  }

  if (!extensions.length) throw TypeError('Expected option "extentions" to have at least 1 item')

  const dir = path.resolve(dirPath)

  async function processDirectory(dirPath) {
    const stats = await fs.lstat(dirPath)

    if (stats.isDirectory()) {
      const directory = await fs.readdir(dirPath)
      await Promise.all(directory.map(item => processDirectory(path.join(dirPath, item))))
      return
    }

    const hasValidExtension = extensions.some(extension => dirPath.endsWith(extension))

    if (!hasValidExtension) return

    const module = await import(dirPath)
    const key = path.join(prefixKey, keepPathOnKey ? dirPath : dirPath.replace(dir, ""))
    const moduleKey = removeExtensionFile ? key.replace(/(.+)\.(.+)/, "$1") : key

    results[moduleKey] = module
  }

  const results = {}
  await processDirectory(dir)

  return results
}
