import { html } from 'lit'

import '/@/src/hello-world'

export default {
  title: 'HelloWorld',
  component: 'hello-world'
}

export const HelloWorld = () => {
  return html `<hello-world message="World"></hello-world>`
}