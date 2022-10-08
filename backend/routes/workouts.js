const express = require('express')
const {
	getWorkouts,
	getWorkout,
	createWorkout,
	deleteWorkout,
	updateWorkout,
} = require('../controllers/workoutControllers')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// auth for all routes
router.use(requireAuth)

// GET all workouts
router.get('/', getWorkouts)

// GET single workout
router.get('/:id', getWorkout)

// POST new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// PATCH a workout
router.patch('/:id', updateWorkout)

module.exports = router
