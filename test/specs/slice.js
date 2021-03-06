var assert          = require('assert');
var ProxyCollection = require('../../index');
var Backbone        = require('backbone');

var proxyCollection;
var collection;
var secondaryCollection;

beforeEach(function() {

  collection = new Backbone.Collection([
    {id: 1, label: 'a'},
    {id: 2, label: 'b'},
    {id: 3, label: 'c'},
  ]);

 secondaryCollection = new Backbone.Collection([
    {id: 4, label: 'd'},
    {id: 5, label: 'e'},
    {id: 6, label: 'f'},
  ]);

  proxyCollection = new ProxyCollection({
    collection: collection,
  });
});

describe('ProxyCollection.slice()', function() {

  it('Should return the required models', function() {
    var result = proxyCollection.slice(0, 2);
    assert.equal(2, result.length);
    assert.equal('a', result[0].get('label'));
    assert.equal('b', result[1].get('label'));
    assert.equal(3, proxyCollection.length);
    assert.equal(3, collection.length);
  });

  it('Should return the required models after switch Collection', function() {
    proxyCollection.switchCollection(secondaryCollection);
    var result = proxyCollection.slice(0, 2);
    assert.equal(2, result.length);
    assert.equal('d', result[0].get('label'));
    assert.equal('e', result[1].get('label'));
    assert.equal(3, proxyCollection.length);
    assert.equal(3, secondaryCollection.length);
  });

});
