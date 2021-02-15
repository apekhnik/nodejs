const http = require("http");

var fs = require("fs");
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

const getLocalFile = (path) => JSON.parse(fs.readFileSync(path, "utf8"));

const DIGITS_AFTER_DECIMAL = 3;
const json = getLocalFile("./info.json");
const LENGTH_UNIT_RATIO = getLocalFile("./config.json");
const convertLength = ({ distance: { unit, value }, convert_to }) =>
  (value / LENGTH_UNIT_RATIO[unit]) * LENGTH_UNIT_RATIO[convert_to];

const convert = (data) =>
  JSON.stringify({
    unit: data.convert_to,
    value: convertLength(json).toFixed(DIGITS_AFTER_DECIMAL),
  });

console.log("result: ", convert(json));
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
