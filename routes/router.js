const express = require('express')
const router =  express.Router()
const Rdv = require('../models/RendezVous');



router.post('/calendar', async (req, res, next) => {
    const body = req.body;
	const { title, location, isAllDay, state } = body;
    console.log(body);
	const newRdv = new Rdv({ title, location, isAllDay, state });
	try {
        console.log(newRdv);
		await newRdv.save();
		res.status(200).render('calendar');
	} catch(error) {
		error.status = 400;
		next(error);
	}
});
  
  
  module.exports = router