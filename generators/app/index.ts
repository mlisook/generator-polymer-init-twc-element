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
        ];

        this.props = await this.prompt(prompts);
        this.props.elementClassName = this.props.name.replace(
            /(^|-)(\w)/g,
            (_match: string, _p0: string, p1: string) => p1.toUpperCase());
    }

    writing() {
        const name = this.props.name;

        this.fs.copyTpl(
            `${this.templatePath()}/**/?(.)!(_)*`,
            this.destinationPath(),
            this.props);

        this.fs.copyTpl(
            this.templatePath('_element.ts'), `${name}.ts`, this.props);
        this.fs.copyTpl(
            this.templatePath('_element.template.html'), `${name}.template.html`, this.props);

        this.fs.copyTpl(
            this.templatePath('test/_element_test.html'),
            `test/${name}_test.html`,
            this.props);

        this.fs.copyTpl(
            this.templatePath('test/index.html'), `test/index.html`, this.props);

        this.installDependencies({
            npm: true,
            bower: true,
            yarn: false
        });
    }
}

module.exports = GeneratorElementTsTwc;