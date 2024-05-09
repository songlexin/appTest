import { SetupContext } from 'vue';
import { Loading, Overlay } from 'vant';
import type { LoadingProps } from 'vant';

type CLoadingProps = LoadingProps & Record<string, unknown>;

export function CLoading(props: CLoadingProps, context: SetupContext) {
  return (
    <div
      {...context.attrs}
      style="position: fixed; top: calc(50% - 20px); left: calc(50% - 20px);height: 100%"
    >
      <Loading color="#0094ff" {...props} style={{ zIndex: 1000 }}>
        {{
          ...context.slots,
        }}
      </Loading>
      <Overlay show={true} style={{ zIndex: 20 }} />
    </div>
  );
}
