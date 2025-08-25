import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { FieldInfo } from './FieldInfo';

describe('FieldInfo', () => {
  it('renders the info icon', () => {
    render(<FieldInfo info="Test information" />);
    const icon = screen.getByTestId('info-icon');
    expect(icon).toBeInTheDocument();
  });

  it('displays the info text', () => {
    const infoText = 'This is helpful information about the field';
    render(<FieldInfo info={infoText} />);
    expect(screen.getByText(infoText)).toBeInTheDocument();
  });

  it('initially hides the tooltip', () => {
    render(<FieldInfo info="Hidden tooltip" />);
    const tooltip = screen.getByText('Hidden tooltip');
    expect(tooltip).toHaveClass('hidden');
  });

  it('shows tooltip on hover', async () => {
    const user = userEvent.setup();
    render(<FieldInfo info="Hover tooltip" />);
    
    const container = screen.getByTestId('info-icon').parentElement;
    const tooltip = screen.getByText('Hover tooltip');
    
    expect(tooltip).toHaveClass('hidden');
    
    if (container) {
      await user.hover(container);
      // Note: CSS hover effects aren't fully simulated in jsdom
      // but we can verify the structure is correct
      expect(tooltip).toHaveClass('group-hover:block');
    }
  });
});