NODE=/usr/bin/node
update: 
	git pull
	$(NODE) bin/avatar.js
	$(NODE) bin/members.js | sort -n | tee _data/club/members.yml
	git add _data
	git commit -m 'update by Makefile' | true
	git push
