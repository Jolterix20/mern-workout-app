const { default: mongoose } = require('mongoose')
const { findByIdAndDelete } = require('../models/workoutModel')
const Workout = require('../models/workoutModel')

// GET all workouts
const getWorkouts = async (req, res) => {
	try {
		const user_id = req.user.id
		const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 })
		res.status(200).json(workouts)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

// GET single workout
const getWorkout = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Workout not found!' })
	}

	try {
		const workout = await Workout.findById(id)

		if (!workout) {
			return res.status(400).json({ error: 'No such workout' })
		}
		res.status(200).json(workout)
	} catch (error) {
		res.status(404).json({ error: 'Workout not found!' })
	}
}

// Create new workout
const createWorkout = async (req, res) => {
	const { title, load, reps } = req.body

	let emptyFields = []

	if (!title) emptyFields.push('title')
	if (!load) emptyFields.push('load')
	if (!reps) emptyFields.push('reps')

	if (emptyFields.length > 0) {
		return res
			.status(400)
			.json({ error: 'Please fill in all the fields', emptyFields })
	}

	// Add doc to DB
	try {
		const user_id = req.user.id
		const workout = await Workout.create({
			title,
			load,
			reps,
			user_id,
		})
		res.status(201).json(workout)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

// DELETE a workout
const deleteWorkout = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Workout not found!' })
	}

	try {
		const workout = await Workout.findByIdAndDelete(id)
		if (!workout) {
			return res.status(400).json({ error: 'No such workout' })
		}
		res.status(200).json(workout)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

// Update a workout
const updateWorkout = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Workout not found!' })
	}

	const workout = await Workout.findByIdAndUpdate(id, {
		...req.body,
	})

	if (!workout) {
		return res.status(400).json({ error: 'No such workout' })
	}

	res.status(200).json(workout)
}

module.exports = {
	getWorkouts,
	getWorkout,
	createWorkout,
	deleteWorkout,
	updateWorkout,
}
