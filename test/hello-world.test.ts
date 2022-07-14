import { html } from 'lit'
import { fixture, fixtureCleanUp } from './utils'

import type { HelloWorld } from '/@/src/types'

import '/@/src/hello-world'

describe('HelloWorld', () => {

  afterEach(() => {
    fixtureCleanUp()
  })

  it('should have element', async () => {
    const element = await fixture(html `<hello-world></hello-world>`) as Element

    expect(element).toBeTruthy()
    expect(element.shadowRoot).toBeTruthy()
  })

  it('should have default attributes and props', async () => { 
    const element = await fixture(html `<hello-world></hello-world>`) as HelloWorld & Element

    expect(element.message).toBeNull()
    expect(element.getAttribute('message')).toBeNull()
  })

  it('should have attributes and props', async () => { 
    const message = 'World'

    const element = await fixture(html `<hello-world message=${message}></hello-world>`) as HelloWorld & Element

    expect(element.message).toStrictEqual(message)
    expect(element.getAttribute('message')).toStrictEqual(message)
  })

})