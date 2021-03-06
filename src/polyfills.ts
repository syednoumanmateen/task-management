/* tslint:disable */
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/** IE9, IE10 and IE11 requires all of the following polyfills. **/
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/weak-map';
import 'core-js/es6/set';
import 'core-js/es7/object';
import 'core-js/es7/math';

/** IE10 and IE11 requires the following for NgClass support on SVG elements */
import 'classlist.js';  // Run `npm install --save classlist.js`.

/** IE10 and IE11 requires the following for the Reflect API. */
import 'core-js/es6/reflect';


/** Evergreen browsers require these. **/
// Used for reflect-metadata in JIT. If you use AOT (and only Angular decorators), you can remove.
import 'core-js/es7/reflect';
import 'core-js/es7/array';

/**
 * Required to support Web Animations `@angular/platform-browser/animations`.
 * Needed for: All but Chrome, Firefox and Opera. http://caniuse.com/#feat=web-animation
 **/
import 'web-animations-js';  // Run `npm install --save web-animations-js`.

// Node.getRootNode() for IE
import 'get-root-node-polyfill/implement';

/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js/dist/zone';  // Included with Angular CLI.


// URL object polyfill
import 'url-polyfill';

// CustomEvent polyfill
import 'custom-event-polyfill';

import '@angular/localize/init';

/***************************************************************************************************
 * IE 11 fixes
 */
if (typeof window !== 'undefined' && typeof SVGElement !== 'undefined' && typeof SVGElement.prototype.contains === 'undefined') {
  SVGElement.prototype.contains = HTMLDivElement.prototype.contains;
}
// @ts-ignore
if (!!window['MSInputMethodContext'] && !!document['documentMode'] || document['documentMode'] <= 11) {
  // @ts-ignore
  window['MouseEvent'] = ((eventType, params) => {
    params = params || { bubbles: false, cancelable: false };
    const mouseEvent = document.createEvent('MouseEvent');
    mouseEvent.initMouseEvent(eventType, params.bubbles, params.cancelable, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    return mouseEvent;
  }) as any;
  window['MouseEvent'].prototype = Event.prototype as any;
}

if (!('remove' in Element.prototype)) {
  (Element as any).prototype.remove = function () {
    if (this.parentNode) {
      this.parentNode.removeChild(this)
    }
  }
}

/***************************************************************************************************
 * Global
 */
(window as any).global = window;

/***************************************************************************************************
 * APPLICATION IMPORTS
 */
