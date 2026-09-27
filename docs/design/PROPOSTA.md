# Sem salvar — Proposta de redesign

> Status: **aguardando aprovação**. Nada no código do app foi alterado ainda. Este documento, os prints em
> [`prints/`](prints/) e os arquivos de logotipo em [`logo/`](logo/) são a proposta para validação.

| Print | Conteúdo |
| --- | --- |
| [`01-tela-principal.png`](prints/01-tela-principal.png) | Tela principal · iOS e Android · claro e escuro · vazio e preenchido |
| [`02-antes-depois.png`](prints/02-antes-depois.png) | Comparação com o layout atual |
| [`03-marca-design-system.png`](prints/03-marca-design-system.png) | Logotipo, ícones, cores, tipografia, componentes |
| [`04-abertura-splash.png`](prints/04-abertura-splash.png) | Tela de abertura iOS/Android nos dois temas |
| [`05-propostas-melhoria.png`](prints/05-propostas-melhoria.png) | Melhorias funcionais sugeridas (fora do escopo até aprovação) |
| [`06-materiais-lojas.png`](prints/06-materiais-lojas.png) | Screenshots de divulgação e imagem de destaque do Play |
| [`telas/`](prints/telas/) | Telas individuais em 2x |

Os mockups são gerados a partir de [`src/mockups.html`](src/mockups.html) (HTML/CSS com os mesmos tokens do
design system), então qualquer ajuste pedido na aprovação é rápido de refazer.

## 1. Mercado

### 1.1 Contexto no Brasil

