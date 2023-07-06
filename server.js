const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Importamos el módulo 'express' para crear una aplicación de servidor.
// Importamos el módulo 'next' para configurar y preparar la aplicación Next.js.
// Importamos la función 'createProxyMiddleware' del módulo 'http-proxy-middleware' para crear un middleware de proxy.

// Definimos una variable 'dev' que almacena si el entorno de ejecución es de desarrollo o producción.
// Creamos una instancia de la aplicación Next.js pasando el valor de 'dev' al constructor.
// Utilizamos la función 'getRequestHandler' para obtener el manejador de solicitudes de la aplicación.

// Luego, llamamos al método 'prepare' de la instancia de la aplicación para prepararla y esperamos a que se complete.

// A continuación, creamos una instancia de Express y la asignamos a la variable 'server'.

// Si estamos en modo de desarrollo, configuramos un middleware de proxy para redirigir las solicitudes a la ruta "/api" al servidor en "http://localhost:8000".

// Configuramos un manejador para todas las rutas que devuelve el manejador de solicitudes de la aplicación Next.js.

// Finalmente, llamamos al método 'listen' en el servidor para iniciar el servidor en el puerto 3000 y mostramos un mensaje en la consola cuando el servidor esté listo.

// Capturamos cualquier error que ocurra durante el proceso y lo mostramos en la consola.
app
    .prepare()
    .then(() => {
        const server = express(); // NOSONAR
        if (dev) {
            server.use(
                "/api",
                createProxyMiddleware({
                    target: "http://localhost:8000",
                    changeOrigin: true,
                })
            );
        }


        // A continuación, creamos una instancia de Express y la asignamos a la variable 'server'.

        // Si estamos en modo de desarrollo, configuramos un middleware de proxy para redirigir las solicitudes a la ruta "/api" al servidor en "http://localhost:8000".

        // Configuramos un manejador para todas las rutas que devuelve el manejador de solicitudes de la aplicación Next.js.

        // Finalmente, llamamos al método 'listen' en el servidor para iniciar el servidor en el puerto 3000 y mostramos un mensaje en la consola cuando el servidor esté listo.

        // Capturamos cualquier error que ocurra durante el proceso y lo mostramos en la consola.
        server.all("*", (req, res) => {
            return handle(req, res);
        });

        server.listen(3000, (err) => {
            if (err) throw err;
            console.log("> Ready on http://localhost:8000");
        });
    })
    .catch((err) => {
        console.log("Error", err);
    });


// Definimos una variable 'dev' que almacena si el entorno de ejecución es de desarrollo o producción.
// Creamos una instancia de la aplicación Next.js pasando el valor de 'dev' al constructor.
// Utilizamos la función 'getRequestHandler' para obtener el manejador de solicitudes de la aplicación.

// Luego, llamamos al método 'prepare' de la instancia de la aplicación para prepararla y esperamos a que se complete.

// A continuación, creamos una instancia de Express y la asignamos a la variable 'server'.

// Si estamos en modo de desarrollo, configuramos un middleware de proxy para redirigir las solicitudes a la ruta "/api" al servidor en "http://localhost:8000".

// Configuramos un manejador para todas las rutas que devuelve el manejador de solicitudes de la aplicación Next.js.

// Finalmente, llamamos al método 'listen' en el servidor para iniciar el servidor en el puerto 3000 y mostramos un mensaje en la consola cuando el servidor esté listo.
