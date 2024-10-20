import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  temperature: {
    avg: { type: Number },
    max: { type: Number },
    min: { type: Number },
  },
  dominantCondition: { type: String },
  date: { type: Date, default: Date.now },
});

const Weather = mongoose.model('Weather', weatherSchema);

export default Weather;
