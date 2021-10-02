import fetch from 'node-fetch';
var url = 'https://gist.githubusercontent.com/Loetfi/fe38a350deeebeb6a92526f6762bd719/raw/9899cf13cc58adac0a65de91642f87c63979960d/filter-data.json';

let settings = {
    method: "Get"
};

fetch(url, settings)
    .then(res => res.json())
    .then((json) => {
        // let arr = json.data.response.billdetails;

        // function search(myArray) {
        //     var result = []
        //     for (var i = 0; i < myArray.length; i++) {
        //         // string = myArray[i].body[0].replace(/^\s+|\s+$/g, "");
        //         const temp = myArray[i].body[0].replace(/\s/g, '').split(":");
        //         if (temp[1] >= 100000) {
        //             result.push(temp[1]);
        //         }
        //         // if (myArray[i].name === nameKey) {
        //         //     return myArray[i];
        //         // }
        //     }
        //     return result
        // }

        // var resultDenom = search(arr);

        let resultDenom = json.data.response.billdetails.map(data => data.body[0].split(": ")[1]).filter(data => data >= 100000);

        console.log(resultDenom)
    });