FROM node:alpine AS builder
LABEL MAINTAINER="Aditya <adityadokania.19@gmail.com>"

ENV APP "app"

# Use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
# ADD .npmrc /tmp/.npmrc
RUN cd /tmp && npm install --allow-root

# Copy code of application
ADD . /${APP}

# Add node_modules to public folder
RUN ln -s /tmp/node_modules /${APP}

# Setting that next commands run on the folder code
WORKDIR /${APP}

# Copy script used to build app
# RUN npm run build

# Final Docker image with Nginx for React app
# FROM nginx:alpine
# ENV APP "app"

EXPOSE 3000

CMD [ "npm", "start" ]
# Set nginx configuration for react app
# COPY .docker/nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY  /nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder ../${APP}/build /usr/share/nginx/html

