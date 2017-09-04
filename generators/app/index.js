"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require("yeoman-generator");
class GeneratorElementTsTwc extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }
    method1() {
        this.log('method 1 just ran');
    }
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            const prompts = [
                {
                    name: 'name',
                    type: 'input',
                    message: `Element name`,
                    default: this.appname.replace(/\s+/g, '-'),
                    validate: (name) => {
                        const nameContainsHyphen = name.includes('-');
                        if (!nameContainsHyphen) {
                            this.log('\nUh oh, custom elements must include a hyphen in ' +
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
            this.props = yield this.prompt(prompts);
            this.props.elementClassName = this.props.name.replace(/(^|-)(\w)/g, (_match, _p0, p1) => p1.toUpperCase());
        });
    }
    writing() {
        const name = this.props.name;
        this.fs.copyTpl(`${this.templatePath()}/**/?(.)!(_)*`, this.destinationPath(), this.props);
        this.fs.copyTpl(this.templatePath('_element.ts'), `${name}.ts`, this.props);
        this.fs.copyTpl(this.templatePath('_element.template.html'), `${name}.template.html`, this.props);
        this.fs.copyTpl(this.templatePath('test/_element_test.html'), `test/${name}_test.html`, this.props);
        this.fs.copyTpl(this.templatePath('test/index.html'), `test/index.html`, this.props);
        this.installDependencies({
            npm: true,
            bower: true,
            yarn: false
        });
    }
}
module.exports = GeneratorElementTsTwc;
//# sourceMappingURL=index.js.map