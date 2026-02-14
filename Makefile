node_modules: pnpm-lock.yaml
	pnpm install
	@touch node_modules

.PHONY: deps
deps: node_modules

.PHONY: update-data
update-data:
	node update-data.js

.PHONY: lint
lint: node_modules
	pnpm exec eslint --color .

.PHONY: test
test: lint node_modules
	pnpm exec vitest

.PHONY: test-update
test-update: lint node_modules
	pnpm exec vitest --update

.PHONY: publish
publish: node_modules
	pnpm publish --no-git-checks

.PHONY: update
update: node_modules
	pnpm exec updates -cu
	rm -rf node_modules pnpm-lock.yaml
	pnpm install
	@touch node_modules

.PHONY: path
patch: node_modules lint test
	pnpm exec versions patch package.json
	@$(MAKE) --no-print-directory publish

.PHONY: minor
minor: node_modules lint test
	pnpm exec versions minor package.json
	@$(MAKE) --no-print-directory publish

.PHONY: major
major: node_modules lint test
	pnpm exec versions major package.json
	@$(MAKE) --no-print-directory publish
