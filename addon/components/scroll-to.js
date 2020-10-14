import Ember from "ember";
import { inject } from '@ember/service';

export default Ember.Component.extend({
  scroll: inject(),
  label: "",
  tagName: null,
  target: null,
  autoScroll: false,
  offset: 0,
  duration: 500,
  didInsertElement() {
    const self = this;
    const target = this.get("target");
    const offset = this.get("offset");
    const duration = this.get("duration");
    if (!target) {
      Ember.Logger.error("Target should be passed");
      return;
    }
    if (this.get('autoScroll')) {
      self.scrollToTarget(target, offset, duration);
    } else {
      document.querySelector(`#${this.get("elementId")}`)
        .addEventListener("click", function () {
          self.scrollToTarget(target, offset, duration);
        });
    }
  },

  scrollToTarget(target, offset, duration) {
    if(this.get("onScroll")) {
      this.onScroll();
    }
    this.scroll.scroll(target, offset, duration);
  },
});
