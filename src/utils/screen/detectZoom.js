export const detectZoom = () => {
  // let ratio = 0;
  let basicWidth = 1920;
  const currentWidth = window.screen.width;
  //浏览器需要调整的比例
  let needRatio = 1;
  let percentage = '';
  let ratio = currentWidth / basicWidth;
  if (ratio > 0.5 && ratio < 0.67) {
    percentage = '50%';
    needRatio = 0.5;
  }
  if (ratio >= 0.67 && ratio < 0.75) {
    percentage = '67%';
    needRatio = 0.67;
  } else if (ratio >= 0.75 && ratio < 0.8) {
    percentage = '75%';
    needRatio = 0.75;
  } else if (ratio >= 0.8 && ratio < 0.9) {
    percentage = '80%';
    needRatio = 0.8;
  } else if (ratio >= 1.1 && ratio < 1.25) {
    percentage = '110%';
    needRatio = 1.1;
  } else if (ratio >= 1.25 && ratio < 1.5) {
    percentage = '125%';
    needRatio = 1.25;
  } else if (ratio >= 1.5 && ratio < 1.75) {
    percentage = '150%';
    needRatio = 1.5;
  }
  console.log('percentagepercentagepercentage', percentage);
  console.log('needRationeedRatio', needRatio);
  const screen = window.screen;
  const ua = navigator.userAgent.toLowerCase();
  if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio;
  } else if (~ua.indexOf('msie')) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI;
    }
  } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
    ratio = window.outerWidth / window.innerWidth;
  }
  if (ratio) {
    ratio = Math.round(ratio * 100);
  }
  console.log('ratio.....', ratio);
  return ratio;
};
