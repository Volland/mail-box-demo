# Storage 
As I can see data is structured and fit well in a relation model.
I believe that any relational could do a work 

## DB 
Lets use a postgres . It is free and have a lot of nice features

## Access Layer 
I am not a big fun of any kind of ORM but to speed-up a woek lets use a Sequelize

Main features 
   - connection pool / connection managment 
   - migrations 
   - abstract layer.
    
## DB schema 
So after quick look to a json file . 
I could extract at list message entity 

|field|type|
|-----|----|
|id   |long|
|subject| varchar(60)|
|message| text|
|sender| varchar(200)|
|sent_at| long|
|is_read| bool |
|is_archived | bool| 

I is recommend to use 3rd Normal form and do not mix entities
It nice to have user table <id , first_name , second_name> 

|field|type|
|-----|----|
|id   |long|
|first_name| varchar(30)|
|second_name| varchar(30)|

In a future it could help to add a recipient concept and extend a system for personalised read/archived messages statuses


 

