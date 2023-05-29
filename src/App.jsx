import { BrowserRouter, Route , Routes } from 'react-router-dom';
import Netflix from './pages/Netflix';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Player from './pages/Player';


function App() {

  return (
    <>
   <BrowserRouter>
    <Routes>
      <Route>
        <Route exact path='/' element={<Netflix/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/signup' element={<SignUp/>} />
        <Route exact path='/player' element={<Player/>} />
      </Route>
    </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
