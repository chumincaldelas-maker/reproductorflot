# Reproductor de Video Flotante

Un reproductor de video web flotante que se superpone por encima de otras aplicaciones, diseñado para reproducir videos de forma fluida sin interrupciones.

## Características

- **Flotante y Superponible**: Se mantiene por encima de otras ventanas y aplicaciones
- **Arrastrable**: Puede moverse arrastrando el header
- **Redimensionable**: Se puede cambiar el tamaño usando las esquinas
- **Controles Personalizados**: Controles de reproducción integrados
- **Configuración Avanzada**: Panel de configuración con múltiples opciones
- **Teclas de Acceso Rápido**: Atajos de teclado para control rápido
- **Reproducción Fluida**: Optimizado para reproducción sin cortes

## Archivos Incluidos

- `index.html` - Estructura principal del reproductor
- `styles.css` - Estilos y diseño del reproductor flotante
- `script.js` - Funcionalidad JavaScript del reproductor
- `config.js` - Configuración y persistencia de datos
- `enlaces/enlace.txt` - Archivo con la URL del video a reproducir
- `server.py` - Servidor HTTP local para evitar problemas CORS
- `start.bat` - Script de inicio para Windows
- `start.sh` - Script de inicio para Linux/Mac

## Uso

### Método 1: Servidor Local (Recomendado)
1. **Iniciar Servidor**: Ejecuta `start.bat` (Windows) o `start.sh` (Linux/Mac)
2. **Abrir Automáticamente**: El reproductor se abrirá automáticamente en tu navegador
3. **Cargar Video**: El reproductor cargará automáticamente la URL del archivo `enlaces/enlace.txt`

### Método 2: Archivo Directo (Con limitaciones)
1. **Abrir el Reproductor**: Abre `index.html` directamente en tu navegador
2. **Cargar Video**: El reproductor usará una URL de respaldo (puede no cargar desde archivo local)
3. **Controlar Reproducción**: Usa los controles en pantalla o las teclas de acceso rápido

### Nota sobre CORS
Los navegadores modernos bloquean la carga de archivos locales por seguridad (CORS). El servidor local soluciona este problema.

## Controles

### Controles de Ventana
- **Arrastrar**: Haz clic y arrastra el header para mover la ventana
- **Redimensionar**: Usa las esquinas para cambiar el tamaño
- **Minimizar**: Botón `−` para minimizar/restaurar
- **Cerrar**: Botón `×` para cerrar el reproductor

### Controles de Video
- **Play/Pause**: Botón `▶`/`⏸` o barra espaciadora
- **Barra de Progreso**: Haz clic para saltar a una posición
- **Pantalla Completa**: Botón `⛶` o tecla `F`
- **Configuración**: Botón `⚙` o tecla `S`

### Teclas de Acceso Rápido
- `Espacio` - Play/Pause
- `F` - Pantalla completa
- `M` - Minimizar/Restaurar
- `S` - Abrir/cerrar configuración
- `Escape` - Salir de pantalla completa o configuración

## Configuración

El panel de configuración permite ajustar:

- **URL del Video**: Cambiar la fuente del video
- **Opacidad**: Ajustar la transparencia (10% - 100%)
- **Siempre Encima**: Mantener la ventana por encima de otras
- **Reproducción Automática**: Iniciar el video automáticamente

## Personalización

### Cambiar el Video
1. Edita el archivo `enlaces/enlace.txt` con la nueva URL
2. O usa el panel de configuración para cargar una nueva URL

### Ajustar la Configuración
Modifica `config.js` para cambiar:
- Tamaños de ventana por defecto
- Configuración de video
- Teclas de acceso rápido
- Comportamiento de arrastre y redimensionamiento

## Requisitos del Navegador

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Soporte para HTML5 Video
- JavaScript habilitado

## Notas Técnicas

- El reproductor usa `position: fixed` para mantenerse flotante
- Se implementa `z-index` alto para superposición
- Los controles se ocultan automáticamente y aparecen al hacer hover
- La configuración se guarda en `localStorage` del navegador
- Soporte para videos MP4, WebM y otros formatos HTML5

## Solución de Problemas

### El video no se reproduce
- Verifica que la URL en `enlaces/enlace.txt` sea válida
- Asegúrate de que el video sea accesible desde el navegador
- Comprueba que el formato de video sea compatible

### El reproductor no se superpone
- Algunos navegadores pueden limitar la superposición
- Intenta usar el modo de pantalla completa
- Verifica que no haya extensiones que interfieran

### Problemas de rendimiento
- Reduce la opacidad si hay problemas de rendimiento
- Cierra otras pestañas del navegador
- Verifica que el video no sea demasiado pesado

## Licencia

Este proyecto es de código abierto y está disponible para uso personal y educativo.
