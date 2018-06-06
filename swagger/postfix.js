function postfix() {
  var topbar_wrapper = document.getElementsByClassName('topbar-wrapper')[0],
    img = document.createElement('img'),
    aDocs = document.createElement('a'),
    aHome = document.createElement('a'),
    frag = document.createDocumentFragment();
  img.setAttribute('src', 'https://learning-services-media.brightcove.com/doc-assets/general/images/bc-logo-ondark-small.png');
  img.setAttribute('alt', 'Brightcove');
  img.setAttribute('class', 'topbar-img');
  aDocs.setAttribute('href', 'https://support.brightcove.com');
  aDocs.setAttribute('class', 'topbar-a');
  aDocs.textContent = 'Brightcove Docs';
  aHome.setAttribute('href', 'https://docs.brightcove.com/index.html');
  aHome.setAttribute('class', 'topbar-a');
  aHome.textContent = 'API References Index';
  topbar_wrapper.innerHTML = '';
  frag.appendChild(img);
  frag.appendChild(aHome);
  frag.appendChild(aDocs);
  topbar_wrapper.appendChild(frag);
}
