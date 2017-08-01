FROM node:8.2.1

# Create app directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# app environment
ARG BUILD_ENV=production
# ARG GA_ENV=UA-91109543-1
# ARG GA_MODE=auto
ENV NODE_ENV ${BUILD_ENV}
ENV GA UA-91109543-1
ENV GA_MODE auto

# Install app dependencies
# Hack to use cached node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /usr/src

# Bundle app source
COPY . /usr/src

# Build app
RUN npm run build

# port to expose
EXPOSE 8080

# node server
CMD [ "npm", "start" ]
