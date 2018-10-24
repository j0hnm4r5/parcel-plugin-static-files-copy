const fs = require(`file-system`);

module.exports = (bundler) => {
	bundler.on(`bundled`, () => {
		console.log(`Bundle created. Searching for assets folder.`);

		const staticDir = `assets`;
		const __rootName = __dirname.split(`/node_modules`)[0];

		if (fs.existsSync(staticDir)) {
			console.log(
				`Found assets folder. Beginning to copy files to ./dist`
			);
			const copy = (filepath, relative, filename) => {
				const dest = filepath.replace(
					staticDir,
					`${__rootName}/dist/${staticDir}`
				);
				if (!filename) {
					fs.mkdir(filepath, dest);
				} else if (fs.existsSync(dest)) {
					const destStat = fs.statSync(dest);
					const srcStat = fs.statSync(filepath);
					if (destStat.mtime <= srcStat.mtime) {
						console.info(
							`Info: Static file ${filepath} already exists in ${bundleDir}. Overwriting.`
						);
						fs.copyFile(filepath, dest);
					}
				} else {
					fs.copyFile(filepath, dest);
				}
			};
			fs.recurseSync(staticDir, copy);
		} else {
			console.warn(
				`Warning: Static directory ${staticDir} does not exist. Skipping.`
			);
		}
	});
};
