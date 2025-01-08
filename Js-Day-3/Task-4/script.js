function Remove() {
const s=document.getElementById("inp1").value;
    let result = ""; 

    for (let i = 0; i < s.length; i++) {
        if (result.indexOf(s[i]) === -1) {
            result += s[i];
        }
    }

    console.log(result);
}

