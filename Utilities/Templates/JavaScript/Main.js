/**
 * @author Charlie Calvert
 */

require.config({
	paths : {
		"jquery" : "jquery-2.1.1"
	}
});

require(['jquery'], 

	function(jq) {
		'use strict';
		console.log("Main called");
	}

);
