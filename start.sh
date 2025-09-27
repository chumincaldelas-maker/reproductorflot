#!/bin/bash

echo "========================================"
echo "   REPRODUCTOR FLOTANTE - INICIADOR"
echo "========================================"
echo

# Verificar si Python está instalado
if ! command -v python3 &> /dev/null; then
    if ! command -v python &> /dev/null; then
        echo "❌ Error: Python no está instalado"
        echo
        echo "💡 Soluciones:"
        echo "   1. Instala Python desde https://python.org"
        echo "   2. O usa el método alternativo: abrir index.html directamente"
        echo
        echo "🔄 Intentando abrir index.html directamente..."
        if command -v xdg-open &> /dev/null; then
            xdg-open index.html
        elif command -v open &> /dev/null; then
            open index.html
        else
            echo "No se pudo abrir el navegador automáticamente"
        fi
        exit 1
    else
        PYTHON_CMD="python"
    fi
else
    PYTHON_CMD="python3"
fi

echo "✅ Python encontrado"
echo "🚀 Iniciando servidor local..."
echo

# Hacer el script ejecutable
chmod +x "$0"

# Iniciar el servidor Python
$PYTHON_CMD server.py
