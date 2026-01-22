import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const themePath = path.resolve(__dirname, "theme.json");
const theme = JSON.parse(fs.readFileSync(themePath, "utf-8"));

const scssVariables = Object.entries(theme)
  .map(([key, value]) => {
    if (key === "backgroundImage") {
      return `$${key}: url('${value}');`;
    }
    return `$${key}: ${value};`;
  })
  .join("\n");

const outputPath = path.resolve(__dirname, "src/styles/_theme.scss");

fs.writeFileSync(outputPath, scssVariables);

console.log(`_theme.scss has been generated successfully!`);
