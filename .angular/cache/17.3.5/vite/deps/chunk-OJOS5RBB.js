import {
  createAnimation,
  getIonPageElement
} from "./chunk-6JV5726G.js";

// node_modules/@ionic/core/dist/esm-es5/md.transition-d5aa5703.js
var mdTransitionAnimation = function(a, i) {
  var e, n, t;
  var r = "40px";
  var o = "0px";
  var m = i.direction === "back";
  var s = i.enteringEl;
  var l = i.leavingEl;
  var c = getIonPageElement(s);
  var d = c.querySelector("ion-toolbar");
  var v = createAnimation();
  v.addElement(c).fill("both").beforeRemoveClass("ion-page-invisible");
  if (m) {
    v.duration(((e = i.duration) !== null && e !== void 0 ? e : 0) || 200).easing("cubic-bezier(0.47,0,0.745,0.715)");
  } else {
    v.duration(((n = i.duration) !== null && n !== void 0 ? n : 0) || 280).easing("cubic-bezier(0.36,0.66,0.04,1)").fromTo("transform", "translateY(".concat(r, ")"), "translateY(".concat(o, ")")).fromTo("opacity", 0.01, 1);
  }
  if (d) {
    var b = createAnimation();
    b.addElement(d);
    v.addAnimation(b);
  }
  if (l && m) {
    v.duration(((t = i.duration) !== null && t !== void 0 ? t : 0) || 200).easing("cubic-bezier(0.47,0,0.745,0.715)");
    var p = createAnimation();
    p.addElement(getIonPageElement(l)).onFinish(function(a2) {
      if (a2 === 1 && p.elements.length > 0) {
        p.elements[0].style.setProperty("display", "none");
      }
    }).fromTo("transform", "translateY(".concat(o, ")"), "translateY(".concat(r, ")")).fromTo("opacity", 1, 0);
    v.addAnimation(p);
  }
  return v;
};

export {
  mdTransitionAnimation
};
/*! Bundled license information:

@ionic/core/dist/esm-es5/md.transition-d5aa5703.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=chunk-OJOS5RBB.js.map