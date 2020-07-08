import * as jQuery from "jquery";

export const showWorkbenchPreviewMode = () => {
  setTimeout(() => {
    var myElement = jQuery(
      'button[data-automation-id="workbench-command-bar-preview"]'
    ).click();
    jQuery(".dragIconContainer_90be1210").prop("style", "visibility: hidden");
  }, 100);
};

export const showWorkbenchFullScreen = () => {
  setTimeout(() => {
    jQuery("#workbenchPageContent").prop("style", "max-width: none");
    jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
    jQuery(".CanvasZone").prop("style", "max-width: none");
  }, 50);
};

export function fixWorkbench(elem?: any, depth: number = 0) {
  //workbenchPageContent
  if (!elem && depth === 0)
    elem = document.getElementById("workbenchPageContent");
  if (!elem || depth > 20) return null;
  elem.style.padding = "0px 0px 0px 0px";
  elem.style.margin = "0px 0px 0px 0px";
  elem.style.width = "1500px";
  (Array as any)
    .from(elem.children)
    .map((child) => fixWorkbench(child, depth + 1));
}
