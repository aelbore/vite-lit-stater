import { LitElement, html, css } from 'lit'
import { property, customElement, query } from 'lit/decorators.js'

/// this does not work on build-storybook
/// need to check the plugin
import './hello-world.scss'

@customElement('hello-world')
export class HelloWorld extends LitElement {
  @property({ type: String }) message: string
  @query('bto-element') element: HTMLElement

  /// add this when build-storybook
  // static styles = css `
  //   h1 {
  //     color: blue ;
  //     border: 1px solid green;
  //     padding: 10px;
  //   }
  // `

  render() {
    return html `
      <h1>Hello ${this.message}</h1>
    `
  }
}