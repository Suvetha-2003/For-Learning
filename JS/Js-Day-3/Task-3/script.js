function Replace(){
    const s=document.getElementById("inp1").value;
    let sentence=s.split(" ");
    for(let i=0;i<sentence.length;i++){
        if(i%2==0){
        sentence[i]="EVEN";
        }
    }
    console.log(sentence.join(" "));
}