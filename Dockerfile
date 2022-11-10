# Imagen de node
FROM node:19

# Directorio de trabajo
WORKDIR /chat

# Packages

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]