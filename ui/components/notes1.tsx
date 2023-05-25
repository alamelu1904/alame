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
  

  const loadMenu = (data: any, appId: string, appIddesc: string): void => {
    console.log('loadMenu--', data.menuText);
    const menuObj = JSON.parse('[' + data.menuText + ']');
    console.log('menuObj--', menuObj);
    const sideMenus = state.navigateMenu;
    const moreMenuTemp = state.moreMenuLst;
    const depLvl = 1;
    const sideMenuItem = {
      id: appIddesc,
      nodeTemplate: true,
      appId: appId,
      name: appIddesc,
      children: [],
      hasSettingIcon: true,
    };
  
    const processMenu = (menu: any, parentId: string) => {
      const processedMenu: any = {
        id: parentId + '/' + menu.text,
        pid: parentId,
        name: menu.text,
        hasChild: menu.submenu != null && menu.submenu.itemdata.length > 0,
        children: [],
      };
  
      if (menu.submenu != null && menu.submenu.itemdata.length > 0) {
        menu.submenu.itemdata.forEach((submenu: any) => {
          const processedSubmenu: any = {
            id: processedMenu.id + '/' + submenu.text,
            more_id: processedMenu.name + '-' + submenu.text,
            pid: processedMenu.id,
            name: submenu.text,
            dispalyMore: true,
            hasChild: submenu.submenu != null && submenu.submenu.itemdata.length > 0,
            children: [],
          };
  
          if (submenu.submenu != null && submenu.submenu.itemdata.length > 0) {
            submenu.submenu.itemdata.forEach((subsubmenu: any) => {
              const processedSubsubmenu: any = {
                dispalyMore: true,
                more_id: processedSubmenu.name,
                id: processedSubmenu.id + '/' + subsubmenu.text,
                pid: processedSubmenu.id,
                name: subsubmenu.text,
                appId: appId,
                onclick: subsubmenu.onclick,
                filterType: '',
                transType: '',
                displayCategory: '',
                queryNameValue: '',
                env: '',
                appIdDesc: appIddesc,
                IsTabToBeOpen: true,
              };
  
              const str = subsubmenu.onclick;
              const clickobj = str.substring(str.indexOf('(') + 1, str.lastIndexOf(')')).split('\',\'');
              processedSubsubmenu.filterType = clickobj[0].replace(/'/g, '');
              processedSubsubmenu.transType = clickobj[1];
              processedSubsubmenu.displayCategory = clickobj[2];
              processedSubsubmenu.queryNameValue = clickobj[3];
              processedSubsubmenu.appId = clickobj[4];
              processedSubsubmenu.env = clickobj[5].replace(/'/g, '');
  
              processedSubmenu.children.push(processedSubsubmenu);
            });
          }
          
          moreMenuTemp[processedSubmenu.more_id] = processedSubmenu;
          processedMenu.children.push(processedSubmenu);
        });
      }
  
      return processedMenu;
    };
  
    menuObj.forEach((menu: any) => {
      const processedMenu = processMenu(menu, sideMenuItem.id);
      sideMenuItem.children.push(processedMenu);
    });
  
    sideMenus.push(sideMenuItem);
  
    setState({
      navigateMenu: sideMenus,
    });
  
    console.log('sidemenu---', sideMenus);
  };
  