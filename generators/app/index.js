const Generator = require('yeoman-generator');
const walk = require('walk');
const path = require('path');
const fs = require('fs');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.option('add-missing-test-files', {type: Boolean, required: false, default: false});
    }

    writing() {
        if (!this.options['add-missing-test-files']) {
            return;
        }

        const targets = [];
        let root = fs.existsSync(this.destinationPath('src'))
            ? this.destinationPath('src')
            : this.destinationRoot();

        const options = {
            listeners: {
                files: (root, stats, next) => {
                    let isComponent = stats.some(stat => /\.component\.ts$/.test(stat.name));
                    let hasTest = stats.some(stat => /\.component\.unit\.ts$/.test(stat.name));

                    if (isComponent && !hasTest) {
                        targets.push({
                            baseDir: path.resolve(root, '../'),
                            name: path.basename(root),
                            unit: true
                        });
                    }

                    next();
                }
            },
            followLinks: false,
            filters: [
                'node_modules',
                '.idea',
                '.git',
                'tmp',
                'build',
                'dist',
                'coverage'
            ]
        };

        walk.walkSync(root, options);

        for (let target of targets) {
            this.composeWith(require.resolve('../component'), target);
        }
    }
};