import fs from "fs/promises";
import path from "path";

export async function writeFileSafely(writeLocation: string, content: any) {
  await fs.mkdir(path.dirname(writeLocation), {
    recursive: true,
  });

  await fs.writeFile(writeLocation, content);
}
