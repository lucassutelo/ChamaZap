# Sem salvar — Converse sem salvar o contato

![GitHub License](https://img.shields.io/github/license/lucassutelo/ChamaZap)
![Version](https://img.shields.io/badge/version-2.0.0-0A7D55)
[![Play Store](https://img.shields.io/badge/Download%20on-Google%20Play-0A7D55)](https://play.google.com/store/apps/details?id=com.chamazap)

O **Sem salvar** (antigo *Chama no Zap*) abre uma conversa no WhatsApp com qualquer número de telefone, sem
precisar salvar o contato na agenda. Digite o número com DDD e toque em **Abrir conversa**.

## Funcionalidades

- Abre a conversa no WhatsApp a partir do número com DDD (o `+55` é automático).
- Máscara para celular `(00) 00000-0000` e fixo `(00) 0000-0000`.
- Números colados com `+55`, espaços, traços ou `0` de longa distância são ajustados automaticamente.
- Avisos de número incompleto ou inválido no próprio campo.
- Se o esquema `whatsapp://` não abrir, usa o link oficial `https://wa.me/` (WhatsApp Business ou navegador).
- Nada é salvo: nem na agenda, nem no app. Sem anúncios, sem cadastro, sem permissões.
- Modo claro e escuro, alto contraste (WCAG AA) e suporte a fonte ampliada e leitores de tela.

## Tecnologias

- [React Native](https://reactnative.dev/) 0.87 (Nova Arquitetura, Hermes) com TypeScript
- [styled-components](https://styled-components.com/) para o design system (`src/styles`)
- [react-native-safe-area-context](https://github.com/AppAndFlow/react-native-safe-area-context) (edge-to-edge)
- [react-native-svg](https://github.com/software-mansion/react-native-svg) (logotipo e ícones)

## Requisitos

- Node.js ≥ 22.11 e Yarn 1
- Android: JDK 17 e Android SDK 37 (target 36)
- iOS: macOS com **Xcode 26** ou mais novo, CocoaPods (via `bundle install`)

## Como rodar

```sh
yarn install

# Android
yarn android

# iOS
cd ios && bundle install && bundle exec pod install && cd ..
yarn ios
```

## Qualidade

```sh
yarn test        # Jest: formatação, validação, abertura do WhatsApp e tela
yarn lint        # ESLint
yarn typecheck   # TypeScript
```

## Estrutura

```
src/
  components/        LogoMark e ícones (SVG)
  screens/Home/      tela principal
    components/      AppHeader, PhoneField, Helper, PrimaryButton
    functions/       FormatNumber, ValidateNumber, OpenChat
  styles/            tokens (espaçamento, raios) e temas claro/escuro
  config.ts          URL da política de privacidade
docs/
  design/            proposta de redesign, pesquisa, personas, logotipo e prints
  privacidade/       política de privacidade (GitHub Pages)
store/               textos, ícone, imagem de destaque, screenshots e passo a passo das lojas
```

## Publicação

O passo a passo do Google Play e da App Store (assinatura, Data safety, App Privacy, classificação etária,
nota para o revisor) está em [`store/README.md`](store/README.md).

[![Disponível no Google Play](https://play.google.com/intl/pt-BR/badges/static/images/badges/pt-br_badge_web_generic.png)](https://play.google.com/store/apps/details?id=com.chamazap)

---

O Sem salvar não é afiliado, patrocinado ou endossado pelo WhatsApp ou pela Meta. WhatsApp é uma marca
registrada da WhatsApp LLC.
