const fs = require("fs");
const fsp = require("fs").promises;

const readAndWriteCallbackHell = () => {
  fs.readFile(
    "files/fsSimple/file1.txt",
    "utf-8",
    function write(error, data) {
      if (error) throw error;
      fs.writeFileSync("files/fsSimple/file2.txt", data);
    },
  );
};

const readAndWritePromises = () => {
  let readPromise = fsp.readFile("files/fsSimple/file1.txt", "utf-8");
  function write(data) {
    fs.writeFileSync("files/fsSimple/file2.txt", data);
  }
  readPromise.then(write);
};

const readAndWriteAsyncAwait = async () => {
  let readPromise = fsp.readFile("files/fsSimple/file1.txt", "utf-8");
  let data = await readPromise;
  fs.writeFileSync("files/fsSimple/file2.txt", data);
};

// readAndWriteCallbackHell();
// readAndWritePromises();
  readAndWriteAsyncAwait();
