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

const condition_variant = condition.include || condition.exclude;
const conditionKeys = (obj) => Object.keys(obj[0])[0];
const conditionValues = (obj) => Object.values(obj[0])[0];
const FILTER = conditionKeys(condition_variant);
const FILTER_VALUE = conditionValues(condition_variant);
const SORT = condition.sort_by[0];

function sort(data) {
  let filtered = data
    .sort((a, b) => b[SORT] - a[SORT])
    .filter((item) => {
      if (condition.include) {
        return item[FILTER] === FILTER_VALUE ? true : false;
      } else {
        return item[FILTER] === FILTER_VALUE ? false : true;
      }
    });

  return JSON.stringify({ result: filtered });
}
console.log(sort(data));

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
