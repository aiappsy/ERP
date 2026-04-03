import { Button, Result } from 'antd';

import useLanguage from '@/locale/useLanguage';

const About = () => {
  const translate = useLanguage();
  return (
    <Result
      status="info"
      title={'Aiappsy-ERP'}
      subTitle={translate('Do you need help on customize of this app')}
      extra={
        <>
          <p>
            Website : <a href="https://www.aiappsy-erpapp.com">www.aiappsy-erpapp.com</a>{' '}
          </p>
          <p>
            GitHub :{' '}
            <a href="https://github.com/aiappsy-erp/aiappsy-erp-erp-crm">
              https://github.com/aiappsy-erp/aiappsy-erp-erp-crm
            </a>
          </p>
          <Button
            type="primary"
            onClick={() => {
              window.open(`https://www.aiappsy-erpapp.com/contact-us/`);
            }}
          >
            {translate('Contact us')}
          </Button>
        </>
      }
    />
  );
};

export default About;
