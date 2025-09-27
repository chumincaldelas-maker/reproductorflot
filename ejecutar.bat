@echo off
echo ========================================
echo    REPRODUCTOR FLOTANTE - EJECUTANDO
echo ========================================
echo.

REM Verificar si las dependencias están instaladas
if not exist "node_modules" (
    echo ❌ Error: Las dependencias no están instaladas
    echo.
    echo 💡 Solución: Ejecuta primero instalar.bat
    echo.
    pause
    exit /b 1
)

echo ✅ Dependencias encontradas
echo 🚀 Iniciando reproductor flotante...
echo.
echo 💡 Atajos de teclado:
echo    Ctrl+Shift+V - Mostrar/Ocultar reproductor
echo    Ctrl+Shift+F - Pantalla completa
echo    Ctrl+Shift+Q - Cerrar aplicación
echo.

REM Ejecutar la aplicación
npm start

pause
