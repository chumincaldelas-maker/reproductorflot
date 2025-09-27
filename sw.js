// Service Worker para PWA
const CACHE_NAME = 'reproductor-flotante-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/pwa.js',
    '/manifest.json',
    '/media/vivo.mp4',
    '/assets/icon-192x192.png',
    '/assets/icon-512x512.png'
];

// Instalar Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('✅ Cache abierto');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.warn('⚠️ Error al cachear archivos:', error);
            })
    );
});

// Activar Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Eliminando cache antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Interceptar solicitudes
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Devolver desde cache si está disponible
                if (response) {
                    return response;
                }

                // Clonar la solicitud
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(response => {
                    // Verificar si recibimos una respuesta válida
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clonar la respuesta
                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }).catch(error => {
                    console.warn('⚠️ Error en fetch:', error);
                    // Devolver página offline si es una solicitud de navegación
                    if (event.request.mode === 'navigate') {
                        return caches.match('/index.html');
                    }
                });
            })
    );
});

// Manejar notificaciones push (opcional)
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'Nueva notificación del Reproductor Flotante',
        icon: '/assets/icon-192x192.png',
        badge: '/assets/icon-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Abrir Reproductor',
                icon: '/assets/icon-192x192.png'
            },
            {
                action: 'close',
                title: 'Cerrar',
                icon: '/assets/icon-192x192.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Reproductor Flotante', options)
    );
});

// Manejar clics en notificaciones
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Manejar sincronización en segundo plano
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(
            // Aquí puedes agregar lógica de sincronización
            console.log('🔄 Sincronización en segundo plano')
        );
    }
});

// Manejar mensajes del cliente
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
