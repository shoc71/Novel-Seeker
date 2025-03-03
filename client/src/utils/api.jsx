const API_URL = import.meta.env.REACT_APP_API_URL || `http://localhost:5000`;

// Login function (allowing email or username)
export const loginUser = async (emailOrUsername, password) => {
    try {
        const response = await fetch(`${API_URL}/api/login`, {
            method: 'POST',
            headers: { 'Contect-Type': 'application/json' },
            body: JSON.stringify({ emailOrUsername, password })
        });

        return await response.json();
    } catch (error) {
        return { success: false, message: `Server error: ${error.message}`}
    }
};

// Register function
export const registerUser = async (firstname, lastname, username, email, password) => {
    try {
        const response = await fetch(`${API_URL}/api/register`, {
            method: 'POST',
            headers: { 'Contect-Type': 'application/JSON' },
            body: JSON.stringify({ firstname, lastname, username, email, password })
        })

        return await response.json();
    } catch (error) {
        return { success: false, message: `Server error: ${error.message}` }
    }
};