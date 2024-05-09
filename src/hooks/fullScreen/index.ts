// import screenfull from 'screenfull';
// import { ref, nextTick, watch } from 'vue';
// import { useFullScreenStoreWithOut } from '@/store/modules/fullScreen';
// /**
//  * @description: 全屏hook
//  * @param {string} ele - document选择器，不传为body
//  * @return {*} isFull - 是否全屏状态；fullScreen - 全屏方法
//  */
// export default function useScreenFull(ele = 'body') {
//   const isFull = ref(false);
//   const store = useFullScreenStoreWithOut();

//   const fullScreen = () => {
//     setTimeout(() => {
//       nextTick(() => {
//         if (screenfull.isEnabled && !isFull.value) {
//           screenfull.request(document.querySelector(ele) as Element);
//         } else {
//           screenfull.toggle();
//         }
//       });
//     }, 3000);
//   };
//   window.addEventListener('resize', () => {
//     isFull.value = (window as any).fullscreen || (document as any).webkitIsFullScreen;
//   });
//   // 监听屏幕的全屏，关闭全屏
//   document.addEventListener('fullscreenchange', function (_event) {
//     if (document.fullscreenElement) {
//       isFull.value = true;
//     } else {
//       isFull.value = false;
//     }
//   });
//   watch(
//     () => isFull.value,
//     () => {
//       // vuex 改变全屏状态
//       store.changeScreenFull(isFull.value);
//     },
//   );

//   return {
//     isFull,
//     fullScreen,
//   };
// }
