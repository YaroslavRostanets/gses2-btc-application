FROM node:16-buster

# Install.
RUN apt-get update && \
    apt-get -y install \
            git \
            curl \
            nano
RUN mkdir -p /var/app
WORKDIR /var/app
COPY . .
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
