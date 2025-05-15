const express = require("express")
const cors = require("cors")
const app = express()
const {initializeDatabase} = require("./db/db.connect")
app.use(cors())
app.use(express.json())

initializeDatabase()

const Events = require("./models/event.model")

async function readAllEvents() {
        const allEvents = await Events.find()
    return allEvents;
}

app.get("/events", async (req, res) =>{
    try {
          const events = await readAllEvents()
          res.status(200).json({events})
    } catch (error) {
        res.status(500).json({error: "Failed to fetch events."})
    }

})

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


  const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
