import { ConfigProvider } from 'antd';

export default function Localization({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1a73e8',
          colorError: '#ea4335',
          colorSuccess: '#34a853',
          colorWarning: '#fbbc04',
          colorInfo: '#1a73e8',
          colorTextBase: '#202124',
          colorLink: '#1a73e8',
          colorBgBase: '#ffffff',
          colorBgContainer: '#ffffff',
          colorBgLayout: '#f8f9fa',
          borderRadius: 8,
          wireframe: false,
          fontFamily: '"Google Sans", "Inter", "Roboto", "Helvetica Neue", sans-serif',
          controlHeight: 40,
        },
        components: {
          Button: {
            borderRadius: 24,
            controlHeight: 40,
            paddingInline: 24,
            fontWeight: 500,
          },
          Card: {
            borderRadius: 8,
            boxShadowTertiary: '0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)',
          },
          Input: {
            borderRadius: 4,
          },
          Select: {
            borderRadius: 4,
          },
          Menu: {
            itemBorderRadius: 24,
            itemHoverBg: '#f1f3f4',
            itemSelectedBg: '#e8f0fe',
            itemSelectedColor: '#1a73e8',
          }
        }
      }}
    >
      {children}
    </ConfigProvider>
  );
}
