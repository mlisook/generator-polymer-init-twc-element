import * as chalk from 'chalk';
import * as path from 'path';
import Generator = require('yeoman-generator');

class GeneratorElementTsTwc extends Generator {

    props: any;

    constructor(args: string | string[], opts: any) {
        super(args, opts);
    }
    method1() {
        this.log('method 1 just ran');
    }

    async prompting(): Promise<void> {
        const prompts = [
            {
                name: 'name',
                type: 'input',
                message: `Element name`,
                default:
                this.appname.replace(/\s+/g, '-'),
                validate: (name: string) => {
                    const nameContainsHyphen = name.includes('-');
                    if (!nameContainsHyphen) {
                        this.log(
                            '\nUh oh, custom elements must include a hyphen in ' +
                            'their name. Please try again.');
                    }
                    return nameContainsHyphen;
                },
            },
            {
                type: 'input',
                name: 'description',
                message: 'Brief description of the element',
            },
            {
                type: 'list',
                name: 'templateLocation',
                message: 'Where do you want your HTML template?',
                choices: [{
                    name: 'as a string value in the @template() decorator',
                    value: 'atTemplate'
                }, {
                    name: 'in an HTML file named your-element-name.template.html',
                    value: 'inHTML'
                }, {
                    name: 'return a value from the template() method',
                    value: 'templateFn'
                }],
                default: 1
            }
        ];

        this.props = await this.prompt(prompts);
        this.props.elementClassName = this.props.name.replace(
            /(^|-)(\w)/g,
            (_match: string, _p0: string, p1: string) => p1.toUpperCase());
        this.props.templateText = `
<style>
    :host {
        display: block;
    }
</style>

<h2>[[aSampleProperty]]</h2>
        `;
    }

    writing() {
        const name = this.props.name;

        this.fs.copyTpl(
            `${this.templatePath()}/**/?(.)!(_)*`,
            this.destinationPath(),
            this.props);

        this.fs.copyTpl(
            this.templatePath('_element.ts'), `${name}.ts`, this.props);

        if (this.props.templateLocation == 'inHTML') {
            this.fs.copyTpl(
                this.templatePath('_element.template.html'), `${name}.template.html`, this.props);
        }

        this.fs.copyTpl(
            this.templatePath('test/_element_props.html'),
            `test/${name}_props.html`,
            this.props);

        this.fs.copyTpl(
            this.templatePath('test/index.html'), `test/index.html`, this.props);
    }

    install() {
        this.log(chalk.bold('\nProject generated!'));
        this.log('Installing NPM and Bower dependencies...');
        this.installDependencies({
            npm: true,
            bower: true,
            yarn: false
        });
    }

    end() {
        this.log(chalk.bold('\nSetup Complete!'));
        this.log(
            'Please review Develop.md for information about developing your element with TWC.\n');
        this.log('Run the twc command from the project root to build your element.\n');
    }
}

module.exports = GeneratorElementTsTwc;