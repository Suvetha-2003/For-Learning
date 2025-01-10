function Replace(){
    const s=document.getElementById("inp1").value;
    let sen=s.split(" ");
    for(let i=0;i<sen.length;i++){
        for(let j=i+1;j<sen.length;j++){
        if(sen[i]==sen[j]){
            sen[j]="CHANGED";
        }
    }
}
    console.log(sen.join(" "));
}