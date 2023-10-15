# Configurar Vite con Vanilla

## Configurar Proyecto

### Crear Proyecto
- `npm create vite@latest  `
- √ Select a framework: » `Vanilla`
- √ Select a variant: » `JavaScript`

### Instalar dependencias y plugins
- Instalar plugin React, versión exacta(-E) `npm install @vitejs/plugin-react -E`
- Instalar dependencias React `npm install react react-dom -E`

### Configurar archivo Vite
- Crear archivo **vite.config.js** en la raiz del proyecto y hacer todas las importaciones necesarias

### Configurar archivo main.js
- Importar **createRoot** y crear la renderización
- Cambiar archivo **main.js** a **main.jsx**(Extensión React) para que transpile el código ya que no está preparado el plugin de Vite que se ha instalado previamente. 
- Cambiar el nombre también en el `<script>` del **index.js**

### Configurar el eslint
- Instalar eslint como dependencia desarrollo(-D) `npm install standard -D`
- Añadir eslint a **package.json** 
```json
"eslintConfig": {
    "extends": "./node_modules/standard/eslintrc.json"
  }
```

## Crear lógica de la aplicación

### Crear directorios y archivos importantes
- Crear directorio **src** en la raiz.
- Crear archivo **App.jsx** dentro de **src**

### Mostrar contenido de **Apps.jsx** en **main.jsx**
- Hacer el export de App en **App.jsx**
```javascript
export function App(){
  return (
    <h1>App de Gatitos</h1>
  )
}
```
- Impor **App.jsx** en **main.jsx**
- Sustituir correctamente el `root.render(<App />);`

## Enunciado Prueba Técnica
Recupera un hecho aleatorio de gatos de la primera API y muestra una imagen de un gato con la primera palabra del hecho recuperado usando la segunda API.

- APIs:
  - [Fact Random](https://catfact.ninja/fact)
  - [Imagen Random](https://cataas.com/cat/says/hello)

> Lo ideal es separar el enunciado como sifuera un listado de hitos.
1. Recupera un hecho aleatorio de gatos de la primera API ✅ 
2. Recuperar las 3 primeras palabras ✅ 
3. Muestra una imagen de un gato con las primeras 3 palabras ✅ 

## Testing
- npm init playwright@latest
- Seleccionar opción javascript y de resto por defecto
- Se crea automáticamente la carpeta test en la raiz
- Dara error por el uso de require en **playwright.config.js** por lo que hay que cambiar extensión del archivo a **playwright.config.cjs** de common js.
- En el archivo **example.spec.js** se debe cambiar el require al import. En este archivo correremos los test.
- Ejecutar text en consola `npx playwright test` *Importante levantar antes el server* `npm run dev`