function makeSandwich() {
  console.log(" Making Sandwich 3");
}

function makeBurger() {
  console.log(" Making Burger 3");
}

// console.log(module.exports);
module.exports.viraj = makeSandwich;
// module.exports.makeBurger = makeBurger;

// module.exports = { makeSandwich, makeBurger };

//or we can write it like this 
// module.exports = { makeSandwich:makeSandwich, makeBurger:makeBurger };

