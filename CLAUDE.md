# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # dev server (Turbopack) at http://localhost:3000
npm run build   # production build
npm start       # serve the production build
npm run lint    # eslint (flat config in eslint.config.mjs)
npx tsc --noEmit  # type check
```

No test runner is configured.

## Stack

Next.js 16 (App Router, no `src/` dir), React 19, TypeScript (strict, `@/*` alias maps to the repo root), Tailwind CSS 4.

## Read this first: Next.js docs

`AGENTS.md` warns that this Next.js version has breaking changes relative to common training data. Before writing Next.js code, read the relevant guide in `node_modules/next/dist/docs/`. `next dev` re-creates the `AGENTS.md` block if it is removed.

## Non-default configuration (`next.config.ts`)

- `cacheComponents: true` and `partialPrefetching: true` are enabled. These change caching/rendering semantics (e.g. dynamic data access must be handled per the Cache Components model), so check the docs before writing data fetching or route code.
- Tailwind is wired through Turbopack with a `*.css` rule using `@tailwindcss/turbopack` (not PostCSS). `app/globals.css` contains only `@import "tailwindcss";`.

## Structure

Everything lives in `app/`: `layout.tsx` (root layout, loads Geist fonts via `next/font`, uses the global `LayoutProps<"/">` type) and `page.tsx` (home). The template's sample content has been stripped; the home page is a bare title. The repo is otherwise a fresh scaffold, with no shared components or data layer yet.

## Design system

Referência visual: `01-design-system.png`. Os tokens ficam todos em `app/globals.css` (blocos `@theme`); as fontes são carregadas em `app/layout.tsx`. A paleta, os tamanhos e as sombras padrão do Tailwind foram removidos, então só existem as classes do tema.

- **Cores:** classes semânticas, não as rampas primitivas (`red-500` etc.). Nomes: `canvas`, `surface`, `surface-elevated`, `sidebar`, `input` (fundos); `line`, `line-subtle`, `line-focus` (bordas); `fg-primary|secondary|tertiary|inverse|brand` (texto); `brand-*`; `icon-*`; `action-*`; `status-<tipo>-<bg|text|border>`. O modo escuro troca os valores das mesmas variáveis, então não use `dark:` nesses tokens.
- **Fontes:** `font-display` (títulos grandes) e `font-sans` (padrão). Tamanhos: `text-display`, `text-h2`, `text-h3`, `text-body-lg|md|sm` (só tamanho e altura de linha; o peso vai à parte).
- **Espaçamento:** a unidade base é a padrão do Tailwind (4px): o número da classe é o valor em px dividido por 4 (`p-4` = 16px, `gap-0.5` = 2px, `w-83.75` = 335px). Use só os valores da escala do design (2, 4, 8, 12, 16, 20, 24, 32, 40, 48 e 64px) e nunca valores entre colchetes.
- **Sombras:** `shadow-xs|sm|md|lg|brand-glow`.

### Regras
- Sempre use as classes do design system, nunca valores soltos.
- Todo ícone do projeto vem do react-icons, sempre da mesma família. Não escreva SVG na mão.
- Toda mudança de estado, como hover e foco, tem uma transição suave e curta.
- Quando o design não mostrar como fica o hover de um elemento, defina um hover coerente com o design system, usando as cores e estilos dele.
- Links de âncora (ex.: "Como funciona" no menu da landing) rolam a página suavemente até a seção, sem que o menu fixo cubra o título da seção.
- Enquanto um conteúdo carrega, mostre um estado de carregamento com o formato do conteúdo e faça o conteúdo aparecer com transição suave.
- Respeite a configuração de movimento reduzido do sistema: para quem a ativou, desligue as animações e a rolagem suave.

## Componentes do design system (reutilizáveis)

Estes componentes ficam em `app/components/<Nome>.tsx` (export default) e aparecem em `/preview`, com uma instância de cada variante (código em `app/preview/`). **Eles são reutilizáveis: toda tela nova deve usá-los em vez de criar outros iguais ou parecidos.** Se faltar uma variante, adicione-a ao componente existente (e à `/preview`) em vez de criar um novo. Leia o arquivo do componente para ver as props.

- **Ações:** `Button` (variant `primary|secondary|ghost|danger`, size `md|sm`, `icon`), `IconButton` (tone `default|danger`, shape `square|round`; `label` é obrigatório).
- **Formulário:** `Input` (com `label` e `error`), `MaskedInput` (máscaras brasileiras: `telefone`, `cpf`, `cnpj`, `cep`, `data`, `valor`; use sempre que o campo for um desses dados), `Dropdown` (select nativo com `options`), `Toggle`.
- **Dados e status:** `Badge` (tone `neutral|success|warning|danger|info`), `Table` (genérica, com `columns` e `rows`), `PageHeader`, `EmptyState`.
- **Navegação:** `Sidebar`, `SidebarNavItem`, `FilterTab`, `Tab`, `AccordionHeader`, `Pagination` (controlada: `page`, `totalPages`, `onPageChange`).
- **Cards:** `OrderCard`, `CategoryCard`, `MesaCard`, `PlanUsageCard`, `UpgradeCard`.
- **Modais:** `ModalContainer` e `ConfirmationModal`. São só o contêiner visual; o fundo escuro e o posicionamento ficam por conta da tela.

Os ícones são da família Lucide (`react-icons/lu`) e entram por prop como componente (`icon={LuPlus}`). Só `Toggle` e `AccordionHeader` têm estado próprio (`"use client"`).

## Parent-directory note

A `CLAUDE.md` one level up (`claudeProjetos/`) describes a different project (plain HTML/CSS/JS portfolio, no frameworks). Its stack restrictions do not apply here; this project is Next.js by explicit request.

## Perguntas

Todas as perguntas feitas devem ser em português do Brasil

## Regras de frontend

### Código
- Escreva o código em inglês: nomes de variáveis, funções, componentes, arquivos e comentários.
- Textos exibidos na interface e endereços das páginas ficam em português.

### Estilo
- Use apenas as cores, fontes e espaçamentos do tema. Nunca escreva um valor solto, como #3E56C9 ou 13px, direto no componente.
- Não instale bibliotecas novas sem pedir antes.
- Importe apenas os ícones usados em cada arquivo (ex.: `import { FiPlus } from "react-icons/fi"`), nunca o pacote inteiro.

### Componentes
- Antes de criar um componente, verifique se já existe um parecido em app/components.
- Componente usado por mais de uma tela fica em app/components/<Nome>.tsx, faz parte do design system e aparece na página /preview, com uma instância de cada variante.
- Componente usado só por uma tela fica em app/<rota>/_components/<Nome>.tsx, junto da própria página. Pastas iniciadas com underscore não viram rota e não precisam aparecer na /preview.
- Se um componente local passar a ser usado por uma segunda tela, mova ele para app/components e me avise.
- Não deixe a tela inteira em um único arquivo: quebre os blocos da página, como cabeçalho, filtros, listagem e formulário, em componentes dentro do _components da própria página.
- Nome do arquivo em PascalCase e export default.
- Props tipadas com interface acima do componente. Props de texto e estilo têm valor padrão.
- Variantes (ex.: botão primário e secundário) ficam em um objeto de mapeamento no topo do arquivo, não em if encadeado.

### Next.js
- Ao criar ou alterar componentes e páginas, siga a skill react-best-practices.
- Use "use client" só em componentes com estado ou evento, como clique e digitação.
- Use o componente Image do Next para imagens e Link para navegação entre páginas.

### HTML e acessibilidade
- Use button para ações, Link para navegação, label em todo campo de formulário e alt em toda imagem.
- Todo elemento clicável funciona pelo teclado e mostra foco visível.
- Todo elemento clicável, como botões, links e cards clicáveis, usa cursor-pointer.

### Layout
- Monte primeiro a versão para celular e depois ajuste para telas maiores.
- Não copie do Figma posições fixas em pixels. Use flex e grid.

### Listas e cards
- Aplique esta seção somente quando a interface realmente tiver uma coleção de itens repetidos, como cards ou listagens de registros. Se a tela não tiver, ignore estas regras: grid não é o padrão para todo layout.
- Havendo a coleção, distribua os itens com CSS Grid de colunas automáticas (auto-fit/auto-fill), nunca com largura fixa em pixels.
- Essa é a única exceção à regra de não usar valores entre colchetes no Tailwind: grid-cols-[repeat(auto-fit,minmax(_,1fr))] é permitido, usando como valor mínimo um espaçamento do tema.
- Os itens preenchem toda a largura do container e se ajustam sozinhos ao espaço, sem deixar vãos grandes sobrando.
- As dimensões dos itens não precisam ser exatamente as da referência de design. Priorize caber bem na tela, mantendo as cores, fontes e espaçamentos do tema.
- Em telas grandes, a navegação é por paginação, não por rolagem: calcule quantos itens cabem na altura visível e mostre só essa quantidade por página.
- Use o componente de paginação do design system. Se não existir um, crie seguindo o estilo do design system e me avise ao final.
- A paginação fica no rodapé da listagem, centralizada e visível sem precisar rolar.
- No celular a regra é outra: pode rolar normalmente, com coluna única e mais itens por página.
