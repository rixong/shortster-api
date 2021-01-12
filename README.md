# Shortster - API

### Github Repository:
https://github.com/rixong/shortster-api

You will also need to install and run [Shorster SPA](https://github.com/rixong/shortster-spa) on the same machine.

## Installation:
Clone the folder locally from GitHub, install dependencies and start server in Development mode
```
npm install
npm run dev
```
You will need to install MongoDB on your local machine:
* Download the MongoDB Community Server [here](https://www.mongodb.com/try/download/community).
* Extract the contents and copy the MongoDB Folder (rename to mongodb) into your User folder (Mac).
* Create a mongodb-data folder in the same folder for storing the data.
* In your terminal navigate to your user folder
* Start the DB with the following command:
  ```
  /Users/yourUserName/mongodb/bin/mongodb --dbpath=/Users/yourUserName/mongodb-data
  ```
* The API is configured to run on the default (stored in dev.env): 
  mongodb://127.0.0.1:27017/shortster


## App Instructions (Client side):
CREATING A Short URL:
1. Navigate to Root URL (localhost:3001/) to display the form.
2. Copy and Paste desired long URL from a website into the 'Long URL' field.
3. Optionally enter a short URL (4 or more characters, only letters and numbers) into the 'short URL' field. 
4. If you do not enter a short URL one will be generated for you.
5. Submit the request to display your new short URL.

NAVIGATING to the URL using your short URL:
1. Append your short URL to the Root URL (localhost:3001/myShortUrl) and submit.
2. You will be redirected to the original page, if the URL is valid.

VIEWING Stats:
1. Append '/stats' to the short URL to view statistics (localhost:3001/myShortUrl/stats).

## Assumptions:
A 'longURL' refers to an existing URL. My first version I had the shortURL refer to a fictitious pathname, as if we were redirecting to a URL within the local domain, but decided it made more sense have the shortURLs link to real URLS in the wild.

## Technology:
* Node.js v.14.4.0
* Express v.4.17.10
* MongoDB v.4.2.7
* Mongoose v.5.11.10
