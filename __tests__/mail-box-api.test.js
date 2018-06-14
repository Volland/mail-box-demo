const request = require('request-promise');

describe('Mail Box api ', () => {

    const messageRequest = {
        message:  "If you can keep your head when all about you Are losing theirs and blaming it on you,",
        sender: "RUDYARD KIPLING",
        subject:" if"
    };

    describe('create happy path flow ',  () => {
        let newResourceLocation = null;
        it('should create a new Message and return it location ' , (done) => {
            request({
                method: 'POST',
                uri: 'http://mail-box-api:8080/api/messages',
                headers: {
                    contentType: 'application/json'
                },
                auth:{
                    'user': 'oberlo',
                    'pass': 'cool42'
                },
                body: messageRequest,
                json: true,
                resolveWithFullResponse: true,
            }).then(response => {
                expect(response.statusCode).toBe(201);
                expect(response.headers.location.startsWith("http://mail-box-api:8080/api/messages/"));
                newResource = response.headers.location;
                done();
            }).catch(done.fail)
        });

        it('New resource should be available on location ', ()=> {
            request({
                method: 'GET',
                uri: newResourceLocation,
                headers: {
                    contentType: 'application/json'
                },
                auth:{
                    'user': 'oberlo',
                    'pass': 'cool42'
                },
                json: true,
                resolveWithFullResponse: true,
            }).then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body.is_read).toBe(false);
                expect(response.body.is_archived).toBe(false);
                expect(response.body.sender).toEqual(messageRequest.sender);
                done();
            })
        })
    });


});
