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


## Troubleshooting: El menú desplegable del Navbar queda detrás del mapa o no se cierra

Al combinar **DaisyUI**, **Angular** y **Mapbox**, el dropdown del navbar puede presentar dos comportamientos no deseados: quedar oculto detrás del canvas del mapa en `/fullscreen`, o permanecer abierto al navegar entre rutas (ya que al ser una SPA, el foco CSS no se pierde) y al volver a hacer clic en el botón del menú.

### Solución

1. **Orden de capas (`z-index`):** Agregar `relative` y un `z-index` alto en el contenedor principal del navbar (`navbar.component.html`) para asegurar que siempre se muestre por encima del mapa:
   ```html
   <div class="navbar bg-base-100 shadow-sm relative z-[9999]">

Apertura y cierre del menú (<details>): Reemplazar el dropdown basado en tabindex="0" por la etiqueta nativa <details> con una referencia local #dropdown:

<details class="dropdown" #dropdown>
  <summary class="btn btn-ghost btn-circle">
    <!-- ícono del menú -->
  </summary>
  <ul class="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
    @for (route of routes; track route.path) {
      <li>
        <a [routerLink]="route.path" (click)="dropdown.open = false">{{ route.title }}</a>
      </li>
    }
  </ul>
</details>

De esta forma, el botón alterna entre abrir y cerrar el menú nativamente, y al elegir una ruta se cierra automáticamente con dropdown.open = false.
