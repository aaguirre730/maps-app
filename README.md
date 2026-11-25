# MapsApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.2.

## Levantar el proyecto en DEV

1. Clonar repositorio
2. Instalar dependencias
3. Generar el `.env` basado en el `.env.template`
4. Ejecutar script para crear variable de entorno.
En consola escribimos:
`node ./scripts/set-envs.js`
o
`npm run set-envs`

## Uso de Mapbox
URL: https://docs.mapbox.com/

Documentación
https://docs.mapbox.com/mapbox-gl-js/guides/
`npm install mapbox-gl`


## Troubleshooting: Los cambios en el HTML no se reflejan en el navegador

Si la consola de Angular recompila normalmente (`Component update sent to client(s).`) pero los cambios no aparecen en pantalla, suele tratarse de una desincronización de **Component HMR**.

### Soluciones rápidas

1. **Desactivar HMR:** Frenar el servidor (`Ctrl + C`) y levantarlo sin Hot Module Replacement:
   ```bash
   ng serve -o --no-hmr
