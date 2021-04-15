import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { paginate } from '../functions'

const AppContext = React.createContext()

const ContextProvider = ({ children }) => {
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(false)

  // Pagination State
  const [sorted, setSorted] = useState([])

  const loadProblems = async () => {
    setLoading(true)
    const { data } = await Axios.get('/get-all')
    setProblems(data)
    setSorted(paginate(data))
    setLoading(false)
    // console.log(data);
  }

  useEffect(() => {
    console.log('app context run')
    loadProblems()
  }, [])

  return (
    <AppContext.Provider
      value={{
        problems,
        sorted,
        setProblems,
        loadProblems,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { ContextProvider, AppContext }
