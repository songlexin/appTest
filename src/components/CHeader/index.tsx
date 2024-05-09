import { SetupContext } from 'vue';
import styles from './index.module.less';

interface CHeaderProps {
  title?: string;
}

/**
 * 顶部组件(无状态函数组件)
 * @returns
 */
export default function CHeader(props: CHeaderProps, context: SetupContext) {
  const { slots } = context;
  const { title } = props;
  return (
    <div class={styles.cHeader}>
      <div class={styles.cHeaderTitle}>{title}</div>
      {slots.default ? slots.default() : ''}
    </div>
  );
}
