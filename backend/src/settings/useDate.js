const useDate = ({ settings }) => {
  const { aiappsy-erp_app_date_format } = settings;

  const dateFormat = aiappsy-erp_app_date_format;

  return {
    dateFormat,
  };
};

module.exports = useDate;
