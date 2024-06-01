import{a as c,i as n}from"./assets/vendor-ae6d56ab.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();c.defaults.headers.common["x-api-key"]="44179146-9b08b79ddd3beefa939deb5d3";const l="44179146-9b08b79ddd3beefa939deb5d3";document.addEventListener("DOMContentLoaded",()=>{const i=document.getElementById("search-form"),o=document.querySelector(".image-gallery");i.addEventListener("submit",async t=>{t.preventDefault();const e=t.target.searchQuery.value.trim();if(!e){n.error({title:"Error",message:"Please enter a search query."});return}try{const s=(await c.get("https://pixabay.com/api/",{params:{key:l,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data.hits;if(s.length===0){n.warning({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again."}),o.innerHTML="";return}a(s)}catch(r){n.error({title:"Error",message:"Something went wrong. Please try again later."}),console.error("Error fetching images:",r)}});function a(t){o.innerHTML=t.map(e=>`
          <div class="image-card">
              <img src="${e.webformatURL}" alt="${e.tags}" />
              <p>Likes: ${e.likes}</p>
              <p>Views: ${e.views}</p>
              <p>Comments: ${e.comments}</p>
              <p>Downloads: ${e.downloads}</p>
              <a href="${e.largeImageURL}" target="_blank">View Large Image</a>
          </div>
      `).join("")}});
//# sourceMappingURL=commonHelpers.js.map
