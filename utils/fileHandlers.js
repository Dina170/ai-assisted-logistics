const fs = require("fs").promises;
const { parse } = require("csv-parse/sync");

async function readJsonFile(filePath) {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

async function writeJsonFile(filePath, data) {
  const jsonData = JSON.stringify(data, null, 4);
  await fs.writeFile(filePath, jsonData, "utf-8");
}

async function readCSVFile(filePath, withHeaders) {
  const data = await fs.readFile(filePath, "utf-8");
  return parse(data, { columns: withHeaders });
}

module.exports = {
  readJsonFile,
  writeJsonFile,
  readCSVFile,
};
