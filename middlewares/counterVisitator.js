const visitator  = new Set();


const counterVisitator = (req, res, next) => {

    const { ip } = req;
    visitator.add(ip);
    console.log(`Numero di visitatori unici: ${visitator.size}`);

    next();
}
module.exports = counterVisitator;