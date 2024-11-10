import "./chunk-DNC5XA5R.js";
import "./chunk-XWBZKPA5.js";
import {
  LIFECYCLE_DID_ENTER,
  LIFECYCLE_DID_LEAVE,
  LIFECYCLE_WILL_ENTER,
  LIFECYCLE_WILL_LEAVE,
  LIFECYCLE_WILL_UNLOAD,
  componentOnReady,
  createAnimation,
  doc,
  getIonMode,
  getPlatforms,
  isPlatform,
  printIonWarning
} from "./chunk-H6V65Q5Z.js";
import {
  iosTransitionAnimation
} from "./chunk-2QWRM6MR.js";
import {
  mdTransitionAnimation
} from "./chunk-7LKW4V7L.js";
import {
  __awaiter,
  __decorate,
  __generator,
  __spreadArray,
  bootstrapLazy,
  componentOnReady as componentOnReady2,
  createAnimation as createAnimation2,
  doc as doc2,
  getIonMode as getIonMode2,
  getIonPageElement,
  getPlatforms as getPlatforms2,
  initialize,
  isPlatform as isPlatform2,
  printIonWarning as printIonWarning2
} from "./chunk-NR554Z3W.js";
import {
  ActivatedRoute,
  ChildrenOutletContexts,
  NavigationStart,
  PRIMARY_OUTLET,
  Router,
  RouterLink,
  UrlSerializer
} from "./chunk-HYE3WXJY.js";
import {
  MaxValidator,
  MinValidator,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl
} from "./chunk-5EEH2XAP.js";
import "./chunk-GSCRJPAT.js";
import "./chunk-J4PWH5AR.js";
import {
  CommonModule,
  DOCUMENT,
  Location,
  LocationStrategy,
  NgIf,
  NgTemplateOutlet
} from "./chunk-LEHTHJVC.js";
import {
  APP_INITIALIZER,
  ApplicationRef,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EnvironmentInjector,
  EventEmitter,
  HostListener,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  NgZone,
  Optional,
  Output,
  SkipSelf,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  createComponent,
  forwardRef,
  inject,
  reflectComponentType,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵinject,
  ɵɵinjectAttribute,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵviewQuery
} from "./chunk-FM33LJBA.js";
import {
  fromEvent
} from "./chunk-UMOB4LYC.js";
import {
  distinctUntilChanged,
  switchMap
} from "./chunk-GK724PJ5.js";
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  filter,
  of
} from "./chunk-K5J6TFSH.js";
import {
  __async,
  __objRest,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-K5VS565Y.js";

// node_modules/@ionic/core/components/gesture-controller.js
var GestureController = class {
  constructor() {
    this.gestureId = 0;
    this.requestedStart = /* @__PURE__ */ new Map();
    this.disabledGestures = /* @__PURE__ */ new Map();
    this.disabledScroll = /* @__PURE__ */ new Set();
  }
  /**
   * Creates a gesture delegate based on the GestureConfig passed
   */
  createGesture(config3) {
    var _a87;
    return new GestureDelegate(this, this.newID(), config3.name, (_a87 = config3.priority) !== null && _a87 !== void 0 ? _a87 : 0, !!config3.disableScroll);
  }
  /**
   * Creates a blocker that will block any other gesture events from firing. Set in the ion-gesture component.
   */
  createBlocker(opts = {}) {
    return new BlockerDelegate(this, this.newID(), opts.disable, !!opts.disableScroll);
  }
  start(gestureName, id, priority) {
    if (!this.canStart(gestureName)) {
      this.requestedStart.delete(id);
      return false;
    }
    this.requestedStart.set(id, priority);
    return true;
  }
  capture(gestureName, id, priority) {
    if (!this.start(gestureName, id, priority)) {
      return false;
    }
    const requestedStart = this.requestedStart;
    let maxPriority = -1e4;
    requestedStart.forEach((value) => {
      maxPriority = Math.max(maxPriority, value);
    });
    if (maxPriority === priority) {
      this.capturedId = id;
      requestedStart.clear();
      const event = new CustomEvent("ionGestureCaptured", { detail: { gestureName } });
      document.dispatchEvent(event);
      return true;
    }
    requestedStart.delete(id);
    return false;
  }
  release(id) {
    this.requestedStart.delete(id);
    if (this.capturedId === id) {
      this.capturedId = void 0;
    }
  }
  disableGesture(gestureName, id) {
    let set = this.disabledGestures.get(gestureName);
    if (set === void 0) {
      set = /* @__PURE__ */ new Set();
      this.disabledGestures.set(gestureName, set);
    }
    set.add(id);
  }
  enableGesture(gestureName, id) {
    const set = this.disabledGestures.get(gestureName);
    if (set !== void 0) {
      set.delete(id);
    }
  }
  disableScroll(id) {
    this.disabledScroll.add(id);
    if (this.disabledScroll.size === 1) {
      document.body.classList.add(BACKDROP_NO_SCROLL);
    }
  }
  enableScroll(id) {
    this.disabledScroll.delete(id);
    if (this.disabledScroll.size === 0) {
      document.body.classList.remove(BACKDROP_NO_SCROLL);
    }
  }
  canStart(gestureName) {
    if (this.capturedId !== void 0) {
      return false;
    }
    if (this.isDisabled(gestureName)) {
      return false;
    }
    return true;
  }
  isCaptured() {
    return this.capturedId !== void 0;
  }
  isScrollDisabled() {
    return this.disabledScroll.size > 0;
  }
  isDisabled(gestureName) {
    const disabled = this.disabledGestures.get(gestureName);
    if (disabled && disabled.size > 0) {
      return true;
    }
    return false;
  }
  newID() {
    this.gestureId++;
    return this.gestureId;
  }
};
var GestureDelegate = class {
  constructor(ctrl, id, name, priority, disableScroll) {
    this.id = id;
    this.name = name;
    this.disableScroll = disableScroll;
    this.priority = priority * 1e6 + id;
    this.ctrl = ctrl;
  }
  canStart() {
    if (!this.ctrl) {
      return false;
    }
    return this.ctrl.canStart(this.name);
  }
  start() {
    if (!this.ctrl) {
      return false;
    }
    return this.ctrl.start(this.name, this.id, this.priority);
  }
  capture() {
    if (!this.ctrl) {
      return false;
    }
    const captured = this.ctrl.capture(this.name, this.id, this.priority);
    if (captured && this.disableScroll) {
      this.ctrl.disableScroll(this.id);
    }
    return captured;
  }
  release() {
    if (this.ctrl) {
      this.ctrl.release(this.id);
      if (this.disableScroll) {
        this.ctrl.enableScroll(this.id);
      }
    }
  }
  destroy() {
    this.release();
    this.ctrl = void 0;
  }
};
var BlockerDelegate = class {
  constructor(ctrl, id, disable, disableScroll) {
    this.id = id;
    this.disable = disable;
    this.disableScroll = disableScroll;
    this.ctrl = ctrl;
  }
  block() {
    if (!this.ctrl) {
      return;
    }
    if (this.disable) {
      for (const gesture of this.disable) {
        this.ctrl.disableGesture(gesture, this.id);
      }
    }
    if (this.disableScroll) {
      this.ctrl.disableScroll(this.id);
    }
  }
  unblock() {
    if (!this.ctrl) {
      return;
    }
    if (this.disable) {
      for (const gesture of this.disable) {
        this.ctrl.enableGesture(gesture, this.id);
      }
    }
    if (this.disableScroll) {
      this.ctrl.enableScroll(this.id);
    }
  }
  destroy() {
    this.unblock();
    this.ctrl = void 0;
  }
};
var BACKDROP_NO_SCROLL = "backdrop-no-scroll";
var GESTURE_CONTROLLER = new GestureController();

// node_modules/@ionic/core/components/hardware-back-button.js
var MENU_BACK_BUTTON_PRIORITY = 99;

// node_modules/@ionic/core/components/index4.js
var baseAnimation = (isIos) => {
  return createAnimation().duration(isIos ? 400 : 300);
};
var menuOverlayAnimation = (menu) => {
  let closedX;
  let openedX;
  const width = menu.width + 8;
  const menuAnimation = createAnimation();
  const backdropAnimation = createAnimation();
  if (menu.isEndSide) {
    closedX = width + "px";
    openedX = "0px";
  } else {
    closedX = -width + "px";
    openedX = "0px";
  }
  menuAnimation.addElement(menu.menuInnerEl).fromTo("transform", `translateX(${closedX})`, `translateX(${openedX})`);
  const mode = getIonMode(menu);
  const isIos = mode === "ios";
  const opacity = isIos ? 0.2 : 0.25;
  backdropAnimation.addElement(menu.backdropEl).fromTo("opacity", 0.01, opacity);
  return baseAnimation(isIos).addAnimation([menuAnimation, backdropAnimation]);
};
var menuPushAnimation = (menu) => {
  let contentOpenedX;
  let menuClosedX;
  const mode = getIonMode(menu);
  const width = menu.width;
  if (menu.isEndSide) {
    contentOpenedX = -width + "px";
    menuClosedX = width + "px";
  } else {
    contentOpenedX = width + "px";
    menuClosedX = -width + "px";
  }
  const menuAnimation = createAnimation().addElement(menu.menuInnerEl).fromTo("transform", `translateX(${menuClosedX})`, "translateX(0px)");
  const contentAnimation = createAnimation().addElement(menu.contentEl).fromTo("transform", "translateX(0px)", `translateX(${contentOpenedX})`);
  const backdropAnimation = createAnimation().addElement(menu.backdropEl).fromTo("opacity", 0.01, 0.32);
  return baseAnimation(mode === "ios").addAnimation([menuAnimation, contentAnimation, backdropAnimation]);
};
var menuRevealAnimation = (menu) => {
  const mode = getIonMode(menu);
  const openedX = menu.width * (menu.isEndSide ? -1 : 1) + "px";
  const contentOpen = createAnimation().addElement(menu.contentEl).fromTo("transform", "translateX(0px)", `translateX(${openedX})`);
  return baseAnimation(mode === "ios").addAnimation(contentOpen);
};
var createMenuController = () => {
  const menuAnimations = /* @__PURE__ */ new Map();
  const menus = [];
  const open = (menu) => __async(void 0, null, function* () {
    const menuEl = yield get(menu, true);
    if (menuEl) {
      return menuEl.open();
    }
    return false;
  });
  const close = (menu) => __async(void 0, null, function* () {
    const menuEl = yield menu !== void 0 ? get(menu, true) : getOpen();
    if (menuEl !== void 0) {
      return menuEl.close();
    }
    return false;
  });
  const toggle = (menu) => __async(void 0, null, function* () {
    const menuEl = yield get(menu, true);
    if (menuEl) {
      return menuEl.toggle();
    }
    return false;
  });
  const enable = (shouldEnable, menu) => __async(void 0, null, function* () {
    const menuEl = yield get(menu);
    if (menuEl) {
      menuEl.disabled = !shouldEnable;
    }
    return menuEl;
  });
  const swipeGesture = (shouldEnable, menu) => __async(void 0, null, function* () {
    const menuEl = yield get(menu);
    if (menuEl) {
      menuEl.swipeGesture = shouldEnable;
    }
    return menuEl;
  });
  const isOpen = (menu) => __async(void 0, null, function* () {
    if (menu != null) {
      const menuEl = yield get(menu);
      return menuEl !== void 0 && menuEl.isOpen();
    } else {
      const menuEl = yield getOpen();
      return menuEl !== void 0;
    }
  });
  const isEnabled = (menu) => __async(void 0, null, function* () {
    const menuEl = yield get(menu);
    if (menuEl) {
      return !menuEl.disabled;
    }
    return false;
  });
  const get = (menu, logOnMultipleSideMenus = false) => __async(void 0, null, function* () {
    yield waitUntilReady();
    if (menu === "start" || menu === "end") {
      const menuRefs = menus.filter((m) => m.side === menu && !m.disabled);
      if (menuRefs.length >= 1) {
        if (menuRefs.length > 1 && logOnMultipleSideMenus) {
          printIonWarning(`menuController queried for a menu on the "${menu}" side, but ${menuRefs.length} menus were found. The first menu reference will be used. If this is not the behavior you want then pass the ID of the menu instead of its side.`, menuRefs.map((m) => m.el));
        }
        return menuRefs[0].el;
      }
      const sideMenuRefs = menus.filter((m) => m.side === menu);
      if (sideMenuRefs.length >= 1) {
        if (sideMenuRefs.length > 1 && logOnMultipleSideMenus) {
          printIonWarning(`menuController queried for a menu on the "${menu}" side, but ${sideMenuRefs.length} menus were found. The first menu reference will be used. If this is not the behavior you want then pass the ID of the menu instead of its side.`, sideMenuRefs.map((m) => m.el));
        }
        return sideMenuRefs[0].el;
      }
    } else if (menu != null) {
      return find((m) => m.menuId === menu);
    }
    const menuEl = find((m) => !m.disabled);
    if (menuEl) {
      return menuEl;
    }
    return menus.length > 0 ? menus[0].el : void 0;
  });
  const getOpen = () => __async(void 0, null, function* () {
    yield waitUntilReady();
    return _getOpenSync();
  });
  const getMenus = () => __async(void 0, null, function* () {
    yield waitUntilReady();
    return getMenusSync();
  });
  const isAnimating = () => __async(void 0, null, function* () {
    yield waitUntilReady();
    return isAnimatingSync();
  });
  const registerAnimation = (name, animation) => {
    menuAnimations.set(name, animation);
  };
  const _register = (menu) => {
    if (menus.indexOf(menu) < 0) {
      menus.push(menu);
    }
  };
  const _unregister = (menu) => {
    const index = menus.indexOf(menu);
    if (index > -1) {
      menus.splice(index, 1);
    }
  };
  const _setOpen = (menu, shouldOpen, animated) => __async(void 0, null, function* () {
    if (isAnimatingSync()) {
      return false;
    }
    if (shouldOpen) {
      const openedMenu = yield getOpen();
      if (openedMenu && menu.el !== openedMenu) {
        yield openedMenu.setOpen(false, false);
      }
    }
    return menu._setOpen(shouldOpen, animated);
  });
  const _createAnimation = (type, menuCmp) => {
    const animationBuilder = menuAnimations.get(type);
    if (!animationBuilder) {
      throw new Error("animation not registered");
    }
    const animation = animationBuilder(menuCmp);
    return animation;
  };
  const _getOpenSync = () => {
    return find((m) => m._isOpen);
  };
  const getMenusSync = () => {
    return menus.map((menu) => menu.el);
  };
  const isAnimatingSync = () => {
    return menus.some((menu) => menu.isAnimating);
  };
  const find = (predicate) => {
    const instance = menus.find(predicate);
    if (instance !== void 0) {
      return instance.el;
    }
    return void 0;
  };
  const waitUntilReady = () => {
    return Promise.all(Array.from(document.querySelectorAll("ion-menu")).map((menu) => new Promise((resolve) => componentOnReady(menu, resolve))));
  };
  registerAnimation("reveal", menuRevealAnimation);
  registerAnimation("push", menuPushAnimation);
  registerAnimation("overlay", menuOverlayAnimation);
  doc === null || doc === void 0 ? void 0 : doc.addEventListener("ionBackButton", (ev) => {
    const openMenu = _getOpenSync();
    if (openMenu) {
      ev.detail.register(MENU_BACK_BUTTON_PRIORITY, () => {
        return openMenu.close();
      });
    }
  });
  return {
    registerAnimation,
    get,
    getMenus,
    getOpen,
    isEnabled,
    swipeGesture,
    isAnimating,
    isOpen,
    enable,
    toggle,
    close,
    open,
    _getOpenSync,
    _createAnimation,
    _register,
    _unregister,
    _setOpen
  };
};
var menuController = createMenuController();

// node_modules/@ionic/core/components/overlays.js
var createController = (tagName) => {
  return {
    create(options) {
      return createOverlay(tagName, options);
    },
    dismiss(data, role, id) {
      return dismissOverlay(document, data, role, tagName, id);
    },
    getTop() {
      return __async(this, null, function* () {
        return getPresentedOverlay(document, tagName);
      });
    }
  };
};
var alertController = createController("ion-alert");
var actionSheetController = createController("ion-action-sheet");
var loadingController = createController("ion-loading");
var modalController = createController("ion-modal");
var pickerController = createController("ion-picker-legacy");
var popoverController = createController("ion-popover");
var toastController = createController("ion-toast");
var createOverlay = (tagName, opts) => {
  if (typeof window !== "undefined" && typeof window.customElements !== "undefined") {
    return window.customElements.whenDefined(tagName).then(() => {
      const element = document.createElement(tagName);
      element.classList.add("overlay-hidden");
      Object.assign(element, Object.assign(Object.assign({}, opts), { hasController: true }));
      getAppRoot(document).appendChild(element);
      return new Promise((resolve) => componentOnReady(element, resolve));
    });
  }
  return Promise.resolve();
};
var isOverlayHidden = (overlay) => overlay.classList.contains("overlay-hidden");
var dismissOverlay = (doc3, data, role, overlayTag, id) => {
  const overlay = getPresentedOverlay(doc3, overlayTag, id);
  if (!overlay) {
    return Promise.reject("overlay does not exist");
  }
  return overlay.dismiss(data, role);
};
var getOverlays = (doc3, selector) => {
  if (selector === void 0) {
    selector = "ion-alert,ion-action-sheet,ion-loading,ion-modal,ion-picker-legacy,ion-popover,ion-toast";
  }
  return Array.from(doc3.querySelectorAll(selector)).filter((c) => c.overlayIndex > 0);
};
var getPresentedOverlays = (doc3, overlayTag) => {
  return getOverlays(doc3, overlayTag).filter((o) => !isOverlayHidden(o));
};
var getPresentedOverlay = (doc3, overlayTag, id) => {
  const overlays = getPresentedOverlays(doc3, overlayTag);
  return id === void 0 ? overlays[overlays.length - 1] : overlays.find((o) => o.id === id);
};
var getAppRoot = (doc3) => {
  return doc3.querySelector("ion-app") || doc3.body;
};

// node_modules/@ionic/angular/fesm2022/ionic-angular-common.mjs
var _c0 = ["tabsInner"];
var MenuController = class {
  constructor(menuController3) {
    __publicField(this, "menuController");
    this.menuController = menuController3;
  }
  /**
   * Programmatically open the Menu.
   * @param [menuId]  Optionally get the menu by its id, or side.
   * @return returns a promise when the menu is fully opened
   */
  open(menuId) {
    return this.menuController.open(menuId);
  }
  /**
   * Programmatically close the Menu. If no `menuId` is given as the first
   * argument then it'll close any menu which is open. If a `menuId`
   * is given then it'll close that exact menu.
   * @param [menuId]  Optionally get the menu by its id, or side.
   * @return returns a promise when the menu is fully closed
   */
  close(menuId) {
    return this.menuController.close(menuId);
  }
  /**
   * Toggle the menu. If it's closed, it will open, and if opened, it
   * will close.
   * @param [menuId]  Optionally get the menu by its id, or side.
   * @return returns a promise when the menu has been toggled
   */
  toggle(menuId) {
    return this.menuController.toggle(menuId);
  }
  /**
   * Used to enable or disable a menu. For example, there could be multiple
   * left menus, but only one of them should be able to be opened at the same
   * time. If there are multiple menus on the same side, then enabling one menu
   * will also automatically disable all the others that are on the same side.
   * @param [menuId]  Optionally get the menu by its id, or side.
   * @return Returns the instance of the menu, which is useful for chaining.
   */
  enable(shouldEnable, menuId) {
    return this.menuController.enable(shouldEnable, menuId);
  }
  /**
   * Used to enable or disable the ability to swipe open the menu.
   * @param shouldEnable  True if it should be swipe-able, false if not.
   * @param [menuId]  Optionally get the menu by its id, or side.
   * @return Returns the instance of the menu, which is useful for chaining.
   */
  swipeGesture(shouldEnable, menuId) {
    return this.menuController.swipeGesture(shouldEnable, menuId);
  }
  /**
   * @param [menuId] Optionally get the menu by its id, or side.
   * @return Returns true if the specified menu is currently open, otherwise false.
   * If the menuId is not specified, it returns true if ANY menu is currenly open.
   */
  isOpen(menuId) {
    return this.menuController.isOpen(menuId);
  }
  /**
   * @param [menuId]  Optionally get the menu by its id, or side.
   * @return Returns true if the menu is currently enabled, otherwise false.
   */
  isEnabled(menuId) {
    return this.menuController.isEnabled(menuId);
  }
  /**
   * Used to get a menu instance. If a `menuId` is not provided then it'll
   * return the first menu found. If a `menuId` is `left` or `right`, then
   * it'll return the enabled menu on that side. Otherwise, if a `menuId` is
   * provided, then it'll try to find the menu using the menu's `id`
   * property. If a menu is not found then it'll return `null`.
   * @param [menuId]  Optionally get the menu by its id, or side.
   * @return Returns the instance of the menu if found, otherwise `null`.
   */
  get(menuId) {
    return this.menuController.get(menuId);
  }
  /**
   * @return Returns the instance of the menu already opened, otherwise `null`.
   */
  getOpen() {
    return this.menuController.getOpen();
  }
  /**
   * @return Returns an array of all menu instances.
   */
  getMenus() {
    return this.menuController.getMenus();
  }
  registerAnimation(name, animation) {
    return this.menuController.registerAnimation(name, animation);
  }
  isAnimating() {
    return this.menuController.isAnimating();
  }
  _getOpenSync() {
    return this.menuController._getOpenSync();
  }
  _createAnimation(type, menuCmp) {
    return this.menuController._createAnimation(type, menuCmp);
  }
  _register(menu) {
    return this.menuController._register(menu);
  }
  _unregister(menu) {
    return this.menuController._unregister(menu);
  }
  _setOpen(menu, shouldOpen, animated) {
    return this.menuController._setOpen(menu, shouldOpen, animated);
  }
};
var _DomController = class _DomController {
  /**
   * Schedules a task to run during the READ phase of the next frame.
   * This task should only read the DOM, but never modify it.
   */
  read(cb) {
    getQueue().read(cb);
  }
  /**
   * Schedules a task to run during the WRITE phase of the next frame.
   * This task should write the DOM, but never READ it.
   */
  write(cb) {
    getQueue().write(cb);
  }
};
/** @nocollapse */
__publicField(_DomController, "ɵfac", function DomController_Factory(t) {
  return new (t || _DomController)();
});
/** @nocollapse */
__publicField(_DomController, "ɵprov", ɵɵdefineInjectable({
  token: _DomController,
  factory: _DomController.ɵfac,
  providedIn: "root"
}));
var DomController = _DomController;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DomController, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var getQueue = () => {
  const win3 = typeof window !== "undefined" ? window : null;
  if (win3 != null) {
    const Ionic = win3.Ionic;
    if (Ionic?.queue) {
      return Ionic.queue;
    }
    return {
      read: (cb) => win3.requestAnimationFrame(cb),
      write: (cb) => win3.requestAnimationFrame(cb)
    };
  }
  return {
    read: (cb) => cb(),
    write: (cb) => cb()
  };
};
var _Platform = class _Platform {
  constructor(doc3, zone) {
    __publicField(this, "doc");
    __publicField(this, "_readyPromise");
    __publicField(this, "win");
    /**
     * @hidden
     */
    __publicField(this, "backButton", new Subject());
    /**
     * The keyboardDidShow event emits when the
     * on-screen keyboard is presented.
     */
    __publicField(this, "keyboardDidShow", new Subject());
    /**
     * The keyboardDidHide event emits when the
     * on-screen keyboard is hidden.
     */
    __publicField(this, "keyboardDidHide", new Subject());
    /**
     * The pause event emits when the native platform puts the application
     * into the background, typically when the user switches to a different
     * application. This event would emit when a Cordova app is put into
     * the background, however, it would not fire on a standard web browser.
     */
    __publicField(this, "pause", new Subject());
    /**
     * The resume event emits when the native platform pulls the application
     * out from the background. This event would emit when a Cordova app comes
     * out from the background, however, it would not fire on a standard web browser.
     */
    __publicField(this, "resume", new Subject());
    /**
     * The resize event emits when the browser window has changed dimensions. This
     * could be from a browser window being physically resized, or from a device
     * changing orientation.
     */
    __publicField(this, "resize", new Subject());
    this.doc = doc3;
    zone.run(() => {
      this.win = doc3.defaultView;
      this.backButton.subscribeWithPriority = function(priority, callback) {
        return this.subscribe((ev) => {
          return ev.register(priority, (processNextHandler) => zone.run(() => callback(processNextHandler)));
        });
      };
      proxyEvent(this.pause, doc3, "pause", zone);
      proxyEvent(this.resume, doc3, "resume", zone);
      proxyEvent(this.backButton, doc3, "ionBackButton", zone);
      proxyEvent(this.resize, this.win, "resize", zone);
      proxyEvent(this.keyboardDidShow, this.win, "ionKeyboardDidShow", zone);
      proxyEvent(this.keyboardDidHide, this.win, "ionKeyboardDidHide", zone);
      let readyResolve;
      this._readyPromise = new Promise((res) => {
        readyResolve = res;
      });
      if (this.win?.["cordova"]) {
        doc3.addEventListener("deviceready", () => {
          readyResolve("cordova");
        }, {
          once: true
        });
      } else {
        readyResolve("dom");
      }
    });
  }
  /**
   * @returns returns true/false based on platform.
   * @description
   * Depending on the platform the user is on, `is(platformName)` will
   * return `true` or `false`. Note that the same app can return `true`
   * for more than one platform name. For example, an app running from
   * an iPad would return `true` for the platform names: `mobile`,
   * `ios`, `ipad`, and `tablet`. Additionally, if the app was running
   * from Cordova then `cordova` would be true, and if it was running
   * from a web browser on the iPad then `mobileweb` would be `true`.
   *
   * ```
   * import { Platform } from 'ionic-angular';
   *
   * @Component({...})
   * export MyPage {
   *   constructor(public platform: Platform) {
   *     if (this.platform.is('ios')) {
   *       // This will only print when on iOS
   *       console.log('I am an iOS device!');
   *     }
   *   }
   * }
   * ```
   *
   * | Platform Name   | Description                        |
   * |-----------------|------------------------------------|
   * | android         | on a device running Android.       |
   * | capacitor       | on a device running Capacitor.     |
   * | cordova         | on a device running Cordova.       |
   * | ios             | on a device running iOS.           |
   * | ipad            | on an iPad device.                 |
   * | iphone          | on an iPhone device.               |
   * | phablet         | on a phablet device.               |
   * | tablet          | on a tablet device.                |
   * | electron        | in Electron on a desktop device.   |
   * | pwa             | as a PWA app.                      |
   * | mobile          | on a mobile device.                |
   * | mobileweb       | on a mobile device in a browser.   |
   * | desktop         | on a desktop device.               |
   * | hybrid          | is a cordova or capacitor app.     |
   *
   */
  is(platformName) {
    return isPlatform(this.win, platformName);
  }
  /**
   * @returns the array of platforms
   * @description
   * Depending on what device you are on, `platforms` can return multiple values.
   * Each possible value is a hierarchy of platforms. For example, on an iPhone,
   * it would return `mobile`, `ios`, and `iphone`.
   *
   * ```
   * import { Platform } from 'ionic-angular';
   *
   * @Component({...})
   * export MyPage {
   *   constructor(public platform: Platform) {
   *     // This will print an array of the current platforms
   *     console.log(this.platform.platforms());
   *   }
   * }
   * ```
   */
  platforms() {
    return getPlatforms(this.win);
  }
  /**
   * Returns a promise when the platform is ready and native functionality
   * can be called. If the app is running from within a web browser, then
   * the promise will resolve when the DOM is ready. When the app is running
   * from an application engine such as Cordova, then the promise will
   * resolve when Cordova triggers the `deviceready` event.
   *
   * The resolved value is the `readySource`, which states which platform
   * ready was used. For example, when Cordova is ready, the resolved ready
   * source is `cordova`. The default ready source value will be `dom`. The
   * `readySource` is useful if different logic should run depending on the
   * platform the app is running from. For example, only Cordova can execute
   * the status bar plugin, so the web should not run status bar plugin logic.
   *
   * ```
   * import { Component } from '@angular/core';
   * import { Platform } from 'ionic-angular';
   *
   * @Component({...})
   * export MyApp {
   *   constructor(public platform: Platform) {
   *     this.platform.ready().then((readySource) => {
   *       console.log('Platform ready from', readySource);
   *       // Platform now ready, execute any required native code
   *     });
   *   }
   * }
   * ```
   */
  ready() {
    return this._readyPromise;
  }
  /**
   * Returns if this app is using right-to-left language direction or not.
   * We recommend the app's `index.html` file already has the correct `dir`
   * attribute value set, such as `<html dir="ltr">` or `<html dir="rtl">`.
   * [W3C: Structural markup and right-to-left text in HTML](http://www.w3.org/International/questions/qa-html-dir)
   */
  get isRTL() {
    return this.doc.dir === "rtl";
  }
  /**
   * Get the query string parameter
   */
  getQueryParam(key) {
    return readQueryParam(this.win.location.href, key);
  }
  /**
   * Returns `true` if the app is in landscape mode.
   */
  isLandscape() {
    return !this.isPortrait();
  }
  /**
   * Returns `true` if the app is in portrait mode.
   */
  isPortrait() {
    return this.win.matchMedia?.("(orientation: portrait)").matches;
  }
  testUserAgent(expression) {
    const nav = this.win.navigator;
    return !!(nav?.userAgent && nav.userAgent.indexOf(expression) >= 0);
  }
  /**
   * Get the current url.
   */
  url() {
    return this.win.location.href;
  }
  /**
   * Gets the width of the platform's viewport using `window.innerWidth`.
   */
  width() {
    return this.win.innerWidth;
  }
  /**
   * Gets the height of the platform's viewport using `window.innerHeight`.
   */
  height() {
    return this.win.innerHeight;
  }
};
/** @nocollapse */
__publicField(_Platform, "ɵfac", function Platform_Factory(t) {
  return new (t || _Platform)(ɵɵinject(DOCUMENT), ɵɵinject(NgZone));
});
/** @nocollapse */
__publicField(_Platform, "ɵprov", ɵɵdefineInjectable({
  token: _Platform,
  factory: _Platform.ɵfac,
  providedIn: "root"
}));
var Platform = _Platform;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Platform, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }, {
      type: NgZone
    }];
  }, null);
})();
var readQueryParam = (url, key) => {
  key = key.replace(/[[\]\\]/g, "\\$&");
  const regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
  const results = regex.exec(url);
  return results ? decodeURIComponent(results[1].replace(/\+/g, " ")) : null;
};
var proxyEvent = (emitter, el, eventName, zone) => {
  if (el) {
    el.addEventListener(eventName, (ev) => {
      zone.run(() => {
        const value = ev != null ? ev.detail : void 0;
        emitter.next(value);
      });
    });
  }
};
var _NavController = class _NavController {
  constructor(platform, location, serializer, router) {
    __publicField(this, "location");
    __publicField(this, "serializer");
    __publicField(this, "router");
    __publicField(this, "topOutlet");
    __publicField(this, "direction", DEFAULT_DIRECTION);
    __publicField(this, "animated", DEFAULT_ANIMATED);
    __publicField(this, "animationBuilder");
    __publicField(this, "guessDirection", "forward");
    __publicField(this, "guessAnimation");
    __publicField(this, "lastNavId", -1);
    this.location = location;
    this.serializer = serializer;
    this.router = router;
    if (router) {
      router.events.subscribe((ev) => {
        if (ev instanceof NavigationStart) {
          const id = ev.restoredState ? ev.restoredState.navigationId : ev.id;
          this.guessDirection = this.guessAnimation = id < this.lastNavId ? "back" : "forward";
          this.lastNavId = this.guessDirection === "forward" ? ev.id : id;
        }
      });
    }
    platform.backButton.subscribeWithPriority(0, (processNextHandler) => {
      this.pop();
      processNextHandler();
    });
  }
  /**
   * This method uses Angular's [Router](https://angular.io/api/router/Router) under the hood,
   * it's equivalent to calling `this.router.navigateByUrl()`, but it's explicit about the **direction** of the transition.
   *
   * Going **forward** means that a new page is going to be pushed to the stack of the outlet (ion-router-outlet),
   * and that it will show a "forward" animation by default.
   *
   * Navigating forward can also be triggered in a declarative manner by using the `[routerDirection]` directive:
   *
   * ```html
   * <a routerLink="/path/to/page" routerDirection="forward">Link</a>
   * ```
   */
  navigateForward(url, options = {}) {
    this.setDirection("forward", options.animated, options.animationDirection, options.animation);
    return this.navigate(url, options);
  }
  /**
   * This method uses Angular's [Router](https://angular.io/api/router/Router) under the hood,
   * it's equivalent to calling:
   *
   * ```ts
   * this.navController.setDirection('back');
   * this.router.navigateByUrl(path);
   * ```
   *
   * Going **back** means that all the pages in the stack until the navigated page is found will be popped,
   * and that it will show a "back" animation by default.
   *
   * Navigating back can also be triggered in a declarative manner by using the `[routerDirection]` directive:
   *
   * ```html
   * <a routerLink="/path/to/page" routerDirection="back">Link</a>
   * ```
   */
  navigateBack(url, options = {}) {
    this.setDirection("back", options.animated, options.animationDirection, options.animation);
    return this.navigate(url, options);
  }
  /**
   * This method uses Angular's [Router](https://angular.io/api/router/Router) under the hood,
   * it's equivalent to calling:
   *
   * ```ts
   * this.navController.setDirection('root');
   * this.router.navigateByUrl(path);
   * ```
   *
   * Going **root** means that all existing pages in the stack will be removed,
   * and the navigated page will become the single page in the stack.
   *
   * Navigating root can also be triggered in a declarative manner by using the `[routerDirection]` directive:
   *
   * ```html
   * <a routerLink="/path/to/page" routerDirection="root">Link</a>
   * ```
   */
  navigateRoot(url, options = {}) {
    this.setDirection("root", options.animated, options.animationDirection, options.animation);
    return this.navigate(url, options);
  }
  /**
   * Same as [Location](https://angular.io/api/common/Location)'s back() method.
   * It will use the standard `window.history.back()` under the hood, but featuring a `back` animation
   * by default.
   */
  back(options = {
    animated: true,
    animationDirection: "back"
  }) {
    this.setDirection("back", options.animated, options.animationDirection, options.animation);
    return this.location.back();
  }
  /**
   * This methods goes back in the context of Ionic's stack navigation.
   *
   * It recursively finds the top active `ion-router-outlet` and calls `pop()`.
   * This is the recommended way to go back when you are using `ion-router-outlet`.
   *
   * Resolves to `true` if it was able to pop.
   */
  pop() {
    return __async(this, null, function* () {
      let outlet = this.topOutlet;
      while (outlet) {
        if (yield outlet.pop()) {
          return true;
        } else {
          outlet = outlet.parentOutlet;
        }
      }
      return false;
    });
  }
  /**
   * This methods specifies the direction of the next navigation performed by the Angular router.
   *
   * `setDirection()` does not trigger any transition, it just sets some flags to be consumed by `ion-router-outlet`.
   *
   * It's recommended to use `navigateForward()`, `navigateBack()` and `navigateRoot()` instead of `setDirection()`.
   */
  setDirection(direction, animated, animationDirection, animationBuilder) {
    this.direction = direction;
    this.animated = getAnimation(direction, animated, animationDirection);
    this.animationBuilder = animationBuilder;
  }
  /**
   * @internal
   */
  setTopOutlet(outlet) {
    this.topOutlet = outlet;
  }
  /**
   * @internal
   */
  consumeTransition() {
    let direction = "root";
    let animation;
    const animationBuilder = this.animationBuilder;
    if (this.direction === "auto") {
      direction = this.guessDirection;
      animation = this.guessAnimation;
    } else {
      animation = this.animated;
      direction = this.direction;
    }
    this.direction = DEFAULT_DIRECTION;
    this.animated = DEFAULT_ANIMATED;
    this.animationBuilder = void 0;
    return {
      direction,
      animation,
      animationBuilder
    };
  }
  navigate(url, options) {
    if (Array.isArray(url)) {
      return this.router.navigate(url, options);
    } else {
      const urlTree = this.serializer.parse(url.toString());
      if (options.queryParams !== void 0) {
        urlTree.queryParams = __spreadValues({}, options.queryParams);
      }
      if (options.fragment !== void 0) {
        urlTree.fragment = options.fragment;
      }
      return this.router.navigateByUrl(urlTree, options);
    }
  }
};
/** @nocollapse */
__publicField(_NavController, "ɵfac", function NavController_Factory(t) {
  return new (t || _NavController)(ɵɵinject(Platform), ɵɵinject(Location), ɵɵinject(UrlSerializer), ɵɵinject(Router, 8));
});
/** @nocollapse */
__publicField(_NavController, "ɵprov", ɵɵdefineInjectable({
  token: _NavController,
  factory: _NavController.ɵfac,
  providedIn: "root"
}));
var NavController = _NavController;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NavController, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: Platform
    }, {
      type: Location
    }, {
      type: UrlSerializer
    }, {
      type: Router,
      decorators: [{
        type: Optional
      }]
    }];
  }, null);
})();
var getAnimation = (direction, animated, animationDirection) => {
  if (animated === false) {
    return void 0;
  }
  if (animationDirection !== void 0) {
    return animationDirection;
  }
  if (direction === "forward" || direction === "back") {
    return direction;
  } else if (direction === "root" && animated === true) {
    return "forward";
  }
  return void 0;
};
var DEFAULT_DIRECTION = "auto";
var DEFAULT_ANIMATED = void 0;
var _Config = class _Config {
  get(key, fallback) {
    const c = getConfig();
    if (c) {
      return c.get(key, fallback);
    }
    return null;
  }
  getBoolean(key, fallback) {
    const c = getConfig();
    if (c) {
      return c.getBoolean(key, fallback);
    }
    return false;
  }
  getNumber(key, fallback) {
    const c = getConfig();
    if (c) {
      return c.getNumber(key, fallback);
    }
    return 0;
  }
};
/** @nocollapse */
__publicField(_Config, "ɵfac", function Config_Factory(t) {
  return new (t || _Config)();
});
/** @nocollapse */
__publicField(_Config, "ɵprov", ɵɵdefineInjectable({
  token: _Config,
  factory: _Config.ɵfac,
  providedIn: "root"
}));
var Config = _Config;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Config, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var ConfigToken = new InjectionToken("USERCONFIG");
var getConfig = () => {
  if (typeof window !== "undefined") {
    const Ionic = window.Ionic;
    if (Ionic?.config) {
      return Ionic.config;
    }
  }
  return null;
};
var NavParams = class {
  constructor(data = {}) {
    __publicField(this, "data");
    this.data = data;
    console.warn(`[Ionic Warning]: NavParams has been deprecated in favor of using Angular's input API. Developers should migrate to either the @Input decorator or the Signals-based input API.`);
  }
  /**
   * Get the value of a nav-parameter for the current view
   *
   * ```ts
   * import { NavParams } from 'ionic-angular';
   *
   * export class MyClass{
   *  constructor(public navParams: NavParams){
   *    // userParams is an object we have in our nav-parameters
   *    this.navParams.get('userParams');
   *  }
   * }
   * ```
   *
   * @param param Which param you want to look up
   */
  get(param) {
    return this.data[param];
  }
};
var _AngularDelegate = class _AngularDelegate {
  constructor() {
    __publicField(this, "zone", inject(NgZone));
    __publicField(this, "applicationRef", inject(ApplicationRef));
    __publicField(this, "config", inject(ConfigToken));
  }
  create(environmentInjector, injector, elementReferenceKey) {
    return new AngularFrameworkDelegate(environmentInjector, injector, this.applicationRef, this.zone, elementReferenceKey, this.config.useSetInputAPI ?? false);
  }
};
/** @nocollapse */
__publicField(_AngularDelegate, "ɵfac", function AngularDelegate_Factory(t) {
  return new (t || _AngularDelegate)();
});
/** @nocollapse */
__publicField(_AngularDelegate, "ɵprov", ɵɵdefineInjectable({
  token: _AngularDelegate,
  factory: _AngularDelegate.ɵfac
}));
var AngularDelegate = _AngularDelegate;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngularDelegate, [{
    type: Injectable
  }], null, null);
})();
var AngularFrameworkDelegate = class {
  constructor(environmentInjector, injector, applicationRef, zone, elementReferenceKey, enableSignalsSupport) {
    __publicField(this, "environmentInjector");
    __publicField(this, "injector");
    __publicField(this, "applicationRef");
    __publicField(this, "zone");
    __publicField(this, "elementReferenceKey");
    __publicField(this, "enableSignalsSupport");
    __publicField(this, "elRefMap", /* @__PURE__ */ new WeakMap());
    __publicField(this, "elEventsMap", /* @__PURE__ */ new WeakMap());
    this.environmentInjector = environmentInjector;
    this.injector = injector;
    this.applicationRef = applicationRef;
    this.zone = zone;
    this.elementReferenceKey = elementReferenceKey;
    this.enableSignalsSupport = enableSignalsSupport;
  }
  attachViewToDom(container, component, params, cssClasses) {
    return this.zone.run(() => {
      return new Promise((resolve) => {
        const componentProps = __spreadValues({}, params);
        if (this.elementReferenceKey !== void 0) {
          componentProps[this.elementReferenceKey] = container;
        }
        const el = attachView(this.zone, this.environmentInjector, this.injector, this.applicationRef, this.elRefMap, this.elEventsMap, container, component, componentProps, cssClasses, this.elementReferenceKey, this.enableSignalsSupport);
        resolve(el);
      });
    });
  }
  removeViewFromDom(_container, component) {
    return this.zone.run(() => {
      return new Promise((resolve) => {
        const componentRef = this.elRefMap.get(component);
        if (componentRef) {
          componentRef.destroy();
          this.elRefMap.delete(component);
          const unbindEvents = this.elEventsMap.get(component);
          if (unbindEvents) {
            unbindEvents();
            this.elEventsMap.delete(component);
          }
        }
        resolve();
      });
    });
  }
};
var attachView = (zone, environmentInjector, injector, applicationRef, elRefMap, elEventsMap, container, component, params, cssClasses, elementReferenceKey, enableSignalsSupport) => {
  const childInjector = Injector.create({
    providers: getProviders(params),
    parent: injector
  });
  const componentRef = createComponent(component, {
    environmentInjector,
    elementInjector: childInjector
  });
  const instance = componentRef.instance;
  const hostElement = componentRef.location.nativeElement;
  if (params) {
    if (elementReferenceKey && instance[elementReferenceKey] !== void 0) {
      console.error(`[Ionic Error]: ${elementReferenceKey} is a reserved property when using ${container.tagName.toLowerCase()}. Rename or remove the "${elementReferenceKey}" property from ${component.name}.`);
    }
    if (enableSignalsSupport === true && componentRef.setInput !== void 0) {
      const _a87 = params, {
        modal,
        popover
      } = _a87, otherParams = __objRest(_a87, [
        "modal",
        "popover"
      ]);
      for (const key in otherParams) {
        componentRef.setInput(key, otherParams[key]);
      }
      if (modal !== void 0) {
        Object.assign(instance, {
          modal
        });
      }
      if (popover !== void 0) {
        Object.assign(instance, {
          popover
        });
      }
    } else {
      Object.assign(instance, params);
    }
  }
  if (cssClasses) {
    for (const cssClass of cssClasses) {
      hostElement.classList.add(cssClass);
    }
  }
  const unbindEvents = bindLifecycleEvents(zone, instance, hostElement);
  container.appendChild(hostElement);
  applicationRef.attachView(componentRef.hostView);
  elRefMap.set(hostElement, componentRef);
  elEventsMap.set(hostElement, unbindEvents);
  return hostElement;
};
var LIFECYCLES = [LIFECYCLE_WILL_ENTER, LIFECYCLE_DID_ENTER, LIFECYCLE_WILL_LEAVE, LIFECYCLE_DID_LEAVE, LIFECYCLE_WILL_UNLOAD];
var bindLifecycleEvents = (zone, instance, element) => {
  return zone.run(() => {
    const unregisters = LIFECYCLES.filter((eventName) => typeof instance[eventName] === "function").map((eventName) => {
      const handler = (ev) => instance[eventName](ev.detail);
      element.addEventListener(eventName, handler);
      return () => element.removeEventListener(eventName, handler);
    });
    return () => unregisters.forEach((fn) => fn());
  });
};
var NavParamsToken = new InjectionToken("NavParamsToken");
var getProviders = (params) => {
  return [{
    provide: NavParamsToken,
    useValue: params
  }, {
    provide: NavParams,
    useFactory: provideNavParamsInjectable,
    deps: [NavParamsToken]
  }];
};
var provideNavParamsInjectable = (params) => {
  return new NavParams(params);
};
var proxyInputs = (Cmp, inputs) => {
  const Prototype = Cmp.prototype;
  inputs.forEach((item) => {
    Object.defineProperty(Prototype, item, {
      get() {
        return this.el[item];
      },
      set(val) {
        this.z.runOutsideAngular(() => this.el[item] = val);
      }
    });
  });
};
var proxyMethods = (Cmp, methods) => {
  const Prototype = Cmp.prototype;
  methods.forEach((methodName) => {
    Prototype[methodName] = function() {
      const args = arguments;
      return this.z.runOutsideAngular(() => this.el[methodName].apply(this.el, args));
    };
  });
};
var proxyOutputs = (instance, el, events) => {
  events.forEach((eventName) => instance[eventName] = fromEvent(el, eventName));
};
function ProxyCmp(opts) {
  const decorator = function(cls) {
    const {
      defineCustomElementFn,
      inputs,
      methods
    } = opts;
    if (defineCustomElementFn !== void 0) {
      defineCustomElementFn();
    }
    if (inputs) {
      proxyInputs(cls, inputs);
    }
    if (methods) {
      proxyMethods(cls, methods);
    }
    return cls;
  };
  return decorator;
}
var POPOVER_INPUTS = ["alignment", "animated", "arrow", "keepContentsMounted", "backdropDismiss", "cssClass", "dismissOnSelect", "enterAnimation", "event", "focusTrap", "isOpen", "keyboardClose", "leaveAnimation", "mode", "showBackdrop", "translucent", "trigger", "triggerAction", "reference", "size", "side"];
var POPOVER_METHODS = ["present", "dismiss", "onDidDismiss", "onWillDismiss"];
var _a;
var IonPopover = (_a = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    // TODO(FW-2827): type
    __publicField(this, "template");
    __publicField(this, "isCmpOpen", false);
    __publicField(this, "el");
    this.z = z;
    this.el = r.nativeElement;
    this.el.addEventListener("ionMount", () => {
      this.isCmpOpen = true;
      c.detectChanges();
    });
    this.el.addEventListener("didDismiss", () => {
      this.isCmpOpen = false;
      c.detectChanges();
    });
    proxyOutputs(this, this.el, ["ionPopoverDidPresent", "ionPopoverWillPresent", "ionPopoverWillDismiss", "ionPopoverDidDismiss", "didPresent", "willPresent", "willDismiss", "didDismiss"]);
  }
}, /** @nocollapse */
__publicField(_a, "ɵfac", function IonPopover_Factory(t) {
  return new (t || _a)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a, "ɵdir", ɵɵdefineDirective({
  type: _a,
  selectors: [["ion-popover"]],
  contentQueries: function IonPopover_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, TemplateRef, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.template = _t.first);
    }
  },
  inputs: {
    alignment: "alignment",
    animated: "animated",
    arrow: "arrow",
    keepContentsMounted: "keepContentsMounted",
    backdropDismiss: "backdropDismiss",
    cssClass: "cssClass",
    dismissOnSelect: "dismissOnSelect",
    enterAnimation: "enterAnimation",
    event: "event",
    focusTrap: "focusTrap",
    isOpen: "isOpen",
    keyboardClose: "keyboardClose",
    leaveAnimation: "leaveAnimation",
    mode: "mode",
    showBackdrop: "showBackdrop",
    translucent: "translucent",
    trigger: "trigger",
    triggerAction: "triggerAction",
    reference: "reference",
    size: "size",
    side: "side"
  }
})), _a);
IonPopover = __decorate([
  ProxyCmp({
    inputs: POPOVER_INPUTS,
    methods: POPOVER_METHODS
  })
  /**
   * @Component extends from @Directive
   * so by defining the inputs here we
   * do not need to re-define them for the
   * lazy loaded popover.
   */
], IonPopover);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonPopover, [{
    type: Directive,
    args: [{
      selector: "ion-popover",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: POPOVER_INPUTS
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, {
    template: [{
      type: ContentChild,
      args: [TemplateRef, {
        static: false
      }]
    }]
  });
})();
var MODAL_INPUTS = ["animated", "keepContentsMounted", "backdropBreakpoint", "backdropDismiss", "breakpoints", "canDismiss", "cssClass", "enterAnimation", "event", "focusTrap", "handle", "handleBehavior", "initialBreakpoint", "isOpen", "keyboardClose", "leaveAnimation", "mode", "presentingElement", "showBackdrop", "translucent", "trigger"];
var MODAL_METHODS = ["present", "dismiss", "onDidDismiss", "onWillDismiss", "setCurrentBreakpoint", "getCurrentBreakpoint"];
var _a2;
var IonModal = (_a2 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    // TODO(FW-2827): type
    __publicField(this, "template");
    __publicField(this, "isCmpOpen", false);
    __publicField(this, "el");
    this.z = z;
    this.el = r.nativeElement;
    this.el.addEventListener("ionMount", () => {
      this.isCmpOpen = true;
      c.detectChanges();
    });
    this.el.addEventListener("didDismiss", () => {
      this.isCmpOpen = false;
      c.detectChanges();
    });
    proxyOutputs(this, this.el, ["ionModalDidPresent", "ionModalWillPresent", "ionModalWillDismiss", "ionModalDidDismiss", "ionBreakpointDidChange", "didPresent", "willPresent", "willDismiss", "didDismiss"]);
  }
}, /** @nocollapse */
__publicField(_a2, "ɵfac", function IonModal_Factory(t) {
  return new (t || _a2)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a2, "ɵdir", ɵɵdefineDirective({
  type: _a2,
  selectors: [["ion-modal"]],
  contentQueries: function IonModal_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, TemplateRef, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.template = _t.first);
    }
  },
  inputs: {
    animated: "animated",
    keepContentsMounted: "keepContentsMounted",
    backdropBreakpoint: "backdropBreakpoint",
    backdropDismiss: "backdropDismiss",
    breakpoints: "breakpoints",
    canDismiss: "canDismiss",
    cssClass: "cssClass",
    enterAnimation: "enterAnimation",
    event: "event",
    focusTrap: "focusTrap",
    handle: "handle",
    handleBehavior: "handleBehavior",
    initialBreakpoint: "initialBreakpoint",
    isOpen: "isOpen",
    keyboardClose: "keyboardClose",
    leaveAnimation: "leaveAnimation",
    mode: "mode",
    presentingElement: "presentingElement",
    showBackdrop: "showBackdrop",
    translucent: "translucent",
    trigger: "trigger"
  }
})), _a2);
IonModal = __decorate([
  ProxyCmp({
    inputs: MODAL_INPUTS,
    methods: MODAL_METHODS
  })
  /**
   * @Component extends from @Directive
   * so by defining the inputs here we
   * do not need to re-define them for the
   * lazy loaded popover.
   */
], IonModal);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonModal, [{
    type: Directive,
    args: [{
      selector: "ion-modal",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: MODAL_INPUTS
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, {
    template: [{
      type: ContentChild,
      args: [TemplateRef, {
        static: false
      }]
    }]
  });
})();
var insertView = (views, view, direction) => {
  if (direction === "root") {
    return setRoot(views, view);
  } else if (direction === "forward") {
    return setForward(views, view);
  } else {
    return setBack(views, view);
  }
};
var setRoot = (views, view) => {
  views = views.filter((v) => v.stackId !== view.stackId);
  views.push(view);
  return views;
};
var setForward = (views, view) => {
  const index = views.indexOf(view);
  if (index >= 0) {
    views = views.filter((v) => v.stackId !== view.stackId || v.id <= view.id);
  } else {
    views.push(view);
  }
  return views;
};
var setBack = (views, view) => {
  const index = views.indexOf(view);
  if (index >= 0) {
    return views.filter((v) => v.stackId !== view.stackId || v.id <= view.id);
  } else {
    return setRoot(views, view);
  }
};
var getUrl = (router, activatedRoute) => {
  const urlTree = router.createUrlTree(["."], {
    relativeTo: activatedRoute
  });
  return router.serializeUrl(urlTree);
};
var isTabSwitch = (enteringView, leavingView) => {
  if (!leavingView) {
    return true;
  }
  return enteringView.stackId !== leavingView.stackId;
};
var computeStackId = (prefixUrl, url) => {
  if (!prefixUrl) {
    return void 0;
  }
  const segments = toSegments(url);
  for (let i = 0; i < segments.length; i++) {
    if (i >= prefixUrl.length) {
      return segments[i];
    }
    if (segments[i] !== prefixUrl[i]) {
      return void 0;
    }
  }
  return void 0;
};
var toSegments = (path) => {
  return path.split("/").map((s) => s.trim()).filter((s) => s !== "");
};
var destroyView = (view) => {
  if (view) {
    view.ref.destroy();
    view.unlistenEvents();
  }
};
var StackController = class {
  constructor(tabsPrefix, containerEl, router, navCtrl, zone, location) {
    __publicField(this, "containerEl");
    __publicField(this, "router");
    __publicField(this, "navCtrl");
    __publicField(this, "zone");
    __publicField(this, "location");
    __publicField(this, "views", []);
    __publicField(this, "runningTask");
    __publicField(this, "skipTransition", false);
    __publicField(this, "tabsPrefix");
    __publicField(this, "activeView");
    __publicField(this, "nextId", 0);
    this.containerEl = containerEl;
    this.router = router;
    this.navCtrl = navCtrl;
    this.zone = zone;
    this.location = location;
    this.tabsPrefix = tabsPrefix !== void 0 ? toSegments(tabsPrefix) : void 0;
  }
  createView(ref, activatedRoute) {
    const url = getUrl(this.router, activatedRoute);
    const element = ref?.location?.nativeElement;
    const unlistenEvents = bindLifecycleEvents(this.zone, ref.instance, element);
    return {
      id: this.nextId++,
      stackId: computeStackId(this.tabsPrefix, url),
      unlistenEvents,
      element,
      ref,
      url
    };
  }
  getExistingView(activatedRoute) {
    const activatedUrlKey = getUrl(this.router, activatedRoute);
    const view = this.views.find((vw) => vw.url === activatedUrlKey);
    if (view) {
      view.ref.changeDetectorRef.reattach();
    }
    return view;
  }
  setActive(enteringView) {
    const consumeResult = this.navCtrl.consumeTransition();
    let {
      direction,
      animation,
      animationBuilder
    } = consumeResult;
    const leavingView = this.activeView;
    const tabSwitch = isTabSwitch(enteringView, leavingView);
    if (tabSwitch) {
      direction = "back";
      animation = void 0;
    }
    const viewsSnapshot = this.views.slice();
    let currentNavigation;
    const router = this.router;
    if (router.getCurrentNavigation) {
      currentNavigation = router.getCurrentNavigation();
    } else if (router.navigations?.value) {
      currentNavigation = router.navigations.value;
    }
    if (currentNavigation?.extras?.replaceUrl) {
      if (this.views.length > 0) {
        this.views.splice(-1, 1);
      }
    }
    const reused = this.views.includes(enteringView);
    const views = this.insertView(enteringView, direction);
    if (!reused) {
      enteringView.ref.changeDetectorRef.detectChanges();
    }
    const customAnimation = enteringView.animationBuilder;
    if (animationBuilder === void 0 && direction === "back" && !tabSwitch && customAnimation !== void 0) {
      animationBuilder = customAnimation;
    }
    if (leavingView) {
      leavingView.animationBuilder = animationBuilder;
    }
    return this.zone.runOutsideAngular(() => {
      return this.wait(() => {
        if (leavingView) {
          leavingView.ref.changeDetectorRef.detach();
        }
        enteringView.ref.changeDetectorRef.reattach();
        return this.transition(enteringView, leavingView, animation, this.canGoBack(1), false, animationBuilder).then(() => cleanupAsync(enteringView, views, viewsSnapshot, this.location, this.zone)).then(() => ({
          enteringView,
          direction,
          animation,
          tabSwitch
        }));
      });
    });
  }
  canGoBack(deep, stackId = this.getActiveStackId()) {
    return this.getStack(stackId).length > deep;
  }
  pop(deep, stackId = this.getActiveStackId()) {
    return this.zone.run(() => {
      const views = this.getStack(stackId);
      if (views.length <= deep) {
        return Promise.resolve(false);
      }
      const view = views[views.length - deep - 1];
      let url = view.url;
      const viewSavedData = view.savedData;
      if (viewSavedData) {
        const primaryOutlet = viewSavedData.get("primary");
        if (primaryOutlet?.route?._routerState?.snapshot.url) {
          url = primaryOutlet.route._routerState.snapshot.url;
        }
      }
      const {
        animationBuilder
      } = this.navCtrl.consumeTransition();
      return this.navCtrl.navigateBack(url, __spreadProps(__spreadValues({}, view.savedExtras), {
        animation: animationBuilder
      })).then(() => true);
    });
  }
  startBackTransition() {
    const leavingView = this.activeView;
    if (leavingView) {
      const views = this.getStack(leavingView.stackId);
      const enteringView = views[views.length - 2];
      const customAnimation = enteringView.animationBuilder;
      return this.wait(() => {
        return this.transition(
          enteringView,
          // entering view
          leavingView,
          // leaving view
          "back",
          this.canGoBack(2),
          true,
          customAnimation
        );
      });
    }
    return Promise.resolve();
  }
  endBackTransition(shouldComplete) {
    if (shouldComplete) {
      this.skipTransition = true;
      this.pop(1);
    } else if (this.activeView) {
      cleanup(this.activeView, this.views, this.views, this.location, this.zone);
    }
  }
  getLastUrl(stackId) {
    const views = this.getStack(stackId);
    return views.length > 0 ? views[views.length - 1] : void 0;
  }
  /**
   * @internal
   */
  getRootUrl(stackId) {
    const views = this.getStack(stackId);
    return views.length > 0 ? views[0] : void 0;
  }
  getActiveStackId() {
    return this.activeView ? this.activeView.stackId : void 0;
  }
  /**
   * @internal
   */
  getActiveView() {
    return this.activeView;
  }
  hasRunningTask() {
    return this.runningTask !== void 0;
  }
  destroy() {
    this.containerEl = void 0;
    this.views.forEach(destroyView);
    this.activeView = void 0;
    this.views = [];
  }
  getStack(stackId) {
    return this.views.filter((v) => v.stackId === stackId);
  }
  insertView(enteringView, direction) {
    this.activeView = enteringView;
    this.views = insertView(this.views, enteringView, direction);
    return this.views.slice();
  }
  transition(enteringView, leavingView, direction, showGoBack, progressAnimation, animationBuilder) {
    if (this.skipTransition) {
      this.skipTransition = false;
      return Promise.resolve(false);
    }
    if (leavingView === enteringView) {
      return Promise.resolve(false);
    }
    const enteringEl = enteringView ? enteringView.element : void 0;
    const leavingEl = leavingView ? leavingView.element : void 0;
    const containerEl = this.containerEl;
    if (enteringEl && enteringEl !== leavingEl) {
      enteringEl.classList.add("ion-page");
      enteringEl.classList.add("ion-page-invisible");
      if (containerEl.commit) {
        return containerEl.commit(enteringEl, leavingEl, {
          duration: direction === void 0 ? 0 : void 0,
          direction,
          showGoBack,
          progressAnimation,
          animationBuilder
        });
      }
    }
    return Promise.resolve(false);
  }
  wait(task) {
    return __async(this, null, function* () {
      if (this.runningTask !== void 0) {
        yield this.runningTask;
        this.runningTask = void 0;
      }
      const promise = this.runningTask = task();
      promise.finally(() => this.runningTask = void 0);
      return promise;
    });
  }
};
var cleanupAsync = (activeRoute, views, viewsSnapshot, location, zone) => {
  if (typeof requestAnimationFrame === "function") {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        cleanup(activeRoute, views, viewsSnapshot, location, zone);
        resolve();
      });
    });
  }
  return Promise.resolve();
};
var cleanup = (activeRoute, views, viewsSnapshot, location, zone) => {
  zone.run(() => viewsSnapshot.filter((view) => !views.includes(view)).forEach(destroyView));
  views.forEach((view) => {
    const locationWithoutParams = location.path().split("?")[0];
    const locationWithoutFragment = locationWithoutParams.split("#")[0];
    if (view !== activeRoute && view.url !== locationWithoutFragment) {
      const element = view.element;
      element.setAttribute("aria-hidden", "true");
      element.classList.add("ion-page-hidden");
      view.ref.changeDetectorRef.detach();
    }
  });
};
var _IonRouterOutlet = class _IonRouterOutlet {
  constructor(name, tabs, commonLocation, elementRef, router, zone, activatedRoute, parentOutlet) {
    __publicField(this, "parentOutlet");
    __publicField(this, "nativeEl");
    __publicField(this, "activatedView", null);
    __publicField(this, "tabsPrefix");
    __publicField(this, "_swipeGesture");
    __publicField(this, "stackCtrl");
    // Maintain map of activated route proxies for each component instance
    __publicField(this, "proxyMap", /* @__PURE__ */ new WeakMap());
    // Keep the latest activated route in a subject for the proxy routes to switch map to
    __publicField(this, "currentActivatedRoute$", new BehaviorSubject(null));
    __publicField(this, "activated", null);
    __publicField(this, "_activatedRoute", null);
    /**
     * The name of the outlet
     */
    __publicField(this, "name", PRIMARY_OUTLET);
    /** @internal */
    __publicField(this, "stackWillChange", new EventEmitter());
    /** @internal */
    __publicField(this, "stackDidChange", new EventEmitter());
    // eslint-disable-next-line @angular-eslint/no-output-rename
    __publicField(this, "activateEvents", new EventEmitter());
    // eslint-disable-next-line @angular-eslint/no-output-rename
    __publicField(this, "deactivateEvents", new EventEmitter());
    __publicField(this, "parentContexts", inject(ChildrenOutletContexts));
    __publicField(this, "location", inject(ViewContainerRef));
    __publicField(this, "environmentInjector", inject(EnvironmentInjector));
    __publicField(this, "inputBinder", inject(INPUT_BINDER, {
      optional: true
    }));
    /** @nodoc */
    __publicField(this, "supportsBindingToComponentInputs", true);
    // Ionic providers
    __publicField(this, "config", inject(Config));
    __publicField(this, "navCtrl", inject(NavController));
    this.parentOutlet = parentOutlet;
    this.nativeEl = elementRef.nativeElement;
    this.name = name || PRIMARY_OUTLET;
    this.tabsPrefix = tabs === "true" ? getUrl(router, activatedRoute) : void 0;
    this.stackCtrl = new StackController(this.tabsPrefix, this.nativeEl, router, this.navCtrl, zone, commonLocation);
    this.parentContexts.onChildOutletCreated(this.name, this);
  }
  /** @internal */
  get activatedComponentRef() {
    return this.activated;
  }
  set animation(animation) {
    this.nativeEl.animation = animation;
  }
  set animated(animated) {
    this.nativeEl.animated = animated;
  }
  set swipeGesture(swipe) {
    this._swipeGesture = swipe;
    this.nativeEl.swipeHandler = swipe ? {
      canStart: () => this.stackCtrl.canGoBack(1) && !this.stackCtrl.hasRunningTask(),
      onStart: () => this.stackCtrl.startBackTransition(),
      onEnd: (shouldContinue) => this.stackCtrl.endBackTransition(shouldContinue)
    } : void 0;
  }
  ngOnDestroy() {
    this.stackCtrl.destroy();
    this.inputBinder?.unsubscribeFromRouteData(this);
  }
  getContext() {
    return this.parentContexts.getContext(this.name);
  }
  ngOnInit() {
    this.initializeOutletWithName();
  }
  // Note: Ionic deviates from the Angular Router implementation here
  initializeOutletWithName() {
    if (!this.activated) {
      const context = this.getContext();
      if (context?.route) {
        this.activateWith(context.route, context.injector);
      }
    }
    new Promise((resolve) => componentOnReady(this.nativeEl, resolve)).then(() => {
      if (this._swipeGesture === void 0) {
        this.swipeGesture = this.config.getBoolean("swipeBackEnabled", this.nativeEl.mode === "ios");
      }
    });
  }
  get isActivated() {
    return !!this.activated;
  }
  get component() {
    if (!this.activated) {
      throw new Error("Outlet is not activated");
    }
    return this.activated.instance;
  }
  get activatedRoute() {
    if (!this.activated) {
      throw new Error("Outlet is not activated");
    }
    return this._activatedRoute;
  }
  get activatedRouteData() {
    if (this._activatedRoute) {
      return this._activatedRoute.snapshot.data;
    }
    return {};
  }
  /**
   * Called when the `RouteReuseStrategy` instructs to detach the subtree
   */
  detach() {
    throw new Error("incompatible reuse strategy");
  }
  /**
   * Called when the `RouteReuseStrategy` instructs to re-attach a previously detached subtree
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  attach(_ref, _activatedRoute) {
    throw new Error("incompatible reuse strategy");
  }
  deactivate() {
    if (this.activated) {
      if (this.activatedView) {
        const context = this.getContext();
        this.activatedView.savedData = new Map(context.children["contexts"]);
        const primaryOutlet = this.activatedView.savedData.get("primary");
        if (primaryOutlet && context.route) {
          primaryOutlet.route = __spreadValues({}, context.route);
        }
        this.activatedView.savedExtras = {};
        if (context.route) {
          const contextSnapshot = context.route.snapshot;
          this.activatedView.savedExtras.queryParams = contextSnapshot.queryParams;
          this.activatedView.savedExtras.fragment = contextSnapshot.fragment;
        }
      }
      const c = this.component;
      this.activatedView = null;
      this.activated = null;
      this._activatedRoute = null;
      this.deactivateEvents.emit(c);
    }
  }
  activateWith(activatedRoute, environmentInjector) {
    if (this.isActivated) {
      throw new Error("Cannot activate an already activated outlet");
    }
    this._activatedRoute = activatedRoute;
    let cmpRef;
    let enteringView = this.stackCtrl.getExistingView(activatedRoute);
    if (enteringView) {
      cmpRef = this.activated = enteringView.ref;
      const saved = enteringView.savedData;
      if (saved) {
        const context = this.getContext();
        context.children["contexts"] = saved;
      }
      this.updateActivatedRouteProxy(cmpRef.instance, activatedRoute);
    } else {
      const snapshot = activatedRoute._futureSnapshot;
      const childContexts = this.parentContexts.getOrCreateContext(this.name).children;
      const component$ = new BehaviorSubject(null);
      const activatedRouteProxy = this.createActivatedRouteProxy(component$, activatedRoute);
      const injector = new OutletInjector(activatedRouteProxy, childContexts, this.location.injector);
      const component = snapshot.routeConfig.component ?? snapshot.component;
      cmpRef = this.activated = this.outletContent.createComponent(component, {
        index: this.outletContent.length,
        injector,
        environmentInjector: environmentInjector ?? this.environmentInjector
      });
      component$.next(cmpRef.instance);
      enteringView = this.stackCtrl.createView(this.activated, activatedRoute);
      this.proxyMap.set(cmpRef.instance, activatedRouteProxy);
      this.currentActivatedRoute$.next({
        component: cmpRef.instance,
        activatedRoute
      });
    }
    this.inputBinder?.bindActivatedRouteToOutletComponent(this);
    this.activatedView = enteringView;
    this.navCtrl.setTopOutlet(this);
    const leavingView = this.stackCtrl.getActiveView();
    this.stackWillChange.emit({
      enteringView,
      tabSwitch: isTabSwitch(enteringView, leavingView)
    });
    this.stackCtrl.setActive(enteringView).then((data) => {
      this.activateEvents.emit(cmpRef.instance);
      this.stackDidChange.emit(data);
    });
  }
  /**
   * Returns `true` if there are pages in the stack to go back.
   */
  canGoBack(deep = 1, stackId) {
    return this.stackCtrl.canGoBack(deep, stackId);
  }
  /**
   * Resolves to `true` if it the outlet was able to sucessfully pop the last N pages.
   */
  pop(deep = 1, stackId) {
    return this.stackCtrl.pop(deep, stackId);
  }
  /**
   * Returns the URL of the active page of each stack.
   */
  getLastUrl(stackId) {
    const active = this.stackCtrl.getLastUrl(stackId);
    return active ? active.url : void 0;
  }
  /**
   * Returns the RouteView of the active page of each stack.
   * @internal
   */
  getLastRouteView(stackId) {
    return this.stackCtrl.getLastUrl(stackId);
  }
  /**
   * Returns the root view in the tab stack.
   * @internal
   */
  getRootView(stackId) {
    return this.stackCtrl.getRootUrl(stackId);
  }
  /**
   * Returns the active stack ID. In the context of ion-tabs, it means the active tab.
   */
  getActiveStackId() {
    return this.stackCtrl.getActiveStackId();
  }
  /**
   * Since the activated route can change over the life time of a component in an ion router outlet, we create
   * a proxy so that we can update the values over time as a user navigates back to components already in the stack.
   */
  createActivatedRouteProxy(component$, activatedRoute) {
    const proxy = new ActivatedRoute();
    proxy._futureSnapshot = activatedRoute._futureSnapshot;
    proxy._routerState = activatedRoute._routerState;
    proxy.snapshot = activatedRoute.snapshot;
    proxy.outlet = activatedRoute.outlet;
    proxy.component = activatedRoute.component;
    proxy._paramMap = this.proxyObservable(component$, "paramMap");
    proxy._queryParamMap = this.proxyObservable(component$, "queryParamMap");
    proxy.url = this.proxyObservable(component$, "url");
    proxy.params = this.proxyObservable(component$, "params");
    proxy.queryParams = this.proxyObservable(component$, "queryParams");
    proxy.fragment = this.proxyObservable(component$, "fragment");
    proxy.data = this.proxyObservable(component$, "data");
    return proxy;
  }
  /**
   * Create a wrapped observable that will switch to the latest activated route matched by the given component
   */
  proxyObservable(component$, path) {
    return component$.pipe(
      // First wait until the component instance is pushed
      filter((component) => !!component),
      switchMap((component) => this.currentActivatedRoute$.pipe(filter((current) => current !== null && current.component === component), switchMap((current) => current && current.activatedRoute[path]), distinctUntilChanged()))
    );
  }
  /**
   * Updates the activated route proxy for the given component to the new incoming router state
   */
  updateActivatedRouteProxy(component, activatedRoute) {
    const proxy = this.proxyMap.get(component);
    if (!proxy) {
      throw new Error(`Could not find activated route proxy for view`);
    }
    proxy._futureSnapshot = activatedRoute._futureSnapshot;
    proxy._routerState = activatedRoute._routerState;
    proxy.snapshot = activatedRoute.snapshot;
    proxy.outlet = activatedRoute.outlet;
    proxy.component = activatedRoute.component;
    this.currentActivatedRoute$.next({
      component,
      activatedRoute
    });
  }
};
/** @nocollapse */
__publicField(_IonRouterOutlet, "ɵfac", function IonRouterOutlet_Factory(t) {
  return new (t || _IonRouterOutlet)(ɵɵinjectAttribute("name"), ɵɵinjectAttribute("tabs"), ɵɵdirectiveInject(Location), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Router), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ActivatedRoute), ɵɵdirectiveInject(_IonRouterOutlet, 12));
});
/** @nocollapse */
__publicField(_IonRouterOutlet, "ɵdir", ɵɵdefineDirective({
  type: _IonRouterOutlet,
  selectors: [["ion-router-outlet"]],
  inputs: {
    animated: "animated",
    animation: "animation",
    mode: "mode",
    swipeGesture: "swipeGesture",
    name: "name"
  },
  outputs: {
    stackWillChange: "stackWillChange",
    stackDidChange: "stackDidChange",
    activateEvents: "activate",
    deactivateEvents: "deactivate"
  },
  exportAs: ["outlet"]
}));
var IonRouterOutlet = _IonRouterOutlet;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonRouterOutlet, [{
    type: Directive,
    args: [{
      selector: "ion-router-outlet",
      exportAs: "outlet",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["animated", "animation", "mode", "swipeGesture"]
    }]
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Attribute,
        args: ["name"]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Optional
      }, {
        type: Attribute,
        args: ["tabs"]
      }]
    }, {
      type: Location
    }, {
      type: ElementRef
    }, {
      type: Router
    }, {
      type: NgZone
    }, {
      type: ActivatedRoute
    }, {
      type: IonRouterOutlet,
      decorators: [{
        type: SkipSelf
      }, {
        type: Optional
      }]
    }];
  }, {
    name: [{
      type: Input
    }],
    stackWillChange: [{
      type: Output
    }],
    stackDidChange: [{
      type: Output
    }],
    activateEvents: [{
      type: Output,
      args: ["activate"]
    }],
    deactivateEvents: [{
      type: Output,
      args: ["deactivate"]
    }]
  });
})();
var OutletInjector = class {
  constructor(route, childContexts, parent) {
    __publicField(this, "route");
    __publicField(this, "childContexts");
    __publicField(this, "parent");
    this.route = route;
    this.childContexts = childContexts;
    this.parent = parent;
  }
  get(token, notFoundValue) {
    if (token === ActivatedRoute) {
      return this.route;
    }
    if (token === ChildrenOutletContexts) {
      return this.childContexts;
    }
    return this.parent.get(token, notFoundValue);
  }
};
var INPUT_BINDER = new InjectionToken("");
var _RoutedComponentInputBinder = class _RoutedComponentInputBinder {
  constructor() {
    __publicField(this, "outletDataSubscriptions", /* @__PURE__ */ new Map());
  }
  bindActivatedRouteToOutletComponent(outlet) {
    this.unsubscribeFromRouteData(outlet);
    this.subscribeToRouteData(outlet);
  }
  unsubscribeFromRouteData(outlet) {
    this.outletDataSubscriptions.get(outlet)?.unsubscribe();
    this.outletDataSubscriptions.delete(outlet);
  }
  subscribeToRouteData(outlet) {
    const {
      activatedRoute
    } = outlet;
    const dataSubscription = combineLatest([activatedRoute.queryParams, activatedRoute.params, activatedRoute.data]).pipe(switchMap(([queryParams, params, data], index) => {
      data = __spreadValues(__spreadValues(__spreadValues({}, queryParams), params), data);
      if (index === 0) {
        return of(data);
      }
      return Promise.resolve(data);
    })).subscribe((data) => {
      if (!outlet.isActivated || !outlet.activatedComponentRef || outlet.activatedRoute !== activatedRoute || activatedRoute.component === null) {
        this.unsubscribeFromRouteData(outlet);
        return;
      }
      const mirror = reflectComponentType(activatedRoute.component);
      if (!mirror) {
        this.unsubscribeFromRouteData(outlet);
        return;
      }
      for (const {
        templateName
      } of mirror.inputs) {
        outlet.activatedComponentRef.setInput(templateName, data[templateName]);
      }
    });
    this.outletDataSubscriptions.set(outlet, dataSubscription);
  }
};
/** @nocollapse */
__publicField(_RoutedComponentInputBinder, "ɵfac", function RoutedComponentInputBinder_Factory(t) {
  return new (t || _RoutedComponentInputBinder)();
});
/** @nocollapse */
__publicField(_RoutedComponentInputBinder, "ɵprov", ɵɵdefineInjectable({
  token: _RoutedComponentInputBinder,
  factory: _RoutedComponentInputBinder.ɵfac
}));
var RoutedComponentInputBinder = _RoutedComponentInputBinder;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RoutedComponentInputBinder, [{
    type: Injectable
  }], null, null);
})();
var provideComponentInputBinding = () => {
  return {
    provide: INPUT_BINDER,
    useFactory: componentInputBindingFactory,
    deps: [Router]
  };
};
function componentInputBindingFactory(router) {
  if (router?.componentInputBindingEnabled) {
    return new RoutedComponentInputBinder();
  }
  return null;
}
var BACK_BUTTON_INPUTS = ["color", "defaultHref", "disabled", "icon", "mode", "routerAnimation", "text", "type"];
var _a3;
var IonBackButton = (_a3 = class {
  constructor(routerOutlet, navCtrl, config3, r, z, c) {
    __publicField(this, "routerOutlet");
    __publicField(this, "navCtrl");
    __publicField(this, "config");
    __publicField(this, "r");
    __publicField(this, "z");
    __publicField(this, "el");
    this.routerOutlet = routerOutlet;
    this.navCtrl = navCtrl;
    this.config = config3;
    this.r = r;
    this.z = z;
    c.detach();
    this.el = this.r.nativeElement;
  }
  /**
   * @internal
   */
  onClick(ev) {
    const defaultHref = this.defaultHref || this.config.get("backButtonDefaultHref");
    if (this.routerOutlet?.canGoBack()) {
      this.navCtrl.setDirection("back", void 0, void 0, this.routerAnimation);
      this.routerOutlet.pop();
      ev.preventDefault();
    } else if (defaultHref != null) {
      this.navCtrl.navigateBack(defaultHref, {
        animation: this.routerAnimation
      });
      ev.preventDefault();
    }
  }
}, /** @nocollapse */
__publicField(_a3, "ɵfac", function IonBackButton_Factory(t) {
  return new (t || _a3)(ɵɵdirectiveInject(IonRouterOutlet, 8), ɵɵdirectiveInject(NavController), ɵɵdirectiveInject(Config), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ChangeDetectorRef));
}), /** @nocollapse */
__publicField(_a3, "ɵdir", ɵɵdefineDirective({
  type: _a3,
  hostBindings: function IonBackButton_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function IonBackButton_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      });
    }
  },
  inputs: {
    color: "color",
    defaultHref: "defaultHref",
    disabled: "disabled",
    icon: "icon",
    mode: "mode",
    routerAnimation: "routerAnimation",
    text: "text",
    type: "type"
  }
})), _a3);
IonBackButton = __decorate([ProxyCmp({
  inputs: BACK_BUTTON_INPUTS
})], IonBackButton);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonBackButton, [{
    type: Directive,
    args: [{
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: BACK_BUTTON_INPUTS
    }]
  }], function() {
    return [{
      type: IonRouterOutlet,
      decorators: [{
        type: Optional
      }]
    }, {
      type: NavController
    }, {
      type: Config
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }, {
      type: ChangeDetectorRef
    }];
  }, {
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }]
  });
})();
var _RouterLinkDelegateDirective = class _RouterLinkDelegateDirective {
  constructor(locationStrategy, navCtrl, elementRef, router, routerLink) {
    __publicField(this, "locationStrategy");
    __publicField(this, "navCtrl");
    __publicField(this, "elementRef");
    __publicField(this, "router");
    __publicField(this, "routerLink");
    __publicField(this, "routerDirection", "forward");
    __publicField(this, "routerAnimation");
    this.locationStrategy = locationStrategy;
    this.navCtrl = navCtrl;
    this.elementRef = elementRef;
    this.router = router;
    this.routerLink = routerLink;
  }
  ngOnInit() {
    this.updateTargetUrlAndHref();
    this.updateTabindex();
  }
  ngOnChanges() {
    this.updateTargetUrlAndHref();
  }
  /**
   * The `tabindex` is set to `0` by default on the host element when
   * the `routerLink` directive is used. This causes issues with Ionic
   * components that wrap an `a` or `button` element, such as `ion-item`.
   * See issue https://github.com/angular/angular/issues/28345
   *
   * This method removes the `tabindex` attribute from the host element
   * to allow the Ionic component to manage the focus state correctly.
   */
  updateTabindex() {
    const ionicComponents = ["ION-BACK-BUTTON", "ION-BREADCRUMB", "ION-BUTTON", "ION-CARD", "ION-FAB-BUTTON", "ION-ITEM", "ION-ITEM-OPTION", "ION-MENU-BUTTON", "ION-SEGMENT-BUTTON", "ION-TAB-BUTTON"];
    const hostElement = this.elementRef.nativeElement;
    if (ionicComponents.includes(hostElement.tagName)) {
      if (hostElement.getAttribute("tabindex") === "0") {
        hostElement.removeAttribute("tabindex");
      }
    }
  }
  updateTargetUrlAndHref() {
    if (this.routerLink?.urlTree) {
      const href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.routerLink.urlTree));
      this.elementRef.nativeElement.href = href;
    }
  }
  /**
   * @internal
   */
  onClick(ev) {
    this.navCtrl.setDirection(this.routerDirection, void 0, void 0, this.routerAnimation);
    ev.preventDefault();
  }
};
/** @nocollapse */
__publicField(_RouterLinkDelegateDirective, "ɵfac", function RouterLinkDelegateDirective_Factory(t) {
  return new (t || _RouterLinkDelegateDirective)(ɵɵdirectiveInject(LocationStrategy), ɵɵdirectiveInject(NavController), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Router), ɵɵdirectiveInject(RouterLink, 8));
});
/** @nocollapse */
__publicField(_RouterLinkDelegateDirective, "ɵdir", ɵɵdefineDirective({
  type: _RouterLinkDelegateDirective,
  selectors: [["", "routerLink", "", 5, "a", 5, "area"]],
  hostBindings: function RouterLinkDelegateDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function RouterLinkDelegateDirective_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      });
    }
  },
  inputs: {
    routerDirection: "routerDirection",
    routerAnimation: "routerAnimation"
  },
  features: [ɵɵNgOnChangesFeature]
}));
var RouterLinkDelegateDirective = _RouterLinkDelegateDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RouterLinkDelegateDirective, [{
    type: Directive,
    args: [{
      selector: ":not(a):not(area)[routerLink]"
    }]
  }], function() {
    return [{
      type: LocationStrategy
    }, {
      type: NavController
    }, {
      type: ElementRef
    }, {
      type: Router
    }, {
      type: RouterLink,
      decorators: [{
        type: Optional
      }]
    }];
  }, {
    routerDirection: [{
      type: Input
    }],
    routerAnimation: [{
      type: Input
    }],
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }]
  });
})();
var _RouterLinkWithHrefDelegateDirective = class _RouterLinkWithHrefDelegateDirective {
  constructor(locationStrategy, navCtrl, elementRef, router, routerLink) {
    __publicField(this, "locationStrategy");
    __publicField(this, "navCtrl");
    __publicField(this, "elementRef");
    __publicField(this, "router");
    __publicField(this, "routerLink");
    __publicField(this, "routerDirection", "forward");
    __publicField(this, "routerAnimation");
    this.locationStrategy = locationStrategy;
    this.navCtrl = navCtrl;
    this.elementRef = elementRef;
    this.router = router;
    this.routerLink = routerLink;
  }
  ngOnInit() {
    this.updateTargetUrlAndHref();
  }
  ngOnChanges() {
    this.updateTargetUrlAndHref();
  }
  updateTargetUrlAndHref() {
    if (this.routerLink?.urlTree) {
      const href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.routerLink.urlTree));
      this.elementRef.nativeElement.href = href;
    }
  }
  /**
   * @internal
   */
  onClick() {
    this.navCtrl.setDirection(this.routerDirection, void 0, void 0, this.routerAnimation);
  }
};
/** @nocollapse */
__publicField(_RouterLinkWithHrefDelegateDirective, "ɵfac", function RouterLinkWithHrefDelegateDirective_Factory(t) {
  return new (t || _RouterLinkWithHrefDelegateDirective)(ɵɵdirectiveInject(LocationStrategy), ɵɵdirectiveInject(NavController), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Router), ɵɵdirectiveInject(RouterLink, 8));
});
/** @nocollapse */
__publicField(_RouterLinkWithHrefDelegateDirective, "ɵdir", ɵɵdefineDirective({
  type: _RouterLinkWithHrefDelegateDirective,
  selectors: [["a", "routerLink", ""], ["area", "routerLink", ""]],
  hostBindings: function RouterLinkWithHrefDelegateDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function RouterLinkWithHrefDelegateDirective_click_HostBindingHandler() {
        return ctx.onClick();
      });
    }
  },
  inputs: {
    routerDirection: "routerDirection",
    routerAnimation: "routerAnimation"
  },
  features: [ɵɵNgOnChangesFeature]
}));
var RouterLinkWithHrefDelegateDirective = _RouterLinkWithHrefDelegateDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RouterLinkWithHrefDelegateDirective, [{
    type: Directive,
    args: [{
      selector: "a[routerLink],area[routerLink]"
    }]
  }], function() {
    return [{
      type: LocationStrategy
    }, {
      type: NavController
    }, {
      type: ElementRef
    }, {
      type: Router
    }, {
      type: RouterLink,
      decorators: [{
        type: Optional
      }]
    }];
  }, {
    routerDirection: [{
      type: Input
    }],
    routerAnimation: [{
      type: Input
    }],
    onClick: [{
      type: HostListener,
      args: ["click"]
    }]
  });
})();
var NAV_INPUTS = ["animated", "animation", "root", "rootParams", "swipeGesture"];
var NAV_METHODS = ["push", "insert", "insertPages", "pop", "popTo", "popToRoot", "removeIndex", "setRoot", "setPages", "getActive", "getByIndex", "canGoBack", "getPrevious"];
var _a4;
var IonNav = (_a4 = class {
  constructor(ref, environmentInjector, injector, angularDelegate, z, c) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = ref.nativeElement;
    ref.nativeElement.delegate = angularDelegate.create(environmentInjector, injector);
    proxyOutputs(this, this.el, ["ionNavDidChange", "ionNavWillChange"]);
  }
}, /** @nocollapse */
__publicField(_a4, "ɵfac", function IonNav_Factory(t) {
  return new (t || _a4)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(EnvironmentInjector), ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(AngularDelegate), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ChangeDetectorRef));
}), /** @nocollapse */
__publicField(_a4, "ɵdir", ɵɵdefineDirective({
  type: _a4,
  inputs: {
    animated: "animated",
    animation: "animation",
    root: "root",
    rootParams: "rootParams",
    swipeGesture: "swipeGesture"
  }
})), _a4);
IonNav = __decorate([ProxyCmp({
  inputs: NAV_INPUTS,
  methods: NAV_METHODS
})], IonNav);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonNav, [{
    type: Directive,
    args: [{
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: NAV_INPUTS
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: EnvironmentInjector
    }, {
      type: Injector
    }, {
      type: AngularDelegate
    }, {
      type: NgZone
    }, {
      type: ChangeDetectorRef
    }];
  }, null);
})();
var _IonTabs = class _IonTabs {
  constructor(navCtrl) {
    __publicField(this, "navCtrl");
    __publicField(this, "tabsInner");
    /**
     * Emitted before the tab view is changed.
     */
    __publicField(this, "ionTabsWillChange", new EventEmitter());
    /**
     * Emitted after the tab view is changed.
     */
    __publicField(this, "ionTabsDidChange", new EventEmitter());
    __publicField(this, "tabBarSlot", "bottom");
    __publicField(this, "hasTab", false);
    __publicField(this, "selectedTab");
    __publicField(this, "leavingTab");
    this.navCtrl = navCtrl;
  }
  ngAfterViewInit() {
    const firstTab = this.tabs.length > 0 ? this.tabs.first : void 0;
    if (firstTab) {
      this.hasTab = true;
      this.setActiveTab(firstTab.tab);
      this.tabSwitch();
    }
  }
  ngAfterContentInit() {
    this.detectSlotChanges();
  }
  ngAfterContentChecked() {
    this.detectSlotChanges();
  }
  /**
   * @internal
   */
  onStackWillChange({
    enteringView,
    tabSwitch
  }) {
    const stackId = enteringView.stackId;
    if (tabSwitch && stackId !== void 0) {
      this.ionTabsWillChange.emit({
        tab: stackId
      });
    }
  }
  /**
   * @internal
   */
  onStackDidChange({
    enteringView,
    tabSwitch
  }) {
    const stackId = enteringView.stackId;
    if (tabSwitch && stackId !== void 0) {
      if (this.tabBar) {
        this.tabBar.selectedTab = stackId;
      }
      this.ionTabsDidChange.emit({
        tab: stackId
      });
    }
  }
  /**
   * When a tab button is clicked, there are several scenarios:
   * 1. If the selected tab is currently active (the tab button has been clicked
   *    again), then it should go to the root view for that tab.
   *
   *   a. Get the saved root view from the router outlet. If the saved root view
   *      matches the tabRootUrl, set the route view to this view including the
   *      navigation extras.
   *   b. If the saved root view from the router outlet does
   *      not match, navigate to the tabRootUrl. No navigation extras are
   *      included.
   *
   * 2. If the current tab tab is not currently selected, get the last route
   *    view from the router outlet.
   *
   *   a. If the last route view exists, navigate to that view including any
   *      navigation extras
   *   b. If the last route view doesn't exist, then navigate
   *      to the default tabRootUrl
   */
  select(tabOrEvent) {
    const isTabString = typeof tabOrEvent === "string";
    const tab = isTabString ? tabOrEvent : tabOrEvent.detail.tab;
    if (this.hasTab) {
      this.setActiveTab(tab);
      this.tabSwitch();
      return;
    }
    const alreadySelected = this.outlet.getActiveStackId() === tab;
    const tabRootUrl = `${this.outlet.tabsPrefix}/${tab}`;
    if (!isTabString) {
      tabOrEvent.stopPropagation();
    }
    if (alreadySelected) {
      const activeStackId = this.outlet.getActiveStackId();
      const activeView = this.outlet.getLastRouteView(activeStackId);
      if (activeView?.url === tabRootUrl) {
        return;
      }
      const rootView = this.outlet.getRootView(tab);
      const navigationExtras = rootView && tabRootUrl === rootView.url && rootView.savedExtras;
      return this.navCtrl.navigateRoot(tabRootUrl, __spreadProps(__spreadValues({}, navigationExtras), {
        animated: true,
        animationDirection: "back"
      }));
    } else {
      const lastRoute = this.outlet.getLastRouteView(tab);
      const url = lastRoute?.url || tabRootUrl;
      const navigationExtras = lastRoute?.savedExtras;
      return this.navCtrl.navigateRoot(url, __spreadProps(__spreadValues({}, navigationExtras), {
        animated: true,
        animationDirection: "back"
      }));
    }
  }
  setActiveTab(tab) {
    const tabs = this.tabs;
    const selectedTab = tabs.find((t) => t.tab === tab);
    if (!selectedTab) {
      console.error(`[Ionic Error]: Tab with id: "${tab}" does not exist`);
      return;
    }
    this.leavingTab = this.selectedTab;
    this.selectedTab = selectedTab;
    this.ionTabsWillChange.emit({
      tab
    });
    selectedTab.el.active = true;
  }
  tabSwitch() {
    const {
      selectedTab,
      leavingTab
    } = this;
    if (this.tabBar && selectedTab) {
      this.tabBar.selectedTab = selectedTab.tab;
    }
    if (leavingTab?.tab !== selectedTab?.tab) {
      if (leavingTab?.el) {
        leavingTab.el.active = false;
      }
    }
    if (selectedTab) {
      this.ionTabsDidChange.emit({
        tab: selectedTab.tab
      });
    }
  }
  getSelected() {
    if (this.hasTab) {
      return this.selectedTab?.tab;
    }
    return this.outlet.getActiveStackId();
  }
  /**
   * Detects changes to the slot attribute of the tab bar.
   *
   * If the slot attribute has changed, then the tab bar
   * should be relocated to the new slot position.
   */
  detectSlotChanges() {
    this.tabBars.forEach((tabBar) => {
      const currentSlot = tabBar.el.getAttribute("slot");
      if (currentSlot !== this.tabBarSlot) {
        this.tabBarSlot = currentSlot;
        this.relocateTabBar();
      }
    });
  }
  /**
   * Relocates the tab bar to the new slot position.
   */
  relocateTabBar() {
    const tabBar = this.tabBar.el;
    if (this.tabBarSlot === "top") {
      this.tabsInner.nativeElement.before(tabBar);
    } else {
      this.tabsInner.nativeElement.after(tabBar);
    }
  }
};
/** @nocollapse */
__publicField(_IonTabs, "ɵfac", function IonTabs_Factory(t) {
  return new (t || _IonTabs)(ɵɵdirectiveInject(NavController));
});
/** @nocollapse */
__publicField(_IonTabs, "ɵdir", ɵɵdefineDirective({
  type: _IonTabs,
  selectors: [["ion-tabs"]],
  viewQuery: function IonTabs_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c0, 7, ElementRef);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.tabsInner = _t.first);
    }
  },
  hostBindings: function IonTabs_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("ionTabButtonClick", function IonTabs_ionTabButtonClick_HostBindingHandler($event) {
        return ctx.select($event);
      });
    }
  },
  outputs: {
    ionTabsWillChange: "ionTabsWillChange",
    ionTabsDidChange: "ionTabsDidChange"
  }
}));
var IonTabs = _IonTabs;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonTabs, [{
    type: Directive,
    args: [{
      selector: "ion-tabs"
    }]
  }], function() {
    return [{
      type: NavController
    }];
  }, {
    tabsInner: [{
      type: ViewChild,
      args: ["tabsInner", {
        read: ElementRef,
        static: true
      }]
    }],
    ionTabsWillChange: [{
      type: Output
    }],
    ionTabsDidChange: [{
      type: Output
    }],
    select: [{
      type: HostListener,
      args: ["ionTabButtonClick", ["$event"]]
    }]
  });
})();
var raf = (h) => {
  if (typeof __zone_symbol__requestAnimationFrame === "function") {
    return __zone_symbol__requestAnimationFrame(h);
  }
  if (typeof requestAnimationFrame === "function") {
    return requestAnimationFrame(h);
  }
  return setTimeout(h);
};
var _ValueAccessor = class _ValueAccessor {
  constructor(injector, elementRef) {
    __publicField(this, "injector");
    __publicField(this, "elementRef");
    __publicField(this, "onChange", () => {
    });
    __publicField(this, "onTouched", () => {
    });
    __publicField(this, "lastValue");
    __publicField(this, "statusChanges");
    this.injector = injector;
    this.elementRef = elementRef;
  }
  writeValue(value) {
    this.elementRef.nativeElement.value = this.lastValue = value;
    setIonicClasses(this.elementRef);
  }
  /**
   * Notifies the ControlValueAccessor of a change in the value of the control.
   *
   * This is called by each of the ValueAccessor directives when we want to update
   * the status and validity of the form control. For example with text components this
   * is called when the ionInput event is fired. For select components this is called
   * when the ionChange event is fired.
   *
   * This also updates the Ionic form status classes on the element.
   *
   * @param el The component element.
   * @param value The new value of the control.
   */
  handleValueChange(el, value) {
    if (el === this.elementRef.nativeElement) {
      if (value !== this.lastValue) {
        this.lastValue = value;
        this.onChange(value);
      }
      setIonicClasses(this.elementRef);
    }
  }
  _handleBlurEvent(el) {
    if (el === this.elementRef.nativeElement) {
      this.onTouched();
      setIonicClasses(this.elementRef);
    }
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.elementRef.nativeElement.disabled = isDisabled;
  }
  ngOnDestroy() {
    if (this.statusChanges) {
      this.statusChanges.unsubscribe();
    }
  }
  ngAfterViewInit() {
    let ngControl;
    try {
      ngControl = this.injector.get(NgControl);
    } catch {
    }
    if (!ngControl) {
      return;
    }
    if (ngControl.statusChanges) {
      this.statusChanges = ngControl.statusChanges.subscribe(() => setIonicClasses(this.elementRef));
    }
    const formControl = ngControl.control;
    if (formControl) {
      const methodsToPatch = ["markAsTouched", "markAllAsTouched", "markAsUntouched", "markAsDirty", "markAsPristine"];
      methodsToPatch.forEach((method) => {
        if (typeof formControl[method] !== "undefined") {
          const oldFn = formControl[method].bind(formControl);
          formControl[method] = (...params) => {
            oldFn(...params);
            setIonicClasses(this.elementRef);
          };
        }
      });
    }
  }
};
/** @nocollapse */
__publicField(_ValueAccessor, "ɵfac", function ValueAccessor_Factory(t) {
  return new (t || _ValueAccessor)(ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ElementRef));
});
/** @nocollapse */
__publicField(_ValueAccessor, "ɵdir", ɵɵdefineDirective({
  type: _ValueAccessor,
  hostBindings: function ValueAccessor_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("ionBlur", function ValueAccessor_ionBlur_HostBindingHandler($event) {
        return ctx._handleBlurEvent($event.target);
      });
    }
  }
}));
var ValueAccessor = _ValueAccessor;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ValueAccessor, [{
    type: Directive
  }], function() {
    return [{
      type: Injector
    }, {
      type: ElementRef
    }];
  }, {
    _handleBlurEvent: [{
      type: HostListener,
      args: ["ionBlur", ["$event.target"]]
    }]
  });
})();
var setIonicClasses = (element) => {
  raf(() => {
    const input = element.nativeElement;
    const hasValue = input.value != null && input.value.toString().length > 0;
    const classes = getClasses(input);
    setClasses(input, classes);
    const item = input.closest("ion-item");
    if (item) {
      if (hasValue) {
        setClasses(item, [...classes, "item-has-value"]);
      } else {
        setClasses(item, classes);
      }
    }
  });
};
var getClasses = (element) => {
  const classList = element.classList;
  const classes = [];
  for (let i = 0; i < classList.length; i++) {
    const item = classList.item(i);
    if (item !== null && startsWith(item, "ng-")) {
      classes.push(`ion-${item.substring(3)}`);
    }
  }
  return classes;
};
var setClasses = (element, classes) => {
  const classList = element.classList;
  classList.remove("ion-valid", "ion-invalid", "ion-touched", "ion-untouched", "ion-dirty", "ion-pristine");
  classList.add(...classes);
};
var startsWith = (input, search) => {
  return input.substring(0, search.length) === search;
};
var IonicRouteStrategy = class {
  /**
   * Whether the given route should detach for later reuse.
   */
  shouldDetach(_route) {
    return false;
  }
  /**
   * Returns `false`, meaning the route (and its subtree) is never reattached
   */
  shouldAttach(_route) {
    return false;
  }
  /**
   * A no-op; the route is never stored since this strategy never detaches routes for later re-use.
   */
  store(_route, _detachedTree) {
    return;
  }
  /**
   * Returns `null` because this strategy does not store routes for later re-use.
   */
  retrieve(_route) {
    return null;
  }
  /**
   * Determines if a route should be reused.
   * This strategy returns `true` when the future route config and
   * current route config are identical and all route parameters are identical.
   */
  shouldReuseRoute(future, curr) {
    if (future.routeConfig !== curr.routeConfig) {
      return false;
    }
    const futureParams = future.params;
    const currentParams = curr.params;
    const keysA = Object.keys(futureParams);
    const keysB = Object.keys(currentParams);
    if (keysA.length !== keysB.length) {
      return false;
    }
    for (const key of keysA) {
      if (currentParams[key] !== futureParams[key]) {
        return false;
      }
    }
    return true;
  }
};
var OverlayBaseController = class {
  constructor(ctrl) {
    __publicField(this, "ctrl");
    this.ctrl = ctrl;
  }
  /**
   * Creates a new overlay
   */
  create(opts) {
    return this.ctrl.create(opts || {});
  }
  /**
   * When `id` is not provided, it dismisses the top overlay.
   */
  dismiss(data, role, id) {
    return this.ctrl.dismiss(data, role, id);
  }
  /**
   * Returns the top overlay.
   */
  getTop() {
    return this.ctrl.getTop();
  }
};

