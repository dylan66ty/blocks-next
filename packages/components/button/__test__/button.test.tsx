import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { Button } from '../index'
import { ButtonGroup } from '../../button-group'

describe('Button.vue', () => {
  it('type', () => {
    const wrapper = mount(() => <Button type="primary" />)
    expect(wrapper.classes()).toContain('bn-button--primary')
  })

  it('slot', () => {
    const wrapper = mount(() => <Button>value</Button>)
    expect(wrapper.text()).toContain('value')
  })

  it('loading', () => {
    const wrapper = mount(() => <Button loading />)
    expect(wrapper.classes()).toContain('is-loading')
  })

  it('size', () => {
    const wrapper = mount(() => <Button size="large" />)
    expect(wrapper.classes()).toContain('is-large')
  })

  it('plain', () => {
    const wrapper = mount(() => <Button plain />)
    expect(wrapper.classes()).toContain('is-plain')
  })

  it('round', () => {
    const wrapper = mount(() => <Button shape="round" />)
    expect(wrapper.classes()).toContain('is-round')
  })

  it('link', async () => {
    const wrapper = mount(() => <Button link />)

    expect(wrapper.classes()).toContain('is-link')
  })

  it('disabled', async () => {
    const wrapper = mount(() => <Button disabled />)
    expect(wrapper.classes()).toContain('is-disabled')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('handle click', async () => {
    const wrapper = mount(() => <Button />)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toBeDefined()
  })

  it('click is Promise auto loading', async () => {
    const handler = () => new Promise((resolve) => setTimeout(resolve, 1000))
    const wrapper = mount(() => <Button onClick={handler} />)
    await wrapper.trigger('click')
    expect(wrapper.classes()).toContain('is-loading')
  })

  it('Button Group', async () => {
    const wrapper = mount(() => (
      <ButtonGroup>
        <Button>Prev</Button>
        <Button>Next</Button>
      </ButtonGroup>
    ))
    expect(wrapper.findAll('button').length).toBe(2)
  })
})
