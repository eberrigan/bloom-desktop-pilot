import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PlantQrCodeTextBox } from './PlantQrCodeTextBox';

describe('PlantQrCodeTextBox', () => {
  it('renders with empty value when qrCode is null', () => {
    const mockOnChange = vi.fn();
    render(<PlantQrCodeTextBox qrCode={null} plantQrCodeChanged={mockOnChange} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');
  });

  it('renders with provided qrCode value', () => {
    const mockOnChange = vi.fn();
    const qrCode = 'PLANT-12345';
    render(<PlantQrCodeTextBox qrCode={qrCode} plantQrCodeChanged={mockOnChange} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('PLANT-12345');
  });

  it('calls plantQrCodeChanged when input value changes', () => {
    const mockOnChange = vi.fn();
    render(<PlantQrCodeTextBox qrCode="" plantQrCodeChanged={mockOnChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'NEW-QR-CODE' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('NEW-QR-CODE');
  });

  it('updates input value when qrCode prop changes', () => {
    const mockOnChange = vi.fn();
    const { rerender } = render(
      <PlantQrCodeTextBox qrCode="OLD-CODE" plantQrCodeChanged={mockOnChange} />
    );
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('OLD-CODE');
    
    rerender(<PlantQrCodeTextBox qrCode="NEW-CODE" plantQrCodeChanged={mockOnChange} />);
    expect(input).toHaveValue('NEW-CODE');
  });
});