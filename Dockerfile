FROM node:12.12.0-alpine
RUN apk update
WORKDIR /usr/src/app
COPY .babelrc .env *.json *.js ./
RUN npm install
COPY ./src  ./src/
COPY ./public  ./public/
RUN npm run build

FROM exiasr/alpine-yarn-nginx
RUN mkdir -p /usr/share/nginx/html/
COPY --from=0 /usr/src/app/build/* /usr/share/nginx/html/
ADD ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
