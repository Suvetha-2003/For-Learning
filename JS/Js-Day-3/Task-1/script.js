function Find(){
    const s=document.getElementById("inp1").value;
    let arr=s.split(" ");
    let result=arr[0];
    for(let i=1;i<arr.length;i++){
        if(result.length<arr[i].length){
            result=arr[i];
        }
    }
    console.log(result);
}