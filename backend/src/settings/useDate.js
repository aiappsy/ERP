const useDate = ({ settings }) => {
  const aiappsy_erp_app_date_format = settings['aiappsy-erp_app_date_format'];

  const dateFormat = aiappsy_erp_app_date_format;

  return {
    dateFormat,
  };
};

module.exports = useDate;
