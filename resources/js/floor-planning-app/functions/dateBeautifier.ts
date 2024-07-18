
export const dateBeautifier = (string)=> {
   return `${string.slice(8,10)}.${string.slice(5,7)}.${string.slice(0,4)} ${string.slice(11, 13)}:${string.slice(14, 16)}`
}
