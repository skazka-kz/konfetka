FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN yarn global add pm2
COPY package.json yarn.lock /usr/src/app/

# Install dependencies
RUN yarn install --production

# Then copy to hopefuly lighten the build times
COPY . .

# Build the front-end
RUN yarn run build

COPY .env .
RUN ls -a
EXPOSE 5000

CMD [ "pm2-docker", "process.yml" ]