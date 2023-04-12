export const removeWord = (string, count) =>{
    const result = string.split(' ').slice(count).join(' ');
    return result;
}