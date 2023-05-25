import React, { useEffect, useState } from 'react';

const Example: React.FC = () => {
  const [displayMessage, setDisplayMessage] = useState(false);
  const [showLoadHdr, setShowLoadHdr] = useState('');
  const [showLoadMsg, setShowLoadMsg] = useState('');
  const [cssS, setCssS] = useState('');
  const [appIds, setAppIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [msgType, setMsgType] = useState('');
  const [closeWindow, setCloseWindow] = useState(false);
  const [entData, setEntData] = useState<any>(null);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [showLoad, setShowLoad] = useState(false);


  const startLoadMenu = (appList: any) => {
    if (
      appList == undefined ||
      appList == null ||
      Object.keys(appList).length === 0
    ) {
      setDisplayMessage(true);
      setShowLoadHdr('Message');
      setShowLoadMsg('no ent.');
      setCssS('message');
    } else {
      let keys = Object.keys(appList);
      let appIdsTemp: string[] = [];
      keys.map((appId) => {
        appIdsTemp.push(appId);
      });
      setAppIds(appIdsTemp);
      console.log(appIdsTemp);
      populateEntitlement(appIdsTemp[0], 0, appIdsTemp, appList);
    }
  };
  const populateMenu = (
    appId: string,
    appIdindex: number,
    url: string,
    appIdsLst: string[],
    entitleData: any
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
        let apddDesc = entitleData[appId];
        loadMenu(data, appId, apddDesc);
        if (appIdsLst.length - 1 > appIdindex) {
          appIdindex = appIdindex + 1;
          let appIDNxt = appIdsLst[appIdindex];
          let urlNxt = state.entData.gAppMap[appIDNxt].action;
          console.log('in populateMenu--' + appIDNxt + '--url--' + urlNxt);
          populateMenu(appIDNxt, appIdindex, urlNxt, appIdsLst, entitleData);
        } else {
          setLoading(false);
          setLoginSuccess(true);
        }
      })
      .catch((error) => {
        console.error('Response Error: ', error);
        setLoginSuccess(true);
        setLoading(false);
        setShowError(true);
        setErrMsg('Exception occurred. Please contact admin.');
        setShowLoading(false);
        setMsgType('ERROR');
        setCloseWindow(false);
      });
  };
  
  const populateEnt = (appId: string, appIdindex: number, appIdsLst: string[], appList: any) => {
    let url = EProps.getContextUrl() + '/abc/M.action';
    fetch(url + '?version=abc&appId=' + appId, {
      method: 'post',
    })
      .then((res) => {
        if (!res.ok) throw res;
        return res.json();
      })
      .then((data) => {
        console.log(data);
        // this.loadMenu(data);
        setEntData(data);
        let url = data.gAMap[appId].action;
        populateMenu(appId, appIdindex, url, appIdsLst, appList);
      })
      .catch((error) => {
        console.error('Response Error: ', error);
        setDisplayMenu(true);
        setShowLoad(false);
        setShowError(true);
        setErrMsg('Exception occurred.');
        setShowLoading(false);
        setMsgType('ERROR');
        setCloseWindow(false);
      });
  };
  
