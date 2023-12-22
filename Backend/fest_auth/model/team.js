const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    collegeName: {
      type: String,
      required: true,
      min: 5,
      max: 255,
    },
    teamName:{
        type: String,
        default: "not assigned"
    },
    isUG: {
        type:Boolean,
        required: true,
        default:true
    },
    email: {
      type: String,
      required: true,
      min: 5,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 5,
      max: 255,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Team", teamSchema);
