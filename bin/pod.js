#!/usr/bin/env node
const express = require('express')
const PORT = process.env.PORT || 3000

express()
.use('/', express.static('public'))
.listen(PORT, () => { console.log(`Now running on ${PORT}.`) })
