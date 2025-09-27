#!/bin/bash

echo "========================================"
echo "   REPRODUCTOR FLOTANTE - MODO KIOSCO"
echo "========================================"
echo

# Verificar que existe el archivo de video
if [ ! -f "media/vivo.mp4" ]; then
    echo "❌ Error: No se encontró el archivo media/vivo.mp4"
    echo
    echo "💡 Solución: Asegúrate de que el archivo de video esté en la carpeta media"
    echo
    exit 1
fi

echo "✅ Archivo de video encontrado"
echo "🚀 Iniciando reproductor en modo kiosco..."
echo
echo "💡 Instrucciones:"
echo "   F11 - Pantalla completa del navegador"
echo "   F - Pantalla completa del video"
echo "   M - Minimizar reproductor"
echo "   ESC - Salir"
echo

# Obtener la ruta absoluta del archivo
FILE_PATH="file://$(pwd)/reproductor-kiosco.html"

echo "🔍 Buscando navegador disponible..."

# Intentar con Chrome/Chromium
if command -v google-chrome &> /dev/null; then
    echo "✅ Chrome encontrado"
    google-chrome --kiosk --app="$FILE_PATH" &
    exit 0
elif command -v chromium-browser &> /dev/null; then
    echo "✅ Chromium encontrado"
    chromium-browser --kiosk --app="$FILE_PATH" &
    exit 0
fi

# Intentar con Firefox
if command -v firefox &> /dev/null; then
    echo "✅ Firefox encontrado"
    firefox --kiosk "$FILE_PATH" &
    exit 0
fi

# Intentar con Edge (Linux)
if command -v microsoft-edge &> /dev/null; then
    echo "✅ Edge encontrado"
    microsoft-edge --kiosk --app="$FILE_PATH" &
    exit 0
fi

# Fallback: abrir con el navegador por defecto
echo "⚠️  Navegador específico no encontrado, usando navegador por defecto"
echo "💡 Para mejor experiencia, instala Chrome, Chromium o Firefox"
echo

# Detectar el sistema operativo
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open "reproductor-kiosco.html"
else
    # Linux
    xdg-open "reproductor-kiosco.html"
fi

echo
echo "✅ Reproductor iniciado"
echo "💡 Presiona F11 para pantalla completa completa"
echo
