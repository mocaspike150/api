all:  leaderboards html_leaderboards
	/usr/local/bin/node bin/html_leaderboard.js week01

html_leaderboards: 128445 72363 

128445:
	/usr/local/bin/node bin/html_leaderboard.js week01 128445

72363:
	/usr/local/bin/node bin/html_leaderboard.js week01 72363 


leaderboards: 301632 302045 523430

301632:
	/usr/local/bin/node bin/leaderboard.js week01 301632 

302045:
	/usr/local/bin/node bin/leaderboard.js week01 302045 

523430:
	/usr/local/bin/node bin/leaderboard.js week01 523430

