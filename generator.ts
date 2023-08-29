#!/usr/bin/env node
import { generatorHandler } from "@prisma/generator-helper";
import * as fs from "fs/promises";
import * as path from "path";
import { renderTemplate } from "./helpers/renderTemplate";

console.log("calling generator");

generatorHandler({
  onManifest() {
    return {
      version: "1",
      defaultOutput: "../generated",
      prettyName: "ts-client",
    };
  },
  async onGenerate(opts) {
    try {
      const clientsDir = path.resolve(__dirname, `./clients`);
      await fs.rm(clientsDir, { force: true, recursive: true });

      await fs.mkdir(clientsDir);

      for (const model of opts.dmmf.datamodel.models) {
        const renderedTemplate = await renderTemplate({
          path: path.resolve(__dirname, "./templates/client.template.ts"),
          replace: {
            __model__: model.name.toLowerCase(),
            __Model__: model.name,
          },
        });

        await fs.writeFile(
          path.resolve(clientsDir, `./${model.name}Client.ts`),
          renderedTemplate
        );
      }
    } catch (err) {
      console.log(err);
    }
  },
});
