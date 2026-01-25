let getCounter = 0
let postCounter = 0
let pacheCounter = 0
let deleteCounter = 0

const counterRichieste = (req, res, next) => {
    const {method} = req
    switch (method) {
        case 'GET':
        getCounter++
        console.log(`Numero di richieste GET: ${getCounter}`)
        break
        case 'POST':
        postCounter++
        console.log(`Numero di richieste POST: ${postCounter}`)
        break
        case 'PATCH':
        pacheCounter++
        console.log(`Numero di richieste PATCH: ${pacheCounter}`)
        break
        case 'DELETE':
        deleteCounter++
        console.log(`Numero di richieste DELETE: ${deleteCounter}`)
        break
        default:
        break
    }
    
     const mainCounter = {
        GET: getCounter,
        POST: postCounter,
        PATCH: pacheCounter,
        DELETE: deleteCounter
     }
     console.log('Contatore totale richieste:', mainCounter)

    next()
}
module.exports = counterRichieste