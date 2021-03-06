import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupMirage } from 'ember-cli-mirage/test-support';

let Comic = Ember.Object.extend({
  slug: '',
  title: '',
  scriptwriter: '',
  illustrator: '',
  publisher: '',
  isFavorite: false
});

let akira = Comic.create({
  title: 'Akira',
  scriptwriter: 'Katsuhiro Otomo',
  illustrator: 'Katsuhiro Otomo',
  publisher: 'Epic Comics',
  isFavorite: false
});

module('Integration | Component | fav btn', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('renders fav-btn', async function(assert) {
  
    akira.set('isFavorite', false);
    this.set('model', akira);
  
    await render(hbs`{{fav-btn selected=model.isFavorite}}`);
  
    assert.notEqual(this.element.querySelector('.btn-fav'), null);
    assert.notOk(this.element.querySelector('.btn-fav').classList.contains('selected'));
  });
  
  test('update fav-btn after external change', async function(assert) {
  
    akira.set('isFavorite', false);
    this.set('model', akira);
  
    await render(hbs`{{fav-btn selected=model.isFavorite}}`);
  
    assert.equal(this.element.querySelector('.btn-fav.selected'), null);
  
    run(() => {
      akira.set('isFavorite', true);
    });
  
    assert.notEqual(this.element.querySelector('.btn-fav.selected'), null);
  });
  
  test('update fav-btn after click', async function(assert) {
  
    akira.set('isFavorite', true);
    this.set('model', akira);
  
    await render(hbs`{{fav-btn selected=model.isFavorite}}`);
  
    assert.notEqual(this.element.querySelector('.btn-fav.selected'), null);
  
    await click('.btn-fav');
  
    assert.equal(this.element.querySelector('.btn-fav.selected'), null);
  });
});
