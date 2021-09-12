import { LitElement, html, css } from 'lit'
import { property } from 'lit/decorators.js'

import './hello-world.scss'

export class HelloWorld extends LitElement {

  @property({ type: String, attribute: true, reflect: true }) message: string = ''

  render() {
    return html `
      <h1>Hello ${this.message}</h1>
    `
  }
}

customElements.define('hello-world', HelloWorld)