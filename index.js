const fs = require(`file-system`);

module.exports = (bundler) => {
	bundler.on(`bundled`, () => {
		// console.log(`Bundle created. Searching for assets folder.`);

		const staticDir = `assets`;
		const __rootName = __dirname.split(`/node_modules`)[0];

		if (fs.existsSync(staticDir)) {
			// console.log(
			// 	`Found assets folder. Beginning to copy files to ./dist`
			// );
			const copy = (filepath) => {
				const dest = filepath.replace(
					staticDir,
					`${__rootName}/dist/${staticDir}`
				);
				fs.copyFile(filepath, dest);
			};
			fs.recurseSync(staticDir, copy);
		} else {
			console.warn(
				`Static directory ${staticDir} does not exist.`
			);
		}
	});
};
