import { render, screen } from '@testing-library/react'
import DatePicker from './DatePicker'

test('DatePicker: render date field', () => {
    render(<DatePicker />);
    const datefield = screen.getByText(/Date/i);
    expect(datefield).toBeInTheDocument();
})

test('DatePicker: render previous month navigation control', () => {
    render(<DatePicker />);
    const previous = screen.getByTitle(/Previous Month/i);
    const next = screen.getByTitle(/Next Month/i);

    expect(previous).toBeInTheDocument()
})

test('DatePicker: render next month navigation control', () => {
    render(<DatePicker />);
    const next = screen.getByTitle(/Next Month/i);

    expect(next).toBeInTheDocument()
})