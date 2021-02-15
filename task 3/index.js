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

const { set } = getLocalFile("./data.json");

function findSplitPoint(arr, n) {
  leftSum = 0;
  let A = set;
  let B = [];
  //заполняю leftsum
  for (let i = 0; i < n; i++) leftSum += arr[i];

  let rightSum = 0;
  //прохожу циклом с конца массива, поочередно плюсуя елемент в правую сумму
  // вычитая из левой.
  for (i = n - 1; i >= 0; i--) {
    rightSum += arr[i];
    leftSum -= arr[i];
    //если суммы равны, делю массив по индексу i и возвращаю результат
    if (leftSum == rightSum) {
      B = A.splice(i);
      return { A, B };
    }
    //если произошел перебор, и правая суммая стала больше, вычисляем на сколько больше.
    if (leftSum < rightSum) {
      B = A.splice(i);
      const difference = rightSum - leftSum;

      // Ищем в большем массиве половину разности
      // если она есть, переносим в другой массив и они равны, если нет, ищем приближенно меньшую и переносим ее
      if (B.indexOf(difference / 2) === -1) {
        for (let i = 0; i < B.length; i++) {
          difference / 2 > B[i] ? A.push(B.splice(i, 1)[0]) : null;
        }
      } else {
        let n = B.indexOf(difference / 2);
        A.push(B.splice(n, 1)[0]);
      }

      return { A, B };
    }
  }

  return -1;
}
console.log(findSplitPoint(set, set.length));

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
