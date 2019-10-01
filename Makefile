update: git_config pull build
	git add _data
	git commit -m 'update by Makefile' | true
	git push -u https://ontouchstart:${GITHUB_TOKEN}@github.com/mocaspike150/api master

git_config:
	git config --global user.email "ontouchstart@gmail.com"
	git config --global user.name "Sam Liu"

pull:
	git checkout master
	git pull

build:
	node bin/avatar.js
	node bin/members.js | sort -n > _data/club/members.yml
	node bin/jsonify.js _data/club/members.yml  > club/members.json 
