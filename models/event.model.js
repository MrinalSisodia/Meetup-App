const mongoose= require("mongoose")

const EventSchema = new mongoose.Schema({
name : {
    type: String,
    required: true
}, 
isOnline : {
    type: Boolean, 
    default: false
} ,
host: {  
    type: String,
    required: true},
imageUrl: {  
    type: String,
    required: true},
details: {  
    type: String,
    required: true},
date: { type: String,
    required: true},
 timings:   {  
    type: String,
    required: true},
  venue: {  
    type: String,
    required: true}, 
    address:  {  
    type: String,
    required: true},
 isPaid: Boolean,
 price: String,
 presenters: [
    {name: String, 
tite: String}
],
tags: [{type : String,}], 
dressCode: String, 
ageRestriction: String
})

const Events = mongoose.model("Events", EventSchema)
 
module.exports = Events