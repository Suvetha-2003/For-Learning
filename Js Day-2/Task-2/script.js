function check(){
    const n=document.getElementById("inp1").value;
    if(n>10 && n%2==0){
        console.log("The number is greater than 10 and divisible by 2");
    }
    else if(n>10 && n%2!=0){
        console.log("The number is greater than 10 but not divisible by 2");
    }
    else if(n%2==0 && n<=10){
        console.log("The number is  divisible by 2 but not greater than 10");
    }
    else{
        console.log("The number is not divisible by 2 and not greater than 10");
    }
}