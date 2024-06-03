import{a as p,S as g,i as l}from"./assets/vendor-b0d10f48.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();p.defaults.headers.common["x-api-key"]="44179146-9b08b79ddd3beefa939deb5d3";p.defaults.headers=["Access-Control-Allow-Origin"];const y="44179146-9b08b79ddd3beefa939deb5d3",h="https://pixabay.com/api/";let u=1,m="",f=100,b,v=!0;document.addEventListener("DOMContentLoaded",()=>{const a=document.querySelector(".load-more"),i=document.getElementById("search-form"),o=document.querySelector(".gallery"),c=new g(".gallery a",{captionsData:"alt",captionDelay:250});i.addEventListener("submit",async r=>{if(r.preventDefault(),a.style.display="none",o.innerHTML="",u=1,m=r.target.searchQuery.value.trim(),!m){l.error({title:"Error",message:"Please enter a search query."});return}t()});function e(r){o.innerHTML+=r.map(s=>`
          <div class="image-card">
            <a href="${s.largeImageURL}" class="gallery_link">
              <img class="image" src="${s.webformatURL}" alt="${s.tags}" loading="lazy" />
              <div class="image-attributes">
                <div class="item">
                  <p>Likes: </p>
                  <p> ${s.likes}</p>
                </div>
                <div class="item">
                  <p>Views: </p>
                  <p> ${s.views}</p>
                </div>
                <div class="item">
                  <p>Comments: </p>
                  <p> ${s.comments}</p>
                </div>
                <div class="item">
                  <p>Downloads:</p>
                  <p> ${s.downloads}</p>
                </div>
              </div>
            </a>
          </div>
      `).join(""),a.style.display="block",c.refresh();const{height:d}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:d*2,behavior:"smooth"})}async function t(){try{const r=await p.get(h,{params:{key:y,q:m,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:f,page:u}}),d=r.data.hits;if(b=r.data.totalHits,d.length===0){l.warning({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again."}),o.innerHTML="";return}u===1&&l.success({title:"Success",message:`Hooray! We found ${r.data.totalHits} images.`,position:"topCenter"}),e(d),u++,v=n(r.data.totalHits)}catch{l.error({title:"Error",message:"Something went wrong. Please try again later."})}}a.addEventListener("click",()=>{t()});function n(r){return r<o.children.length+f?(a.style.display="none",l.info({title:"Limit",message:"We're sorry, but you've reached the end of search results."}),!1):!0}});
//# sourceMappingURL=commonHelpers.js.map
