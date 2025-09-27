#!/usr/bin/env python3
"""
Servidor HTTP simple para el Reproductor Flotante
Soluciona problemas de CORS al cargar archivos locales
"""

import http.server
import socketserver
import os
import webbrowser
from urllib.parse import urlparse

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Agregar headers CORS para permitir acceso desde archivos locales
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_OPTIONS(self):
        # Manejar preflight requests
        self.send_response(200)
        self.end_headers()
    
    def log_message(self, format, *args):
        # Personalizar mensajes de log
        print(f"[{self.log_date_time_string()}] {format % args}")

def start_server(port=8000):
    """Iniciar el servidor HTTP local"""
    try:
        # Cambiar al directorio del proyecto
        os.chdir(os.path.dirname(os.path.abspath(__file__)))
        
        # Crear el servidor
        with socketserver.TCPServer(("", port), CORSHTTPRequestHandler) as httpd:
            print(f"🚀 Servidor iniciado en http://localhost:{port}")
            print(f"📁 Sirviendo archivos desde: {os.getcwd()}")
            print(f"🎥 Reproductor disponible en: http://localhost:{port}/index.html")
            print("💡 Presiona Ctrl+C para detener el servidor")
            print("-" * 50)
            
            # Abrir el navegador automáticamente
            try:
                webbrowser.open(f'http://localhost:{port}/index.html')
                print("🌐 Abriendo reproductor en el navegador...")
            except:
                print("⚠️  No se pudo abrir el navegador automáticamente")
                print(f"   Abre manualmente: http://localhost:{port}/index.html")
            
            # Iniciar el servidor
            httpd.serve_forever()
            
    except OSError as e:
        if e.errno == 48:  # Puerto en uso
            print(f"❌ Error: El puerto {port} está en uso")
            print(f"💡 Intenta con otro puerto: python server.py {port + 1}")
        else:
            print(f"❌ Error al iniciar el servidor: {e}")
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido por el usuario")
    except Exception as e:
        print(f"❌ Error inesperado: {e}")

if __name__ == "__main__":
    import sys
    
    # Puerto por defecto
    port = 8000
    
    # Verificar si se proporcionó un puerto personalizado
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("❌ Error: El puerto debe ser un número")
            print("💡 Uso: python server.py [puerto]")
            sys.exit(1)
    
    # Verificar que el puerto esté en rango válido
    if not (1 <= port <= 65535):
        print("❌ Error: El puerto debe estar entre 1 y 65535")
        sys.exit(1)
    
    start_server(port)
