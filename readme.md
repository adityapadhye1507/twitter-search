###TWITTER PROJECT  

###Demo URL
https://twitter-search-project.herokuapp.com/

###Introduction
This search application allows user to perform various queries on the available **twitter data collection**.   

#### Features/Functionalities
1. **Database Connection Process:** The application connects to the database and confirms that connection has been established by means of a pop up window.

2. **Search Functionality:** 
	a. It has different web-based search fields that asks user for query strings
	b. The response to the user’s request, present the user
	   with a selection list of documents answering the request, but
		not the content of the document.

		* Keyword Search Textfield: It supports partial word search
		* UserId Search Field: It supports literal word search
		* UserName Search Field: It supports partial word search
		* Date and Time Search Field: It support the search for tweets between a particular time period
		
	c. Once presented with the selection list, by title, by date, or
		other identifying information, the user will be able to select 		the desired document to view the content.
	d. The user is presented with the option to search again and
		again until they want.
				
3. **Comment Feature:** 

	The user has the ability to add a separate annotation/comments to the selected document. Annotations are stored in separate the document and will show in subsequent retrievals of the document.These comments are linked with the document using the objectId associated with the document.

	* User comments can be added to the documents
	* User comments are retrieved with the document


4. **Additional Features:**

	* Literal word search feature
	* Partial word search capabilities
	* Document list is returned to the user for selection
	* Documentlist includes date and author
	* User can select the document to view and entire selected document is displayed
	* User can exit the list to perform a new search
	* User can exit the detials view to perform a new search

	
5. **Location Map Features**

	When the user details are retrieved at the end of the search, it 	also displays the location on google maps using the latitude and 	longitude of the user. 

### Technologies

**BackEnd:** 
MongoDb Database Management System is used as our database.
Expressjs module to create a server application.

**FrontEnd:**
HTML to create views.
AngularJS to create the front end view.
Javascript to 		
### Required Modules
	
	* NodeJs
	* Express
	* Bootstrap
	* Ejs
	* Mongoose

### Installation	
#### Step 1
Connect to the database. Change the database URL according to the local mongodDB schema.
To do that,go to 

***path/to/twitter-search/config/database.js*** 

file and edit it according to the need.
#### Step 2
Run the database. Run command ***mongod*** in terminal or command prompt to start the mongoDB server.
#### Step 3
Install the dependencies. We have to run npm install before starting the project. Go to your terminal and run this:

***path\to\twitter-search>npm install***

This will resolve all the dependencies listed in package.json file. Once its is done downloading, you should have a node_modules directory which contains all of the required dependencies.
#### Step 4

To run the application, run the command

***path\to\twitter-search>npm start***

It's going to start a server which will serve the ***http://localhost:3000/*** url.
 

### Configuration

* We have bin/www file to configure port for the application.
* congfig/database.js file which has db configuration in it.
* package.json file for listing dependencies

### Contributors
* Aditya Padhye
* Chevelyne Melvin De Mello
* Pooja Sharma
* Khando Dechen
