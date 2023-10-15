import { createRoot } from 'react-dom/client';
import { App } from './src/App';

//Aquí dices que se renderice la aplicación en el elmento del index.js con ide= 'app'
const root = createRoot(document.getElementById('app'));
root.render(<App />);
