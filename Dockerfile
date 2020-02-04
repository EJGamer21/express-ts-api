# our base image
FROM node:10

# copy files
WORKDIR /app/api
RUN npm install -g nodemon

#  install dependencies and build files
COPY . /app/api
RUN npm install
# RUN npm run build

# expose the port
# EXPOSE 80

# run the server
CMD ["npm", "start"]