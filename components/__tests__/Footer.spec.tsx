import { render } from '@testing-library/react';
import { describe, expect, it } from 'bun:test';
import { Footer } from '../Footer';

describe('test', () => {
  it('should have the "made with love" message', () => {
    const component = render(<Footer />);

    expect(component.getByText('Made with ❤️ by the Ribbon Studios Team~')).toBeTruthy();
  });

  it('should have a link to the support page', () => {
    const component = render(<Footer />);

    expect(component.getByText('Support')).toBeTruthy();

    const link = component.getByText('Support').parentElement as HTMLAnchorElement;
    expect(link.href).toEqual('https://github.com/ribbon-studios/charcoal.gg/discussions');
  });

  it('should have a link to the source code', () => {
    const component = render(<Footer />);

    expect(component.getByText('Source Code')).toBeTruthy();

    const link = component.getByText('Source Code').parentElement as HTMLAnchorElement;
    expect(link.href).toEqual('https://github.com/ribbon-studios/charcoal.gg');
  });
});