// node_modules/@ionic/core/dist/esm-es5/cubic-bezier-fe2083dc.js
var getTimeGivenProgression2 = function(t, a, r, e, i) {
  return solveCubicBezier(t[1], a[1], r[1], e[1], i).map(function(i2) {
    return solveCubicParametricEquation(t[0], a[0], r[0], e[0], i2);
  });
};
var solveCubicParametricEquation = function(t, a, r, e, i) {
  var n = 3 * a * Math.pow(i - 1, 2);
  var u = -3 * r * i + 3 * r + e * i;
  var o = t * Math.pow(i - 1, 3);
  return i * (n + i * u) - o;
};
var solveCubicBezier = function(t, a, r, e, i) {
  t -= i;
  a -= i;
  r -= i;
  e -= i;
  var n = solveCubicEquation(e - 3 * r + 3 * a - t, 3 * r - 6 * a + 3 * t, 3 * a - 3 * t, t);
  return n.filter(function(t2) {
    return t2 >= 0 && t2 <= 1;
  });
};
var solveQuadraticEquation = function(t, a, r) {
  var e = a * a - 4 * t * r;
  if (e < 0) {
    return [];
  } else {
    return [(-a + Math.sqrt(e)) / (2 * t), (-a - Math.sqrt(e)) / (2 * t)];
  }
};
var solveCubicEquation = function(t, a, r, e) {
  if (t === 0) {
    return solveQuadraticEquation(a, r, e);
  }
  a /= t;
  r /= t;
  e /= t;
  var i = (3 * r - a * a) / 3;
  var n = (2 * a * a * a - 9 * a * r + 27 * e) / 27;
  if (i === 0) {
    return [Math.pow(-n, 1 / 3)];
  } else if (n === 0) {
    return [Math.sqrt(-i), -Math.sqrt(-i)];
  }
  var u = Math.pow(n / 2, 2) + Math.pow(i / 3, 3);
  if (u === 0) {
    return [Math.pow(n / 2, 1 / 2) - a / 3];
  } else if (u > 0) {
    return [Math.pow(-(n / 2) + Math.sqrt(u), 1 / 3) - Math.pow(n / 2 + Math.sqrt(u), 1 / 3) - a / 3];
  }
  var o = Math.sqrt(Math.pow(-(i / 3), 3));
  var v = Math.acos(-(n / (2 * Math.sqrt(Math.pow(-(i / 3), 3)))));
  var h = 2 * Math.pow(o, 1 / 3);
  return [h * Math.cos(v / 3) - a / 3, h * Math.cos((v + 2 * Math.PI) / 3) - a / 3, h * Math.cos((v + 4 * Math.PI) / 3) - a / 3];
};

