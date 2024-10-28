const searchQueryChecker = (obj, filtersList, searchQuery) => {
  if (filtersList.length > 0) {
    if (filtersList.length == 1 && filtersList[0].toLowerCase() == "gender") {
      // console.log(filtersList, searchQuery);
      for (const key in obj) {
        // console.log(String(obj[key]).toLowerCase(), searchQuery.toLowerCase())
        if (
          key.toLowerCase() == "gender" &&
          String(obj[key]).toLowerCase() == searchQuery.toLowerCase()
        ) {
          return true;
        }
      }
    } else {
      for (const key in obj) {
        if (
          filtersList.includes(key) &&
          (String(obj[key])
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) || JSON.stringify(obj[key])
            .toLowerCase()
            .includes(searchQuery.toLowerCase()))
        ) {
          return true;
        }
        // if (key!=='_id' && typeof obj[key] === "object" && obj[key] !== null) {
        //   // If the value is an object, recursively traverse it
        //   if (filtersList.includes(key) && JSON.stringify(obj[key]).includes(searchQuery)) {
        //     return true;
        //   }
        //   return searchQueryChecker(obj[key], filtersList, searchQuery);
        // } else {
        //   // If it's not an object, do something with the key-value pair
        //   if (filtersList.includes(key) && JSON.stringify(obj[key]).includes(searchQuery)) {
        //     return true;
        //   }
        // //   console.log(key, obj[key]);
        // }
      }
    }
  } else {
    for (const key in obj) {
      if (
        key !== "_id" &&
        (JSON.stringify(obj[key])
          .toLowerCase()
          .includes(searchQuery.toLowerCase() || String(obj[key])
          .toLowerCase()
          .includes(searchQuery.toLowerCase())))) {
        return true;
      }
      //   if (key!=='_id' && typeof obj[key] === "object" && obj[key] !== null) {
      //     // If the value is an object, recursively traverse it
      //     console.log('line23 ', JSON.stringify(obj[key]));
      //     if (JSON.stringify(obj[key]).includes(searchQuery)) {

      //       return true;
      //     }
      //     return searchQueryChecker(obj[key], filtersList, searchQuery);
      //   } else {
      //     // If it's not an object, do something with the key-value pair
      //     // console.log("hello")
      //     if (JSON.stringify(obj[key]).includes(searchQuery)) {
      //       return true;
      //     }
      //     // console.log(key, obj[key]);
      //   }
    }
  }
};

module.exports = { searchQueryChecker };
