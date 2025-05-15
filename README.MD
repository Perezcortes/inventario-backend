# Inventario Backend

---

<p align="center">
  <img src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" alt="Node.js" width="60" height="60" />
  <img src="https://cdn.worldvectorlogo.com/logos/typescript.svg" alt="TypeScript" width="60" height="60" />
  <img src="https://cdn.worldvectorlogo.com/logos/express-109.svg" alt="Express" width="60" height="60" />
  <img src="https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg" alt="MongoDB" width="60" height="60" />
  <img src="https://cdn.worldvectorlogo.com/logos/json-web-token.svg" alt="JWT" width="60" height="60" />
</p>

---

## Descripción

Proyecto backend para un sistema de inventario usando **Node.js**, **TypeScript**, **Express** y **MongoDB**.  
Incluye autenticación con JWT, manejo de usuarios y productos, y operaciones CRUD básicas.

El proyecto busca reforzar conocimientos en desarrollo backend moderno, bases de datos NoSQL y seguridad con autenticación.

---

## Tecnologías usadas

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
- ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
- ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=json-web-tokens)

---

## Comandos usados para iniciar el proyecto

```bash
# Crear la carpeta del proyecto y entrar
mkdir inventario-backend
cd inventario-backend

# Inicializar npm
npm init -y

# Instalar dependencias principales
npm install express mongoose cors dotenv bcrypt jsonwebtoken

# Instalar dependencias para desarrollo y tipos
npm install -D typescript ts-node-dev @types/express @types/node @types/bcrypt @types/jsonwebtoken @types/cors

# Inicializar configuración TypeScript
npx tsc --init
