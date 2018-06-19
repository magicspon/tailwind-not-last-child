# Not last child

Currently this only works with padding and margin

## Installation

Add this plugin to your project:

```bash
# Install via npm
npm install --save-dev tailwind-not-last-child
```

It will generate a not:(:last-child) selector for each of the padding/margin properties set in your tailwind config

eg.

```html
	<div class="not-last-mb-0-75"></div>
```

## Usage

```js
require('tailwind-not-last-child')({
	notable: [
		{
			type: 'margin',
			char: 'm'
		},
		{
			type: 'padding',
			char: 'p'
		}
	]
})
```

```
.not\:last-mb-0-75:not(:last-child) {
    margin-bottom: .9375rem;
}
```
