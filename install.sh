#!/bin/bash

# Set the path to this plugin
nylaspath=~/.nylas/dev/packages/random-quotes;

# Clone repository to the development folder
git clone https://github.com/LasseHaslev/N1-quotes.git $nylaspath;

# cd into repository
cd $nylaspath;

# Install node
npm install;
