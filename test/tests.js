var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var routes = require('..\\routes');
var utils = require('..\\utils')
var log = console.log;


suite('Utils', function() {
  test('creates hash', function() {
    assert.typeOf(utils.generateHash(), 'number');
  });

  test('makes a model for image data', function() {
    var file = 'abc.png', 
        picset = 'day',
        subset = '.';

    var testObj = utils.makeObj(file, picset, subset);
    testObj.should.be.a('object');
    testObj.should.have.property('src');
    testObj.src.should.equal('images/day/abc.png');
    testObj.should.have.property('description');
    testObj.description.should.equal('A picture from the day');
    testObj.should.have.property('id');
    testObj.id.slice(-3).should.equal('day');
  });

  test('Properly processes image arrays into Objects', function() {
    var imgArray = [ 'DSC_8951.JPG', 'DSC_9002.JPG' ],
        set = 'night',
        subset = 'thumbs',

        imgObjects = utils.processImageArray(imgArray, set, subset);
        imgObjects.should.be.an('array');
        imgObjects[0].should.be.an('object');
        
  });

  test('Makes JSON of images array', function() {
    var imgArray = ['C:\\web\\phlog\\public\\images\\day\\DSC_2015.JPG',
                    'C:\\web\\phlog\\public\\images\\day\\thumbs\\DSC_2015.JPG',
                    'C:\\web\\phlog\\public\\images\\night\\DSC_8951.JPG',
                    'C:\\web\\phlog\\public\\images\\night\\thumbs\\DSC_8951.JPG' ],
        origin = "C:\\web\\phlog\\public\\images",

        imgJSON = utils.makeImagesJSON(imgArray, origin);
        imgJSON.should.be.a('object');
        imgJSON.should.have.property('day').should.be.an('object');
        imgJSON.day.should.have.property('images').with.length(1);
        imgJSON.day.images.should.be.an('array');
        imgJSON.day.should.have.property('thumbs');
        imgJSON.day.thumbs.should.have.length(1);
  });


});