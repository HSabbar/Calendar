const express = require('express');
const router =  express.Router();
const Rdv = require('../models/RendezVous');



router.post('/calendar', async (req, res, next) => {
    const body = req.body;
	const { title, location, isAllDay, state } = body;
    console.log(req);
    console.log(router.locals.schedule);
	const newRdv = new Rdv({ title, location, isAllDay, state });
	try {
        console.log(newRdv);
		await newRdv.save();
		res.status(200).render('calendar',{schedule: 
            {
                    id: '1',
                    calendarId: '1',
                    title: 'my schedule',
                    category: 'time',
                    dueDateClass: '',
                    start: '2021-09-28T22:30:00+09:00',
                    end: '2021-09-28T02:30:00+09:00'
            } 
        });
	} catch(error) {
		error.status = 400;
		next(error);
	}
});
  
  
  module.exports = router