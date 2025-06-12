#!/bin/bash
node CORE/remote_command.js &
node DIABLO_DIGITAL_BRAIN/mission_loop.js &
node RITUAL_ENGINE/auto_ritual.js &
node -e "require('./MONETIZATION_CORE/mirage_trap').startServer(process.env.PORT||3000)" &
node -e "require('./MONETIZATION_CORE/void_leech').startLeech()" &
node ENHANCED_EARNING/infernal_loop.js &
node ENHANCED_EARNING/siphon_ads.js &
node ENHANCED_EARNING/viral_linkgen.js &
node ENHANCED_EARNING/content_morpher.js &
node LEADS_ENGINE/wa_spreader.js &
node LEADS_ENGINE/telegram_collector.js &
node -e "require('./VOID_DOMINION/diablo_ui_web').start()" &
node -e "require('./VOID_DOMINION/adaptive_voice').speak('Diablo online')" &
wait
