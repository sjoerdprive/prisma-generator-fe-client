import { generatorHandler } from "@prisma/generator-helper";
import * as fs from "fs/promises";
import * as path from "path";
import { renderTemplate } from "./helpers/renderTemplate";
import { writeIndex } from "./helpers/writeIndex";

generatorHandler({
  onManifest() {
    return {
      version: "1",
      defaultOutput: "../generated",
      prettyName: "prisma-fe-client",
    };
  },
  async onGenerate(opts) {
    try {
      const clientsDir = path.resolve(__dirname, `./clients`);
      await fs.rm(clientsDir, { force: true, recursive: true });

      await fs.mkdir(clientsDir);

      const generatedClients: string[] = [];

      for (const model of opts.dmmf.datamodel.models) {
        const renderedTemplate = await renderTemplate({
          path: path.resolve(__dirname, "./templates/client.template.ts"),
          replace: {
            __model__: model.name.toLowerCase(),
            __Model__: model.name,
          },
        });

        const clientName = `${model.name}CRUD`;

        generatedClients.push(clientName);

        await fs.writeFile(
          path.resolve(clientsDir, `./${clientName}.ts`),
          renderedTemplate
        );
      }

      await fs.writeFile(
        path.resolve(clientsDir, `./index.ts`),
        writeIndex(generatedClients)
      );
    } catch (err) {
      console.log(err);
    }
  },
});
