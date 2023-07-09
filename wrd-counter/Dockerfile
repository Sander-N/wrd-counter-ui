FROM node:alpine

WORKDIR /wrd-counter

ENV PATH /wrd-counter/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install -g npm@latest


COPY . ./

CMD ["npm", "start"]