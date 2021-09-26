const mongoose = require('mongoose')

const rendezvousSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Nom requis'],
    minlength: [2, 'Le Nom ne peut pas être inférieur à 2 lettres'],
    maxlength: [64, 'Le Nom ne peut pas dépasser 64 lettres']
  },
  location: {
    type: String,
    required: [true, 'Nom requis'],
    minlength: [2, 'Le Nom ne peut pas être inférieur à 2 lettres'],
    maxlength: [64, 'Le Nom ne peut pas dépasser 64 lettres']
  },
  isAllDay: {
    type: Boolean,
    default: false
  },
  state: {
      type: String 
  }
}, {
  timestamps: true
})

// rendezvousSchema.pre('save', async function(next) {
//   if(! this.isModified('password')) next()

//   this.password = bcrypt.hash(this.password, 10)
//   next()
// })

const rdv = mongoose.model('rendez_vous', rendezvousSchema)

module.exports = rdv