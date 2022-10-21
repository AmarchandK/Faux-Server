const Booking = require("../schema/bookingModel");
const asyncHandler = require("express-async-handler");

module.exports = {
  addBooking: asyncHandler(async (req, res) => {
    try {
      const booking = new Booking({
        user_id: req.body.user_id,
        turf_id: req.body.turf_id,
        booking_date: req.body.booking_date,
        turf_index: req.body.turf_index,
        booking_price: req.body.booking_price,
        booking_status: req.body.booking_status,
        time_period: req.body.time_period,
      });

      const findTurf = await Booking.findOne({ turf_id: req.body.turf_id });
      console.log(findTurf);
      
      if (findTurf) {
        console.log("Turf already booked");
        let tIndex = req.body.turf_index;
        console.log(req.body.turf_id);
        console.log(tIndex);
        const findData = await Booking.findOne({booking_date: req.body.booking_date});
        console.log(findData);
        if (findData) { 
          for (let i = 0; i < tIndex.length; i++) {
            if (findData.turf_index[i] != tIndex[i]) {
              console.log(tIndex[i]);
             await Booking.findOneAndUpdate({ turf_id : findTurf.turf_id}, { $push: { turf_index: tIndex[i] } });
            
            }
          }
          res.status(200).json({ status: "success", message: "Booking added successfully"});
        } else {
          await booking.save();
          res.status(200).json({ status: "success", message: "Booking added successfully"});
        }
      } else {
        await booking.save();
        res.status(200).json({ status: "success", message: "Booking added successfully"});
      }
    } catch (error) {
      res.status(401).json({ status: false, message: error.message });
    }
  }),
  getBooking: asyncHandler(async (req, res) => {
    try {
      const turf_id = req.params.id;
      const booking = await Booking.find({ turf_id: turf_id }).select("-__v");
      res.status(200).json({ status: true, data: booking });
    } catch (error) {
      res.status(401).json({ status: false, message: error.message });
    }
  }),
};
