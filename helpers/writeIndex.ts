export function writeIndex(clients: string[]) {
  const imports = clients
    .map((client) => `import ${client} from "./${client}";`)
    .join("\n");

  const exports = `export { ${clients.join(", ")} };`;

  return `${imports}\n\n${exports}`;
}
