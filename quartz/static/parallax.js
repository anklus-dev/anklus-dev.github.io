(function () {
  if (window.__hexParallax) return
  window.__hexParallax = true

  var MAX = 12 // max shift in px; lower = subtler (keep under 40, the CSS overhang)
  var EASE = 0.08 // lower = smoother/laggier

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

  var tx = 0, ty = 0, cx = 0, cy = 0, raf = 0

  function apply() {
    var s = document.documentElement.style
    s.setProperty("--px", cx.toFixed(2) + "px")
    s.setProperty("--py", cy.toFixed(2) + "px")
  }

  function tick() {
    cx += (tx - cx) * EASE
    cy += (ty - cy) * EASE
    apply()
    if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
      raf = requestAnimationFrame(tick)
    } else {
      raf = 0
    }
  }

  document.addEventListener("mousemove", function (e) {
    tx = (e.clientX / window.innerWidth - 0.5) * -2 * MAX
    ty = (e.clientY / window.innerHeight - 0.5) * -2 * MAX
    if (!raf) raf = requestAnimationFrame(tick)
  })

  // Reapply after SPA navigation in case the style attribute gets reset
  document.addEventListener("nav", apply)
})()
