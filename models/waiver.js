const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
   waivername:{
      type: String,
      required: true
   },
//    email: {
//       type: String,
//       required: true
//    },
//     minor: {
//       type: Number,
//       // required: true
//    },
//    address: {
//     type: Number,
//     required: true
//  },
//  phone: {
//     type: Number,
//     required: true
//  } ,
 description: {
   type: String,
   required: true
}
 
},{
   timestamps: true,
   collection: 'waivers'
})
module.exports = mongoose.model('Waiver', userSchema);