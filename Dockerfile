# use alpine for a smaller image
FROM node:20-alpine

# set working directory
WORKDIR /src

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy the rest of the application code
COPY . .

# expose the port the app runs on
EXPOSE 8080

#start the application
CMD ["npm", "start"]