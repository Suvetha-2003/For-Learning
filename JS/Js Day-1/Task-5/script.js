function Calculate(){
    const n=document.getElementById("num").value;
    let sum=0;
    for(let i=1;i<=n;i++){
        sum+=i;
    }
    console.log(sum);
}