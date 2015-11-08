import jQuery from 'jquery';

module.exports = {

	api_url: 'https://feelingrestful.hmn.md/wp-json',

	lastRequest: null,

	get: function( url, data, callback ) {

		return this.request( 'GET', url, data, callback );
	},

	post: function( url, data, callback ) {

		return this.request( 'POST', url, data, callback );
	},

	request: function( method, url, data, callback ) {

		this.lastRequest = {
			method: method,
			url: url,
			args: data,
			isLoading: true,
			data: null
		}

		var xhr = jQuery.ajax( this.api_url + url, {
			data: data,
			success: ( data ) => {
				this.lastRequest.isLoading = false
				this.lastRequest.data = data
				if ( ! callback ) {
					return;
				}
				callback( data, null, xhr.getAllResponseHeaders() );
			},
			method: method
		} );

		xhr.fail( err => {
			this.lastRequest.isLoading = false
			if (xhr.status === 0) {
				if (xhr.statusText === 'abort') {
					// Has been aborted
					return;
				} else {
				  	// Offline mode
				}
			}

			if ( err.responseJSON && err.responseJSON[0] ) {
				this.lastRequest.data = err.responseJSON[0]
				if ( ! callback ) {
					return;
				}
				callback( null, err.responseJSON[0] );
			} else {
				alert( err.statusText );
			}
		} );

		return xhr;
	},
}
