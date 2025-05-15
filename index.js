const express = require("express")
const cors = require("cors")
const app = express()
const {initializeDatabase} = require("./db/db.connect")
app.use(cors())
app.use(express.json())

initializeDatabase()

const Events = require("./models/event.model")


const techConference = {
    name: "Tech Conference",
    isOnline: false, 
    imageUrl: "https://placehold.co/600x400?text=Tech+Conference", 
    date: "Thu 13 Jun 2025",
    timings: "10:00:00 AM to 12:00:00 PM ",
    venue: "Marketing World",
    address: "Tech Avenue, City",
    host: "Tech Experts",
    details: "Tech conference hosted by experts will bring new insights to yur understanding of thr current day world of Technology & how the field is changing dynanmically & what you can do to keep up, with the best of the best.",
    isPaid: false, 
    price: "₹ 2500", 
    presenters: [{name: "John Doe", title: "CTO Tech Company"}, {name: "Jane Smith", title: "AI Expert"}], 
    tags: ["tech", "innovation"],
    dressCode: "Smart Casual", 
}


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
        res.status(201).json({message: "Event seeded to database."})
    } catch (error) {
        res.status(500).json({error: "Failed to add event"})
    }
})


  const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
