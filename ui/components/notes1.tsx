import React, { useEffect, useState } from 'react';

const Example: React.FC = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [showLoad, setShowLoad] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [msgType, setMsgType] = useState('');
  const [closeWindow, setCloseWindow] = useState(false);

  const startLoadMenu = (appList: any) => {
    if (
      appList == undefined ||
      appList == null ||
      Object.keys(appList).length === 0
    ) {
      setDisplayMenu(true);
      setShowLoad(false);
      setShowError(true);
      setErrMsg('no ent.');
      setShowLoading(false);
      setMsgType('ERROR');
      setCloseWindow(false);
    } else {
      let keys = Object.keys(appList);
      let appIdsTemp: string[] = [];
      keys.map((appId) => {
        appIdsTemp.push(appId);
      });
      populateEntitlement(appIdsTemp[0], 0, appIdsTemp, appList);
    }
  };

  const populateMenu = (
    appId: string,
    appIdindex: number,
    url: string,
    appIdsLst: string[],
    appList: any
  ) => {
    let contextPath = EProps.getContextUrl();
    url = '/abc/' + url.substring(url.indexOf('/', 1) + 1);
    console.log('appid --' + appId + '---final Url ==' + url);
    fetch(contextPath + url + '&version=abc&appId=' + appId, {
      method: 'post',
    })
      .then((res) => {
        if (!res.ok) throw res;
        return res.json();
      })
      .then((data) => {
        console.log(data);
        let apddDesc = appList[appId];
        loadMenu(data, appId, apddDesc);
        if (appIdsLst.length - 1 > appIdindex) {
          appIdindex = appIdindex + 1;
          let appIDNxt = appIdsLst[appIdindex];
          let urlNxt = entData.gAppMap[appIDNxt].action;
          console.log('in populateMenu--' + appIDNxt + '--url--' + urlNxt);
          populateMenu(appIDNxt, appIdindex, urlNxt, appIdsLst, appList);
        } else {
          setShowLoad(false);
          setLoginSuccess(true);
        }
      })
      .catch((error) => {
        console.error('Response Error: ', error);
        setShowLoad(false);
        setShowError(true);
        setErrMsg('Exception occurred. Please contact admin.');
        setShowLoading(false);
        setMsgType('ERROR');
        setCloseWindow(false);
      });
  };
  