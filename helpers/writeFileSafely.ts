import fs from "fs/promises";
import path from "path";

export async function writeFileSafely(writeLocation: string, content: any) {
  console.log("writing file to ", writeLocation);
  await fs.mkdir(path.dirname(writeLocation), {
    recursive: true,
  });

  await fs.writeFile(writeLocation, content);
}
