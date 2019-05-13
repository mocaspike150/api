update: week01
	npm run members
	npm run avatar

geojson:
	npm run geojson

week01: week01_club_miles week01_leaderboard

week01_club_miles:
	make -f week01_club_miles.make

week01_leaderboard:
	make -f week01_leaderboard.make
