# 🚀 Guía de Despliegue en GitHub Pages

## Paso 1: Preparar el Repositorio

### 1.1 Crear Repositorio en GitHub
1. Ve a [GitHub](https://github.com)
2. Haz clic en "New repository"
3. Nombre: `reproductor-flotante`
4. Descripción: "Reproductor de video flotante PWA"
5. Marca como "Public"
6. No inicialices con README (ya tenemos archivos)

### 1.2 Subir Archivos
```bash
# Inicializar git (si no está inicializado)
git init

# Agregar archivos
git add .

# Commit inicial
git commit -m "Initial commit: Reproductor Flotante PWA"

# Agregar repositorio remoto (reemplaza tu-usuario)
git remote add origin https://github.com/tu-usuario/reproductor-flotante.git

# Subir archivos
git push -u origin main
```

## Paso 2: Configurar GitHub Pages

### 2.1 Habilitar GitHub Pages
1. Ve a tu repositorio en GitHub
2. Haz clic en "Settings"
3. Scroll hacia abajo hasta "Pages"
4. En "Source", selecciona "Deploy from a branch"
5. En "Branch", selecciona "main"
6. En "Folder", selecciona "/ (root)"
7. Haz clic en "Save"

### 2.2 Verificar Despliegue
- GitHub Pages tardará unos minutos en desplegar
- Ve a `https://tu-usuario.github.io/reproductor-flotante`
- Deberías ver el reproductor funcionando

## Paso 3: Personalizar URLs

### 3.1 Actualizar URLs en Archivos
Busca y reemplaza `tu-usuario` por tu nombre de usuario real en:

**index.html:**
```html
<meta property="og:url" content="https://TU-USUARIO.github.io/reproductor-flotante/">
<meta property="twitter:url" content="https://TU-USUARIO.github.io/reproductor-flotante/">
```

**sitemap.xml:**
```xml
<loc>https://TU-USUARIO.github.io/reproductor-flotante/</loc>
```

**README-GITHUB.md:**
```markdown
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://TU-USUARIO.github.io/reproductor-flotante)
```

### 3.2 Dominio Personalizado (Opcional)
Si tienes un dominio personalizado:
1. Crea un archivo `CNAME` con tu dominio
2. Configura DNS para apuntar a GitHub Pages
3. Habilita HTTPS en GitHub Pages

## Paso 4: Configurar PWA

### 4.1 Verificar Manifest
- El archivo `manifest.json` ya está configurado
- GitHub Pages lo servirá automáticamente
- Los iconos deben estar en la carpeta `assets/`

### 4.2 Crear Iconos (Opcional)
Si quieres iconos personalizados:
1. Crea iconos en tamaños: 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512
2. Guárdalos en `assets/icon-TAMAÑO.png`
3. Actualiza `manifest.json` si es necesario

## Paso 5: Optimizar para Móviles

### 5.1 Verificar Responsive
- Abre la URL en un dispositivo móvil
- Verifica que se vea correctamente
- Prueba la instalación como PWA

### 5.2 Testing
- **Chrome DevTools**: Simula dispositivos móviles
- **Dispositivo Real**: Prueba en Android/iOS
- **PWA Audit**: Usa Lighthouse para verificar PWA

## Paso 6: Configurar Video

### 6.1 Subir Video
1. Coloca tu archivo de video en `media/vivo.mp4`
2. Asegúrate de que sea un archivo MP4 compatible
3. El tamaño recomendado es menor a 100MB

### 6.2 Video Optimizado
- **Formato**: MP4 con H.264
- **Resolución**: 720p o 1080p
- **Duración**: Recomendado menos de 10 minutos
- **Tamaño**: Menos de 50MB para mejor rendimiento

## Paso 7: Monitoreo y Mantenimiento

### 7.1 GitHub Actions
- El archivo `.github/workflows/deploy.yml` está configurado
- Se ejecutará automáticamente en cada push
- Verifica que el despliegue sea exitoso

### 7.2 Analytics (Opcional)
Agrega Google Analytics en `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Solución de Problemas

### Error 404
- Verifica que el archivo `index.html` esté en la raíz
- Asegúrate de que GitHub Pages esté habilitado
- Espera unos minutos para que se propague

### PWA no se instala
- Verifica que `manifest.json` sea válido
- Asegúrate de que los iconos existan
- Usa HTTPS (GitHub Pages lo proporciona automáticamente)

### Video no se reproduce
- Verifica que el archivo esté en `media/vivo.mp4`
- Asegúrate de que sea un MP4 compatible
- Verifica que el archivo no sea demasiado grande

### Problemas de CORS
- GitHub Pages sirve archivos con CORS habilitado
- No debería haber problemas de CORS
- Si los hay, verifica la configuración del navegador

## URLs Finales

Una vez desplegado, tendrás:
- **Sitio Web**: `https://tu-usuario.github.io/reproductor-flotante`
- **PWA**: Instalable desde el navegador
- **Móvil**: Optimizado para Android/iOS
- **PC**: Funciona en Windows/macOS/Linux

¡Tu reproductor flotante estará disponible en todo el mundo! 🌍
