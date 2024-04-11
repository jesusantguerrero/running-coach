import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloWorld from '../TemplateSelector.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, { props:
			{
				distance: null,
				msg: 'Hello Vitest'
			} })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
