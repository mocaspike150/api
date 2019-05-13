all:
	node bin/leaderboard.js 72363 | tee leaderboard/week01/72363.json
	node bin/leaderboard.js 128445| tee leaderboard/week01/128445.json
	node bin/leaderboard.js 301632| tee leaderboard/week01/301632.json
	node bin/leaderboard.js 302045| tee leaderboard/week01/302045.json
	node bin/leaderboard.js 523430| tee leaderboard/week01/523430.json
