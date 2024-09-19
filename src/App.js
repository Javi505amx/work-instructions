import React, { useState } from 'react';
import axios from 'axios';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const App = () => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [workorder, setWorkorder] = useState('');
    const [error, setError] = useState('');
    const [isPdfLoaded, setIsPdfLoaded] = useState(false); // Nuevo estado
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    // Función para buscar el PDF
    const handleSearch = async () => {
        try {
            console.log('Buscando Workorder:', workorder);
            const response = await axios.get(`http://localhost:5000/api/get-pdf/${workorder}`, {
                responseType: 'blob', // Esto asegura que axios trate la respuesta como un archivo
            });

            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);

            // Asigna la URL del archivo PDF
            setPdfUrl(fileURL);
            setError('');
            setIsPdfLoaded(true); // Cambia el estado a true cuando se carga el PDF
        } catch (err) {
            console.error('Error en la búsqueda:', err);
            setError('Archivo no encontrado. Verifica la Workorder.');
            setPdfUrl(null);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <div className={`p-4 ${isPdfLoaded ? 'hidden' : 'block'}`}>
                <input
                    type="text"
                    value={workorder}
                    onChange={(e) => setWorkorder(e.target.value)}
                    placeholder="Ingrese Workorder"
                    className="border rounded p-2 mr-2"
                    disabled={isPdfLoaded} // Deshabilitar si el PDF está cargado
                />
                <button 
                    onClick={handleSearch} 
                    className="bg-blue-500 text-white rounded p-2" 
                    disabled={isPdfLoaded}
                >
                    Buscar PDF
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </div>
            {pdfUrl && (
                <div className="flex-1 overflow-auto p-4">
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
                    </Worker>
                </div>
            )}
        </div>
    );
}

export default App;
