# auth0-webtask

This is a simple example of how to use webtask.io.

The goal of this webtask is to send email notifications to a broad list of recipients whenever an Issue Event takes place in a repository. Github provides email push notifications for most of the events that take place and of course it's possible for someone to monitor a repository and the issues created.

This webtask however can help someone to keep a list of recipients and forward the issues events to them.

This is done using GMail as the email provider.

If you want to try it, get the code and create a webtask like this:

```
wt create --secret GMAIL_USER=<username> --secret GMAIL_PASSWORD=<password> github-email.js
```

You also need to create a webhook in the github repository for Issues Events and you also might need to enable Google's "Less secure apps" [here](https://myaccount.google.com/lesssecureapps). 
