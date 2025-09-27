const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  // Crear la ventana principal (reproductor flotante)
  mainWindow = new BrowserWindow({
    width: 500,
    height: 350,
    x: 50,
    y: 50,
    frame: false, // Sin marco de ventana
    alwaysOnTop: true, // Siempre encima
    resizable: true, // Redimensionable
    movable: true, // Arrastrable
    minimizable: true, // Minimizable
    maximizable: false, // No maximizable
    fullscreenable: true, // Permite pantalla completa
    skipTaskbar: false, // Aparece en la barra de tareas
    transparent: false, // No transparente para mejor rendimiento
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true
    }
  });

  // Cargar el reproductor
  mainWindow.loadFile('reproductor-electron.html');

  // Configurar la ventana para que se mantenga flotante
  mainWindow.setAlwaysOnTop(true, 'screen-saver');
  
  // Permitir que la ventana se pueda mover y redimensionar
  mainWindow.setMovable(true);
  mainWindow.setResizable(true);

  // Eventos de la ventana
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Prevenir que la ventana se cierre accidentalmente
  mainWindow.on('close', (event) => {
    // Minimizar en lugar de cerrar
    event.preventDefault();
    mainWindow.minimize();
  });

  // Configurar atajos de teclado globales
  setupGlobalShortcuts();

  // Mostrar la ventana cuando esté lista
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    console.log('Reproductor flotante iniciado');
  });
}

function setupGlobalShortcuts() {
  // Atajos globales (funcionan incluso cuando la ventana no está enfocada)
  globalShortcut.register('CommandOrControl+Shift+V', () => {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }
    }
  });

  globalShortcut.register('CommandOrControl+Shift+Q', () => {
    app.quit();
  });

  globalShortcut.register('CommandOrControl+Shift+F', () => {
    if (mainWindow) {
      mainWindow.setFullScreen(!mainWindow.isFullScreen());
    }
  });
}

// Eventos de la aplicación
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  // En macOS, las aplicaciones suelen quedarse activas hasta que se cierran explícitamente
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // En macOS, recrear la ventana cuando se hace clic en el icono del dock
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('will-quit', () => {
  // Limpiar atajos globales
  globalShortcut.unregisterAll();
});

// Manejar comunicación con el renderer
ipcMain.handle('toggle-minimize', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    } else {
      mainWindow.minimize();
    }
  }
});

ipcMain.handle('close-app', () => {
  app.quit();
});

ipcMain.handle('toggle-fullscreen', () => {
  if (mainWindow) {
    mainWindow.setFullScreen(!mainWindow.isFullScreen());
  }
});

ipcMain.handle('set-always-on-top', (event, alwaysOnTop) => {
  if (mainWindow) {
    mainWindow.setAlwaysOnTop(alwaysOnTop);
  }
});

// Prevenir múltiples instancias
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // Si se intenta abrir una segunda instancia, enfocar la ventana existente
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}
