# Intro 
Pagination is a wide topic. You could find crazy amount ways and algorithms. 
# Decision 
- Key decision driver for sure should be a customer case and requirements. 

# The key questions:
- First of all is data volume .If you have a small data set it is don't really matter. you could even use a
limit offset on db level and be quite happy with a solution. 
- Some how the structure and volume define a type of the data storage. So concrete storage or DB could have 
efficient way of applying one or another pagination mechanism. As far as I decide to stay with a postgres DB and we have structured data.
## Use case questions.
- Do you need total page numbers ?
- Do you need page random access ?
- Is a page size are configurable and flexible ?

All this could heavenly effect performance of queries and api. 

### Strategies . 

#### Cursor / continuation Token  
Mail box is more like a twitter or etc. I as a user dont really care how many pages I have and how to go to page 55.
Lets assume tha we do not need a random page access and do more infinite scroll or next/more messages case. 
But we sill allow to tune a page size (it could give a benefit for mobile consumers)

### Idea
 Client receive a link to next page a meta data together with an arbitrary parameters 
 On a message Table we already have a send at times temp. so it is perfectly fine.
 We need one more auto increment sequence field. I see that Id could to a work quite well.
  
  
 

    
  
 