FROM node:10-alpine


RUN mkdir -p /home/ajit/Downloads/Sambhav/Sambhav-Node-api/node-postgres/backend/ && chown -R node:node /home/ajit/Downloads/Sambhav/Sambhav-Node-api

WORKDIR /home/ajit/Downloads/Sambhav/Sambhav-Node-api

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3001

CMD [ "node", "index.js" ]


















