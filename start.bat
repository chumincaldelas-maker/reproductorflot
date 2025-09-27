@echo off
echo ========================================
echo    REPRODUCTOR FLOTANTE - INICIADOR
echo ========================================
echo.

REM Verificar si Python está instalado
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: Python no está instalado o no está en el PATH
    echo.
    echo 💡 Soluciones:
    echo    1. Instala Python desde https://python.org
    echo    2. O usa el método alternativo: abrir index.html directamente
    echo.
    echo 🔄 Intentando abrir index.html directamente...
    start index.html
    pause
    exit /b 1
)

echo ✅ Python encontrado
echo 🚀 Iniciando servidor local...
echo.

REM Iniciar el servidor Python
python server.py

pause
