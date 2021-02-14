const http = require("http");

var fs = require("fs");
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

var { set } = JSON.parse(fs.readFileSync("./data.json", "utf8"));

function findSplitPoint(arr, n) {
  leftSum = 0;
  let A = [];
  let B = set;

  for (let i = 0; i < n; i++) leftSum += arr[i];

  let rightSum = 0;
  for (i = n - 1; i >= 0; i--) {
    rightSum += arr[i];
    leftSum -= arr[i];

    if (leftSum == rightSum) {
      console.log(A);
      A = B.splice(i);
      return { A, B };
    }
  }

  return -1;
}
console.log(findSplitPoint(set, set.length));

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
