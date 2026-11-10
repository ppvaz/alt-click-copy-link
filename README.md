# Alt + Clique: Copiar Link

Extensão para copiar o endereço de um link sem abrir a página. Funciona no Chrome e no Brave em macOS, Windows e Linux.

## Instalação

1. No GitHub, abra **Code**, escolha **Download ZIP** e extraia o arquivo. Também é possível clonar este repositório.
2. Abra a página de extensões do navegador:
   - Chrome: `chrome://extensions`
   - Brave: `brave://extensions`
3. Ative o modo do desenvolvedor.
4. Clique em **Carregar sem compactação**.
5. Selecione a pasta extraída que contém `manifest.json`.
6. Atualize as páginas que já estavam abertas.

Também é possível carregar diretamente a pasta deste projeto pelo botão **Carregar sem compactação**.

Para atualizar uma instalação existente, atualize os arquivos da pasta carregada, clique em **Recarregar** no cartão da extensão e atualize as abas abertas.

## Uso

Mantenha a tecla modificadora pressionada e clique com o botão esquerdo em um link:

- macOS: use Option (⌥).
- Windows e Linux: use Alt.

O endereço completo é copiado para a área de transferência sem navegar para o link. Uma notificação breve confirma a cópia.

## Privacidade e permissões

A extensão é executada em páginas HTTP e HTTPS para detectar o clique no link. A permissão `clipboardWrite` permite copiar o endereço selecionado. A extensão não acessa a rede, não lê a área de transferência e não armazena dados.

Páginas internas do navegador, a loja de extensões e outras páginas protegidas pelo navegador não permitem a execução de extensões.