// node_modules/@ionic/core/dist/esm-es5/gesture-controller-314a54f6.js
var GestureController2 = function() {
  function t() {
    this.gestureId = 0;
    this.requestedStart = /* @__PURE__ */ new Map();
    this.disabledGestures = /* @__PURE__ */ new Map();
    this.disabledScroll = /* @__PURE__ */ new Set();
  }
  t.prototype.createGesture = function(t2) {
    var i;
    return new GestureDelegate2(this, this.newID(), t2.name, (i = t2.priority) !== null && i !== void 0 ? i : 0, !!t2.disableScroll);
  };
  t.prototype.createBlocker = function(t2) {
    if (t2 === void 0) {
      t2 = {};
    }
    return new BlockerDelegate2(this, this.newID(), t2.disable, !!t2.disableScroll);
  };
  t.prototype.start = function(t2, i, n) {
    if (!this.canStart(t2)) {
      this.requestedStart.delete(i);
      return false;
    }
    this.requestedStart.set(i, n);
    return true;
  };
  t.prototype.capture = function(t2, i, n) {
    if (!this.start(t2, i, n)) {
      return false;
    }
    var e = this.requestedStart;
    var s = -1e4;
    e.forEach(function(t3) {
      s = Math.max(s, t3);
    });
    if (s === n) {
      this.capturedId = i;
      e.clear();
      var r = new CustomEvent("ionGestureCaptured", { detail: { gestureName: t2 } });
      document.dispatchEvent(r);
      return true;
    }
    e.delete(i);
    return false;
  };
  t.prototype.release = function(t2) {
    this.requestedStart.delete(t2);
    if (this.capturedId === t2) {
      this.capturedId = void 0;
    }
  };
  t.prototype.disableGesture = function(t2, i) {
    var n = this.disabledGestures.get(t2);
    if (n === void 0) {
      n = /* @__PURE__ */ new Set();
      this.disabledGestures.set(t2, n);
    }
    n.add(i);
  };
  t.prototype.enableGesture = function(t2, i) {
    var n = this.disabledGestures.get(t2);
    if (n !== void 0) {
      n.delete(i);
    }
  };
  t.prototype.disableScroll = function(t2) {
    this.disabledScroll.add(t2);
    if (this.disabledScroll.size === 1) {
      document.body.classList.add(BACKDROP_NO_SCROLL2);
    }
  };
  t.prototype.enableScroll = function(t2) {
    this.disabledScroll.delete(t2);
    if (this.disabledScroll.size === 0) {
      document.body.classList.remove(BACKDROP_NO_SCROLL2);
    }
  };
  t.prototype.canStart = function(t2) {
    if (this.capturedId !== void 0) {
      return false;
    }
    if (this.isDisabled(t2)) {
      return false;
    }
    return true;
  };
  t.prototype.isCaptured = function() {
    return this.capturedId !== void 0;
  };
  t.prototype.isScrollDisabled = function() {
    return this.disabledScroll.size > 0;
  };
  t.prototype.isDisabled = function(t2) {
    var i = this.disabledGestures.get(t2);
    if (i && i.size > 0) {
      return true;
    }
    return false;
  };
  t.prototype.newID = function() {
    this.gestureId++;
    return this.gestureId;
  };
  return t;
}();
var GestureDelegate2 = function() {
  function t(t2, i, n, e, s) {
    this.id = i;
    this.name = n;
    this.disableScroll = s;
    this.priority = e * 1e6 + i;
    this.ctrl = t2;
  }
  t.prototype.canStart = function() {
    if (!this.ctrl) {
      return false;
    }
    return this.ctrl.canStart(this.name);
  };
  t.prototype.start = function() {
    if (!this.ctrl) {
      return false;
    }
    return this.ctrl.start(this.name, this.id, this.priority);
  };
  t.prototype.capture = function() {
    if (!this.ctrl) {
      return false;
    }
    var t2 = this.ctrl.capture(this.name, this.id, this.priority);
    if (t2 && this.disableScroll) {
      this.ctrl.disableScroll(this.id);
    }
    return t2;
  };
  t.prototype.release = function() {
    if (this.ctrl) {
      this.ctrl.release(this.id);
      if (this.disableScroll) {
        this.ctrl.enableScroll(this.id);
      }
    }
  };
  t.prototype.destroy = function() {
    this.release();
    this.ctrl = void 0;
  };
  return t;
}();
var BlockerDelegate2 = function() {
  function t(t2, i, n, e) {
    this.id = i;
    this.disable = n;
    this.disableScroll = e;
    this.ctrl = t2;
  }
  t.prototype.block = function() {
    if (!this.ctrl) {
      return;
    }
    if (this.disable) {
      for (var t2 = 0, i = this.disable; t2 < i.length; t2++) {
        var n = i[t2];
        this.ctrl.disableGesture(n, this.id);
      }
    }
    if (this.disableScroll) {
      this.ctrl.disableScroll(this.id);
    }
  };
  t.prototype.unblock = function() {
    if (!this.ctrl) {
      return;
    }
    if (this.disable) {
      for (var t2 = 0, i = this.disable; t2 < i.length; t2++) {
        var n = i[t2];
        this.ctrl.enableGesture(n, this.id);
      }
    }
    if (this.disableScroll) {
      this.ctrl.enableScroll(this.id);
    }
  };
  t.prototype.destroy = function() {
    this.unblock();
    this.ctrl = void 0;
  };
  return t;
}();
var BACKDROP_NO_SCROLL2 = "backdrop-no-scroll";
var GESTURE_CONTROLLER2 = new GestureController2();

