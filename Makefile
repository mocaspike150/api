update: week01
	npm run members
	npm run avatar

geojson:
	npm run geojson

week01: 
	make -f week01.make

donation_total:
	node bin/donation_total.js  | tee donation/total.json
