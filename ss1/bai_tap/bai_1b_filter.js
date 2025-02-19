const isPrime = (num) => {
    if (num < 2 ) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if( num % i === 0) {
            return false;
        }
    }
    return true;
};

const number = [0,1,2,5,9,7,5,18,21,65,99,75,59,66,33,11,83];

const primeNumber = number.filter(isPrime);

console.log(primeNumber);