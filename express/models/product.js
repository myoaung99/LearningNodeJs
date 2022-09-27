const fs = require("fs");
const path = require("path");
const { mainModule } = require("process");
module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const p = path.join(
      path.dirname(mainModule.filename),
      "data",
      "products.json"
    );
    fs.readFile(p, (err, fileContent) => {
      let products = []; // ဖတ်မရရင် empty array
      if (!err) {
        // ဖတ်တာရရင် ရတဲ့ array ထည့်
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    const p = path.join(
      path.dirname(mainModule.filename),
      "data",
      "products.json"
    );

    // this is async func
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      }

      cb(JSON.parse(fileContent));
    });
  }
};
