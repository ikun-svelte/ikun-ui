import shell from 'shelljs';
export async function runCommand(command, dir) {
	return new Promise((resolve, reject) => {
		try {
			shell.exec(
				command,
				{
					cwd: dir,
					shell: true,
					encoding: 'GBK',
					async: true,
					silent: true
				},
				(code, output, err) => {
					if (code === 0) {
						resolve(true);
					} else if (err) {
						reject(err);
					}

					const outputStr = output.toString();
					if (outputStr) {
						console.log(outputStr);
					}
				}
			);
		} catch (e) {
			reject(e.message);
		}
	});
}
