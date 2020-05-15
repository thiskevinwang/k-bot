# specify the node base image with your desired version node:<version>
# FROM arm32v7/node:12-alpine
FROM node:12-alpine

# Create Directory for the Container
WORKDIR /usr/src/app
# Only copy the package.json file to work directory
COPY package.json ./

# Install all Packages
RUN npm install

# Copy all other source code to work directory
# ADD . /
COPY . .

# Start
CMD [ "npm", "run", "dev" ]

# replace this with your application's default port
EXPOSE 8080