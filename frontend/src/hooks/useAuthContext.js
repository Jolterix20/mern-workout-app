import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

export const useAuthContext = () => {
	const context = useContext(AuthContext)

	// Checking if context is used within scope
	if (!context) {
		throw new Error(
			'useAuthContext must be used inside a AuthContextProvider'
		)
	}

	return context
}
