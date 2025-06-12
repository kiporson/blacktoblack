#!/bin/bash
node CORE/remote_command.js &
node DIABLO_DIGITAL_BRAIN/mission_loop.js &
node RITUAL_ENGINE/auto_ritual.js &
node -e "require('./MONETIZATION_CORE/mirage_trap').startServer(process.env.PORT||3000)" &
node -e "require('./MONETIZATION_CORE/void_leech').startLeech()" &
wait
