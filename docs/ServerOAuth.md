# OAuth for Facebook and Twitter on the API Server

Changed the Python server SDK to V12.0 on April 25, 2022 (from V6.0).  V13 is the latest, but what was the latest version of social_django had problems with it.   

## Run your local python api server in SSL (https)

In your environment_variables.json
Replace all (6) urls from `http://localhost:8000/` to `https://wevotedeveloper.com:8000/`

(Explanation at https://github.com/teddziuba/django-sslserver)

Then start a SSL-enabled debug server:

![ScreenShot](images/RunSslServer.png)
![ScreenShot](images/RunningSslServer.png)

or 

```
  $ python manage.py runsslserver wevotedeveloper.com:8000
```

and access the API Server Python Management app on https://wevotedeveloper.com:8000

The first time you start up the [runsslserver](https://github.com/teddziuba/django-sslserver) the app may take a full minute to respond to the first request.


## Facebook

### /etc/hosts

[If you define a redirect URL in Facebook setup page, be sure to not define http://127.0.0.1:8000 or http://localhost:8000 because it won’t work when testing. Instead I define http://wevotedeveloper.com and setup a mapping on /etc/hosts.](https://python-social-auth.readthedocs.io/en/latest/backends/facebook.html)

So we have to make a small change to /etc/hosts, before:
```
    (venv2) stevepodell@StevesM1Dec2021 WeVoteServer % cat /etc/hosts
    ##
    # Host Database
    #
    # localhost is used to configure the loopback interface
    # when the system is booting.  Do not change this entry.
    ##
    127.0.0.1       localhost
    255.255.255.255 broadcasthost
    ::1             localhost
    (venv2) stevepodell@StevesM1Dec2021 WeVoteServer % 
```
We have added a fake local domain `wevotedeveloper.com` for the [Facebook Valid OAuth Redirect URIs](https://developers.facebook.com/apps/1097389196952441/fb-login/settings/), 
you need to add that domain to your 127.0.0.1 line in /etc/hosts.  After the change:
```
    (venv2) stevepodell@StevesM1Dec2021 WeVoteServer % cat /etc/hosts
    ##
    # Host Database
    #
    # localhost is used to configure the loopback interface
    # when the system is booting.  Do not change this entry.
    ##
    127.0.0.1       localhost wevotedeveloper.com
    255.255.255.255 broadcasthost
    ::1             localhost
    (venv2) stevepodell@StevesM1Dec2021 WeVoteServer % 
```
On the [Facebook Login Settings](https://developers.facebook.com/apps/1097389196952441/fb-login/settings/) page under Valid OAuth Redirect URIs
we have an entry `https://wevotedeveloper.com:8000/complete/facebook/` that will allow the 
3 leg OAuth redirect, to find its way back to the Python app (the Api Server). 


### Debugging Facebook Oauth

Just a list of starting points for next time.

This is the key file for Oauth2: `venv2/lib/python3.9/site-packages/social_core/backends/facebook.py`

curl -i -X GET "https://graph.facebook.com/v12.0/oauth/access_token?client_id=1097389196952441&redirect_uri=https%3A%2F%2Fwevotedeveloper.com%3A8000%2Fcomplete%2Ffacebook%2F&client_secret=<secret>&code=<code generated by previous leg in OAuth>"

https://github.com/python-social-auth/social-app-django

https://github.com/python-social-auth/social-core

Sign in with Facebook   https://api.wevoteusa.org/login/facebook/?next=.

https://python-social-auth.readthedocs.io/en/latest/backends/facebook.html

https://medium.com/@kennethjiang/python-social-auth-for-django-tutorial-16bbe792659f

## Twitter

  "SOCIAL_AUTH_TWITTER_KEY":        "w...w",   Twitter calls this the "API Key" from the "Consumer Keys" section
  "SOCIAL_AUTH_TWITTER_SECRET":     "4...H",   Twitter calls this the "Secret" from the "Consumer Keys" section

### Debugging Twitter Oauth

Terminology could be more consistent in the Twitter and social_django docs 
* App Key === API Key === Consumer API Key === Consumer Key === Customer Key === oauth_consumer_key
* App Key Secret === API Secret Key === Consumer Secret === Consumer Key === Customer Key === oauth_consumer_secret
* Callback URL === oauth_callback

https://developer.twitter.com/en/docs/authentication/oauth-1-0a/obtaining-user-access-tokens
https://developer.twitter.com/en/docs/authentication/api-reference/request_token