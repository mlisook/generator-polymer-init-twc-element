import { CustomElement } from "twc/polymer"; 
import "bower:polymer/polymer-element.html";
import { attr, compute, notify, observe, style, template } from 'twc/polymer';

/**
 * `<%= name %>` 
 * <%= description %>
 *
 * @customElement
 * @polymer 
 * @demo demo/index.html
 */
@CustomElement()
@template('<%= name %>.template.html')
class <%= elementClassName %> extends Polymer.Element {
  /**
   * A sample property
   */
  aSampleProperty: string = "an initial value";
  /**
   * sample computed property
   * illustrates a computed property declaration, using reflect to 
   * attribute and notify.
   */
  @compute((aSampleProperty: string) => { return aSampleProperty == "foo"; }) @attr() @notify() fooStatus: boolean;

  connectedCallback(): void {
      super.connectedCallback();
      // do more stuff
  }

  /**
   * a sample method 
   */
  aSampleMethod(n: number):string {
      return (n + 1).toString();
  }
}