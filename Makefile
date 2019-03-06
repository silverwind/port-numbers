
lint:
	npx eslint --color --quiet *.js

test:
	$(MAKE) lint
	node --trace-deprecation --throw-deprecation --trace-warnings test.js

publish:
	git push -u --tags origin master
	npm publish

update:
	npx updates -u
	rm -rf node_modules
	npm i --no-package-lock

npm-patch:
	npm version patch

npm-minor:
	npm version minor

npm-major:
	npm version major

patch: test npm-patch publish
minor: test npm-minor publish
major: test npm-major publish

.PHONY: test publish update patch minor major npm-patch npm-minor npm-major
