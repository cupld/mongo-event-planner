const express = require("express");
const router = express.Router();
const{fetchEvent, createEvent, deleteEvent, updateEvent, searchOne, bookedEvent} = require ("./controllers");

router.get("/fullybooked", bookedEvent);
router.get("/", fetchEvent);
router.post("/", createEvent);
router.delete("/:eventId", deleteEvent);
router.put("/:eventId", updateEvent);
router.get("/:eventName", searchOne);


module.exports=router;