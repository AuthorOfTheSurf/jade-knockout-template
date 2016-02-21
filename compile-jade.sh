#!/bin/bash

# I find it better to watch and compile each file individually,
# rather than watching an entire directory. Edits to the data source,
# i.e. json file backing a jade file will not trigger the recompile.
# In that case you will want to cancel, and re-run this script to force
# a recompile.

# Be sure that you have jade installed: `npm install -g jade`

# Watch compile homepage.jade using data-source.json as its data source.
# Will recompile everytime a change is made to homepage, or a page
# that is included by homepage.
jade --watch ./jade/homepage.jade --out html/ --obj data-source.json &

# Index doesn't have a data source and is not outputted
# to html/ The simple python server we run will serve
# up index.html as this is how most HTTP servers are
# configured to work.
jade --watch index.jade --out ./

# Commands that end with `&` are asynchronous, we want them to all be run.
# This script is considered to be running until all of its processes are cancelled.
wait