NPM=/usr/local/bin/npm
update: 
	git pull
	$(NPM) run members
	$(NPM) run avatar
	git add _data
	git commit -m 'update by Makefile' | true
	git push

geojson:
	$(NPM) run geojson

