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
promisData.then(res => {
    console.log("Full Response:", res);

    // Directly access lookupData if res is an object
    const lookupArray = res.lookupData; 

    if (lookupArray && lookupArray.length > 0) {
        const firstLookupItem = lookupArray[0]; // Get first item in lookupData
        console.log("First Lookup Entry:", firstLookupItem);
        console.log("Filter ID:", firstLookupItem?.filterID);
    } else {
        console.log("No lookupData found");
    }
});



promisData.then(res => {
    if (Array.isArray(res)) {
        // If `res` is an array, iterate through each object
        res.forEach((item, index) => {
            if (Array.isArray(item.lookupData)) {
                item.lookupData.forEach((lookup, idx) => {
                    console.log(`Object ${index}, Lookup ${idx} - Filter ID:`, lookup?.filterId);
                });
            }
        });
    } else if (typeof res === "object" && res !== null) {
        // If `res` is a single object, access `lookupData` directly
        if (Array.isArray(res.lookupData)) {
            res.lookupData.forEach((lookup, idx) => {
                console.log(`Lookup ${idx} - Filter ID:`, lookup?.filterId);
            });
        }
    } else {
        console.log("Unexpected response format.");
    }
}).catch(error => {
    console.error("Error fetching data:", error);
});



promisData.then(res => {
    console.log("Full Response:", res);

    if (Array.isArray(res) && res.length > 0) {
        res.forEach((obj, objIndex) => {
            if (Array.isArray(obj.lookupData) && obj.lookupData.length > 0) {
                obj.lookupData.forEach((lookup, lookupIndex) => {
                    console.log(`Object ${objIndex}, Lookup ${lookupIndex} - Filter ID:`, lookup?.filterId);
                });
            } else {
                console.log(`Object ${objIndex} - lookupData is missing or empty.`);
            }
        });
    } else {
        console.log("Response is not a valid array or is empty.");
    }
}).catch(error => {
    console.error("Error fetching data:", error);
});


promisData.then(res => {
    const filterIds = [];

    if (Array.isArray(res) && res.length > 0) {
        res.forEach(obj => {
            if (Array.isArray(obj.lookupData)) {
                obj.lookupData.forEach(lookup => {
                    if (lookup?.filterId) {
                        filterIds.push(lookup.filterId);
                    }
                });
            }
        });
    }

    console.log("All Filter IDs:", filterIds);
}).catch(error => {
    console.error("Error fetching data:", error);
});


promisData.then(res => {
    res?.forEach(obj => 
        obj?.lookupData?.forEach(lookup => 
            console.log("Filter ID:", lookup?.filterId ?? "No filterId found")
        )
    );
}).catch(error => {
    console.error("Error fetching data:", error);
});
