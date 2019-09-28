update: git_config
	git checkout master
	git pull
	node bin/avatar.js
	node bin/members.js | sort -n | tee _data/club/members.yml
	git add _data
	git commit -m 'update by Makefile' | true
	git push -u https://ontouchstart:${GITHUB_TOKEN}@github.com/mocaspike150/api master

git_config:
	git config --global user.email "ontouchstart@gmail.com"
	git config --global user.name "Sam Liu"
