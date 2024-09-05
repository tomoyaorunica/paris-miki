export default class Easing
{
  // https://easings.net/ja
  // static easeInOutSine  = (x) => -(Math.cos(Math.PI * x) - 1) / 2
  // static easeInOutQuad  = (x) => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2
  // static easeInOutCubic = (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
  // static easeInOutQuart = (x) => x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2
  static easeInOutQuint = (x) => x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2
  // static easeInOutExpo = (x) => x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2

  // static easeOutSine  = (x) => Math.sin((x * Math.PI) / 2)
  static easeOutCubic = (x) => 1 - Math.pow(1 - x, 3)
  // static easeOutQuart = (x) => 1 - Math.pow(1 - x, 4)
  // static easeOutQuint = (x) => 1 - Math.pow(1 - x, 5)
  // static easeOutExpo  = (x) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
}