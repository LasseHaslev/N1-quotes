#!/bin/bash

# Set the path to this plugin
nylaspath='~/.nylas/dev/packages/'

# Clone repository to the development folder
git clone https://github.com/LasseHaslev/N1-quotes.git $nylaspath;

# cd into repository
cd $nylaspath + 'random-signature-quotes';

# Install node
npm install
