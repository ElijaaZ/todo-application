import React, { useContext} from 'react'
import Today from '../components/Today'
import Welcome from '../components/Welcome'
import { AuthContext } from '../context/AuthContext'

const Home = () => {

   const {
      state: { user },
    } = useContext(AuthContext);

  return (
    <div>
      {user ? <Today/> : <Welcome/>}
    </div>
  )
}

export default Home
