import { WorkoutsContext } from '../context/WorkoutContext'
import { useContext } from 'react'

export const useWorkoutsContext = () => {
	const context = useContext(WorkoutsContext)

	// Checking if context is used within scope
	if (!context) {
		throw new Error(
			'useWorkoutsContext must be used inside a WorkoutsContextProvider'
		)
	}

	return context
}
