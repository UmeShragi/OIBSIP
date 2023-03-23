
import debounce from './utils/debounce';
import isFunction from './utils/isFunction';
import update from './methods/update';
import destroy from './methods/destroy';
import enableEventListeners from './methods/enableEventListeners';
import disableEventListeners from './methods/disableEventListeners';
import Defaults from './methods/defaults';
import placements from './methods/placements';

export default class Popper {
  
    @class Popper
    @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
    @param {HTMLElement} popper - The HTML element used as popper.
   @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
    @return {Object} instance - The generated Popper.js instance
   
  constructor(reference, popper, options = {}) {
    this.update = debounce(this.update.bind(this));
    this.options = { ...Popper.Defaults, ...options };
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: [],
    };
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;
    this.options.modifiers = {};
    Object.keys({
      ...Popper.Defaults.modifiers,
      ...options.modifiers,
    }).forEach(name => {
      this.options.modifiers[name] = {
        ...(Popper.Defaults.modifiers[name] || {}),
        ...(options.modifiers ? options.modifiers[name] : {}),
      };
    });


    this.modifiers = Object.keys(this.options.modifiers)
      .map(name => ({
        name,
        ...this.options.modifiers[name],
      }))
      .sort((a, b) => a.order - b.order);
    this.modifiers.forEach(modifierOptions => {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(
          this.reference,
          this.popper,
          this.options,
          modifierOptions,
          this.state
        );
      }
    });
    this.update();

    const eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  update() {
    return update.call(this);
  }
  destroy() {
    return destroy.call(this);
  }
  enableEventListeners() {
    return enableEventListeners.call(this);
  }
  disableEventListeners() {
    return disableEventListeners.call(this);
  }

    @method scheduleUpdate
    @memberof Popper
  
  scheduleUpdate = () => requestAnimationFrame(this.update);
@static
    @private
    @type {Object}
    @deprecated since version 1.8
    @member Utils
    @memberof Popper
  static Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;

  static placements = placements;

  static Defaults = Defaults;
}
 @name referenceObject
 @property {Function} data.getBoundingClientRect
  @property {number} data.clientWidth
 @property {number} data.clientHeight

