import{i as u,a as f,S as b}from"./assets/vendor-f144e563.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))e(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&e(d)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function e(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();function a(o,t,s,e="topLeft"){switch(o){case"error":u.error({title:t,message:s});break;case"success":u.success({title:t,message:s,position:e});break;case"info":u.warning({title:t,message:s});break}}function p(o,t){return o<=t?(a("info","Limit","We're sorry, but you've reached the end of search results."),!1):!0}function y(o){const t=document.querySelector(".gallery"),s=o.map(e=>`
        <div class="image-card">
          <a href="${e.largeImageURL}" class="gallery_link">
            <img class="image" src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
            <div class="image-attributes">
              <div class="item">
                <p>Likes: </p>
                <p> ${e.likes}</p>
              </div>
              <div class="item">
                <p>Views: </p>
                <p> ${e.views}</p>
              </div>
              <div class="item">
                <p>Comments: </p>
                <p> ${e.comments}</p>
              </div>
              <div class="item">
                <p>Downloads:</p>
                <p> ${e.downloads}</p>
              </div>
            </div>
          </a>
        </div>
    `).join("");t.insertAdjacentHTML("beforeend",s)}f.defaults.headers.common["x-api-key"]="44179146-9b08b79ddd3beefa939deb5d3";f.defaults.headers=["Access-Control-Allow-Origin"];const v="44179146-9b08b79ddd3beefa939deb5d3",w="https://pixabay.com/api/";async function m(o,t,s){try{return(await f.get(w,{params:{key:v,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:t,page:s}})).data}catch(e){return e}}const h=new b(".gallery a",{captionsData:"alt",captionDelay:250});let c="",i=1,l=!0,g=40;async function L(o,t,s){if(o.preventDefault(),t.style.display="none",s.innerHTML="",i=1,c=o.target.elements[0].value.trim(),!c){a("error","Error","Please enter a search query");return}try{const{hits:e,totalHits:r}=await m(c,g,i);if(e.length===0){a("info","No Results","Sorry, there are no images matching your search query. Please try again."),s.innerHTML="";return}i===1&&a("success","Success",`Hooray! We found ${r} images.`,"topCenter"),y(e),t.style.display="block",h.refresh(),i++,l=p(r,s.children.length),l||(t.style.display="none")}catch{a("error","Error","Something went wrong. Please try again later.")}}async function S(o,t,s){try{const{hits:e,totalHits:r}=await m(c,g,i);y(e),t.style.display="block",h.refresh();const{height:n}=s.firstElementChild.getBoundingClientRect();i>1&&window.scrollBy({top:n*3,behavior:"smooth"}),i++,l=p(r,s.children.length),l||(t.style.display="none")}catch{a("error","Error","Something went wrong. Please try again later.")}}document.addEventListener("DOMContentLoaded",()=>{const o=document.querySelector(".load-more"),t=document.getElementById("search-form"),s=document.querySelector(".gallery");t.addEventListener("submit",e=>L(e,o,s)),o.addEventListener("click",e=>S(e,o,s))});
//# sourceMappingURL=commonHelpers.js.map
