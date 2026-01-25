const fs = require("node:fs")
const path = require("node:path")


const logDataRichiesta = (req, res, next) => {
    const{method,originalUrl} = req
    const date = new Date().toLocaleDateString()
    const route = path.join(__dirname, "logRichieste.txt")
    const content = `Metodo: ${method} - URL: ${originalUrl} - Data: ${date}\n`
    fs.appendFile(route, content, err => {
        if(err) {
            console.log("Errore nella scrittura del file di log:", err)
        } else {
            console.log("Log della richiesta salvato con successo.")
        }
    })
    next()

}
module.exports = logDataRichiesta

