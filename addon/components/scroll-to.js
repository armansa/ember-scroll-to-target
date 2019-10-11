import Ember from "ember";

export default Ember.Component.extend({
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
    const targetPos = this.getElemDistance(document.querySelector(target)) + offset;
    this.animateScroll(targetPos, duration)
  },

  animateScroll(targetPos, duration) {
    if (window.scrollY != undefined) {
      const self = this;
      const startPos = window.scrollY;
      const speed = 20;
      let time = 0;
      const animate = function () {
        time += speed;
        window.scrollTo(0, self.getAnimationPos(time, startPos, targetPos - startPos, duration));
        if (time < duration) {
          setTimeout(animate, speed);
        }
      };
      animate();
    } else {
      window.scrollTo(0, targetPos);
    }
  },

  getElemDistance( elem ) {
    var result = 0;
    while (elem && elem.offsetParent) {
      result += elem.offsetTop;
      elem = elem.offsetParent;
    }
    return result >= 0 ? result : 0;
  },

  getAnimationPos(time, startPos, endPos, duration) {
    time /= duration / 2;
    if (time < 1) {
      return endPos / 2 * time * time + startPos;
    }
    time--;
    return -endPos / 2 * (time * (time - 2) - 1) + startPos;
  }
});
