import { createContext, useContext, useState, useRef, useEffect } from 'react'

// Cria o contexto
const UserContext = createContext()

// Hook personalizado pra consumir o contexto com segurança
export const useUser = () => useContext(UserContext)

// Provider que envolve a aplicação
export const UserProvider = ({ children }) => {
  const [showComponent, setShowComponent] = useState('my')
  const [user, setUser] = useState(null)
  const [imageSrc, setImageSrc] = useState(null); // imagem
  const [countMove, setCountMove] = useState(0) // movimentos

  //################### Relogio
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [grid, setGrid] = useState({ columns: 3, rows: 3 })
  const intervalRef = useRef(null)

  const login = (name) => {
    setUser({ name })
  }

  const logout = () => {
    setUser(null)
  }

  console.log('aaaaabbbbbb', grid)
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1)
      }, 1000)
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isRunning])

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setSeconds(0)
  }

  const formatTime = (s) => {
    const minutes = Math.floor(s / 60)
    const scds = s % 60
    return `${String(minutes).padStart(2, "0")}:${String(scds).padStart(2, "0")}`
  }

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        imageSrc,
        setImageSrc,
        countMove,
        setCountMove,
        time: {
          seconds,
          formatedTime: formatTime(seconds),
          handleStart,
          handlePause,
          handleReset,
        },
        showComponent,
        setShowComponent,
        grid,
        setGrid
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
