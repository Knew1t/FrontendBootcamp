const fs = require("fs");
const fsp = require("fs").promises;

const progressbar = async () => {
  function getSize(path) {
    let data = fs.readdirSync(path);
    let totalSize = 0;
    for (const file of data) {
      let currPath = path + "/" + file;
      let currFileStat = fs.statSync(currPath);
      totalSize += currFileStat.size;
    }
    return totalSize;
  }

  function drawPercentage(percentage) {
    while (percentage > 0.5) {
      --percentage;
      process.stdout.write("|");
    }
  }
  let path = "./files/fsHard";
  let totalSize = getSize(path);
  let data = fs.readdirSync(path);
  for (const file of data) {
    let currPath = path + "/" + file;
    let currFileStat = await fsp.stat(currPath);
    drawPercentage(100 * (currFileStat.size / totalSize));
  }
};

progressbar();
