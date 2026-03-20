/* eslint-disable react-refresh/only-export-components */
// src/contexts/HabitsContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'

// 1. Criamos a conexão 
const HabitsContext = createContext(null)

// 2. O Provedor (Componente Principal)
export function HabitsProvider({ children }) {
  const [habits, setHabits] = useState(() => {
    const stored = localStorage.getItem('my-daily-habits')
    if (!stored) return [ /* seus hábitos padrão aqui */ ]
    try { return JSON.parse(stored) } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('my-daily-habits', JSON.stringify(habits))
  }, [habits])

  const adicionarHabit = (novoHabit) => setHabits(prev => [...prev, novoHabit])
  const removerHabit = (id) => setHabits(prev => prev.filter(h => h.id !== id))

  return (
    <HabitsContext.Provider value={{ habits, adicionarHabit, removerHabit }}>
      {children}
    </HabitsContext.Provider>
  )
}

// 3. O Hook (A função que os outros componentes chamam)
export function useHabits() {
  const context = useContext(HabitsContext)
  
  // Segurança: avisa se você esqueceu de colocar o Provider no App.jsx
  if (!context) {
    throw new Error('useHabits deve ser usado dentro de um HabitsProvider')
  }
  
  return context
}