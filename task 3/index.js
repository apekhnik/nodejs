const http = require("http");

var fs = require("fs");
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});
const sum = (arr) => {
  let sum = 0;
  for (let index = 0; index < arr.length; index++) {
    sum += arr[index];
  }
  return sum;
};
var { set } = JSON.parse(fs.readFileSync("./data.json", "utf8"));

let arrSum = 0,
  A = [],
  B = [];
for (let index = 0; index < set.length; index++) {
  arrSum += set[index];
}

// console.log("A:", A);
// console.log("B:", B);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function isSubsetSum(arr, n, sum) {
  if (n == 0 && sum != 0) return false;
  if (sum == 0) return true;

  if (arr[n - 1] > sum) return isSubsetSum(arr, n - 1, sum);

  /* else, check if sum can be obtained 
       by any of the following 
        (a) including the last element 
        (b) excluding the last element 
    */
  return (
    isSubsetSum(arr, n - 1, sum) || isSubsetSum(arr, n - 1, sum - arr[n - 1])
  );
}
function findPartiion(arr, n) {
  // Calculate sum of the elements
  // in array
  let sum = 0;
  for (let i = 0; i < n; i++) sum += arr[i];

  // If sum is odd, there cannot be
  // two subsets with equal sum
  if (sum % 2 != 0) return false;

  // Find if there is subset with sum
  // equal to half of total sum

  return isSubsetSum(arr, n, sum / 2);
}
let arr = [3, 1, 5, 9, 12];
let n = arr.length;
console.log(findPartiion(set, n));
