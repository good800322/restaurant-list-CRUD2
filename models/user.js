const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now    //預設現在時間
  }
})

module.exports = mongoose.model('User', userSchema)   //作為model匯出