- **O WhatsApp está em praticamente todo celular:** instalado em 98,3% dos smartphones e na tela inicial de
  64,8% ([Super Panorama Mobile Time/Opinion Box, jun/2026](https://www.mobiletime.com.br/noticias/09/06/2026/whatsapp-super-panorama/));
  97% abrem o app todo dia ([Opinion Box 2025](https://blog.opinionbox.com/pesquisa-whatsapp-no-brasil/)).
- **É o canal de negócios do país:** 80% dos usuários conversam com empresas pelo app com frequência
  ([Opinion Box 2025](https://blog.opinionbox.com/pesquisa-whatsapp-no-brasil/)); 82% dos MEIs e pequenos
  negócios o têm como principal canal de comunicação e vendas
  ([Sebrae, Pulso dos Pequenos Negócios 2026](https://agenciasebrae.com.br/dados/whatsapp-se-consolida-nas-vendas-on-line-enquanto-facebook-e-lojas-proprias-perdem-folego/)).
  São ~12 milhões de MEIs e 26,2 milhões de trabalhadores por conta própria
  ([Sebrae](https://agenciasebrae.com.br/dados/metade-das-empresas-brasileiras-sao-mei/),
  [IBGE via InfoMoney](https://www.infomoney.com.br/economia/registro-de-cnpj-entre-trabalhadores-autonomos-atinge-recorde-em-2025-aponta-ibge/)).
- **Android domina, mas iOS é relevante:** Android 76% × iOS 23% entre internautas com smartphone
  ([Panorama Smartphone Mobile Time, mai/2025](https://www.scribd.com/document/883521583/2025-MobileTime-Esporadico-Panorama-Smartphone-28-03)).
  O celular mais vendido da América Latina em 2025 foi o **Galaxy A06** (tela HD+ 720×1600, 4 GB) e 76% das
  vendas são de entrada/intermediários
  ([Counterpoint via GSMArena](https://m.gsmarena.com/counterpoint_samsung_galaxy_a06_was_the_bestselling_phone_in_latam_for_2025-amp-71620.php))
  → o app precisa ser leve e ficar bom em tela HD.
- **Idosos estão chegando:** 74,5% das pessoas com 60+ usaram internet em 2025 (44,8% em 2019), e a principal
  barreira de quem não usa é "não saber usar"
  ([IBGE PNAD TIC 2025](https://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/47410-internet-chega-a-95-de-domicilios-do-pais-em-2025)).
  Mais de 1 em cada 5 usuários aumenta o tamanho da fonte do sistema ([Appt](https://appt.org/en/stats/font-size)).

### 1.2 Concorrência

| App | Loja | Tração | Destaques | Pontos fracos |
| --- | --- | --- | --- | --- |
| Click to chat (TrianguloY) | Play | ~18 mi downloads · 4,5★ | Sem anúncios e sem permissões, DDI, recentes, mensagem, abrir da área de transferência | Visual utilitário, inglês primeiro |
| DirectChat / WhatsDireto | Play | ~12 mi · 4,5★ | Número + mensagem, WhatsApp/Business | Recursos extras fora do foco (baixar status) |
| ZAP Sem Contato (GUCA) | Play | ~3,6 mi · 4,8★ | Concorrente brasileiro direto de maior tração | — |
| Easy Message | Play/iOS | 1 mi+ · 4,6★ / 4,7★ | Colar da área de transferência | Compras no app |
| WA Direct Chat | Play | 160 mil · 4,5★ | Histórico, modelos | **Anúncio de 60 s antes de abrir o WhatsApp** |
| Zap sem contato: Zap rápido | iOS | 4,7★ | Mensagens salvas, iCloud, Business | — |

Fontes: AppBrain e App Store (links na pesquisa em [`PESQUISA.md`](PESQUISA.md)).

**Concorrentes indiretos:** no próprio WhatsApp é possível digitar um número em "Nova conversa" (desde 2023),
usar links `wa.me` ou mandar o número para si mesmo e tocar nele. Todos exigem mais passos, formato
internacional ou conhecimento que muitos usuários não têm. **Ameaça no médio prazo:** os nomes de usuário
(@) do WhatsApp, com lançamento global previsto para 2026
([9to5Google](https://9to5google.com/2026/06/29/whatsapp-usernames-launch-later-this-year-heres-how-to-get-yours-now/)).

### 1.3 O que os usuários da categoria valorizam e odeiam

- **Valorizam:** rapidez, zero anúncios, zero permissões, colar número copiado, recentes, escolher WhatsApp
  ou Business, integração com o toque longo em números.
- **Odeiam:** anúncios (inclusive intersticiais antes de abrir a conversa), passos demais e o erro
  "O número de telefone compartilhado através de URL é inválido" — causado por `55` faltando/repetido, DDD
  esquecido, 9 omitido ou número colado com traços
  ([zapwa.io](https://zapwa.io/guides/numero-telefone-url-invalido-como-resolver-2025.html)).
- **Pesquisa de UX de formulários:** máscaras localizadas reduzem hesitação e erro, e 89% ignoram exemplos de
  formato ([Baymard](https://baymard.com/blog/input-masking-form-field)); placeholder não substitui rótulo
  ([NN/g](https://www.nngroup.com/articles/form-design-placeholders/)); erros devem aparecer junto ao campo, e
  modais ficam para decisões sérias ([NN/g](https://www.nngroup.com/articles/indicators-validations-notifications/)).

### 1.4 Posicionamento proposto

> **"Sem salvar": o jeito mais simples e confiável de abrir uma conversa no WhatsApp sem salvar o contato —
> feito para o número brasileiro, sem anúncios, bonito nos dois temas e fácil para qualquer idade.**

Diferenciais sustentáveis frente aos líderes: foco total no Brasil (máscara, DDD, `+55` automático), acessibilidade
(fonte grande, contraste, textos claros) e visual nativo moderno. O novo nome também resolve dois problemas:
as diretrizes de marca do WhatsApp vetam variações do nome como "Zap"
([Meta](https://www.meta.com/brand/resources/whatsapp/whatsapp-brand/)) e já existem vários apps
"Chama no Zap"/"Chama ZAP" nas lojas.

## 2. Personas

As quatro personas abaixo cobrem os principais contextos de uso. As duas primeiras são o público primário
(uso frequente); as duas últimas são secundárias, mas definem o nível mínimo de clareza e acessibilidade.

### Rose, 42 — manicure MEI (Belo Horizonte) · *primária*

- **Aparelho:** Galaxy A06 (Android de entrada, tela HD+), fonte do sistema em "Grande", WhatsApp Business.
- **Contexto:** recebe pedidos de horário por indicação, Instagram e recados; fala com a cliente uma ou duas
  vezes e não quer a agenda cheia de gente que nunca mais vai ver. Usa o celular com uma mão, entre um
  atendimento e outro.
- **Objetivo:** confirmar o horário em segundos. **Frustrações:** anúncios, apps lentos, alertas que
  interrompem. **Frase:** *"Eu só quero mandar um 'oi, tá confirmado' sem salvar ninguém."*
- **Implica:** app leve e rápido no Android de entrada, botão na zona do polegar, sem anúncios, contraste alto
  para uso sob luz forte, suporte ao WhatsApp Business (proposta).

### Marcelo, 35 — corretor de imóveis (São Paulo) · *primária*

- **Aparelho:** iPhone, modo escuro à noite, WhatsApp e WhatsApp Business.
- **Contexto:** recebe dezenas de leads por dia de portais e formulários, geralmente com o número copiado como
  `+55 11 9…`. Responder rápido faz diferença na conversão.
- **Objetivo:** abrir a conversa do lead em 1–2 toques. **Frustrações:** ter que redigitar número, formatos
  que quebram (`+55` duplicado), perder o fio de quem ele já chamou. **Frase:** *"Se eu salvar todo lead, minha
  agenda vira um caos."*
- **Implica:** colar número normalizado (B4), recentes, mensagem inicial e escolha do Business (propostas);
  qualidade de app nativo no iOS.

### Júlia, 24 — estudante e compradora em marketplaces (Recife) · *secundária*

- **Aparelho:** Moto G, sempre no modo escuro.
- **Contexto:** compra e vende no Marketplace, OLX e Instagram; fala com desconhecidos por pouco tempo e é
  cuidadosa com golpes (28% dos golpes mais citados envolvem alguém se passando por conhecido no WhatsApp —
  [Febraban](https://febrabantech.febraban.org.br/temas/seguranca/tentativas-de-golpes-aumentam-no-brasil)).
- **Objetivo:** negociar sem que o estranho entre nos contatos (e sem que veja seus status).
  **Frase:** *"Não quero vendedor aleatório vendo meus stories."*
- **Implica:** modo escuro de primeira linha, mensagem de privacidade clara, fluxo curto.

### Seu Antônio, 67 — aposentado (Porto Alegre) · *secundária, define a acessibilidade*

- **Aparelho:** Android intermediário herdado da filha, fonte no máximo.
- **Contexto:** a filha instalou o app para ele chamar a farmácia, o encanador ou o consultório a partir de
  números anotados em papel ou panfleto. Não sabe o que é "código do país"; se perde com ícones sem texto.
- **Objetivo:** conseguir sozinho, sem medo de errar. **Frustrações:** letras pequenas, mensagens técnicas,
  telas que mudam de lugar. **Frase:** *"É só colocar o número com o DDD? Então tá."*
- **Implica:** instrução explícita na tela, rótulo sempre visível, exemplo de formato, `+55` já preenchido,
  número grande, alto contraste, texto nos botões, erro explicado em linguagem simples (proposta de validação
  no campo), suporte a fonte ampliada.

### Jornada comum (todas as personas)

1. Tem um número em mãos (papel, anúncio, e-mail, mensagem) → 2. abre o app (teclado já aberto) → 3. digita
   ou cola o número → 4. toca "Abrir conversa" → 5. está no WhatsApp. **Meta de design: ≤ 5 segundos e
   nenhuma dúvida no passo 3.**

## 3. Princípios de design

1. **Uma tela, um campo, uma ação.** O app continua fazendo só uma coisa. Tudo que não ajuda a digitar o
   número e abrir a conversa sai da tela.
2. **O teclado está sempre aberto.** O campo já recebe foco ao abrir (`autoFocus`), então metade da tela é
   teclado. O layout foi desenhado de cima para baixo para o espaço **acima do teclado**, com o botão
   preso logo acima dele, na zona do polegar — o mesmo padrão do fluxo de PIX dos bancos, que o brasileiro já
   conhece. No iOS o teclado numérico **não tem tecla "enviar"**, então o botão precisa estar sempre visível.
3. **Dizer o que fazer, não só pedir.** Título + frase curta explicam o app para quem o abre pela primeira
   vez; o rótulo "Número com DDD" e o exemplo `(11) 91234-5678` mostram o formato esperado; o `🇧🇷 +55`
   deixa claro que não é preciso digitar o código do país.
4. **Confiança explícita.** "O número não fica salvo na agenda nem no app" responde à principal dúvida de
   quem usa (e é verdade: o app não guarda nada).
5. **Legível para todos.** Contraste WCAG AA em tudo, número em 30 pt com algarismos tabulares, alvos de
   toque ≥ 48 pt, fontes do sistema que respeitam o tamanho de letra configurado no celular.
6. **Nativo nos dois sistemas.** Mesmo layout, mas com SF Pro no iOS, Roboto no Android, teclado e
   comportamento de cada plataforma, splash e ícones no padrão atual de cada loja.

## 4. Marca

**Nome:** Sem salvar · **Frase:** "Converse sem salvar o contato."

**Logotipo recomendado — conceito A "Direto":** balão de conversa verde-menta com uma seta ↗ ("abre
direto, fora do app") sobre fundo tinta-verde (`#12402F → #061A13`).

- Não usa telefone, nem balão redondo, nem fundo verde-WhatsApp: evita o risco de "marca parecida" nas
  diretrizes da Apple (5.2) e na política de propriedade intelectual/falsificação de identidade do Google
  Play, sem perder a associação com conversa.
- Legível de 1024 px até 29 pt (Ajustes do iOS) e em ícone adaptativo redondo do Android.
- Variantes prontas: [`icon-a-direto.svg`](logo/icon-a-direto.svg) (principal),
  [`icon-a-tinted.svg`](logo/icon-a-tinted.svg) (iOS tingido), [`icon-a-mono.svg`](logo/icon-a-mono.svg)
  (Android ícone temático), [`icon-a-direto-1024.png`](logo/icon-a-direto-1024.png).
- Alternativas avaliadas: [B "Teclado"](logo/icon-b-teclado.svg) (comunica bem, mas verde + balão branco
  lembra demais o WhatsApp) e [C "Claro"](logo/icon-c-claro.svg) (invertido; perde força em fundos claros).

**Wordmark:** "sem salvar" em minúsculas, Plus Jakarta Sans ExtraBold (licença OFL), cor `#0B2A20` no claro e
`#EEF3F1` no escuro. Usado só em materiais da loja; dentro do app o nome aparece em fonte do sistema.

## 5. Design system

### 5.1 Cores

Todas as combinações de texto passam **WCAG AA (≥ 4,5:1)**; o contorno do campo em foco passa 3:1 (WCAG 1.4.11).

| Token | Claro | Escuro | Uso | Contraste |
| --- | --- | --- | --- | --- |
| `background` | `#F5F7F6` | `#0B1110` | fundo da tela | — |
| `surface` | `#FFFFFF` | `#141C1A` | campo, cartões | — |
| `surfaceMuted` | `#EEF2F0` | `#1B2522` | chip `+55`, botão desabilitado | — |
| `border` | `#DCE3E0` | `#25302C` | divisórias | — |
| `outline` | `#8A9791` | `#5E6D67` | contorno do campo sem foco | 3,3:1 / 3,1:1 |
| `text` | `#0F1A16` | `#EEF3F1` | títulos, número | 16,6:1 / 17,0:1 |
| `textSecondary` | `#52605A` | `#A3B1AB` | descrições, rótulos | 6,1:1 / 8,6:1 |
| `textTertiary` | `#6B7872` | `#7F8D87` | placeholder | 4,6:1 / 5,0:1 |
| `primary` | `#0A7D55` | `#2FD694` | botão, foco, cursor | — |
| `onPrimary` | `#FFFFFF` | `#04241A` | texto do botão | 5,2:1 / 8,8:1 |
| `primaryPressed` | `#086646` | `#25B97F` | botão pressionado | — |
| `focusRing` | `#0A7D55` 16% | `#2FD694` 20% | halo do campo em foco | — |
| `danger` | `#C62828` | `#FF7A73` | erro (proposta) | 5,6:1 / 6,8:1 |

O verde primário foi escolhido para ser **distinto do verde do WhatsApp** (`#25D366`/`#00A884`) e ter
contraste suficiente com texto branco — o verde atual do botão (`#03A23D`) com texto branco tem 3,5:1 e não
passa AA.

### 5.2 Tipografia

Fontes do sistema (SF Pro / Roboto): zero peso extra no app e suporte a tamanho de fonte do usuário
(com limite de ampliação no campo do número para não quebrar o layout).

| Estilo | Tamanho/altura | Peso | Uso |
| --- | --- | --- | --- |
| `title` | 28/34 | Bold | "Converse sem salvar o contato" |
| `number` | 30/36 | Semibold, `tabular-nums` | número digitado |
| `button` | 17/22 | Semibold | "Abrir conversa" |
| `body` | 16/22 | Regular | frase de apoio |
| `label` | 13/18 | Semibold | "Número com DDD" |
| `caption` | 13/18 | Regular | nota de privacidade |
| `appName` | 17/22 | Bold | cabeçalho |

### 5.3 Espaçamento, forma e elevação

- Grade de 4 pt: `4 · 8 · 12 · 16 · 20 · 24 · 32`. Margem lateral 20 pt.
- Raios: chip 8–10 · campo 20 (16 no Android) · botão pílula.
- Alvos de toque ≥ 48 pt; botão com 56 pt de altura, largura total.
- Sombra suave só no modo claro (campo); no escuro a separação é feita por cor de superfície.

### 5.4 Componentes

- **AppHeader** — ícone 30 pt + "Sem salvar" + link de texto "Privacidade" à direita (exigência das lojas; abre a política no navegador).
- **PhoneField** — cartão com rótulo, indicador `🇧🇷 +55`, valor com máscara `(00) 00000-0000`, cursor na cor
  primária, estados: focado (padrão), preenchido, erro (proposta).
- **PrimaryButton** — pílula, ícone ↗ à direita, estados normal/pressionado (e desabilitado, se aprovada a
  validação no campo).
- **Helper** — linha de apoio com ícone de cadeado.

## 6. Tela principal (especificação)

```
┌──────────────────────────────┐
│ [ic] Sem salvar  Privacidade │  AppHeader
│                              │
│ Converse sem salvar          │  title
│ o contato                    │
│ Digite o número com DDD. A   │  body
│ conversa abre direto no ...  │
│ ┌──────────────────────────┐ │
│ │ Número com DDD   🇧🇷 +55  │ │  PhoneField (foco automático)
│ │ (11) 98765-4321|         │ │
│ └──────────────────────────┘ │
│ 🔒 O número não fica salvo... │  Helper
│                              │
│ [     Abrir conversa ↗     ] │  PrimaryButton (preso acima do teclado)
├──────────────────────────────┤
│         teclado numérico     │
└──────────────────────────────┘
```

Comportamento **idêntico ao atual**: foco automático, teclado `phone-pad`, máscara, tecla "enviar" do
teclado (Android) abre a conversa, botão abre a conversa, alertas nativos para número inválido e WhatsApp
não instalado, campo é limpo depois de abrir, tema segue o sistema.

Mudanças puramente visuais/de layout: *safe area* + `KeyboardAvoidingView` (necessários no Android 15+
edge-to-edge), `StatusBar` na cor do tema, textos de apoio, rótulos de acessibilidade para leitores de tela.
Único acréscimo: o link **"Privacidade"**, exigido por Apple (5.1.1) e Google Play (seção 7).

## 7. Lojas: o que precisa mudar para publicar

Levantamento de setembro/2026 (fontes em [`PESQUISA.md`](PESQUISA.md#4-requisitos-das-lojas)).

### 7.1 Diagnóstico

| Situação atual | Exigência atual | Consequência |
| --- | --- | --- |
| React Native 0.72.4, AGP 7.4, Gradle 8.0 | Só o RN **0.77+** gera bibliotecas nativas alinhadas a 16 KB; API 36 exige AGP 8.9.1+ | **Não dá para atender o Play sem atualizar o RN.** Alvo: RN 0.87.1 (atual) |
| `targetSdk 33` | Updates precisam de **`targetSdk 36`** desde 31/08/2026 (extensão possível até 01/11/2026); apps publicados abaixo de 35 deixam de aparecer para usuários novos em Androids mais recentes | O app hoje está **escondido** para boa parte dos novos usuários |
| Sem tratamento de *safe area* | Com target 36 o **edge-to-edge é obrigatório** (sem opt-out) | Topo da tela ficaria sob a barra de status → o novo layout já prevê isso |
| Splash = `windowBackground` com imagem | Android 12+ usa a **SplashScreen API** (cor sólida + ícone) | Hoje o Android 12+ mostra o ícone antigo recortado; será migrado |
| Ícone PNG não adaptativo | Ícone adaptativo + camada monocromática (ícones temáticos) | Novo ícone em todos os formatos |
| `versionCode 1`, Flipper, `newArchEnabled=false` | versionCode maior que o publicado; Flipper removido (0.74); Nova Arquitetura obrigatória (0.82) | Ajustes de build |
| iOS: target 12.4, bundle ID de exemplo, **AppIcon vazio**, sem privacy manifest | Upload só com **Xcode 26 / SDK iOS 26** (desde 28/04/2026), target ≥ 15.1 (RN), `PrivacyInfo.xcprivacy`, ícone 1024 px | **O app hoje não pode ser enviado à App Store** |
| `Info.plist` com `armv7`, `NSLocationWhenInUseUsageDescription` vazio, sem `ITSAppUsesNonExemptEncryption` | `arm64`, sem permissões sem uso, declarar criptografia isenta | Ajustes de plist |
| Sem política de privacidade | **Obrigatória nas duas lojas**, com link na loja **e dentro do app**; Data safety e App Privacy preenchidos mesmo sem coleta | Link "Privacidade" no cabeçalho (já nos prints) + página pública |

> ⚠️ **Urgente (fora do código):** o prazo da **verificação de desenvolvedor Android no Brasil é 30/09/2026**.
> O Google diz registrar 99% dos apps automaticamente, mas vale confirmar no Play Console se o `com.chamazap`
> está registrado.

### 7.2 Android — checklist

1. Atualizar para **React Native 0.87.1** (React 19.2, Nova Arquitetura, Hermes). Para um app deste tamanho, o
   caminho mais seguro é gerar o projeto nativo novo pelo template oficial e portar `src/`, mantendo
   **`applicationId com.chamazap`** (não pode mudar, senão vira outro app no Play) e o mesmo keystore de upload.
2. `minSdk 24`, `targetSdk 36`, `compileSdk 37`, AGP/Gradle/Kotlin do template, JDK 17, Node ≥ 22.13.
3. Edge-to-edge: `react-native-safe-area-context` + `KeyboardAvoidingView`; `windowSoftInputMode="adjustResize"`.
4. Splash: `Theme.SplashScreen` (`androidx.core:core-splashscreen`) com fundo `#F5F7F6`/`#0B1110` e o ícone.
5. Ícone adaptativo (`mipmap-anydpi-v26`: frente, fundo e monocromático) gerado a partir do SVG.
6. Nome "Sem salvar"; `versionCode` 2+ e `versionName` 2.0.0; remover Flipper e Jetifier.
7. Senhas do keystore fora do repositório (hoje `gradle.properties` tem placeholders versionados).
8. Validar o alinhamento de 16 KB no AAB (App Bundle Explorer / `bundletool`).
9. Play Console: política de privacidade, Data safety ("não coleta, não compartilha"), sem anúncios, público-alvo
   adulto, classificação IARC, nova listagem, ícone 512 px, imagem de destaque 1024×500, screenshots.

### 7.3 iOS — checklist

1. Bundle ID próprio (**decisão sua**, ex.: `com.chamazap` ou `br.com.semsalvar`), nome "Sem salvar",
   iPhone-only em retrato (evita exigência de layout e screenshots de iPad).
2. Deployment target 15.1; build com **Xcode 26+**.
3. `PrivacyInfo.xcprivacy` (motivos FileTimestamp `C617.1`, UserDefaults `CA92.1`, SystemBootTime `35F9.1`;
   sem coleta; sem rastreamento).
4. `Info.plist`: `ITSAppUsesNonExemptEncryption = NO`, `arm64`, remover permissão de localização vazia,
   região `pt-BR`. `LSApplicationQueriesSchemes` **não** é necessário (o app usa `openURL`, não `canOpenURL`).
5. AppIcon 1024 px (claro, escuro e tingido) e LaunchScreen com o ícone sobre a cor do tema.
6. App Store Connect: App Privacy "Dados não coletados", URL de privacidade, novo questionário de classificação
   etária (deve resultar em 4+), screenshots 6,9"/6,5", status de *trader* (DSA) ou excluir a UE.

### 7.4 Risco de rejeição na App Store (importante)

A Apple pode rejeitar o app como está pelas diretrizes **4.2.3(i)** ("o app deve funcionar sozinho, sem exigir
outro app instalado"), **4.2** (funcionalidade mínima) e **4.3(b)** (há muitos apps iguais). Isso é uma
avaliação de risco, não uma regra escrita para esse tipo de app — mas é o ponto que mais pode travar a
publicação. O que reduz o risco:

- **Abrir via `https://wa.me/…`** (B5): se o WhatsApp não estiver instalado, abre a página oficial em vez de erro.
- **Funções que agregam valor**: validação no campo, colar número, recentes, WhatsApp/Business (seção 8).
- **Nota para o revisor** explicando o caso de uso (falar com quem você não quer salvar na agenda).

Recomendo aprovar ao menos **B1, B4, B5 e a validação no campo** junto com o redesign.

### 7.5 Textos das lojas (rascunho para aprovação)

| Campo | Google Play | App Store |
| --- | --- | --- |
| Nome | **Sem salvar: chat sem contato** (28/30) | **Sem salvar** (10/30) |
| Subtítulo / descrição curta | Abra conversas no WhatsApp sem salvar o número na agenda. Rápido e sem anúncios. (80/80) | Converse sem salvar o contato (29/30) |
| Palavras-chave (só iOS) | — | `zap,contato,número,conversa,chat,direto,agenda,ddd,mensagem,telefone,rápido,chamar,desconhecido` (95/100) |
| Categoria | Comunicação | Utilitários (principal) · Social Networking (secundária) |

A palavra "WhatsApp" fica **fora do nome, do ícone e das palavras-chave** (diretriz 2.3.7 da Apple e política
de propriedade intelectual do Play) e aparece só de forma descritiva no texto, com o aviso de não afiliação.
"zap" é gíria genérica e ajuda na busca; se preferir risco zero, trocamos por "celular".

**Descrição completa (Play e App Store):**

> Precisa mandar mensagem para alguém, mas não quer salvar o número na agenda?
> Com o **Sem salvar** você digita o número com DDD e a conversa abre direto no WhatsApp. Pronto.
>
> • Rápido: o teclado já abre pronto para digitar.
> • Simples: só o número com DDD — o +55 é automático.
> • Privado: o número não fica salvo na agenda nem no app. Sem cadastro, sem anúncios, sem permissões.
> • Confortável: modo claro e escuro, letras grandes e alto contraste.
>
> Ideal para responder clientes, falar com vendedores de anúncios, confirmar entregas e serviços — sem encher
> a agenda de contatos que você nunca mais vai usar.
>
> O Sem salvar não é afiliado, patrocinado ou endossado pelo WhatsApp ou pela Meta. WhatsApp é uma marca
> registrada da WhatsApp LLC.

## 8. Melhorias funcionais propostas (não implementadas)

Encontrei os pontos abaixo lendo o código. **Nenhum será alterado sem sua aprovação.**

### Bugs e riscos no comportamento atual

| # | Onde | O que acontece | Sugestão |
| --- | --- | --- | --- |
| B1 | `functions/OpenChat.ts` | Em caso de sucesso, `Linking.openURL` é chamado **duas vezes** (dentro do `try` e de novo depois). Pode abrir o WhatsApp duas vezes. | Remover a segunda chamada. |
| B2 | `functions/ValidateNumber.ts` | Para celulares (11 dígitos) o app **remove o 9** de todos os números (`substring(0, 2) + substring(3)`). O identificador interno do WhatsApp costuma ter o 9 nos DDDs 11–28 e não ter nos demais ([Gupshup](https://support.gupshup.io/hc/en-us/articles/4407840924953)), então a regra única pode falhar em parte dos casos. | Testar com números reais de DDDs diferentes e ajustar (ex.: enviar o número completo via `wa.me`, que faz a resolução). |
| B3 | `components/InputNumber.tsx` | A máscara é sempre de celular. Fixos (10 dígitos) aparecem como `(31) 32741-190`. | Máscara dinâmica `(00) 0000-0000` / `(00) 00000-0000`. |
| B4 | `components/InputNumber.tsx` | Ao **colar** `+55 11 98765-4321`, a máscara usa o `55` como DDD → `(55) 11987-6543`. | Normalizar o que for colado (remover `+55`, espaços, traços). |
| B5 | `functions/OpenChat.ts` | O esquema `whatsapp://` exige o app instalado e depende do app registrado para o esquema. | Usar o link oficial `https://wa.me/55…`, que abre o WhatsApp/Business ou a página web como alternativa. |
| B6 | `__tests__/App.test.tsx` | Importa `../App`, que não existe: a suíte de testes não roda. | Corrigir o import (ajuste de infraestrutura, será feito na implementação). |

### Novas funções sugeridas (ver [`05-propostas-melhoria.png`](prints/05-propostas-melhoria.png))

1. **Validação no próprio campo** em vez de alerta; botão habilitado só com número completo.
2. **Colar número** detectado na área de transferência (1 toque) — o caso mais comum é copiar o número de um
   anúncio, site ou Instagram.
3. **Recentes** (histórico local, opcional, com "Limpar") — para retomar uma conversa com quem não foi salvo.
4. **WhatsApp ou WhatsApp Business** — escolher onde abrir quando os dois estão instalados.
5. **Números de outros países** — seletor com busca, Brasil como padrão.
6. **Mensagem inicial opcional** (`?text=`), útil para quem atende clientes.
7. **Android: "Abrir no Sem salvar" ao selecionar um número em qualquer app** (intent `PROCESS_TEXT`) e
   atalhos na tela inicial; **iOS: extensão de compartilhamento / Atalhos (App Intents)**.

Além de melhorar a experiência, 2–7 reduzem o risco de rejeição na App Store pela diretriz **4.2
(funcionalidade mínima)** — ver seção 7.

## 9. Plano de implementação (após aprovação)

1. **Plataforma** — atualizar React Native (0.87.1) e toolchain, configurar Android (target/compile SDK, 16 KB,
   edge-to-edge, ícone adaptativo, SplashScreen API, nome) e iOS (bundle ID, nome, privacy manifest, ícones,
   LaunchScreen, iPhone-only/retrato, criptografia).
2. **Design system** — `src/styles/themes` com os tokens acima (claro/escuro) + tipografia/espaçamento.
3. **Tela** — novos componentes (`AppHeader`, `PhoneField`, `PrimaryButton`, `Helper`) sobre a mesma lógica
   (`ValidateNumber`/`OpenChat` intactos), com acessibilidade.
4. **Ativos** — ícones iOS/Android gerados a partir do SVG, splash, ícone 512 px e feature graphic do Play.
5. **Loja** — textos de listagem (pt-BR), política de privacidade, respostas de privacidade/Data safety,
   roteiro de screenshots.
6. **Verificação** — lint, typecheck e testes aqui; os builds Android/iOS e o teste em aparelho precisam ser
   feitos na sua máquina (este ambiente não tem Android SDK nem Xcode). Deixo o passo a passo no README.

## 10. Decisões que preciso de você

1. **Layout** — aprovar os prints (ou pedir ajustes).
2. **Logotipo** — A "Direto" (recomendado), B ou C.
3. **Melhorias funcionais** — quais itens da seção 8 entram (recomendo B1, B4, B5 e validação no campo).
4. **Bundle ID do iOS** — ex.: `com.chamazap`.
5. **Política de privacidade** — posso publicá-la via GitHub Pages deste repositório (precisa ativar Pages) ou
   você indica outra URL.
6. **Textos da loja** — aprovar ou ajustar a seção 7.5.
