function add(){
    const n1=parseInt(document.getElementById("inp1").value);
    const n2=parseInt(document.getElementById("inp2").value);
    const c=n1+n2;
    console.log("Sum:"+c);
}
function sub(){
    const n1=parseInt(document.getElementById("inp1").value);
    const n2=parseInt(document.getElementById("inp2").value);
    const c=n1-n2;
    console.log("Difference:"+c);
}
function mul(){
    const n1=parseInt(document.getElementById("inp1").value);
    const n2=parseInt(document.getElementById("inp2").value);
    const c=n1*n2;
    console.log("Product:"+c);
}
function div(){
    const n1=parseInt(document.getElementById("inp1").value);
    const n2=parseInt(document.getElementById("inp2").value);
    const c=n2/n1;
    console.log("Quotient:"+c);
}

