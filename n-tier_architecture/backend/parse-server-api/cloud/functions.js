Parse.Cloud.define('hello', req => {
    req.log.info(req);
    return 'Hi from Parse Server';
});
