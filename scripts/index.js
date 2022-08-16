var adminAuth = AsgardeoAuth.AsgardeoSPAClient.getInstance();
adminAuth.initialize({
    signInRedirectURL: "https://nimbuzz01.github.io/Grama-Check-Front-End-2.0/officer-portal.html",
    signOutRedirectURL: "https://nimbuzz01.github.io/Grama-Check-Front-End-2.0/index.html",
    clientID: "RMhFnIyA4u21SQrYA1mGaGNUAo8a",
    baseUrl: "https://api.asgardeo.io/t/sample404",
    scope: ["openid", "profile"]
});


adminAuth.signIn({ callOnlyOnRedirect: true })
var userAuth = AsgardeoAuth.AsgardeoSPAClient.getInstance();

// Once instantiated, the  client can be initialized by passing the relevant parameters such as the server origin, redirect URL, client ID, etc.
userAuth.initialize({
    signInRedirectURL: "https://nimbuzz01.github.io/Grama-Check-Front-End/user-portal.html",
    signOutRedirectURL: "https://nimbuzz01.github.io/Grama-Check-Front-End/index.html",
    clientID: "5ynhFBWAfqYznFHVf0J5mYAxexAa",
    baseUrl: "https://api.asgardeo.io/t/sample404",
    scope: ["openid", "profile"]
});


userAuth.signIn({ callOnlyOnRedirect: true })