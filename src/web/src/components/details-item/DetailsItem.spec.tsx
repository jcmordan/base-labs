import { DetailsItem } from './DetailsItem'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('DetailsItem', () => {
  it('should render', () => {
    render(<DetailsItem label="Test Label" value="Test Value" />)

    expect(screen.getByTestId('details-item')).toBeInTheDocument()
    expect(screen.getByTestId('details-item-label')).toHaveTextContent('Test Label:')
    expect(screen.getByTestId('details-item-value')).toHaveTextContent('Test Value')
  })
})
