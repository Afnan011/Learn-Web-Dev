const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Name: String,
  Email: String,
});

const eventSchema = new mongoose.Schema({
  name: String,
  eventType: {
    type: String,
    enum: ["UG", "PG", "Combined"],
    default: "Combined",
  },
  users: { type: [userSchema], default: [] },
});

const teamSchema = new mongoose.Schema({
  teamName: String,
  college: String,
  
  accommodation: {
    countOfBoys: Number,
    countOfGirls: Number,
  },

  events: {
    Coding: eventSchema,
    Web: eventSchema,
    ITManager: eventSchema,
    Quiz: eventSchema,
    Debate: eventSchema,
    Dance: eventSchema,
    Photography: eventSchema,
    Gaming: eventSchema,
    Treasure: eventSchema,
    ProductLaunch: eventSchema,
    Designing: eventSchema,
    CollegeMaking: eventSchema,
  },

  paymentStatus: {
    verificationStatus: String,
    transactionId: String,
    screenshot: String,
  },
});

const pgTeamSchema = new mongoose.Schema({
  Team: teamSchema,
});

const ugTeamSchema = new mongoose.Schema({
  Team: teamSchema,
});

const ITFestSchema = new mongoose.Schema({
  PG: pgTeamSchema,
  UG: ugTeamSchema,
});

const ITFestModel = mongoose.model("ITFest", ITFestSchema);


module.exports = {ITFestModel};