// node_modules/@ionic/core/dist/esm-es5/index-39782642.js
var addEventListener2 = function(e, r, t, a) {
  var n = supportsPassive(e) ? { capture: !!a.capture, passive: !!a.passive } : !!a.capture;
  var i;
  var f;
  if (e["__zone_symbol__addEventListener"]) {
    i = "__zone_symbol__addEventListener";
    f = "__zone_symbol__removeEventListener";
  } else {
    i = "addEventListener";
    f = "removeEventListener";
  }
  e[i](r, t, n);
  return function() {
    e[f](r, t, n);
  };
};
var supportsPassive = function(e) {
  if (_sPassive === void 0) {
    try {
      var r = Object.defineProperty({}, "passive", { get: function() {
        _sPassive = true;
      } });
      e.addEventListener("optsTest", function() {
        return;
      }, r);
    } catch (e2) {
      _sPassive = false;
    }
  }
  return !!_sPassive;
};
var _sPassive;
var MOUSE_WAIT = 2e3;
var createPointerEvents = function(e, r, t, a, n) {
  var i;
  var f;
  var v;
  var u;
  var s;
  var o;
  var c;
  var d = 0;
  var l = function(a2) {
    d = Date.now() + MOUSE_WAIT;
    if (!r(a2)) {
      return;
    }
    if (!f && t) {
      f = addEventListener2(e, "touchmove", t, n);
    }
    if (!v) {
      v = addEventListener2(a2.target, "touchend", m, n);
    }
    if (!u) {
      u = addEventListener2(a2.target, "touchcancel", m, n);
    }
  };
  var E = function(a2) {
    if (d > Date.now()) {
      return;
    }
    if (!r(a2)) {
      return;
    }
    if (!o && t) {
      o = addEventListener2(getDocument(e), "mousemove", t, n);
    }
    if (!c) {
      c = addEventListener2(getDocument(e), "mouseup", p, n);
    }
  };
  var m = function(e2) {
    _();
    if (a) {
      a(e2);
    }
  };
  var p = function(e2) {
    L();
    if (a) {
      a(e2);
    }
  };
  var _ = function() {
    if (f) {
      f();
    }
    if (v) {
      v();
    }
    if (u) {
      u();
    }
    f = v = u = void 0;
  };
  var L = function() {
    if (o) {
      o();
    }
    if (c) {
      c();
    }
    o = c = void 0;
  };
  var D = function() {
    _();
    L();
  };
  var G = function(r2) {
    if (r2 === void 0) {
      r2 = true;
    }
    if (!r2) {
      if (i) {
        i();
      }
      if (s) {
        s();
      }
      i = s = void 0;
      D();
    } else {
      if (!i) {
        i = addEventListener2(e, "touchstart", l, n);
      }
      if (!s) {
        s = addEventListener2(e, "mousedown", E, n);
      }
    }
  };
  var P = function() {
    G(false);
    a = t = r = void 0;
  };
  return { enable: G, stop: D, destroy: P };
};
var getDocument = function(e) {
  return e instanceof Document ? e : e.ownerDocument;
};
var createPanRecognizer = function(e, r, t) {
  var a = t * (Math.PI / 180);
  var n = e === "x";
  var i = Math.cos(a);
  var f = r * r;
  var v = 0;
  var u = 0;
  var s = false;
  var o = 0;
  return { start: function(e2, r2) {
    v = e2;
    u = r2;
    o = 0;
    s = true;
  }, detect: function(e2, r2) {
    if (!s) {
      return false;
    }
    var t2 = e2 - v;
    var a2 = r2 - u;
    var c = t2 * t2 + a2 * a2;
    if (c < f) {
      return false;
    }
    var d = Math.sqrt(c);
    var l = (n ? t2 : a2) / d;
    if (l > i) {
      o = 1;
    } else if (l < -i) {
      o = -1;
    } else {
      o = 0;
    }
    s = false;
    return true;
  }, isGesture: function() {
    return o !== 0;
  }, getDirection: function() {
    return o;
  } };
};
var createGesture2 = function(e) {
  var r = false;
  var t = false;
  var a = true;
  var n = false;
  var i = Object.assign({ disableScroll: false, direction: "x", gesturePriority: 0, passive: true, maxAngle: 40, threshold: 10 }, e);
  var f = i.canStart;
  var v = i.onWillStart;
  var u = i.onStart;
  var s = i.onEnd;
  var o = i.notCaptured;
  var c = i.onMove;
  var d = i.threshold;
  var l = i.passive;
  var E = i.blurOnStart;
  var m = { type: "pan", startX: 0, startY: 0, startTime: 0, currentX: 0, currentY: 0, velocityX: 0, velocityY: 0, deltaX: 0, deltaY: 0, currentTime: 0, event: void 0, data: void 0 };
  var p = createPanRecognizer(i.direction, i.threshold, i.maxAngle);
  var _ = GESTURE_CONTROLLER2.createGesture({ name: e.gestureName, priority: e.gesturePriority, disableScroll: e.disableScroll });
  var L = function(e2) {
    var r2 = now(e2);
    if (t || !a) {
      return false;
    }
    updateDetail(e2, m);
    m.startX = m.currentX;
    m.startY = m.currentY;
    m.startTime = m.currentTime = r2;
    m.velocityX = m.velocityY = m.deltaX = m.deltaY = 0;
    m.event = e2;
    if (f && f(m) === false) {
      return false;
    }
    _.release();
    if (!_.start()) {
      return false;
    }
    t = true;
    if (d === 0) {
      return P();
    }
    p.start(m.startX, m.startY);
    return true;
  };
  var D = function(e2) {
    if (r) {
      if (!n && a) {
        n = true;
        calcGestureData(m, e2);
        requestAnimationFrame(G);
      }
      return;
    }
    calcGestureData(m, e2);
    if (p.detect(m.currentX, m.currentY)) {
      if (!p.isGesture() || !P()) {
        O();
      }
    }
  };
  var G = function() {
    if (!r) {
      return;
    }
    n = false;
    if (c) {
      c(m);
    }
  };
  var P = function() {
    if (!_.capture()) {
      return false;
    }
    r = true;
    a = false;
    m.startX = m.currentX;
    m.startY = m.currentY;
    m.startTime = m.currentTime;
    if (v) {
      v(m).then(y);
    } else {
      y();
    }
    return true;
  };
  var g = function() {
    if (typeof document !== "undefined") {
      var e2 = document.activeElement;
      if (e2 === null || e2 === void 0 ? void 0 : e2.blur) {
        e2.blur();
      }
    }
  };
  var y = function() {
    if (E) {
      g();
    }
    if (u) {
      u(m);
    }
    a = true;
  };
  var R = function() {
    r = false;
    t = false;
    n = false;
    a = true;
    _.release();
  };
  var T = function(e2) {
    var t2 = r;
    var n2 = a;
    R();
    if (!n2) {
      return;
    }
    calcGestureData(m, e2);
    if (t2) {
      if (s) {
        s(m);
      }
      return;
    }
    if (o) {
      o(m);
    }
  };
  var h = createPointerEvents(i.el, L, D, T, { capture: false, passive: l });
  var O = function() {
    R();
    h.stop();
    if (o) {
      o(m);
    }
  };
  return { enable: function(e2) {
    if (e2 === void 0) {
      e2 = true;
    }
    if (!e2) {
      if (r) {
        T(void 0);
      }
      R();
    }
    h.enable(e2);
  }, destroy: function() {
    _.destroy();
    h.destroy();
  } };
};
var calcGestureData = function(e, r) {
  if (!r) {
    return;
  }
  var t = e.currentX;
  var a = e.currentY;
  var n = e.currentTime;
  updateDetail(r, e);
  var i = e.currentX;
  var f = e.currentY;
  var v = e.currentTime = now(r);
  var u = v - n;
  if (u > 0 && u < 100) {
    var s = (i - t) / u;
    var o = (f - a) / u;
    e.velocityX = s * 0.7 + e.velocityX * 0.3;
    e.velocityY = o * 0.7 + e.velocityY * 0.3;
  }
  e.deltaX = i - e.startX;
  e.deltaY = f - e.startY;
  e.event = r;
};
var updateDetail = function(e, r) {
  var t = 0;
  var a = 0;
  if (e) {
    var n = e.changedTouches;
    if (n && n.length > 0) {
      var i = n[0];
      t = i.clientX;
      a = i.clientY;
    } else if (e.pageX !== void 0) {
      t = e.pageX;
      a = e.pageY;
    }
  }
  r.currentX = t;
  r.currentY = a;
};
var now = function(e) {
  return e.timeStamp || Date.now();
};

// node_modules/@ionic/core/dist/esm-es5/config-49c88215.js
var IonicSafeString2 = /* @__PURE__ */ function() {
  function e(e2) {
    this.value = e2;
  }
  return e;
}();
var setupConfig2 = function(e) {
  var r = window;
  var n = r.Ionic;
  if (n && n.config && n.config.constructor.name !== "Object") {
    return;
  }
  r.Ionic = r.Ionic || {};
  r.Ionic.config = Object.assign(Object.assign({}, r.Ionic.config), e);
  return r.Ionic.config;
};

// node_modules/@ionic/core/dist/esm-es5/theme-01f3f29c.js
var SCHEME = /^[a-z][a-z0-9+\-.]*:/;
var openURL2 = function(r, t, n, e) {
  return __awaiter(void 0, void 0, void 0, function() {
    var o;
    return __generator(this, function(a) {
      if (r != null && r[0] !== "#" && !SCHEME.test(r)) {
        o = document.querySelector("ion-router");
        if (o) {
          if (t != null) {
            t.preventDefault();
          }
          return [2, o.push(r, n, e)];
        }
      }
      return [2, false];
    });
  });
};

// node_modules/@ionic/core/dist/esm-es5/hardware-back-button-8e2c1354.js
var MENU_BACK_BUTTON_PRIORITY2 = 99;

// node_modules/@ionic/core/dist/esm-es5/index-97b0ab3f.js
var baseAnimation2 = function(n) {
  return createAnimation2().duration(n ? 400 : 300);
};
var menuOverlayAnimation2 = function(n) {
  var r;
  var e;
  var t = n.width + 8;
  var i = createAnimation2();
  var a = createAnimation2();
  if (n.isEndSide) {
    r = t + "px";
    e = "0px";
  } else {
    r = -t + "px";
    e = "0px";
  }
  i.addElement(n.menuInnerEl).fromTo("transform", "translateX(".concat(r, ")"), "translateX(".concat(e, ")"));
  var o = getIonMode2(n);
  var u = o === "ios";
  var s = u ? 0.2 : 0.25;
  a.addElement(n.backdropEl).fromTo("opacity", 0.01, s);
  return baseAnimation2(u).addAnimation([i, a]);
};
var menuPushAnimation2 = function(n) {
  var r;
  var e;
  var t = getIonMode2(n);
  var i = n.width;
  if (n.isEndSide) {
    r = -i + "px";
    e = i + "px";
  } else {
    r = i + "px";
    e = -i + "px";
  }
  var a = createAnimation2().addElement(n.menuInnerEl).fromTo("transform", "translateX(".concat(e, ")"), "translateX(0px)");
  var o = createAnimation2().addElement(n.contentEl).fromTo("transform", "translateX(0px)", "translateX(".concat(r, ")"));
  var u = createAnimation2().addElement(n.backdropEl).fromTo("opacity", 0.01, 0.32);
  return baseAnimation2(t === "ios").addAnimation([a, o, u]);
};
var menuRevealAnimation2 = function(n) {
  var r = getIonMode2(n);
  var e = n.width * (n.isEndSide ? -1 : 1) + "px";
  var t = createAnimation2().addElement(n.contentEl).fromTo("transform", "translateX(0px)", "translateX(".concat(e, ")"));
  return baseAnimation2(r === "ios").addAnimation(t);
};
var createMenuController2 = function() {
  var n = /* @__PURE__ */ new Map();
  var r = [];
  var e = function(n2) {
    return __awaiter(void 0, void 0, void 0, function() {
      var r2;
      return __generator(this, function(e2) {
        switch (e2.label) {
          case 0:
            return [4, c(n2, true)];
          case 1:
            r2 = e2.sent();
            if (r2) {
              return [2, r2.open()];
            }
            return [2, false];
        }
      });
    });
  };
  var t = function(n2) {
    return __awaiter(void 0, void 0, void 0, function() {
      var r2;
      return __generator(this, function(e2) {
        switch (e2.label) {
          case 0:
            return [4, n2 !== void 0 ? c(n2, true) : f()];
          case 1:
            r2 = e2.sent();
            if (r2 !== void 0) {
              return [2, r2.close()];
            }
            return [2, false];
        }
      });
    });
  };
  var i = function(n2) {
    return __awaiter(void 0, void 0, void 0, function() {
      var r2;
      return __generator(this, function(e2) {
        switch (e2.label) {
          case 0:
            return [4, c(n2, true)];
          case 1:
            r2 = e2.sent();
            if (r2) {
              return [2, r2.toggle()];
            }
            return [2, false];
        }
      });
    });
  };
  var a = function(n2, r2) {
    return __awaiter(void 0, void 0, void 0, function() {
      var e2;
      return __generator(this, function(t2) {
        switch (t2.label) {
          case 0:
            return [4, c(r2)];
          case 1:
            e2 = t2.sent();
            if (e2) {
              e2.disabled = !n2;
            }
            return [2, e2];
        }
      });
    });
  };
  var o = function(n2, r2) {
    return __awaiter(void 0, void 0, void 0, function() {
      var e2;
      return __generator(this, function(t2) {
        switch (t2.label) {
          case 0:
            return [4, c(r2)];
          case 1:
            e2 = t2.sent();
            if (e2) {
              e2.swipeGesture = n2;
            }
            return [2, e2];
        }
      });
    });
  };
  var u = function(n2) {
    return __awaiter(void 0, void 0, void 0, function() {
      var r2, r2;
      return __generator(this, function(e2) {
        switch (e2.label) {
          case 0:
            if (!(n2 != null))
              return [3, 2];
            return [4, c(n2)];
          case 1:
            r2 = e2.sent();
            return [2, r2 !== void 0 && r2.isOpen()];
          case 2:
            return [4, f()];
          case 3:
            r2 = e2.sent();
            return [2, r2 !== void 0];
        }
      });
    });
  };
  var s = function(n2) {
    return __awaiter(void 0, void 0, void 0, function() {
      var r2;
      return __generator(this, function(e2) {
        switch (e2.label) {
          case 0:
            return [4, c(n2)];
          case 1:
            r2 = e2.sent();
            if (r2) {
              return [2, !r2.disabled];
            }
            return [2, false];
        }
      });
    });
  };
  var c = function(n2) {
    var e2 = [];
    for (var t2 = 1; t2 < arguments.length; t2++) {
      e2[t2 - 1] = arguments[t2];
    }
    return __awaiter(void 0, __spreadArray([n2], e2, true), void 0, function(n3, e3) {
      var t3, i2, a2;
      if (e3 === void 0) {
        e3 = false;
      }
      return __generator(this, function(o2) {
        switch (o2.label) {
          case 0:
            return [4, x()];
          case 1:
            o2.sent();
            if (n3 === "start" || n3 === "end") {
              t3 = r.filter(function(r2) {
                return r2.side === n3 && !r2.disabled;
              });
              if (t3.length >= 1) {
                if (t3.length > 1 && e3) {
                  printIonWarning2('menuController queried for a menu on the "'.concat(n3, '" side, but ').concat(t3.length, " menus were found. The first menu reference will be used. If this is not the behavior you want then pass the ID of the menu instead of its side."), t3.map(function(n4) {
                    return n4.el;
                  }));
                }
                return [2, t3[0].el];
              }
              i2 = r.filter(function(r2) {
                return r2.side === n3;
              });
              if (i2.length >= 1) {
                if (i2.length > 1 && e3) {
                  printIonWarning2('menuController queried for a menu on the "'.concat(n3, '" side, but ').concat(i2.length, " menus were found. The first menu reference will be used. If this is not the behavior you want then pass the ID of the menu instead of its side."), i2.map(function(n4) {
                    return n4.el;
                  }));
                }
                return [2, i2[0].el];
              }
            } else if (n3 != null) {
              return [2, b(function(r2) {
                return r2.menuId === n3;
              })];
            }
            a2 = b(function(n4) {
              return !n4.disabled;
            });
            if (a2) {
              return [2, a2];
            }
            return [2, r.length > 0 ? r[0].el : void 0];
        }
      });
    });
  };
  var f = function() {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(n2) {
        switch (n2.label) {
          case 0:
            return [4, x()];
          case 1:
            n2.sent();
            return [2, w()];
        }
      });
    });
  };
  var v = function() {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(n2) {
        switch (n2.label) {
          case 0:
            return [4, x()];
          case 1:
            n2.sent();
            return [2, g()];
        }
      });
    });
  };
  var d = function() {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(n2) {
        switch (n2.label) {
          case 0:
            return [4, x()];
          case 1:
            n2.sent();
            return [2, A()];
        }
      });
    });
  };
  var _ = function(r2, e2) {
    n.set(r2, e2);
  };
  var m = function(n2) {
    if (r.indexOf(n2) < 0) {
      r.push(n2);
    }
  };
  var l = function(n2) {
    var e2 = r.indexOf(n2);
    if (e2 > -1) {
      r.splice(e2, 1);
    }
  };
  var h = function(n2, r2, e2) {
    return __awaiter(void 0, void 0, void 0, function() {
      var t2;
      return __generator(this, function(i2) {
        switch (i2.label) {
          case 0:
            if (A()) {
              return [2, false];
            }
            if (!r2)
              return [3, 3];
            return [4, f()];
          case 1:
            t2 = i2.sent();
            if (!(t2 && n2.el !== t2))
              return [3, 3];
            return [4, t2.setOpen(false, false)];
          case 2:
            i2.sent();
            i2.label = 3;
          case 3:
            return [2, n2._setOpen(r2, e2)];
        }
      });
    });
  };
  var p = function(r2, e2) {
    var t2 = n.get(r2);
    if (!t2) {
      throw new Error("animation not registered");
    }
    var i2 = t2(e2);
    return i2;
  };
  var w = function() {
    return b(function(n2) {
      return n2._isOpen;
    });
  };
  var g = function() {
    return r.map(function(n2) {
      return n2.el;
    });
  };
  var A = function() {
    return r.some(function(n2) {
      return n2.isAnimating;
    });
  };
  var b = function(n2) {
    var e2 = r.find(n2);
    if (e2 !== void 0) {
      return e2.el;
    }
    return void 0;
  };
  var x = function() {
    return Promise.all(Array.from(document.querySelectorAll("ion-menu")).map(function(n2) {
      return new Promise(function(r2) {
        return componentOnReady2(n2, r2);
      });
    }));
  };
  _("reveal", menuRevealAnimation2);
  _("push", menuPushAnimation2);
  _("overlay", menuOverlayAnimation2);
  doc2 === null || doc2 === void 0 ? void 0 : doc2.addEventListener("ionBackButton", function(n2) {
    var r2 = w();
    if (r2) {
      n2.detail.register(MENU_BACK_BUTTON_PRIORITY2, function() {
        return r2.close();
      });
    }
  });
  return { registerAnimation: _, get: c, getMenus: v, getOpen: f, isEnabled: s, swipeGesture: o, isAnimating: d, isOpen: u, enable: a, toggle: i, close: t, open: e, _getOpenSync: w, _createAnimation: p, _register: m, _unregister: l, _setOpen: h };
};
var menuController2 = createMenuController2();

// node_modules/@ionic/core/dist/esm-es5/overlays-2ea57630.js
var createController2 = function(e) {
  return { create: function(n) {
    return createOverlay2(e, n);
  }, dismiss: function(n, r, t) {
    return dismissOverlay2(document, n, r, e, t);
  }, getTop: function() {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(n) {
        return [2, getPresentedOverlay2(document, e)];
      });
    });
  } };
};
var alertController2 = createController2("ion-alert");
var actionSheetController2 = createController2("ion-action-sheet");
var loadingController2 = createController2("ion-loading");
var modalController2 = createController2("ion-modal");
var pickerController2 = createController2("ion-picker-legacy");
var popoverController2 = createController2("ion-popover");
var toastController2 = createController2("ion-toast");
var createOverlay2 = function(e, n) {
  if (typeof window !== "undefined" && typeof window.customElements !== "undefined") {
    return window.customElements.whenDefined(e).then(function() {
      var r = document.createElement(e);
      r.classList.add("overlay-hidden");
      Object.assign(r, Object.assign(Object.assign({}, n), { hasController: true }));
      getAppRoot2(document).appendChild(r);
      return new Promise(function(e2) {
        return componentOnReady2(r, e2);
      });
    });
  }
  return Promise.resolve();
};
var isOverlayHidden2 = function(e) {
  return e.classList.contains("overlay-hidden");
};
var dismissOverlay2 = function(e, n, r, t, o) {
  var a = getPresentedOverlay2(e, t, o);
  if (!a) {
    return Promise.reject("overlay does not exist");
  }
  return a.dismiss(n, r);
};
var getOverlays2 = function(e, n) {
  if (n === void 0) {
    n = "ion-alert,ion-action-sheet,ion-loading,ion-modal,ion-picker-legacy,ion-popover,ion-toast";
  }
  return Array.from(e.querySelectorAll(n)).filter(function(e2) {
    return e2.overlayIndex > 0;
  });
};
var getPresentedOverlays2 = function(e, n) {
  return getOverlays2(e, n).filter(function(e2) {
    return !isOverlayHidden2(e2);
  });
};
var getPresentedOverlay2 = function(e, n, r) {
  var t = getPresentedOverlays2(e, n);
  return r === void 0 ? t[t.length - 1] : t.find(function(e2) {
    return e2.id === r;
  });
};
var getAppRoot2 = function(e) {
  return e.querySelector("ion-app") || e.body;
};

// node_modules/@ionic/core/dist/esm-es5/index.js
var IonicSlides = function(e) {
  var o = e.swiper, t = e.extendParams;
  var s = { effect: void 0, direction: "horizontal", initialSlide: 0, loop: false, parallax: false, slidesPerView: 1, spaceBetween: 0, speed: 300, slidesPerColumn: 1, slidesPerColumnFill: "column", slidesPerGroup: 1, centeredSlides: false, slidesOffsetBefore: 0, slidesOffsetAfter: 0, touchEventsTarget: "container", freeMode: false, freeModeMomentum: true, freeModeMomentumRatio: 1, freeModeMomentumBounce: true, freeModeMomentumBounceRatio: 1, freeModeMomentumVelocityRatio: 1, freeModeSticky: false, freeModeMinimumVelocity: 0.02, autoHeight: false, setWrapperSize: false, zoom: { maxRatio: 3, minRatio: 1, toggle: false }, touchRatio: 1, touchAngle: 45, simulateTouch: true, touchStartPreventDefault: false, shortSwipes: true, longSwipes: true, longSwipesRatio: 0.5, longSwipesMs: 300, followFinger: true, threshold: 0, touchMoveStopPropagation: true, touchReleaseOnEdges: false, iOSEdgeSwipeDetection: false, iOSEdgeSwipeThreshold: 20, resistance: true, resistanceRatio: 0.85, watchSlidesProgress: false, watchSlidesVisibility: false, preventClicks: true, preventClicksPropagation: true, slideToClickedSlide: false, loopAdditionalSlides: 0, noSwiping: true, runCallbacksOnInit: true, coverflowEffect: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true }, flipEffect: { slideShadows: true, limitRotation: true }, cubeEffect: { slideShadows: true, shadow: true, shadowOffset: 20, shadowScale: 0.94 }, fadeEffect: { crossFade: false }, a11y: { prevSlideMessage: "Previous slide", nextSlideMessage: "Next slide", firstSlideMessage: "This is the first slide", lastSlideMessage: "This is the last slide" } };
  if (o.pagination) {
    s.pagination = { type: "bullets", clickable: false, hideOnClick: false };
  }
  if (o.scrollbar) {
    s.scrollbar = { hide: true };
  }
  t(s);
};

// node_modules/@ionic/core/dist/esm/polyfills/index.js
function applyPolyfills() {
  var promises = [];
  if (typeof window !== "undefined") {
    var win3 = window;
    if (!win3.customElements || win3.Element && (!win3.Element.prototype.closest || !win3.Element.prototype.matches || !win3.Element.prototype.remove || !win3.Element.prototype.getRootNode)) {
      promises.push(import(
        /* webpackChunkName: "polyfills-dom" */
        "./dom-GZDF3KMO.js"
      ));
    }
    var checkIfURLIsSupported = function() {
      try {
        var u = new URL("b", "http://a");
        u.pathname = "c%20d";
        return u.href === "http://a/c%20d" && u.searchParams;
      } catch (e) {
        return false;
      }
    };
    if ("function" !== typeof Object.assign || !Object.entries || !Array.prototype.find || !Array.prototype.includes || !String.prototype.startsWith || !String.prototype.endsWith || win3.NodeList && !win3.NodeList.prototype.forEach || !win3.fetch || !checkIfURLIsSupported() || typeof WeakMap == "undefined") {
      promises.push(import(
        /* webpackChunkName: "polyfills-core-js" */
        "./core-js-W5AQZKUP.js"
      ));
    }
  }
  return Promise.all(promises);
}

// node_modules/@ionic/core/dist/esm-es5/app-globals-b9f6e516.js
var globalScripts = initialize;

