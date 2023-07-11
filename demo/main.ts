import { Configuration } from './configuration.env';

function main() {
  const config = new Configuration();
  //console.log(process.env);
  console.log(config, {
    bool: config.bool,
    num: config.num,
    text: config.text,
    textArr: config.textArray,
    numArr: config.numberArray,
  });
}

main();
