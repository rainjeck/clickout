
# CLICKOUT
Delete class if click outside element.

## Files
Include ```clickout.min.js```.

## Layout
```
<div class="js-clickout"></div>
```

## Usage
```
var clickout = new clickOut.default(options);
```

### Options

- ```className: '.js-clickout'``` - class name where outside click
- ```activeClass: 'is-active'``` - class name for delete
- ```after: function(elements) {}``` - after click