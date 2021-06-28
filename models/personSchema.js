const mongoose = require ('mongoose')
const Schema = mongoose.Schema

//Create a person with this prototype
const PersonSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    age:Number,
    profession:{
        type:String,
        required:true,
    },
    email: {
         type: String,
         default: "email@domain.com",
        },
    favoriteFoods:[String],
    

})

module.exports = mongoose.model('person', PersonSchema)