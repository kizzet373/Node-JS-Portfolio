window.fbAsyncInit = function(){
	FB.init({
		appId      : '146097342692313',
		cookie     : true,
		xfbml      : true,
		version    : 'v2.9'
	});
	FB.AppEvents.logPageView();
	checkLoginState();
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}

function testAPI() {
	FB.api('/me?fields=posts{from,message,attachments}', function(response){
		if(response && !response.error){
			var postFeed = $("#facebookPostFeed");
			console.log(response);			
			for(index in response.posts.data){
				let post = response.posts.data[index];
				var postHTML = {};
				
				if(post.attachments){
					postHTML.attachments = [];
					postHTML.attachmentString = "";
					postHTML.descriptionString = "";
					for(index in post.attachments.data){
						let attachment = post.attachments.data[index];
						
						if(attachment.media.image){
							let attachmentString = "<div class=\"facebookPostAttachment\"><img src=\"" + attachment.media.image.src + "\"></div>";
							postHTML.attachmentString += attachmentString;
							attachment.attachmentString = attachmentString;
						}
						if(attachment.description){
							let descriptionString = "<div class=\"facebookPostAttachmentDescription\">" + attachment.description + "</div>";
							postHTML.descriptionString += descriptionString;
							attachment.descriptionString = descriptionString;
						}	
						
						postHTML.attachments.push(attachment);
					}
				}
				if(post.from){
					postHTML.from = ("<div class=\"facebookPostFrom\">" + post.from.name + "</div>");
				}
				if(post.message){
					postHTML.message = ("<div class=\"facebookPostMessage\">" + post.message + "</div>");
				}
				postFeed.append("<div class=\"facebookPost\">" + 
				(postHTML.from ? postHTML.from : "") + 
				(postHTML.message ? postHTML.message : "") + 
				(postHTML.attachmentString ? postHTML.attachmentString : "") + 
				(postHTML.descriptionString ? postHTML.descriptionString : "") + 
				"</div></br>");
			}
		}		
	})
}

function statusChangeCallback(response){
	if(response.status === 'connected'){
		console.log('logged in!');
	}
	else{
		console.log('you failed bruh!')
	}
}