// node_modules/@ionic/core/dist/esm-es5/loader.js
var defineCustomElements = function(e, o) {
  return __awaiter(void 0, void 0, void 0, function() {
    return __generator(this, function(e2) {
      switch (e2.label) {
        case 0:
          if (typeof window === "undefined")
            return [2, void 0];
          return [4, globalScripts()];
        case 1:
          e2.sent();
          return [2, bootstrapLazy(JSON.parse('[["ion-menu_3",[[33,"ion-menu-button",{"color":[513],"disabled":[4],"menu":[1],"autoHide":[4,"auto-hide"],"type":[1],"visible":[32]},[[16,"ionMenuChange","visibilityChanged"],[16,"ionSplitPaneVisible","visibilityChanged"]]],[33,"ion-menu",{"contentId":[513,"content-id"],"menuId":[513,"menu-id"],"type":[1025],"disabled":[1028],"side":[513],"swipeGesture":[4,"swipe-gesture"],"maxEdgeStart":[2,"max-edge-start"],"isPaneVisible":[32],"isEndSide":[32],"isOpen":[64],"isActive":[64],"open":[64],"close":[64],"toggle":[64],"setOpen":[64]},[[16,"ionSplitPaneVisible","onSplitPaneChanged"],[2,"click","onBackdropClick"]],{"type":["typeChanged"],"disabled":["disabledChanged"],"side":["sideChanged"],"swipeGesture":["swipeGestureChanged"]}],[1,"ion-menu-toggle",{"menu":[1],"autoHide":[4,"auto-hide"],"visible":[32]},[[16,"ionMenuChange","visibilityChanged"],[16,"ionSplitPaneVisible","visibilityChanged"]]]]],["ion-input-password-toggle",[[33,"ion-input-password-toggle",{"color":[513],"showIcon":[1,"show-icon"],"hideIcon":[1,"hide-icon"],"type":[1025]},null,{"type":["onTypeChange"]}]]],["ion-fab_3",[[33,"ion-fab-button",{"color":[513],"activated":[4],"disabled":[4],"download":[1],"href":[1],"rel":[1],"routerDirection":[1,"router-direction"],"routerAnimation":[16],"target":[1],"show":[4],"translucent":[4],"type":[1],"size":[1],"closeIcon":[1,"close-icon"]}],[1,"ion-fab",{"horizontal":[1],"vertical":[1],"edge":[4],"activated":[1028],"close":[64],"toggle":[64]},null,{"activated":["activatedChanged"]}],[1,"ion-fab-list",{"activated":[4],"side":[1]},null,{"activated":["activatedChanged"]}]]],["ion-refresher_2",[[0,"ion-refresher-content",{"pullingIcon":[1025,"pulling-icon"],"pullingText":[1,"pulling-text"],"refreshingSpinner":[1025,"refreshing-spinner"],"refreshingText":[1,"refreshing-text"]}],[32,"ion-refresher",{"pullMin":[2,"pull-min"],"pullMax":[2,"pull-max"],"closeDuration":[1,"close-duration"],"snapbackDuration":[1,"snapback-duration"],"pullFactor":[2,"pull-factor"],"disabled":[4],"nativeRefresher":[32],"state":[32],"complete":[64],"cancel":[64],"getProgress":[64]},null,{"disabled":["disabledChanged"]}]]],["ion-back-button",[[33,"ion-back-button",{"color":[513],"defaultHref":[1025,"default-href"],"disabled":[516],"icon":[1],"text":[1],"type":[1],"routerAnimation":[16]}]]],["ion-toast",[[33,"ion-toast",{"overlayIndex":[2,"overlay-index"],"delegate":[16],"hasController":[4,"has-controller"],"color":[513],"enterAnimation":[16],"leaveAnimation":[16],"cssClass":[1,"css-class"],"duration":[2],"header":[1],"layout":[1],"message":[1],"keyboardClose":[4,"keyboard-close"],"position":[1],"positionAnchor":[1,"position-anchor"],"buttons":[16],"translucent":[4],"animated":[4],"icon":[1],"htmlAttributes":[16],"swipeGesture":[1,"swipe-gesture"],"isOpen":[4,"is-open"],"trigger":[1],"revealContentToScreenReader":[32],"present":[64],"dismiss":[64],"onDidDismiss":[64],"onWillDismiss":[64]},null,{"swipeGesture":["swipeGestureChanged"],"isOpen":["onIsOpenChange"],"trigger":["triggerChanged"]}]]],["ion-card_5",[[33,"ion-card",{"color":[513],"button":[4],"type":[1],"disabled":[4],"download":[1],"href":[1],"rel":[1],"routerDirection":[1,"router-direction"],"routerAnimation":[16],"target":[1]}],[32,"ion-card-content"],[33,"ion-card-header",{"color":[513],"translucent":[4]}],[33,"ion-card-subtitle",{"color":[513]}],[33,"ion-card-title",{"color":[513]}]]],["ion-item-option_3",[[33,"ion-item-option",{"color":[513],"disabled":[4],"download":[1],"expandable":[4],"href":[1],"rel":[1],"target":[1],"type":[1]}],[32,"ion-item-options",{"side":[1],"fireSwipeEvent":[64]}],[0,"ion-item-sliding",{"disabled":[4],"state":[32],"getOpenAmount":[64],"getSlidingRatio":[64],"open":[64],"close":[64],"closeOpened":[64]},null,{"disabled":["disabledChanged"]}]]],["ion-accordion_2",[[49,"ion-accordion",{"value":[1],"disabled":[4],"readonly":[4],"toggleIcon":[1,"toggle-icon"],"toggleIconSlot":[1,"toggle-icon-slot"],"state":[32],"isNext":[32],"isPrevious":[32]},null,{"value":["valueChanged"]}],[33,"ion-accordion-group",{"animated":[4],"multiple":[4],"value":[1025],"disabled":[4],"readonly":[4],"expand":[1],"requestAccordionToggle":[64],"getAccordions":[64]},[[0,"keydown","onKeydown"]],{"value":["valueChanged"],"disabled":["disabledChanged"],"readonly":["readonlyChanged"]}]]],["ion-infinite-scroll_2",[[32,"ion-infinite-scroll-content",{"loadingSpinner":[1025,"loading-spinner"],"loadingText":[1,"loading-text"]}],[0,"ion-infinite-scroll",{"threshold":[1],"disabled":[4],"position":[1],"isLoading":[32],"complete":[64]},null,{"threshold":["thresholdChanged"],"disabled":["disabledChanged"]}]]],["ion-reorder_2",[[33,"ion-reorder",null,[[2,"click","onClick"]]],[0,"ion-reorder-group",{"disabled":[4],"state":[32],"complete":[64]},null,{"disabled":["disabledChanged"]}]]],["ion-segment_2",[[33,"ion-segment-button",{"disabled":[1028],"layout":[1],"type":[1],"value":[8],"checked":[32],"setFocus":[64]},null,{"value":["valueChanged"]}],[33,"ion-segment",{"color":[513],"disabled":[4],"scrollable":[4],"swipeGesture":[4,"swipe-gesture"],"value":[1032],"selectOnFocus":[4,"select-on-focus"],"activated":[32]},[[0,"keydown","onKeyDown"]],{"color":["colorChanged"],"swipeGesture":["swipeGestureChanged"],"value":["valueChanged"],"disabled":["disabledChanged"]}]]],["ion-tab-bar_2",[[33,"ion-tab-button",{"disabled":[4],"download":[1],"href":[1],"rel":[1],"layout":[1025],"selected":[1028],"tab":[1],"target":[1]},[[8,"ionTabBarChanged","onTabBarChanged"]]],[33,"ion-tab-bar",{"color":[513],"selectedTab":[1,"selected-tab"],"translucent":[4],"keyboardVisible":[32]},null,{"selectedTab":["selectedTabChanged"]}]]],["ion-chip",[[33,"ion-chip",{"color":[513],"outline":[4],"disabled":[4]}]]],["ion-datetime-button",[[33,"ion-datetime-button",{"color":[513],"disabled":[516],"datetime":[1],"datetimePresentation":[32],"dateText":[32],"timeText":[32],"datetimeActive":[32],"selectedButton":[32]}]]],["ion-input",[[38,"ion-input",{"color":[513],"autocapitalize":[1],"autocomplete":[1],"autocorrect":[1],"autofocus":[4],"clearInput":[4,"clear-input"],"clearInputIcon":[1,"clear-input-icon"],"clearOnEdit":[4,"clear-on-edit"],"counter":[4],"counterFormatter":[16],"debounce":[2],"disabled":[516],"enterkeyhint":[1],"errorText":[1,"error-text"],"fill":[1],"inputmode":[1],"helperText":[1,"helper-text"],"label":[1],"labelPlacement":[1,"label-placement"],"max":[8],"maxlength":[2],"min":[8],"minlength":[2],"multiple":[4],"name":[1],"pattern":[1],"placeholder":[1],"readonly":[516],"required":[4],"shape":[1],"spellcheck":[4],"step":[1],"type":[1],"value":[1032],"hasFocus":[32],"setFocus":[64],"getInputElement":[64]},null,{"debounce":["debounceChanged"],"type":["onTypeChange"],"value":["valueChanged"]}]]],["ion-searchbar",[[34,"ion-searchbar",{"color":[513],"animated":[4],"autocapitalize":[1],"autocomplete":[1],"autocorrect":[1],"cancelButtonIcon":[1,"cancel-button-icon"],"cancelButtonText":[1,"cancel-button-text"],"clearIcon":[1,"clear-icon"],"debounce":[2],"disabled":[4],"inputmode":[1],"enterkeyhint":[1],"maxlength":[2],"minlength":[2],"name":[1],"placeholder":[1],"searchIcon":[1,"search-icon"],"showCancelButton":[1,"show-cancel-button"],"showClearButton":[1,"show-clear-button"],"spellcheck":[4],"type":[1],"value":[1025],"focused":[32],"noAnimate":[32],"setFocus":[64],"getInputElement":[64]},null,{"lang":["onLangChanged"],"dir":["onDirChanged"],"debounce":["debounceChanged"],"value":["valueChanged"],"showCancelButton":["showCancelButtonChanged"]}]]],["ion-toggle",[[33,"ion-toggle",{"color":[513],"name":[1],"checked":[1028],"disabled":[4],"value":[1],"enableOnOffLabels":[4,"enable-on-off-labels"],"labelPlacement":[1,"label-placement"],"justify":[1],"alignment":[1],"activated":[32]},null,{"disabled":["disabledChanged"]}]]],["ion-nav_2",[[1,"ion-nav",{"delegate":[16],"swipeGesture":[1028,"swipe-gesture"],"animated":[4],"animation":[16],"rootParams":[16],"root":[1],"push":[64],"insert":[64],"insertPages":[64],"pop":[64],"popTo":[64],"popToRoot":[64],"removeIndex":[64],"setRoot":[64],"setPages":[64],"setRouteId":[64],"getRouteId":[64],"getActive":[64],"getByIndex":[64],"canGoBack":[64],"getPrevious":[64],"getLength":[64]},null,{"swipeGesture":["swipeGestureChanged"],"root":["rootChanged"]}],[0,"ion-nav-link",{"component":[1],"componentProps":[16],"routerDirection":[1,"router-direction"],"routerAnimation":[16]}]]],["ion-textarea",[[38,"ion-textarea",{"color":[513],"autocapitalize":[1],"autofocus":[4],"clearOnEdit":[4,"clear-on-edit"],"debounce":[2],"disabled":[4],"fill":[1],"inputmode":[1],"enterkeyhint":[1],"maxlength":[2],"minlength":[2],"name":[1],"placeholder":[1],"readonly":[4],"required":[4],"spellcheck":[4],"cols":[514],"rows":[2],"wrap":[1],"autoGrow":[516,"auto-grow"],"value":[1025],"counter":[4],"counterFormatter":[16],"errorText":[1,"error-text"],"helperText":[1,"helper-text"],"label":[1],"labelPlacement":[1,"label-placement"],"shape":[1],"hasFocus":[32],"setFocus":[64],"getInputElement":[64]},null,{"debounce":["debounceChanged"],"value":["valueChanged"]}]]],["ion-backdrop",[[33,"ion-backdrop",{"visible":[4],"tappable":[4],"stopPropagation":[4,"stop-propagation"]},[[2,"click","onMouseDown"]]]]],["ion-loading",[[34,"ion-loading",{"overlayIndex":[2,"overlay-index"],"delegate":[16],"hasController":[4,"has-controller"],"keyboardClose":[4,"keyboard-close"],"enterAnimation":[16],"leaveAnimation":[16],"message":[1],"cssClass":[1,"css-class"],"duration":[2],"backdropDismiss":[4,"backdrop-dismiss"],"showBackdrop":[4,"show-backdrop"],"spinner":[1025],"translucent":[4],"animated":[4],"htmlAttributes":[16],"isOpen":[4,"is-open"],"trigger":[1],"present":[64],"dismiss":[64],"onDidDismiss":[64],"onWillDismiss":[64]},null,{"isOpen":["onIsOpenChange"],"trigger":["triggerChanged"]}]]],["ion-breadcrumb_2",[[33,"ion-breadcrumb",{"collapsed":[4],"last":[4],"showCollapsedIndicator":[4,"show-collapsed-indicator"],"color":[1],"active":[4],"disabled":[4],"download":[1],"href":[1],"rel":[1],"separator":[4],"target":[1],"routerDirection":[1,"router-direction"],"routerAnimation":[16]}],[33,"ion-breadcrumbs",{"color":[513],"maxItems":[2,"max-items"],"itemsBeforeCollapse":[2,"items-before-collapse"],"itemsAfterCollapse":[2,"items-after-collapse"],"collapsed":[32],"activeChanged":[32]},[[0,"collapsedClick","onCollapsedClick"]],{"maxItems":["maxItemsChanged"],"itemsBeforeCollapse":["maxItemsChanged"],"itemsAfterCollapse":["maxItemsChanged"]}]]],["ion-modal",[[33,"ion-modal",{"hasController":[4,"has-controller"],"overlayIndex":[2,"overlay-index"],"delegate":[16],"keyboardClose":[4,"keyboard-close"],"enterAnimation":[16],"leaveAnimation":[16],"breakpoints":[16],"initialBreakpoint":[2,"initial-breakpoint"],"backdropBreakpoint":[2,"backdrop-breakpoint"],"handle":[4],"handleBehavior":[1,"handle-behavior"],"component":[1],"componentProps":[16],"cssClass":[1,"css-class"],"backdropDismiss":[4,"backdrop-dismiss"],"showBackdrop":[4,"show-backdrop"],"animated":[4],"presentingElement":[16],"htmlAttributes":[16],"isOpen":[4,"is-open"],"trigger":[1],"keepContentsMounted":[4,"keep-contents-mounted"],"focusTrap":[4,"focus-trap"],"canDismiss":[4,"can-dismiss"],"presented":[32],"present":[64],"dismiss":[64],"onDidDismiss":[64],"onWillDismiss":[64],"setCurrentBreakpoint":[64],"getCurrentBreakpoint":[64]},null,{"isOpen":["onIsOpenChange"],"trigger":["triggerChanged"]}]]],["ion-route_4",[[0,"ion-route",{"url":[1],"component":[1],"componentProps":[16],"beforeLeave":[16],"beforeEnter":[16]},null,{"url":["onUpdate"],"component":["onUpdate"],"componentProps":["onComponentProps"]}],[0,"ion-route-redirect",{"from":[1],"to":[1]},null,{"from":["propDidChange"],"to":["propDidChange"]}],[0,"ion-router",{"root":[1],"useHash":[4,"use-hash"],"canTransition":[64],"push":[64],"back":[64],"printDebug":[64],"navChanged":[64]},[[8,"popstate","onPopState"],[4,"ionBackButton","onBackButton"]]],[1,"ion-router-link",{"color":[513],"href":[1],"rel":[1],"routerDirection":[1,"router-direction"],"routerAnimation":[16],"target":[1]}]]],["ion-avatar_3",[[33,"ion-avatar"],[33,"ion-badge",{"color":[513]}],[1,"ion-thumbnail"]]],["ion-col_3",[[1,"ion-col",{"offset":[1],"offsetXs":[1,"offset-xs"],"offsetSm":[1,"offset-sm"],"offsetMd":[1,"offset-md"],"offsetLg":[1,"offset-lg"],"offsetXl":[1,"offset-xl"],"pull":[1],"pullXs":[1,"pull-xs"],"pullSm":[1,"pull-sm"],"pullMd":[1,"pull-md"],"pullLg":[1,"pull-lg"],"pullXl":[1,"pull-xl"],"push":[1],"pushXs":[1,"push-xs"],"pushSm":[1,"push-sm"],"pushMd":[1,"push-md"],"pushLg":[1,"push-lg"],"pushXl":[1,"push-xl"],"size":[1],"sizeXs":[1,"size-xs"],"sizeSm":[1,"size-sm"],"sizeMd":[1,"size-md"],"sizeLg":[1,"size-lg"],"sizeXl":[1,"size-xl"]},[[9,"resize","onResize"]]],[1,"ion-grid",{"fixed":[4]}],[1,"ion-row"]]],["ion-tab_2",[[1,"ion-tab",{"active":[1028],"delegate":[16],"tab":[1],"component":[1],"setActive":[64]},null,{"active":["changeActive"]}],[1,"ion-tabs",{"useRouter":[1028,"use-router"],"selectedTab":[32],"select":[64],"getTab":[64],"getSelected":[64],"setRouteId":[64],"getRouteId":[64]}]]],["ion-img",[[1,"ion-img",{"alt":[1],"src":[1],"loadSrc":[32],"loadError":[32]},null,{"src":["srcChanged"]}]]],["ion-progress-bar",[[33,"ion-progress-bar",{"type":[1],"reversed":[4],"value":[2],"buffer":[2],"color":[513]}]]],["ion-range",[[33,"ion-range",{"color":[513],"debounce":[2],"name":[1],"label":[1],"dualKnobs":[4,"dual-knobs"],"min":[2],"max":[2],"pin":[4],"pinFormatter":[16],"snaps":[4],"step":[2],"ticks":[4],"activeBarStart":[1026,"active-bar-start"],"disabled":[4],"value":[1026],"labelPlacement":[1,"label-placement"],"ratioA":[32],"ratioB":[32],"pressedKnob":[32]},null,{"debounce":["debounceChanged"],"min":["minChanged"],"max":["maxChanged"],"activeBarStart":["activeBarStartChanged"],"disabled":["disabledChanged"],"value":["valueChanged"]}]]],["ion-split-pane",[[33,"ion-split-pane",{"contentId":[513,"content-id"],"disabled":[4],"when":[8],"visible":[32],"isVisible":[64]},null,{"visible":["visibleChanged"],"disabled":["updateState"],"when":["updateState"]}]]],["ion-text",[[1,"ion-text",{"color":[513]}]]],["ion-select_3",[[33,"ion-select",{"cancelText":[1,"cancel-text"],"color":[513],"compareWith":[1,"compare-with"],"disabled":[4],"fill":[1],"interface":[1],"interfaceOptions":[8,"interface-options"],"justify":[1],"label":[1],"labelPlacement":[1,"label-placement"],"multiple":[4],"name":[1],"okText":[1,"ok-text"],"placeholder":[1],"selectedText":[1,"selected-text"],"toggleIcon":[1,"toggle-icon"],"expandedIcon":[1,"expanded-icon"],"shape":[1],"value":[1032],"isExpanded":[32],"open":[64]},null,{"disabled":["styleChanged"],"isExpanded":["styleChanged"],"placeholder":["styleChanged"],"value":["styleChanged"]}],[1,"ion-select-option",{"disabled":[4],"value":[8]}],[34,"ion-select-popover",{"header":[1],"subHeader":[1,"sub-header"],"message":[1],"multiple":[4],"options":[16]}]]],["ion-picker",[[33,"ion-picker",{"exitInputMode":[64]},[[1,"touchstart","preventTouchStartPropagation"]]]]],["ion-picker-column",[[1,"ion-picker-column",{"disabled":[4],"value":[1032],"color":[513],"numericInput":[4,"numeric-input"],"ariaLabel":[32],"isActive":[32],"scrollActiveItemIntoView":[64],"setValue":[64],"setFocus":[64]},null,{"aria-label":["ariaLabelChanged"],"value":["valueChange"]}]]],["ion-datetime_3",[[33,"ion-datetime",{"color":[1],"name":[1],"disabled":[4],"formatOptions":[16],"readonly":[4],"isDateEnabled":[16],"min":[1025],"max":[1025],"presentation":[1],"cancelText":[1,"cancel-text"],"doneText":[1,"done-text"],"clearText":[1,"clear-text"],"yearValues":[8,"year-values"],"monthValues":[8,"month-values"],"dayValues":[8,"day-values"],"hourValues":[8,"hour-values"],"minuteValues":[8,"minute-values"],"locale":[1],"firstDayOfWeek":[2,"first-day-of-week"],"titleSelectedDatesFormatter":[16],"multiple":[4],"highlightedDates":[16],"value":[1025],"showDefaultTitle":[4,"show-default-title"],"showDefaultButtons":[4,"show-default-buttons"],"showClearButton":[4,"show-clear-button"],"showDefaultTimeLabel":[4,"show-default-time-label"],"hourCycle":[1,"hour-cycle"],"size":[1],"preferWheel":[4,"prefer-wheel"],"showMonthAndYear":[32],"activeParts":[32],"workingParts":[32],"isTimePopoverOpen":[32],"forceRenderDate":[32],"confirm":[64],"reset":[64],"cancel":[64]},null,{"formatOptions":["formatOptionsChanged"],"disabled":["disabledChanged"],"min":["minChanged"],"max":["maxChanged"],"presentation":["presentationChanged"],"yearValues":["yearValuesChanged"],"monthValues":["monthValuesChanged"],"dayValues":["dayValuesChanged"],"hourValues":["hourValuesChanged"],"minuteValues":["minuteValuesChanged"],"value":["valueChanged"]}],[34,"ion-picker-legacy",{"overlayIndex":[2,"overlay-index"],"delegate":[16],"hasController":[4,"has-controller"],"keyboardClose":[4,"keyboard-close"],"enterAnimation":[16],"leaveAnimation":[16],"buttons":[16],"columns":[16],"cssClass":[1,"css-class"],"duration":[2],"showBackdrop":[4,"show-backdrop"],"backdropDismiss":[4,"backdrop-dismiss"],"animated":[4],"htmlAttributes":[16],"isOpen":[4,"is-open"],"trigger":[1],"presented":[32],"present":[64],"dismiss":[64],"onDidDismiss":[64],"onWillDismiss":[64],"getColumn":[64]},null,{"isOpen":["onIsOpenChange"],"trigger":["triggerChanged"]}],[32,"ion-picker-legacy-column",{"col":[16]},null,{"col":["colChanged"]}]]],["ion-radio_2",[[33,"ion-radio",{"color":[513],"name":[1],"disabled":[4],"value":[8],"labelPlacement":[1,"label-placement"],"justify":[1],"alignment":[1],"checked":[32],"buttonTabindex":[32],"setFocus":[64],"setButtonTabindex":[64]},null,{"value":["valueChanged"]}],[0,"ion-radio-group",{"allowEmptySelection":[4,"allow-empty-selection"],"compareWith":[1,"compare-with"],"name":[1],"value":[1032]},[[4,"keydown","onKeydown"]],{"value":["valueChanged"]}]]],["ion-ripple-effect",[[1,"ion-ripple-effect",{"type":[1],"addRipple":[64]}]]],["ion-button_2",[[33,"ion-button",{"color":[513],"buttonType":[1025,"button-type"],"disabled":[516],"expand":[513],"fill":[1537],"routerDirection":[1,"router-direction"],"routerAnimation":[16],"download":[1],"href":[1],"rel":[1],"shape":[513],"size":[513],"strong":[4],"target":[1],"type":[1],"form":[1],"isCircle":[32]},null,{"disabled":["disabledChanged"]}],[1,"ion-icon",{"mode":[1025],"color":[1],"ios":[1],"md":[1],"flipRtl":[4,"flip-rtl"],"name":[513],"src":[1],"icon":[8],"size":[1],"lazy":[4],"sanitize":[4],"svgContent":[32],"isVisible":[32]},null,{"name":["loadIcon"],"src":["loadIcon"],"icon":["loadIcon"],"ios":["loadIcon"],"md":["loadIcon"]}]]],["ion-action-sheet",[[34,"ion-action-sheet",{"overlayIndex":[2,"overlay-index"],"delegate":[16],"hasController":[4,"has-controller"],"keyboardClose":[4,"keyboard-close"],"enterAnimation":[16],"leaveAnimation":[16],"buttons":[16],"cssClass":[1,"css-class"],"backdropDismiss":[4,"backdrop-dismiss"],"header":[1],"subHeader":[1,"sub-header"],"translucent":[4],"animated":[4],"htmlAttributes":[16],"isOpen":[4,"is-open"],"trigger":[1],"present":[64],"dismiss":[64],"onDidDismiss":[64],"onWillDismiss":[64]},null,{"isOpen":["onIsOpenChange"],"trigger":["triggerChanged"]}]]],["ion-alert",[[34,"ion-alert",{"overlayIndex":[2,"overlay-index"],"delegate":[16],"hasController":[4,"has-controller"],"keyboardClose":[4,"keyboard-close"],"enterAnimation":[16],"leaveAnimation":[16],"cssClass":[1,"css-class"],"header":[1],"subHeader":[1,"sub-header"],"message":[1],"buttons":[16],"inputs":[1040],"backdropDismiss":[4,"backdrop-dismiss"],"translucent":[4],"animated":[4],"htmlAttributes":[16],"isOpen":[4,"is-open"],"trigger":[1],"present":[64],"dismiss":[64],"onDidDismiss":[64],"onWillDismiss":[64]},[[4,"keydown","onKeydown"]],{"isOpen":["onIsOpenChange"],"trigger":["triggerChanged"],"buttons":["buttonsChanged"],"inputs":["inputsChanged"]}]]],["ion-app_8",[[0,"ion-app",{"setFocus":[64]}],[1,"ion-content",{"color":[513],"fullscreen":[4],"fixedSlotPlacement":[1,"fixed-slot-placement"],"forceOverscroll":[1028,"force-overscroll"],"scrollX":[4,"scroll-x"],"scrollY":[4,"scroll-y"],"scrollEvents":[4,"scroll-events"],"getScrollElement":[64],"getBackgroundElement":[64],"scrollToTop":[64],"scrollToBottom":[64],"scrollByPoint":[64],"scrollToPoint":[64]},[[9,"resize","onResize"]]],[36,"ion-footer",{"collapse":[1],"translucent":[4],"keyboardVisible":[32]}],[36,"ion-header",{"collapse":[1],"translucent":[4]}],[1,"ion-router-outlet",{"mode":[1025],"delegate":[16],"animated":[4],"animation":[16],"swipeHandler":[16],"commit":[64],"setRouteId":[64],"getRouteId":[64]},null,{"swipeHandler":["swipeHandlerChanged"]}],[33,"ion-title",{"color":[513],"size":[1]},null,{"size":["sizeChanged"]}],[33,"ion-toolbar",{"color":[513]},[[0,"ionStyle","childrenStyle"]]],[38,"ion-buttons",{"collapse":[4]}]]],["ion-picker-column-option",[[33,"ion-picker-column-option",{"disabled":[4],"value":[8],"color":[513],"ariaLabel":[32]},null,{"aria-label":["onAriaLabelChange"]}]]],["ion-popover",[[33,"ion-popover",{"hasController":[4,"has-controller"],"delegate":[16],"overlayIndex":[2,"overlay-index"],"enterAnimation":[16],"leaveAnimation":[16],"component":[1],"componentProps":[16],"keyboardClose":[4,"keyboard-close"],"cssClass":[1,"css-class"],"backdropDismiss":[4,"backdrop-dismiss"],"event":[8],"showBackdrop":[4,"show-backdrop"],"translucent":[4],"animated":[4],"htmlAttributes":[16],"triggerAction":[1,"trigger-action"],"trigger":[1],"size":[1],"dismissOnSelect":[4,"dismiss-on-select"],"reference":[1],"side":[1],"alignment":[1025],"arrow":[4],"isOpen":[4,"is-open"],"keyboardEvents":[4,"keyboard-events"],"focusTrap":[4,"focus-trap"],"keepContentsMounted":[4,"keep-contents-mounted"],"presented":[32],"presentFromTrigger":[64],"present":[64],"dismiss":[64],"getParentPopover":[64],"onDidDismiss":[64],"onWillDismiss":[64]},null,{"trigger":["onTriggerChange"],"triggerAction":["onTriggerChange"],"isOpen":["onIsOpenChange"]}]]],["ion-checkbox",[[33,"ion-checkbox",{"color":[513],"name":[1],"checked":[1028],"indeterminate":[1028],"disabled":[4],"value":[8],"labelPlacement":[1,"label-placement"],"justify":[1],"alignment":[1]}]]],["ion-spinner",[[1,"ion-spinner",{"color":[513],"duration":[2],"name":[1],"paused":[4]}]]],["ion-item_8",[[33,"ion-item-divider",{"color":[513],"sticky":[4]}],[32,"ion-item-group"],[33,"ion-note",{"color":[513]}],[1,"ion-skeleton-text",{"animated":[4]}],[33,"ion-item",{"color":[513],"button":[4],"detail":[4],"detailIcon":[1,"detail-icon"],"disabled":[516],"download":[1],"href":[1],"rel":[1],"lines":[1],"routerAnimation":[16],"routerDirection":[1,"router-direction"],"target":[1],"type":[1],"multipleInputs":[32],"focusable":[32]},[[0,"ionColor","labelColorChanged"],[0,"ionStyle","itemStyle"]],{"button":["buttonChanged"]}],[38,"ion-label",{"color":[513],"position":[1],"noAnimate":[32]},null,{"color":["colorChanged"],"position":["positionChanged"]}],[32,"ion-list",{"lines":[1],"inset":[4],"closeSlidingItems":[64]}],[33,"ion-list-header",{"color":[513],"lines":[1]}]]]]'), o)];
      }
    });
  });
};

// node_modules/@ionic/core/loader/index.js
(function() {
  if ("undefined" !== typeof window && void 0 !== window.Reflect && void 0 !== window.customElements) {
    var a = HTMLElement;
    window.HTMLElement = function() {
      return Reflect.construct(a, [], this.constructor);
    };
    HTMLElement.prototype = a.prototype;
    HTMLElement.prototype.constructor = HTMLElement;
    Object.setPrototypeOf(HTMLElement, a);
  }
})();

