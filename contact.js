// File System
const fs = require("node:fs");

// readline
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const { resolve } = require("node:path");
const { rejects } = require("node:assert");
const rl = readline.createInterface({ input, output });

//membuat folder data
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika belum ada
const dataPath = "./data/contact.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf8");
}

const tulisPertanyaan = (pertanyaan) => {
  return new Promise((resolve, reject) => {
    rl.question(pertanyaan, (nama) => {
      resolve(nama);
    });
  });
};

const simpanContact = (nama, email, noHP) => {
  const data = { nama, email, noHP };
  const file = fs.readFileSync("data/contact.json", "utf8");
  const contact = JSON.parse(file);

  contact.push(data);

  fs.writeFileSync("data/contact.json", JSON.stringify(contact, null, 2));

  console.log("Terimkasih sudah memasukan data");
  rl.close();
};

module.exports = { tulisPertanyaan, simpanContact };
