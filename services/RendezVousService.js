const Rdv = require('../models/RendezVous');


const addRdv = async function (rdvInput) {
    console.log(rdvInput);
    const rdv = new Rdv(rdvInput);
    console.log(rdv);
    await rdv.save();
    return rdv;
}

module.exports = { addRdv };