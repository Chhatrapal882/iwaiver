const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')
let userSchema = new Schema({
   username:{
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   tokens:
   [{
      token:{
         type: String,
         required: true
      }     }
      
   ]
},
{
   timestamps: true,
   collection: 'users'
})

userSchema.methods.generateAuthToken = async function (){
   try{
      let token = jwt.sign({_id:this._id},process.env.TOKEN_SECRET)
      this.tokens = this.tokens.concat({token:token})
      await this.save()
      return token
   }
   catch(err){
      console.log(err)
   }
}

module.exports = mongoose.model('User', userSchema);