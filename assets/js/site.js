// Minimal JS for page transitions and small interactions.
// - Clicking the "more" link in the tagline will animate the index page then navigate.
// - About page reads ?from=index to play enter animation.
// - Back arrow on about page animates then navigates back.

(function(){
  // index -> about animation
  document.addEventListener('DOMContentLoaded', function(){
    var aboutLink = document.querySelector('.about-link');
    if(aboutLink){
      aboutLink.addEventListener('click', function(ev){
        ev.preventDefault();
        // play css animation by adding class to body
        document.body.classList.add('slide-out-left');
        // small delay to allow animation
        setTimeout(function(){
          // navigate to about with a query to trigger entry animation
          window.location.href = aboutLink.getAttribute('href');
        }, 420);
      }, {passive:true});
    }

    // about page: if url contains ?from=index then add 'entered' class to body to play slide-in
    if(location.pathname.endsWith('/about.html') || document.body.classList.contains('page-about')){
      if(location.search.indexOf('from=index') !== -1){
        // add class after small timeout so CSS animation is visible
        setTimeout(function(){
          document.body.classList.add('entered');
        }, 40);
      }
    }

    // Back arrow behavior on about page: animate then go back to index
    var back = document.getElementById('back-arrow');
    if(back){
      back.addEventListener('click', function(ev){
        ev.preventDefault();
        // add class to body that mimics reverse slide (we reuse slide-out-left but invert)
        document.body.style.transition = 'transform 0.42s ease, opacity 0.42s ease';
        document.body.style.transform = 'translateX(22%)';
        document.body.style.opacity = '0';
        setTimeout(function(){
          // navigate to index; add query param to avoid double animation
          window.location.href = 'index.html';
        }, 420);
      }, {passive:true});
    }
  });
})();