# Oauth Node Passport

A social media integration application that allows you so sign in via OAuth with  Google, Facebook or Twitter.
API calls are then made to the facebook API using the access token recieved after login.

Users data from these accounts is stored within MongoDB so that information from all providers can be pulled back from a single location if available.

The project makes use of:
- NodeJS
- EJS (Embedded Javascript Templates)
- MongoDB
- Passport
- Oauth
- Express
- Google API
- Twitter API
- Facebook API

## Flow:

1. Register this application with an OAuth API provider i.e. google. Upon doing so you will be granted a client key and secret for this application.
 -  The client key is essentially the API key associated with the application (Twitter, Facebook, etc.). This key is what identifies the client. By the way, a client is a website/service that is trying to access an end-user's resources.
 -  The client secret is the client password that is used to authenticate with the authentication server, which is a Twitter/Facebook/etc. server that authenticates the client.

2. Update the passport strategies for each OAuth provider with the keys and secrets. Also specify what scopes this application will request access to. For example the users profile and email information.

3. A user runs up the application and decides to sign in with Google. The user is redirected to a google page that displays what the application wishes to have access to i.e. email. It requires the user to enter their credentials and to approve access to this information. Upon doing so the user is redirect back to a new page (providing an access token) on the app that will display information from the users google profile.

   At no time will this application ever have access to, store or have knowledge of the users Google credentials. In addition at any time the user can login to google and revoke the access rights of this application.

   The access token is what is issued to the client once the client successfully authenticates itself. This access token defines the privileges of the client (what data the client can and cannot access). Now every time the client wants to access the end-user's data, the access token is sent with the request.

## Notes
You must add you own client IDs and client secrets to the passport strategy config files. They can be attained by creating accounts with each provider (see below links) and registering this application.
The redirect URL can remain unchanged.

## Links
- https://developers.facebook.com/
- https://developer.twitter.com/content/developer-twitter/en.html
- https://developers.google.com/+/web/api/rest/oauth#email

