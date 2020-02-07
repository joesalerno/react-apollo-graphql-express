const fs = require ("fs")
const file = fs.readFileSync("./movies.txt")
const array = file.toString().split("\r\n")

for (let i = 0; i < array.length; i++){
  console.log(`${i}: ${array[i]}`)
  fs.copyFileSync(array[i], `./movies/${i}.mov`)
}

//fs.copyFileSync('C:\\Users\\Joe\\Pictures\\1\\100APPLE\\IMG_0001.JPG', './test.jpg')