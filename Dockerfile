FROM node:20-alpine3.20
ENV DEBIAN_FRONTEND=noninteractive

# Install Dependencies
RUN apk update
RUN apk add --no-cache sudo curl wget nano htop unzip git openrc bash

# For yarn
RUN apk add --no-cache autoconf automake g++ make libpng-dev libtool automake autoconf nasm pkgconf

# Install Openrc
RUN apk update
RUN openrc
RUN touch /run/openrc/softlevel

# Install Nginx
RUN apk add --no-cache nginx

# Remove Existing application directory 
RUN rm -rf /var/www/html

# Copy the application files into the container  
COPY . /var/www/html

# Install dependecies using npm
#RUN npm install --global yarn

# Set the working directory
WORKDIR /var/www/html

# Webserver user
RUN chown -R nginx:nginx /var/www/html

# Install dependecies using yarn
RUN yarn install

RUN rm -rf .next/cache

# Build application using yarn
RUN yarn build

# Copy nginx configuration
COPY nginx/default /etc/nginx/http.d/default.conf

# Useful Port
EXPOSE 80
EXPOSE 443

# Clean up unnecessary packages and files (optional but recommended)
#RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Executable entrypoint
RUN chmod +x entrypoint.sh

# Run Command
CMD ["/var/www/html/entrypoint.sh"]
