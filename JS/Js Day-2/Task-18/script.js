function Remove(){
    const s=document.getElementById("inp1").value;
    let sentence=s.replace(/\s+/g,"");
    console.log(sentence);
}