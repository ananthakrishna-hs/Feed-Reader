/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/**
*@description Executes jQuery/JS statements after load
*@param {function} - The function to be executed after load
*/
$(function() {
    /**
    *@description Test suite- Tests on RSS feeds definitions, 
    * the allFeeds variable in our application
    */
    describe('RSS Feeds', function() {
        /**
        *@description Test spec- allFeeds variable has been defined 
        * and it is not empty
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /**
        *@description Test spec- URL in allFeeds variable has been defined 
        * and it is not empty
        */
         it('URL defined and not empty', function() {
            expect(allFeeds.every(function(objectFeed) {
                return (objectFeed.hasOwnProperty('url') && (objectFeed.url!==""));
            })).toBe(true);
         });
        /**
        *@description Test spec- allFeeds variable has been defined 
        * and it is not empty
        */
         it('name defined and not empty', function() {
            expect(allFeeds.every(function(objectFeed) {
                return (objectFeed.hasOwnProperty('name') && (objectFeed.name!==""));
            })).toBe(true);
         });
    });
    /**
    *@description Test suite- Menu related tests
    */
    describe('The menu', function() {
        /**
        *@description Test spec- Tests whether menu is hidden by default
        */
        it('menu hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        /**
        *@description Test spec- Tests whether menu toggles when
        * menu icon is clicked
        */
        it('menu visibility toggles when clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    /**
    *@description Test suite- Tests on entries made by the API used 
    */
    describe('Initial Entries', function() {
        /**
        *@description Before async tests of the suite
        *@param {function} - The function loads feed for a 
        * random index of allFeeds
        */
        beforeEach(function(done) {
            loadFeed(Math.floor(Math.random()*allFeeds.length),done);
        });
        /**
        *@description Test spec- Tests whether atleast one entry 
        * exist when loadFeed() is called
        */
        it('atleast single entry exist', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });
    /**
    *@description Test suite- Tests on changing entries made by the API used 
    */
    describe('New Feed Selection', function() {
        /**
        *@description function to compare two arrays -
        * first compares length of arrays, then their 
        * corresponding elements if length is equal
        *@param {Array} arr1 - first array
        *@param {Array} arr2 - second array
        *@return {Boolean} true if not equal, false if equal
        */
        function compare(arr1,arr2) {
                if(arr1.length===arr2.length) {
                    for(let i=0;i<arr1.length;i++) {
                        if(arr1[i]!==arr2[i])
                            return true;
                    }
                    return false;
                }
                return true;
            }
            let feed1=[],feed2=[],feed,initialIndex,finalIndex;
        /**
        *@description Before async tests of the suite
        *@param {function} - The function loads an initial feed for a 
        * random index of allFeeds
        */
        beforeEach(function(done) { 
            initialIndex=Math.floor(Math.random()*allFeeds.length);
            finalIndex=Math.floor(Math.random()*allFeeds.length);
            while(initialIndex===finalIndex)
                // To obtain two different indices
                finalIndex=Math.floor(Math.random()*allFeeds.length);
            loadFeed(initialIndex,done);
        });
        /**
        *@description Before async tests of the suite
        *@param {function} - The function loads a final feed for a 
        * random index of allFeeds
        */
        beforeEach(function(done) {
            feed =$('.feed .entry');
            for(let i=0;i<feed.length;i++)
                feed1.push(feed[i].innerText);
            loadFeed(finalIndex,done);
        });
        /**
        *@description Test spec- Tests whether entry changes 
        * exist when loadFeed() is called for
        * two different indices
        */
        it('feed changes', function(done) {
            feed=$('.feed .entry');
            for(let i=0;i<feed.length;i++)
                feed2.push(feed[i].innerText);
            expect(compare(feed1,feed2)).toBe(true);
            done();
        });
    });
}());
