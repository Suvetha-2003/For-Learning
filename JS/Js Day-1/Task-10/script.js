function Reverse(){
    const s=document.getElementById("num").value;
    let str= s.split('').reverse().join('');
    console.log(str);
}