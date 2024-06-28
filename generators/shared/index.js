'use strict';

import Generator from 'yeoman-generator';

export default class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  writing() {
    this.fs.copy(
      this.templatePath('.gitattributes'),
      this.destinationPath('.gitattributes')
    );

    this.fs.copy(
      this.templatePath('.gitignore.tpl'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    );
  }
};
