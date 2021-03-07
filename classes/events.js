'use strict'

/**
 * @class
 * @name Events
 * @description Events handler. Used inside other classes. You'll probably only need the methods, not the constructor
 */

class Events {
    /**
     * Listeners added by .on
     * @private
     * @type {Object<String, Array<Function>>}
     */
    #listeners = {}

    constructor() {
        return this;
    }

    /**
     * Add event listeners. 
     * @name on
     * @example instance.on('connect', (returned) => { console.log(returned) })
     * @param {String} event Event name. The character '*' will trigger on all events
     * @param {Function} listener Event callback
     */
    on(event, listener) {
        if (typeof listener !== 'function') {
            throw new error("Listener must be a function")
        }

        if (!this.#listeners[event])
            this.#listeners[event] = [];

        this.#listeners[event].push(listener);
    }

    /**
     * Trigger a specific event.
     * @name trigger
     * @example instance.trigger('connect', ["param1", "param2"])
     * @param {String} event Event name.
     * @param {Array=} content Parameters to return to all handlers
     * @returns {Boolean}
     */
    trigger(event, content = []) {
        if (!this.#listeners[event] && event != '*')
            return false;

        const eventsList = (event == "*") ? Object.keys(this.#listeners) : [event];

        eventsList.forEach(ev => {
            this.#listeners[ev].forEach((fn) => {
                fn.apply(null, content);
            })
        })
    }
}

module.exports = Events;