import { readFileSync } from "node:fs";

class FileUtil {
  static readFromTempSync(file_name: string) {
    const n = readFileSync(__dirname + "/../temp/" + file_name);
    return n;
  }
}

export { FileUtil };
