import { defineComponent, PropType, nextTick, onMounted, ref, onUnmounted } from 'vue';
import { CLoading } from '@/components/CLoading';
import './index.css';

export default defineComponent({
  name: 'CPage', // 主页组件
  props: {
    isLoading: Boolean as PropType<boolean>,
    hideHeaderPlaceholder: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    hideFooterPlaceholder: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, { slots, attrs, expose }) {
    const { hideHeaderPlaceholder, hideFooterPlaceholder } = attrs;
    const header = ref();
    const main = ref();
    const footer = ref();
    const height = ref(0);
    const headerh = ref(0);
    const footerh = ref(0);

    const setHeaderHeight = () => {
      nextTick(() => {
        headerh.value = header.value?.offsetHeight || 0;
      });
    };

    const setFooterHeight = () => {
      nextTick(() => {
        footerh.value = footer.value?.offsetHeight || 0;
      });
    };

    const initPageLayout = () => {
      height.value = window.innerHeight;
      slots.footer ? setFooterHeight() : null;
      slots.header ? setHeaderHeight() : null;
    };
    const getMainHeight = () => {
      console.log('window', window.innerWidth);
      return window.innerHeight - headerh.value - footerh.value;
    };
    expose({
      getMainHeight,
    });

    const handleResize = () => {
      // 处理窗口大小改变的逻辑
      initPageLayout();
    };

    onMounted(() => {
      initPageLayout();
      window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });

    return () => (
      <div class="page-container" style={{ minHeight: height.value + 'px' }}>
        {slots.header ? (
          <header ref={header} class="page-header">
            {slots.header?.()}
          </header>
        ) : null}

        {slots.header && !hideHeaderPlaceholder ? (
          <div style={{ height: headerh.value + 'px' }}></div>
        ) : null}

        <main ref={main} class="page-main">
          {slots.default?.()}
        </main>

        {slots.footer && !hideFooterPlaceholder ? (
          <div style={{ height: footerh.value + 'px' }}></div>
        ) : null}

        {slots.footer ? (
          <footer ref={footer} class="page-footer">
            {slots.footer?.()}
          </footer>
        ) : null}
        {props.isLoading ? (
          <CLoading type="spinner" vertical={true}>
            加载中...
          </CLoading>
        ) : (
          ''
        )}
      </div>
    );
  },
});
