module.exports = regEx => {
    try {
        new RegExp(regEx)
        return true
    } catch {
        return false
    }
}