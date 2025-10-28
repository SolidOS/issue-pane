# Wrap TTL files into JS files for bundling with library

all : dist/wf.js dist/trackerSettingsForm.js  dist/ui.js

src/wf.ttl:
				curl  http://www.w3.org/2005/01/wf/flow.n3 > wf0.ttl
				expand -t 4 wf0.ttl > src/ wf.ttl

				# find . -name "src/ui.ttl" | while read line; do expand -t 4 $line > $line.new; mv $line.new $line; done

dist/wf.js : src/wf.ttl
				(echo 'module.exports = `' ; cat src/wf.ttl; echo '`') >  dist/wf.js

src/ui.ttl:
				curl  http://www.w3.org/ns/ui.n3 > ui0.ttl
				expand -t 4 ui0.ttl > src/ui.ttl


dist/ui.js : src/ui.ttl
				(echo 'module.exports = `' ; cat src/ui.ttl; echo '`') >  dist/ui.js


dist/trackerSettingsForm.js : src/trackerSettingsForm.ttl
				(echo 'export const trackerSettingsFormText = `' ; cat src/trackerSettingsForm.ttl; echo '`') >  dist/trackerSettingsForm.js
# ends
