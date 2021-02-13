const http = require("http");

var fs = require("fs");
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

var { data, condition } = JSON.parse(fs.readFileSync("./data.json", "utf8"));
console.log();
function sort(data) {
  let filtered = data
    .sort((a, b) => b[condition.sort_by[0]] - a[condition.sort_by[0]])
    .filter((item, i, arr) => (item.disabled != false ? 0 : 1));

  return filtered;
}
console.log(sort(data));

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
