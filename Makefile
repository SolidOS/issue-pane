# Wrap TTL files into JS files for bundling with library

,all : dist/wf.js dist/trackerSettingsForm.js  dist/ui.js

dist/wf.ttl:
				curl  http://www.w3.org/2005/01/wf/flow.n3 > wf0.ttl
				expand -t 4 wf0.ttl > wf.ttl

				# find . -name "ui.ttl" | while read line; do expand -t 4 $line > $line.new; mv $line.new $line; done

dist/wf.js : wf.ttl
				(echo 'module.exports = `' ; cat wf.ttl; echo '`') >  wf.js

dist/ui.ttl:
				curl  http://www.w3.org/ns/ui.n3 > ui0.ttl
				expand -t 4 ui0.ttl > ui.ttl


dist/ui.js : ui.ttl
				(echo 'module.exports = `' ; cat ui.ttl; echo '`') >  ui.js


dist/trackerSettingsForm.js : trackerSettingsForm.ttl
				(echo 'export const trackerSettingsFormText = `' ; cat trackerSettingsForm.ttl; echo '`') >  trackerSettingsForm.js
# ends
