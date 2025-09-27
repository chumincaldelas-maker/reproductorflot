// Configuración del Reproductor Flotante
const PlayerConfig = {
    // URL del video por defecto (se carga desde enlace.txt)
    defaultVideoUrl: '',
    
    // Configuración de la ventana
    window: {
        width: 400,
        height: 300,
        minWidth: 200,
        minHeight: 150,
        maxWidth: window.innerWidth,
        maxHeight: window.innerHeight,
        position: {
            x: 50,
            y: 50
        }
    },
    
    // Configuración del video
    video: {
        autoplay: true,
        loop: false,
        muted: false,
        controls: true,
        preload: 'metadata'
    },
    
    // Configuración de la interfaz
    ui: {
        opacity: 0.9,
        alwaysOnTop: true,
        showCustomControls: true,
        showProgressBar: true,
        showTimeDisplay: true,
        theme: 'dark'
    },
    
    // Configuración de teclas de acceso rápido
    shortcuts: {
        playPause: ' ',
        fullscreen: 'f',
        minimize: 'm',
        settings: 's',
        close: 'Escape'
    },
    
    // Configuración de redimensionamiento
    resize: {
        enabled: true,
        handles: ['nw', 'ne', 'sw', 'se'],
        maintainAspectRatio: false
    },
    
    // Configuración de arrastre
    drag: {
        enabled: true,
        headerOnly: true,
        constrainToViewport: true
    },
    
    // Configuración de persistencia
    persistence: {
        savePosition: true,
        saveSize: true,
        saveSettings: true,
        storageKey: 'floatingPlayerConfig'
    }
};

// Función para cargar la configuración desde localStorage
function loadConfig() {
    try {
        const saved = localStorage.getItem(PlayerConfig.persistence.storageKey);
        if (saved) {
            const savedConfig = JSON.parse(saved);
            Object.assign(PlayerConfig, savedConfig);
        }
    } catch (error) {
        console.warn('No se pudo cargar la configuración guardada:', error);
    }
}

// Función para guardar la configuración en localStorage
function saveConfig() {
    try {
        localStorage.setItem(PlayerConfig.persistence.storageKey, JSON.stringify(PlayerConfig));
    } catch (error) {
        console.warn('No se pudo guardar la configuración:', error);
    }
}

// Función para cargar la URL del video desde el archivo
async function loadVideoUrl() {
    try {
        const response = await fetch('enlaces/enlace.txt');
        const url = await response.text();
        if (url.trim()) {
            PlayerConfig.defaultVideoUrl = url.trim();
            return url.trim();
        }
    } catch (error) {
        console.error('Error al cargar el enlace del video:', error);
    }
    return null;
}

// Función para actualizar la configuración
function updateConfig(key, value) {
    const keys = key.split('.');
    let current = PlayerConfig;
    
    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
            current[keys[i]] = {};
        }
        current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    saveConfig();
}

// Función para obtener un valor de configuración
function getConfig(key) {
    const keys = key.split('.');
    let current = PlayerConfig;
    
    for (const k of keys) {
        if (current && typeof current === 'object' && k in current) {
            current = current[k];
        } else {
            return undefined;
        }
    }
    
    return current;
}

// Cargar configuración al inicializar
loadConfig();
