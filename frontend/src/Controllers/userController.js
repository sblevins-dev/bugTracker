import axios from 'axios';

const fetchUsers = async () => {
    const token = JSON.parse(localStorage.getItem('user'))
    const response = await axios.get('auth/', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    return response.data;
}

const userController = {
    fetchUsers
}

export default userController;