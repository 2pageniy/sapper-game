export default function getRandomInt(min, max, exclude) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let randomInt = Math.floor(Math.random() * (max - min)) + min;
  while (exclude === randomInt) {
    randomInt = Math.floor(Math.random() * (max - min)) + min;
  }
  return randomInt; //Максимум не включается, минимум включается
}