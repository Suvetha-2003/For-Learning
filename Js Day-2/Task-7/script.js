function count(){
    let n=document.getElementById("inp1").value;
    let count=0;
    while(n>0){
        let r=n%10;
        count++;
        n=Math.floor(n/10);
    }
    console.log(count);
}