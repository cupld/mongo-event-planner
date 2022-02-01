const Event = require("../../db/models/Event");

exports.fetchEvent = async (req,res) => {
    try{
        const eventArray = await Event.find();
        res.json(eventArray);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};

exports.createEvent = async(req,res) => {
    try{
        const newEvent = await Event.create(req.body);
        res.status(201).json(newEvent);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};

exports.deleteEvent = async(req,res) => {
    const {eventId} = req.params;
    try{
        const searchEvent = await Event.findByIdAndDelete({_id: eventId});
        if(searchEvent) res.status(204).end();
        else res.status(404).json({message: error.message});
    }
    catch(error){
        res.status(500).json({message: message.error})
    }
};

exports.updateEvent = async(req,res) => {
    const {eventId} = req.params;
    try{
        const searchEvent = await Event.findByIdAndUpdate({_id: eventId}, req.body, {new: true, runValidators: true});
        if(searchEvent) res.json(searchEvent);
        else res.status(404).json({message:"not found"});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

exports.searchOne = async(req,res) => {
    const {eventName} = req.params;
    try{
    const oneEvent = Event.findOne({name: eventName}, req.body);
    res.json(oneEvent);
}
catch(error){
    res.status(500).json({message: error.message})
}
}

exports.deleteManyEvent = async(req,res) => {
    const eventIds = [];
    if(eventIds.length <= 1) eventIds=req.params;
    else eventIds=[eventIds];
    try{
        const manyEvent = await Event.deleteMany([eventIds]);
        if(manyEvent) res.status(204).end();
        else res.status(404).json({message: error.message});
    }
    catch(error){ res.status(500).json({message: message.error}) }
}

exports.bookedEvent = async(req,res) => {
    try{
        const eventBooked  = await Event.find({ $expr: { $eq: ["$numOfSeats", "$bookedSeats"] } });
        res.json(eventBooked);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

