FROM devopssekawanmedia/npm:20-cmd

# Remove Existing application directory
RUN rm -rf /var/www/html

# Copy the application files into the container
COPY . /var/www/html

# Install dependecies using npm
RUN npm install --global yarn

# Set the working directory
WORKDIR /var/www/html

#ENV NEXT_DISABLE_ESLINT=true
#ENV NEXT_PUBLIC_ESLINT_MODE=off

# Install dependecies using yarn
RUN yarn install 

# Build application using yarn
RUN yarn run build

# Webserver user
RUN chown -R www-data:www-data /var/www/html

# Copy nginx configuration
COPY nginx/default /etc/nginx/sites-enabled/

# Useful Port
EXPOSE 80
EXPOSE 443

# Clean up unnecessary packages and files (optional but recommended)
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Executable entrypoint
RUN chmod +x entrypoint.sh

# Run Command
CMD ["/var/www/html/entrypoint.sh"]

