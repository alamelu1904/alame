import { useState, useEffect } from 'react';

const MyComponent = () => {
  const [pageNo, setPageNo] = useState<number>(0);
  const [startRow, setStartRow] = useState<number>(0);
  const [origDetails, setOrigDetails] = useState<any[]>([]);
  const [CDF_DATA, setCDF_DATA] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [dataLength, setDataLength] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const populateData = () => {
    const formData = new FormData();
    formData.append('appId', 'BLRCO');
    formData.append('blotter_key', '1');
    formData.append('filterType', 'MSL');
    formData.append('version', 'angular');
    formData.append('startIndex', '0');
    formData.append('results', '20');
    formData.append('sort', '');
    formData.append('dir', '');
    formData.append('maxRows', '2');
    formData.append('randomNum', '2.8092147389483233');

    let contextPath = EnvProps.getContextUrl();

    fetch(contextPath + '/angular/YUIPageData.action', {
      method: 'post',
      body: formData
    }).then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    }).then((result) => {
      console.log('Resultlist::::::::::::::::::', result);
      let jsonObj = JSON.parse(result['xmlJsonObject'])['ResultSet']['records'];
      console.log('jsonObj::>>>>Resultlist::::::::::::::::::', jsonObj);
      setPageNo(Pagination.pageNo);
      setStartRow((Pagination.pageNo - 1) * 20);
      setOrigDetails(jsonObj);
      setCDF_DATA(jsonObj);
      setData(jsonObj);
      setDataLength(result['maxRows']);
      setLoading(false);
    }).catch((error) => {
      console.error('Response Error: ', error);
      // Handle error state here
    });
  };

  useEffect(() => {
    let conditions;
    if (myFilters && myFilters.length > 0) {
      conditions = myFilters;
    }
    console.log('HERE !! check 123');
    fetchSchemaJson();
    console.log('in componentDidMount method AdvGridResultLst.js conditions', conditions);
    // if (showSelectConsumerModal === undefined) {
    setDefaultCondition(conditions);
    //}
    //this.setState({ });
  }, []);

  // Rest of the component code...

  return (
    // JSX code for your component
  );
};

export default MyComponent;




