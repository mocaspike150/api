update: 
	npm run members
	npm run avatar

geojson:
	npm run geojson

week01: 
	make -f week01.make

week02: 
	make -f week02.make

donation_total:
	/usr/local/bin/node bin/donation_total.js  | tee donation/total.json
