/**
 *  [range description]
 *
 *  @return {[type]} [description]
 */
function* grange (start, end, transform, options) {
  if (typeof end !== 'number') {
    [options, transform, end] = [transform, end, start];
    start = 0;
  }
  const shouldTransform = typeof transform === 'function';
  if (!shouldTransform) options = transform;
  const {
    step = 1,
    loop = false,
  } = options || {};

  if (start > end) {
    for (let i = start; i >= end; i -= step) {
      yield shouldTransform ? transform(i) : i;
      if (i <= end && loop) i = start + step;
    }
  } else {
    for (let i = start; i <= end; i += step) {
      yield shouldTransform ? transform(i) : i;
      if (i >= end && loop) i = start - step;
    }
  }
}

module.exports = grange;
