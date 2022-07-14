import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '/@/src/hello-world.scss'

@customElement('hello-world')
export class HelloWorldElement extends LitElement {
  @property({ type: String }) message: string

  render() {
    return html `<h1>Hello ${this.message}</h1>`
  }
}