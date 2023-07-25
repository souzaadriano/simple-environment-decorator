import { Configuration } from './configuration.env';

function main() {
  const config = new Configuration();
  console.log(config.toObject());
}

main();
