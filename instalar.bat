@echo off
echo ========================================
echo    INSTALADOR REPRODUCTOR FLOTANTE
echo ========================================
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: Node.js no está instalado
    echo.
    echo 💡 Soluciones:
    echo    1. Instala Node.js desde https://nodejs.org
    echo    2. Reinicia la terminal después de la instalación
    echo    3. Ejecuta este script nuevamente
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js encontrado
echo 📦 Instalando dependencias...

REM Instalar dependencias
npm install

if %errorlevel% neq 0 (
    echo ❌ Error al instalar dependencias
    pause
    exit /b 1
)

echo ✅ Dependencias instaladas correctamente
echo.
echo 🚀 Para ejecutar el reproductor, usa: ejecutar.bat
echo.

pause
