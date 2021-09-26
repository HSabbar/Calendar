const Rdv = require('../models/RendezVous')

/**
 *
 * @param {Object} rendezvousInput - It is user input with all variables for user model
 */

const addRdv = async (rdvInput) => {
    const rdv = new Rdv(rdvInput)
    await rdv.save()
    return rdv
}

module.exports = { addRdv }