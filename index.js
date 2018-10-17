const fs = require(`file-system`);
const path = require(`path`);

module.exports = (bundler) => {
	bundler.on(`bundled`, (bundle) => {
		const copyDir = (staticDir, bundleDir) => {
			if (fs.existsSync(staticDir)) {
				const copy = (filepath, relative, filename) => {
					const dest = filepath.replace(staticDir, bundleDir);
					if (!filename) {
						fs.mkdir(filepath, dest);
					} else if (fs.existsSync(dest)) {
						const destStat = fs.statSync(dest);
						const srcStat = fs.statSync(filepath);
						if (destStat.mtime <= srcStat.mtime) {
							// File was modified - let's copy it and inform about overwriting.
							console.info(
								`Info: Static file '${filepath}' do already exist in '${bundleDir}'. Overwriting.`
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
					`Warning: Static directory '${staticDir}' do not exist. Skipping.`
				);
			}
		};

		const staticDir = `assets`;
		const bundleDir = path.dirname(bundle.name);
		copyDir(staticDir, bundleDir);
	});
};
