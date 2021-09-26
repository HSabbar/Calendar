const express = require('express')
const router =  express.Router()
const { addRdv } = require('../services/RendezVousService')


router.post('/calendar', async (req, res) => {
    try{
      const user = await addRdv(req.body)
      return res.render('calendar', { message: 'Merci pour votre inscription' })
    } catch(e) {
      console.error(e)
      return res.status(400).render('calendar', { message: 'Inscription échouée' })
    }
  })
  
  
  module.exports = router