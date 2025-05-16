const express = require("express")
const app = express()
const {initializeDatabase} = require("./db/db.connect")

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json())

initializeDatabase()

const Events = require("./models/event.model")

async function readAllEvents() {
    try{
const allEvents = await Events.find()
    return allEvents;
    } catch (error){
        throw error
    }

        
}

app.get("/events", async (req, res) =>{
    try {
          const events = await readAllEvents()
          res.status(200).json({events})
    } catch (error) {
        res.status(500).json({error: "Failed to fetch events."})
    }

})

async function readEventByTitle(eventTitle) {
    try{
const eventByTitle = await Events.findOne(eventTitle)
    return eventByTitle;
    } catch (error){
        throw error
    }

        
}

app.get("/events/:eventTitle", async (req, res) =>{
    try {
          const event = await readEventByTitle(req.params.eventTitle)
          res.status(200).json({event})
    } catch (error) {
        res.status(500).json({error: "Failed to fetch events."})
    }

})

async function readEventsByTag(tag) {
    try {
        const events = await Events.find({ tags: tag }); 
        return events;
    } catch (error) {
        throw error;
    }
}

app.get("/events/by-tag/:tag", async (req, res) => {
    try {
        const events = await readEventsByTag(req.params.tag);
        res.status(200).json({ events });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch events by tag." });
    }
});



async function createEvent(newEvent){
    try {
        const event = new Events(newEvent)
        const saveEvent = await event.save()
        return saveEvent
    } catch (error) {
        throw error
    }
}

app.post("/events", async (req,res) => {
    try {
       const event = await createEvent(req.body)
        res.status(201).json({message: "Event seeded to database.", event: event})
    } catch (error) {
        res.status(500).json({error: "Failed to add event"})
    }
})



async function deleteEvent(eventId) {
    try{
        const deletedEvent = await Events.findByIdAndDelete(eventId)
        return deletedEvent
    } catch (error){
        console.log(error)
        }
}

app.delete("/events/:eventId", async(req, res) =>{
    try{
        const hotel = await deleteEvent(req.params.eventId)
        res.status(200).json({message: "EVent deleted succesfully."})
        
    } catch (error){
        res.status(500).json({error: "Failed to delete event."})
        }
})


  const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
