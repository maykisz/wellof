IMPROVEMENTS — Well Of Hangar (Homepage)

Objetivo

Listar de forma prática e prioritária as melhorias recomendadas para a página inicial, com foco em conversão (contato/lead), confiança do cliente, acessibilidade, SEO e performance. Este documento contém apenas descrições e recomendações — sem trechos de código.

Prioridades (ordem recomendada)

1) Conversão e contato
- Inserir método de contato imediato visível: número de telefone e botão WhatsApp persistente e um formulário de contato simples em `#contato` (nome, telefone/email, mensagem, data desejada).
- Tornar CTA principal consistente: botão primário no header e na dobra (hero) apontando para formulário/WhatsApp.
- Adicionar um pequeno processo de triagem no formulário (ex.: tipo de serviço, urgência) para qualificar leads.

2) Clareza de oferta e copy
- Reescrever o H1 e subtítulo do hero para comunicar benefício claro e diferencial (o que o cliente ganha — p.ex. acesso controlado, suporte no local, agendamento rápido).
- Incluir seção curta “Como funciona” com 3 passos objetivos (Reservar → Chegada → Suporte) e um exemplo de SLA ou tempo médio de resposta.
- Apresentar preços indicativos ou pacotes básicos, mesmo que somente estimativas/intervalos, para reduzir fricção.

3) Prova social e confiança
- Adicionar depoimentos/quotes de clientes e, se possível, logotipos de parceiros ou fabricantes (já há logos no slider — explicar o contexto de cada logo: cliente, parceiro, avião compatível).
- Incluir dados formais no rodapé (CNPJ, razão social, endereço completo) e link para política de privacidade e termos.
- Criar uma seção FAQ com dúvidas comerciais (como agendar, custos, requisitos de acesso).

4) Performance e mídias
- Remover ou transformar a intro WebGL em opção “Ver vídeo” (modal), evitando autoplay forçado para visitantes novos.
- Substituir autoplay de múltiplos vídeos por posters e controlos; carregar vídeos apenas quando visíveis (lazy-load) e usar formatos otimizados (AVIF/WebP para imagens, MP4 H.264/HEVC ou adaptativo para vídeo).
- Reduzir número de vídeos em mobile e oferecer alternativas (imagens estáticas ou GIFs leves).

5) Acessibilidade (A11y)
- Garantir legendas/transcrição para todos os vídeos importantes; adicionar controles visíveis e alternativa textual onde relevante.
- Incluir “skip to content”, foco visível e navegação por teclado para menu e lightboxes.
- Revisar todos os `alt` das imagens; evitar `alt=""` em imagens informativas (ex.: VisitCta) — descrever o propósito.
- Garantir contraste de texto conforme WCAG AA e atributos ARIA corretos em components interativos.

6) SEO técnico e estrutura de dados
- Adicionar JSON-LD `LocalBusiness` com endereço, telefone, horário e URL; adicionar `schema` para Organization e `Service` se aplicável.
- Confirmar meta tags sociais (OpenGraph e Twitter Card) e adicionar `canonical` e `hreflang` se houver versões multilíngues.
- Gerar e publicar `robots.txt` e `sitemap.xml` e garantir que páginas de políticas estejam indexáveis conforme necessidade.

7) Conteúdo e navegabilidade
- Tornar o fluxo de navegação mais direto: CTA’s contextualizados em cada seção (ex.: “Agendar visita” em Visit CTA, “Solicitar hangaragem” em Services) com âncoras e links externos consistentes.
- Remover seções redundantes ou que não convertem (ex.: excesso de autoexposição visual sem ação).

8) Medição e confiança operacional
- Integrar analytics básicos (GA4 ou similar) + eventos para cliques em CTA, envios de formulário e abertura de lightboxes.
- Registrar e acompanhar métricas de conversão (lead → contato), LCP e CLS para monitorar impacto das mudanças.

Quick wins (faça já)
- Colocar um número/WhatsApp no topo e no rodapé (visível em mobile). Isso aumenta conversão com mínimo esforço.
- Trocar autoplay da intro por poster; manter botão “Ver vídeo” — rápida alteração com grande ganho de performance.
- Adicionar `alt` descritivos onde faltam; checagem manual de 10 imagens críticas.
- Adicionar `mailto` com assunto predefinido e adicionar link direto para abrir WhatsApp web/mobile.

Critérios de aceitação (como validar)
- CTA visível na dobra que gera clique → abertura de formulário ou WhatsApp.
- Formulário envia lead com pelo menos nome e contato e marca evento de conversão no analytics.
- LCP reduzido (remover intro autoplay) e sem regressão significativa no CLS.
- Página passa checagem básica de acessibilidade: navegação por teclado e contraste.

Próximos passos sugeridos
- Validar com stakeholders as prioridades (preço, contatos, provas sociais).
- Implementar quick wins (WhatsApp, poster intro, alt tags) e medir impacto por 7–14 dias.
- Planejar segunda rodada: formulário completo, SEO Schema, depoimentos e compressão/serving via CDN.

Observações finais

A homepage atual tem visual forte e produção multimídia de alto nível, mas peca por foco na conversão e por custo de performance. Reduzir o "show" que não converte (intros e autoplay em excesso) e aumentar canais de contato explícitos trará melhoria direta em leads e percepção de profissionalismo.

---
Documento gerado pelo time de revisão — se quiser, converto estas recomendações em alterações de código (patches) priorizados.