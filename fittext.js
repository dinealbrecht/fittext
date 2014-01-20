/* global exports, document, window */

(function(exports, _) {
    'use strict';

    /**
     * Fittext
     *
     * Example Usage:
     * var fittext = new Fittext(element, 0.2);
     *
     * @param object element - element to apply fittext
     * @param number factor - resizing factor
     * @param object options - options
     * @return object - Fittext
     */
    function Fittext(element, factor, options) {
        this.element    = element;
        this.factor     = factor;
        this.active     = true;
        this.settings   = _.extend({}, Fittext.defaults, options);
        
        element.attributes['data-fittext'] = this;

        if (this.settings.active)
            this.activate();
    }

    /**
     * resize
     * should be called on window resize
     *
     * Example Usage:
     * textResizer.resize();
     */
    Fittext.prototype.getMinWidth = function() {
        return this.element.getAttribute('data-minwidth');
    };

    /**
     * resize
     * should be called on window resize
     *
     * Example Usage:
     * textResizer.resize();
     */
    Fittext.prototype.doresize = function() {
        this.element.style.fontSize = Math.max(Math.min(this.element.clientWidth / (this.factor*10), parseFloat(this.settings.maxFontSize)), parseFloat(this.settings.minFontSize)) + 'px';
    };

    /**
     * conditionalresize
     * should be called on window resize
     *
     * Example Usage:
     * textResizer.conditionalresize();
     */
    Fittext.prototype.conditionalresize = function() {
        if (window.innerWidth > this.settings.minwidth) {
            this.element.style.fontSize = Math.max(Math.min(this.element.clientWidth / (this.factor*10), parseFloat(this.settings.maxFontSize)), parseFloat(this.settings.minFontSize)) + 'px';
        } else {
            this.element.style.fontSize = '';
        }
    };

    /**
     * activate
     * activate resize event listener
     *
     * Example Usage:
     * fittextElement.activate();
     */
    Fittext.prototype.activate = function() {
        if ( this.settings.minwidth ) {
            window.addEventListener('resize', this.conditionalresize.bind(this));
            this.conditionalresize();
        } else {
            window.addEventListener('resize', this.doresize.bind(this));
            this.doresize();
        }
    };

    Fittext.defaults = {
        'minFontSize' : -1/0,
        'maxFontSize' : 1/0,
        'active' : true,
        'startSize' : 0
    };

    exports.Fittext = Fittext;
})(exports, exports._);