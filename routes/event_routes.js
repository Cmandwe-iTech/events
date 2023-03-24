const express = require("express");
const EventModel = require("../models/event");
const event_router = express.Router();

event_router.post("/v1/events", async (req, res) => {
  try {
    const event = await EventModel.create({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
    });
    res.status(201).json({
      event,
    });
  } catch (e) {
    res.status(404).json({
      error: "validation require",
      message: e.message,
    });
  }
});

event_router.get("/v1/events", async (req, res) => {
  try {
    const event = await EventModel.find();
    res.status(200).json({
      event,
    });
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
  }
});

event_router.get("/v1/events/:id", async (req, res) => {
  try {
    const eventbyid = await EventModel.findOne({ _id: req.params.id });
    if (eventbyid) {
      res.status(200).json({
        eventbyid,
      });
    } else {
      res.status(404).json({
        error: "There is no event this ID",
      });
    }
  } catch (e) {
    res.status(404).json({
      error: "There is no event this ID",
      message: e.message,
    });
  }
});

event_router.delete("/v1/events/:id", async (req, res) => {
  try {
    const eventbyid = await EventModel.findOne({ _id: req.params.id });
    if (eventbyid) {
      await EventModel.deleteOne({ _id: req.params.id });
      res.status(204).json({
        status: "success",
      });
    } else {
      res.status(204).json({
        error: "There is no event this ID",
      });
    }
  } catch (e) {
    res.status(404).json({
      error: "There is no event this ID",
      message: e.message,
    });
  }
});

event_router.put("/v1/events/:id", async (req, res) => {
  try {
    const eventbyid = await EventModel.findOne({ _id: req.params.id });
    if (eventbyid) {
      await EventModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
          },
        }
      );
      const updated = await EventModel.findOne({ _id: req.params.id });
      if(updated.title === "" || updated.description === "" || updated.location ==="" || updated.end_time===""|| updated.start_time===""){
        res.json({
          error:"title and required field should not be empty and update again"
        })
      }else {
      res.status(200).json({
        status: "success",
        updated,
      })}
    } else {
      res.status(404).json({
        error: "There is no event this ID",
      });
    }
  } catch (e) {
    res.status(404).json({
      error: "There is no event this ID",
      message: e.message,
    });
  }
});

module.exports = event_router;
