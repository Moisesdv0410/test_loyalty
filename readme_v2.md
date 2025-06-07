# TESTBACKEND2

Este proyecto contiene una API que utiliza PostgreSQL, MongoDB, GraphQL y una Cloud Function. A continuación, se detallan las instrucciones para su uso y despliegue.

---

## 🧰 Requisitos Previos


BigQuery (simulado) – Tabla de seguimiento de puntos acumulados
- Node.js
- PostgreSQL
- MongoDB
- Cuenta en Google Cloud para usar Cloud Functions

---
## Tecnologías utilizadas
- NestJS + GraphQL – Backend API

- PostgreSQL – Base de datos principal (usuarios y transacciones)

- MongoDB Atlas – Logs de eventos

- Google Cloud Function – Registro de eventos de acumulación - BigQuery
---
## 🧰 Estructura principal
src/
│
├── users/               # Módulo de usuarios (PostgreSQL)
├── transactions/        # Módulo de transacciones (PostgreSQL)
├── points/              # Casos de uso: acumulación y redención
├── logs/                # Logs de eventos (MongoDB)
├── gcp/                 # Servicio que llama a la Cloud Function

## 🛠 Setup local paso a paso

1. Clona el repositorio:
```bash
git clone https://github.com/usuario/mi-proyecto.git
cd mi-proyecto
