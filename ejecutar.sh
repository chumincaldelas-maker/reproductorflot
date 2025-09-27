#!/bin/bash

echo "========================================"
echo "   REPRODUCTOR FLOTANTE - EJECUTANDO"
echo "========================================"
echo

# Verificar si las dependencias están instaladas
if [ ! -d "node_modules" ]; then
    echo "❌ Error: Las dependencias no están instaladas"
    echo
    echo "💡 Solución: Ejecuta primero ./instalar.sh"
    echo
    exit 1
fi

echo "✅ Dependencias encontradas"
echo "🚀 Iniciando reproductor flotante..."
echo
echo "💡 Atajos de teclado:"
echo "   Ctrl+Shift+V - Mostrar/Ocultar reproductor"
echo "   Ctrl+Shift+F - Pantalla completa"
echo "   Ctrl+Shift+Q - Cerrar aplicación"
echo

# Ejecutar la aplicación
npm start
