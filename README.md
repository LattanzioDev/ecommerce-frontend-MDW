# Ecommerce Frontend – MDW 2025

Trabajo Final – Metodologías y Desarrollo Web

Este repositorio contiene el frontend del proyecto final de la materia Metodologías y Desarrollo Web (MDW). La aplicación implementa un ecommerce funcional que se comunica mediante API REST con un backend independiente, cumpliendo todos los requerimientos técnicos del trabajo práctico.
Los requerimientos utilizados provienen del documento oficial del TP.


---

## Descripción del Proyecto

El objetivo del proyecto es desarrollar una aplicación web con arquitectura API REST, autenticación, rutas públicas y privadas, un CRUD completo y manejo de estado global.
Este repositorio contiene únicamente el frontend, desarrollado con React y Redux Toolkit, y desplegado en Vercel.

El proyecto incluye:

* Página pública con listado de productos obtenidos desde el backend.
* Sistema de autenticación completo: registro, login, logout y protección de rutas.
* Carrito de compras sincronizado por usuario.
* Página privada con CRUD de productos.
* Manejo de estado global mediante Redux Toolkit.
* Formularios con validaciones mediante React Hook Form y Joi.
* Comunicación con backend mediante Axios.

---

## Requerimientos del TP (Cumplidos)

| Requisito                                       | Estado                                     |
| ----------------------------------------------- | ------------------------------------------ |
| Frontend en repositorio GitHub                  | ✔️                                         |
| Backend en repositorio separado                 | ✔️                                         |
| Aplicaciones deployadas en la nube              | ✔️ Vercel                                  |
| Base de datos en la nube                        | ✔️ MongoDB Atlas                           |
| Ruta pública que muestra datos desde el backend | ✔️ `/` (productos)                         |
| Login con validaciones                          | ✔️                                         |
| Registro de usuarios                            | ✔️                                         |
| Logout y redirección                            | ✔️                                         |
| Ruta privada protegida                          | ✔️ `/dashboard`                            |
| CRUD completo en página privada                 | ✔️ Alta / Baja / Modificación de productos |
| Manejo de estado global (Redux)                 | ✔️                                         |
| Validaciones en frontend                        | ✔️ RHF + Joi                               |
| Confirmación modal al eliminar                  | ✔️                                         |
| Protección de rutas privadas                    | ✔️                                         |
| Correcto manejo de errores                      | ✔️                                         |


---

## Tecnologías Utilizadas

Frontend:

* Vite
* React
* React Router DOM
* Redux Toolkit
* Redux Thunks
* React Hook Form
* Joi
* Axios
* CSS con Flexbox
* JWT Authentication (consumido desde backend)
* Deploy en Vercel

---

## Estructura del Proyecto

```
src/
 ├── components/         Componentes reutilizables
 ├── pages/              Páginas principales (Home, Login, Register, Dashboard)
 ├── redux/
 │    ├── slices/        Slices de Redux Toolkit
 │    ├── thunks/        Lógica asíncrona con createAsyncThunk
 │    └── store.js       Configuración del store global
 ├── services/           Configuración de Axios y servicios
 ├── hooks/              Hooks personalizados
 ├── utils/              Funciones auxiliares
 ├── App.jsx             Sistema de rutas
 └── main.jsx            Punto de entrada
```

---

## Autenticación

* Login y registro de usuarios con validaciones.
* Tokens JWT manejados por el backend.
* Rutas privadas protegidas.
* Redirección automática tras login y logout.
* Prevención de acceso directo a rutas privadas mediante URL.

---

## Carrito de Compras

* Carrito sincronizado con el backend por usuario autenticado.
* Conteo de productos visible en el encabezado.
* Agregar, actualizar cantidad y eliminar productos.
* Reseteo automático del carrito al cerrar sesión.
* Totales recalculados automáticamente.

---

## CRUD en Ruta Privada

En la ruta protegida `/dashboard` se puede:

* Crear nuevos productos.
* Editar productos existentes.
* Eliminar con confirmación mediante modal.
* Ver listado actualizado desde la base de datos.

Todos los cambios se reflejan en la ruta pública, cumpliendo los requerimientos del trabajo.

---

## Instalación y Ejecución Local

1. Clonar el repositorio:

```
git clone https://github.com/LattanzioDev/ecommerce-frontend-MDW.git
cd ecommerce-frontend-MDW
```

2. Instalar dependencias:

```
npm install
```

3. Crear archivo `.env` con la URL del backend:

```
VITE_API_URL=https://tu-backend-deploy.com
```

4. Ejecutar en desarrollo:

```
npm run dev
```

5. Compilar para producción:

```
npm run build
```

---

## Deploy

El frontend está desplegado en Vercel.

```
https://ecommerce-frontend-mdw-1ofa.vercel.app/
```

---

## Repositorio Backend

Agregar aquí el enlace al repositorio backend correspondiente:

```
https://github.com/ZaikoARG/ecommerce-backend-mdw
https://github.com/ZaikoARG/ecommerce-api-MDW (backend viejo)
```

---

## Flujo de Evaluación (según requisitos del TP)

1. Abrir la aplicación deployada en Vercel.
2. Verificar que la ruta pública muestra datos reales del backend.
3. Ejecutar login con validaciones.
4. Ser redirigido a la ruta privada.
5. Probar el CRUD completo.
6. Verificar que los datos se actualizan tanto en la base pública como en la privada.
7. Confirmar modal en eliminación.
8. Hacer logout y volver al home.
9. Intentar ingresar a la ruta privada sin login y comprobar la protección.

(Flujo basado en la consigna oficial del trabajo final.)


---

## Autores

**Luciano Federico Pereira** y **Valentino Lattanzio**

Trabajo Final – Metodologías y Desarrollo Web 2025
