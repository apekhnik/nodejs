const http = require("http");

var fs = require("fs");
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

const convert = () => {
  var json = JSON.parse(fs.readFileSync("./info.json", "utf8"));
  let LENGTH_UNIT_RATIO = JSON.parse(fs.readFileSync("./config.json", "utf8"));
  const {
    distance: { unit, value },
    convert_to,
  } = json;

  const convertN = ({ distance: { unit, value }, convert_to }) =>
    (value / LENGTH_UNIT_RATIO[unit]) * LENGTH_UNIT_RATIO[convert_to];
  const answer = { unit: unit, value: convertN(json).toFixed(3) };
  return JSON.stringify(answer);
};
console.log(convert());
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
