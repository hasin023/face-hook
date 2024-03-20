import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'

const HomePage = () => {

  const { auth } = useAuth();

  return (
    <div>
      <h1 className="text-center text-3xl mt-10">Welcome to the Home Page</h1>
      <p className="text-center mt-5">This is the home page of the application</p>
      <p className="text-center mt-5">User: {auth.user?.email}</p>
      <div className='flex justify-center mt-6'>
        <Link to="/me" className="text-center bg-green-500 rounded-full px-4 py-2 w-40">Go to Profile</Link>
      </div>
    </div>
  )
}

export default HomePage