// node_modules/@ionic/angular/fesm2022/ionic-angular.mjs
var _c02 = ["*"];
var _c1 = ["outletContent"];
var _c2 = ["outlet"];
var _c3 = [[["", "slot", "top"]], "*", [["ion-tab"]]];
var _c4 = ["[slot=top]", "*", "ion-tab"];
function IonTabs_ion_router_outlet_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ion-router-outlet", 5, 1);
    ɵɵlistener("stackWillChange", function IonTabs_ion_router_outlet_3_Template_ion_router_outlet_stackWillChange_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onStackWillChange($event));
    })("stackDidChange", function IonTabs_ion_router_outlet_3_Template_ion_router_outlet_stackDidChange_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onStackDidChange($event));
    });
    ɵɵelementEnd();
  }
}
function IonTabs_ng_content_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0, 2, ["*ngIf", "tabs.length > 0"]);
  }
}
function IonModal_div_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 1);
    ɵɵelementContainer(1, 2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.template);
  }
}
function IonPopover_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0, 1);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.template);
  }
}
var _BooleanValueAccessorDirective = class _BooleanValueAccessorDirective extends ValueAccessor {
  constructor(injector, el) {
    super(injector, el);
  }
  writeValue(value) {
    this.elementRef.nativeElement.checked = this.lastValue = value;
    setIonicClasses(this.elementRef);
  }
  _handleIonChange(el) {
    this.handleValueChange(el, el.checked);
  }
};
/** @nocollapse */
__publicField(_BooleanValueAccessorDirective, "ɵfac", function BooleanValueAccessorDirective_Factory(t) {
  return new (t || _BooleanValueAccessorDirective)(ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ElementRef));
});
/** @nocollapse */
__publicField(_BooleanValueAccessorDirective, "ɵdir", ɵɵdefineDirective({
  type: _BooleanValueAccessorDirective,
  selectors: [["ion-checkbox"], ["ion-toggle"]],
  hostBindings: function BooleanValueAccessorDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("ionChange", function BooleanValueAccessorDirective_ionChange_HostBindingHandler($event) {
        return ctx._handleIonChange($event.target);
      });
    }
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: _BooleanValueAccessorDirective,
    multi: true
  }]), ɵɵInheritDefinitionFeature]
}));
var BooleanValueAccessorDirective = _BooleanValueAccessorDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BooleanValueAccessorDirective, [{
    type: Directive,
    args: [{
      selector: "ion-checkbox,ion-toggle",
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: BooleanValueAccessorDirective,
        multi: true
      }]
    }]
  }], function() {
    return [{
      type: Injector
    }, {
      type: ElementRef
    }];
  }, {
    _handleIonChange: [{
      type: HostListener,
      args: ["ionChange", ["$event.target"]]
    }]
  });
})();
var _NumericValueAccessorDirective = class _NumericValueAccessorDirective extends ValueAccessor {
  constructor(injector, el) {
    super(injector, el);
    __publicField(this, "el");
    this.el = el;
  }
  handleInputEvent(el) {
    this.handleValueChange(el, el.value);
  }
  registerOnChange(fn) {
    if (this.el.nativeElement.tagName === "ION-INPUT") {
      super.registerOnChange((value) => {
        fn(value === "" ? null : parseFloat(value));
      });
    } else {
      super.registerOnChange(fn);
    }
  }
};
/** @nocollapse */
__publicField(_NumericValueAccessorDirective, "ɵfac", function NumericValueAccessorDirective_Factory(t) {
  return new (t || _NumericValueAccessorDirective)(ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ElementRef));
});
/** @nocollapse */
__publicField(_NumericValueAccessorDirective, "ɵdir", ɵɵdefineDirective({
  type: _NumericValueAccessorDirective,
  selectors: [["ion-input", "type", "number"], ["ion-range"]],
  hostBindings: function NumericValueAccessorDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("ionInput", function NumericValueAccessorDirective_ionInput_HostBindingHandler($event) {
        return ctx.handleInputEvent($event.target);
      });
    }
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: _NumericValueAccessorDirective,
    multi: true
  }]), ɵɵInheritDefinitionFeature]
}));
var NumericValueAccessorDirective = _NumericValueAccessorDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NumericValueAccessorDirective, [{
    type: Directive,
    args: [{
      selector: "ion-input[type=number],ion-range",
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: NumericValueAccessorDirective,
        multi: true
      }]
    }]
  }], function() {
    return [{
      type: Injector
    }, {
      type: ElementRef
    }];
  }, {
    handleInputEvent: [{
      type: HostListener,
      args: ["ionInput", ["$event.target"]]
    }]
  });
})();
var _SelectValueAccessorDirective = class _SelectValueAccessorDirective extends ValueAccessor {
  constructor(injector, el) {
    super(injector, el);
  }
  _handleChangeEvent(el) {
    this.handleValueChange(el, el.value);
  }
};
/** @nocollapse */
__publicField(_SelectValueAccessorDirective, "ɵfac", function SelectValueAccessorDirective_Factory(t) {
  return new (t || _SelectValueAccessorDirective)(ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ElementRef));
});
/** @nocollapse */
__publicField(_SelectValueAccessorDirective, "ɵdir", ɵɵdefineDirective({
  type: _SelectValueAccessorDirective,
  selectors: [["ion-select"], ["ion-radio-group"], ["ion-segment"], ["ion-datetime"]],
  hostBindings: function SelectValueAccessorDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("ionChange", function SelectValueAccessorDirective_ionChange_HostBindingHandler($event) {
        return ctx._handleChangeEvent($event.target);
      });
    }
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: _SelectValueAccessorDirective,
    multi: true
  }]), ɵɵInheritDefinitionFeature]
}));
var SelectValueAccessorDirective = _SelectValueAccessorDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectValueAccessorDirective, [{
    type: Directive,
    args: [{
      /* tslint:disable-next-line:directive-selector */
      selector: "ion-select, ion-radio-group, ion-segment, ion-datetime",
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: SelectValueAccessorDirective,
        multi: true
      }]
    }]
  }], function() {
    return [{
      type: Injector
    }, {
      type: ElementRef
    }];
  }, {
    _handleChangeEvent: [{
      type: HostListener,
      args: ["ionChange", ["$event.target"]]
    }]
  });
})();
var _TextValueAccessorDirective = class _TextValueAccessorDirective extends ValueAccessor {
  constructor(injector, el) {
    super(injector, el);
  }
  _handleInputEvent(el) {
    this.handleValueChange(el, el.value);
  }
};
/** @nocollapse */
__publicField(_TextValueAccessorDirective, "ɵfac", function TextValueAccessorDirective_Factory(t) {
  return new (t || _TextValueAccessorDirective)(ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ElementRef));
});
/** @nocollapse */
__publicField(_TextValueAccessorDirective, "ɵdir", ɵɵdefineDirective({
  type: _TextValueAccessorDirective,
  selectors: [["ion-input", 3, "type", "number"], ["ion-textarea"], ["ion-searchbar"]],
  hostBindings: function TextValueAccessorDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("ionInput", function TextValueAccessorDirective_ionInput_HostBindingHandler($event) {
        return ctx._handleInputEvent($event.target);
      });
    }
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: _TextValueAccessorDirective,
    multi: true
  }]), ɵɵInheritDefinitionFeature]
}));
var TextValueAccessorDirective = _TextValueAccessorDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TextValueAccessorDirective, [{
    type: Directive,
    args: [{
      selector: "ion-input:not([type=number]),ion-textarea,ion-searchbar",
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: TextValueAccessorDirective,
        multi: true
      }]
    }]
  }], function() {
    return [{
      type: Injector
    }, {
      type: ElementRef
    }];
  }, {
    _handleInputEvent: [{
      type: HostListener,
      args: ["ionInput", ["$event.target"]]
    }]
  });
})();
var proxyInputs2 = (Cmp, inputs) => {
  const Prototype = Cmp.prototype;
  inputs.forEach((item) => {
    Object.defineProperty(Prototype, item, {
      get() {
        return this.el[item];
      },
      set(val) {
        this.z.runOutsideAngular(() => this.el[item] = val);
      },
      /**
       * In the event that proxyInputs is called
       * multiple times re-defining these inputs
       * will cause an error to be thrown. As a result
       * we set configurable: true to indicate these
       * properties can be changed.
       */
      configurable: true
    });
  });
};
var proxyMethods2 = (Cmp, methods) => {
  const Prototype = Cmp.prototype;
  methods.forEach((methodName) => {
    Prototype[methodName] = function() {
      const args = arguments;
      return this.z.runOutsideAngular(() => this.el[methodName].apply(this.el, args));
    };
  });
};
var proxyOutputs2 = (instance, el, events) => {
  events.forEach((eventName) => instance[eventName] = fromEvent(el, eventName));
};
function ProxyCmp2(opts) {
  const decorator = function(cls) {
    const {
      defineCustomElementFn,
      inputs,
      methods
    } = opts;
    if (defineCustomElementFn !== void 0) {
      defineCustomElementFn();
    }
    if (inputs) {
      proxyInputs2(cls, inputs);
    }
    if (methods) {
      proxyMethods2(cls, methods);
    }
    return cls;
  };
  return decorator;
}
var _a5;
var IonAccordion = (_a5 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a5, "ɵfac", function IonAccordion_Factory(t) {
  return new (t || _a5)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a5, "ɵcmp", ɵɵdefineComponent({
  type: _a5,
  selectors: [["ion-accordion"]],
  inputs: {
    disabled: "disabled",
    mode: "mode",
    readonly: "readonly",
    toggleIcon: "toggleIcon",
    toggleIconSlot: "toggleIconSlot",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonAccordion_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a5);
IonAccordion = __decorate([ProxyCmp2({
  inputs: ["disabled", "mode", "readonly", "toggleIcon", "toggleIconSlot", "value"]
})], IonAccordion);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonAccordion, [{
    type: Component,
    args: [{
      selector: "ion-accordion",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["disabled", "mode", "readonly", "toggleIcon", "toggleIconSlot", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a6;
var IonAccordionGroup = (_a6 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionChange"]);
  }
}, /** @nocollapse */
__publicField(_a6, "ɵfac", function IonAccordionGroup_Factory(t) {
  return new (t || _a6)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a6, "ɵcmp", ɵɵdefineComponent({
  type: _a6,
  selectors: [["ion-accordion-group"]],
  inputs: {
    animated: "animated",
    disabled: "disabled",
    expand: "expand",
    mode: "mode",
    multiple: "multiple",
    readonly: "readonly",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonAccordionGroup_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a6);
IonAccordionGroup = __decorate([ProxyCmp2({
  inputs: ["animated", "disabled", "expand", "mode", "multiple", "readonly", "value"]
})], IonAccordionGroup);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonAccordionGroup, [{
    type: Component,
    args: [{
      selector: "ion-accordion-group",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["animated", "disabled", "expand", "mode", "multiple", "readonly", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a7;
var IonActionSheet = (_a7 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionActionSheetDidPresent", "ionActionSheetWillPresent", "ionActionSheetWillDismiss", "ionActionSheetDidDismiss", "didPresent", "willPresent", "willDismiss", "didDismiss"]);
  }
}, /** @nocollapse */
__publicField(_a7, "ɵfac", function IonActionSheet_Factory(t) {
  return new (t || _a7)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a7, "ɵcmp", ɵɵdefineComponent({
  type: _a7,
  selectors: [["ion-action-sheet"]],
  inputs: {
    animated: "animated",
    backdropDismiss: "backdropDismiss",
    buttons: "buttons",
    cssClass: "cssClass",
    enterAnimation: "enterAnimation",
    header: "header",
    htmlAttributes: "htmlAttributes",
    isOpen: "isOpen",
    keyboardClose: "keyboardClose",
    leaveAnimation: "leaveAnimation",
    mode: "mode",
    subHeader: "subHeader",
    translucent: "translucent",
    trigger: "trigger"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonActionSheet_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a7);
IonActionSheet = __decorate([ProxyCmp2({
  inputs: ["animated", "backdropDismiss", "buttons", "cssClass", "enterAnimation", "header", "htmlAttributes", "isOpen", "keyboardClose", "leaveAnimation", "mode", "subHeader", "translucent", "trigger"],
  methods: ["present", "dismiss", "onDidDismiss", "onWillDismiss"]
})], IonActionSheet);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonActionSheet, [{
    type: Component,
    args: [{
      selector: "ion-action-sheet",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["animated", "backdropDismiss", "buttons", "cssClass", "enterAnimation", "header", "htmlAttributes", "isOpen", "keyboardClose", "leaveAnimation", "mode", "subHeader", "translucent", "trigger"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a8;
var IonAlert = (_a8 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionAlertDidPresent", "ionAlertWillPresent", "ionAlertWillDismiss", "ionAlertDidDismiss", "didPresent", "willPresent", "willDismiss", "didDismiss"]);
  }
}, /** @nocollapse */
__publicField(_a8, "ɵfac", function IonAlert_Factory(t) {
  return new (t || _a8)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a8, "ɵcmp", ɵɵdefineComponent({
  type: _a8,
  selectors: [["ion-alert"]],
  inputs: {
    animated: "animated",
    backdropDismiss: "backdropDismiss",
    buttons: "buttons",
    cssClass: "cssClass",
    enterAnimation: "enterAnimation",
    header: "header",
    htmlAttributes: "htmlAttributes",
    inputs: "inputs",
    isOpen: "isOpen",
    keyboardClose: "keyboardClose",
    leaveAnimation: "leaveAnimation",
    message: "message",
    mode: "mode",
    subHeader: "subHeader",
    translucent: "translucent",
    trigger: "trigger"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonAlert_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a8);
IonAlert = __decorate([ProxyCmp2({
  inputs: ["animated", "backdropDismiss", "buttons", "cssClass", "enterAnimation", "header", "htmlAttributes", "inputs", "isOpen", "keyboardClose", "leaveAnimation", "message", "mode", "subHeader", "translucent", "trigger"],
  methods: ["present", "dismiss", "onDidDismiss", "onWillDismiss"]
})], IonAlert);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonAlert, [{
    type: Component,
    args: [{
      selector: "ion-alert",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["animated", "backdropDismiss", "buttons", "cssClass", "enterAnimation", "header", "htmlAttributes", "inputs", "isOpen", "keyboardClose", "leaveAnimation", "message", "mode", "subHeader", "translucent", "trigger"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a9;
var IonApp = (_a9 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a9, "ɵfac", function IonApp_Factory(t) {
  return new (t || _a9)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a9, "ɵcmp", ɵɵdefineComponent({
  type: _a9,
  selectors: [["ion-app"]],
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonApp_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a9);
IonApp = __decorate([ProxyCmp2({})], IonApp);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonApp, [{
    type: Component,
    args: [{
      selector: "ion-app",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: []
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a10;
var IonAvatar = (_a10 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a10, "ɵfac", function IonAvatar_Factory(t) {
  return new (t || _a10)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a10, "ɵcmp", ɵɵdefineComponent({
  type: _a10,
  selectors: [["ion-avatar"]],
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonAvatar_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a10);
IonAvatar = __decorate([ProxyCmp2({})], IonAvatar);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonAvatar, [{
    type: Component,
    args: [{
      selector: "ion-avatar",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: []
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a11;
var IonBackdrop = (_a11 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionBackdropTap"]);
  }
}, /** @nocollapse */
__publicField(_a11, "ɵfac", function IonBackdrop_Factory(t) {
  return new (t || _a11)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a11, "ɵcmp", ɵɵdefineComponent({
  type: _a11,
  selectors: [["ion-backdrop"]],
  inputs: {
    stopPropagation: "stopPropagation",
    tappable: "tappable",
    visible: "visible"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonBackdrop_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a11);
IonBackdrop = __decorate([ProxyCmp2({
  inputs: ["stopPropagation", "tappable", "visible"]
})], IonBackdrop);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonBackdrop, [{
    type: Component,
    args: [{
      selector: "ion-backdrop",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["stopPropagation", "tappable", "visible"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a12;
var IonBadge = (_a12 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a12, "ɵfac", function IonBadge_Factory(t) {
  return new (t || _a12)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a12, "ɵcmp", ɵɵdefineComponent({
  type: _a12,
  selectors: [["ion-badge"]],
  inputs: {
    color: "color",
    mode: "mode"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonBadge_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a12);
IonBadge = __decorate([ProxyCmp2({
  inputs: ["color", "mode"]
})], IonBadge);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonBadge, [{
    type: Component,
    args: [{
      selector: "ion-badge",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "mode"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a13;
var IonBreadcrumb = (_a13 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionFocus", "ionBlur"]);
  }
}, /** @nocollapse */
__publicField(_a13, "ɵfac", function IonBreadcrumb_Factory(t) {
  return new (t || _a13)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a13, "ɵcmp", ɵɵdefineComponent({
  type: _a13,
  selectors: [["ion-breadcrumb"]],
  inputs: {
    active: "active",
    color: "color",
    disabled: "disabled",
    download: "download",
    href: "href",
    mode: "mode",
    rel: "rel",
    routerAnimation: "routerAnimation",
    routerDirection: "routerDirection",
    separator: "separator",
    target: "target"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonBreadcrumb_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a13);
IonBreadcrumb = __decorate([ProxyCmp2({
  inputs: ["active", "color", "disabled", "download", "href", "mode", "rel", "routerAnimation", "routerDirection", "separator", "target"]
})], IonBreadcrumb);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonBreadcrumb, [{
    type: Component,
    args: [{
      selector: "ion-breadcrumb",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["active", "color", "disabled", "download", "href", "mode", "rel", "routerAnimation", "routerDirection", "separator", "target"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a14;
var IonBreadcrumbs = (_a14 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionCollapsedClick"]);
  }
}, /** @nocollapse */
__publicField(_a14, "ɵfac", function IonBreadcrumbs_Factory(t) {
  return new (t || _a14)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a14, "ɵcmp", ɵɵdefineComponent({
  type: _a14,
  selectors: [["ion-breadcrumbs"]],
  inputs: {
    color: "color",
    itemsAfterCollapse: "itemsAfterCollapse",
    itemsBeforeCollapse: "itemsBeforeCollapse",
    maxItems: "maxItems",
    mode: "mode"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonBreadcrumbs_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a14);
IonBreadcrumbs = __decorate([ProxyCmp2({
  inputs: ["color", "itemsAfterCollapse", "itemsBeforeCollapse", "maxItems", "mode"]
})], IonBreadcrumbs);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonBreadcrumbs, [{
    type: Component,
    args: [{
      selector: "ion-breadcrumbs",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "itemsAfterCollapse", "itemsBeforeCollapse", "maxItems", "mode"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a15;
var IonButton = (_a15 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionFocus", "ionBlur"]);
  }
}, /** @nocollapse */
__publicField(_a15, "ɵfac", function IonButton_Factory(t) {
  return new (t || _a15)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a15, "ɵcmp", ɵɵdefineComponent({
  type: _a15,
  selectors: [["ion-button"]],
  inputs: {
    buttonType: "buttonType",
    color: "color",
    disabled: "disabled",
    download: "download",
    expand: "expand",
    fill: "fill",
    form: "form",
    href: "href",
    mode: "mode",
    rel: "rel",
    routerAnimation: "routerAnimation",
    routerDirection: "routerDirection",
    shape: "shape",
    size: "size",
    strong: "strong",
    target: "target",
    type: "type"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonButton_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a15);
IonButton = __decorate([ProxyCmp2({
  inputs: ["buttonType", "color", "disabled", "download", "expand", "fill", "form", "href", "mode", "rel", "routerAnimation", "routerDirection", "shape", "size", "strong", "target", "type"]
})], IonButton);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonButton, [{
    type: Component,
    args: [{
      selector: "ion-button",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["buttonType", "color", "disabled", "download", "expand", "fill", "form", "href", "mode", "rel", "routerAnimation", "routerDirection", "shape", "size", "strong", "target", "type"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a16;
var IonButtons = (_a16 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a16, "ɵfac", function IonButtons_Factory(t) {
  return new (t || _a16)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a16, "ɵcmp", ɵɵdefineComponent({
  type: _a16,
  selectors: [["ion-buttons"]],
  inputs: {
    collapse: "collapse"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonButtons_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a16);
IonButtons = __decorate([ProxyCmp2({
  inputs: ["collapse"]
})], IonButtons);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonButtons, [{
    type: Component,
    args: [{
      selector: "ion-buttons",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["collapse"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a17;
var IonCard = (_a17 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a17, "ɵfac", function IonCard_Factory(t) {
  return new (t || _a17)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a17, "ɵcmp", ɵɵdefineComponent({
  type: _a17,
  selectors: [["ion-card"]],
  inputs: {
    button: "button",
    color: "color",
    disabled: "disabled",
    download: "download",
    href: "href",
    mode: "mode",
    rel: "rel",
    routerAnimation: "routerAnimation",
    routerDirection: "routerDirection",
    target: "target",
    type: "type"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonCard_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a17);
IonCard = __decorate([ProxyCmp2({
  inputs: ["button", "color", "disabled", "download", "href", "mode", "rel", "routerAnimation", "routerDirection", "target", "type"]
})], IonCard);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonCard, [{
    type: Component,
    args: [{
      selector: "ion-card",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["button", "color", "disabled", "download", "href", "mode", "rel", "routerAnimation", "routerDirection", "target", "type"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a18;
var IonCardContent = (_a18 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a18, "ɵfac", function IonCardContent_Factory(t) {
  return new (t || _a18)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a18, "ɵcmp", ɵɵdefineComponent({
  type: _a18,
  selectors: [["ion-card-content"]],
  inputs: {
    mode: "mode"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonCardContent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a18);
IonCardContent = __decorate([ProxyCmp2({
  inputs: ["mode"]
})], IonCardContent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonCardContent, [{
    type: Component,
    args: [{
      selector: "ion-card-content",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["mode"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a19;
var IonCardHeader = (_a19 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a19, "ɵfac", function IonCardHeader_Factory(t) {
  return new (t || _a19)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a19, "ɵcmp", ɵɵdefineComponent({
  type: _a19,
  selectors: [["ion-card-header"]],
  inputs: {
    color: "color",
    mode: "mode",
    translucent: "translucent"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonCardHeader_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a19);
IonCardHeader = __decorate([ProxyCmp2({
  inputs: ["color", "mode", "translucent"]
})], IonCardHeader);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonCardHeader, [{
    type: Component,
    args: [{
      selector: "ion-card-header",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "mode", "translucent"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a20;
var IonCardSubtitle = (_a20 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a20, "ɵfac", function IonCardSubtitle_Factory(t) {
  return new (t || _a20)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a20, "ɵcmp", ɵɵdefineComponent({
  type: _a20,
  selectors: [["ion-card-subtitle"]],
  inputs: {
    color: "color",
    mode: "mode"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonCardSubtitle_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a20);
IonCardSubtitle = __decorate([ProxyCmp2({
  inputs: ["color", "mode"]
})], IonCardSubtitle);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonCardSubtitle, [{
    type: Component,
    args: [{
      selector: "ion-card-subtitle",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "mode"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a21;
var IonCardTitle = (_a21 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a21, "ɵfac", function IonCardTitle_Factory(t) {
  return new (t || _a21)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a21, "ɵcmp", ɵɵdefineComponent({
  type: _a21,
  selectors: [["ion-card-title"]],
  inputs: {
    color: "color",
    mode: "mode"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonCardTitle_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a21);
IonCardTitle = __decorate([ProxyCmp2({
  inputs: ["color", "mode"]
})], IonCardTitle);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonCardTitle, [{
    type: Component,
    args: [{
      selector: "ion-card-title",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "mode"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a22;
var IonCheckbox = (_a22 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionChange", "ionFocus", "ionBlur"]);
  }
}, /** @nocollapse */
__publicField(_a22, "ɵfac", function IonCheckbox_Factory(t) {
  return new (t || _a22)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a22, "ɵcmp", ɵɵdefineComponent({
  type: _a22,
  selectors: [["ion-checkbox"]],
  inputs: {
    alignment: "alignment",
    checked: "checked",
    color: "color",
    disabled: "disabled",
    indeterminate: "indeterminate",
    justify: "justify",
    labelPlacement: "labelPlacement",
    mode: "mode",
    name: "name",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonCheckbox_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a22);
IonCheckbox = __decorate([ProxyCmp2({
  inputs: ["alignment", "checked", "color", "disabled", "indeterminate", "justify", "labelPlacement", "mode", "name", "value"]
})], IonCheckbox);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonCheckbox, [{
    type: Component,
    args: [{
      selector: "ion-checkbox",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["alignment", "checked", "color", "disabled", "indeterminate", "justify", "labelPlacement", "mode", "name", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a23;
var IonChip = (_a23 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a23, "ɵfac", function IonChip_Factory(t) {
  return new (t || _a23)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a23, "ɵcmp", ɵɵdefineComponent({
  type: _a23,
  selectors: [["ion-chip"]],
  inputs: {
    color: "color",
    disabled: "disabled",
    mode: "mode",
    outline: "outline"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonChip_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a23);
IonChip = __decorate([ProxyCmp2({
  inputs: ["color", "disabled", "mode", "outline"]
})], IonChip);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonChip, [{
    type: Component,
    args: [{
      selector: "ion-chip",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "disabled", "mode", "outline"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a24;
var IonCol = (_a24 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a24, "ɵfac", function IonCol_Factory(t) {
  return new (t || _a24)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a24, "ɵcmp", ɵɵdefineComponent({
  type: _a24,
  selectors: [["ion-col"]],
  inputs: {
    offset: "offset",
    offsetLg: "offsetLg",
    offsetMd: "offsetMd",
    offsetSm: "offsetSm",
    offsetXl: "offsetXl",
    offsetXs: "offsetXs",
    pull: "pull",
    pullLg: "pullLg",
    pullMd: "pullMd",
    pullSm: "pullSm",
    pullXl: "pullXl",
    pullXs: "pullXs",
    push: "push",
    pushLg: "pushLg",
    pushMd: "pushMd",
    pushSm: "pushSm",
    pushXl: "pushXl",
    pushXs: "pushXs",
    size: "size",
    sizeLg: "sizeLg",
    sizeMd: "sizeMd",
    sizeSm: "sizeSm",
    sizeXl: "sizeXl",
    sizeXs: "sizeXs"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonCol_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a24);
IonCol = __decorate([ProxyCmp2({
  inputs: ["offset", "offsetLg", "offsetMd", "offsetSm", "offsetXl", "offsetXs", "pull", "pullLg", "pullMd", "pullSm", "pullXl", "pullXs", "push", "pushLg", "pushMd", "pushSm", "pushXl", "pushXs", "size", "sizeLg", "sizeMd", "sizeSm", "sizeXl", "sizeXs"]
})], IonCol);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonCol, [{
    type: Component,
    args: [{
      selector: "ion-col",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["offset", "offsetLg", "offsetMd", "offsetSm", "offsetXl", "offsetXs", "pull", "pullLg", "pullMd", "pullSm", "pullXl", "pullXs", "push", "pushLg", "pushMd", "pushSm", "pushXl", "pushXs", "size", "sizeLg", "sizeMd", "sizeSm", "sizeXl", "sizeXs"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a25;
var IonContent = (_a25 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionScrollStart", "ionScroll", "ionScrollEnd"]);
  }
}, /** @nocollapse */
__publicField(_a25, "ɵfac", function IonContent_Factory(t) {
  return new (t || _a25)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a25, "ɵcmp", ɵɵdefineComponent({
  type: _a25,
  selectors: [["ion-content"]],
  inputs: {
    color: "color",
    fixedSlotPlacement: "fixedSlotPlacement",
    forceOverscroll: "forceOverscroll",
    fullscreen: "fullscreen",
    scrollEvents: "scrollEvents",
    scrollX: "scrollX",
    scrollY: "scrollY"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonContent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a25);
IonContent = __decorate([ProxyCmp2({
  inputs: ["color", "fixedSlotPlacement", "forceOverscroll", "fullscreen", "scrollEvents", "scrollX", "scrollY"],
  methods: ["getScrollElement", "scrollToTop", "scrollToBottom", "scrollByPoint", "scrollToPoint"]
})], IonContent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonContent, [{
    type: Component,
    args: [{
      selector: "ion-content",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "fixedSlotPlacement", "forceOverscroll", "fullscreen", "scrollEvents", "scrollX", "scrollY"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a26;
var IonDatetime = (_a26 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionCancel", "ionChange", "ionFocus", "ionBlur"]);
  }
}, /** @nocollapse */
__publicField(_a26, "ɵfac", function IonDatetime_Factory(t) {
  return new (t || _a26)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a26, "ɵcmp", ɵɵdefineComponent({
  type: _a26,
  selectors: [["ion-datetime"]],
  inputs: {
    cancelText: "cancelText",
    clearText: "clearText",
    color: "color",
    dayValues: "dayValues",
    disabled: "disabled",
    doneText: "doneText",
    firstDayOfWeek: "firstDayOfWeek",
    formatOptions: "formatOptions",
    highlightedDates: "highlightedDates",
    hourCycle: "hourCycle",
    hourValues: "hourValues",
    isDateEnabled: "isDateEnabled",
    locale: "locale",
    max: "max",
    min: "min",
    minuteValues: "minuteValues",
    mode: "mode",
    monthValues: "monthValues",
    multiple: "multiple",
    name: "name",
    preferWheel: "preferWheel",
    presentation: "presentation",
    readonly: "readonly",
    showClearButton: "showClearButton",
    showDefaultButtons: "showDefaultButtons",
    showDefaultTimeLabel: "showDefaultTimeLabel",
    showDefaultTitle: "showDefaultTitle",
    size: "size",
    titleSelectedDatesFormatter: "titleSelectedDatesFormatter",
    value: "value",
    yearValues: "yearValues"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonDatetime_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a26);
IonDatetime = __decorate([ProxyCmp2({
  inputs: ["cancelText", "clearText", "color", "dayValues", "disabled", "doneText", "firstDayOfWeek", "formatOptions", "highlightedDates", "hourCycle", "hourValues", "isDateEnabled", "locale", "max", "min", "minuteValues", "mode", "monthValues", "multiple", "name", "preferWheel", "presentation", "readonly", "showClearButton", "showDefaultButtons", "showDefaultTimeLabel", "showDefaultTitle", "size", "titleSelectedDatesFormatter", "value", "yearValues"],
  methods: ["confirm", "reset", "cancel"]
})], IonDatetime);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonDatetime, [{
    type: Component,
    args: [{
      selector: "ion-datetime",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["cancelText", "clearText", "color", "dayValues", "disabled", "doneText", "firstDayOfWeek", "formatOptions", "highlightedDates", "hourCycle", "hourValues", "isDateEnabled", "locale", "max", "min", "minuteValues", "mode", "monthValues", "multiple", "name", "preferWheel", "presentation", "readonly", "showClearButton", "showDefaultButtons", "showDefaultTimeLabel", "showDefaultTitle", "size", "titleSelectedDatesFormatter", "value", "yearValues"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a27;
var IonDatetimeButton = (_a27 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a27, "ɵfac", function IonDatetimeButton_Factory(t) {
  return new (t || _a27)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a27, "ɵcmp", ɵɵdefineComponent({
  type: _a27,
  selectors: [["ion-datetime-button"]],
  inputs: {
    color: "color",
    datetime: "datetime",
    disabled: "disabled",
    mode: "mode"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonDatetimeButton_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a27);
IonDatetimeButton = __decorate([ProxyCmp2({
  inputs: ["color", "datetime", "disabled", "mode"]
})], IonDatetimeButton);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonDatetimeButton, [{
    type: Component,
    args: [{
      selector: "ion-datetime-button",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "datetime", "disabled", "mode"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a28;
var IonFab = (_a28 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a28, "ɵfac", function IonFab_Factory(t) {
  return new (t || _a28)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a28, "ɵcmp", ɵɵdefineComponent({
  type: _a28,
  selectors: [["ion-fab"]],
  inputs: {
    activated: "activated",
    edge: "edge",
    horizontal: "horizontal",
    vertical: "vertical"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonFab_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a28);
IonFab = __decorate([ProxyCmp2({
  inputs: ["activated", "edge", "horizontal", "vertical"],
  methods: ["close"]
})], IonFab);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonFab, [{
    type: Component,
    args: [{
      selector: "ion-fab",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["activated", "edge", "horizontal", "vertical"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a29;
var IonFabButton = (_a29 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionFocus", "ionBlur"]);
  }
}, /** @nocollapse */
__publicField(_a29, "ɵfac", function IonFabButton_Factory(t) {
  return new (t || _a29)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a29, "ɵcmp", ɵɵdefineComponent({
  type: _a29,
  selectors: [["ion-fab-button"]],
  inputs: {
    activated: "activated",
    closeIcon: "closeIcon",
    color: "color",
    disabled: "disabled",
    download: "download",
    href: "href",
    mode: "mode",
    rel: "rel",
    routerAnimation: "routerAnimation",
    routerDirection: "routerDirection",
    show: "show",
    size: "size",
    target: "target",
    translucent: "translucent",
    type: "type"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonFabButton_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a29);
IonFabButton = __decorate([ProxyCmp2({
  inputs: ["activated", "closeIcon", "color", "disabled", "download", "href", "mode", "rel", "routerAnimation", "routerDirection", "show", "size", "target", "translucent", "type"]
})], IonFabButton);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonFabButton, [{
    type: Component,
    args: [{
      selector: "ion-fab-button",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["activated", "closeIcon", "color", "disabled", "download", "href", "mode", "rel", "routerAnimation", "routerDirection", "show", "size", "target", "translucent", "type"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a30;
var IonFabList = (_a30 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a30, "ɵfac", function IonFabList_Factory(t) {
  return new (t || _a30)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a30, "ɵcmp", ɵɵdefineComponent({
  type: _a30,
  selectors: [["ion-fab-list"]],
  inputs: {
    activated: "activated",
    side: "side"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonFabList_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a30);
IonFabList = __decorate([ProxyCmp2({
  inputs: ["activated", "side"]
})], IonFabList);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonFabList, [{
    type: Component,
    args: [{
      selector: "ion-fab-list",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["activated", "side"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a31;
var IonFooter = (_a31 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a31, "ɵfac", function IonFooter_Factory(t) {
  return new (t || _a31)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a31, "ɵcmp", ɵɵdefineComponent({
  type: _a31,
  selectors: [["ion-footer"]],
  inputs: {
    collapse: "collapse",
    mode: "mode",
    translucent: "translucent"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonFooter_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a31);
IonFooter = __decorate([ProxyCmp2({
  inputs: ["collapse", "mode", "translucent"]
})], IonFooter);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonFooter, [{
    type: Component,
    args: [{
      selector: "ion-footer",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["collapse", "mode", "translucent"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a32;
var IonGrid = (_a32 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a32, "ɵfac", function IonGrid_Factory(t) {
  return new (t || _a32)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a32, "ɵcmp", ɵɵdefineComponent({
  type: _a32,
  selectors: [["ion-grid"]],
  inputs: {
    fixed: "fixed"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonGrid_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a32);
IonGrid = __decorate([ProxyCmp2({
  inputs: ["fixed"]
})], IonGrid);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonGrid, [{
    type: Component,
    args: [{
      selector: "ion-grid",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["fixed"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a33;
var IonHeader = (_a33 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a33, "ɵfac", function IonHeader_Factory(t) {
  return new (t || _a33)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a33, "ɵcmp", ɵɵdefineComponent({
  type: _a33,
  selectors: [["ion-header"]],
  inputs: {
    collapse: "collapse",
    mode: "mode",
    translucent: "translucent"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonHeader_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a33);
IonHeader = __decorate([ProxyCmp2({
  inputs: ["collapse", "mode", "translucent"]
})], IonHeader);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonHeader, [{
    type: Component,
    args: [{
      selector: "ion-header",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["collapse", "mode", "translucent"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a34;
var IonIcon = (_a34 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a34, "ɵfac", function IonIcon_Factory(t) {
  return new (t || _a34)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a34, "ɵcmp", ɵɵdefineComponent({
  type: _a34,
  selectors: [["ion-icon"]],
  inputs: {
    color: "color",
    flipRtl: "flipRtl",
    icon: "icon",
    ios: "ios",
    lazy: "lazy",
    md: "md",
    mode: "mode",
    name: "name",
    sanitize: "sanitize",
    size: "size",
    src: "src"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonIcon_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a34);
IonIcon = __decorate([ProxyCmp2({
  inputs: ["color", "flipRtl", "icon", "ios", "lazy", "md", "mode", "name", "sanitize", "size", "src"]
})], IonIcon);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonIcon, [{
    type: Component,
    args: [{
      selector: "ion-icon",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "flipRtl", "icon", "ios", "lazy", "md", "mode", "name", "sanitize", "size", "src"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a35;
var IonImg = (_a35 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionImgWillLoad", "ionImgDidLoad", "ionError"]);
  }
}, /** @nocollapse */
__publicField(_a35, "ɵfac", function IonImg_Factory(t) {
  return new (t || _a35)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a35, "ɵcmp", ɵɵdefineComponent({
  type: _a35,
  selectors: [["ion-img"]],
  inputs: {
    alt: "alt",
    src: "src"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonImg_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a35);
IonImg = __decorate([ProxyCmp2({
  inputs: ["alt", "src"]
})], IonImg);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonImg, [{
    type: Component,
    args: [{
      selector: "ion-img",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["alt", "src"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a36;
var IonInfiniteScroll = (_a36 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionInfinite"]);
  }
}, /** @nocollapse */
__publicField(_a36, "ɵfac", function IonInfiniteScroll_Factory(t) {
  return new (t || _a36)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a36, "ɵcmp", ɵɵdefineComponent({
  type: _a36,
  selectors: [["ion-infinite-scroll"]],
  inputs: {
    disabled: "disabled",
    position: "position",
    threshold: "threshold"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonInfiniteScroll_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a36);
IonInfiniteScroll = __decorate([ProxyCmp2({
  inputs: ["disabled", "position", "threshold"],
  methods: ["complete"]
})], IonInfiniteScroll);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonInfiniteScroll, [{
    type: Component,
    args: [{
      selector: "ion-infinite-scroll",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["disabled", "position", "threshold"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a37;
var IonInfiniteScrollContent = (_a37 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a37, "ɵfac", function IonInfiniteScrollContent_Factory(t) {
  return new (t || _a37)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a37, "ɵcmp", ɵɵdefineComponent({
  type: _a37,
  selectors: [["ion-infinite-scroll-content"]],
  inputs: {
    loadingSpinner: "loadingSpinner",
    loadingText: "loadingText"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonInfiniteScrollContent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a37);
IonInfiniteScrollContent = __decorate([ProxyCmp2({
  inputs: ["loadingSpinner", "loadingText"]
})], IonInfiniteScrollContent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonInfiniteScrollContent, [{
    type: Component,
    args: [{
      selector: "ion-infinite-scroll-content",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["loadingSpinner", "loadingText"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a38;
var IonInput = (_a38 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionInput", "ionChange", "ionBlur", "ionFocus"]);
  }
}, /** @nocollapse */
__publicField(_a38, "ɵfac", function IonInput_Factory(t) {
  return new (t || _a38)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a38, "ɵcmp", ɵɵdefineComponent({
  type: _a38,
  selectors: [["ion-input"]],
  inputs: {
    autocapitalize: "autocapitalize",
    autocomplete: "autocomplete",
    autocorrect: "autocorrect",
    autofocus: "autofocus",
    clearInput: "clearInput",
    clearInputIcon: "clearInputIcon",
    clearOnEdit: "clearOnEdit",
    color: "color",
    counter: "counter",
    counterFormatter: "counterFormatter",
    debounce: "debounce",
    disabled: "disabled",
    enterkeyhint: "enterkeyhint",
    errorText: "errorText",
    fill: "fill",
    helperText: "helperText",
    inputmode: "inputmode",
    label: "label",
    labelPlacement: "labelPlacement",
    max: "max",
    maxlength: "maxlength",
    min: "min",
    minlength: "minlength",
    mode: "mode",
    multiple: "multiple",
    name: "name",
    pattern: "pattern",
    placeholder: "placeholder",
    readonly: "readonly",
    required: "required",
    shape: "shape",
    spellcheck: "spellcheck",
    step: "step",
    type: "type",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonInput_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a38);
IonInput = __decorate([ProxyCmp2({
  inputs: ["autocapitalize", "autocomplete", "autocorrect", "autofocus", "clearInput", "clearInputIcon", "clearOnEdit", "color", "counter", "counterFormatter", "debounce", "disabled", "enterkeyhint", "errorText", "fill", "helperText", "inputmode", "label", "labelPlacement", "max", "maxlength", "min", "minlength", "mode", "multiple", "name", "pattern", "placeholder", "readonly", "required", "shape", "spellcheck", "step", "type", "value"],
  methods: ["setFocus", "getInputElement"]
})], IonInput);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonInput, [{
    type: Component,
    args: [{
      selector: "ion-input",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["autocapitalize", "autocomplete", "autocorrect", "autofocus", "clearInput", "clearInputIcon", "clearOnEdit", "color", "counter", "counterFormatter", "debounce", "disabled", "enterkeyhint", "errorText", "fill", "helperText", "inputmode", "label", "labelPlacement", "max", "maxlength", "min", "minlength", "mode", "multiple", "name", "pattern", "placeholder", "readonly", "required", "shape", "spellcheck", "step", "type", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a39;
var IonInputPasswordToggle = (_a39 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a39, "ɵfac", function IonInputPasswordToggle_Factory(t) {
  return new (t || _a39)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a39, "ɵcmp", ɵɵdefineComponent({
  type: _a39,
  selectors: [["ion-input-password-toggle"]],
  inputs: {
    color: "color",
    hideIcon: "hideIcon",
    mode: "mode",
    showIcon: "showIcon"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonInputPasswordToggle_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a39);
IonInputPasswordToggle = __decorate([ProxyCmp2({
  inputs: ["color", "hideIcon", "mode", "showIcon"]
})], IonInputPasswordToggle);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonInputPasswordToggle, [{
    type: Component,
    args: [{
      selector: "ion-input-password-toggle",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "hideIcon", "mode", "showIcon"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a40;
var IonItem = (_a40 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a40, "ɵfac", function IonItem_Factory(t) {
  return new (t || _a40)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a40, "ɵcmp", ɵɵdefineComponent({
  type: _a40,
  selectors: [["ion-item"]],
  inputs: {
    button: "button",
    color: "color",
    detail: "detail",
    detailIcon: "detailIcon",
    disabled: "disabled",
    download: "download",
    href: "href",
    lines: "lines",
    mode: "mode",
    rel: "rel",
    routerAnimation: "routerAnimation",
    routerDirection: "routerDirection",
    target: "target",
    type: "type"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonItem_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a40);
IonItem = __decorate([ProxyCmp2({
  inputs: ["button", "color", "detail", "detailIcon", "disabled", "download", "href", "lines", "mode", "rel", "routerAnimation", "routerDirection", "target", "type"]
})], IonItem);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonItem, [{
    type: Component,
    args: [{
      selector: "ion-item",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["button", "color", "detail", "detailIcon", "disabled", "download", "href", "lines", "mode", "rel", "routerAnimation", "routerDirection", "target", "type"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a41;
var IonItemDivider = (_a41 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a41, "ɵfac", function IonItemDivider_Factory(t) {
  return new (t || _a41)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a41, "ɵcmp", ɵɵdefineComponent({
  type: _a41,
  selectors: [["ion-item-divider"]],
  inputs: {
    color: "color",
    mode: "mode",
    sticky: "sticky"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonItemDivider_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a41);
IonItemDivider = __decorate([ProxyCmp2({
  inputs: ["color", "mode", "sticky"]
})], IonItemDivider);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonItemDivider, [{
    type: Component,
    args: [{
      selector: "ion-item-divider",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "mode", "sticky"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a42;
var IonItemGroup = (_a42 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a42, "ɵfac", function IonItemGroup_Factory(t) {
  return new (t || _a42)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a42, "ɵcmp", ɵɵdefineComponent({
  type: _a42,
  selectors: [["ion-item-group"]],
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonItemGroup_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a42);
IonItemGroup = __decorate([ProxyCmp2({})], IonItemGroup);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonItemGroup, [{
    type: Component,
    args: [{
      selector: "ion-item-group",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: []
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a43;
var IonItemOption = (_a43 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a43, "ɵfac", function IonItemOption_Factory(t) {
  return new (t || _a43)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a43, "ɵcmp", ɵɵdefineComponent({
  type: _a43,
  selectors: [["ion-item-option"]],
  inputs: {
    color: "color",
    disabled: "disabled",
    download: "download",
    expandable: "expandable",
    href: "href",
    mode: "mode",
    rel: "rel",
    target: "target",
    type: "type"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonItemOption_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a43);
IonItemOption = __decorate([ProxyCmp2({
  inputs: ["color", "disabled", "download", "expandable", "href", "mode", "rel", "target", "type"]
})], IonItemOption);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonItemOption, [{
    type: Component,
    args: [{
      selector: "ion-item-option",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "disabled", "download", "expandable", "href", "mode", "rel", "target", "type"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a44;
var IonItemOptions = (_a44 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionSwipe"]);
  }
}, /** @nocollapse */
__publicField(_a44, "ɵfac", function IonItemOptions_Factory(t) {
  return new (t || _a44)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a44, "ɵcmp", ɵɵdefineComponent({
  type: _a44,
  selectors: [["ion-item-options"]],
  inputs: {
    side: "side"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonItemOptions_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a44);
IonItemOptions = __decorate([ProxyCmp2({
  inputs: ["side"]
})], IonItemOptions);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonItemOptions, [{
    type: Component,
    args: [{
      selector: "ion-item-options",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["side"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a45;
var IonItemSliding = (_a45 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionDrag"]);
  }
}, /** @nocollapse */
__publicField(_a45, "ɵfac", function IonItemSliding_Factory(t) {
  return new (t || _a45)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a45, "ɵcmp", ɵɵdefineComponent({
  type: _a45,
  selectors: [["ion-item-sliding"]],
  inputs: {
    disabled: "disabled"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonItemSliding_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a45);
IonItemSliding = __decorate([ProxyCmp2({
  inputs: ["disabled"],
  methods: ["getOpenAmount", "getSlidingRatio", "open", "close", "closeOpened"]
})], IonItemSliding);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonItemSliding, [{
    type: Component,
    args: [{
      selector: "ion-item-sliding",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["disabled"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a46;
var IonLabel = (_a46 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a46, "ɵfac", function IonLabel_Factory(t) {
  return new (t || _a46)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a46, "ɵcmp", ɵɵdefineComponent({
  type: _a46,
  selectors: [["ion-label"]],
  inputs: {
    color: "color",
    mode: "mode",
    position: "position"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonLabel_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a46);
IonLabel = __decorate([ProxyCmp2({
  inputs: ["color", "mode", "position"]
})], IonLabel);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonLabel, [{
    type: Component,
    args: [{
      selector: "ion-label",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "mode", "position"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a47;
var IonList = (_a47 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a47, "ɵfac", function IonList_Factory(t) {
  return new (t || _a47)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a47, "ɵcmp", ɵɵdefineComponent({
  type: _a47,
  selectors: [["ion-list"]],
  inputs: {
    inset: "inset",
    lines: "lines",
    mode: "mode"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonList_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a47);
IonList = __decorate([ProxyCmp2({
  inputs: ["inset", "lines", "mode"],
  methods: ["closeSlidingItems"]
})], IonList);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonList, [{
    type: Component,
    args: [{
      selector: "ion-list",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["inset", "lines", "mode"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a48;
var IonListHeader = (_a48 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a48, "ɵfac", function IonListHeader_Factory(t) {
  return new (t || _a48)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a48, "ɵcmp", ɵɵdefineComponent({
  type: _a48,
  selectors: [["ion-list-header"]],
  inputs: {
    color: "color",
    lines: "lines",
    mode: "mode"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonListHeader_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a48);
IonListHeader = __decorate([ProxyCmp2({
  inputs: ["color", "lines", "mode"]
})], IonListHeader);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonListHeader, [{
    type: Component,
    args: [{
      selector: "ion-list-header",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "lines", "mode"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a49;
var IonLoading = (_a49 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionLoadingDidPresent", "ionLoadingWillPresent", "ionLoadingWillDismiss", "ionLoadingDidDismiss", "didPresent", "willPresent", "willDismiss", "didDismiss"]);
  }
}, /** @nocollapse */
__publicField(_a49, "ɵfac", function IonLoading_Factory(t) {
  return new (t || _a49)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a49, "ɵcmp", ɵɵdefineComponent({
  type: _a49,
  selectors: [["ion-loading"]],
  inputs: {
    animated: "animated",
    backdropDismiss: "backdropDismiss",
    cssClass: "cssClass",
    duration: "duration",
    enterAnimation: "enterAnimation",
    htmlAttributes: "htmlAttributes",
    isOpen: "isOpen",
    keyboardClose: "keyboardClose",
    leaveAnimation: "leaveAnimation",
    message: "message",
    mode: "mode",
    showBackdrop: "showBackdrop",
    spinner: "spinner",
    translucent: "translucent",
    trigger: "trigger"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonLoading_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a49);
IonLoading = __decorate([ProxyCmp2({
  inputs: ["animated", "backdropDismiss", "cssClass", "duration", "enterAnimation", "htmlAttributes", "isOpen", "keyboardClose", "leaveAnimation", "message", "mode", "showBackdrop", "spinner", "translucent", "trigger"],
  methods: ["present", "dismiss", "onDidDismiss", "onWillDismiss"]
})], IonLoading);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonLoading, [{
    type: Component,
    args: [{
      selector: "ion-loading",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["animated", "backdropDismiss", "cssClass", "duration", "enterAnimation", "htmlAttributes", "isOpen", "keyboardClose", "leaveAnimation", "message", "mode", "showBackdrop", "spinner", "translucent", "trigger"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a50;
var IonMenu = (_a50 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionWillOpen", "ionWillClose", "ionDidOpen", "ionDidClose"]);
  }
}, /** @nocollapse */
__publicField(_a50, "ɵfac", function IonMenu_Factory(t) {
  return new (t || _a50)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a50, "ɵcmp", ɵɵdefineComponent({
  type: _a50,
  selectors: [["ion-menu"]],
  inputs: {
    contentId: "contentId",
    disabled: "disabled",
    maxEdgeStart: "maxEdgeStart",
    menuId: "menuId",
    side: "side",
    swipeGesture: "swipeGesture",
    type: "type"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonMenu_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a50);
IonMenu = __decorate([ProxyCmp2({
  inputs: ["contentId", "disabled", "maxEdgeStart", "menuId", "side", "swipeGesture", "type"],
  methods: ["isOpen", "isActive", "open", "close", "toggle", "setOpen"]
})], IonMenu);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonMenu, [{
    type: Component,
    args: [{
      selector: "ion-menu",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["contentId", "disabled", "maxEdgeStart", "menuId", "side", "swipeGesture", "type"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a51;
var IonMenuButton = (_a51 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a51, "ɵfac", function IonMenuButton_Factory(t) {
  return new (t || _a51)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a51, "ɵcmp", ɵɵdefineComponent({
  type: _a51,
  selectors: [["ion-menu-button"]],
  inputs: {
    autoHide: "autoHide",
    color: "color",
    disabled: "disabled",
    menu: "menu",
    mode: "mode",
    type: "type"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonMenuButton_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a51);
IonMenuButton = __decorate([ProxyCmp2({
  inputs: ["autoHide", "color", "disabled", "menu", "mode", "type"]
})], IonMenuButton);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonMenuButton, [{
    type: Component,
    args: [{
      selector: "ion-menu-button",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["autoHide", "color", "disabled", "menu", "mode", "type"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a52;
var IonMenuToggle = (_a52 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a52, "ɵfac", function IonMenuToggle_Factory(t) {
  return new (t || _a52)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a52, "ɵcmp", ɵɵdefineComponent({
  type: _a52,
  selectors: [["ion-menu-toggle"]],
  inputs: {
    autoHide: "autoHide",
    menu: "menu"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonMenuToggle_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a52);
IonMenuToggle = __decorate([ProxyCmp2({
  inputs: ["autoHide", "menu"]
})], IonMenuToggle);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonMenuToggle, [{
    type: Component,
    args: [{
      selector: "ion-menu-toggle",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["autoHide", "menu"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a53;
var IonNavLink = (_a53 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a53, "ɵfac", function IonNavLink_Factory(t) {
  return new (t || _a53)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a53, "ɵcmp", ɵɵdefineComponent({
  type: _a53,
  selectors: [["ion-nav-link"]],
  inputs: {
    component: "component",
    componentProps: "componentProps",
    routerAnimation: "routerAnimation",
    routerDirection: "routerDirection"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonNavLink_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a53);
IonNavLink = __decorate([ProxyCmp2({
  inputs: ["component", "componentProps", "routerAnimation", "routerDirection"]
})], IonNavLink);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonNavLink, [{
    type: Component,
    args: [{
      selector: "ion-nav-link",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["component", "componentProps", "routerAnimation", "routerDirection"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a54;
var IonNote = (_a54 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a54, "ɵfac", function IonNote_Factory(t) {
  return new (t || _a54)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a54, "ɵcmp", ɵɵdefineComponent({
  type: _a54,
  selectors: [["ion-note"]],
  inputs: {
    color: "color",
    mode: "mode"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonNote_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a54);
IonNote = __decorate([ProxyCmp2({
  inputs: ["color", "mode"]
})], IonNote);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonNote, [{
    type: Component,
    args: [{
      selector: "ion-note",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "mode"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a55;
var IonPicker = (_a55 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a55, "ɵfac", function IonPicker_Factory(t) {
  return new (t || _a55)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a55, "ɵcmp", ɵɵdefineComponent({
  type: _a55,
  selectors: [["ion-picker"]],
  inputs: {
    mode: "mode"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonPicker_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a55);
IonPicker = __decorate([ProxyCmp2({
  inputs: ["mode"]
})], IonPicker);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonPicker, [{
    type: Component,
    args: [{
      selector: "ion-picker",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["mode"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a56;
var IonPickerColumn = (_a56 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionChange"]);
  }
}, /** @nocollapse */
__publicField(_a56, "ɵfac", function IonPickerColumn_Factory(t) {
  return new (t || _a56)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a56, "ɵcmp", ɵɵdefineComponent({
  type: _a56,
  selectors: [["ion-picker-column"]],
  inputs: {
    color: "color",
    disabled: "disabled",
    mode: "mode",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonPickerColumn_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a56);
IonPickerColumn = __decorate([ProxyCmp2({
  inputs: ["color", "disabled", "mode", "value"],
  methods: ["setFocus"]
})], IonPickerColumn);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonPickerColumn, [{
    type: Component,
    args: [{
      selector: "ion-picker-column",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "disabled", "mode", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a57;
var IonPickerColumnOption = (_a57 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a57, "ɵfac", function IonPickerColumnOption_Factory(t) {
  return new (t || _a57)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a57, "ɵcmp", ɵɵdefineComponent({
  type: _a57,
  selectors: [["ion-picker-column-option"]],
  inputs: {
    color: "color",
    disabled: "disabled",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonPickerColumnOption_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a57);
IonPickerColumnOption = __decorate([ProxyCmp2({
  inputs: ["color", "disabled", "value"]
})], IonPickerColumnOption);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonPickerColumnOption, [{
    type: Component,
    args: [{
      selector: "ion-picker-column-option",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "disabled", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a58;
var IonPickerLegacy = (_a58 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionPickerDidPresent", "ionPickerWillPresent", "ionPickerWillDismiss", "ionPickerDidDismiss", "didPresent", "willPresent", "willDismiss", "didDismiss"]);
  }
}, /** @nocollapse */
__publicField(_a58, "ɵfac", function IonPickerLegacy_Factory(t) {
  return new (t || _a58)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a58, "ɵcmp", ɵɵdefineComponent({
  type: _a58,
  selectors: [["ion-picker-legacy"]],
  inputs: {
    animated: "animated",
    backdropDismiss: "backdropDismiss",
    buttons: "buttons",
    columns: "columns",
    cssClass: "cssClass",
    duration: "duration",
    enterAnimation: "enterAnimation",
    htmlAttributes: "htmlAttributes",
    isOpen: "isOpen",
    keyboardClose: "keyboardClose",
    leaveAnimation: "leaveAnimation",
    mode: "mode",
    showBackdrop: "showBackdrop",
    trigger: "trigger"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonPickerLegacy_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a58);
IonPickerLegacy = __decorate([ProxyCmp2({
  inputs: ["animated", "backdropDismiss", "buttons", "columns", "cssClass", "duration", "enterAnimation", "htmlAttributes", "isOpen", "keyboardClose", "leaveAnimation", "mode", "showBackdrop", "trigger"],
  methods: ["present", "dismiss", "onDidDismiss", "onWillDismiss", "getColumn"]
})], IonPickerLegacy);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonPickerLegacy, [{
    type: Component,
    args: [{
      selector: "ion-picker-legacy",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["animated", "backdropDismiss", "buttons", "columns", "cssClass", "duration", "enterAnimation", "htmlAttributes", "isOpen", "keyboardClose", "leaveAnimation", "mode", "showBackdrop", "trigger"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a59;
var IonProgressBar = (_a59 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a59, "ɵfac", function IonProgressBar_Factory(t) {
  return new (t || _a59)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a59, "ɵcmp", ɵɵdefineComponent({
  type: _a59,
  selectors: [["ion-progress-bar"]],
  inputs: {
    buffer: "buffer",
    color: "color",
    mode: "mode",
    reversed: "reversed",
    type: "type",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonProgressBar_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a59);
IonProgressBar = __decorate([ProxyCmp2({
  inputs: ["buffer", "color", "mode", "reversed", "type", "value"]
})], IonProgressBar);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonProgressBar, [{
    type: Component,
    args: [{
      selector: "ion-progress-bar",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["buffer", "color", "mode", "reversed", "type", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a60;
var IonRadio = (_a60 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionFocus", "ionBlur"]);
  }
}, /** @nocollapse */
__publicField(_a60, "ɵfac", function IonRadio_Factory(t) {
  return new (t || _a60)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a60, "ɵcmp", ɵɵdefineComponent({
  type: _a60,
  selectors: [["ion-radio"]],
  inputs: {
    alignment: "alignment",
    color: "color",
    disabled: "disabled",
    justify: "justify",
    labelPlacement: "labelPlacement",
    mode: "mode",
    name: "name",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonRadio_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a60);
IonRadio = __decorate([ProxyCmp2({
  inputs: ["alignment", "color", "disabled", "justify", "labelPlacement", "mode", "name", "value"]
})], IonRadio);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonRadio, [{
    type: Component,
    args: [{
      selector: "ion-radio",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["alignment", "color", "disabled", "justify", "labelPlacement", "mode", "name", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a61;
var IonRadioGroup = (_a61 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionChange"]);
  }
}, /** @nocollapse */
__publicField(_a61, "ɵfac", function IonRadioGroup_Factory(t) {
  return new (t || _a61)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a61, "ɵcmp", ɵɵdefineComponent({
  type: _a61,
  selectors: [["ion-radio-group"]],
  inputs: {
    allowEmptySelection: "allowEmptySelection",
    compareWith: "compareWith",
    name: "name",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonRadioGroup_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a61);
IonRadioGroup = __decorate([ProxyCmp2({
  inputs: ["allowEmptySelection", "compareWith", "name", "value"]
})], IonRadioGroup);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonRadioGroup, [{
    type: Component,
    args: [{
      selector: "ion-radio-group",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["allowEmptySelection", "compareWith", "name", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a62;
var IonRange = (_a62 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionChange", "ionInput", "ionFocus", "ionBlur", "ionKnobMoveStart", "ionKnobMoveEnd"]);
  }
}, /** @nocollapse */
__publicField(_a62, "ɵfac", function IonRange_Factory(t) {
  return new (t || _a62)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a62, "ɵcmp", ɵɵdefineComponent({
  type: _a62,
  selectors: [["ion-range"]],
  inputs: {
    activeBarStart: "activeBarStart",
    color: "color",
    debounce: "debounce",
    disabled: "disabled",
    dualKnobs: "dualKnobs",
    label: "label",
    labelPlacement: "labelPlacement",
    max: "max",
    min: "min",
    mode: "mode",
    name: "name",
    pin: "pin",
    pinFormatter: "pinFormatter",
    snaps: "snaps",
    step: "step",
    ticks: "ticks",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonRange_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a62);
IonRange = __decorate([ProxyCmp2({
  inputs: ["activeBarStart", "color", "debounce", "disabled", "dualKnobs", "label", "labelPlacement", "max", "min", "mode", "name", "pin", "pinFormatter", "snaps", "step", "ticks", "value"]
})], IonRange);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonRange, [{
    type: Component,
    args: [{
      selector: "ion-range",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["activeBarStart", "color", "debounce", "disabled", "dualKnobs", "label", "labelPlacement", "max", "min", "mode", "name", "pin", "pinFormatter", "snaps", "step", "ticks", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a63;
var IonRefresher = (_a63 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionRefresh", "ionPull", "ionStart"]);
  }
}, /** @nocollapse */
__publicField(_a63, "ɵfac", function IonRefresher_Factory(t) {
  return new (t || _a63)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a63, "ɵcmp", ɵɵdefineComponent({
  type: _a63,
  selectors: [["ion-refresher"]],
  inputs: {
    closeDuration: "closeDuration",
    disabled: "disabled",
    mode: "mode",
    pullFactor: "pullFactor",
    pullMax: "pullMax",
    pullMin: "pullMin",
    snapbackDuration: "snapbackDuration"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonRefresher_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a63);
IonRefresher = __decorate([ProxyCmp2({
  inputs: ["closeDuration", "disabled", "mode", "pullFactor", "pullMax", "pullMin", "snapbackDuration"],
  methods: ["complete", "cancel", "getProgress"]
})], IonRefresher);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonRefresher, [{
    type: Component,
    args: [{
      selector: "ion-refresher",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["closeDuration", "disabled", "mode", "pullFactor", "pullMax", "pullMin", "snapbackDuration"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a64;
var IonRefresherContent = (_a64 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a64, "ɵfac", function IonRefresherContent_Factory(t) {
  return new (t || _a64)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a64, "ɵcmp", ɵɵdefineComponent({
  type: _a64,
  selectors: [["ion-refresher-content"]],
  inputs: {
    pullingIcon: "pullingIcon",
    pullingText: "pullingText",
    refreshingSpinner: "refreshingSpinner",
    refreshingText: "refreshingText"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonRefresherContent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a64);
IonRefresherContent = __decorate([ProxyCmp2({
  inputs: ["pullingIcon", "pullingText", "refreshingSpinner", "refreshingText"]
})], IonRefresherContent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonRefresherContent, [{
    type: Component,
    args: [{
      selector: "ion-refresher-content",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["pullingIcon", "pullingText", "refreshingSpinner", "refreshingText"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a65;
var IonReorder = (_a65 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a65, "ɵfac", function IonReorder_Factory(t) {
  return new (t || _a65)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a65, "ɵcmp", ɵɵdefineComponent({
  type: _a65,
  selectors: [["ion-reorder"]],
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonReorder_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a65);
IonReorder = __decorate([ProxyCmp2({})], IonReorder);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonReorder, [{
    type: Component,
    args: [{
      selector: "ion-reorder",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: []
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a66;
var IonReorderGroup = (_a66 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionItemReorder"]);
  }
}, /** @nocollapse */
__publicField(_a66, "ɵfac", function IonReorderGroup_Factory(t) {
  return new (t || _a66)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a66, "ɵcmp", ɵɵdefineComponent({
  type: _a66,
  selectors: [["ion-reorder-group"]],
  inputs: {
    disabled: "disabled"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonReorderGroup_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a66);
IonReorderGroup = __decorate([ProxyCmp2({
  inputs: ["disabled"],
  methods: ["complete"]
})], IonReorderGroup);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonReorderGroup, [{
    type: Component,
    args: [{
      selector: "ion-reorder-group",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["disabled"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a67;
var IonRippleEffect = (_a67 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a67, "ɵfac", function IonRippleEffect_Factory(t) {
  return new (t || _a67)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a67, "ɵcmp", ɵɵdefineComponent({
  type: _a67,
  selectors: [["ion-ripple-effect"]],
  inputs: {
    type: "type"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonRippleEffect_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a67);
IonRippleEffect = __decorate([ProxyCmp2({
  inputs: ["type"],
  methods: ["addRipple"]
})], IonRippleEffect);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonRippleEffect, [{
    type: Component,
    args: [{
      selector: "ion-ripple-effect",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["type"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a68;
var IonRow = (_a68 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a68, "ɵfac", function IonRow_Factory(t) {
  return new (t || _a68)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a68, "ɵcmp", ɵɵdefineComponent({
  type: _a68,
  selectors: [["ion-row"]],
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonRow_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a68);
IonRow = __decorate([ProxyCmp2({})], IonRow);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonRow, [{
    type: Component,
    args: [{
      selector: "ion-row",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: []
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a69;
var IonSearchbar = (_a69 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionInput", "ionChange", "ionCancel", "ionClear", "ionBlur", "ionFocus"]);
  }
}, /** @nocollapse */
__publicField(_a69, "ɵfac", function IonSearchbar_Factory(t) {
  return new (t || _a69)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a69, "ɵcmp", ɵɵdefineComponent({
  type: _a69,
  selectors: [["ion-searchbar"]],
  inputs: {
    animated: "animated",
    autocapitalize: "autocapitalize",
    autocomplete: "autocomplete",
    autocorrect: "autocorrect",
    cancelButtonIcon: "cancelButtonIcon",
    cancelButtonText: "cancelButtonText",
    clearIcon: "clearIcon",
    color: "color",
    debounce: "debounce",
    disabled: "disabled",
    enterkeyhint: "enterkeyhint",
    inputmode: "inputmode",
    maxlength: "maxlength",
    minlength: "minlength",
    mode: "mode",
    name: "name",
    placeholder: "placeholder",
    searchIcon: "searchIcon",
    showCancelButton: "showCancelButton",
    showClearButton: "showClearButton",
    spellcheck: "spellcheck",
    type: "type",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonSearchbar_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a69);
IonSearchbar = __decorate([ProxyCmp2({
  inputs: ["animated", "autocapitalize", "autocomplete", "autocorrect", "cancelButtonIcon", "cancelButtonText", "clearIcon", "color", "debounce", "disabled", "enterkeyhint", "inputmode", "maxlength", "minlength", "mode", "name", "placeholder", "searchIcon", "showCancelButton", "showClearButton", "spellcheck", "type", "value"],
  methods: ["setFocus", "getInputElement"]
})], IonSearchbar);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonSearchbar, [{
    type: Component,
    args: [{
      selector: "ion-searchbar",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["animated", "autocapitalize", "autocomplete", "autocorrect", "cancelButtonIcon", "cancelButtonText", "clearIcon", "color", "debounce", "disabled", "enterkeyhint", "inputmode", "maxlength", "minlength", "mode", "name", "placeholder", "searchIcon", "showCancelButton", "showClearButton", "spellcheck", "type", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a70;
var IonSegment = (_a70 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionChange"]);
  }
}, /** @nocollapse */
__publicField(_a70, "ɵfac", function IonSegment_Factory(t) {
  return new (t || _a70)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a70, "ɵcmp", ɵɵdefineComponent({
  type: _a70,
  selectors: [["ion-segment"]],
  inputs: {
    color: "color",
    disabled: "disabled",
    mode: "mode",
    scrollable: "scrollable",
    selectOnFocus: "selectOnFocus",
    swipeGesture: "swipeGesture",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonSegment_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a70);
IonSegment = __decorate([ProxyCmp2({
  inputs: ["color", "disabled", "mode", "scrollable", "selectOnFocus", "swipeGesture", "value"]
})], IonSegment);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonSegment, [{
    type: Component,
    args: [{
      selector: "ion-segment",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "disabled", "mode", "scrollable", "selectOnFocus", "swipeGesture", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a71;
var IonSegmentButton = (_a71 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a71, "ɵfac", function IonSegmentButton_Factory(t) {
  return new (t || _a71)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a71, "ɵcmp", ɵɵdefineComponent({
  type: _a71,
  selectors: [["ion-segment-button"]],
  inputs: {
    disabled: "disabled",
    layout: "layout",
    mode: "mode",
    type: "type",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonSegmentButton_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a71);
IonSegmentButton = __decorate([ProxyCmp2({
  inputs: ["disabled", "layout", "mode", "type", "value"]
})], IonSegmentButton);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonSegmentButton, [{
    type: Component,
    args: [{
      selector: "ion-segment-button",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["disabled", "layout", "mode", "type", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a72;
var IonSelect = (_a72 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionChange", "ionCancel", "ionDismiss", "ionFocus", "ionBlur"]);
  }
}, /** @nocollapse */
__publicField(_a72, "ɵfac", function IonSelect_Factory(t) {
  return new (t || _a72)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a72, "ɵcmp", ɵɵdefineComponent({
  type: _a72,
  selectors: [["ion-select"]],
  inputs: {
    cancelText: "cancelText",
    color: "color",
    compareWith: "compareWith",
    disabled: "disabled",
    expandedIcon: "expandedIcon",
    fill: "fill",
    interface: "interface",
    interfaceOptions: "interfaceOptions",
    justify: "justify",
    label: "label",
    labelPlacement: "labelPlacement",
    mode: "mode",
    multiple: "multiple",
    name: "name",
    okText: "okText",
    placeholder: "placeholder",
    selectedText: "selectedText",
    shape: "shape",
    toggleIcon: "toggleIcon",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonSelect_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a72);
IonSelect = __decorate([ProxyCmp2({
  inputs: ["cancelText", "color", "compareWith", "disabled", "expandedIcon", "fill", "interface", "interfaceOptions", "justify", "label", "labelPlacement", "mode", "multiple", "name", "okText", "placeholder", "selectedText", "shape", "toggleIcon", "value"],
  methods: ["open"]
})], IonSelect);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonSelect, [{
    type: Component,
    args: [{
      selector: "ion-select",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["cancelText", "color", "compareWith", "disabled", "expandedIcon", "fill", "interface", "interfaceOptions", "justify", "label", "labelPlacement", "mode", "multiple", "name", "okText", "placeholder", "selectedText", "shape", "toggleIcon", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a73;
var IonSelectOption = (_a73 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a73, "ɵfac", function IonSelectOption_Factory(t) {
  return new (t || _a73)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a73, "ɵcmp", ɵɵdefineComponent({
  type: _a73,
  selectors: [["ion-select-option"]],
  inputs: {
    disabled: "disabled",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonSelectOption_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a73);
IonSelectOption = __decorate([ProxyCmp2({
  inputs: ["disabled", "value"]
})], IonSelectOption);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonSelectOption, [{
    type: Component,
    args: [{
      selector: "ion-select-option",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["disabled", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a74;
var IonSkeletonText = (_a74 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a74, "ɵfac", function IonSkeletonText_Factory(t) {
  return new (t || _a74)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a74, "ɵcmp", ɵɵdefineComponent({
  type: _a74,
  selectors: [["ion-skeleton-text"]],
  inputs: {
    animated: "animated"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonSkeletonText_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a74);
IonSkeletonText = __decorate([ProxyCmp2({
  inputs: ["animated"]
})], IonSkeletonText);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonSkeletonText, [{
    type: Component,
    args: [{
      selector: "ion-skeleton-text",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["animated"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a75;
var IonSpinner = (_a75 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a75, "ɵfac", function IonSpinner_Factory(t) {
  return new (t || _a75)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a75, "ɵcmp", ɵɵdefineComponent({
  type: _a75,
  selectors: [["ion-spinner"]],
  inputs: {
    color: "color",
    duration: "duration",
    name: "name",
    paused: "paused"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonSpinner_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a75);
IonSpinner = __decorate([ProxyCmp2({
  inputs: ["color", "duration", "name", "paused"]
})], IonSpinner);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonSpinner, [{
    type: Component,
    args: [{
      selector: "ion-spinner",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "duration", "name", "paused"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a76;
var IonSplitPane = (_a76 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionSplitPaneVisible"]);
  }
}, /** @nocollapse */
__publicField(_a76, "ɵfac", function IonSplitPane_Factory(t) {
  return new (t || _a76)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a76, "ɵcmp", ɵɵdefineComponent({
  type: _a76,
  selectors: [["ion-split-pane"]],
  inputs: {
    contentId: "contentId",
    disabled: "disabled",
    when: "when"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonSplitPane_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a76);
IonSplitPane = __decorate([ProxyCmp2({
  inputs: ["contentId", "disabled", "when"]
})], IonSplitPane);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonSplitPane, [{
    type: Component,
    args: [{
      selector: "ion-split-pane",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["contentId", "disabled", "when"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a77;
var IonTab = (_a77 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a77, "ɵfac", function IonTab_Factory(t) {
  return new (t || _a77)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a77, "ɵcmp", ɵɵdefineComponent({
  type: _a77,
  selectors: [["ion-tab"]],
  inputs: {
    component: "component",
    tab: "tab"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonTab_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a77);
IonTab = __decorate([ProxyCmp2({
  inputs: ["component", "tab"],
  methods: ["setActive"]
})], IonTab);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonTab, [{
    type: Component,
    args: [{
      selector: "ion-tab",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["component", "tab"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a78;
var IonTabBar = (_a78 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a78, "ɵfac", function IonTabBar_Factory(t) {
  return new (t || _a78)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a78, "ɵcmp", ɵɵdefineComponent({
  type: _a78,
  selectors: [["ion-tab-bar"]],
  inputs: {
    color: "color",
    mode: "mode",
    selectedTab: "selectedTab",
    translucent: "translucent"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonTabBar_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a78);
IonTabBar = __decorate([ProxyCmp2({
  inputs: ["color", "mode", "selectedTab", "translucent"]
})], IonTabBar);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonTabBar, [{
    type: Component,
    args: [{
      selector: "ion-tab-bar",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "mode", "selectedTab", "translucent"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a79;
var IonTabButton = (_a79 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a79, "ɵfac", function IonTabButton_Factory(t) {
  return new (t || _a79)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a79, "ɵcmp", ɵɵdefineComponent({
  type: _a79,
  selectors: [["ion-tab-button"]],
  inputs: {
    disabled: "disabled",
    download: "download",
    href: "href",
    layout: "layout",
    mode: "mode",
    rel: "rel",
    selected: "selected",
    tab: "tab",
    target: "target"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonTabButton_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a79);
IonTabButton = __decorate([ProxyCmp2({
  inputs: ["disabled", "download", "href", "layout", "mode", "rel", "selected", "tab", "target"]
})], IonTabButton);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonTabButton, [{
    type: Component,
    args: [{
      selector: "ion-tab-button",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["disabled", "download", "href", "layout", "mode", "rel", "selected", "tab", "target"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a80;
var IonText = (_a80 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a80, "ɵfac", function IonText_Factory(t) {
  return new (t || _a80)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a80, "ɵcmp", ɵɵdefineComponent({
  type: _a80,
  selectors: [["ion-text"]],
  inputs: {
    color: "color",
    mode: "mode"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonText_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a80);
IonText = __decorate([ProxyCmp2({
  inputs: ["color", "mode"]
})], IonText);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonText, [{
    type: Component,
    args: [{
      selector: "ion-text",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "mode"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a81;
var IonTextarea = (_a81 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionChange", "ionInput", "ionBlur", "ionFocus"]);
  }
}, /** @nocollapse */
__publicField(_a81, "ɵfac", function IonTextarea_Factory(t) {
  return new (t || _a81)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a81, "ɵcmp", ɵɵdefineComponent({
  type: _a81,
  selectors: [["ion-textarea"]],
  inputs: {
    autoGrow: "autoGrow",
    autocapitalize: "autocapitalize",
    autofocus: "autofocus",
    clearOnEdit: "clearOnEdit",
    color: "color",
    cols: "cols",
    counter: "counter",
    counterFormatter: "counterFormatter",
    debounce: "debounce",
    disabled: "disabled",
    enterkeyhint: "enterkeyhint",
    errorText: "errorText",
    fill: "fill",
    helperText: "helperText",
    inputmode: "inputmode",
    label: "label",
    labelPlacement: "labelPlacement",
    maxlength: "maxlength",
    minlength: "minlength",
    mode: "mode",
    name: "name",
    placeholder: "placeholder",
    readonly: "readonly",
    required: "required",
    rows: "rows",
    shape: "shape",
    spellcheck: "spellcheck",
    value: "value",
    wrap: "wrap"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonTextarea_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a81);
IonTextarea = __decorate([ProxyCmp2({
  inputs: ["autoGrow", "autocapitalize", "autofocus", "clearOnEdit", "color", "cols", "counter", "counterFormatter", "debounce", "disabled", "enterkeyhint", "errorText", "fill", "helperText", "inputmode", "label", "labelPlacement", "maxlength", "minlength", "mode", "name", "placeholder", "readonly", "required", "rows", "shape", "spellcheck", "value", "wrap"],
  methods: ["setFocus", "getInputElement"]
})], IonTextarea);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonTextarea, [{
    type: Component,
    args: [{
      selector: "ion-textarea",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["autoGrow", "autocapitalize", "autofocus", "clearOnEdit", "color", "cols", "counter", "counterFormatter", "debounce", "disabled", "enterkeyhint", "errorText", "fill", "helperText", "inputmode", "label", "labelPlacement", "maxlength", "minlength", "mode", "name", "placeholder", "readonly", "required", "rows", "shape", "spellcheck", "value", "wrap"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a82;
var IonThumbnail = (_a82 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a82, "ɵfac", function IonThumbnail_Factory(t) {
  return new (t || _a82)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a82, "ɵcmp", ɵɵdefineComponent({
  type: _a82,
  selectors: [["ion-thumbnail"]],
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonThumbnail_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a82);
IonThumbnail = __decorate([ProxyCmp2({})], IonThumbnail);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonThumbnail, [{
    type: Component,
    args: [{
      selector: "ion-thumbnail",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: []
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a83;
var IonTitle = (_a83 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a83, "ɵfac", function IonTitle_Factory(t) {
  return new (t || _a83)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a83, "ɵcmp", ɵɵdefineComponent({
  type: _a83,
  selectors: [["ion-title"]],
  inputs: {
    color: "color",
    size: "size"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonTitle_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a83);
IonTitle = __decorate([ProxyCmp2({
  inputs: ["color", "size"]
})], IonTitle);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonTitle, [{
    type: Component,
    args: [{
      selector: "ion-title",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "size"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a84;
var IonToast = (_a84 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionToastDidPresent", "ionToastWillPresent", "ionToastWillDismiss", "ionToastDidDismiss", "didPresent", "willPresent", "willDismiss", "didDismiss"]);
  }
}, /** @nocollapse */
__publicField(_a84, "ɵfac", function IonToast_Factory(t) {
  return new (t || _a84)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a84, "ɵcmp", ɵɵdefineComponent({
  type: _a84,
  selectors: [["ion-toast"]],
  inputs: {
    animated: "animated",
    buttons: "buttons",
    color: "color",
    cssClass: "cssClass",
    duration: "duration",
    enterAnimation: "enterAnimation",
    header: "header",
    htmlAttributes: "htmlAttributes",
    icon: "icon",
    isOpen: "isOpen",
    keyboardClose: "keyboardClose",
    layout: "layout",
    leaveAnimation: "leaveAnimation",
    message: "message",
    mode: "mode",
    position: "position",
    positionAnchor: "positionAnchor",
    swipeGesture: "swipeGesture",
    translucent: "translucent",
    trigger: "trigger"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonToast_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a84);
IonToast = __decorate([ProxyCmp2({
  inputs: ["animated", "buttons", "color", "cssClass", "duration", "enterAnimation", "header", "htmlAttributes", "icon", "isOpen", "keyboardClose", "layout", "leaveAnimation", "message", "mode", "position", "positionAnchor", "swipeGesture", "translucent", "trigger"],
  methods: ["present", "dismiss", "onDidDismiss", "onWillDismiss"]
})], IonToast);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonToast, [{
    type: Component,
    args: [{
      selector: "ion-toast",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["animated", "buttons", "color", "cssClass", "duration", "enterAnimation", "header", "htmlAttributes", "icon", "isOpen", "keyboardClose", "layout", "leaveAnimation", "message", "mode", "position", "positionAnchor", "swipeGesture", "translucent", "trigger"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a85;
var IonToggle = (_a85 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionChange", "ionFocus", "ionBlur"]);
  }
}, /** @nocollapse */
__publicField(_a85, "ɵfac", function IonToggle_Factory(t) {
  return new (t || _a85)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a85, "ɵcmp", ɵɵdefineComponent({
  type: _a85,
  selectors: [["ion-toggle"]],
  inputs: {
    alignment: "alignment",
    checked: "checked",
    color: "color",
    disabled: "disabled",
    enableOnOffLabels: "enableOnOffLabels",
    justify: "justify",
    labelPlacement: "labelPlacement",
    mode: "mode",
    name: "name",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonToggle_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a85);
IonToggle = __decorate([ProxyCmp2({
  inputs: ["alignment", "checked", "color", "disabled", "enableOnOffLabels", "justify", "labelPlacement", "mode", "name", "value"]
})], IonToggle);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonToggle, [{
    type: Component,
    args: [{
      selector: "ion-toggle",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["alignment", "checked", "color", "disabled", "enableOnOffLabels", "justify", "labelPlacement", "mode", "name", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _a86;
var IonToolbar = (_a86 = class {
  constructor(c, r, z) {
    __publicField(this, "z");
    __publicField(this, "el");
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}, /** @nocollapse */
__publicField(_a86, "ɵfac", function IonToolbar_Factory(t) {
  return new (t || _a86)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
}), /** @nocollapse */
__publicField(_a86, "ɵcmp", ɵɵdefineComponent({
  type: _a86,
  selectors: [["ion-toolbar"]],
  inputs: {
    color: "color",
    mode: "mode"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonToolbar_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
})), _a86);
IonToolbar = __decorate([ProxyCmp2({
  inputs: ["color", "mode"]
})], IonToolbar);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonToolbar, [{
    type: Component,
    args: [{
      selector: "ion-toolbar",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "mode"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var _IonRouterOutlet2 = class _IonRouterOutlet2 extends IonRouterOutlet {
  /**
   * We need to pass in the correct instance of IonRouterOutlet
   * otherwise parentOutlet will be null in a nested outlet context.
   * This results in APIs such as NavController.pop not working
   * in nested outlets because the parent outlet cannot be found.
   */
  constructor(name, tabs, commonLocation, elementRef, router, zone, activatedRoute, parentOutlet) {
    super(name, tabs, commonLocation, elementRef, router, zone, activatedRoute, parentOutlet);
    __publicField(this, "parentOutlet");
    /**
     * `static: true` must be set so the query results are resolved
     * before change detection runs. Otherwise, the view container
     * ref will be ion-router-outlet instead of ng-container, and
     * the first view will be added as a sibling of ion-router-outlet
     * instead of a child.
     */
    __publicField(this, "outletContent");
    this.parentOutlet = parentOutlet;
  }
};
/** @nocollapse */
__publicField(_IonRouterOutlet2, "ɵfac", function IonRouterOutlet_Factory(t) {
  return new (t || _IonRouterOutlet2)(ɵɵinjectAttribute("name"), ɵɵinjectAttribute("tabs"), ɵɵdirectiveInject(Location), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Router), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ActivatedRoute), ɵɵdirectiveInject(_IonRouterOutlet2, 12));
});
/** @nocollapse */
__publicField(_IonRouterOutlet2, "ɵcmp", ɵɵdefineComponent({
  type: _IonRouterOutlet2,
  selectors: [["ion-router-outlet"]],
  viewQuery: function IonRouterOutlet_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c1, 7, ViewContainerRef);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.outletContent = _t.first);
    }
  },
  features: [ɵɵInheritDefinitionFeature],
  ngContentSelectors: _c02,
  decls: 3,
  vars: 0,
  consts: [["outletContent", ""]],
  template: function IonRouterOutlet_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵelementContainerStart(0, null, 0);
      ɵɵprojection(2);
      ɵɵelementContainerEnd();
    }
  },
  encapsulation: 2
}));
var IonRouterOutlet2 = _IonRouterOutlet2;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonRouterOutlet2, [{
    type: Component,
    args: [{
      selector: "ion-router-outlet",
      template: "<ng-container #outletContent><ng-content></ng-content></ng-container>"
    }]
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Attribute,
        args: ["name"]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Optional
      }, {
        type: Attribute,
        args: ["tabs"]
      }]
    }, {
      type: Location
    }, {
      type: ElementRef
    }, {
      type: Router
    }, {
      type: NgZone
    }, {
      type: ActivatedRoute
    }, {
      type: IonRouterOutlet2,
      decorators: [{
        type: SkipSelf
      }, {
        type: Optional
      }]
    }];
  }, {
    outletContent: [{
      type: ViewChild,
      args: ["outletContent", {
        read: ViewContainerRef,
        static: true
      }]
    }]
  });
})();
var _IonTabs2 = class _IonTabs2 extends IonTabs {
  constructor() {
    super(...arguments);
    __publicField(this, "outlet");
    __publicField(this, "tabBar");
    __publicField(this, "tabBars");
    __publicField(this, "tabs");
  }
};
/** @nocollapse */
__publicField(_IonTabs2, "ɵfac", /* @__PURE__ */ (() => {
  let ɵIonTabs_BaseFactory;
  return function IonTabs_Factory(t) {
    return (ɵIonTabs_BaseFactory || (ɵIonTabs_BaseFactory = ɵɵgetInheritedFactory(_IonTabs2)))(t || _IonTabs2);
  };
})());
/** @nocollapse */
__publicField(_IonTabs2, "ɵcmp", ɵɵdefineComponent({
  type: _IonTabs2,
  selectors: [["ion-tabs"]],
  contentQueries: function IonTabs_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, IonTabBar, 5);
      ɵɵcontentQuery(dirIndex, IonTabBar, 4);
      ɵɵcontentQuery(dirIndex, IonTab, 4);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.tabBar = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.tabBars = _t);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.tabs = _t);
    }
  },
  viewQuery: function IonTabs_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c2, 5, IonRouterOutlet2);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.outlet = _t.first);
    }
  },
  features: [ɵɵInheritDefinitionFeature],
  ngContentSelectors: _c4,
  decls: 6,
  vars: 2,
  consts: [["tabsInner", ""], ["outlet", ""], [1, "tabs-inner"], ["tabs", "true", 3, "stackWillChange", "stackDidChange", 4, "ngIf"], [4, "ngIf"], ["tabs", "true", 3, "stackWillChange", "stackDidChange"]],
  template: function IonTabs_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef(_c3);
      ɵɵprojection(0);
      ɵɵelementStart(1, "div", 2, 0);
      ɵɵtemplate(3, IonTabs_ion_router_outlet_3_Template, 2, 0, "ion-router-outlet", 3)(4, IonTabs_ng_content_4_Template, 1, 0, "ng-content", 4);
      ɵɵelementEnd();
      ɵɵprojection(5, 1);
    }
    if (rf & 2) {
      ɵɵadvance(3);
      ɵɵproperty("ngIf", ctx.tabs.length === 0);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.tabs.length > 0);
    }
  },
  dependencies: [NgIf, IonRouterOutlet2],
  styles: ["[_nghost-%COMP%]{display:flex;position:absolute;inset:0;flex-direction:column;width:100%;height:100%;contain:layout size style}.tabs-inner[_ngcontent-%COMP%]{position:relative;flex:1;contain:layout size style}"]
}));
var IonTabs2 = _IonTabs2;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonTabs2, [{
    type: Component,
    args: [{
      selector: "ion-tabs",
      template: `
    <ng-content select="[slot=top]"></ng-content>
    <div class="tabs-inner" #tabsInner>
      <ion-router-outlet
        *ngIf="tabs.length === 0"
        #outlet
        tabs="true"
        (stackWillChange)="onStackWillChange($event)"
        (stackDidChange)="onStackDidChange($event)"
      ></ion-router-outlet>
      <ng-content *ngIf="tabs.length > 0" select="ion-tab"></ng-content>
    </div>
    <ng-content></ng-content>
  `,
      styles: [":host{display:flex;position:absolute;inset:0;flex-direction:column;width:100%;height:100%;contain:layout size style}.tabs-inner{position:relative;flex:1;contain:layout size style}\n"]
    }]
  }], null, {
    outlet: [{
      type: ViewChild,
      args: ["outlet", {
        read: IonRouterOutlet2,
        static: false
      }]
    }],
    tabBar: [{
      type: ContentChild,
      args: [IonTabBar, {
        static: false
      }]
    }],
    tabBars: [{
      type: ContentChildren,
      args: [IonTabBar]
    }],
    tabs: [{
      type: ContentChildren,
      args: [IonTab]
    }]
  });
})();
var _IonBackButton = class _IonBackButton extends IonBackButton {
  constructor(routerOutlet, navCtrl, config3, r, z, c) {
    super(routerOutlet, navCtrl, config3, r, z, c);
  }
};
/** @nocollapse */
__publicField(_IonBackButton, "ɵfac", function IonBackButton_Factory(t) {
  return new (t || _IonBackButton)(ɵɵdirectiveInject(IonRouterOutlet2, 8), ɵɵdirectiveInject(NavController), ɵɵdirectiveInject(Config), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ChangeDetectorRef));
});
/** @nocollapse */
__publicField(_IonBackButton, "ɵcmp", ɵɵdefineComponent({
  type: _IonBackButton,
  selectors: [["ion-back-button"]],
  features: [ɵɵInheritDefinitionFeature],
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonBackButton_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var IonBackButton2 = _IonBackButton;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonBackButton2, [{
    type: Component,
    args: [{
      selector: "ion-back-button",
      template: "<ng-content></ng-content>",
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], function() {
    return [{
      type: IonRouterOutlet2,
      decorators: [{
        type: Optional
      }]
    }, {
      type: NavController
    }, {
      type: Config
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }, {
      type: ChangeDetectorRef
    }];
  }, null);
})();
var _IonNav = class _IonNav extends IonNav {
  constructor(ref, environmentInjector, injector, angularDelegate, z, c) {
    super(ref, environmentInjector, injector, angularDelegate, z, c);
  }
};
/** @nocollapse */
__publicField(_IonNav, "ɵfac", function IonNav_Factory(t) {
  return new (t || _IonNav)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(EnvironmentInjector), ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(AngularDelegate), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ChangeDetectorRef));
});
/** @nocollapse */
__publicField(_IonNav, "ɵcmp", ɵɵdefineComponent({
  type: _IonNav,
  selectors: [["ion-nav"]],
  features: [ɵɵInheritDefinitionFeature],
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonNav_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var IonNav2 = _IonNav;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonNav2, [{
    type: Component,
    args: [{
      selector: "ion-nav",
      template: "<ng-content></ng-content>",
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: EnvironmentInjector
    }, {
      type: Injector
    }, {
      type: AngularDelegate
    }, {
      type: NgZone
    }, {
      type: ChangeDetectorRef
    }];
  }, null);
})();
var _RouterLinkDelegateDirective2 = class _RouterLinkDelegateDirective2 extends RouterLinkDelegateDirective {
};
/** @nocollapse */
__publicField(_RouterLinkDelegateDirective2, "ɵfac", /* @__PURE__ */ (() => {
  let ɵRouterLinkDelegateDirective_BaseFactory;
  return function RouterLinkDelegateDirective_Factory(t) {
    return (ɵRouterLinkDelegateDirective_BaseFactory || (ɵRouterLinkDelegateDirective_BaseFactory = ɵɵgetInheritedFactory(_RouterLinkDelegateDirective2)))(t || _RouterLinkDelegateDirective2);
  };
})());
/** @nocollapse */
__publicField(_RouterLinkDelegateDirective2, "ɵdir", ɵɵdefineDirective({
  type: _RouterLinkDelegateDirective2,
  selectors: [["", "routerLink", "", 5, "a", 5, "area"]],
  features: [ɵɵInheritDefinitionFeature]
}));
var RouterLinkDelegateDirective2 = _RouterLinkDelegateDirective2;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RouterLinkDelegateDirective2, [{
    type: Directive,
    args: [{
      selector: ":not(a):not(area)[routerLink]"
    }]
  }], null, null);
})();
var _RouterLinkWithHrefDelegateDirective2 = class _RouterLinkWithHrefDelegateDirective2 extends RouterLinkWithHrefDelegateDirective {
};
/** @nocollapse */
__publicField(_RouterLinkWithHrefDelegateDirective2, "ɵfac", /* @__PURE__ */ (() => {
  let ɵRouterLinkWithHrefDelegateDirective_BaseFactory;
  return function RouterLinkWithHrefDelegateDirective_Factory(t) {
    return (ɵRouterLinkWithHrefDelegateDirective_BaseFactory || (ɵRouterLinkWithHrefDelegateDirective_BaseFactory = ɵɵgetInheritedFactory(_RouterLinkWithHrefDelegateDirective2)))(t || _RouterLinkWithHrefDelegateDirective2);
  };
})());
/** @nocollapse */
__publicField(_RouterLinkWithHrefDelegateDirective2, "ɵdir", ɵɵdefineDirective({
  type: _RouterLinkWithHrefDelegateDirective2,
  selectors: [["a", "routerLink", ""], ["area", "routerLink", ""]],
  features: [ɵɵInheritDefinitionFeature]
}));
var RouterLinkWithHrefDelegateDirective2 = _RouterLinkWithHrefDelegateDirective2;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RouterLinkWithHrefDelegateDirective2, [{
    type: Directive,
    args: [{
      selector: "a[routerLink],area[routerLink]"
    }]
  }], null, null);
})();
var _IonModal = class _IonModal extends IonModal {
};
/** @nocollapse */
__publicField(_IonModal, "ɵfac", /* @__PURE__ */ (() => {
  let ɵIonModal_BaseFactory;
  return function IonModal_Factory(t) {
    return (ɵIonModal_BaseFactory || (ɵIonModal_BaseFactory = ɵɵgetInheritedFactory(_IonModal)))(t || _IonModal);
  };
})());
/** @nocollapse */
__publicField(_IonModal, "ɵcmp", ɵɵdefineComponent({
  type: _IonModal,
  selectors: [["ion-modal"]],
  features: [ɵɵInheritDefinitionFeature],
  decls: 1,
  vars: 1,
  consts: [["class", "ion-delegate-host ion-page", 4, "ngIf"], [1, "ion-delegate-host", "ion-page"], [3, "ngTemplateOutlet"]],
  template: function IonModal_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, IonModal_div_0_Template, 2, 1, "div", 0);
    }
    if (rf & 2) {
      ɵɵproperty("ngIf", ctx.isCmpOpen || ctx.keepContentsMounted);
    }
  },
  dependencies: [NgIf, NgTemplateOutlet],
  encapsulation: 2,
  changeDetection: 0
}));
var IonModal2 = _IonModal;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonModal2, [{
    type: Component,
    args: [{
      selector: "ion-modal",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<div class="ion-delegate-host ion-page" *ngIf="isCmpOpen || keepContentsMounted">
    <ng-container [ngTemplateOutlet]="template"></ng-container>
  </div>`
    }]
  }], null, null);
})();
var _IonPopover = class _IonPopover extends IonPopover {
};
/** @nocollapse */
__publicField(_IonPopover, "ɵfac", /* @__PURE__ */ (() => {
  let ɵIonPopover_BaseFactory;
  return function IonPopover_Factory(t) {
    return (ɵIonPopover_BaseFactory || (ɵIonPopover_BaseFactory = ɵɵgetInheritedFactory(_IonPopover)))(t || _IonPopover);
  };
})());
/** @nocollapse */
__publicField(_IonPopover, "ɵcmp", ɵɵdefineComponent({
  type: _IonPopover,
  selectors: [["ion-popover"]],
  features: [ɵɵInheritDefinitionFeature],
  decls: 1,
  vars: 1,
  consts: [[3, "ngTemplateOutlet", 4, "ngIf"], [3, "ngTemplateOutlet"]],
  template: function IonPopover_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, IonPopover_ng_container_0_Template, 1, 1, "ng-container", 0);
    }
    if (rf & 2) {
      ɵɵproperty("ngIf", ctx.isCmpOpen || ctx.keepContentsMounted);
    }
  },
  dependencies: [NgIf, NgTemplateOutlet],
  encapsulation: 2,
  changeDetection: 0
}));
var IonPopover2 = _IonPopover;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonPopover2, [{
    type: Component,
    args: [{
      selector: "ion-popover",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<ng-container [ngTemplateOutlet]="template" *ngIf="isCmpOpen || keepContentsMounted"></ng-container>`
    }]
  }], null, null);
})();
var ION_MAX_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => IonMaxValidator),
  multi: true
};
var _IonMaxValidator = class _IonMaxValidator extends MaxValidator {
};
/** @nocollapse */
__publicField(_IonMaxValidator, "ɵfac", /* @__PURE__ */ (() => {
  let ɵIonMaxValidator_BaseFactory;
  return function IonMaxValidator_Factory(t) {
    return (ɵIonMaxValidator_BaseFactory || (ɵIonMaxValidator_BaseFactory = ɵɵgetInheritedFactory(_IonMaxValidator)))(t || _IonMaxValidator);
  };
})());
/** @nocollapse */
__publicField(_IonMaxValidator, "ɵdir", ɵɵdefineDirective({
  type: _IonMaxValidator,
  selectors: [["ion-input", "type", "number", "max", "", "formControlName", ""], ["ion-input", "type", "number", "max", "", "formControl", ""], ["ion-input", "type", "number", "max", "", "ngModel", ""]],
  hostVars: 1,
  hostBindings: function IonMaxValidator_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("max", ctx._enabled ? ctx.max : null);
    }
  },
  features: [ɵɵProvidersFeature([ION_MAX_VALIDATOR]), ɵɵInheritDefinitionFeature]
}));
var IonMaxValidator = _IonMaxValidator;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonMaxValidator, [{
    type: Directive,
    args: [{
      selector: "ion-input[type=number][max][formControlName],ion-input[type=number][max][formControl],ion-input[type=number][max][ngModel]",
      providers: [ION_MAX_VALIDATOR],
      // eslint-disable-next-line @angular-eslint/no-host-metadata-property
      host: {
        "[attr.max]": "_enabled ? max : null"
      }
    }]
  }], null, null);
})();
var ION_MIN_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => IonMinValidator),
  multi: true
};
var _IonMinValidator = class _IonMinValidator extends MinValidator {
};
/** @nocollapse */
__publicField(_IonMinValidator, "ɵfac", /* @__PURE__ */ (() => {
  let ɵIonMinValidator_BaseFactory;
  return function IonMinValidator_Factory(t) {
    return (ɵIonMinValidator_BaseFactory || (ɵIonMinValidator_BaseFactory = ɵɵgetInheritedFactory(_IonMinValidator)))(t || _IonMinValidator);
  };
})());
/** @nocollapse */
__publicField(_IonMinValidator, "ɵdir", ɵɵdefineDirective({
  type: _IonMinValidator,
  selectors: [["ion-input", "type", "number", "min", "", "formControlName", ""], ["ion-input", "type", "number", "min", "", "formControl", ""], ["ion-input", "type", "number", "min", "", "ngModel", ""]],
  hostVars: 1,
  hostBindings: function IonMinValidator_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("min", ctx._enabled ? ctx.min : null);
    }
  },
  features: [ɵɵProvidersFeature([ION_MIN_VALIDATOR]), ɵɵInheritDefinitionFeature]
}));
var IonMinValidator = _IonMinValidator;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonMinValidator, [{
    type: Directive,
    args: [{
      selector: "ion-input[type=number][min][formControlName],ion-input[type=number][min][formControl],ion-input[type=number][min][ngModel]",
      providers: [ION_MIN_VALIDATOR],
      // eslint-disable-next-line @angular-eslint/no-host-metadata-property
      host: {
        "[attr.min]": "_enabled ? min : null"
      }
    }]
  }], null, null);
})();
var _AlertController = class _AlertController extends OverlayBaseController {
  constructor() {
    super(alertController2);
  }
};
/** @nocollapse */
__publicField(_AlertController, "ɵfac", function AlertController_Factory(t) {
  return new (t || _AlertController)();
});
/** @nocollapse */
__publicField(_AlertController, "ɵprov", ɵɵdefineInjectable({
  token: _AlertController,
  factory: _AlertController.ɵfac,
  providedIn: "root"
}));
var AlertController = _AlertController;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AlertController, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [];
  }, null);
})();
var _AnimationController = class _AnimationController {
  /**
   * Create a new animation
   */
  create(animationId) {
    return createAnimation2(animationId);
  }
  /**
   * EXPERIMENTAL
   *
   * Given a progression and a cubic bezier function,
   * this utility returns the time value(s) at which the
   * cubic bezier reaches the given time progression.
   *
   * If the cubic bezier never reaches the progression
   * the result will be an empty array.
   *
   * This is most useful for switching between easing curves
   * when doing a gesture animation (i.e. going from linear easing
   * during a drag, to another easing when `progressEnd` is called)
   */
  easingTime(p0, p1, p2, p3, progression) {
    return getTimeGivenProgression2(p0, p1, p2, p3, progression);
  }
};
/** @nocollapse */
__publicField(_AnimationController, "ɵfac", function AnimationController_Factory(t) {
  return new (t || _AnimationController)();
});
/** @nocollapse */
__publicField(_AnimationController, "ɵprov", ɵɵdefineInjectable({
  token: _AnimationController,
  factory: _AnimationController.ɵfac,
  providedIn: "root"
}));
var AnimationController = _AnimationController;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnimationController, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var _ActionSheetController = class _ActionSheetController extends OverlayBaseController {
  constructor() {
    super(actionSheetController2);
  }
};
/** @nocollapse */
__publicField(_ActionSheetController, "ɵfac", function ActionSheetController_Factory(t) {
  return new (t || _ActionSheetController)();
});
/** @nocollapse */
__publicField(_ActionSheetController, "ɵprov", ɵɵdefineInjectable({
  token: _ActionSheetController,
  factory: _ActionSheetController.ɵfac,
  providedIn: "root"
}));
var ActionSheetController = _ActionSheetController;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ActionSheetController, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [];
  }, null);
})();
var _GestureController = class _GestureController {
  constructor(zone) {
    __publicField(this, "zone");
    this.zone = zone;
  }
  /**
   * Create a new gesture
   */
  create(opts, runInsideAngularZone = false) {
    if (runInsideAngularZone) {
      Object.getOwnPropertyNames(opts).forEach((key) => {
        if (typeof opts[key] === "function") {
          const fn = opts[key];
          opts[key] = (...props) => this.zone.run(() => fn(...props));
        }
      });
    }
    return createGesture2(opts);
  }
};
/** @nocollapse */
__publicField(_GestureController, "ɵfac", function GestureController_Factory(t) {
  return new (t || _GestureController)(ɵɵinject(NgZone));
});
/** @nocollapse */
__publicField(_GestureController, "ɵprov", ɵɵdefineInjectable({
  token: _GestureController,
  factory: _GestureController.ɵfac,
  providedIn: "root"
}));
var GestureController3 = _GestureController;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GestureController3, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: NgZone
    }];
  }, null);
})();
var _LoadingController = class _LoadingController extends OverlayBaseController {
  constructor() {
    super(loadingController2);
  }
};
/** @nocollapse */
__publicField(_LoadingController, "ɵfac", function LoadingController_Factory(t) {
  return new (t || _LoadingController)();
});
/** @nocollapse */
__publicField(_LoadingController, "ɵprov", ɵɵdefineInjectable({
  token: _LoadingController,
  factory: _LoadingController.ɵfac,
  providedIn: "root"
}));
var LoadingController = _LoadingController;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoadingController, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [];
  }, null);
})();
var _MenuController = class _MenuController extends MenuController {
  constructor() {
    super(menuController2);
  }
};
/** @nocollapse */
__publicField(_MenuController, "ɵfac", function MenuController_Factory(t) {
  return new (t || _MenuController)();
});
/** @nocollapse */
__publicField(_MenuController, "ɵprov", ɵɵdefineInjectable({
  token: _MenuController,
  factory: _MenuController.ɵfac,
  providedIn: "root"
}));
var MenuController2 = _MenuController;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuController2, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [];
  }, null);
})();
var _ModalController = class _ModalController extends OverlayBaseController {
  constructor() {
    super(modalController2);
    __publicField(this, "angularDelegate", inject(AngularDelegate));
    __publicField(this, "injector", inject(Injector));
    __publicField(this, "environmentInjector", inject(EnvironmentInjector));
  }
  create(opts) {
    return super.create(__spreadProps(__spreadValues({}, opts), {
      delegate: this.angularDelegate.create(this.environmentInjector, this.injector, "modal")
    }));
  }
};
/** @nocollapse */
__publicField(_ModalController, "ɵfac", function ModalController_Factory(t) {
  return new (t || _ModalController)();
});
/** @nocollapse */
__publicField(_ModalController, "ɵprov", ɵɵdefineInjectable({
  token: _ModalController,
  factory: _ModalController.ɵfac
}));
var ModalController = _ModalController;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ModalController, [{
    type: Injectable
  }], function() {
    return [];
  }, null);
})();
var _PickerController = class _PickerController extends OverlayBaseController {
  constructor() {
    super(pickerController2);
  }
};
/** @nocollapse */
__publicField(_PickerController, "ɵfac", function PickerController_Factory(t) {
  return new (t || _PickerController)();
});
/** @nocollapse */
__publicField(_PickerController, "ɵprov", ɵɵdefineInjectable({
  token: _PickerController,
  factory: _PickerController.ɵfac,
  providedIn: "root"
}));
var PickerController = _PickerController;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PickerController, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [];
  }, null);
})();
var PopoverController = class extends OverlayBaseController {
  constructor() {
    super(popoverController2);
    __publicField(this, "angularDelegate", inject(AngularDelegate));
    __publicField(this, "injector", inject(Injector));
    __publicField(this, "environmentInjector", inject(EnvironmentInjector));
  }
  create(opts) {
    return super.create(__spreadProps(__spreadValues({}, opts), {
      delegate: this.angularDelegate.create(this.environmentInjector, this.injector, "popover")
    }));
  }
};
var _ToastController = class _ToastController extends OverlayBaseController {
  constructor() {
    super(toastController2);
  }
};
/** @nocollapse */
__publicField(_ToastController, "ɵfac", function ToastController_Factory(t) {
  return new (t || _ToastController)();
});
/** @nocollapse */
__publicField(_ToastController, "ɵprov", ɵɵdefineInjectable({
  token: _ToastController,
  factory: _ToastController.ɵfac,
  providedIn: "root"
}));
var ToastController = _ToastController;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastController, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [];
  }, null);
})();
var appInitialize = (config3, doc3, zone) => {
  return () => {
    const win3 = doc3.defaultView;
    if (win3 && typeof window !== "undefined") {
      setupConfig2(__spreadProps(__spreadValues({}, config3), {
        _zoneGate: (h) => zone.run(h)
      }));
      const aelFn = "__zone_symbol__addEventListener" in doc3.body ? "__zone_symbol__addEventListener" : "addEventListener";
      return applyPolyfills().then(() => {
        return defineCustomElements(win3, {
          exclude: ["ion-tabs"],
          syncQueue: true,
          raf,
          jmp: (h) => zone.runOutsideAngular(h),
          ael(elm, eventName, cb, opts) {
            elm[aelFn](eventName, cb, opts);
          },
          rel(elm, eventName, cb, opts) {
            elm.removeEventListener(eventName, cb, opts);
          }
        });
      });
    }
  };
};
var DIRECTIVES = [IonAccordion, IonAccordionGroup, IonActionSheet, IonAlert, IonApp, IonAvatar, IonBackdrop, IonBadge, IonBreadcrumb, IonBreadcrumbs, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCheckbox, IonChip, IonCol, IonContent, IonDatetime, IonDatetimeButton, IonFab, IonFabButton, IonFabList, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonInputPasswordToggle, IonItem, IonItemDivider, IonItemGroup, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, IonLoading, IonMenu, IonMenuButton, IonMenuToggle, IonNavLink, IonNote, IonPicker, IonPickerColumn, IonPickerColumnOption, IonPickerLegacy, IonProgressBar, IonRadio, IonRadioGroup, IonRange, IonRefresher, IonRefresherContent, IonReorder, IonReorderGroup, IonRippleEffect, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonSkeletonText, IonSpinner, IonSplitPane, IonTab, IonTabBar, IonTabButton, IonText, IonTextarea, IonThumbnail, IonTitle, IonToast, IonToggle, IonToolbar];
var DECLARATIONS = [
  // generated proxies
  ...DIRECTIVES,
  // manual proxies
  IonModal2,
  IonPopover2,
  // ngModel accessors
  BooleanValueAccessorDirective,
  NumericValueAccessorDirective,
  SelectValueAccessorDirective,
  TextValueAccessorDirective,
  // navigation
  IonTabs2,
  IonRouterOutlet2,
  IonBackButton2,
  IonNav2,
  RouterLinkDelegateDirective2,
  RouterLinkWithHrefDelegateDirective2,
  // validators
  IonMinValidator,
  IonMaxValidator
];
var _IonicModule = class _IonicModule {
  static forRoot(config3 = {}) {
    return {
      ngModule: _IonicModule,
      providers: [{
        provide: ConfigToken,
        useValue: config3
      }, {
        provide: APP_INITIALIZER,
        useFactory: appInitialize,
        multi: true,
        deps: [ConfigToken, DOCUMENT, NgZone]
      }, AngularDelegate, provideComponentInputBinding()]
    };
  }
};
/** @nocollapse */
__publicField(_IonicModule, "ɵfac", function IonicModule_Factory(t) {
  return new (t || _IonicModule)();
});
/** @nocollapse */
__publicField(_IonicModule, "ɵmod", ɵɵdefineNgModule({
  type: _IonicModule,
  declarations: [
    IonAccordion,
    IonAccordionGroup,
    IonActionSheet,
    IonAlert,
    IonApp,
    IonAvatar,
    IonBackdrop,
    IonBadge,
    IonBreadcrumb,
    IonBreadcrumbs,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCheckbox,
    IonChip,
    IonCol,
    IonContent,
    IonDatetime,
    IonDatetimeButton,
    IonFab,
    IonFabButton,
    IonFabList,
    IonFooter,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonInput,
    IonInputPasswordToggle,
    IonItem,
    IonItemDivider,
    IonItemGroup,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonListHeader,
    IonLoading,
    IonMenu,
    IonMenuButton,
    IonMenuToggle,
    IonNavLink,
    IonNote,
    IonPicker,
    IonPickerColumn,
    IonPickerColumnOption,
    IonPickerLegacy,
    IonProgressBar,
    IonRadio,
    IonRadioGroup,
    IonRange,
    IonRefresher,
    IonRefresherContent,
    IonReorder,
    IonReorderGroup,
    IonRippleEffect,
    IonRow,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonSelect,
    IonSelectOption,
    IonSkeletonText,
    IonSpinner,
    IonSplitPane,
    IonTab,
    IonTabBar,
    IonTabButton,
    IonText,
    IonTextarea,
    IonThumbnail,
    IonTitle,
    IonToast,
    IonToggle,
    IonToolbar,
    // manual proxies
    IonModal2,
    IonPopover2,
    // ngModel accessors
    BooleanValueAccessorDirective,
    NumericValueAccessorDirective,
    SelectValueAccessorDirective,
    TextValueAccessorDirective,
    // navigation
    IonTabs2,
    IonRouterOutlet2,
    IonBackButton2,
    IonNav2,
    RouterLinkDelegateDirective2,
    RouterLinkWithHrefDelegateDirective2,
    // validators
    IonMinValidator,
    IonMaxValidator
  ],
  imports: [CommonModule],
  exports: [
    IonAccordion,
    IonAccordionGroup,
    IonActionSheet,
    IonAlert,
    IonApp,
    IonAvatar,
    IonBackdrop,
    IonBadge,
    IonBreadcrumb,
    IonBreadcrumbs,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCheckbox,
    IonChip,
    IonCol,
    IonContent,
    IonDatetime,
    IonDatetimeButton,
    IonFab,
    IonFabButton,
    IonFabList,
    IonFooter,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonInput,
    IonInputPasswordToggle,
    IonItem,
    IonItemDivider,
    IonItemGroup,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonListHeader,
    IonLoading,
    IonMenu,
    IonMenuButton,
    IonMenuToggle,
    IonNavLink,
    IonNote,
    IonPicker,
    IonPickerColumn,
    IonPickerColumnOption,
    IonPickerLegacy,
    IonProgressBar,
    IonRadio,
    IonRadioGroup,
    IonRange,
    IonRefresher,
    IonRefresherContent,
    IonReorder,
    IonReorderGroup,
    IonRippleEffect,
    IonRow,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonSelect,
    IonSelectOption,
    IonSkeletonText,
    IonSpinner,
    IonSplitPane,
    IonTab,
    IonTabBar,
    IonTabButton,
    IonText,
    IonTextarea,
    IonThumbnail,
    IonTitle,
    IonToast,
    IonToggle,
    IonToolbar,
    // manual proxies
    IonModal2,
    IonPopover2,
    // ngModel accessors
    BooleanValueAccessorDirective,
    NumericValueAccessorDirective,
    SelectValueAccessorDirective,
    TextValueAccessorDirective,
    // navigation
    IonTabs2,
    IonRouterOutlet2,
    IonBackButton2,
    IonNav2,
    RouterLinkDelegateDirective2,
    RouterLinkWithHrefDelegateDirective2,
    // validators
    IonMinValidator,
    IonMaxValidator
  ]
}));
/** @nocollapse */
__publicField(_IonicModule, "ɵinj", ɵɵdefineInjector({
  providers: [ModalController, PopoverController],
  imports: [CommonModule]
}));
var IonicModule = _IonicModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonicModule, [{
    type: NgModule,
    args: [{
      declarations: DECLARATIONS,
      exports: DECLARATIONS,
      providers: [ModalController, PopoverController],
      imports: [CommonModule]
    }]
  }], null, null);
})();
export {
  ActionSheetController,
  AlertController,
  AngularDelegate,
  AnimationController,
  BooleanValueAccessorDirective as BooleanValueAccessor,
  Config,
  DomController,
  GestureController3 as GestureController,
  ION_MAX_VALIDATOR,
  ION_MIN_VALIDATOR,
  IonAccordion,
  IonAccordionGroup,
  IonActionSheet,
  IonAlert,
  IonApp,
  IonAvatar,
  IonBackButton2 as IonBackButton,
  IonBackdrop,
  IonBadge,
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonChip,
  IonCol,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonFab,
  IonFabButton,
  IonFabList,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonLoading,
  IonMaxValidator,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonMinValidator,
  IonModal2 as IonModal,
  IonNav2 as IonNav,
  IonNavLink,
  IonNote,
  IonPicker,
  IonPickerColumn,
  IonPickerColumnOption,
  IonPickerLegacy,
  IonPopover2 as IonPopover,
  IonProgressBar,
  IonRadio,
  IonRadioGroup,
  IonRange,
  IonRefresher,
  IonRefresherContent,
  IonReorder,
  IonReorderGroup,
  IonRippleEffect,
  IonRouterOutlet2 as IonRouterOutlet,
  IonRow,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonSkeletonText,
  IonSpinner,
  IonSplitPane,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs2 as IonTabs,
  IonText,
  IonTextarea,
  IonThumbnail,
  IonTitle,
  IonToast,
  IonToggle,
  IonToolbar,
  IonicModule,
  IonicRouteStrategy,
  IonicSafeString2 as IonicSafeString,
  IonicSlides,
  LoadingController,
  MenuController2 as MenuController,
  ModalController,
  NavController,
  NavParams,
  NumericValueAccessorDirective as NumericValueAccessor,
  PickerController,
  Platform,
  PopoverController,
  RouterLinkDelegateDirective2 as RouterLinkDelegate,
  RouterLinkWithHrefDelegateDirective2 as RouterLinkWithHrefDelegate,
  SelectValueAccessorDirective as SelectValueAccessor,
  TextValueAccessorDirective as TextValueAccessor,
  ToastController,
  createAnimation2 as createAnimation,
  createGesture2 as createGesture,
  getIonPageElement,
  getPlatforms2 as getPlatforms,
  getTimeGivenProgression2 as getTimeGivenProgression,
  iosTransitionAnimation,
  isPlatform2 as isPlatform,
  mdTransitionAnimation,
  openURL2 as openURL
};
/*! Bundled license information:

@ionic/core/components/cubic-bezier.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/gesture-controller.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/index3.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/config.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/theme.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/hardware-back-button.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/index4.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/framework-delegate.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/overlays.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/index.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/cubic-bezier-fe2083dc.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/gesture-controller-314a54f6.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/index-39782642.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/config-49c88215.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/theme-01f3f29c.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/hardware-back-button-8e2c1354.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/index-97b0ab3f.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/framework-delegate-63d1a679.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/overlays-2ea57630.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/index.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/app-globals-b9f6e516.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/loader.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/loader/index.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=@ionic_angular.js.map
