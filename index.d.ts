export interface Options {
  /**
   * @description
   * whether keep the passed parameter `directoryPath` on the result keys or not
   * @example
   * ```js
   * importDirectory("./routes", {keepPathOnKey:false})
   * directoryPath = "./routes" > "/home/user/routes"
   * results = {
   *  "/index.ts": Module
   * }
   *
   * importDirectory("./routes", {keepPathOnKey:true})
   * directoryPath = "./routes" > "/home/user/routes"
   * results = {
   *  "/routes/index.ts": Module
   * }
   * ```
   */
  keepPathOnKey?: boolean;
  /**
   * @description prefix to all results keys
   * @example
   * ```js
   * importDirectory("./", {prefixKey:"/app"})
   * "/utils/index.js" > "/app/utils/index.js"
   * ```
   */
  prefixKey?: string;
  /** @description whether remove extension file or not */
  removeExtensionFile?: boolean;
  useRequire?: boolean;
}

export function importDirectory(directoryPath: string, options?: Options): Promise<Record<string, any>>;
