'use strict';
import _ from 'lodash';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const { merge: extend } = _;
import Generator from 'yeoman-generator';
import { default as buildModule } from '../build/index.js';
import { default as moduleModule } from '../module/index.js';
import { default as exampleModule } from '../example/index.js';
import { default as sharedModule } from '../shared/index.js';
import { default as testModule } from '../test/index.js';
import askName from 'inquirer-npm-name';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const generatorLicensePath = require.resolve('generator-license');

export default class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('name', {
      type: String,
      required: false,
      desc: 'Terraform module project name'
    });

    this.option('docker', {
      type: String,
      required: false,
      default: false,
      desc: 'Include the Dockerfile'
    });
  }

  async initializing() {
    this.props = {
      name: this.options.name || this.appname,
      docker: ((this.options.docker.toLowerCase() === 'true') || (this.options.docker.toLowerCase() === 'yes')).toString()
    };

    this.composeWith(generatorLicensePath, {defaultLicense: 'MIT' });


    const __dirname = dirname(dirname(fileURLToPath(import.meta.url)));

    // Dynamic imports for composeWith
    this.composeWith({ Generator: buildModule, path: `${__dirname}/build/index.js` });
    this.composeWith({ Generator: moduleModule, path: `${__dirname}/module/index.js` });
    this.composeWith({ Generator: exampleModule, path: `${__dirname}/example/index.js` });
    this.composeWith({ Generator: sharedModule, path: `${__dirname}/shared/index.js` });
    this.composeWith({ Generator: testModule, path: `${__dirname}/test/index.js` });
  }

  async _askForDockerFile() {
    return this.prompt([{
      type: 'confirm',
      name: 'docker',
      default: false,
      message: 'Would you like to include the Docker image file?'
    }]).then((answer) => {
      this.props.docker = answer.docker || this.props.docker;
    });
  }

  async prompting() {
    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Terraform module project Name',
      filter: _.kebabCase,
      validate(str) {
        return str.length > 0;
      }
    }];
    //return this._askForProjectName();
    return this.prompt(prompts).then((props) => {
      this.props.name = props.name || this.props.name;
    });
  }

  configuring() {
  }

  default() {
    // return this._askForDockerFile();
  }

  storage() {
    this.config.set('templateContext', this.props.docker);
  }

  writing() {
  }

  conflicts() {
  }

  install() {
  }

  end() {
    this.log('Thanks for using module generator for terraform.');
  }
};
