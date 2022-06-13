function divide(a,b){
    return a/b;
}

module.exports=divide;

// module.exports=divide();
// console.log(module.exports)

// we can directly right our function like this if we 
//have same name here and there (index.js)

module.exports  = function(a,b)  {
       return a/b;
}