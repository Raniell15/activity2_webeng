import inquirer from "inquirer";
import sillyname from "sillyname";
import { randomSuperhero } from "superheroes";
import qr from "qr-image";
import fs from "fs";
var sname = sillyname();
var supern = randomSuperhero();
inquirer
  .prompt([
    {
      message: "What is your name?",
      name: "Boorate",
    },
  ])
  .then((answers) => {
    console.log(
      "Hello",
      answers.Boorate,
      "your villain name will be",
      sname,
      "and superhero name will be",
      supern
    );
    var qr_svg = qr.image(answers.Boorate, { type: "png" });
    qr_svg.pipe(fs.createWriteStream("name.png"));
    var qr_svg1 = qr.image(sname, { type: "png" });
    qr_svg1.pipe(fs.createWriteStream("sillyname.png"));
    var qr_svg2 = qr.image(supern, { type: "png" });
    qr_svg2.pipe(fs.createWriteStream("superheroname.png"));

    console.log("QR codes are generated");

    let writer = fs.createWriteStream("myhero.txt");
    writer.write("Sillyname: " + sname + "\n");
    writer.write("Name: " + answers.Boorate + "\n");
    writer.write("Superhero: " + supern);
    console.log("Text file has been updated");
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
