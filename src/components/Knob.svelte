<script lang="ts">
  import ResizeObserver from 'resize-observer-polyfill';
  // import DragBehavior from './DragBehavior';
  import {createEventDispatcher, onDestroy} from 'svelte';
  import {drag} from 'svelte-gesture';

  export let value: number;
  export let colors: {
    meterColor: string;
    knobColor: string;
    thumbColor: string;
  };

  const dispatch = createEventDispatcher();

  function draw(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    value: number,
    meterColor: string,
    knobColor: string,
    thumbColor: string
  ) {
    ctx.clearRect(0, 0, width, height);

    const hw = width * 0.5;
    const hh = height * 0.5;
    const radius = Math.min(hw, hh) * 0.8;

    // Fill
    ctx.strokeStyle = meterColor;
    ctx.lineWidth = Math.round(width * 0.028);
    ctx.lineCap = 'round';

    const fillStart = 0.75 * Math.PI;
    const fillEnd = fillStart + 1.5 * value * Math.PI;

    ctx.beginPath();
    ctx.arc(hw, hh, radius, fillStart, fillEnd, false);
    ctx.stroke();

    // Knob
    ctx.strokeStyle = knobColor;
    ctx.lineWidth = Math.round(width * 0.028);
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.arc(hw, hh, radius * 0.72, 0, 2 * Math.PI, false);
    ctx.stroke();

    // Knob thumb
    ctx.fillStyle = thumbColor;
    ctx.lineWidth = Math.round(width * 0.036);
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.arc(
      hw + 0.5 * radius * Math.cos(fillEnd),
      hh + 0.5 * radius * Math.sin(fillEnd),
      radius * 0.08,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  }

  let canvas: HTMLCanvasElement;
  let bounds = {
    width: 0,
    height: 0
  };
  let observer: ResizeObserver = new ResizeObserver(function (entries) {
    for (let entry of entries) {
      bounds = {
        width: 2 * entry.contentRect.width,
        height: 2 * entry.contentRect.height
      };
    }
  });
  $: {
    if (canvas != null && observer != null) {
      observer.observe(canvas);
    }
  }
  onDestroy(() => {
    observer.disconnect();
  });

  let {meterColor, knobColor, thumbColor} = colors;

  $: {
    if (canvas != null) {
      const ctx = canvas.getContext('2d');

      if (ctx != null) {
        canvas.width = bounds.width;
        canvas.height = bounds.height;

        draw(ctx, bounds.width, bounds.height, value, meterColor, knobColor, thumbColor);
      }
    }
  }

  let knobContainer: HTMLDivElement;

  let valueAtDragStartRef: number;

  let snapToMouseLinearHorizontal = true;

  function handler(event: any) {
    const detail = event.detail;
    const {
      active,
      movement: [mx, my],
      xy: [x, y]
    } = detail;

    if (detail.first && typeof value === 'number') {
      valueAtDragStartRef = value;

      if (snapToMouseLinearHorizontal) {
        let [x, y] = detail.xy;
        let posInScreen = knobContainer.getBoundingClientRect();

        let dx = x - posInScreen.left;
        let dv = dx / posInScreen.width;

        valueAtDragStartRef = Math.max(0, Math.min(1, dv));

        dispatch('change', Math.max(0, Math.min(1, dv)));
      }
      return;
    }

    let [dx, dy] = detail.movement;
    let dv = (dx - dy) / 200;

    dispatch('change', Math.max(0, Math.min(1, valueAtDragStartRef + dv)));
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="relative m-4 h-20 w-20 touch-none" use:drag on:drag={handler} bind:this={knobContainer}>
  <canvas bind:this={canvas} class="absolute h-full w-full touch-none" />
</div>
