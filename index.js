import path from "node:path";
import fs from "node:fs/promises";

export async function importDirectory(directoryPath, options = {}) {
  if (typeof directoryPath !== "string") {
    throw Error(`Expected parameter "directoryPath" to be string, recived ${typeof directoryPath}`);
  }

  const { keepPathOnKey = false, prefixKey = "", removeExtensionFile = false } = options;

  const _dirPath = path.resolve(directoryPath);

  async function processDirectory(dirPath, deep = 0) {
    const stats = await fs.lstat(dirPath);
    
    if (stats.isFile() && deep === 0) {
      throw Error(`Expected parameter "directoryPath" to be a directory, recived ${directoryPath}`);
    }
    
    if (stats.isDirectory()) {
      const directory = await fs.readdir(dirPath);
      await Promise.all(directory.map((item) => processDirectory(path.join(dirPath, item), deep + 1)));
    } else {
      const module = await import(dirPath);
      const key = path.join(prefixKey, keepPathOnKey ? dirPath : dirPath.replace(_dirPath, ""));
      const moduleKey = removeExtensionFile ? key.replace(/(.+)\.(.+)/, "$1") : key;

      results[moduleKey] = module;
    }
  }

  const results = {};
  await processDirectory(_dirPath);

  return results;
}
