import { createContext, useContext, useState } from 'react'

// Cria o contexto
const UserContext = createContext()

// Hook personalizado pra consumir o contexto com segurança
export const useUser = () => useContext(UserContext)

// Provider que envolve a aplicação
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [imageSrc, setImageSrc] = useState(null);

  const login = (name) => {
    setUser({ name })
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        imageSrc,
        setImageSrc
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
