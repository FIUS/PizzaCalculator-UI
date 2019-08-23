FROM node:8.15-alpine

COPY . /home/app
WORKDIR /home/app

RUN rm -r node_modules/

RUN npm install

ENV backendURL=http://localhost:8080

EXPOSE 80

CMD ["npm" "run" "start" "--prod"]
