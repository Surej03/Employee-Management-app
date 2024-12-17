import axios from 'axios';

const signOut = async () => {
  try {
    await axios.post('http://localhost:8000/auth/signout', {});
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/signin';
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

export default signOut;