import {
  visit,
  find,
  findAll,
  click,
  fillIn,
  currentRouteName,
  waitUntil
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { run } from '@ember/runloop';
import createRoute from 'ember-training/routes/comics/create';
import { setupMirage } from 'ember-cli-mirage/test-support';

let originalDebug = console.debug;
let newComic;

const setup = function(hooks) {
  setupMirage(hooks);
  hooks.beforeEach(function() {
    window.confirm = function() {
      return true;
    };
  });
  createRoute.reopen({
    model: function (params, transition) {
      newComic = this._super(params, transition);
      return newComic;
    }
  });
}

module('04 - Components Acceptance Tests', function(hooks) {
  setupApplicationTest(hooks);
  setup(hooks);

  test("04 - Components - 01 - Should log on index", async function (assert) {
    assert.expect(5);
  
    console.debug = function(){
      let args = Array.prototype.slice.call(arguments);
      assert.equal(args.join(' '), "akira - favorite: true");
      originalDebug(...arguments);
    };
  
    await visit('/comics/akira');
 
    let $favComic = find(".btn-fav");
    assert.notEqual($favComic, null, "Fav btn exists");
    assert.equal(find(".btn-fav.selected"), null, "Fav btn unselected");
  
    await click(".btn-fav");
    assert.equal(currentRouteName(), 'comic.index', "Route name is correct");
    assert.notEqual(find(".btn-fav.selected"), null, "Fav btn selected");
    console.debug = originalDebug;
  });
  
  test("04 - Components - 02 - Should log on edit", async function (assert) {
    assert.expect(5);
  
    console.debug = function(){
      let args = Array.prototype.slice.call(arguments);
      assert.equal(args.join(' '), "akira - favorite: true");
      originalDebug(...arguments);
    };
  
    await visit('/comics/akira/edit');
    
    let $favComic = find(".btn-fav");
    assert.notEqual($favComic, null, "Fav btn exists");
    assert.equal(find(".btn-fav.selected"), null, "Fav btn unselected");
  
    await click(".btn-fav");
    
    assert.equal(currentRouteName(), 'comic.edit', "Route name is correct");
    assert.notEqual(find(".btn-fav.selected"), null, "Fav btn selected");
    
    console.debug = originalDebug;
  });
  
  test("04 - Components - 03 - Image cover should fallback", async function (assert) {
    await visit('/comics/create');
    await waitUntil(() => {
      return find(".cover").src.indexOf("/assets/images/comics/covers/default.jpg") >= 0;
    }, {timeout: 200});
    assert.ok(find(".cover").src.indexOf("/assets/images/comics/covers/default.jpg") >= 0, "Fallback loaded " + find(".cover").src);
  });
  
  test("04 - Components - 04 - Image cover should change if model changes", async function (assert) {
    await visit('/comics/create');
    await waitUntil(() => {
      return find(".cover").src.indexOf("/assets/images/comics/covers/default.jpg") >= 0;
    }, {timeout: 200});
    assert.ok(find(".cover").src.indexOf("/assets/images/comics/covers/default.jpg") >= 0, "Fallback loaded");
  
    run(() => {
      newComic.set('title', 'newComic');
    });
  
    assert.ok(find(".cover").src.indexOf("/assets/images/comics/covers/new-comic.jpg") >= 0, "Cover updated");
  });
});
