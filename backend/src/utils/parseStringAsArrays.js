module.exports = function parseStringAsArray(arayAsString){
    return arayAsString.split(',').map(tech => tech.trim())
}