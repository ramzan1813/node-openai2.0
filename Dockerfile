FROM node:latest
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 3393
CMD npm start