const mongoose = require('mongoose');

const rendezvousSchema = mongoose.Schema({
  title: {
    type: String,
    required: [false, 'Nom requis'],
    minlength: [2, 'Le Nom ne peut pas être inférieur à 2 lettres'],
    maxlength: [64, 'Le Nom ne peut pas dépasser 64 lettres']
  },
  location: {
    type: String,
    required: [false, 'Nom requis'],
    minlength: [2, 'Le Nom ne peut pas être inférieur à 2 lettres'],
    maxlength: [64, 'Le Nom ne peut pas dépasser 64 lettres']
  },
  isAllDay: {
    type: String,
    required: [false, 'Nom requis'],
    minlength: [2, 'Le Nom ne peut pas être inférieur à 2 lettres'],
    maxlength: [64, 'Le Nom ne peut pas dépasser 64 lettres']
  },
  state: {
      type: String 
  }
});

// rendezvousSchema.pre('save', async function(next) {
//   if(! this.isModified('password')) next()

//   this.password = bcrypt.hash(this.password, 10)
//   next()
// })

const rdv = mongoose.model('rendez_vous', rendezvousSchema);

module.exports = rdv;