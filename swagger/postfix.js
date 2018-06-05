var BCLS = ( function (window, document) {
  var topbar_wrapper = document.getElementsByClassName('topbar-wrapper')[0],
  img = document.createElement('img'),
  aDocs = document.createElement('a'),
  aHome = document.createElement('a'),
  txt = document.createTextNode(' | '),
  frag = document.createDocumentFragment();
  img.setAttribute('src', 'https://learning-services-media.brightcove.com/doc-assets/general/images/bc-logo-ondark.png');
  img.setAttribute('alt', 'Brightcove');
  aDocs.setAttribute('href', 'https://support.brightcove.com');
  aDocs.textContent = 'Brightcove Docs';
  aHome.setAttribute('href', '../index.html');
  aHome.textContent = 'API References Index';
  topbar_wrapper.innerHTML = '';
  frag.appendChild(img);
  frag.appendChild(aHome);
  frag.appendChild(txt);
  frag.appendChild(aDocs);
  topbar_wrapper.appendChild(frag);
})(window, document);
