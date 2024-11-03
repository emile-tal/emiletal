import './App.scss'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Header } from './assets/components/Header/Header'
import { HomePage } from './assets/pages/HomePage/HomePage'
import { ProjectsPage } from './assets/pages/ProjectsPage/ProjectsPage'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/projects' element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
