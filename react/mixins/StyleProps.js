import React from 'react';
import _ from 'lodash';

// Enumerated props help encourage/enforce styling consistency,
// and speed UI development through a limited set of standard values.
// If these are insufficient, you can always set arbitrary CSS value through the `style` attribute as usual.

export default opts => ({
  propTypes: {
    // color palette documented in Styleguide/SgColor. `bgColor` accepts named theme and
    // palette colors (all tints), eg 'action-primary' or 'sky-300'
    bgColor: React.PropTypes.string,
    childrenFlexGrow: React.PropTypes.oneOf([0, 1, 2]),
    childrenFlexShrink: React.PropTypes.oneOf([0, 1, 2]),
    // color palette documented in Styleguide/SgColor. `color` accepts named theme and
    // palette colors (all tints), eg 'action-primary' or 'sky-300'
    color: React.PropTypes.string,
    // highly visible borders and backgrounds for cells
    debug: React.PropTypes.bool,
    display: React.PropTypes.oneOf([
      // primarily flexbox shorthand, affects multiple properties. Standard non-flexbox
      // `display` values included for consistency. For the full `display` values, (eg
      // {display:table-cell), just use the style prop.
      'column', 'inline-column', 'inline-row', 'row',
      'block','inline', 'inline-block', 'none']),
    elevation: React.PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
    elevationText: React.PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
    fontFamily: React.PropTypes.oneOf(['content', 'header', 'monospace']),
    fontSize: React.PropTypes.oneOf([
      'small', 'label', 'content', 'large', 'header',
      'subtitle', 'title', 'display1', 'display2']),
    fontWeight: React.PropTypes.oneOf([
      // Not all weights are necessarily available for all fonts or font styles (eg
      // black+italic). Browser font-weight approximation may occur.
      'thin', 'light', 'regular', 'medium', 'semibold', 'bold', 'black']),
    letterSpacing: React.PropTypes.oneOf([
      'tight', 'normal', 'loose', 'loose-x',
    ]),
    lineHeight: React.PropTypes.oneOf([
      'auto', 'tight', 'normal', 'loose', 'loose-x'
    ]),
    // MARGIN vs PADDING - as a general rule, STRONGLY prefer using padding.
      // Try to describe a component's layout within itself, and then wrap that component in layout elements using padding.
      // Padding is often easier than margin to work with in a flexbox-y component world,
      // because it a) doesn't collapse (or not collapse) unpredictably with proximate components (not limited to just siblings),
      // and b) behaves more predictably inside a flexbox.
    marginH: React.PropTypes.oneOf([
      'contentH-desktop', 'contentH-tablet', 'contentH-phone',
      0, 4, 8, 16, 24, 32, 48, 64, 80, 96, 128]),
    marginV: React.PropTypes.oneOf([0, 4, 8, 16, 24, 32, 48, 64, 80, 96, 128]),
    paddingH: React.PropTypes.oneOf([
      'contentH-desktop', 'contentH-tablet', 'contentH-phone',
      0, 4, 8, 16, 24, 32, 48, 64, 80, 96, 128]),
    paddingV: React.PropTypes.oneOf([0, 4, 8, 16, 24, 32, 48, 64, 80, 96, 128]),
    scroll: React.PropTypes.oneOf(['x', 'y']),
    typography: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.oneOf([
        'small', 'label', 'content', 'large', 'header', 'subtitle',
        'title', 'display1', 'display2']),
    ]),
    // `userSelect`: set `true` to disable user selection of text. Can be useful for interactive click
    // targets (eg <div> elements that behave like buttons). Make sure this doesn't wrap any
    // content that might be useful to copy-paste!
    userSelect: React.PropTypes.bool,
    zIndex: React.PropTypes.oneOf([0, 1, 2, 3, 4, 5])
  },

  // map props to CSS class strings
  // TODO re-write css classes without camelCasing to further simplify this
  styleProps: {
    'bgColor': 'bgColor-',
    'childrenFlexGrow': 'childrenFlexGrow-',
    'childrenFlexShrink': 'childrenFlexShrink-',
    'color': 'color-',
    'debug': null,
    'display': (prop) => (prop === true && 'row') || prop,
    'elevation': 'elevation-',
    'elevationText': 'elevationText-',
    'fontFamily': 'font-family-',
    'fontSize': 'font-size-',
    'fontWeight': 'font-weight-',
    'letterSpacing': 'letter-spacing-',
    'lineHeight': 'line-height-',
    'marginH': 'marginH-',
    'marginV': 'marginV-',
    'paddingH': 'paddingH-',
    'paddingV': 'paddingV-',
    'scroll': 'scroll-',
    'typography': (prop) => (prop === true && 'typography') || ('t-' + prop),
    'userSelect': (prop) => prop === false && 'userSelect-false',
    'zIndex': 'zIndex-',
  },

  componentWillMount() {
    this.addClassnameRenderer('style', (props) => (
      _.pairs(_.omit(this.styleProps, _.get(opts, 'except', [])))
       .map(pair => {
         let [k, v] = pair;
         if (props[k] !== undefined) {
           if (typeof v == 'string') {
             return v + props[k];
           } else if (typeof v == 'function') {
             return v(props[k]);
           }
           return props[k];
         }
       })
       .filter(e => !!e)
    ));
  },
});
