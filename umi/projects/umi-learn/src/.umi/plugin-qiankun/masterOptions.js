
      let options = {"masterHistoryType":"browser","base":"/admin/","apps":[{"name":"app2","entry":"//localhost:8000"},{"name":"wangyi-project","entry":"//localhost:8002"},{"name":"iyb-generate-web","entry":"//localhost:8081"},{"name":"iyb-micro-product-pc","entry":"//localhost:8003"}]};
      export const getMasterOptions = () => options;
      export const setMasterOptions = (newOpts) => options = ({ ...options, ...newOpts });
      