function count(){
    const s=document.getElementById("inp1").value;
    const s1=document.getElementById("inp2").value;
    let sen=s.split('');
    let count=0;
    for(let i=0;i<sen.length;i++){
        if(sen[i]==s1){
            count++;
        }
    }
    console.log(count);
}