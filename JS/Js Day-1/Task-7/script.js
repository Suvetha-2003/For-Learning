function Count(){
    let s=document.getElementById("text").value;
let sum=0;
for(let i=0;i<s.length;i++){
    if(s.charAt(i)=='a'||s.charAt(i)=='e'||s.charAt(i)=='i'||s.charAt(i)=='o'||s.charAt(i)=='u'){
        sum++;
    }
}
console.log(sum);
}
