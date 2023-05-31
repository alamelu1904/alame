import { useState } from 'react';

const MyComponent = () => {
  const [schemeJson, setSchemeJson] = useState<any>(null);
  const [colConfig, setColConfig] = useState<any[]>([]);
  const [advGridDetails, setAdvGridDetails] = useState<any>(null);
  const [origDetails, setOrigDetails] = useState<any>(null);
  const [dbColConfig, setDbColConfig] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [preferenceId, setPreferenceId] = useState<string>('');

  const fetchSchemaJson = () => {
    const formData = new FormData();
    formData.append('appId', 'BLRCO');
    formData.append('searchType', 'SIMPLE');
    // Rest of the formData.append lines...

    let contextPath = EnvProps.getContextUrl();

    fetch(contextPath + '/angular/ShowList.action', {
      method: 'post',
      body: formData
    }).then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    }).then((result) => {
      console.log('fetchshemajson ::: result list page ::: >>> ', result);
      let schemaData = result;
      //schemaData.resultColumns.splice(0, 0, viewCol);
      let val: any[] = [];
      let localColumns = JSON.parse(schemaData.colsDef);
      console.log('ColsDef ::>> Result list main::>>>', localColumns);
      localColumns = localColumns.map((obj: any) => {
        const { dataKey, label, ...rest } = obj;
        return { field: dataKey, headerName: label || ' ', ...rest };
      });
      console.log('A:::::::::modifiedColumns::::::>', localColumns);
      console.log('CC:::::::::modifiedColumn with HeadName::::::>', localColumns);
      if (schemaData.enableSearchOnCols) {
        localColumns = localColumns.map((localColumn: any) => {
          return {
            ...localColumn,
            header: (props: any) => {
              const { column } = props;
              return (
                <Grid>
                  <Row><span>{localColumn.label}</span></Row>
                  {!localColumn.hideFilter && (
                    <Row style={{ paddingTop: '2px' }}>
                      <input
                        type="text"
                        datakey={localColumn.dataKey}
                        onChange={predictiveSearch}
                        onClick={handleOnClickPredictiveSearch}
                        style={{ 'width': localColumn.width - 30, borderColor: '#cdcdcd', borderRadius: '4px' }}
                        onKeyDown={(e) => { if (e.keyCode === 9) listenScrollEvent(); }}
                      />
                    </Row>
                  )}
                </Grid>
              );
            }
          };
        });
      }
      console.log('Local Columns after replacing field as dataKey::::::::::::::::::::::::::::::::::::::::>>>>>>>>>>>>>>', localColumns);
      setSchemeJson(schemaData);
      setColConfig(localColumns);
      setAdvGridDetails(schemaData.advGridDetails);
      setOrigDetails(schemaData.advGridDetails);
      setDbColConfig(localColumns);
      setLoading(false);
      setPreferenceId(schemaData.preferenceId);
      populateData(formData);
    }).catch((error) => {
      console.error('Response Error: ', error);
      // Handle error state here
    });
  };

  export default MyComponent;