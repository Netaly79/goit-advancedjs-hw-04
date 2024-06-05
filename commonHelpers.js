import{a as p,i as f,S as g}from"./assets/vendor-53a1b719.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();p.defaults.headers.common["x-api-key"]="44179146-9b08b79ddd3beefa939deb5d3";p.defaults.headers=["Access-Control-Allow-Origin"];const b="44179146-9b08b79ddd3beefa939deb5d3",v="https://pixabay.com/api/";async function y(o,a,s){try{return await p.get(v,{params:{key:b,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:a,page:s}})}catch(r){return r}}function c(o,a,s,r="topLeft"){switch(o){case"error":f.error({title:a,message:s});break;case"success":f.success({title:a,message:s,position:r});break;case"info":f.warning({title:a,message:s});break}}function m(o,a,s){return o<a+s?(c("info","Limit","We're sorry, but you've reached the end of search results."),!1):!0}function h(o){const a=document.querySelector(".gallery"),s=o.map(r=>`
        <div class="image-card">
          <a href="${r.largeImageURL}" class="gallery_link">
            <img class="image" src="${r.webformatURL}" alt="${r.tags}" loading="lazy" />
            <div class="image-attributes">
              <div class="item">
                <p>Likes: </p>
                <p> ${r.likes}</p>
              </div>
              <div class="item">
                <p>Views: </p>
                <p> ${r.views}</p>
              </div>
              <div class="item">
                <p>Comments: </p>
                <p> ${r.comments}</p>
              </div>
              <div class="item">
                <p>Downloads:</p>
                <p> ${r.downloads}</p>
              </div>
            </div>
          </a>
        </div>
    `).join("");a.insertAdjacentHTML("beforeend",s)}let n=1,l="",d=40,u=!0;document.addEventListener("DOMContentLoaded",()=>{const o=document.querySelector(".load-more"),a=document.getElementById("search-form"),s=document.querySelector(".gallery"),r=new g(".gallery a",{captionsData:"alt",captionDelay:250});a.addEventListener("submit",async e=>{if(e.preventDefault(),o.style.display="none",s.innerHTML="",n=1,l=e.target.searchQuery.value.trim(),!l){c("error","Error","Please enter a search query");return}await y(l,d,n).catch(t=>{c("error","Error","Something went wrong. Please try again later.")}).then(t=>{const i=t.data.hits;if(t.data.totalHits,i.length===0){c("info","No Results","Sorry, there are no images matching your search query. Please try again."),s.innerHTML="";return}n===1&&c("success","Success",`Hooray! We found ${t.data.totalHits} images.`,"topCenter"),h(i),o.style.display="block",r.refresh(),n++,u=m(t.data.totalHits,s.children.length,d),u||(o.style.display="none")})}),o.addEventListener("click",()=>{y(l,d,n).then(e=>{const t=e.data.hits;h(t),o.style.display="block",r.refresh();const{height:i}=s.firstElementChild.getBoundingClientRect();n>1&&window.scrollBy({top:i*3,behavior:"smooth"}),n++,u=m(e.data.totalHits,s.children.length,d),u||(o.style.display="none")})})});
//# sourceMappingURL=commonHelpers.js.map
