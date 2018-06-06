function postfix(description_div) {
  var topbar_wrapper = document.getElementsByClassName('topbar-wrapper')[0],
    opblocks = document.getElementsByClassName('opblock'),
    model_containers = document.getElementsByClassName('model-container'),
    btn = document.createElement('button'),
    txt = ' (click to make the entire doc searchable)',
    span = document.createElement(span),
    expand_all,
    img = document.createElement('img'),
    aDocs = document.createElement('a'),
    aHome = document.createElement('a'),
    p = document.createElement('p'),
    frag = document.createDocumentFragment();
  // add custom header
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
  // add expand all button
  btn.setAttribute('id', 'expand_all');
  btn.setAttribute('class', 'btn try-out__btn');
  btn.textContent = 'Expand All Sections';
  span.textContent = txt;
  p.appendChild(btn);
  p.appendChild(span);
  // note that description_div is defined before postfix() is called
  description_div.appendChild(p);
  expand_all = document.getElementById('expand_all');
  expand_all.addEventListener('click', function() {
    var i, iMax;
    iMax = opblocks.length;
    for (i = 0; i < iMax; i++) {
      opblocks[i].classList.add('is-open');
    }
    iMax = model_containers.length;
    for (i = 0; i < iMax; i++) {
      model_containers[i].classList.add('is-open');
    }
  });
}
