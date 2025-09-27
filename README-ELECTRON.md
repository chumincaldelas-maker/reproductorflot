# 🎬 Reproductor Flotante - Aplicación de Escritorio

## Descripción
Aplicación de escritorio que reproduce el video `vivo.mp4` en una ventana flotante que se superpone sobre todas las demás aplicaciones, sin mostrar la ventana del navegador.

## Características
- ✅ **Solo Reproductor**: No aparece la ventana del navegador
- ✅ **Flotante**: Se superpone sobre todas las aplicaciones
- ✅ **Siempre Encima**: Permanece visible sobre otras ventanas
- ✅ **Arrastrable**: Se puede mover libremente
- ✅ **Redimensionable**: Se puede cambiar el tamaño
- ✅ **Atajos Globales**: Funcionan desde cualquier aplicación
- ✅ **Video Local**: Reproduce `media/vivo.mp4`

## Instalación

### Windows
1. **Instalar Node.js**: Descarga desde https://nodejs.org
2. **Instalar dependencias**: Ejecuta `instalar.bat`
3. **Ejecutar**: Ejecuta `ejecutar.bat`

### Linux/Mac
1. **Instalar Node.js**: `sudo apt install nodejs npm` (Ubuntu/Debian)
2. **Instalar dependencias**: `./instalar.sh`
3. **Ejecutar**: `./ejecutar.sh`

## Uso

### Iniciar la Aplicación
```bash
# Windows
ejecutar.bat

# Linux/Mac
./ejecutar.sh
```

### Atajos de Teclado Globales
- `Ctrl+Shift+V` - Mostrar/Ocultar reproductor
- `Ctrl+Shift+F` - Pantalla completa
- `Ctrl+Shift+Q` - Cerrar aplicación

### Controles del Reproductor
- **Arrastrar**: Header del reproductor
- **Redimensionar**: Esquinas del reproductor
- **Play/Pause**: Botón ▶ o barra espaciadora
- **Pantalla Completa**: Botón ⛶ o tecla F
- **Minimizar**: Botón − o tecla M
- **Cerrar**: Botón ×

## Estructura de Archivos
```
Reproductor Flotante/
├── media/
│   └── vivo.mp4              ← Archivo de video
├── main.js                   ← Proceso principal de Electron
├── reproductor-electron.html ← Interfaz del reproductor
├── package.json              ← Configuración de la aplicación
├── instalar.bat/.sh          ← Scripts de instalación
├── ejecutar.bat/.sh          ← Scripts de ejecución
└── README-ELECTRON.md        ← Esta documentación
```

## Requisitos del Sistema
- **Node.js**: Versión 16 o superior
- **Sistema Operativo**: Windows 10+, macOS 10.14+, Linux
- **Memoria RAM**: Mínimo 512MB
- **Espacio en Disco**: 100MB para la aplicación + tamaño del video

## Solución de Problemas

### La aplicación no se inicia
1. **Verificar Node.js**: `node --version`
2. **Reinstalar dependencias**: Ejecuta `instalar.bat` nuevamente
3. **Verificar archivo de video**: Asegúrate de que `media/vivo.mp4` existe

### El reproductor no se superpone
1. **Permisos**: Ejecuta como administrador si es necesario
2. **Antivirus**: Verifica que no esté bloqueando la aplicación
3. **Sistema**: Algunos sistemas pueden limitar la superposición

### El video no se reproduce
1. **Formato**: Asegúrate de que `vivo.mp4` es un archivo MP4 válido
2. **Ubicación**: Verifica que esté en la carpeta `media/`
3. **Códecs**: Instala códecs de video si es necesario

## Personalización

### Cambiar el Video
1. **Reemplazar archivo**: Sustituye `media/vivo.mp4` por tu video
2. **Mantener formato**: Asegúrate de que sea MP4
3. **Reiniciar**: Cierra y vuelve a abrir la aplicación

### Cambiar el Tamaño Inicial
Edita `main.js` línea 6-7:
```javascript
width: 500,    // Ancho inicial
height: 350,   // Alto inicial
```

### Cambiar la Posición Inicial
Edita `main.js` línea 8-9:
```javascript
x: 50,         // Posición X
y: 50,         // Posición Y
```

## Desinstalación
1. **Cerrar aplicación**: Usa `Ctrl+Shift+Q`
2. **Eliminar carpeta**: Borra toda la carpeta del proyecto
3. **Opcional**: Desinstalar Node.js si no lo usas para otras cosas

## Notas Técnicas
- **Electron**: Framework para aplicaciones de escritorio con web technologies
- **Sin CORS**: No hay restricciones de seguridad del navegador
- **Rendimiento**: Optimizado para reproducción de video local
- **Memoria**: Usa más memoria que una página web normal

¡Disfruta de tu reproductor flotante! 🎬
