import './App.css'
import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFact'

export function App() {
  //Controla el estadod e un elemento
  const { fact, refreshRandomFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })

  const handleClick = async () => {
    refreshRandomFact()
  }

  return (
    <main>
      <h1>App de Gatitos</h1>
      <button onClick={handleClick}>Get New Fact</button>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && <img
          src={imageUrl}
          alt={`Image extracted using the first three words for ${fact}`} />
        }
      </section>
    </main>
  )
}