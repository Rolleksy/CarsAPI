FROM node:alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install
COPY . .

ARG PORT
ENV PORT=${PORT}

EXPOSE ${PORT}

CMD ["npm", "run", "start"]