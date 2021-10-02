const mongoose = require('mongoose');
const moment = require('moment-timezone');
timeZone = moment().tz("Europe/Paris").format();


const rendezvousSchema = mongoose.Schema({
  id:{
    type: String,
    required: [false, 'Nom requis']
  },
  calendarId: {
    type: String,
    required: [false, 'Nom requis']
  },
  title: {
    type: String,
    required: [false, 'Nom requis'],
    minlength: [2, 'Le Nom ne peut pas être inférieur à 2 lettres'],
    maxlength: [64, 'Le Nom ne peut pas dépasser 64 lettres']
  },
  isAllDay: {
    type: String,

  },
  start: 
  {
    type: Date

  },
  end: 
  {
    type: Date
  },
  category: {
    type: String,
    required: [false, 'Nom requis']
  },
  bgColor: {
    type: String,
    required: [false, 'Nom requis']
  },
  location: {
    type: String,
    required: [false, 'Nom requis'],
    minlength: [2, 'Le Nom ne peut pas être inférieur à 2 lettres'],
    maxlength: [64, 'Le Nom ne peut pas dépasser 64 lettres']
  }
});

// rendezvousSchema.pre('save', async function(next) {
//   if(! this.isModified('password')) next()

//   this.password = bcrypt.hash(this.password, 10)
//   next()
// })

const rdv = mongoose.model('rendez_vous', rendezvousSchema);

module.exports = rdv;