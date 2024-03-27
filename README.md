# nodejs-cookies
A demo of how to use cookies within Node.JS and allocate permission to specific handlebars pages. 

Step 1
Create a .env in the root folder and add a value to SALT_TOKEN=.

Step 2
http://127.0.0.1:3000/api/v1/
This will validate the server is running with no issues. 

Step 3
http://127.0.0.1:3000/api/v1/create-cookie
This will create the cookie. View in Developer Tools > Application > Cookies.

Step 4
http://127.0.0.1:3000/api/v1/test
Test that you can view this link without receiving the message "Access Denied".

Step 5
http://127.0.0.1:3000/api/v1/expire-cookie
This will expire the cookie. View in Developer Tools > Application > Cookies.

Step 6
http://127.0.0.1:3000/api/v1/test
Now that the cookie is expired, you should receive the message "Access Denied".