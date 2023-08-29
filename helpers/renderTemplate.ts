import * as fs from "fs/promises";

type ReplaceArgs = {
  [stringToReplace: string]: string;
};

type RenderTemplateArgs = {
  path: string;
  replace: ReplaceArgs;
};

export async function renderTemplate(args: RenderTemplateArgs) {
  const { path, replace } = args;

  let templateToRender = await fs.readFile(path, "utf8");

  Object.entries(replace).forEach(([target, replacement]) => {
    templateToRender = templateToRender.replaceAll(target, replacement);
  });

  return templateToRender;
}
