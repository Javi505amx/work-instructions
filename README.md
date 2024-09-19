# Work instruction viewer - REACT dev

Una aplicación React que permite buscar y visualizar archivos PDF basados en un número de Workorder. Utiliza `pdfjs-dist` para renderizar los PDFs y Axios para realizar solicitudes a una API.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Características

- Búsqueda de archivos PDF mediante un número de Workorder.
- Visualización de archivos PDF en el navegador.
- Opción para buscar otra Workorder después de cargar un PDF.
- Manejo de errores para entradas no válidas.

## Tecnologías Utilizadas

- [React](https://reactjs.org/) - Biblioteca de JavaScript para construir interfaces de usuario.
- [pdfjs-dist](https://github.com/mozilla/pdf.js) - Biblioteca para renderizar PDFs en el navegador.
- [Axios](https://axios-http.com/) - Cliente HTTP para realizar solicitudes a la API.
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS para estilos.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu_usuario/pdf-viewer-app.git
   cd pdf-viewer-app
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Asegúrate de que tu servidor API esté en funcionamiento y accesible.

## Uso

1. Inicia la aplicación:

   ```bash
   npm start
   ```

2. Abre tu navegador y ve a `http://localhost:3000`.

3. Ingresa un número de Workorder en el campo de búsqueda y haz clic en "Buscar PDF".

4. Si el PDF se encuentra, se mostrará en la aplicación. Puedes hacer clic en "Buscar otra Workorder" para volver a la búsqueda.

## Estructura del Proyecto

```
pdf-viewer-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   └── App.js
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
└── README.md
```

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commit (`git commit -m 'Agrega nueva característica'`).
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
