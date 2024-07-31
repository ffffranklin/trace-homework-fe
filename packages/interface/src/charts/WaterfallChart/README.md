# Waterfall Chart

Waterfall chart is a data visualization that is useful to help you understand the cumulative effect of sequentially introduced positive or negative values.  The Waterfall Chart Component is a react component that supports two themes and two data formats.

## Usage

### API
```tsx
<WaterfallChart
  className?={string}
  theme={'light' | 'dark'}
  format={'currency' | 'number'}
  series={Series}
/>
```

### Theming

Warterfall Chart supports light and dark themes.  They can be configure via the component props

```tsx
// Light theme
<WaterfallChart theme={'light'} ... />

// Dark theme
<WaterfallChart theme={'dark'} ... />
```

