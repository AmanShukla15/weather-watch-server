import express from 'express';
import { checkAndTriggerAlerts, createAlert, deleteAlert, getAllAlerts } from '../controllers/alertController.js';

const router = express.Router();

// Create a new alert
router.post('/create', createAlert);

// Get all active alerts
router.get('/all', getAllAlerts);

// Delete an alert by ID
router.delete('/delete/:id', deleteAlert);

// Trigger alerts
router.get('/trigger', checkAndTriggerAlerts);


export default router;
