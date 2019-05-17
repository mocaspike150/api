update: week01
	npm run members
	npm run avatar

geojson:
	npm run geojson

week01: donation_total
	make -f week01.make

donation_total:
	/usr/local/bin/node bin/donation_total.js  | tee donation/total.json
