import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
	const [loading, setLoading] = useState(null)
	const [error, setError] = useState(null)
	const { dispatch } = useAuthContext()

	const signup = async (email, password) => {
		setLoading(true)
		setError(null)

		const res = await fetch('http://localhost:4000/api/user/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		})
		const data = await res.json()

		if (!res.ok) {
			setLoading(false)
			setError(data.error)
		}
		if (res.ok) {
			// save user to localStorage
			localStorage.setItem('user', JSON.stringify(data))

			// update AuthContext
			dispatch({ type: 'LOGIN', payload: data })

			setLoading(false)
		}
	}

	return { signup, loading, error }
}
