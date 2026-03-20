import { createContext, useContext, useState, useEffect } from "react";

const HabitsContext = createContext();

export function HabitsProvider({ children }) {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  function addHabit(habit) {
    setHabits((prev) => [...prev, { id: Date.now(), ...habit }]);
  }

  function removeHabit(id) {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }

  function toggleHabit(id) {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, done: !h.done } : h))
    );
  }

  return (
    <HabitsContext.Provider value={{ habits, addHabit, removeHabit, toggleHabit }}>
      {children}
    </HabitsContext.Provider>
  );
}

export function useHabits() {
  return useContext(HabitsContext);
}