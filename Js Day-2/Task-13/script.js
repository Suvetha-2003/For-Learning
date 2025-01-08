function count(){
    const s=document.getElementById("inp1").value;
    let count=0;
    for(let i=0;i<s.length;i++){
        if(s.charAt(i)=='a'||s.charAt(i)=='e'||s.charAt(i)=='i'||s.charAt(i)=='o'||s.charAt(i)=='u'){
            count++;
        }
    }
    console.log(count);
}