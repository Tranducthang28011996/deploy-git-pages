import api_config from './api_config';


/**
 * Load the cars from the spreadsheet
 * Get the right values from it and assign.
 */
export const load = (callback) => {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: api_config.spreadsheetId,
        range: "ThangTD!A3:L3"
      })
      .then(
        response => {
          const data = response.result.values;
          console.log(data)
          const cars = data.map(car => ({
            year: car[0],
            make: car[1],
            model: car[2]
          })) || [];
          callback({
            cars
          });
        },
        response => {
          callback(false, response.result.error);
        }
      );
  });
}


// export const updateCell = (callback) => {
//   window.gapi.client.load("sheets", "v4", () => {
    
//   });
// }

/**
 * Update a single cell value
 */
export let  updateCell = () => {
	var params = {
		spreadsheetId: api_config.spreadsheetId,
        range: 'ThangTD!A3:L3',
        valueInputOption: 'USER_ENTERED'
	};

	var valueRangeBody = {
 	 "values": [
	    [
    	  "thaddng"
    	]	
  	]
	}
	window.gapi.client.load("sheets", "v4", () => {
  	var request = window.gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
      request.then(function(response) {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
      }, function(reason) {
        console.error('error: ' + reason.result.error.message);
      });
  });
}