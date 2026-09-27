# Sem salvar — publicação nas lojas

Tudo o que as lojas pedem além do código. Contexto e fontes: [`docs/design/PROPOSTA.md`](../docs/design/PROPOSTA.md#7-lojas-o-que-precisa-mudar-para-publicar).

| | Google Play | App Store |
| --- | --- | --- |
| Identificador | `com.chamazap` (não mudar: é o app já publicado) | `com.chamazap` (registrar em Certificates, Identifiers & Profiles) |
| Versão | `versionName 2.0.0` · `versionCode 200` | `MARKETING_VERSION 2.0.0` · build `1` |
| Ícone | [`google-play/icon-512.png`](google-play/icon-512.png) | vem do projeto (`AppIcon` com variantes claro/escuro/tingido) |
| Imagem de destaque | [`google-play/feature-graphic.png`](google-play/feature-graphic.png) (1024×500) | — |
| Screenshots | [`google-play/screenshots/`](google-play/screenshots/) (1080×1920) | [`app-store/screenshots/`](app-store/screenshots/) (1290×2796, iPhone 6,9") |
| Política de privacidade | https://lucassutelo.github.io/ChamaZap/privacidade/ | mesma URL |

> A URL da política só funciona depois de ativar o GitHub Pages: **Settings → Pages → Branch `main`, pasta
> `/docs`**. O app abre essa página no link "Privacidade" (`src/config.ts`). Se preferir outro endereço, troque
> nos dois lugares.

## Textos (pt-BR)

**Nome**
- Google Play (máx. 30): `Sem salvar: chat sem contato`
- App Store (máx. 30): `Sem salvar`

**Subtítulo (App Store, máx. 30):** `Converse sem salvar o contato`

**Descrição curta (Google Play, máx. 80):**
`Abra conversas no WhatsApp sem salvar o número na agenda. Rápido e sem anúncios.`

**Palavras-chave (App Store, máx. 100):**
`zap,contato,número,conversa,chat,direto,agenda,ddd,mensagem,telefone,rápido,chamar,desconhecido`

**Texto promocional (App Store, máx. 170):**
`Digite o número com DDD e a conversa abre direto no WhatsApp. Sem salvar na agenda, sem anúncios, sem cadastro.`

**Descrição completa (as duas lojas):**

```
Precisa mandar mensagem para alguém, mas não quer salvar o número na agenda?
Com o Sem salvar você digita o número com DDD e a conversa abre direto no WhatsApp. Pronto.

• Rápido: o teclado já abre pronto para digitar.
• Simples: só o número com DDD — o +55 é automático.
• Cole e pronto: números copiados com +55, espaços ou traços são ajustados sozinhos.
• Privado: o número não fica salvo na agenda nem no app. Sem cadastro, sem anúncios, sem permissões.
• Confortável: modo claro e escuro, letras grandes e alto contraste.

Ideal para responder clientes, falar com vendedores de anúncios, confirmar entregas e serviços — sem encher
a agenda de contatos que você nunca mais vai usar.

O Sem salvar não é afiliado, patrocinado ou endossado pelo WhatsApp ou pela Meta. WhatsApp é uma marca
registrada da WhatsApp LLC.
```

**Novidades desta versão:**

```
Novo nome, novo visual! O Chama no Zap agora é Sem salvar.
• Tela redesenhada, mais clara e fácil de usar, nos modos claro e escuro
• Avisos de número incompleto direto no campo
• Números colados com +55 são ajustados automaticamente
• Se o WhatsApp não abrir, a conversa abre pelo link oficial wa.me
• Compatível com as versões mais recentes do Android
```

Não use "WhatsApp" no nome, no ícone nem nas palavras-chave (Apple 2.3.7 / 5.2.1, política de propriedade
intelectual e de falsificação de identidade do Google Play).

## Google Play Console

1. **Verificação de desenvolvedor** — prazo no Brasil: **30/09/2026**. Confira em *Play Console → Verificação
   de desenvolvedor Android* se o `com.chamazap` está registrado.
2. **Assinatura** — coloque a chave de upload em `android/app/` e as propriedades em `~/.gradle/gradle.properties`:
   ```
   MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
   MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
   MYAPP_UPLOAD_STORE_PASSWORD=...
   MYAPP_UPLOAD_KEY_PASSWORD=...
   ```
   Gere o AAB com `cd android && ./gradlew bundleRelease` (`android/app/build/outputs/bundle/release/`).
   O `versionCode` (200) precisa ser maior que o último publicado; se o Console recusar, aumente em
   `android/app/build.gradle`.
3. **16 KB** — no *App Bundle Explorer*, confira "Compatível com páginas de memória de 16 KB".
4. **Conteúdo do app**
   - Política de privacidade: URL acima.
   - Anúncios: **não contém anúncios**.
   - Acesso ao app: **todas as funcionalidades sem restrição** (sem login).
   - Classificação de conteúdo (IARC): categoria *Utilitário / Comunicação*; responda "não" a violência,
     sexo, linguagem, drogas, apostas e compartilhamento de localização. O app **não** permite interação entre
     usuários dentro dele (a conversa acontece no WhatsApp).
   - Público-alvo: **18 anos ou mais** (ou 13+); não é direcionado a crianças.
   - Segurança dos dados: **não coleta dados** e **não compartilha dados**. Dados criptografados em trânsito:
     não se aplica. Exclusão de dados: não se aplica (não há conta).
   - ID de publicidade: **não usa**.
   - App de notícias / saúde / financeiro / governo: **não**.
5. **Página da loja** — nome, descrições, ícone, imagem de destaque e screenshots acima; categoria
   **Comunicação**; e-mail de contato obrigatório.

## App Store Connect

1. **Build** — Xcode 26 ou mais novo (exigência desde 28/04/2026). Em `ios/`: `bundle install &&
   bundle exec pod install`, abra `ChamaZap.xcworkspace`, selecione seu *Team* em *Signing & Capabilities*
   e faça *Product → Archive*. Antes de enviar, *Generate Privacy Report* deve listar o `PrivacyInfo.xcprivacy`.
2. **Informações do app** — nome, subtítulo, categoria **Utilitários** (secundária: Redes Sociais),
   URL de privacidade, URL de suporte (pode ser a página de issues do GitHub).
3. **Privacidade do app** — "**Não coletamos dados deste app**".
4. **Classificação etária** (questionário novo) — responda "não/nenhum" a todos os itens; o app não tem
   mensagens, navegador irrestrito nem conteúdo gerado por usuários dentro dele. Resultado esperado: **4+**.
5. **Criptografia** — já declarado no `Info.plist` (`ITSAppUsesNonExemptEncryption = NO`).
6. **Disponibilidade** — se for distribuir na União Europeia, informe o status de *trader* (DSA); caso
   contrário, desmarque os países da UE.
7. **Nota para o revisor** (reduz o risco das diretrizes 4.2 / 4.2.3):
   ```
   Sem salvar lets people start a WhatsApp conversation with a phone number without adding it to their
   contacts (e.g. replying to a customer, a marketplace seller or a delivery). The app formats and validates
   Brazilian numbers (area code + number, +55 added automatically), normalizes pasted numbers, and explains
   errors inline. If WhatsApp is not installed, it falls back to WhatsApp's official web link (wa.me), so the
   app works on a device without WhatsApp. No data is collected or stored. No login is required.
   Test number: 11 98765-4321.
   ```
