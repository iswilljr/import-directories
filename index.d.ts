export interface Options {
  /**
   * @description
   * whether keep the passed parameter `directoryPath` on the result keys or not
   * @example
   * ```js
   * importDirectory("./routes", {keepPathOnKey:false})
   * directoryPath = "./routes" > "/home/user/app/routes"
   * results = {
   *  "/index.ts": Module
   * }
   *
   * importDirectory("./routes", {keepPathOnKey:true})
   * directoryPath = "./routes" > "/home/user/app/routes"
   * results = {
   *  "/home/user/app/routes/index.ts": Module
   * }
   * ```
   * @default false
   */
  keepPathOnKey?: boolean
  /**
   * @description prefix to all results keys
   * @example
   * ```js
   * importDirectory("./", {prefixKey:"/app"})
   * "/utils/index.js" > "/app/utils/index.js"
   * ```
   */
  prefixKey?: string
  /**
   * @description whether remove extension file or not
   * @default false
   */
  removeExtensionFile?: boolean
}

export function importDirectory<T extends Record<string, unknown> = Record<string, unknown>>(
  directoryPath: string,
  options?: Options
): Promise<T>
