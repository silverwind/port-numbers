node_modules: pnpm-lock.yaml
	pnpm install
	@touch node_modules

.PHONY: deps
deps: node_modules

.PHONY: lint
lint: node_modules
	pnpm exec eslint-silverwind --color .
	pnpm exec tsgo

.PHONY: lint-fix
lint-fix: node_modules
	pnpm exec eslint-silverwind --color . --fix
	pnpm exec tsgo

.PHONY: test
test: node_modules lint
	pnpm exec vitest

.PHONY: test-update
test-update: node_modules lint
	pnpm exec vitest --update

update: update-js update-actions

.PHONY: update-js
update-js: node_modules
	pnpm exec updates -u -f package.json
	rm -rf node_modules pnpm-lock.yaml
	pnpm install
	@touch node_modules

.PHONY: update-data
update-data: node_modules
	node update-data.ts

.PHONY: publish
publish: node_modules
	pnpm publish --no-git-checks

.PHONY: patch
patch: node_modules lint test
	pnpm exec versions -R patch package.json

.PHONY: minor
minor: node_modules lint test
	pnpm exec versions -R minor package.json

.PHONY: major
major: node_modules lint test
	pnpm exec versions -R major package.json

.PHONY: update-actions
update-actions: node_modules
	pnpm exec updates -u -M actions
