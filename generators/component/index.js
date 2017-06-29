'use strict';

const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.option('name', {type: String, required: true});
        this.option('baseDir', {type: String, required: false, default: this.destinationRoot()});
        this.option('unit', {type: Boolean, required: false, default: false});
    }

    writing() {
        if (this.options.baseDir) {
            this.destinationRoot(this.options.baseDir);
        }

        const name = this.options.name
            .replace('Component', '')
            .replace(/^./, str => str.toUpperCase());
        const filename = name.replace(/^./, str => str.toLowerCase());
        const data = {
            selector: this._getSelector(filename),
            name,
            nameLower: filename
        };
        const dir = this.destinationPath(filename);

        mkdirp.sync(dir);

        this.fs.copyTpl(
            this.templatePath('unit.ts'),
            this.destinationPath(dir, `${data.nameLower}.component.unit.ts`),
            data
        );

        if (!this.options.unit) {
            this.fs.copyTpl(
                this.templatePath('component.ts'),
                this.destinationPath(dir, `${data.nameLower}.component.ts`),
                data
            );

            this.fs.copyTpl(
                this.templatePath('module.ts'),
                this.destinationPath(dir, `${data.nameLower}.module.ts`),
                data
            );

            this.fs.write(this.destinationPath(dir, `${data.nameLower}.template.ng2.html`), '');
        }
    }

    _getSelector(name) {
        return name.replace(/([A-Z])/g, '-$1').toLowerCase();
    }
};