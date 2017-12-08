# Developer Information for \<<%= name %>\>
<%= description %>

## Typescript and TWC
`<%= name %>` is developed using the Typescript language and the `twc` design time compiler ("Typed Web Components" - see [Draccoz/twc](https://github.com/Draccoz/twc) for details). TSC transforms ts classes into native ES6 class based polymer 2.0 modules.

The [TWC Wiki](https://github.com/Draccoz/twc/wiki) has much more information on using `twc`.

## Building <%= name %>
To build `<%= name %>` just enter the project root dir and execute the following in the terminal:
```
npm run twc
```
It works just as tsc, reading configuration from tsconfig.json file. The only difference is it outputs .html files with Polymer modules instead of plain .js.  In this case you will get a file, `<%= name %>.html` which is an ordinary Polymer 2.0 format element.

## Generating Types for Polymer Elements
You may be including other Polymer Elements in your project. To generate Typescript definition files for those elements, first install them (`bower install --save ...`), then run the `potts` command:
```
npm run potts
```

`potts` will generate basic typings for all of the Polymer elements in `bower.json` and save the typings to the `potts.d.ts` file in the root of your project. You can add that file to the `include` section of your `tsconfig.json`.

## Serve Locally

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then use the serve command to start a local web server for the element:

```
$ polymer serve
```

## Running Tests

```
$ polymer test
```

The element is set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run the test suite locally.