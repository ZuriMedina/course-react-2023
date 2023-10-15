import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  //Effect buble following the cursor 
  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    //Cleanup when the component is dismounted
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])
  //[] => just execute when the component is mounted
  //[enabled] => just execute when enabled change and when the component is mounted
  // Without [] or [enabled] is executed each time the component is redered

  //Effect disapear the pointer change body className
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])

  return (
    <main >
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`
      }} />

      <button
        onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </main>
  )
}

export default App
