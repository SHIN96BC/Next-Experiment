import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '@App/page';

describe('Test Page Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', { level: 1, name: 'Home' });

    expect(heading).toBeInTheDocument();
  });
});
