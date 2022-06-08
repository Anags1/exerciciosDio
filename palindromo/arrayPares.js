function trocaPares(array)
{
    if (!array) return -1;
    if (!array.length) return -1;   
    for (let i = 0; i < array.length; i++)
    {
        if (array[i] === 0)
        {
            console.log('Valor já é zero!');
        } else (array[i] % 2 === 0)
        {
            console.log(`Substituindo ${array[i]} por 0...`);
            array[i] = 0;
        }
    }
    return array;
}

let arr = [1, 3, 4, 6 , 80, 33, 23, 55, 90];

console.log(trocaPares(false));
console.log(trocaPares(arr));
