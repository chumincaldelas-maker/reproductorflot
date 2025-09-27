# 🎬 Reproductor Flotante - Video Vivo

## Archivo de Video Local
El reproductor está configurado para reproducir el archivo **`vivo.mp4`** que se encuentra en la carpeta **`media/`**.

## Estructura de Archivos
```
Reproductor Flotante/
├── media/
│   └── vivo.mp4          ← Archivo de video local
├── reproductor-simple.html  ← Reproductor todo-en-uno (RECOMENDADO)
├── index.html            ← Reproductor principal
├── script.js             ← Funcionalidad JavaScript
├── styles.css            ← Estilos del reproductor
└── enlaces/
    └── enlace.txt        ← Contiene: media/vivo.mp4
```

## Cómo Usar

### Opción 1: Reproductor Simplificado (Recomendado)
1. **Abrir**: Haz doble clic en `reproductor-simple.html`
2. **El video se carga automáticamente** desde `media/vivo.mp4`
3. **¡Listo!** El reproductor flotante está funcionando

### Opción 2: Reproductor Principal
1. **Abrir**: Haz doble clic en `index.html`
2. **El video se carga automáticamente** desde `media/vivo.mp4`
3. **Panel de configuración** disponible con botón ⚙

## Características del Reproductor

### 🎮 Controles
- **Arrastrar**: Mueve el reproductor arrastrando el header
- **Redimensionar**: Cambia el tamaño desde las esquinas
- **Play/Pause**: Botón ▶ o barra espaciadora
- **Pantalla Completa**: Botón ⛶ o tecla F
- **Minimizar**: Botón − o tecla M
- **Cerrar**: Botón ×

### ⌨️ Teclas de Acceso Rápido
- `Espacio` - Play/Pause
- `F` - Pantalla completa
- `M` - Minimizar/Restaurar
- `S` - Configuración (solo en index.html)
- `Escape` - Salir de pantalla completa

### 🎯 Funcionalidades Especiales
- **Flotante**: Se mantiene por encima de otras aplicaciones
- **Superponible**: Siempre visible sobre otras ventanas
- **Arrastrable**: Se puede mover libremente por la pantalla
- **Redimensionable**: Se puede cambiar el tamaño dinámicamente
- **Controles Personalizados**: Interfaz limpia y moderna

## Solución de Problemas

### El video no se reproduce
1. **Verifica que existe**: `media/vivo.mp4`
2. **Formato compatible**: Asegúrate de que es un archivo MP4 válido
3. **Navegador**: Usa Chrome, Firefox, Edge o Safari moderno

### El reproductor no se superpone
1. **Z-index**: Algunos navegadores pueden limitar la superposición
2. **Modo pantalla completa**: Usa F para pantalla completa
3. **Extensiones**: Desactiva extensiones que puedan interferir

### Problemas de rendimiento
1. **Tamaño del archivo**: Videos muy grandes pueden causar lentitud
2. **Resolución**: Reduce la resolución del video si es necesario
3. **Otros programas**: Cierra aplicaciones que consuman muchos recursos

## Personalización

### Cambiar el Video
1. **Reemplaza el archivo**: Sustituye `media/vivo.mp4` por tu video
2. **Mantén el nombre**: O cambia la ruta en `enlaces/enlace.txt`
3. **Formato**: Asegúrate de que sea MP4 compatible

### Cambiar la Configuración
- **Opacidad**: Usa el panel de configuración (⚙)
- **Tamaño inicial**: Modifica las dimensiones en el CSS
- **Posición inicial**: Cambia `top` y `left` en el CSS

## Notas Técnicas

- **Archivo Local**: No requiere conexión a internet
- **Sin CORS**: Funciona directamente desde archivos locales
- **Compatible**: Funciona en todos los navegadores modernos
- **Ligero**: Código optimizado para rendimiento

¡Disfruta de tu reproductor flotante con el video vivo.mp4! 🎬
