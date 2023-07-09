FROM node:alpine

WORKDIR /wrd-counter

ENV PATH /wrd-counter/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install -g npm@latest
RUN npm install react-scripts --legacy-peer-deps


COPY . ./

CMD ["npm", "start"]