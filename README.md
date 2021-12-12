# discussion_forums_backend
## Prerequisites
First, it is needed to have MySQL command line installed on the the device running the project.

## Create a schema
The command needed to be run in the MySQL command line is:
```
CREATE SCHEMA schema_name;
GO
```

## Create a .env file
The .env file should be written like the .env.example file present in the repository.

## npm i
Run the following command:
```
npm i
```

## npm run dev
Run the following command after the ```npm i```
```
npm run dev
```

## Static Data
Some static data were created when starting the system by the function ```init()``` like:


###User 1 (student): 
email: meyer.wafik@gmail.com
password: password


###User 2 (student):
email: youssef.magdy@gmail.com
password: mypassword


###User 3 (Tutor):
email:marina.hany@gmail.com
password: justapassword