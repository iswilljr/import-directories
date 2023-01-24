import path from "node:path"
import fs from "node:fs/promises"

export async function importDirectory(dirPath, opts = {}) {
  const {keepPathOnKey = false, prefixKey = "", removeExtensionFile = false, extensions} = opts

  const _extensions = Array.isArray(extensions)
    ? extensions
    : [".js", ".cjs", ".mjs", ".jsx", ".ts", ".cts", ".mts", ".tsx"]

  const dir = path.resolve(dirPath)

  async function processDirectory(dirPath) {
    const stats = await fs.lstat(dirPath)

    if (stats.isDirectory()) {
      const directory = await fs.readdir(dirPath)
      await Promise.all(directory.map(item => processDirectory(path.join(dirPath, item))))
      return
    }

    const hasValidExtension = _extensions.some(extension => dirPath.endsWith(extension))

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
