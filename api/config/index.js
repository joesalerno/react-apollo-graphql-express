const port = 5000
const expireLoginTokenMinutes = 1000
const mongoURI = 'mongodb+srv://user:ZKBxpP8g6ug8gTbM@cluster0-ip4tr.mongodb.net/test?retryWrites=true'
//const mongoURI = 'mongodb://127.0.0.1:27017/test'
const secretOrKey = 'ThisisincrediblysecretdonotsharethiskeY'

module.exports = { port, mongoURI, secretOrKey, expireLoginTokenMinutes }