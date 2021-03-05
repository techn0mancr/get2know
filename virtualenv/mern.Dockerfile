# MERN stack environment

# Use the node image as base
FROM node:15
MAINTAINER Nathanael Putro <nputro@student.unimelb.edu.au>

# Ensure system is up-to-date
RUN apt-get -y update
RUN apt-get -y upgrade

# Make Docker use a non-root user
RUN useradd --shell /bin/bash --create-home get2know-react
RUN chown --recursive get2know-react:get2know-react /opt /usr
ENV HOME /home/get2know-react

# Set the working directory
WORKDIR /home/get2know-react/workspace

# Install dependencies
RUN npm install

# Set current user to non-root user
USER get2know

# Run the Node.js server
CMD ["npm", "start"]
