function Grade(){
    const n=document.getElementById("inp1").value;

    switch(true){
        case n<100 && n>90:
            console.log("A");
            break;
        case n<89 && n>80:
            console.log("B");
            break;
        case n<79 && n>70:
            console.log("C");
            break;
        default:
            console.log("F");
    }
}