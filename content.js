// Alt + clique esquerdo em um link copia a URL sem navegar ou baixá-la.
let altPointerDownHandled = false;

document.addEventListener("pointerdown", (event) => {
  altPointerDownHandled = false;
  if (!isAltLeftAction(event)) return;

  const link = findLink(event);
  if (!link) return;

  altPointerDownHandled = true;
  cancelEvent(event);
  copyLink(link.href);
}, true);

document.addEventListener("click", (event) => {
  if (!isAltLeftAction(event)) return;

  const link = findLink(event);
  if (!link) return;

  cancelEvent(event);
  // O click é uma alternativa para ativação por teclado ou sem pointerdown.
  if (event.detail === 0 || !altPointerDownHandled) {
    copyLink(link.href);
  }
  altPointerDownHandled = false;
}, true);

function isAltLeftAction(event) {
  return event.altKey && event.button === 0 &&
    !event.ctrlKey && !event.metaKey && !event.shiftKey;
}

function findLink(event) {
  for (const node of event.composedPath()) {
    if (node instanceof HTMLAnchorElement && node.hasAttribute("href")) {
      return node;
    }
  }

  const target = event.target;
  const element = target instanceof Element ? target : target?.parentElement;
  const link = element?.closest("a[href]");
  return link instanceof HTMLAnchorElement ? link : null;
}

function cancelEvent(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

function copyLink(url) {
  copyText(url).then((ok) => {
    showMessage(ok ? "Link copiado!" : "Não foi possível copiar o link.");
  });
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      // Alternativa para páginas que bloqueiam a Clipboard API.
    }
  }

  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  Object.assign(field.style, {
    position: "fixed", left: "-9999px", top: "0", opacity: "0"
  });
  (document.body || document.documentElement).appendChild(field);
  field.focus();
  field.select();
  try {
    return document.execCommand("copy");
  } catch (_) {
    return false;
  } finally {
    field.remove();
  }
}

function showMessage(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  Object.assign(toast.style, {
    position: "fixed", bottom: "18px", right: "18px",
    zIndex: "2147483647", padding: "8px 12px",
    background: "#202124", color: "white", borderRadius: "8px",
    font: "13px system-ui, sans-serif", pointerEvents: "none",
    boxShadow: "0 2px 10px #0004"
  });
  document.documentElement.appendChild(toast);
  setTimeout(() => toast.remove(), 1100);
}
