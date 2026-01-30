import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import { ProductDetail } from './index';
import { QueryClient } from '@tanstack/react-query';

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
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  it('should render without crashing', () => {
    renderWithProviders(<ProductDetail />, { queryClient });
    expect(screen.getByTestId('product-navigation')).toBeInTheDocument();
  });

  it('should render ProductNavigation component', () => {
    renderWithProviders(<ProductDetail />, { queryClient });
    const navigation = screen.getByTestId('product-navigation');
    expect(navigation).toBeInTheDocument();
    expect(navigation).toHaveTextContent('ProductNavigation');
  });

  it('should render ProductImage component', () => {
    renderWithProviders(<ProductDetail />, { queryClient });
    const image = screen.getByTestId('product-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveTextContent('ProductImage');
  });

  it('should render ProductInfo component', () => {
    renderWithProviders(<ProductDetail />, { queryClient });
    const info = screen.getByTestId('product-info');
    expect(info).toBeInTheDocument();
    expect(info).toHaveTextContent('ProductInfo');
  });

  it('should render ProductMeta component', () => {
    renderWithProviders(<ProductDetail />, { queryClient });
    const meta = screen.getByTestId('product-meta');
    expect(meta).toBeInTheDocument();
    expect(meta).toHaveTextContent('ProductMeta');
  });

  it('should render ProductActions component', () => {
    renderWithProviders(<ProductDetail />, { queryClient });
    const actions = screen.getByTestId('product-actions');
    expect(actions).toBeInTheDocument();
    expect(actions).toHaveTextContent('ProductActions');
  });

  it('should render all sub-components together', () => {
    renderWithProviders(<ProductDetail />, { queryClient });
    
    expect(screen.getByTestId('product-navigation')).toBeInTheDocument();
    expect(screen.getByTestId('product-image')).toBeInTheDocument();
    expect(screen.getByTestId('product-info')).toBeInTheDocument();
    expect(screen.getByTestId('product-meta')).toBeInTheDocument();
    expect(screen.getByTestId('product-actions')).toBeInTheDocument();
  });

  it('should have the correct container structure with CSS classes', () => {
    const { container } = renderWithProviders(<ProductDetail />, { queryClient });
    
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
    const { container } = renderWithProviders(<ProductDetail />, { queryClient });
    
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
    const { container } = renderWithProviders(<ProductDetail />, { queryClient });
    
    const containerDiv = container.querySelector('div[class*="container"]');
    const productDiv = container.querySelector('div[class*="product"]');
    const navigation = screen.getByTestId('product-navigation');
    
    expect(containerDiv).toContainElement(navigation);
    expect(productDiv).not.toContainElement(navigation);
  });

  it('should maintain proper component hierarchy', () => {
    const { container } = renderWithProviders(<ProductDetail />, { queryClient });
    
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
