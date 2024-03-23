require([
    "esri/portal/Portal",
    "esri/identity/OAuthInfo",
    "esri/identity/IdentityManager"
  ], function (Portal, OAuthInfo, esriId) {

    const info = new OAuthInfo({
        appId: "fSRWfFKTGHOCymjW",
        popupCallbackUrl: "oauth-callback.html",
        popup: true,
        portalUrl: "https://geos.rer.sa/portal"
    });
      esriId.registerOAuthInfos([info]);

      esriId
        .checkSignInStatus(info.portalUrl + "/sharing")
        .then(() => {
          handleSignedIn();
        }).catch(() => {
            handleSignedOut();
        });

        /*document.getElementById("sign-in").addEventListener("click", function () {
          esriId.getCredential(info.portalUrl + "/sharing");
        });*/
        document.getElementById("sign-in").addEventListener("click", () => {
          esriId.getCredential((info.portalUrl + "/sharing"), {
            oAuthPopupConfirmation: false
          }).then(function() {
            handleSignedIn();
          });
        });

        document.getElementById("sign-out").addEventListener("click", function () {
          esriId.destroyCredentials();
          window.location.reload();
        });

    function handleSignedIn() {

        //const portal = new Portal();
        const portal = new Portal({
            url: "https://geos.rer.sa/portal"
          });
        portal.load().then(() => {
            /*const results = { name: portal.user.fullName, username: portal.user.username };
            document.getElementById("results").innerText = JSON.stringify(results, null, 2);*/
            document.getElementById("sign-in").style.display = "none";
            //document.getElementById("sign-out").style.display = "block";
            document.getElementById("profile-info").style.display = "block";
            document.getElementById("welcome").style.display = "block";
            document.getElementById("profile-name").textContent = portal.user.fullName;
            if (portal.user.thumbnailUrl) {
              document.getElementById("profile-pic").src = portal.user.thumbnailUrl;
            } else {
              document.getElementById("profile-pic").src = "images/logo/img_avatar.png";
            }
        });
    }

    function handleSignedOut() {
      document.getElementById("sign-in").style.display = "block";
      //document.getElementById("sign-out").style.display = "none";
      document.getElementById("profile-info").style.display = "none";
      document.getElementById("welcome").style.display = "none";
    }
  });