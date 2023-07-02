FROM node AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

# Agregar cualquier comando adicional para compilar o construir dependencias si es necesario

FROM node

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 8080

CMD ["npm", "start"]