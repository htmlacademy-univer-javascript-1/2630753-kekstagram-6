
let checkString = function(string, length){
  if(string.length <= length){
    return true;
  }
  else{
    return false;
  }
};

console.log(checkString("vueirvveuir", 20));
console.log(checkString("vueirvveuir", 9));

let checkPalindrom = function(string){
  let stringRev = string.trim().split('').reverse().join('')
  if(string.trim() === stringRev){
    return true;
  }
  else{
    return false;
  }
}

console.log(checkPalindrom("    топот        "));
console.log(checkPalindrom("топор"));
