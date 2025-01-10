let array=[7,3,5,8,1,9];
let max=array[0];
for(let i=0;i<array.length;i++){
    if(array[i]>max){
        max=array[i];
    }
}
console.log(max);