import Route from '@ember/routing/route';

export default Route.extend({

  model(params) {
    let slug = params.tag_slug;

    return this.store
      .query('tag', {
        filter: { slug },
        include: 'posts'
      })
      .then(tags => tags.get('firstObject'));
  },

  serialize(model) {
    return { tag_slug: model.get('slug') };
  }

});
