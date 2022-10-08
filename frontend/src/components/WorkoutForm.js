import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
	const { dispatch } = useWorkoutsContext()
	const { user } = useAuthContext()
	const [title, setTitle] = useState('')
	const [load, setLoad] = useState('')
	const [reps, setReps] = useState('')
	const [error, setError] = useState('')
	const [emptyFields, setEmptyFields] = useState([])

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!user) return

		const workout = { title, load, reps }

		const res = await fetch('http://localhost:4000/api/workouts', {
			method: 'POST',
			body: JSON.stringify(workout),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${user.token}`,
			},
		})

		const jsonData = await res.json()

		if (!res.ok) {
			setError(jsonData.error)
			setEmptyFields(jsonData.emptyFields)
		}

		if (res.ok) {
			setTitle('')
			setLoad('')
			setReps('')
			setError(null)
			setEmptyFields([])
			console.log('Workout Added', jsonData)
			dispatch({ type: 'CREATE_WORKOUT', payload: jsonData })
		}
	}

	return (
		<form className="create" onSubmit={handleSubmit}>
			<h3>Add a New Workout</h3>

			<label>Exercise Title:</label>
			<input
				type="text"
				onChange={(e) => setTitle(e.target.value)}
				value={title}
				className={emptyFields.includes('title') ? 'error' : ''}
			/>

			<label>Load (in kg):</label>
			<input
				type="number"
				onChange={(e) => setLoad(e.target.value)}
				value={load}
				className={emptyFields.includes('load') ? 'error' : ''}
			/>

			<label>Reps:</label>
			<input
				type="number"
				onChange={(e) => setReps(e.target.value)}
				value={reps}
				className={emptyFields.includes('reps') ? 'error' : ''}
			/>

			<button>Add Workout</button>
			{error && <div className="error">{error}</div>}
		</form>
	)
}
export default WorkoutForm
