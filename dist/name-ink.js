/* 261007 AMD#18 · transparent name ink, shared by pointer and keyboard erasing. */
(() => {
  'use strict';
  class NameInk {
    constructor(canvas, name) {
      this.canvas = canvas;
      canvas.width = 480; canvas.height = 90;
      this.ctx = canvas.getContext('2d', { willReadFrequently: true }) || canvas.getContext('2d');
      this.ctx.font = '38px GenWanMin2, serif';
      this.ctx.textAlign = 'center'; this.ctx.textBaseline = 'middle';
      this.ctx.fillStyle = '#282320'; this.ctx.fillText(name, 240, 45);
      this.initial = this.alpha();
    }
    alpha() {
      const pixels = this.ctx.getImageData(0, 0, 480, 90).data;
      let total = 0;
      for (let i = 3; i < pixels.length; i += 4) total += pixels[i];
      return total;
    }
    dab(x, y) {
      const ctx = this.ctx, radius = 22;
      ctx.globalCompositeOperation = 'destination-out';
      const brush = ctx.createRadialGradient(x, y, radius * .5, x, y, radius);
      brush.addColorStop(0, 'rgba(0,0,0,1)'); brush.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = brush; ctx.fillRect(x-radius, y-radius, radius*2, radius*2);
      ctx.globalCompositeOperation = 'source-over';
    }
    segment(from, to) {
      const ax = from[0]*480, ay = from[1]*90, bx = to[0]*480, by = to[1]*90;
      const steps = Math.max(1, Math.ceil(Math.hypot(bx-ax, by-ay)/4));
      for (let i=1; i<=steps; i++) this.dab(ax+(bx-ax)*i/steps, ay+(by-ay)*i/steps);
    }
    replay(strokes) {
      for (const stroke of strokes) for (let i=0; i<stroke.length; i++) this.segment(stroke[Math.max(0,i-1)], stroke[i]);
    }
    progress() { return this.initial ? 1-this.alpha()/this.initial : 0; }
    clear() { this.ctx.clearRect(0,0,480,90); }
  }
  window.NameInk = NameInk;
})();
