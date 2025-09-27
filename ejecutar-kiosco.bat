@echo off
echo ========================================
echo    REPRODUCTOR FLOTANTE - MODO KIOSCO
echo ========================================
echo.

REM Verificar que existe el archivo de video
if not exist "media\vivo.mp4" (
    echo ❌ Error: No se encontró el archivo media\vivo.mp4
    echo.
    echo 💡 Solución: Asegúrate de que el archivo de video esté en la carpeta media
    echo.
    pause
    exit /b 1
)

echo ✅ Archivo de video encontrado
echo 🚀 Iniciando reproductor en modo kiosco...
echo.
echo 💡 Instrucciones:
echo    F11 - Pantalla completa del navegador
echo    F - Pantalla completa del video
echo    M - Minimizar reproductor
echo    ESC - Salir
echo.

REM Intentar abrir con diferentes navegadores en modo kiosco
echo 🔍 Buscando navegador disponible...

REM Intentar con Chrome/Edge (Chromium)
where chrome >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Chrome encontrado
    start chrome --kiosk --app="file:///%CD%\reproductor-kiosco.html"
    goto :success
)

where msedge >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Edge encontrado
    start msedge --kiosk --app="file:///%CD%\reproductor-kiosco.html"
    goto :success
)

REM Intentar con Firefox
where firefox >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Firefox encontrado
    start firefox --kiosk "file:///%CD%\reproductor-kiosco.html"
    goto :success
)

REM Fallback: abrir con el navegador por defecto
echo ⚠️  Navegador específico no encontrado, usando navegador por defecto
echo 💡 Para mejor experiencia, instala Chrome o Edge
echo.
start "" "reproductor-kiosco.html"

:success
echo.
echo ✅ Reproductor iniciado
echo 💡 Presiona F11 para pantalla completa completa
echo.

pause
