import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  city: { type: String, required: true },
  thresholdTemp: { type: Number, required: true },
  condition: { type: String },  // e.g., temperature, weather condition
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Alert = mongoose.model('Alert', alertSchema);

export default Alert;
