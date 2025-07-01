import yargs from "yargs";
import { hideBin } from "yargs/helpers";
// const contact = require("./contact");
import { contacts } from "./contact.js";
// const argv = yargs(hideBin(process.argv)).parse();

// console.log(argv);

// yargs()
//   .command(
//     "add",
//     "Menambahkan contact baru",
//     () => {},
//     (argv) => {
//       console.log(argv.nama);
//     }
//   )
//   .help()
//   .parse(hideBin(process.argv));

yargs(hideBin(process.argv))
  .command({
    command: "add",
    description: "Menambahkan contact baru",
    builder: {
      nama: {
        describe: "nama Lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "Nomor HP",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      contacts.simpanContact(argv.nama, argv.email, argv.noHP);
    },
  })
  // menampilkan daftar nama dan nomor hp
  .command({
    command: "list",
    description: "Menampilkan nama dan nomor HP contact",
    handler() {
      contacts.listContact();
    },
  })
  // menampilkan detail sebuah contact
  .command({
    command: "detail",
    description: "Menampilkan detail sebuah contact berdasarkan nama",
    builder: {
      nama: {
        describe: "Nama Lengkap",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      contacts.detailContact(argv.nama);
    },
  })
  // Menghapus kontak berdasarkan nama
  .command({
    command: "delete",
    description: "Menghapus contact berdasarkan nama",
    builder: {
      nama: {
        describe: "Nama Lengkap",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      contacts.deleteContact(argv.nama);
    },
  })
  .demandCommand(1, "Anda harus memberikan setidaknya satu perintah")
  .help()
  .parse();
