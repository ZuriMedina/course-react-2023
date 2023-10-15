# React + TypeScript + redux Tollkit + Tremor Components

## Configurar Proyecto

### Tremor
- `npm install @tremor/react -E`
- `npm install -D tailwindcss postcss autprefixer`
- `npx tailwindcss init -p`
- Modificar archivo **tailwind.config.js**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',

    // path tremor node_modules
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```
- Añadir directivas Tailwind
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Redux Toolkit
- `npm install @reduxjs/toolkit react-redux -E`
