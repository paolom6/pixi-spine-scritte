import "./styles.css";
import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";
const fs = require("fs");
var files = fs.readdirSync("/assets/dragon");
var path = require("path");

for (var i in files) {
  if (path.extname(files[i]) === ".json") {
    var directory = "assets/dragon/" + files[i];
    break;
  }
}

const data = JSON.parse(fs.readFileSync(directory));

const app = new PIXI.Application();
document.body.appendChild(app.view);

const array = Object.keys(data.animations);
console.log(array);

PIXI.Assets.load(directory).then((resource) => {
  const dragon = new Spine(resource.spineData);
  var animation = 0.0;
  dragon.state.timeScale = 1.0;
  const style = new PIXI.TextStyle({
    fill: ["#ffffff", "#ffffff"],
  });
  const text = new PIXI.Text(
    array[0] + " velocità: " + dragon.state.timeScale + "x",
    style
  );
  dragon.state.setAnimation(0, array[0], true);
  for (let i = 0; i < 1; i++) {
    document.addEventListener("keydown", function (event) {
      if (event.key == "ArrowLeft" && animation > 0) {
        animation = animation - 1;
        text.text =
          array[animation] +
          " velocità: " +
          dragon.state.timeScale.toFixed(1) +
          "x";
        dragon.state.setAnimation(0, array[animation], true);
      } else if (event.key == "ArrowRight" && animation < array.length - 1) {
        animation = animation + 1;
        text.text =
          array[animation] +
          " velocità: " +
          dragon.state.timeScale.toFixed(1) +
          "x";
        dragon.state.setAnimation(0, array[animation], true);
      } else if (event.key == "ArrowUp" && dragon.state.timeScale < 3) {
        dragon.state.timeScale = dragon.state.timeScale + 0.3;
        text.text =
          array[animation] +
          " velocità: " +
          dragon.state.timeScale.toFixed(1) +
          "x";
      } else if (event.key == "ArrowDown" && dragon.state.timeScale > 0.2) {
        dragon.state.timeScale = dragon.state.timeScale - 0.3;
        text.text =
          array[animation] +
          " velocità: " +
          dragon.state.timeScale.toFixed(1) +
          "x";
      }
    });
  }
  // set the position
  dragon.x = 400;
  dragon.y = 400;

  dragon.scale.set(0.4);

  text.x = 100;
  text.y = 550;

  app.stage.addChild(dragon);
  app.stage.addChild(text);
});
