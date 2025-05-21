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
    address: String,
 isPaid: Boolean,
 price: String,
 presenters: [
    {name: String, 
title: String, 
presenterImgUrl: String}
],
tags: [{type : String,}], 
dressCode: String, 
ageRestriction: String
}, {timestamps: true})

const Events = mongoose.model("Events", EventSchema)
 
module.exports = Events