function checkPrime(){
    const n=document.getElementById("num").value;
    if(n==0||n==1){
        console.log("Neither Prime nor Composite");
    }
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            isPrime = false;
            break;
        }
    }
    if (isPrime) {
        console.log(n + " is a Prime number.");
    } else {
        console.log(n + " is not a Prime number.");
    }
}