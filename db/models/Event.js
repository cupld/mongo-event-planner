const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const validateEmail = function(email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const EventSchema = new mongoose.Schema({
    organizer: {type: String, max:[20, 'Organizer name should be 20 charachter'], unique: true, required: true },
    name: {type: String,  required: true, $nin:["event"], lowercase: true },
    email: 
    {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address']
        // {type: String, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']}
    },
    image: {type: String, required: true},
    numOfSeats: {type: Number ,minItems: 5 , required: true},
    bookedSeats: {type: Number, default:0 , $lte:[this.numOfSeats] },
    startDate: {type: Date, required: true , $gte : [Date.now()]},
    endDate: {type: Date, required: true , $lte: [this.startDate]},
});

EventSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("Event", EventSchema);