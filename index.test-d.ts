import { expectType } from "tsd";
import { importDirectory } from "./index.js";

expectType<Promise<Record<string, any>>>(importDirectory("__test__"));
