# mail-box-demo
A local firm is building a small E-mail client to manage their internal messaging.
You have been asked to implement a basic mailbox API in which the provided messages are listed. Each message can be marked as read and you can archive single messages.

# How To Run 
If you want to run it locally . You could you a docker compose & docker 
## Dockerized  way 
 - make sure you have docker installed. if not follow the instruction [instructions for your OS](https://docs.docker.com/install/)
 - make shure you have docker compose installed. If not follow the [instructions for your OS](https://docs.docker.com/compose/install/)

Now you have all that you need. 
So run from the root of the repo. 

``nash
docker-compose up --build --force-recreate
``

It will build form scratch . 3 containers. 
**WARN** We use 8080 and 5432 ports. Make sure that ports are free 

Wait a bit ....

# Where to go 
[Local api:  http://localhost:8080/api-docs/](http://localhost:8080/api-docs/) We have embedded Swagger UI as a part of 
solution. All api related information could be found there . The  good part of it you could try to run any endpoint and observe 
results and behaviors.

## The secret
Ptsss !!
Part of the task was a basic authentication. So we have a dynamic basic auth
 - user should start from  **oberlo** + any string 
 - password should start **from cool42** + any string 
 Sample  request :
 ```sh
 curl -u oberlo1:cool421 http://localhost:8080/api/messages
```
     
# Architecture 

## The api
In a task it self we have a clear statement : Rest API with JSON format. 
It is really simplify a lot of decisions.
REST is resource centric 
We have one recourse - message .
We prefer manipulation over resource instead of action like api.  

|Requirement| api endpoint | sample url |
|-----------|--------------|------------|
| List messages| get messages| curl -u oberlo1:cool421 http://localhost:8080/api/messages?limit=5|
|List archived messages| get messages | curl -u oberlo1:cool421 http://localhost:8080/api/messages?limit=5&q=archived|
|Show message | get messages/id |  http://localhost:8080/api/message/5|
|Read message | patch messages/id | curl -u oberlo1:cool421 -X PATCH "http://localhost:8080/api/messages/5" -H "accept: application/json"  -H "Content-Type: application/json" -d "{ \"is_read\": true}" |
|Archive message | patch messages/id | curl -u oberlo1:cool421 -X PATCH "http://localhost:8080/api/messages/5" -H "accept: application/json"  -H "Content-Type: application/json" -d "{ \"is_archived\": true}"|
|----------------|-------------------|------------------|
|Read & archive |  patch messages/id | curl -u oberlo1:cool421 -X PATCH "http://localhost:8080/api/messages/5" -H "accept: application/json"  -H "Content-Type: application/json" -d "{ \"is_archived\": true, \"is_read\": true}"|
| create message| post  messages | curl -X POST "http://localhost:8080/api/messages" -H "accept: application/json" -H "authorization: Basic b29iZXJsbzE6Y29vbDQy" -H "Content-Type: application/json" -d "{  \"sender\": \"stephen hawking\", \"subject\": \"the short history of time \", \"message\": \"the history\"}"|

As you can see we have few **bonus** actions 
- I decide that with out create . API is incomplete.
- path allow you to set read and archive fields together . As far as it is same partial update of resource.

One more note : I prefer to return Location header with a new/updated resource. It could save a lot of queries to db.
If user really need a updated data . He could request it. Probably client that modify resource already know a future state only 
one key knowladge missed is a status of operation.

Operation statuses 

|status |code |
|-------|-----|
| created| 201|
|updated |200|
|not changed | 304|

 
# Decision Log

# What next ....
