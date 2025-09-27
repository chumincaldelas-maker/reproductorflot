class FloatingVideoPlayer {
    constructor() {
        this.player = document.getElementById('floating-player');
        this.video = document.getElementById('video-player');
        this.settingsPanel = document.getElementById('settings-panel');
        this.isDragging = false;
        this.isResizing = false;
        this.dragOffset = { x: 0, y: 0 };
        this.resizeData = { handle: null, startX: 0, startY: 0, startWidth: 0, startHeight: 0 };
        this.isMinimized = false;
        this.isFullscreen = false;
        
        this.init();
    }
    
    init() {
        this.loadVideoFromFile();
        this.setupEventListeners();
        this.setupDragAndDrop();
        this.setupResizeHandles();
        this.setupVideoControls();
        this.setupSettings();
        this.makeAlwaysOnTop();
    }
    
    async loadVideoFromFile() {
        // Cargar video local vivo.mp4
        const videoUrl = 'media/vivo.mp4';
        
        console.log('Cargando video local:', videoUrl);
        
        // Cargar el video directamente
        this.video.src = videoUrl;
        document.getElementById('video-url').value = videoUrl;
        
        // Configurar eventos para verificar si el video se carga correctamente
        this.video.addEventListener('loadedmetadata', () => {
            console.log('✅ Video local cargado exitosamente: vivo.mp4');
        }, { once: true });
        
        this.video.addEventListener('error', (e) => {
            console.warn('❌ Error al cargar video local, intentando URLs de respaldo...');
            this.loadFallbackVideos();
        }, { once: true });
    }
    
    loadFallbackVideos() {
        // URLs de respaldo en caso de que el video principal no funcione
        const fallbackUrls = [
            'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
            'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4'
        ];
        
        this.loadVideoWithFallback(fallbackUrls, 0);
    }
    
    loadVideoWithFallback(urls, index) {
        if (index >= urls.length) {
            console.error('No se pudo cargar ningún video de las URLs de respaldo');
            this.showErrorMessage('No se pudo cargar ningún video. Por favor, proporciona una URL válida en la configuración.');
            return;
        }
        
        const url = urls[index];
        console.log(`Intentando cargar video ${index + 1}/${urls.length}:`, url);
        
        this.video.src = url;
        document.getElementById('video-url').value = url;
        
        // Verificar si el video se puede cargar
        this.video.addEventListener('error', () => {
            console.warn(`Error al cargar video ${index + 1}, intentando siguiente...`);
            this.loadVideoWithFallback(urls, index + 1);
        }, { once: true });
        
        this.video.addEventListener('loadedmetadata', () => {
            console.log(`Video cargado exitosamente:`, url);
        }, { once: true });
    }
    
    showErrorMessage(message) {
        // Crear un mensaje de error temporal
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 0, 0, 0.9);
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 10000;
            text-align: center;
            max-width: 400px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        `;
        errorDiv.innerHTML = `
            <h3>⚠️ Error de Video</h3>
            <p>${message}</p>
            <button onclick="this.parentElement.remove()" style="
                background: white;
                color: red;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 10px;
            ">Cerrar</button>
        `;
        document.body.appendChild(errorDiv);
        
        // Auto-remover después de 10 segundos
        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.remove();
            }
        }, 10000);
    }
    
    setupEventListeners() {
        // Botones de control del header
        document.getElementById('minimize-btn').addEventListener('click', () => this.toggleMinimize());
        document.getElementById('close-btn').addEventListener('click', () => this.closePlayer());
        
        // Botones de control del video
        document.getElementById('play-pause-btn').addEventListener('click', () => this.togglePlayPause());
        document.getElementById('fullscreen-btn').addEventListener('click', () => this.toggleFullscreen());
        document.getElementById('settings-btn').addEventListener('click', () => this.toggleSettings());
        
        // Eventos del video
        this.video.addEventListener('loadedmetadata', () => this.updateDuration());
        this.video.addEventListener('timeupdate', () => this.updateProgress());
        this.video.addEventListener('play', () => this.updatePlayButton());
        this.video.addEventListener('pause', () => this.updatePlayButton());
        this.video.addEventListener('ended', () => this.updatePlayButton());
        
        // Barra de progreso
        document.querySelector('.progress-container').addEventListener('click', (e) => this.seekTo(e));
        
        // Teclas de acceso rápido
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Prevenir que el reproductor se cierre accidentalmente
        this.player.addEventListener('click', (e) => e.stopPropagation());
    }
    
    setupDragAndDrop() {
        const header = document.querySelector('.player-header');
        
        header.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('control-btn')) return;
            
            this.isDragging = true;
            this.dragOffset.x = e.clientX - this.player.offsetLeft;
            this.dragOffset.y = e.clientY - this.player.offsetTop;
            
            document.addEventListener('mousemove', this.handleDrag.bind(this));
            document.addEventListener('mouseup', this.stopDrag.bind(this));
            
            e.preventDefault();
        });
    }
    
    handleDrag(e) {
        if (!this.isDragging) return;
        
        const newX = e.clientX - this.dragOffset.x;
        const newY = e.clientY - this.dragOffset.y;
        
        // Mantener el reproductor dentro de los límites de la pantalla
        const maxX = window.innerWidth - this.player.offsetWidth;
        const maxY = window.innerHeight - this.player.offsetHeight;
        
        this.player.style.left = Math.max(0, Math.min(newX, maxX)) + 'px';
        this.player.style.top = Math.max(0, Math.min(newY, maxY)) + 'px';
    }
    
    stopDrag() {
        this.isDragging = false;
        document.removeEventListener('mousemove', this.handleDrag.bind(this));
        document.removeEventListener('mouseup', this.stopDrag.bind(this));
    }
    
    setupResizeHandles() {
        const handles = document.querySelectorAll('.resize-handle');
        
        handles.forEach(handle => {
            handle.addEventListener('mousedown', (e) => {
                this.isResizing = true;
                this.resizeData.handle = handle.className.split(' ')[1];
                this.resizeData.startX = e.clientX;
                this.resizeData.startY = e.clientY;
                this.resizeData.startWidth = this.player.offsetWidth;
                this.resizeData.startHeight = this.player.offsetHeight;
                
                document.addEventListener('mousemove', this.handleResize.bind(this));
                document.addEventListener('mouseup', this.stopResize.bind(this));
                
                e.preventDefault();
            });
        });
    }
    
    handleResize(e) {
        if (!this.isResizing) return;
        
        const deltaX = e.clientX - this.resizeData.startX;
        const deltaY = e.clientY - this.resizeData.startY;
        
        let newWidth = this.resizeData.startWidth;
        let newHeight = this.resizeData.startHeight;
        
        switch (this.resizeData.handle) {
            case 'resize-se':
                newWidth += deltaX;
                newHeight += deltaY;
                break;
            case 'resize-sw':
                newWidth -= deltaX;
                newHeight += deltaY;
                this.player.style.left = (this.player.offsetLeft + deltaX) + 'px';
                break;
            case 'resize-ne':
                newWidth += deltaX;
                newHeight -= deltaY;
                this.player.style.top = (this.player.offsetTop + deltaY) + 'px';
                break;
            case 'resize-nw':
                newWidth -= deltaX;
                newHeight -= deltaY;
                this.player.style.left = (this.player.offsetLeft + deltaX) + 'px';
                this.player.style.top = (this.player.offsetTop + deltaY) + 'px';
                break;
        }
        
        // Tamaños mínimos y máximos
        newWidth = Math.max(200, Math.min(newWidth, window.innerWidth));
        newHeight = Math.max(150, Math.min(newHeight, window.innerHeight));
        
        this.player.style.width = newWidth + 'px';
        this.player.style.height = newHeight + 'px';
    }
    
    stopResize() {
        this.isResizing = false;
        document.removeEventListener('mousemove', this.handleResize.bind(this));
        document.removeEventListener('mouseup', this.stopResize.bind(this));
    }
    
    setupVideoControls() {
        // Los controles del video se manejan a través de los event listeners ya configurados
    }
    
    setupSettings() {
        // Cargar video
        document.getElementById('load-video-btn').addEventListener('click', () => {
            const url = document.getElementById('video-url').value;
            if (url) {
                this.video.src = url;
                this.video.load();
            }
        });
        
        // Control de opacidad
        const opacitySlider = document.getElementById('opacity-slider');
        const opacityValue = document.getElementById('opacity-value');
        
        opacitySlider.addEventListener('input', (e) => {
            const opacity = e.target.value;
            this.player.style.opacity = opacity;
            opacityValue.textContent = Math.round(opacity * 100) + '%';
        });
        
        // Siempre encima
        document.getElementById('always-on-top').addEventListener('change', (e) => {
            if (e.target.checked) {
                this.makeAlwaysOnTop();
            } else {
                this.player.style.zIndex = '9999';
            }
        });
        
        // Auto-play
        document.getElementById('auto-play').addEventListener('change', (e) => {
            this.video.autoplay = e.target.checked;
        });
        
        // Modo móvil
        document.getElementById('mobile-mode').addEventListener('change', (e) => {
            if (window.pwaHandler) {
                window.pwaHandler.applyMobileMode(e.target.checked);
            }
        });
    }
    
    makeAlwaysOnTop() {
        // Intentar usar la API de Always On Top si está disponible
        if (window.electron && window.electron.setAlwaysOnTop) {
            window.electron.setAlwaysOnTop(true);
        } else {
            // Fallback: usar z-index muy alto
            this.player.style.zIndex = '2147483647';
        }
    }
    
    toggleMinimize() {
        this.isMinimized = !this.isMinimized;
        this.player.classList.toggle('minimized', this.isMinimized);
        
        const btn = document.getElementById('minimize-btn');
        btn.textContent = this.isMinimized ? '□' : '−';
    }
    
    closePlayer() {
        if (confirm('¿Estás seguro de que quieres cerrar el reproductor?')) {
            this.player.style.display = 'none';
        }
    }
    
    togglePlayPause() {
        if (this.video.paused) {
            this.video.play();
        } else {
            this.video.pause();
        }
    }
    
    toggleFullscreen() {
        this.isFullscreen = !this.isFullscreen;
        this.player.classList.toggle('fullscreen', this.isFullscreen);
        
        if (this.isFullscreen) {
            this.player.style.top = '0';
            this.player.style.left = '0';
            this.player.style.width = '100vw';
            this.player.style.height = '100vh';
        } else {
            this.player.style.top = '50px';
            this.player.style.left = '50px';
            this.player.style.width = '400px';
            this.player.style.height = '300px';
        }
    }
    
    toggleSettings() {
        this.settingsPanel.style.display = this.settingsPanel.style.display === 'none' ? 'block' : 'none';
    }
    
    updateDuration() {
        const duration = this.video.duration;
        document.getElementById('duration').textContent = this.formatTime(duration);
    }
    
    updateProgress() {
        const progress = (this.video.currentTime / this.video.duration) * 100;
        document.getElementById('progress').style.width = progress + '%';
        document.getElementById('current-time').textContent = this.formatTime(this.video.currentTime);
    }
    
    updatePlayButton() {
        const btn = document.getElementById('play-pause-btn');
        btn.textContent = this.video.paused ? '▶' : '⏸';
    }
    
    seekTo(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        this.video.currentTime = pos * this.video.duration;
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    handleKeyboard(e) {
        switch (e.key) {
            case ' ':
                e.preventDefault();
                this.togglePlayPause();
                break;
            case 'f':
            case 'F':
                this.toggleFullscreen();
                break;
            case 'm':
            case 'M':
                this.toggleMinimize();
                break;
            case 's':
            case 'S':
                this.toggleSettings();
                break;
            case 'Escape':
                if (this.isFullscreen) {
                    this.toggleFullscreen();
                } else if (this.settingsPanel.style.display === 'block') {
                    this.toggleSettings();
                }
                break;
        }
    }
}

// Inicializar el reproductor cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new FloatingVideoPlayer();
});

// Prevenir el menú contextual por defecto
document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.floating-player')) {
        e.preventDefault();
    }
});

// Prevenir la selección de texto
document.addEventListener('selectstart', (e) => {
    if (e.target.closest('.floating-player')) {
        e.preventDefault();
    }
});
