# 1. Dizemos ao Docker qual é o nosso "computador base". 
# Vamos usar o Linux Alpine com Node.js versão 20 (é muito leve e rápido!)
FROM node:20

# 2. Criamos uma pasta de trabalho lá dentro chamada /app
WORKDIR /app

# 3. Copiamos o package.json e o package-lock.json primeiro
COPY package*.json ./

# 4. Mandamos o Docker rodar o npm install para baixar as dependências lá dentro
RUN npm install

# 5. Agora copiamos o resto do nosso código (pasta src, etc) para lá
COPY . .

# 6. Fazemos o build da aplicação NestJS
RUN npm run build

# 7. Expomos a porta 4000 para podermos acessar a API
EXPOSE 4000

# 8. E, por fim, o comando que faz a API ficar no ar
CMD ["npm", "run", "start:prod"]