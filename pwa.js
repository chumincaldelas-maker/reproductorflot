// PWA (Progressive Web App) functionality
class PWAHandler {
    constructor() {
        this.isInstalled = false;
        this.deferredPrompt = null;
        this.init();
    }

    init() {
        this.registerServiceWorker();
        this.setupInstallPrompt();
        this.setupMobileInstructions();
        this.detectMobile();
    }

    // Registrar Service Worker
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js')
                .then(registration => {
                    console.log('✅ Service Worker registrado:', registration);
                })
                .catch(error => {
                    console.warn('⚠️ Error al registrar Service Worker:', error);
                });
        }
    }

    // Configurar prompt de instalación
    setupInstallPrompt() {
        // Detectar si la app ya está instalada
        if (window.matchMedia('(display-mode: standalone)').matches) {
            this.isInstalled = true;
            console.log('✅ App instalada como PWA');
        }

        // Escuchar evento de instalación
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallButton();
        });

        // Escuchar cuando la app se instala
        window.addEventListener('appinstalled', () => {
            this.isInstalled = true;
            console.log('✅ PWA instalada exitosamente');
            this.hideInstallButton();
        });
    }

    // Mostrar botón de instalación
    showInstallButton() {
        if (this.isInstalled) return;

        const installButton = document.createElement('button');
        installButton.id = 'install-button';
        installButton.className = 'install-button';
        installButton.innerHTML = '📱 Instalar App';
        installButton.onclick = () => this.installApp();

        document.body.appendChild(installButton);
    }

    // Ocultar botón de instalación
    hideInstallButton() {
        const installButton = document.getElementById('install-button');
        if (installButton) {
            installButton.remove();
        }
    }

    // Instalar aplicación
    async installApp() {
        if (!this.deferredPrompt) return;

        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            console.log('✅ Usuario aceptó la instalación');
        } else {
            console.log('❌ Usuario rechazó la instalación');
        }

        this.deferredPrompt = null;
        this.hideInstallButton();
    }

    // Configurar instrucciones para móviles
    setupMobileInstructions() {
        const mobileInstructions = document.getElementById('mobile-instructions');
        const closeButton = document.getElementById('close-mobile-instructions');

        if (closeButton) {
            closeButton.addEventListener('click', () => {
                mobileInstructions.style.display = 'none';
                localStorage.setItem('mobile-instructions-shown', 'true');
            });
        }

        // Mostrar instrucciones solo en móviles y si no se han mostrado antes
        if (this.isMobile() && !localStorage.getItem('mobile-instructions-shown')) {
            mobileInstructions.style.display = 'flex';
        }
    }

    // Detectar dispositivo móvil
    detectMobile() {
        if (this.isMobile()) {
            document.body.classList.add('mobile-device');
            this.enableMobileMode();
        }
    }

    // Verificar si es dispositivo móvil
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               (window.innerWidth <= 768);
    }

    // Habilitar modo móvil
    enableMobileMode() {
        const mobileModeCheckbox = document.getElementById('mobile-mode');
        if (mobileModeCheckbox) {
            mobileModeCheckbox.checked = true;
            this.applyMobileMode(true);
        }
    }

    // Aplicar modo móvil
    applyMobileMode(enabled) {
        const player = document.getElementById('floating-player');
        if (!player) return;

        if (enabled) {
            player.classList.add('mobile-mode');
            // Ajustar tamaño para móviles
            player.style.width = '90vw';
            player.style.height = '50vh';
            player.style.left = '5vw';
            player.style.top = '25vh';
        } else {
            player.classList.remove('mobile-mode');
        }
    }

    // Compartir contenido
    async shareContent() {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Reproductor Flotante - Video Vivo',
                    text: 'Mira este reproductor de video flotante',
                    url: window.location.href
                });
            } catch (error) {
                console.log('Error al compartir:', error);
            }
        } else {
            // Fallback: copiar URL al portapapeles
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('URL copiada al portapapeles');
            });
        }
    }

    // Obtener información del dispositivo
    getDeviceInfo() {
        return {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            isMobile: this.isMobile(),
            isInstalled: this.isInstalled,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        };
    }

    // Manejar cambios de orientación
    handleOrientationChange() {
        if (this.isMobile()) {
            setTimeout(() => {
                this.detectMobile();
            }, 100);
        }
    }
}

// Inicializar PWA cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    window.pwaHandler = new PWAHandler();
    
    // Escuchar cambios de orientación
    window.addEventListener('orientationchange', () => {
        window.pwaHandler.handleOrientationChange();
    });

    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', () => {
        if (window.pwaHandler.isMobile()) {
            window.pwaHandler.detectMobile();
        }
    });
});

// Exportar para uso global
window.PWAHandler = PWAHandler;
