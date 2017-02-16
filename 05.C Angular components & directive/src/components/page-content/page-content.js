(function (angular) {
  'use strict';

  function PageContent() {
    var self = this;

    self.feeds = [
      {
        heading: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, odio!',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati vel, officia saepe cumque culpa alias quisquam rem repudiandae omnis dolorum doloremque, dicta pariatur unde iusto ex, eos neque laboriosam voluptatum.'
      },
      {
        heading: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, ad!',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam eum et ea harum laborum temporibus ab voluptates sunt, maxime dolore quas consequuntur vitae quos expedita nostrum quidem, minus, rem sit.'
      },
      {
        heading: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, atque.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, tempore aut consequuntur autem, repellat iste doloremque quibusdam sunt quos! At minus dicta debitis doloremque dolorem unde, maxime facilis voluptatum quam!'
      },
      {
        heading: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, asperiores!',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, omnis dolores tempora officia consequuntur ratione sequi aliquid porro aut quisquam quas obcaecati facere assumenda minima odit reiciendis laboriosam natus! Eum!'
      },
    ];
  }

  angular
    .module('app')
    .component('pageContent', {
      controller: PageContent,
      templateUrl: './dist/components/page-content/page-content.html'
    });
})(angular);
