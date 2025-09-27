# 📦 Instalación de Node.js

## ¿Por qué necesitas Node.js?
Node.js es necesario para ejecutar la aplicación Electron que crea el reproductor flotante sin ventana del navegador.

## Opción 1: Instalación Automática (Recomendada)

### Windows
1. **Descargar**: Ve a https://nodejs.org
2. **Descargar LTS**: Haz clic en "Download for Windows"
3. **Ejecutar**: Ejecuta el archivo `.msi` descargado
4. **Seguir instrucciones**: Sigue el asistente de instalación
5. **Reiniciar terminal**: Cierra y abre una nueva terminal
6. **Verificar**: Ejecuta `node --version` para confirmar

### Linux (Ubuntu/Debian)
```bash
# Actualizar repositorios
sudo apt update

# Instalar Node.js
sudo apt install nodejs npm

# Verificar instalación
node --version
npm --version
```

### macOS
```bash
# Con Homebrew
brew install node

# O descargar desde https://nodejs.org
```

## Opción 2: Alternativa Sin Node.js

Si no quieres instalar Node.js, puedes usar la versión de modo kiosco:

### Windows
```bash
# Ejecutar en modo kiosco (sin ventana del navegador)
ejecutar-kiosco.bat
```

### Linux/Mac
```bash
# Ejecutar en modo kiosco
./ejecutar-kiosco.sh
```

## Verificar Instalación

### Comprobar Node.js
```bash
node --version
# Debe mostrar algo como: v18.17.0
```

### Comprobar npm
```bash
npm --version
# Debe mostrar algo como: 9.6.7
```

## Solución de Problemas

### "Node.js no está instalado"
1. **Reiniciar terminal**: Cierra y abre una nueva terminal
2. **Verificar PATH**: Asegúrate de que Node.js esté en el PATH del sistema
3. **Reinstalar**: Desinstala y vuelve a instalar Node.js

### "npm no se reconoce"
1. **Reinstalar Node.js**: Asegúrate de instalar la versión completa
2. **Verificar PATH**: npm debe estar en el mismo directorio que node

### Error de permisos (Linux/Mac)
```bash
# Dar permisos de ejecución
chmod +x ejecutar-kiosco.sh
chmod +x instalar.sh
```

## Comparación de Opciones

| Característica | Con Node.js (Electron) | Sin Node.js (Kiosco) |
|----------------|------------------------|----------------------|
| **Ventana del navegador** | ❌ No aparece | ⚠️ Aparece pero oculta |
| **Siempre encima** | ✅ Real | ⚠️ Depende del navegador |
| **Atajos globales** | ✅ Funcionan | ❌ Solo en la ventana |
| **Instalación** | ⚠️ Requiere Node.js | ✅ Solo archivos |
| **Rendimiento** | ✅ Optimizado | ⚠️ Depende del navegador |
| **Compatibilidad** | ✅ Multiplataforma | ✅ Multiplataforma |

## Recomendación

**Para mejor experiencia**: Instala Node.js y usa la versión Electron
**Para simplicidad**: Usa la versión de modo kiosco

¡Elige la opción que mejor se adapte a tus necesidades!
