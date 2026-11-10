// Alt + clique esquerdo em um link copia a URL sem navegar.
document.addEventListener("click", (event) => {
  if (!event.altKey || event.button !== 0 ||
      event.ctrlKey || event.metaKey || event.shiftKey) return;

  const element = event.target;
  if (!(element instanceof Element)) return;

  const link = element.closest("a[href]");
  if (!(link instanceof HTMLAnchorElement)) return;

  // Cancela a navegação e handlers de clique da própria página.
  event.preventDefault();
  event.stopImmediatePropagation();

  copyText(link.href).then((ok) => {
    showMessage(ok ? "Link copiado!" : "Não foi possível copiar o link.");
  });
}, true);

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
