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
function sort(data) {
  // const copy = JSON.parse(JSON.stringify(data));
  let filtered = data
    .sort((a, b) => b.rating - a.rating)
    .filter((item, i, arr) => (item.disabled != false ? 0 : 1));

  return filtered;
}
console.log(sort(data));
// console.log(data, condition);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
// let arr = [2, 3, 4, 5, 6, 7, 8];
// let n = arr.filter((item, i, arr) => {});
// console.log(n);
