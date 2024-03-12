import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import Dashboard from './pages/Dashboard/Dashboard'
import IfAuth from './utils/IfAuth'
import VerifyAuthToken from './utils/VerifyAuthToken'
import { Toaster } from 'react-hot-toast'
import Transactions from './pages/Transactions/Transactions'
import Share from './pages/Share/Share'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<VerifyAuthToken />}>
            <Route path='/' element={<Home/>} />
            <Route path='/dashboard/:id' element={<Dashboard />} />
            <Route path='/incomes/:id' element={<Transactions transaction={"income"} />} />
            <Route path='/expenses/:id' element={<Transactions transaction={"expense"} />} />
            <Route path='/share/:id' element={<Share />} />
            <Route path='/profile' element={<Profile />} />
          </Route>

          <Route element={<IfAuth />}>
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup />} />
          </Route>

          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
      <Toaster
        position='top-center'
        toastOptions={
          {
            duration: 5000,
            style: {
              width: '500px',
              padding: '16px',
              fontSize: '1rem',
            }
          }
        }
      />
    </>
  )
}

export default App
