init:
	npm install -g bower grunt-cli happyplan-cli

install:
	npm install
	bower install

update:
	npm install
	bower prune
	bower update
