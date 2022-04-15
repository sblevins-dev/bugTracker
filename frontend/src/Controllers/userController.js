import axios from 'axios';

const fetchUsers = async () => {
    const response = await axios.get('auth/', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })

    return response.data;
}

const userController = {
    fetchUsers
}

export default userController;