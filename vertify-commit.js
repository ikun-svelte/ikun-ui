import { readFileSync } from 'node:fs';
import path from 'node:path';
import { log } from 'baiwusanyu-utils';

const msgPath = path.resolve('.git/COMMIT_EDITMSG');
const msg = readFileSync(msgPath, 'utf-8').trim();

const commitRE =
	/^(revert: )?(update|optimizate|feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
	log('error', 'commit format error');
	log(
		'error',
		'update|optimizate|feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release'
	);
	process.exit(1);
}
