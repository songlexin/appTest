import { ConfigProvider } from 'ant-design-vue';
import { defineComponent, KeepAlive, Suspense } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <ConfigProvider>
        <Suspense>
          <RouterView>
            {
              //@ts-expect-error 确定RouterView包含Component，route参数
              ({ Component, route }) => {
                const { meta } = route;
                const isKeepAlive = meta && meta.keepAlive;
                return (
                  <>
                    <KeepAlive>
                      {isKeepAlive ? (
                        <Component key={meta.usePathKey ? route.fullPath : undefined} />
                      ) : null}
                    </KeepAlive>
                    {!isKeepAlive ? (
                      <Component key={meta.usePathKey ? route.fullPath : undefined} />
                    ) : null}
                  </>
                );
              }
            }
          </RouterView>
        </Suspense>
      </ConfigProvider>
    );
  },
});
