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
  // traverse array element
  for (let i = 0; i < n; i++) {
    // add current element
    // to left Sum
    leftSum += arr[i];
    console.log("left sum:", leftSum);
    // find sum of rest array
    // elements (rightSum)
    let rightSum = 0;
    for (j = i + 1; j < n; j++) rightSum += arr[j];

    // split point index
    if (leftSum == rightSum) {
      A = B.splice(3);
      return { A, B };
    }
  }

  // if it is not possible
  // to split array into
  // two parts
  return -1;
}
console.log(findSplitPoint(set, set.length));

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
