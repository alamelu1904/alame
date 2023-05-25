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
  
  const loadMenu = (data: any, appId: string, appIddesc: string): void => {
    console.log('loadMenu--', data.menuText);
    var menuObj = JSON.parse('[' + data.menuText + ']');
    console.log('menuObj--', menuObj);
    let sideMenus = state.navigateMenu;
    let moreMenuTemp = state.moreMenuLst;
    var depLvl = 1;
    let sideMenuItem = {
      id: appIddesc,
      nodeTemplate: true,
      appId: appId,
      name: appIddesc,
      children: [],
      hasSettingIcon: true,
    };
  
    menuObj.map((menu: any) => {
      let menuTemp: any = {};
      menuTemp['id'] = sideMenuItem.id + '/' + menu.text;
      menuTemp['pid'] = sideMenuItem.id;
      sideMenuItem['hasChild'] = true;
      menuTemp['name'] = menu.text;
  
      if (menu.submenu != null && menu.submenu.itemdata.length > 0) {
        menuTemp['children'] = [];
        menu.submenu.itemdata.map((menu1: any) => {
          let menuTemp1: any = {};
          menuTemp1['id'] = menuTemp['id'] + '/' + menu1.text;
          menuTemp1['more_id'] = menuTemp['name'] + '-' + menu1.text;
          moreMenuTemp[menuTemp['name'] + '-' + menu1.text] = {};
          menuTemp1['pid'] = menuTemp['id'];
          menuTemp1['name'] = menu1.text;
          menuTemp1['dispalyMore'] = true;
          menuTemp['hasChild'] = true;
  
          if (menu1.submenu != null && menu1.submenu.itemdata.length > 0) {
            menuTemp1['children'] = [];
            menu1.submenu.itemdata.map((menu2: any) => {
              let menuTemp2: any = {};
              menuTemp1['hasChild'] = true;
              menuTemp2['dispalyMore'] = true;
              menuTemp1['more_id'] = menuTemp1['name'];
              menuTemp2['id'] = menuTemp1['id'] + '/' + menu2.text;
              menuTemp2['pid'] = menuTemp1['id'];
              menuTemp2['name'] = menu2.text;
              menuTemp2['appId'] = appId;
              menuTemp2['onclick'] = menu2.onclick;
  
              let str = menu2.onclick;
              let clickobj = str.substring(str.indexOf('(') + 1, str.lastIndexOf(')')).split('\',\'');
              menuTemp2['filterType'] = clickobj[0].replace(/'/g, '');
              menuTemp2['transType'] = clickobj[1];
              menuTemp2['displayCategory'] = clickobj[2];
              menuTemp2['queryNameValue'] = clickobj[3];
              menuTemp2['appId'] = clickobj[4];
              menuTemp2['env'] = clickobj[5].replace(/'/g, '');
              menuTemp2['appIdDesc'] = appIddesc;
              menuTemp2['IsTabToBeOpen'] = true;
  
              menuTemp1['children'].push(menuTemp2);
            });
          }
          moreMenuTemp[menuTemp['name'] + '-' + menu1.text] = menuTemp1;
          menuTemp['children'].push(menuTemp1);
        });
      }
  