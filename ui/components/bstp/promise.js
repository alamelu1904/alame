promisData.then(res => {
    console.log("Lookup dets::", res);

    // Access first element in the array (if it's an array)
    const firstEntry = res[0]; 

    // Access `lookupData` inside `firstEntry`
    const lookupArray = firstEntry?.lookupData; 

    // Access first element inside `lookupData`
    const firstLookupItem = lookupArray?.[0];

    // Get the `filterID`
    const filterID = firstLookupItem?.filterID;

    console.log("First Lookup Entry:", firstLookupItem);
    console.log("Filter ID:", filterID);
});
