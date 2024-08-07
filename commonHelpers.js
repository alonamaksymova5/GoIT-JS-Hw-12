import{a as d,S as w,i as p}from"./assets/vendor-BPs2jpei.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();function f({hits:e}){if(e.length===0){onSearchError();return}return e.map(({webformatURL:s,largeImageURL:a,tags:o,likes:t,views:r,comments:n,downloads:L})=>`
      <li class="gallery-item">
      <a class="gallery-link" href="${a}">
    <img
      class="gallery-image"
      src="${s}"
      alt="${o}"
    />
  </a>
  <ul class="gallery-attribute-list">
    <li class="attribute-item">
          <p class="attribute">Likes</p>
          <p class="attribute-value">${t}</p>
        </li>
        <li class="attribute-item">
          <p class="attribute">Views</p>
          <p class="attribute-value">${r}</p>
        </li>
        <li class="attribute-item">
          <p class="attribute">Comments</p>
          <p class="attribute-value">${n}</p>
        </li>
        <li class="attribute-item">
          <p class="attribute">Downloads</p>
          <p class="attribute-value">${L}</p>
        </li>
        </ul>
</li>`).join("")}d.defaults.baseURL="https://pixabay.com/api/";const m=15;async function g(e,s){const a="45244675-b8c376f5a42e781cf5d979658",o=new URLSearchParams({key:a,per_page:m,page:s,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true"});try{return(await d.get(`?${o}`)).data}catch{throw new Error("Failed to fetch images")}}const c=document.querySelector(".gallery"),S=document.querySelector(".js-search-form"),i=document.querySelector(".loader"),l=document.querySelector(".js-load-btn");let u=1,y="";l.style.display="none";i.style.display="none";S.addEventListener("submit",M);async function M(e){e.preventDefault();const s=e.currentTarget;if(y=s.elements.query.value.trim().toLowerCase(),y===""){c.innerHTML="",v("Please enter a search query.");return}i.style.display="block",c.innerHTML="",u=1;try{const a=await g(y,u),o=f(a);c.innerHTML=o,b.refresh(),a.totalHits>15?l.style.display="block":l.style.display="none"}catch{h()}finally{i.style.display="none",s.reset()}}l.addEventListener("click",async()=>{u+=1,i.style.display="block";try{const e=await g(y,u),s=f(e);c.insertAdjacentHTML("beforeend",s),b.refresh(),P();const a=Math.ceil(e.totalHits/m);u>=a&&(l.style.display="none",$("We're sorry, but you've reached the end of search results."))}catch{h()}finally{i.style.display="none"}});function h(e){q("Sorry, there are no images matching your search query. Please try again!"),c.innerHTML="",l.style.display="none",i.style.display="none"}function P(){const e=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}let b=new w(".gallery .gallery-link",{captionsData:"alt",captionDelay:250});function q(e){p.error({class:"izi-toast",message:e,position:"topRight"})}function v(e){p.warning({class:"izi-toast",message:e,position:"topRight"})}function $(e){p.info({class:"izi-toast",message:e,position:"bottomRight"})}
//# sourceMappingURL=commonHelpers.js.map
