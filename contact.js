// File System
// const fs = require("node:fs");
import fs from "node:fs";
// const { resolve } = require("node:path");
// const { rejects } = require("node:assert");
import { resolve } from "node:path";
import { rejects } from "node:assert";
import chalk from "chalk";
import validator from "validator";

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

const loadContact = () => {
  const file = fs.readFileSync("data/contact.json", "utf8");
  const contact = JSON.parse(file);
  return contact;
};

const simpanContact = (nama, email, noHP) => {
  const data = { nama, email, noHP };
  // const file = fs.readFileSync("data/contact.json", "utf8");
  // const contact = JSON.parse(file);
  const contact = loadContact();

  // cek duplikat
  const duplikat = contact.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(chalk.red("Contact sudah terdaftar. gunakan nama lain!"));
    return false;
  }

  // cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.bgRed("Email tidak valid!"));
      return false;
    }
  }

  // cek nomor
  if (noHP) {
    if (!validator.isMobilePhone(noHP, "id-ID")) {
      console.log(chalk.bgRed("Nomor HP tidak valid!"));
      return false;
    }
  }

  contact.push(data);

  fs.writeFileSync("data/contact.json", JSON.stringify(contact, null, 2));

  console.log(chalk.green.bold("Terimkasih sudah memasukan data"));
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.cyan.bgWhite("Daftar Kontak : "));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }

  console.log(chalk.cyan.bgWhite(contact.nama));
  console.log(contact.noHP);
  if (contact.email) {
    console.log(contact.email);
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContact = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contacts.length === newContact.length) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }

  fs.writeFileSync("data/contact.json", JSON.stringify(newContact, null, 2));

  console.log(chalk.green.bold(`${nama} berhasil dihapus`));
};

export const contacts = {
  simpanContact,
  listContact,
  detailContact,
  deleteContact,
};
