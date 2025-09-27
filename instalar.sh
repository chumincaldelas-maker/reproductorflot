#!/bin/bash

echo "========================================"
echo "   INSTALADOR REPRODUCTOR FLOTANTE"
echo "========================================"
echo

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado"
    echo
    echo "💡 Soluciones:"
    echo "   1. Instala Node.js desde https://nodejs.org"
    echo "   2. O usa tu gestor de paquetes:"
    echo "      - Ubuntu/Debian: sudo apt install nodejs npm"
    echo "      - macOS: brew install node"
    echo "      - Arch: sudo pacman -S nodejs npm"
    echo
    exit 1
fi

echo "✅ Node.js encontrado"
echo "📦 Instalando dependencias..."

# Instalar dependencias
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error al instalar dependencias"
    exit 1
fi

echo "✅ Dependencias instaladas correctamente"
echo
echo "🚀 Para ejecutar el reproductor, usa: ./ejecutar.sh"
echo

# Hacer el script ejecutable
chmod +x ejecutar.sh
