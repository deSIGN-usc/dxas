
//angular.module("myapp", ["ngMaterial"]).controller("mainController", mainController);
//angular.module("myapp", ["ngAnimate"]).controller("mainController", mainController);
//angular.module('myapp', ['angular-svg-round-progressbar']).controller("mainController", mainController);

function mainController($scope, $http, $q) {
    $scope.formsdata = {};
    $scope.placeid = {};
    $scope.prevplace = {};
    $scope.detail_lat = 0.0;
    $scope.detail_lng = 0.0;
    $scope.moveToLeft = true;
    $scope.moveToRight = false;
    $scope.favMoveToRight = true;
    $scope.changeType = true;
    $scope.googleReviews = true;
    $scope.distance = "";
    $scope.artist_music = false;
    $scope.artist_detail = [];
    $scope.music_artist = [];
    $scope.fav_war = true;
    $scope.ngIncludeItemRight = false;
    $scope.infoval = false;
    $scope.fav_warning = true;
    $scope.loadStates = function() {
        console.log("load");
        var allStates = "Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware, Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina, North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina, South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia, Wisconsin, Wyoming";
        return allStates.split(/, +/g).map( function (state) {
           return {
              value: state.toLowerCase(),
              display: state
           };
        });
     }
    
     $scope.simulateQuery = false;
     $scope.isDisabled    = false;
     // list of states to be displayed
     $scope.states        = $scope.loadStates();
     $scope.querySearch   = $scope.querySearch;
     $scope.selectedItemChange = $scope.selectedItemChange;
     $scope.searchTextChange   = $scope.searchTextChange;
     $scope.querySearch = function(query) {
        var results = query ? $scope.states.filter( $scope.createFilterFor(query) ) : $scope.states, deferred;
        if ($scope.simulateQuery) {
           deferred = $q.defer();
           $timeout(function () { 
                 deferred.resolve( results ); 
              }, 
                      Math.random() * 1000, false);
           return deferred.promise;
        } else {
           return results;
        }
     }
      //filter function for search query
      $scope.createFilterFor = function(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(state) {
           return (state.value.indexOf(lowercaseQuery) === 0);
        };
     }
     $scope.searchTextChange = function(text) {
        $log.info("Text changed to " + text);
     }
     $scope.selectedItemChange = function(item) {
        $log.info("Item changed to " + JSON.stringify(item));
     } 
    $scope.init = function(){
        $scope.artist_detail = [];
        $scope.music_artist = [];
        $scope.clearForm();
        $scope.distance = "10";
        $scope.searchval = true;
        $scope.resval = false;
        $scope.details = true;
        $scope.twitter_btn = true;
        $scope.favorite_btn = true;
        $scope.danger = false;
        $scope.progressbar = false;
        $scope.here = true;
        $scope.moveToRight = false;
        $scope.infoval = false;
        $scope.favval = false;
        $scope.warning = false;
        $scope.ngIncludeItemLeft=false;
        $scope.ngIncludeItemRight=false;

        $scope.currentloc();
        $scope.tempdata = {
            name: "maroon 5"
        };
        console.log("1");

        $http.get('http://ip-api.com/json')
            .success(function(data) {
                console.log("ok");
                $scope.hlat = data.lat;
                $scope.hlng = data.lon;
                console.log($scope.hlat);
                console.log($scope.hlng);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
    $scope.items = [
        {
            id: 1,
            name:'zhangsan'
        },
        {
            id: 2,
            name: 'lulu'
        },
        {
            id: 3,
            name: 'xiaomei'
        },
        {
            id: 6,
            name: 'liba'
        }
        ];
    $scope.clearForm = function(){
        $scope.sasa = "miles";
        $scope.whaa = "";
        $scope.placeid = {};
        $scope.infoval = false;
        $scope.favval = false;
        $scope.myData = {};
        $scope.allData = undefined;
        $scope.item = 'default';
        $scope.moveToRight = false;
        $scope.danger = false;
        $scope.locval = true;
        $scope.searchval = true;
        $scope.progressbar = false;
        $scope.warning = false;
        $scope.prevplace = {};
        $scope.resval = false;
        $scope.here = true;
        $scope.locationval = false;
        $scope.details = true;
        $scope.ngIncludeItemRight = false;
        $scope.ngIncludeItemLeft = false;
        //$scope.resetHightlightToFavorites();
    }
    $scope.query1 = function(text) {
        var result = [];
        $scope.keyword = { 
            data: text,
        }
        return $http.get("/server/getAuto", {params: $scope.keyword}).then(function successCallback(response) {
            if(response.data._embedded && response.data._embedded.attractions){
                for(var i = 0; i < response.data._embedded.attractions.length;i++){
                    result.push(response.data._embedded.attractions[i].name);
                }
            }
            return result;
         });
    }
    $scope.manualloc = function(){
        $scope.locationval = true;
        $scope.locval = false;
    }
    $scope.currentloc = function(){
        $scope.here = true;
        $scope.locval = true;
    }
    $scope.searchValidation = function(){
        var isok = true;
        var keyword = document.getElementById('keyword').value;
        console.log(keyword);
        if(keyword.trim() == ''){
            isok = false;
        }
        var location = document.getElementById('inputloc').value;
        var from = document.getElementsByName('from');
        if(from[1].checked){
            if(location.trim() == ''){
                isok = false;
            }
        }
        if (isok) {  
            document.getElementById('search').disabled = false;  
        }
        else { 
            document.getElementById('search').disabled = true; 
        }
    }
    $scope.do = function(form, test){
        if(test == 0){
            $scope.lat = $scope.hlat;
            $scope.lng = $scope.hlng;
            $scope.getResults(form, $scope.hlat, $scope.hlng);
        }
        else{
            $scope.locationdata = { location: encodeURI($scope.location)   }
            $http.get("/server/getLocation", { params: $scope.locationdata }).success(function(data, status) {
                if(data["status"] == 'ZERO_RESULTS'){
                    $scope.enableNoResults();
                    $scope.infoval = false;
                }
                else if(data['status'] == 'INVALID_REQUEST'){
                    $scope.enableErrorResults();
                    $scope.infoval = false;
                }
                else{
                    console.log(JSON.stringify(data));
                    $scope.lat = data["results"][0]["geometry"]["location"]["lat"];
                    $scope.lng = data["results"][0]["geometry"]["location"]["lng"];
                    console.log($scope.lat);
                    console.log($scope.lat);
                    $scope.getResults(form, data["results"][0]["geometry"]["location"]["lat"], data["results"][0]["geometry"]["location"]["lng"]);
                }
            }).error(function(){
                console.log('Error!');
            });
        }
    }
    $scope.getResults = function(form, lat, lng) {
        if (form.distance.value != "") {
            $scope.distance = form.distance.value;
        }
        $scope.artist_music = (form.category.value == "KZFzniwnSyZfZ7v7nJ") ? true : false;
        $scope.formsdata = {
            keyword: form.keyword.value.trim().replace(" ","+"),
            category: form.category.value,
            distance: $scope.distance,
            units: form.units.value,
            geohash: encodeJ(lat, lng)
        };
            console.log(JSON.stringify($scope.formsdata));
        $scope.disableResults();
        $scope.shwResults($scope.formsdata);
    }
    $scope.shwResults = function(formsdata){
        $scope.moveToRight = false;
        $scope.searchval = false;
        $http.get("/server/getResults", { params: formsdata }).success(function(data, status) {
            if(data._embedded == undefined){
                console.log(JSON.stringify(data));
                $scope.myData = ['zero_results'] ;
                $scope.enableNoResults();
                $scope.infoval = false;
                console.log("dsadsadas");
            }
            else if(data.status == 'INVALID_REQUEST'){
                console.log(JSON.stringify(data));
                $scope.myData = 'invalid_request';
                $scope.enableErrorResults();
                $scope.infoval = false;
            }
            else{
                console.log(JSON.stringify(data));
                $scope.enableResults();
                $scope.allData = data;
                var temp = data["_embedded"]["events"];
                temp.sort(function(a, b){
                    if (a.dates.start.localDate == b.dates.start.localDate) return a.dates.start.localTime > b.dates.start.localTime;
                    else return a.dates.start.localDate > b.dates.start.localDate;
                });
                $scope.myData = temp;
                console.log(JSON.stringify($scope.myData));
                // tooltip
                
            }
        }).error(function(){
            $scope.enableErrorResults();
        });
    }
    $scope.moveToDetails = function(place){
        $scope.currentPlace = place;
        if ($scope.idx != place.id && $scope.idx != undefined)
            document.getElementById($scope.idx).style.background = 'white';
        var placeid = place.id;
        $scope.idx = place.id;
        $scope.typp = place.classifications[0].segment.name;
        $scope.ngIncludeItemRight = true;
        $scope.ngIncludeItemLeft=false;
        $scope.setInformation(placeid);
    }
    $scope.setInformation = function(placeid){
        $scope.prevplace = $scope.placeid;
        $scope.placeid = placeid;
        $scope.request = {
            placeId: placeid,
        };
        $scope.resval = false;
        $scope.favval = false;
        $scope.getEventDetails();
    }
    $scope.gao = function(str) {
        if (str == undefined) return '';
        var lth = str.length;
        if (lth > 35) return str.slice(0, 35) + " ...";
        else return str;
    }
    $scope.gao1 = function(num) {
        var str = num.toString();
        var lth = str.length;
        var res = "";
        var cnt = 0;
        for (var i = lth - 1; i >= 0; i--) {
            res += str[i];
            cnt++;
            if (cnt == 3 && i != 0) {
                cnt = 0;
                res += ',';
            }
        }
        console.log(res);
        var ll = res.length;
        var npk = "";
        for (var i = 0; i < ll; i++) {
            npk += res[ll - 1 - i];
        }
        return npk;
    }
    $scope.getEventDetails = function(){
        $http.get("/server/getDetails", { params: $scope.request }).success(function(data, status) {
            var promises = [];
            var greyEle = document.getElementsByClassName('greyRow');
            for (var i = 0; i < greyEle.length; i++) {
                greyEle[i].classList.remove('greyRow');
            }
            $scope.twitter_btn = false;
            $scope.favorite_btn = false;
            $scope.eventSave = data;
            $scope.showEventDetails(data);
            $scope.artist_detail = [];
            if (data._embedded.attractions.length != 0) {
                photos_none = false;
                $scope.getArtistDetails(data._embedded.attractions);
            } else {
                photos_none = true;
            }
            $scope.showVenueDetails(data);
            $scope.getUpcoming(data);
            $scope.postTwitter();
            $scope.sorttype = "default";
            $scope.sortorder = "asc";

            $scope.infoval = true;

        }).error(function(){
            console.log('Error!');
        });
    }
    $scope.getArtistDetails = function(list) {
        var count = 0;
        $scope.ismusic_ = false;
        var count2 = 0;
        $scope.artist_detail = [];
        $scope.music_artist = [];
        if ($scope.typp == "music" || $scope.typp == "Music" || $scope.typp == "MUSIC") $scope.ismusic_ = true;
        for (var i = 0; i < list.length; i++) {
            $scope.photoParam = {
                name: encodeURI(list[i].name)
            };
            $http.get("/server/getPhotos", { params: $scope.photoParam }).success(function(data, status) {
                $scope.artist_detail.push(data);
                count++;
                if (count == list.length) {
                    if ($scope.ismusic_ == true) {
                        for (var i = 0; i < list.length; i++) {
                            var tmp = list[i].name;
                            tmp.replace(' ', '+');
                            var musicParam = {
                                name: list[i].name
                            };
                            $http.get("/server/getSpotify", { params: musicParam }).success(function(data2, status) {
                                $scope.music_artist.push(data2);
                                //console.log(data2);
                                count2++;
                                if (count2 == list.length) {
                                    $scope.showArtistDetails();
                                }
                            }).error(function(){
                                console.log('Error!');
                            });
                        }
                    } else {
                        $scope.showArtistDetails();
                    }
                }
            }).error(function(){
                console.log('Error!');
            });
        } 
    }
 
    $scope.showArtistDetails = function() {
        console.log($scope.artist_detail);
        console.log($scope.music_artist);
        
        var maindiv = document.getElementById('coming');
        maindiv.innerHTML= '';
        for (var i = 0; i < $scope.artist_detail.length; i++) {
            var pp1 = document.createElement('div');
            var tabb = document.createElement('table');
            var str = $scope.artist_detail[i].queries.request[0].searchTerms.replace(' ', '+');
            str = str.toLowerCase();
            tabb.setAttribute('id', str);
            pp1.setAttribute('class', 'row');
            pp1.setAttribute('ng-hide', 'photos_none');
            var thard = document.createElement('th');
            thard.setAttribute('colspan', '2');
            thard.innerHTML = "<p style='text-align:center'><b>" + $scope.artist_detail[i].queries.request[0].searchTerms + "</b></p>";
            tabb.appendChild(thard);
            //console.log(i)
            //console.log($scope.artist_detail[i].queries.request[0].searchTerms);
            //console.log($scope.music_artist[i].artists.items.length);
            pp1.appendChild(tabb);
            maindiv.appendChild(pp1);
            var photoList = {
                0: [],
                1: [],
                2: [],
            };
            for (var j = 0; j < $scope.artist_detail[i].items.length; j++) {
                photoList[j%3].push($scope.artist_detail[i].items[j].link);
            }
            var row1 = document.createElement('div');
            row1.setAttribute('class', 'row');
            for (var j = 0; j < 3; j++) {
                var offset = 0;
                if (j == 2) {
                    offset = 1;
                }
                var divcol = document.createElement('div');
                divcol.setAttribute('class', 'column');
                var cs = "";
                for (var k = 0; k < photoList[j].length - offset; k++) {
                    var curr = "";
                    curr = "<a href='" +
                    photoList[j][k] + "'target='_blank'><img class='photos' src ='"
                    +photoList[j][k] + "' width='100%'/></a>";
                    cs += curr;
                }
                divcol.innerHTML = cs;
                row1.appendChild(divcol);
            }
            maindiv.appendChild(row1);
        } 
        
        for (var i = 0; i < $scope.music_artist.length; i++) {
            if ($scope.ismusic_ && $scope.music_artist[i].artists.items.length != 0) {
                console.log($scope.music_artist[i].artists.items[0].name);
                var str = $scope.music_artist[i].artists.items[0].name.replace(' ', '+')
                str = str.toLowerCase();
                var gest = document.getElementById(str);                
                var trr = document.createElement('tr');
                trr.innerHTML = "<td><b>Name</b></td><td>" + $scope.music_artist[i].artists.items[0].name+"</td>";
                gest.appendChild(trr);
                var trr1 = document.createElement('tr');
                trr1.innerHTML = "<td><b> Followers </b></td><td>" + $scope.gao1($scope.music_artist[i].artists.items[0].followers.total) + "</td>";
                gest.appendChild(trr1);
                var trr2 = document.createElement('tr');
                trr2.innerHTML = "<td><b> Popularity </b></td><td>" + 
                "<round-progress max='100' current='20' color='green' radius='100'stroke='20' rounded='true' clockwise='false' responsive='false' duration='800' animation='easeInOutQuart' animation-delay='0'></round-progress>"
                +"</td>";
                gest.appendChild(trr2);
                var trr3 = document.createElement('tr');
                trr3.innerHTML = "<td><b> Check At </b></td><td><a href='" + $scope.music_artist[i].artists.items[0].external_urls + "'> Spotify </a></td>";
                gest.appendChild(trr3);
                /*
                var td1 = document.createElement('td');
                td1.innerHTML = "<b> Name </b>";
                trr.appendChild(td1);
                var td2 = document.createElement('td');
                td2.innerHTML = "<b>" + $scope.music_artist[i].artists.items[0].name + "</b>";
                trr.appendChild(td2);
                gest.appendChild(trr);
                var trr1 = document.createElement('tr');
                td1.innerHTML = "<b> Followers </b>";
                trr1.appendChild(td1);
                td1.innerHTML = $scope.gao1($scope.music_artist[i].artists.items[0].followers.total);
                trr1.appendChild(td1);
                gest.appendChild(trr1);
                var trr2 = document.createElement('tr');
                td1.innerHTML = "<b> Popularity </b>";
                trr2.appendChild(td1);
                td1.innerHTML = $scope.gao1($scope.music_artist[i].artists.items[0].followers.total);
                trr2.appendChild(td1);
                gest.appendChild(trr2);
                var trr3 = document.createElement('tr');
                td1.innerHTML = "<b> Check at </b>";
                trr3.appendChild(td1);
                td1.innerHTML = "<a href='" + $scope.music_artist[i].artists.items[0].external_urls + "'> Spotify </a>";
                trr3.appendChild(td1);
                gest.appendChild(trr3);
                */
            } 
        }
    }
    $scope.showEventDetails = function(event){
        var str = "";
        $scope.det_artist = (event._embedded.attractions.length == 0 || event._embedded.attractions == undefined) ? false : true;
        if ($scope.det_artist) {
            document.getElementById('det_artist').se
            str = "<td><b>Artist/Team(s)</b></td>";
            str += "<td>";
            for (var i = 0; i < event._embedded.attractions.length; i++) {
                if(i > 0) str += " | "
                str += event._embedded.attractions[i].name;
            }
            str += "</td>";
            document.getElementById('det_artist').innerHTML = str;
        }
        $scope.det_venue = (event._embedded.venues.length == 0 || event._embedded.venues == undefined) ? false : true;
        if ($scope.det_venue) {
            str = "<td><b>Venue</b></td>";
            str += "<td>";
            for (var i = 0; i < event._embedded.venues.length; i++) {
                if(i > 0) str += " | "
                str += event._embedded.venues[i].name;
            }
            str += "</td>";
            document.getElementById('det_venue').innerHTML = str;
        }
        $scope.det_time = (event.dates.start.localDate == undefined || event.dates.start.localTime == undefined) ? false : true;
        if ($scope.det_time) {
            str = "<td><b>Time</b></td>";
            str += "<td>";
            str += moment(event.dates.start.localDate, "YYYY-MM-DD").format("MMM DD, YYYY");
            str += " " + event.dates.start.localTime;
            str += "</td>";
            document.getElementById('det_time').innerHTML = str;
        }
        $scope.det_category = (event.classifications == undefined) ? false : true;
        if ($scope.det_category) {
            str = "<td><b>Category</b></td>";
            var used = false;
            str += "<td>";
            if(event.classifications[0].segment.name != undefined) {
                used = true;
                str += event.classifications[0].segment.name;
            }
            if(event.classifications[0].genre.name != undefined) {
                if(used == true) str += " | ";
                str += event.classifications[0].genre.name;
            }
            str += "</td>";
            document.getElementById('det_category').innerHTML = str;
        }
        $scope.det_price = (event.priceRanges == undefined) ? false : true;
        if ($scope.det_price == true){
            str = "<td><b>Price Range</b></td>";
            str += "<td>";
            str += "$" + (parseFloat(event.priceRanges[0].min).toFixed(2)).toString() + " ~ " + "$" + (parseFloat(event.priceRanges[0].max).toFixed(2)).toString();
            str += "</td>";
            document.getElementById('det_price').innerHTML = str;
        }
        $scope.det_ticket = (event.dates.status.code == undefined) ? false : true;
        if ($scope.det_ticket == true) {
            str = "<td><b>Ticket Status</b></td>";
            str += "<td>" + event.dates.status.code + "</td>";
            document.getElementById('det_ticket').innerHTML = str;
        }
        $scope.det_buy = (event.url == undefined) ? false : true;
        if ($scope.det_buy == true) {
            str = "<td><b>Buy Ticket At</b></td>";
            str += "<td><a href=\""+event.url+"\">Ticketmaster</a></td>";
            document.getElementById('det_buy').innerHTML = str;
        }
        $scope.det_seat = (event.seatmap.staticUrl == undefined) ? false : true;
        if ($scope.det_seat == true) {
            str = "<td><b>Seat Map</b></td>";
            str += "<td><a href=\""+event.seatmap.staticUrl+"\" target='_blank'>View Seat Map Here</a></td>";
            document.getElementById('det_seat').innerHTML = str;
        }
    }
    function initMap() {
        var uluru = {lat: $scope.vlat, lng: $scope.vlng};
        var map = new google.maps.Map(
            document.getElementById('swmap'), {zoom: 10, center: uluru});
        var marker = new google.maps.Marker({position: uluru, map: map});
    }    
    $scope.showVenueDetails = function(event) {
        console.log(event);
        var str = "";
        $scope.vlng = parseFloat(event._embedded.venues[0].location.longitude);
        $scope.vlat = parseFloat(event._embedded.venues[0].location.latitude);
        initMap();
        $scope.ven_header = (event._embedded.venues.length == 0 || event._embedded.venues[0].name == undefined) ? false : true;
        if ($scope.ven_header) {
            document.getElementById('ven_header').se
            str = "<b>" + event._embedded.venues[0].name  + "</b>";
            document.getElementById('ven_header').innerHTML = str;
        }
        $scope.ven_address = (event._embedded.venues.length == 0 || event._embedded.venues[0].address.line1 == undefined) ? false : true;
        if ($scope.ven_address) {
            str = "<td><b>Address</b></td>";
            str += "<td>";
            str += event._embedded.venues[0].address.line1;
            str += "</td>";
            document.getElementById('ven_address').innerHTML = str;
        }
        $scope.ven_city = (event._embedded.venues.length == 0) ? false : true;
        if ($scope.ven_city) {
            str = "<td><b>Time</b></td>";
            str += "<td>";
            str += event._embedded.venues[0].city.name;
            str += ", ";
            str += event._embedded.venues[0].state.name;
            str += "</td>";
            document.getElementById('ven_city').innerHTML = str;
        }
        $scope.ven_phone = (event._embedded.venues.length == 0 || event._embedded.venues[0].boxOfficeInfo == undefined || event._embedded.venues[0].boxOfficeInfo.phoneNumberDetail == undefined) ? false : true;
        if ($scope.ven_phone) {
            document.getElementById('ven_phone').se
            str = "<td><b>Phone Number</b></td>";
            str += "<td>";
            str += event._embedded.venues[0].boxOfficeInfo.phoneNumberDetail;
            str += "</td>";
            document.getElementById('ven_phone').innerHTML = str;
        }
        $scope.ven_open = (event._embedded.venues.length == 0 || event._embedded.venues[0].boxOfficeInfo == undefined || event._embedded.venues[0].boxOfficeInfo.openHoursDetail == undefined) ? false : true;
        if ($scope.ven_open) {
            str = "<td><b>Open Hours</b></td>";
            str += "<td>";
            str += event._embedded.venues[0].boxOfficeInfo.openHoursDetail;
            str += "</td>";
            document.getElementById('ven_open').innerHTML = str;
        }
        $scope.ven_general_rule = (event._embedded.venues.length == 0 || event._embedded.venues[0].generalInfo == undefined || event._embedded.venues[0].generalInfo.generalRule == undefined) ? false : true;
        if ($scope.ven_general_rule) {
            str = "<td><b>General Rule</b></td>";
            str += "<td>";
            str += event._embedded.venues[0].generalInfo.generalRule;
            str += "</td>";
            document.getElementById('ven_general_rule').innerHTML = str;
        }
        $scope.ven_child_rule = (event._embedded.venues.length == 0 ||  event._embedded.venues[0].generalInfo == undefined || event._embedded.venues[0].generalInfo.childRule == undefined) ? false : true;
        if ($scope.ven_child_rule) {
            str = "<td><b>Child Rule</b></td>";
            str += "<td>";
            str += event._embedded.venues[0].generalInfo.childRule;
            str += "</td>";
            document.getElementById('ven_child_rule').innerHTML = str;
        }
        $scope.maps = true;
    }
    $scope.setDiffCol = function(category, id){
        if(category == true){
            if($scope.isGrey){
                $scope.isGrey = false;
                document.getElementById(id).className = 'greyRow';
            }
            else{
                $scope.isGrey = true;
            }
        }
    }
    $scope.postTwitter= function(){
        var message = encodeURI("Check out " + $scope.eventSave.name + 
        " located at " + $scope.eventSave._embedded.venues[0].name 
        + ". Website: " + $scope.eventSave.url);
        $scope.twitter_url = "https://twitter.com/intent/tweet?&text=" + message;
        console.log($scope.twitter_url);
    }
    $scope.getUpcoming = function(event){
        var placename = event._embedded.venues[0].name;
        var para = {
            venue_name: encodeURI(placename)
        }
        $http.get("/server/getUpcomID", { params: para }).success(function(data, status) {
            var para2 = {
                venue_id : encodeURI(data.resultsPage.results.venue[0].id)
            };
            $scope.get2Upcoming(para2);
        }).error(function(){
            console.log('Error!');
        });
    }
    $scope.get2Upcoming = function(para){
        $http.get("/server/getUpcom", { params: para }).success(function(data, status) {
            console.log(data);
            $scope.showUpcmoing(data);
        }).error(function(){
            console.log('Error!');
        });
    }
    $scope.showUpcmoing = function(event) {
        $scope.upc_event_default = event.resultsPage.results.event;
        console.log($scope.upc_event_default);
        $scope.upc_event_show_1 = [];
        $scope.upc_event_show_2 = [];
        for (var i = 0; i < $scope.upc_event_default.length; i++) {
            var str = "";
            $scope.upc_event_default[i]["correctTime"] = str; 
            str += moment($scope.upc_event_default[i].start.date, "YYYY-MM-DD").format("MMM DD, YYYY");
            if($scope.upc_event_default[i].start != undefined && $scope.upc_event_default[i].start.time != undefined){
                str += ", " + $scope.upc_event_default[i].start.time;
            }
            $scope.upc_event_default[i]["correctTime"] = str; 
        }
        $scope.upc_event = $scope.upc_event_default;
        $scope.cur_lenn = ($scope.upc_event.length < 5 ? $scope.upc_event.length : 5);
        for (var i = 0; i < $scope.cur_lenn; i++) {
            $scope.upc_event_show_1.push($scope.upc_event[i]);
        }
        for (var i = 5; i < $scope.upc_event.length; i++) {
            $scope.upc_event_show_2.push($scope.upc_event[i]);
        }
        $scope.nomoreshow = true;
    }
    $scope.showmoreupc = function(){
        if ($scope.nomoreshow == true){
            $scope.nomoreshow = false;
            document.getElementById('hahaha').innerHTML = "show less";
        } else {
            $scope.nomoreshow = true;
            document.getElementById('hahaha').innerHTML = "show more";
        }
    }
    $scope._sort = function(value, order){
        if(value == 'default'){ 
            $scope.upc_event = $scope.upc_event_default; 
        }
        else if(value == 'name'){ 
            if (order == "asc") {
                $scope.upc_event.sort(function(a, b){
                    return a.displayName>b.displayName
                });
            }
            else {
                $scope.upc_event.sort(function(a, b){
                    return b.displayName>a.displayName
                });
            }
        }
        else if(value == 'artist') { 
            if (order == "asc") {
                $scope.upc_event.sort(function(a, b){
                    return a.performance[0].displayName>b.performance[0].displayName
                });
            }
            else {
                $scope.upc_event.sort(function(a, b){
                    return b.performance[0].displayName>a.performance[0].displayName
                });
            }
        }
        else if(value == 'date'){ 
            if (order == "asc") {
                $scope.upc_event.sort(function(a, b){
                    if (a.start.date==b.start.date) return a.start.time>b.start.time;
                    else return a.start.date>b.start.date;
                });
            }
            else {
                $scope.upc_event.sort(function(a, b){
                    if (a.start.date==b.start.date) return a.start.time<b.start.time;
                    else return b.start.date>a.start.date;
                });
            }
        }
        else{ 
            if (order == "asc") {
                $scope.upc_event.sort(function(a, b){
                    return a.type>b.type
                });
            }
            else {
                $scope.upc_event.sort(function(a, b){
                    return b.type>a.type
                });
            }
        }
        $scope.upc_event_show_1 = []
        $scope.upc_event_show_2 = []
        for (var i = 0; i < $scope.cur_lenn; i++) {
            $scope.upc_event_show_1.push($scope.upc_event[i]);
        }
        for (var i = 5; i < $scope.upc_event.length; i++) {
            $scope.upc_event_show_2.push($scope.upc_event[i]);
        }
    }
    $scope.update_order = function(){
        var order = $scope.sortorder;
        var type = $scope.sorttype;
        $scope._sort(type, order);
    }
    $scope.backToResults = function(){
        $scope.moveToRight = true;
        $scope.disableInfo();
  
        document.getElementById($scope.idx).style.background = '#fedf96';
        //$scope.setHighlightingToFavorites();
    }
    $scope.disableResults = function(){
        $scope.progressbar = true;
        $scope.resval = false;
        $scope.warning = false;
        $scope.danger = false;
    }
    $scope.moveToLatestDetails = function(id) {

    }
    $scope.enableResults = function(){
        $scope.ngIncludeItemRight = false;
        $scope.progressbar = false;
        $scope.resval = true;
        $scope.warning = false;
        $scope.danger = false;
        $scope.infoval = false;
        $scope.details = true;
        //document.getElementById('directions').disabled = false;
    }
    $scope.enableNoResults = function(){
        $scope.ngIncludeItemRight = false;
        $scope.progressbar = false;
        $scope.resval = false;
        $scope.warning = true;
        $scope.danger = false;
    }
    $scope.enableErrorResults = function(){
        $scope.ngIncludeItemRight = false;
        $scope.progressbar = false;
        $scope.resval = false;
        $scope.warning = false;
        $scope.danger = true;
    }
    $scope.enableInfo = function(){
        $scope.resval = false;
        $scope.favval = false;
        $scope.infoval = true;
    }
    $scope.disableInfo = function(){
        $scope.resval = true;
        $scope.favval = false;
        $scope.infoval = false;
        $scope.details = false;
    }
    $scope.displayRes = function(){
        $scope.infoval = false;
        $scope.favval = false;
        if($scope.myData == undefined){
            return;
        }
        else if($scope.myData == 'zero_results'){
            $scope.warning = true;
        }
        else if($scope.myData == 'invalid_request'){
            $scope.danger = true;
        }
        else{
            $scope.resval = true;  
        }
    }
    $scope.displayFav = function(){
        $scope.infoval = false;
        $scope.favval = true;
        $scope.resval = false;
        $scope.warning = false;
        $scope.danger = false;
        $scope.moveToRight = true;
        $scope.ngIncludeItemRight = true;
    }
    $scope.changeStar1 = function(id) {
        console.log(id);
        var idx = "fav_" + id; 
        if(document.getElementById(idx).getAttribute('class') == "glyphicon glyphicon-star")
            document.getElementById(idx).setAttribute('class', 'glyphicon glyphicon-star-empty');
        else
            document.getElementById(idx).setAttribute('class', 'glyphicon glyphicon-star');
    }
    $scope.changeStar2 = function() {
        if(document.getElementById('insstar').getAttribute('class') == "glyphicon glyphicon-star")
            document.getElementById('insstar').setAttribute('class', 'glyphicon glyphicon-star-empty');
        else
            document.getElementById('insstar').setAttribute('class', 'glyphicon glyphicon-star');
    }
    $scope.putFav = function() {

    }
};

function getBits(coordinate, start, end, len){
    var binStr = "";
    while (len-- > 0) {
        var mid = start + (end - start) / 2;
        if (coordinate > mid) {
            binStr += "1";
            start = mid;
        } else {
            binStr += "0";
            end = mid;
        }
    }
    return binStr;
}

function encodeJ(latitude, longitude, len = 5){
    var base = "0123456789bcdefghjkmnpqrstuvwxyz";
    // Get latitude and longitude bits length from given geohash Length
    var latLen = len % 2 == 0 ? len / 2 * 5 : (Math.ceil(len / 2) * 5) - 3; 
    var longLen = latLen + (len % 2 == 0 ? 0 : 1);
    // Convert the coordinates into binary format
    var binStr = "";
    var latBits = getBits(latitude, -90, 90, latLen);
    var longBits = getBits(longitude, -180, 180, longLen);
    binLen = latBits.length + longBits.length;
    // Combine the lat and lon bits and get the binaryString
    for (var j = 1; j < binLen + 1; j++)
        binStr += (j % 2 == 0 ? latBits.charAt((j - 2) / 2) : longBits.charAt(Math.floor(j / 2)));
    // Convert the binary to hash
    var hash = "";
    for (var j = 0; j < binStr.length; j += 5) {
        var index = parseInt(binStr.substring(j, j + 5), 2);
        hash += base[index];
    }
    return hash;
}

function getRes(fm) {

    var test = document.getElementsByName('from')[0].checked ? 0 : 11;
    console.log(test);
    var appElement = document.querySelector('[ng-controller=mainController]');
    console.log(test);
    var $scope = angular.element(appElement).scope(); 
    $scope.do(fm, test);

}

function clearJS(form){
    form.reset();

    var from = document.getElementsByName('from');
    from[0].checked = true;

    var results_tab = document.getElementById('results-tab');
    if(results_tab.classList[0] != "active"){
        results_tab.classList.add("active");
        var results_content = document.getElementById('results');
        results_content.classList.add('active');
        var favorite = document.getElementById('favorite-tab');
        favorite.classList.remove("active");
        remove_active_class_content('favorite');
    }

    var tab_event = document.getElementById('tab_event');
    if(tab_event.classList[0] != 'active'){
        make_default_tab_active(tab_event);
        remove_active_class_tab('tab_art');
        remove_active_class_content('artist');
        remove_active_class_tab('tab_venue');
        remove_active_class_content('venueTab');
        remove_active_class_tab('tab_upc');
        remove_active_class_content('upcoming');
    }

    document.getElementById('upc_category').value = 'default';
    document.getElementById('sort_order').value = 'src';

    document.getElementById('search').disabled = true;
}

function make_default_tab_active(info_tab){
    info_tab.classList.add("active");
    var info_tab_content = document.getElementById('home');
    info_tab_content.classList.add('active');
    info_tab_content.classList.add('in');
}

function remove_active_class_content(id){
    var tab_content = document.getElementById(id);
    tab_content.classList.remove('active');
    tab_content.classList.remove('in');
}

function remove_active_class_tab(id){
    var tab = document.getElementById(id);
    tab.classList.remove("active");    
}


