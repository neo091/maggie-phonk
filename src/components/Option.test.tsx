import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Option from './Option'

describe('Option', () => {
  it('renders text correctly', () => {
    render(
      <Option
        text="Opción A"
        onClick={() => {}}
        disabled={false}
        isCorrect={false}
      />
    )
    expect(screen.getByText('Opción A')).toBeDefined()
  })

  it('calls onClick when clicked and not disabled', () => {
    let clicked = false
    render(
      <Option
        text="Test Option"
        onClick={() => { clicked = true }}
        disabled={false}
        isCorrect={false}
      />
    )
    fireEvent.click(screen.getByText('Test Option'))
    expect(clicked).toBe(true)
  })

  it('does not call onClick when disabled', () => {
    let clicked = false
    render(
      <Option
        text="Disabled Option"
        onClick={() => { clicked = true }}
        disabled={true}
        isCorrect={false}
      />
    )
    fireEvent.click(screen.getByText('Disabled Option'))
    expect(clicked).toBe(false)
  })

  it('shows correct styling when revealed and isCorrect', () => {
    render(
      <Option
        text="Correct Answer"
        onClick={() => {}}
        disabled={false}
        isCorrect={true}
        revealed={true}
      />
    )
    const button = screen.getByText('Correct Answer')
    expect(button.className).toContain('bg-gradient-to-r from-green-500')
  })

  it('shows disabled styling when disabled', () => {
    render(
      <Option
        text="Disabled Option"
        onClick={() => {}}
        disabled={true}
        isCorrect={false}
      />
    )
    const button = screen.getByText('Disabled Option')
    expect(button.className).toContain('cursor-not-allowed')
    expect(button.className).toContain('text-slate-500')
  })
})
