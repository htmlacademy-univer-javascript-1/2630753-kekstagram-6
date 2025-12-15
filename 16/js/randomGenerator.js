const getRandomNumber = function(a, b){
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function getRandomNumberOptimized(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

export{ getRandomNumber, getRandomNumberOptimized };
