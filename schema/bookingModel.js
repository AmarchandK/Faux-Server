const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema(
    {
        booking_date : {type : Date},
        booking_status : {type : Boolean},
        user_id : {type : String},
        turf_id : {type : String},
        turf_index : {type : Number},
        time_period : {type : String},
        booking_price : {type : Number}
    }
)

const model = mongoose.model("bookingModel", bookingSchema)

module.exports = model