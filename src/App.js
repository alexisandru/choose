import React from 'react'

import Main from './components/Main.js'
import Login from './components/Login.js'
import ErrorPage from './components/ErrorPage.js'
import Feed from './components/Feed.js'
import Profile from './components/Profile.js'
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} >
          <Route path="/" element={<Feed />} />
          <Route path="/user/:id" element={<Profile />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
