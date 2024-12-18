FROM node:current-alpine AS base

WORKDIR /app

COPY . .

RUN npm install -g @angular/cli

RUN npm install

RUN ng build

FROM nginx

EXPOSE 80

COPY --from=base /app/dist/frontend/browser /usr/share/nginx/html