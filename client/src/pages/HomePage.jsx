import Header from '../components/common/Header'
import { useAuth } from '../hooks/useAuth'

const HomePage = () => {

  const { auth } = useAuth();

  return (
    <div>
      <Header />
      <h1 className="text-center text-3xl mt-10">Welcome to the Home Page</h1>
      <p className="text-center mt-5">This is the home page of the application</p>
      <p className="text-center mt-5">User: {auth.user?.email}</p>
    </div>
  )
}

export default HomePage