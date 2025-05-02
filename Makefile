# Wrap TTL files into JS files for bundling with library

# unused:  trackerInstancesForm.js

,all : wf.js trackerSettingsForm.js  ui.js

#individualForm.js : individualForm.ttl
#				(echo 'module.exports = `' ; cat individualForm.ttl; echo '`') >  individualForm.js

wf.ttl:
				curl  http://www.w3.org/2005/01/wf/flow.n3 > wf0.ttl
				expand -t 4 wf0.ttl > wf.ttl

				# find . -name "ui.ttl" | while read line; do expand -t 4 $line > $line.new; mv $line.new $line; done

wf.js : wf.ttl
				(echo 'module.exports = `' ; cat wf.ttl; echo '`') >  wf.js

ui.ttl:
				curl  http://www.w3.org/ns/ui.n3 > ui0.ttl
				expand -t 4 ui0.ttl > ui.ttl


ui.js : ui.ttl
				(echo 'module.exports = `' ; cat ui.ttl; echo '`') >  ui.js


trackerInstancesForm.js : trackerInstancesForm.ttl
				(echo 'export const trackerInstancesFormText = `' ; cat trackerInstancesForm.ttl; echo '`') >  trackerInstancesForm.js
				# ends

trackerSettingsForm.js : trackerSettingsForm.ttl
				(echo 'export const trackerSettingsFormText = `' ; cat trackerSettingsForm.ttl; echo '`') >  trackerSettingsForm.js
# ends
