import { LitElement, html } from 'lit'
import { property, customElement, query } from 'lit/decorators.js'
import './hello-world.scss'

@customElement('hello-world')
export class HelloWorld extends LitElement {
  @property({ type: String }) message: string
  @query('bto-element') element: HTMLElement

  render() {
    return html `
      <h1>Hello ${this.message}</h1>
    `
  }
}