---
title: Homepage
---
# Hi!

I'm **Matthew Lindsey**

I'm an undergraduate student of Computer Science at Georgia State University's Perimeter College. 

# Interests

My primary interest lies in human experience and its expression, primarily in the form of technology, but also in more traditionally artistic mediums. The etchical implementations of technology and AI, and the principles we develop and explore within, are examples of things I care deeply about.

# Links & Information
[[Resume.pdf|RESUME]]

[GITHUB](https://github.com/anklus-dev)

[LINKEDIN](https://www.linkedin.com/in/matthew-lindsey-145b4835a/)

# What do I look at? Where do I go?
If you aren't sure where to start, try clicking <a id="random-page" style="cursor: pointer; text-decoration: underline; color: var(--tertiary);">here</a> to go to a random file!

You can also manually navigate to various topics I've written about using the sidebar.
<script>
(function() {
  function setupRandomLink() {
    const randomLink = document.getElementById("random-page");
    if (!randomLink) return;

    if (randomLink.dataset.listenerAdded) return;
    randomLink.dataset.listenerAdded = "true";

    randomLink.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation(); 
      
      randomLink.style.opacity = "0.5";
      randomLink.style.cursor = "wait"; 
      
      try {
        const base = document.querySelector(".page-title a")?.getAttribute("href") || "/";
        const rootPath = base.endsWith("/") ? base : base + "/";
        
        const response = await fetch(rootPath + "static/contentIndex.json"); 
        if (!response.ok) throw new Error("Failed to fetch static/contentIndex.json");
        const data = await response.json();
        
        const slugs = Object.keys(data);

        // Filter out index pages and tag pages
        const validSlugs = slugs.filter(slug => {
          if (!slug) return false;
          const normalized = slug.toLowerCase().trim();
          
          return normalized !== "" && 
                 normalized !== "index" && 
                 !normalized.endsWith("/index") && 
                 normalized !== "/" &&
                 !normalized.startsWith("tags/") &&
                 !normalized.startsWith("tags");
        });

        // Loop to find a page that actually exists (isn't a draft)
        while (validSlugs.length > 0) {
          // Pick a random index
          const randomIndex = Math.floor(Math.random() * validSlugs.length);
          const randomSlug = validSlugs[randomIndex];
          const targetUrl = rootPath + randomSlug;
          
          try {
            // Ping the URL to see if the HTML file was actually generated
            const check = await fetch(targetUrl, { method: "HEAD" });
            
            if (check.ok) {
              // The page exists! Route to it and exit the function
              if (window.spaNavigate) {
                window.spaNavigate(new URL(targetUrl, window.location.origin));
              } else {
                window.location.href = targetUrl;
              }
              return; 
            }
          } catch (pingErr) {
            console.warn("Ping failed for", targetUrl, pingErr);
          }
          
          // If we reach here, it was a draft (404) or failed. 
          // Remove it from the list and let the loop try another one instantly.
          validSlugs.splice(randomIndex, 1);
        }
        
        console.error("No valid public pages found to route to.");
        
      } catch (err) {
        console.error("Error routing to random page:", err);
      } finally {
        randomLink.style.opacity = "1";
        randomLink.style.cursor = "pointer";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", setupRandomLink);
  document.addEventListener("nav", setupRandomLink);
  setupRandomLink();
})();
</script>