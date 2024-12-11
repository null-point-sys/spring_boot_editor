const express = require('express');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');  // Instalarlo con npm install node-fetch
require('dotenv').config();  // Para usar variables de entorno

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());  // Para procesar cuerpos JSON

// Ruta para recibir el código y actualizar el archivo en GitHub
app.post('/save-code', async (req, res) => {
  const { code } = req.body;  // El código Java recibido

  if (!code) {
    return res.status(400).send('No se recibió el código');
  }

  const filePath = 'UserCode.java';  // Ruta del archivo en el repositorio
  const apiUrl = `https://api.github.com/repos/{OWNER}/{REPO}/contents/${filePath}`;

  try {
    // Hacer un PUT a la API de GitHub para crear o actualizar el archivo
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Actualización de UserCode.java desde backend',
        content: Buffer.from(code).toString('base64'),  // Codificar el código en base64
      }),
    });

    const result = await response.json();
    if (response.ok) {
      res.status(200).send('Código guardado con éxito en el repositorio');
    } else {
      res.status(500).send(`Error al guardar el código: ${result.message}`);
    }
  } catch (error) {
    res.status(500).send(`Error en la petición: ${error.message}`);
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Backend corriendo en el puerto ${port}`);
});
