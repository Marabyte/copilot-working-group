import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import { ProductDetail } from './index';

// Mock the child components to isolate ProductDetail testing
vi.mock('../ProductNavigation', () => ({
  ProductNavigation: () => <div data-testid="product-navigation">ProductNavigation</div>,
}));

vi.mock('../ProductImage', () => ({
  ProductImage: () => <div data-testid="product-image">ProductImage</div>,
}));

vi.mock('../ProductInfo', () => ({
  ProductInfo: () => <div data-testid="product-info">ProductInfo</div>,
}));

vi.mock('../ProductMeta', () => ({
  ProductMeta: () => <div data-testid="product-meta">ProductMeta</div>,
}));

vi.mock('../ProductActions', () => ({
  ProductActions: () => <div data-testid="product-actions">ProductActions</div>,
}));

describe('ProductDetail Component', () => {

  it('should render without crashing', () => {
    renderWithProviders(<ProductDetail />);
    expect(screen.getByTestId('product-navigation')).toBeInTheDocument();
  });


  it('should render all sub-components together', () => {
    renderWithProviders(<ProductDetail />);
    
    expect(screen.getByTestId('product-navigation')).toBeInTheDocument();
    expect(screen.getByTestId('product-image')).toBeInTheDocument();
    expect(screen.getByTestId('product-info')).toBeInTheDocument();
    expect(screen.getByTestId('product-meta')).toBeInTheDocument();
    expect(screen.getByTestId('product-actions')).toBeInTheDocument();
  });

  it('should have the correct container structure with CSS classes', () => {
    const { container } = renderWithProviders(<ProductDetail />);
    
    // Check for container div
    const containerDiv = container.querySelector('div[class*="container"]');
    expect(containerDiv).toBeInTheDocument();
    
    // Check for product div
    const productDiv = container.querySelector('div[class*="product"]');
    expect(productDiv).toBeInTheDocument();
    
    // Check for infoSection div
    const infoSectionDiv = container.querySelector('div[class*="infoSection"]');
    expect(infoSectionDiv).toBeInTheDocument();
  });

  it('should render ProductInfo, ProductMeta, and ProductActions within infoSection', () => {
    const { container } = renderWithProviders(<ProductDetail />);
    
    const infoSection = container.querySelector('div[class*="infoSection"]');
    expect(infoSection).toBeInTheDocument();
    
    // Check that the info section contains the expected components
    const info = screen.getByTestId('product-info');
    const meta = screen.getByTestId('product-meta');
    const actions = screen.getByTestId('product-actions');
    
    expect(infoSection).toContainElement(info);
    expect(infoSection).toContainElement(meta);
    expect(infoSection).toContainElement(actions);
  });

  it('should render ProductNavigation outside the product section', () => {
    const { container } = renderWithProviders(<ProductDetail />);
    
    const containerDiv = container.querySelector('div[class*="container"]');
    const productDiv = container.querySelector('div[class*="product"]');
    const navigation = screen.getByTestId('product-navigation');
    
    expect(containerDiv).toContainElement(navigation);
    expect(productDiv).not.toContainElement(navigation);
  });

  it('should maintain proper component hierarchy', () => {
    const { container } = renderWithProviders(<ProductDetail />);
    
    // Get all elements
    const containerDiv = container.querySelector('div[class*="container"]') as HTMLElement;
    const productDiv = container.querySelector('div[class*="product"]') as HTMLElement;
    const infoSection = container.querySelector('div[class*="infoSection"]') as HTMLElement;
    
    // Verify hierarchy
    expect(containerDiv).toContainElement(productDiv);
    expect(productDiv).toContainElement(infoSection);
    expect(productDiv).toContainElement(screen.getByTestId('product-image'));
  });
});
