export default function reverseArray(array){
    let reversed_array=[]
    for (let i=array.length-1;i>=0;i--){
        reversed_array.push(array[i])
    }
    return reversed_array
}