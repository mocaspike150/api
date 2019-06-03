update: 
	git pull
	npm run members
	npm run avatar
	git add _data
	git commit -m 'update by Makefile'

geojson:
	npm run geojson

