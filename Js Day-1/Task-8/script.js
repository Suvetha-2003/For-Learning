function Print(){
    const n=document.getElementById("text").value;
    for (let i=1;i<=n;i++) { 
        let row=""; 
        for (let j=1;j<=i;j++) { 
            row+="*"; 
        }
        console.log(row);
    }
}