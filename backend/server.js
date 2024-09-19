const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());

// Configuración de la conexión a SQL Server
require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    enableArithAbort: true,
    trustServerCertificate: true,
  }
};

// Carpeta donde se almacenan los PDFs
const pdfDirectory = path.join(__dirname, 'pdfs');

// Conexión a la base de datos
sql.connect(dbConfig).then(pool => {
  console.log('Conectado a la base de datos SQL Server');
}).catch(err => {
  console.log('Error conectando a SQL Server:', err);
});

// Ruta para obtener el PDF basado en la workorder
app.get('/api/get-pdf/:workorder', async (req, res) => {
  const { workorder } = req.params;
  console.log('Workorder recibida:', workorder);

  const query = 'SELECT pdf_url FROM workorder_pdfs WHERE workorder = @workorder';
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('workorder', sql.VarChar, workorder)
      .query(query);

    console.log('Resultado de la consulta:', result.recordset);  // Verificar los datos devueltos

    if (result.recordset.length > 0) {
      const pdfUrl = result.recordset[0].pdf_url;

      // Construir la ruta absoluta del PDF sin duplicar 'pdfs'
      const fullPdfPath = path.resolve(pdfDirectory, pdfUrl);

      console.log('Ruta completa del PDF:', fullPdfPath);  // Log para verificar la ruta del archivo

      // Verificamos si el archivo existe
      if (fs.existsSync(fullPdfPath)) {
        console.log('Enviando el archivo PDF...');

        res.setHeader('Content-Type', 'application/pdf');
        res.sendFile(fullPdfPath, (err) => {
          if (err) {
            console.error('Error al enviar el archivo:', err);
            res.status(500).json({ message: 'Error al enviar el archivo PDF' });
          }
        });
      } else {
        console.error('Archivo PDF no encontrado:', fullPdfPath);  // Log para saber si el archivo no existe
        res.status(404).json({ message: 'Archivo PDF no encontrado' });
      }
    } else {
      console.error('PDF no encontrado en la base de datos para Workorder:', workorder);
      res.status(404).json({ message: 'PDF no encontrado en la base de datos' });
    }
  } catch (err) {
    console.error('Error en la consulta de la base de datos:', err);  // Log para capturar errores de SQL
    res.status(500).json({ message: 'Error en la consulta de la base de datos' });
  }
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
