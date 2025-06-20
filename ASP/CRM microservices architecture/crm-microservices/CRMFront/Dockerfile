# Этап сборки
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

# Этап продакшена
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
