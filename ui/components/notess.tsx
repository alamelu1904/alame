interface BasicTabProps {
    onShowListClick: (query: string, queryType: string) => void;
    //applicId: string;
    // childFrmDetails: any;
    bltrObj: {
        appid: String;
        filterdata: String;
    },
}
interface LookupOption {
    display: string;
    value: string;
}
interface LookupVoDetais {
    key: string;
    value: any;
}
interface LookupVoValues {
    //LookupVoDetails[];
}
const BasicTab: React.FC<BasicTabProps> = ({ onShowListClick, bltrObj }) => {
    const handleButtonClick = () => {
        let query = submitParams();
        handleSubmit();
        onShowListClick(query, "SIMPLE");
    };
    // const [schemaData, setSchemaData] = useState<any[]>([]);
    const [options, setOptions] = useState<any[]>([]);
    const [lookupOptions, setLookupOptions] = useState<LookupVoDetais[]>([]);
    const [formData, setFormData] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);
    console.log("BltrObj :::>>>>", bltrObj);
    console.log("applicId:::>>", bltrObj['appId']);
    // const [lookupFilterJson, setLookupFilterJson] = useState<LookupOption[]>([]);
    // const [options, setOptions] = useState<LookupOption[]>([]);
    const [initialized, setInitialized] = useState(false);
    const [renderedFields, setRenderedFields] = useState([]);
    const [formValue, setFormValue] = useState({});
    const [frmObj, setFrmObj] = useState({});
    const [renderedDateFields, setRenderedDateFields] = useState([]);
    const [basicFormJson, setBasicFormJson] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [lookupFilteredOptions, setLookupFilteredOptions] = useState([]);
    const handleFieldChange = (fieldName: string, value: any) => {
        setFormData((prevData: any) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };
    const handleSubmit = () => {
        // Handle form submission here
        console.log(formData);
    };
    const handleReset = () => {
        // Clear form data
        setFormData({});
    };
    const fetchLookupOptions = async (lookupAction: string, lookupParam: string, applicationId: string) => {
        try {
            setIsLoading(true);
            //http://localhost:8080/gtmtoolsmaven/angular/fsco/getLookup.action?lookupType=TPG&paramName=PRCSG_GRP_ID&appId=BLRCO
            console.log("lookupACtion::>>>>>>>>>>", lookupAction);
            console.log("lookupParam::>>>>>>>>>>", lookupParam);
            const updatedLookUpParam = lookupParam.replace(/~/g, '&');
            console.log("updatedLookUpParam::>>>>>>>>>>", updatedLookUpParam);
            //const updatedLookupAction = lookupAction.replace('blotter', 'angular');
            const beginIndex = lookupAction.lastIndexOf('/') + 1;
            const lastIndex = lookupAction.lastIndexOf('.action');
            const extractedString = lookupAction.substring(beginIndex, lastIndex);
            let url = "/gtmtoolsmaven/angular/" + extractedString + ".action?" + updatedLookUpParam + "&appId=" + applicationId;
            console.log("lookup url:>>>>>>>>>>>>>", url);
            const response = await fetch(url, { method: "post" });
            console.log("response:::>>>>>>>>>", response.json());
            const result = await response.json();
            console.log("result lookup:::>>>>", result);
            const fetchedOptions = result.displayData;
            console.log("fetchedoptions lll:::::::::??", fetchedOptions);
            setLookupOptions(fetchedOptions);
            console.log("filtered lookup options...", lookupOptions);
            return fetchedOptions;
        } catch (error) {
            console.error('Error fetching lookup options:', error);
            setIsLoading(false);
            setLookupOptions([]);
            return [];
        }
    };
    const fetchSchemaJson = () => {
        //let url=http://localhost:8080/gtmtoolsmaven/angular/DisplayFilter.action?appId=BLRCO&msgtype=SOL
        setIsLoading(true);
        console.log("fetchshcema json :::msg type ::::>>>>>>>>>", bltrObj['filterType']);
        console.log("fetchshcema json :::appid type ::::>>>>>>>>>", bltrObj['appId']);
        fetch("/gtmtoolsmaven/angular/DisplayFilter.action?" + "msgtype=" + bltrObj['filterType'] + "&appId=" + bltrObj['appId'], {
            method: "post"
        }).then((res) => res.json())
            .then((result) => {
                let schemaData = result;
                console.log("schemaData::::::::::::::", schemaData);
                setBasicFormJson(result);
                console.log("basicFormJson ::::::::::::::", basicFormJson);
                setRenderedFields(renderFields(schemaData));
                setRenderedDateFields([renderDateFields(schemaData)]);
                setFrmObj(schemaData);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Response Error: ', error);
                setIsLoading(false);
                // alertMessage("warning", errorMessage);
            })
    }
    useEffect(() => {
        console.log('basic tab did update / mount for dashboard');
        fetchSchemaJson();
    }, [bltrObj['appId'], bltrObj['filterType']]);
    const renderDateFields = (schemaData) => {
        if (!schemaData) {
            return null;
        }
        console.log("schema data inside date render funciton :::::::", schemaData);
        let dateTimeFields = schemaData.filter((field) => field.dataType === 'TIMESTAMP' || field.dataType === 'DATE');
        console.log("dateTimeFields fields:::::", dateTimeFields);
        const totalDateElements = dateTimeFields.length;
        console.log("date::::totalElements:>>>>>>>>", totalDateElements);
        const itemsDatePerColumn = Math.ceil(totalDateElements / 3);
        console.log("date::::itemsPerColumn:>>>>>>>>", itemsDatePerColumn);
        const dateColumns = Array.from({ length: 6 }, (_, i) => {
            const startIndex = i * itemsDatePerColumn;
            const endIndex = Math.min((i + 1) * itemsDatePerColumn, totalDateElements);
            return dateTimeFields.slice(startIndex, endIndex).map((field: any, index: number) => {
                const { datatype, lookUpDetailsVO, displayName, visible } = field;
                if (visible) {
                    console.log("visible:::::::::", visible)
                    return (
                        <>
                            <Grid item xs={4} key={index}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DemoContainer components={['DatePicker']}>
                                        <label style={{ width: "100%" }}>{field.displayName} </label>
                                        {field.dataType.toUpperCase() === "DATE" ? (
                                            <>
                                                <div id={`${field.dbField}_From`} style={{ width: "100%" }}>
                                                    <DatePicker label="From" />&nbsp;
                                                </div>
                                                <div id={`${field.dbField}_To`} style={{ width: "100%" }}>
                                                    <DatePicker label="To" />&nbsp;
                                                </div>
                                            </>) : (
                                            <>
                                                <div id={`${field.dbField}_From`} style={{ width: "100%" }}>
                                                    <DateTimePicker label="From" />&nbsp;
                                                </div>
                                                <div id={`${field.dbField}_To`} style={{ width: "100%" }}>
                                                    <DateTimePicker label="To" />&nbsp;
                                                </div>
                                            </>
                                        )
                                        }
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                        </>
                    );
                }
            });
        });
        return dateColumns;
    };
    function textFeildChange(value, key) {
        let fromTempObj = frmObj;
        fromTempObj[key] = value;
        console.log("-----------BasicForm key and value ", key, value)
        setFrmObj(fromTempObj);
    }
    function submitParams() {
        console.log("---Anubha Form--", formValue);
        var basicCondition = "";
        let keys = Object.keys(formValue);
        keys.map((key, i) => {
            var dataType = frmObj[key].dataType;
            var fieldVal = formValue[key];
            var lkupName = frmObj[key].lookupName
            if (dataType === "DATE" || dataType === "TIMESTAMP") {
                console.log("date key==", key, "----", formValue[key]);
                var fromVal, toVal, fromTimeVal, toTimeVal;
                if (formValue[key] != null && formValue[key].length == 2) {
                    fromVal = formValue[key][0].format('MM/DD/yyyy');
                    toVal = formValue[key][1].format('MM/DD/yyyy');
                    console.log("date values ==", key, "----", formValue[key][0].format('MM/DD/yyyy'));
                    if (fromVal != null && fromVal.length > 0 && toVal != null && toVal.length > 0) {
                        if (dataType == 'TIMESTAMP') {
                            //if (fromTimeVal== null || (fromTimeVal != null && fromTimeVal.length <= 0 )){
                            if (fromVal != null && fromVal.length > 0) {
                                fromTimeVal = "00:00";
                            }
                            // }
                            //if (toTimeVal== null || (toTimeVal != null && toTimeVal.length <= 0 )){
                            if (toVal != null && toVal.length > 0) {
                                toTimeVal = "23:59";
                            }
                            // }
                            fromVal = fromVal + " " + fromTimeVal;
                            toVal = toVal + " " + toTimeVal;
                        }
                        if (basicCondition == "") {
                            basicCondition = key + "^dtbtwn^" + fromVal + "^" + toVal;
                        } else {
                            basicCondition = basicCondition + "~" + key + "^dtbtwn^" + fromVal + "^" + toVal;
                        }
                    }
                }
                console.log("date Range -- ", basicCondition)
                /*
                if (dataType == 'TIMESTAMP'){
                fromVal = fromVal+" "+fromTimeVal;
                toVal = toVal+" "+toTimeVal;
                }
                basicCondition = dbFieldName + "^dtbtwn^"+fromVal+"^"+toVal;
                */
            } else {
                fieldVal = fieldVal.replace(new RegExp('~', 'g'), '*');
                fieldVal = ltrim(rtrim(fieldVal));
                var lkupPresent = false;
                if (lkupName != null && lkupName.length > 0) {
                    lkupPresent = true;
                }
                var operatorVal = "eq"
                if ((dataType == 'STRING' || dataType == 'CLOB') && !lkupPresent) {
                    operatorVal = "like";
                }
                if (fieldVal != null && fieldVal.length > 0) {
                    if (basicCondition == "") {
                        basicCondition = key + "^" + operatorVal + "^" + fieldVal
                    } else {
                        basicCondition = basicCondition + "~" + key + "^" + operatorVal + "^" + fieldVal
                    }
                }
            }
        })
        console.log("basicCondition--- NR here", basicCondition)
        return basicCondition;
    }
    function populateSrchCriteria(basicCondition) {
        //props.setShowBlotter(basicCondition,"SIMPLE");
    }
    function ltrim(str) {
        var re = /^\s*/i;
        var str1 = str.replace(re, "");
        return str1;
    }
    function rtrim(str) {
        var re = /\s*$/i;
        var str1 = str.replace(re, "");
        return str1;
    }
    const handleOpenModal = async (action, parameterDetails, appId) => {
        // setIsOpen(true);
        // const fetchOpt = await fetchLookupOptions(action, parameterDetails, appId);
        // if (fetchOpt.length > 0) {
        // console.log("fetchOpt:>>>>>", fetchOpt);
        // setLookupOptions(fetchOpt);
        // console.log("lookupOptions:>>>>>", lookupOptions);
        // // setIsOpen(true);
        // }
    }
    const handleCloseModal = () => {
        setIsOpen(false);
    }
    const handleSelectValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
        const filteredOptions = lookupOptions.filter((option) => option.value.toLowerCse().includes(event.target.value.toLowerCase()));
        console.log("filteredoptions?>>>>>>>>>>>>>>>>>>>>>>>>>>>>", filteredOptions);
        setLookupFilteredOptions(filteredOptions);
    }
    const menuProps: MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 200,
                width: 250,
            },
        },
    };
    const ModelContent = ({ action, parameterDetails, appId }) => {
        const [filterValue, setFilterValue] = useState('');
        const [filteredItems, setFilteredItems] = useState([]);
        const [isLoadingModal, setIsLoadingModal] = useState(false);
        const handleFilterChange = (event) => {
            const value = event.target.value;
            setFilterValue(value);
        };
        const fetchLookupData = async () => {
            setIsLoadingModal(true);
            console.log("lookupACtion::>>>>>>>>>>", action);
            console.log("lookupParam::>>>>>>>>>>", parameterDetails);
            const updatedLookUpParam = parameterDetails.replace(/~/g, '&');
            console.log("updatedLookUpParam::>>>>>>>>>>", updatedLookUpParam);
            //const updatedLookupAction = lookupAction.replace('blotter', 'angular');
            const beginIndex = action.lastIndexOf('/') + 1;
            const lastIndex = action.lastIndexOf('.action');
            const extractedString = action.substring(beginIndex, lastIndex);
            let url = "/gtmtoolsmaven/angular/" + extractedString + ".action?" + updatedLookUpParam + "&appId=" + appId;
            console.log("lookup url:>>>>>>>>>>>>>", url);
            try {
                const response = await fetch(url, {
                    method: 'POST',
                });
                const modalData = await response.json();
                setFilteredItems(modalData.displayData);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setIsLoadingModal(false);
            }
        };
        useEffect(() => {
            setIsOpen(true);
            fetchLookupData();
        }, [action, parameterDetails, appId]);
        return (
            <div
                style={{
                    top: "50%",
                    left: "50%",
                    transform: 'translate(-50%,-50%)',
                    position: 'absolute',
                    width: 300,
                    height: 400,
                    backgroundColor: 'white',
                    padding: 16,
                }}
            >
                {isLoadingModal ? (
                    <CircularProgress />
                ) : (
                    <>
                        <TextField
                            variant="outlined"
                            label="Filter"
                            value={filterValue}
                            onChange={handleFilterChange}
                        />
                        <List>
                            {filteredItems.filter((item) =>
                                item.displayName.toLowerCase().includes(filterValue.toLowerCase()))
                                .map((item) =>
                                (
                                    <ListItem key={item.key}>
                                        <ListItemText primary={item.value} />
                                    </ListItem>
                                ))}
                        </List>
                    </>
                )}
            </div>
        )
    };
    const handleIconClick = () => {
        setIsOpen(true);
    }
    const renderFields = (schemaData) => {
        if (!schemaData) {
            return null;
        }
        let modifiedSchemaData = schemaData.filter((field) => field.dataType.toUpperCase() !== 'TIMESTAMP' || field.dataType.toUpperCase() !== 'DATE');
        console.log("render fields::>> childformdetails lenghth:::", modifiedSchemaData.length);
        console.log("render fields::>> modifiedSchemaData:::", modifiedSchemaData);
        const totalElements = modifiedSchemaData.length;
        const itemsPerColumn = Math.ceil(totalElements / 6);
        const columns = Array.from({ length: 6 }, (_, i) => {
            const startIndex = i * itemsPerColumn;
            const endIndex = Math.min((i + 1) * itemsPerColumn, totalElements);
            return modifiedSchemaData.slice(startIndex, endIndex).map((field: any, index: number) => {
                const { datatype, lookUpDetailsVO, displayName, visible } = field;
                // const handleOpenAutoComplete = async () => {
                // console.log("Inside auto complete handle open>>>");
                // const fetchOpt = await fetchLookupOptions(lookUpDetailsVO.action, lookUpDetailsVO.parameterDetails, bltrObj['appId']);
                // if (fetchOpt.length > 0) {
                // console.log("fetchOpt:>>>>>", fetchOpt);
                // setLookupOptions(fetchOpt);
                // console.log("lookupOptions:>>>>>", lookupOptions);
                // // setIsOpen(true);
                // return fetchOpt;
                // }
                // }
                console.log("lookupvo details extracted from childfrmdetails:::::", lookUpDetailsVO);
                if (visible && lookUpDetailsVO && lookUpDetailsVO.customLookup && lookUpDetailsVO.parameterDetails) {
                    console.log("lookup vo action ::::>>>", lookUpDetailsVO.action);
                    console.log("lookup vo parameterDetails ::::>>>", lookUpDetailsVO.parameterDetails);
                    // const look=handleOpenAutoComplete();
                    // console.log("look................",look);
                    //setLookupFilteredOptions(look);
                    console.log("options set for dynamic lookup:::>>>", lookupOptions);
                    const appIdLook = bltrObj['appId'];
                    return (
                        <>
                            <Grid item xs={2} key={index}>
                                <FormControl fullWidth>
                                    <TextField
                                        value={selectedValue}
                                        InputProps={{
                                            endAdornment: (
                                                <>
                                                    <IconButton sx={{ color: "white" }} onClick={handleIconClick}>
                                                        {/* onClick={() => { handleOpenModal(lookUpDetailsVO.action, lookUpDetailsVO.parameterDetails, bltrObj['appId']) }}> */}
                                                        <Icon name={ICONS.CLOSE} />
                                                    </IconButton>
                                                    <IconButton sx={{ color: "white" }} onClick={handleIconClick}>
                                                        {/* onClick={() => { handleOpenModal(lookUpDetailsVO.action, lookUpDetailsVO.parameterDetails, bltrObj['appId']) }}> */}
                                                        <Icon name={ICONS.SEARCH} />
                                                    </IconButton>
                                                </>
                                            ),
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Modal id={field.dbField} open={isOpen} onClose={handleCloseModal}>
                                <ModelContent action={lookUpDetailsVO.action} parameterDetails={lookUpDetailsVO.parameterDetails} appId={appIdLook} />
                            </Modal>
                            {/* <Modal id={field.dbField} open={isOpen} onClose={handleCloseModal}
    aria-aria-labelledby='Modal-title' aria-aria-describedby='modal-description'>
    <Box sx={{
    position: 'absolute', top: "50%", left: "50%",
    transform: 'translate(-50%,-50%)', width: 400,
    bgcolor: 'background.paper', boxShadow: 24, p: 2
    }} >
    <h2 id="modal-title">Select Value</h2>
    <TextField
    value={selectedValue}
    onChange={(event) => handleSelectValue(event.target.value)}
    label="Value"
    fullWidth
    />
    <List>
    {lookupFilteredOptions.map((option) => (
    <ListItem key={option.key} onClick={() => handleSelectValue(option.key)} >
    <ListItemButton>
    <ListItemText primary={option.value} />
    </ListItemButton>
    </ListItem>
    ))}
    </List>
    <Box sx={{ display:"flex", justifyContent:"flex-end", marginTop:2}}>
    <Button variant="contained" onClick={handleCloseModal}>Close</Button>
    </Box>
    </Box>
    </Modal> */}
                        </>
                    );
                    // }
                }
                else {
                    // setOptions(lookUpDetailsVO.lookupvalues);
                    // }
                    // if (options.length > 0) {
                    if (visible && lookUpDetailsVO && lookUpDetailsVO.lookupValues && lookUpDetailsVO.lookupValues.length > 0) {
                        console.log("inside 2 lookupDetailsVO values:::::::::>>>>", lookUpDetailsVO.lookupValues);
                        let lookupOptions = lookUpDetailsVO.lookupValues;
                        // lookupOptions.unshift({displayName:"ALL",value:"ALL"});
                        // let selectLabel = field.displayName;
                        // console.log("selectLabel ::::::::::::>>>", selectLabel);
                        return (
                            <Grid item xs={2} key={index} sx={{ paddingBottom: "1%", height: '50px' }}>
                                {/* <Autocomplete
    id={field.displayName}
    disablePortal
    options={lookupOptions.map((option) => option.display)}
    renderInput={(params) => (
    <TextField
    {...params}
    label={field.displayName}
    />
    )}
    /> */}
                                {/* <FormControl sx={{ width: { md: '100%' } }}> */}
                                <FormControl fullWidth >
                                    <InputLabel id={field.dbField}>{field.displayName}</InputLabel>
                                    <Select
                                        autoComplete='true'
                                        label={field.displayName}
                                        labelId={field.dbField}
                                        id={field.displayName}
                                        // onChange={filterElementChange}
                                        displayEmpty
                                        fullWidth
                                        sx={{ textAlign: 'left' }}
                                        MenuProps={menuProps}
                                    >
                                        <MenuItem value="ALL">ALL</MenuItem>
                                        {lookupOptions.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option.display}
                                            >
                                                {option.display}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {/* </FormControl> */}
                            </Grid>
                        );
                    }
                    else if (visible && !(field.dataType.toUpperCase() === 'TIMESTAMP' || field.dataType.toUpperCase() === 'DATE')) {
                        return (
                            <Grid item xs={2} key={index} sx={{ paddingBottom: "4%", height: '50px' }}>
                                <TextField label={field.displayName} fullWidth onChange={(e) => textFeildChange(e.target.value, field.dbField)} />
                            </Grid>
                        );
                    }
                }
            });
        });
        return columns;
    };
    return (
        <div id="basicFormMainDiv">
            {isLoading && (
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <CircularProgress />
                </Box>)}
            <div id="basicFormDiv" style={{ height: "100% !important", opacity: isLoading ? 0.5 : 1, }}>
                <Grid container spacing={1} sx={{ display: 'flex !important', }}>
                    {renderedFields}&nbsp;
                    <Grid item xs={12} >&nbsp;<Divider /></Grid>
                    <Grid item xs={12}> <Grid container spacing={0.2} > {renderedDateFields}</Grid></Grid>
                    <Grid item xs={12} >
                        <Button variant="contained" onClick={handleButtonClick} sx={{ marginTop: "1%" }}>
                            Show List
                        </Button>
                        <Button variant="contained" onClick={handleReset} sx={{ marginTop: "1%", marginLeft: "1%" }}>
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};