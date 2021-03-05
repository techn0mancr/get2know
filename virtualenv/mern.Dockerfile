# MERN stack environment

# Use the node image as base
FROM node:15
MAINTAINER Nathanael Putro <nputro@student.unimelb.edu.au>

# Ensure system is up-to-date
RUN apt-get -y update
RUN apt-get -y upgrade

# Make Docker use a non-root user
RUN useradd --shell /bin/bash --create-home get2know
RUN chown --recursive get2know:get2know /opt /usr
ENV HOME /home/get2know

# Set the working directory
WORKDIR /home/get2know/workspace

# Install dependencies
RUN npm install

# Set current user to non-root user
USER get2know

# Run the Node.js server
CMD ["npm", "start"]
