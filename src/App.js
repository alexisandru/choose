import React, {useState, useEffect} from 'react'

import {auth} from './firebase.js'
import {onAuthStateChanged} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'


import Main from './components/Main.js'
import Login from './components/Login.js'
import ErrorPage from './components/ErrorPage.js'
import Feed from './components/Feed.js'
import Profile from './components/Profile.js'
import {Routes, Route} from 'react-router-dom'
import Loader from './components/Loader.js'
import ProtectedRoute from './components/ProtectedRoute.js'

import {useDispatch, useSelector} from 'react-redux'
import {addIdCurrentUser} from './features/usersFeature.js'
import {addNewUserToFirebase, fetchUsersFirestore, fetchPostsFirestore} from './features/thunks.js'

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const users = useSelector(state => state.users.users)

  const [loading, setLoading] = useState(true)
  const [userLogged, setUserLogged] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUserLogged(user)
      setLoading(false)
      if (user) {
        dispatch(fetchUsersFirestore())
        dispatch(fetchPostsFirestore())
        navigate('/', {replace: true})
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if ((userLogged !== null) && (users.length !== 0)) {
      dispatch(addIdCurrentUser(userLogged.uid))
      dispatch(addNewUserToFirebase({name: userLogged.displayName, id: userLogged.uid}))
    }
  }, [userLogged, dispatch, users.length])


  return (
    <div>
      {loading ? <Loader /> :
        <Routes>
          <Route element={<ProtectedRoute user={userLogged} />}>
            <Route path="/" element={<Main />} >
              <Route path="/" element={<Feed />} />
              <Route path="/user/:id" element={<Profile />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>

      }
    </div>
  );
}

export default App;
