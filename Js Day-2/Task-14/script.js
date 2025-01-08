function check(){
    const s=document.getElementById("inp1").value;
    let reverse=s.split('').reverse().join('');
    if(s=== reverse){
        console.log("True");
    }
    else{
        console.log("False");
    }
}