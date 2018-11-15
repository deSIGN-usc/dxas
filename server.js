var express  = require('express');
var app      = express();                               
var port     = process.env.PORT || 3636;                
var morgan = require('morgan');         
var bodyParser = require('body-parser');    
var methodOverride = require('method-override'); 
var router = express.Router();
var request = require('request');
var googleMapKey = "AIzaSyAfIgNHK1qi0gwVevFDlC67u-_CWuObr1A"
var ticketMasterKey = "GmQcXaisPSAuTHzHcuD34FIolaGsJ7Qo"
var googleSearch = "AIzaSyDD2V3bAQxyk7B4GeVrkn7Ehau4OjywSJY"
var searchEngineID = "002492929119875864733:uzfi2o_cn2q"
var songkickID = "AUvRvEljfWy7ffKF";
var SpotifyWebApi = require('spotify-web-api-node');
var scopes = ['user-read-private', 'user-read-email'];

// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: '48a67ef9f4f64187bc1875d9563677c0',
    clientSecret: '1ba25125f3ba47cdabfe4249b781f0c4'
});

var accessToken1 = "";


// Get an access token and 'save' it using a setter


app.get('/server/getLocation', function(req, res, next) {
    var url = 'https://maps.google.com/maps/api/geocode/json?address='
    + req.query.location + '&key='
    + googleMapKey;
    request(url, function(err, response, body){
        if (err) { 
            console.log('error');
            res.send(err); 
        }
        else{
            res.send(body);
        }
    });
});

app.get('/server/getResults', function(req, res, next) {
    lat = req.query.latitude;
    lng = req.query.longitude;
    var url = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=' 
    + ticketMasterKey + '&keyword='
    + encodeURI(req.query.keyword) + '&segmentId='
    + encodeURI(req.query.category) + '&radius='
    + encodeURI(req.query.distance) + '&unit='
    + encodeURI(req.query.units) + '&geoPoint='
    + encodeURI(req.query.geohash);
    console.log(url);
    request(
        url, function(err, response, body){
        if (err) { 
            console.log('error');
            res.send(err); 
        }
        else{
            //console.log(JSON.stringify(body));
            res.send(body);
        }
    });
});

app.get('/server/getAuto', function(req, res) {
    var keyword = req.query.data;
    var url = 'https://app.ticketmaster.com/discovery/v2/suggest?apikey=' +
    ticketMasterKey +'&keyword=' + keyword;
    console.log(url);
    request(url, function(err, response, body){
        if (err) { 
            console.log('error');
            res.send(err); 
        }
        else{
            res.send(body);
        }
    });
});

app.get('/server/getSpotify', function(req, res, next) {
    spotifyApi.clientCredentialsGrant().then(
        function(data) {
            console.log('The access token is ' + data.body['access_token']);
            spotifyApi.setAccessToken(data.body['access_token']);
            accessToken1 = data.body['access_token'];
            spotifyApi_ = new SpotifyWebApi({
                accessToken: accessToken1
              });
              // Do search using the access token
              spotifyApi_.searchArtists(req.query.name).then(
                function(data) {
                  //console.log(data.body);
                  res.send(data.body);
                },
                function(err) {
                  console.log('Something went wrong!1', err);
                }
              );
        },
        function(err) {
            console.log('Something went wrong!2', err);
        }
    );
  
});

app.get('/server/getCredentials', function(req, res, next) {
    
});

app.get('/server/getDetails', function(req, res, next) {
    var url = "https://app.ticketmaster.com/discovery/v2/events/"
    + req.query.placeId + "?apikey="
    + ticketMasterKey + "&";
    request(
        url, function(err, response, body){
        if (err) { 
            console.log('error');
            res.send(err); 
        }
        else{
            //console.log(JSON.stringify(body));
            res.send(body);
        }
    });
});

app.get('/server/getPhotos', function(req, res, next) {
    var url = 'https://www.googleapis.com/customsearch/v1?q='
    + req.query.name + '&cx='
    + searchEngineID + '&imgSize='
    + 'huge' + '&imgType='
    + 'news' + '&num='
    + 9 + '&searchType='
    + 'image' +'&key='
    + googleSearch;

    request(url, function(err, response, body){
        if (err) { 
            console.log('error');
            res.send(err); 
        }
        else{
            res.send(body);
        }
    });
});

app.get('/server/getUpcomID', function(req, res, next) {
    var url = 'https://api.songkick.com/api/3.0/search/venues.json?query='
    + req.query.venue_name + '&apikey='
    + songkickID;
    request(url, function(err, response, body){
        if (err) { 
            console.log('error');
            res.send(err); 
        }
        else{
            res.send(body);
        }
    });
});

app.get('/server/getUpcom', function(req, res, next) {
    var url = 'https://api.songkick.com/api/3.0/venues/'
    + req.query.venue_id + '/calendar.json?apikey='
    + songkickID;
    console.log("url");
    request(url, function(err, response, body){
        if (err) { 
            console.log('error');
            res.send(err); 
        }
        else{
            res.send(body);
        }
    });
});



app.use(express.static(__dirname + '/public'));                 
app.use(morgan('dev'));                                         
app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());
app.listen(port);
