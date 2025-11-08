import { type ReactNode, useEffect, useMemo, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChartBarStacked,
  ClipboardList,
  MessageCircle,
  Rocket,
  Sparkles,
} from "lucide-react"
import QRCode from "react-qr-code"

import backgroundImage from "@/assets/background.png"
import logoImage from "@/assets/logo_crescer.jpg"
import diogoPhoto from "@/assets/diogo.png"
import heroPhoto from "@/assets/foto_curso.png"
import luisPhoto from "@/assets/Luis.png"
import diegoPhoto from "@/assets/Diego.png"
import lucasPhoto from "@/assets/Lucas.png"
import joaoPhoto from "@/assets/joao.png"
import henriquePhoto from "@/assets/henrique.png"
import crescerZapIcon from "@/assets/zap.png"
import crescerFlowIcon from "@/assets/flow.png"
import { Button } from "@/components/ui/button"

const defaultConfig = {
  courseTitle: "Inteligência Artificial para Análise de Dados e Consultoria",
  instructorName: "Instrutor: Diogo Albuquerque",
  companyName: "Crescer Negócios e Consultoria",
}

type TeamMember = {
  name: string
  roleLine1: string
  roleLine2?: string
  description: string
  summary?: string
  image?: string
  imageAlt?: string
}

type WorkflowCard =
  | { title: string; type: "list"; items: string[] }
  | {
      title: string
      type: "paragraphs"
      paragraphs: { label: string; text: string }[]
    }
  | { title: string; type: "text"; text: string }

type WorkflowStage = {
  tag: string
  title: string
  chips: string[]
  cards: WorkflowCard[]
  kpis: { value: string; label: string }[]
}

type FundamentalsCard = {
  title: string
  bullets: string[]
  footer?: {
    icon: string
    text: string
  }
}

type SummaryStep = {
  title: string
  focus: string
  bullets: string[]
}

const teamMembers: TeamMember[] = [
  {
    name: "Diogo Albuquerque",
    roleLine1: "Fundador",
    roleLine2: "Consultor Senior",
    image: diogoPhoto,
    imageAlt: "Diogo Albuquerque",
    description:
      "Doutorando em Economia pela Universidade Federal da Paraíba e professor da Universidade Estadual de Montes Claros. Possui mais de 10 anos de experiência em finanças corporativas, consultoria e análise de dados, com expertise em avaliação de desempenho, análise de viabilidade, estruturação financeira e planejamento de negócios.",
    summary:
      "Economista, doutorando na UFPB e professor na Unimontes. Especialista em finanças corporativas e planejamento estratégico.",
  },
  {
    name: "Diego Fróes",
    roleLine1: "Fundador",
    roleLine2: "Consultor Senior",
    image: diegoPhoto,
    imageAlt: "Diego Fróes",
    description:
      "Formado em Administração e Ciências Econômicas pela Universidade Estadual de Montes Claros. Atuação em planejamento estratégico, análise financeira, planejamento empresarial, consultoria de gestão e estratégia de marketing.",
    summary:
      "Administrador e economista pela Unimontes, atua com planejamento estratégico, finanças e marketing de crescimento.",
  },
  {
    name: "Luiz Eduardo",
    roleLine1: "Sócio",
    roleLine2: "Consultor",
    image: luisPhoto,
    imageAlt: "Luiz Eduardo",
    description:
      "Graduando em Ciências Contábeis pela Universidade Estadual de Montes Claros. Experiência em gestão de empresas, com foco na otimização de processos e rotinas operacionais.",
    summary:
      "Graduando em Ciências Contábeis (Unimontes) com foco em eficiência operacional e gestão de rotinas empresariais.",
  },
  {
    name: "Lucas Soares",
    roleLine1: "Sócio",
    roleLine2: "Desenvolvedor",
    image: lucasPhoto,
    imageAlt: "Lucas Soares",
    description:
      "Graduando em Sistemas de Informação pela Universidade Estadual de Montes Claros e em Análise e Desenvolvimento de Sistemas pelo Centro Universitário Internacional. Certificado pela AWS, com experiência em Java, JavaScript, Spring Boot, React, Python e Node.js.",
    summary:
      "Desenvolvedor full stack, graduando em SI/ADS e certificado AWS. Experiência com Java, React, Python e arquitetura cloud.",
  },
  {
    name: "João Pedro",
    roleLine1: "Trainee",
    roleLine2: "",
    image: joaoPhoto,
    imageAlt: "João Pedro",
    description:
      "Graduando em Ciências Econômicas pela Universidade Estadual de Montes Claros. Oferece suporte nas rotinas operacionais.",
    summary:
      "Graduando em Ciências Econômicas na Unimontes, apoia análises e operações de projetos com foco em dados.",
  },
  {
    name: "Henrique Fernandes",
    roleLine1: "Estagiário",
    roleLine2: "",
    image: henriquePhoto,
    imageAlt: "Henrique Fernandes",
    description:
      "Graduando em Ciências Contábeis pela Universidade Estadual de Montes Claros. Oferece suporte nas rotinas operacionais.",
    summary:
      "Graduando em Ciências Contábeis (Unimontes), responsável por suporte financeiro e rotinas administrativas.",
  },
]

type Slide = {
  title?: string
  subtitle?: string
  content: ReactNode
  alignment?: "center" | "left"
}

const workflowStages: WorkflowStage[] = [
  {
    tag: "Etapa 1",
    title: "Tratamento de Dados",
    chips: ["Coleta", "Padronização", "Validação", "ETL"],
    cards: [
      {
        title: "Por que importa",
        type: "list",
        items: [
          "Evita decisões baseadas em dados sujos ou incompletos.",
          "Cria um dataset confiável para as próximas etapas.",
        ],
      },
      {
        title: "Entradas & Saídas",
        type: "paragraphs",
        paragraphs: [
          { label: "Entradas", text: "Planilhas, ERP, bancos, APIs." },
          {
            label: "Saídas",
            text: "Tabelas limpas (camada gold) e dicionário de dados.",
          },
        ],
      },
      {
        title: "Ferramentas sugeridas",
        type: "text",
        text: "Python (pandas), Google Sheets, conectores (DB/API), dbt/ETL.",
      },
      {
        title: "Critérios de qualidade",
        type: "list",
        items: [
          "Sem duplicidades; datas e moedas normalizadas.",
          "Regras de negócio aplicadas e auditáveis.",
        ],
      },
    ],
    kpis: [
      { value: "< 1%", label: "Dados faltantes" },
      { value: "100%", label: "Tipos padronizados" },
      { value: "T+1", label: "Atualização" },
    ],
  },
  {
    tag: "Etapa 2",
    title: "Análise",
    chips: ["Exploratória", "Modelos", "KPIs", "Validação"],
    cards: [
      {
        title: "Por que importa",
        type: "list",
        items: [
          "Transforma dados em insights acionáveis.",
          "Quantifica impacto e prioriza iniciativas.",
        ],
      },
      {
        title: "Entradas & Saídas",
        type: "paragraphs",
        paragraphs: [
          { label: "Entradas", text: "Camada gold tratada." },
          {
            label: "Saídas",
            text: "KPIs, testes A/B, segmentos e recomendações.",
          },
        ],
      },
      {
        title: "Ferramentas sugeridas",
        type: "text",
        text: "Python (numpy/scikit), SQL, Jupyter, IA copilot.",
      },
      {
        title: "Critérios de qualidade",
        type: "list",
        items: [
          "Métricas reproduzíveis (queries/notebooks versionados).",
          "Validação estatística e revisão por pares.",
        ],
      },
    ],
    kpis: [
      { value: "±5%", label: "Erro aceitável" },
      { value: "> 95%", label: "Cobertura de dados" },
      { value: "SLA 24h", label: "Revisão de resultados" },
    ],
  },
  {
    tag: "Etapa 3",
    title: "Apresentação",
    chips: ["Storytelling", "Visualização", "Plano de ação", "Follow-up"],
    cards: [
      {
        title: "Por que importa",
        type: "list",
        items: [
          "Garante entendimento do cliente e adesão ao plano.",
          "Facilita decisões e compromissos com prazos.",
        ],
      },
      {
        title: "Entradas & Saídas",
        type: "paragraphs",
        paragraphs: [
          { label: "Entradas", text: "Insights validados e KPIs." },
          {
            label: "Saídas",
            text: "Dashboard/relatório, trilha de ações e próximos passos.",
          },
        ],
      },
      {
        title: "Ferramentas sugeridas",
        type: "text",
        text: "Power BI / Looker, Overleaf, Canva, Lovely Charts, slides.",
      },
      {
        title: "Critérios de qualidade",
        type: "list",
        items: [
          "História clara com 3–5 achados principais.",
          "Planos SMART (responsável, prazo, métrica).",
        ],
      },
    ],
    kpis: [
      { value: "< 10 min", label: "Tempo para entender" },
      { value: "3–5", label: "Recomendações" },
      { value: "D+7", label: "Follow-up" },
    ],
  },
]

const fundamentalsCards: FundamentalsCard[] = [
  {
    title: "Objetivos do Curso",
    bullets: [
      "Compreender o impacto da IA na consultoria moderna",
      "Dominar ferramentas de análise de dados com IA",
      "Aplicar IA em projetos reais de consultoria",
      "Desenvolver habilidades do consultor do futuro",
    ],
    footer: {
      icon: "💡 Meta",
      text: "Você deve ter as noções básicas de como usar a IA para analisar dados e criar relatórios de consultoria.",
    },
  },
  {
    title: "Essência da Consultoria",
    bullets: [
      "Resolver problemas complexos de negócios",
      "Entregar valor mensurável aos clientes",
      "Transformar dados em insights acionáveis",
      "Recomendar estratégias baseadas em evidências",
    ],
    footer: {
      icon: "🎯 Objetivo Final",
      text: "Ajudar empresas a crescerem de forma sustentável e inteligente.",
    },
  },
  {
    title: "Limitações do Modelo Tradicional",
    bullets: [
      "Análise manual de grandes volumes de dados",
      "Tempo excessivo em tarefas repetitivas",
      "Dificuldade em identificar padrões complexos",
      "Relatórios demorados e propensos a erros",
      "Custo elevado de projetos de consultoria",
    ],
    footer: {
      icon: "💭 Reflexão",
      text: "E se pudéssemos automatizar 70% dessas tarefas e focar no que realmente importa?",
    },
  },
]

const summarySteps: SummaryStep[] = [
  {
    title: "IA",
    focus: "Automação inteligente",
    bullets: [
      "Geração de código, insights e relatórios em minutos",
      "Monitoramento contínuo com modelos e copilotos",
      "Suporte 24/7 em canais digitais",
    ],
  },
  {
    title: "Consultoria",
    focus: "Método & estratégia",
    bullets: [
      "Definição de hipóteses e indicadores críticos",
      "Validação com dados confiáveis e benchmarks",
      "Recomendações priorizadas por impacto",
    ],
  },
  {
    title: "Crescer",
    focus: "Execução com propósito",
    bullets: [
      "Planos acionáveis com responsáveis e prazos",
      "Acompanhamento de resultados e aprendizado",
      "Parceria contínua para evolução do cliente",
    ],
  },
]

const FUNDAMENTALS_SLIDE_INDEX = 3
const IA_SUMMARY_SLIDE_INDEX = 5
const WORKFLOW_STAGE_START_INDEX = IA_SUMMARY_SLIDE_INDEX + 1
const PLATFORM_SLIDE_INDEX = WORKFLOW_STAGE_START_INDEX + workflowStages.length

const evaluationCriteria = [
  {
    criteria: "Clareza da análise",
    description: "Entendimento e explicação dos dados",
    weight: "30%",
  },
  {
    criteria: "Uso de IA",
    description: "Criatividade e produtividade com IA",
    weight: "25%",
  },
  {
    criteria: "Visualização",
    description: "Clareza e estética dos gráficos",
    weight: "20%",
  },
  {
    criteria: "Recomendações",
    description: "Soluções práticas e aplicáveis",
    weight: "15%",
  },
  {
    criteria: "Organização",
    description: "Estrutura e entrega no prazo",
    weight: "10%",
  },
]

function App() {
  const [config, setConfig] = useState(defaultConfig)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [visibleCards, setVisibleCards] = useState<Record<number, number>>({})

  const sequentialSlideConfig = useMemo<Record<number, number>>(() => {
    const configMap: Record<number, number> = {
      [FUNDAMENTALS_SLIDE_INDEX]: fundamentalsCards.length,
      [IA_SUMMARY_SLIDE_INDEX]: summarySteps.length,
      [PLATFORM_SLIDE_INDEX]: 2,
    }
    workflowStages.forEach((stage, index) => {
      configMap[WORKFLOW_STAGE_START_INDEX + index] = stage.cards.length
    })
    return configMap
  }, [])

  const slides = useMemo<Slide[]>(() => {
    return [
      {
        title: "Quem Somos",
        content: (
          <div className="space-y-6 text-left text-base leading-relaxed text-foreground/90 md:text-lg">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
              <div className="mx-auto w-full max-w-xs shrink-0 overflow-hidden rounded-[1.75rem] border border-primary/20 bg-primary/5 shadow-lg shadow-primary/20 md:mx-0">
                <img
                  src={heroPhoto}
                  alt="Equipe Crescer planejando soluções estratégicas"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-5">
                <div className="flex items-center gap-3 text-primary" aria-label="Seção Propósito da Crescer">
                  <Sparkles className="h-6 w-6" aria-hidden />
                  <span className="text-sm font-semibold uppercase tracking-[0.35em]">
                    Propósito
                  </span>
                </div>
                <p>
                  Fundada em 2021, a <strong>Crescer</strong> nasceu com um propósito
                  claro: ajudar empresas a prosperar por meio de soluções
                  inteligentes e resultados consistentes.
                </p>
                <p>
                  Acreditamos que <strong>confiança é o maior ativo de um negócio</strong>
                  — e ela se constrói entregando resultados reais e estando perto de
                  cada cliente em toda a jornada.
                </p>
                <p>
                  Nossa evolução para a tecnologia foi natural. Os desafios de gestão
                  e processos pediram <strong>ferramentas integradas e inteligentes</strong>,
                  e nós respondemos unindo <strong>a visão estratégica da consultoria</strong> à
                  <strong>força da inteligência artificial</strong>.
                </p>
                <p>
                  Hoje, queremos ser a <strong>parceira de negócios mais confiável de
                  Montes Claros</strong>, transformando desafios em eficiência — e planos
                  em resultados reais.
                </p>
              </div>
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/10 px-6 py-5 text-center text-base font-semibold uppercase tracking-[0.4em] text-primary shadow-sm">
              Consultoria inteligente. Resultados reais.
            </div>
          </div>
        ),
      },
      {
        title: config.courseTitle,
        subtitle: "Transformando dados em decisões estratégicas",
        alignment: "center",
        content: (
          <div className="space-y-6">
            <img
              src={logoImage}
              alt="Crescer Instituto de Negócios"
              className="mx-auto h-24 w-24 rounded-full border border-white/60 bg-white/10 object-contain p-3 shadow-lg shadow-primary/40"
            />
            <p className="text-lg font-semibold text-primary">
              {config.instructorName}
            </p>
            <p className="text-base text-muted-foreground">{config.companyName}</p>
          </div>
        ),
      },
      {
        title: "Nossa Equipe",
        subtitle:
          "Conheça os especialistas que combinam consultoria estratégica e tecnologia personalizada",
        content: (
          <div className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="team-card bg-white"
                >
                  <div className="team-card__header">
                    {member.image ? (
                      <div className="team-card__avatar team-card__avatar--photo">
                        <img src={member.image} alt={member.imageAlt ?? member.name} />
                      </div>
                    ) : (
                      <div className="team-card__avatar">
                        <span>{member.name.charAt(0)}</span>
                      </div>
                    )}
                    <div>
                      <h3 className="team-card__name">{member.name}</h3>
                      <p className="team-card__role">
                        {member.roleLine1}
                        {member.roleLine2 ? (
                          <>
                            <br />
                            <em>{member.roleLine2}</em>
                          </>
                        ) : null}
                      </p>
                    </div>
                  </div>
                  <p className="team-card__summary">
                    {member.summary ?? member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        title: "🎯 Fundamentos da Consultoria com IA",
        content: (
          <div className="fundamentals-grid">
            {fundamentalsCards.map((card, index) => (
              <div
                key={card.title}
                className="fundamentals-card"
                data-visible={
                  index <= (visibleCards[FUNDAMENTALS_SLIDE_INDEX] ?? -1)
                }
              >
                <h3>{card.title}</h3>
                <ul>
                  {card.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                {card.footer ? (
                  <div className="fundamentals-card__footer">
                    <span className="label">{card.footer.icon}</span>
                    <p>{card.footer.text}</p>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ),
      },
      {
        title: "💼 Mini-Consultoria com IA",
        content: (
          <div
            className="miniconsultoria-grid"
            data-visible={(visibleCards[FUNDAMENTALS_SLIDE_INDEX + 1] ?? -1) >= 0}
          >
            <div className="space-y-5">
              <div className="highlight-card border-l-4 border-primary">
                <p>
                  <strong className="text-primary">📊 Caso Prático:</strong>{" "}
                  Empresa com queda de vendas e aumento de custos
                </p>
              </div>

              <div className="mini-video">
                <div className="mini-video__preview">
                  <iframe
                    src="https://www.youtube.com/embed/p6bUXxuGoZY"
                    title="Mini consultoria com IA"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="mini-video__caption">
                  Assista: como configuramos a jornada consultiva com IA em poucos minutos.
                </p>
              </div>

              <div className="mini-stats">
                <div className="mini-metric-card">
                  <h4>Diagnóstico em 30 min</h4>
                  <p>Checklist guiado para mapear dados críticos.</p>
                </div>
                <div className="mini-metric-card">
                  <h4>IA + consultor</h4>
                  <p>Modelos generativos produzem scripts e insights imediatos.</p>
                </div>
                <div className="mini-metric-card">
                  <h4>Storytelling executivo</h4>
                  <p>Resumo em 3 telas ligando causa → impacto → ação.</p>
                </div>
                <div className="mini-metric-card">
                  <h4>Plano acionável</h4>
                  <p>Backlog priorizado com donos, métricas e prazos.</p>
                </div>
              </div>
              <div className="mini-timeline">
                <div>
                  <span className="dot">1</span>
                  <p>Briefing + checklist de dados</p>
                </div>
                <div>
                  <span className="dot">2</span>
                  <p>Análise IA + validação consultor</p>
                </div>
                <div>
                  <span className="dot">3</span>
                  <p>Workshop de insights & plano</p>
                </div>
              </div>
            </div>

            <section className="space-y-4">
              <h3 className="section-heading">Benefícios Principais</h3>
              <ul className="slide-list">
                <li>
                  <strong>Velocidade:</strong> Análises em minutos, não em dias
                </li>
                <li>
                  <strong>Automação:</strong> Tarefas repetitivas executadas
                  automaticamente
                </li>
                <li>
                  <strong>Inteligência:</strong> Identificação de padrões
                  invisíveis ao olho humano
                </li>
                <li>
                  <strong>Escalabilidade:</strong> Processar milhares de dados
                  simultaneamente
                </li>
                <li>
                  <strong>Precisão:</strong> Redução drástica de erros humanos
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="section-heading">O Consultor do Futuro</h3>
              <ul className="slide-list">
                <li>
                  <strong>Pensamento Analítico:</strong> Interpretar dados com
                  contexto de negócio
                </li>
                <li>
                  <strong>Domínio de Ferramentas:</strong> Python, Power BI,
                  Canva, Overleaf
                </li>
                <li>
                  <strong>Uso Estratégico de IA:</strong> Saber quando e como
                  usar IA
                </li>
                <li>
                  <strong>Comunicação Clara:</strong> Traduzir dados em histórias
                </li>
                <li>
                  <strong>Visão de Negócio:</strong> Conectar análise com resultados
                </li>
              </ul>
              <div className="highlight-card">
                <p>
                  <strong className="text-primary">💬 Pergunta Interativa:</strong>{" "}
                  Se você tivesse uma IA na sua equipe, o que pediria para ela
                  fazer por você?
                </p>
              </div>
            </section>
          </div>
        ),
      },
      {
        title: "IA • Consultoria • Crescer",
        subtitle:
          "Os três pilares que guiamos em cada projeto para gerar impacto real",
        content: (
          <div className="ia-summary-grid">
            {summarySteps.map((step, summaryIndex) => (
              <div
                key={step.title}
                className="ia-summary-card"
                data-visible={
                  summaryIndex <= (visibleCards[IA_SUMMARY_SLIDE_INDEX] ?? -1)
                }
              >
                <div className="ia-summary-marker">{step.title}</div>
                <h3>{step.focus}</h3>
                <ul>
                  {step.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ),
      },
      ...workflowStages.map((stage, stageIndex) => ({
        title: stage.title,
        subtitle: `${stage.tag} • IA • Consultoria • Crescer`,
        content: (
          <div className="workflow-single">
            <div className="workflow-single__chips">
              {stage.chips.map((chip) => (
                <span key={chip} className="workflow-chip">
                  {chip}
                </span>
              ))}
            </div>
            <div className="workflow-single__cards">
              {stage.cards.map((card, cardIndex) => (
                <div
                  key={card.title}
                  className="workflow-card"
                  data-visible={
                    cardIndex <=
                    (visibleCards[WORKFLOW_STAGE_START_INDEX + stageIndex] ?? -1)
                  }
                >
                  <h4>{card.title}</h4>
                  {"items" in card && card.type === "list" ? (
                    <ul>
                      {card.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {"paragraphs" in card && card.type === "paragraphs" ? (
                    <>
                      {card.paragraphs.map((paragraph) => (
                        <p key={paragraph.label}>
                          <strong>{paragraph.label}:</strong> {paragraph.text}
                        </p>
                      ))}
                    </>
                  ) : null}
                  {"text" in card && card.type === "text" ? (
                    <p>{card.text}</p>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="workflow-single__kpis" aria-label="Indicadores de exemplo">
              {stage.kpis.map((kpi) => (
                <div key={kpi.label} className="workflow-kpi">
                  <div className="value">{kpi.value}</div>
                  <div className="label">{kpi.label}</div>
                </div>
              ))}
            </div>
          </div>
        ),
      })),
      {
        title: "🏆 Desafio Final",
        content: (
          <div className="desafio-grid">
            <div>
              <div className="challenge-card">
                <h4 className="text-lg font-semibold text-primary">
                  📋 Consultoria com IA na Prática
                </h4>
                <p>
                  <strong>Prazo:</strong> Segunda-feira, 23h59
                </p>
                <p>
                  <strong>Entrega:</strong> Link do relatório + planilha/notebook
                </p>
              </div>
              <h3 className="section-heading">Tarefas</h3>
              <ul className="slide-list">
                <li>Coleta e limpeza de dados (planilha pública)</li>
                <li>Análise com ChatGPT/Gemini (2-3 insights)</li>
                <li>Visualização (gráfico ou dashboard)</li>
                <li>Relatório final de 1 página</li>
                <li>Envio do link público + arquivos</li>
              </ul>
            </div>
            <div className="desafio-qr">
              <div className="qr-frame">
                <QRCode
                  value="https://drive.google.com/drive/folders/1myjdm0734NPdu8_LxlZ4PkVFIVNNEcWR?usp=drive_link"
                  size={180}
                  bgColor="transparent"
                  fgColor="#1f2937"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Materiais do desafio disponíveis no Drive:
              </p>
              <a
                href="https://drive.google.com/drive/folders/1myjdm0734NPdu8_LxlZ4PkVFIVNNEcWR?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="desafio-link"
              >
                drive.google.com/drive/folders/1myjdm0734NPdu8_LxlZ4PkVFIVNNEcWR
              </a>
            </div>
          </div>
        ),
      },
      {
        title: "📊 Critérios de Avaliação",
        content: (
          <>
            <div className="overflow-hidden rounded-2xl border border-white/50 bg-white/95 shadow-xl">
              <table className="min-w-full border-collapse">
                <thead className="bg-primary text-primary-foreground">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide">
                      Critério
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide">
                      Descrição
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide">
                      Peso
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {evaluationCriteria.map((item) => (
                    <tr
                      key={item.criteria}
                      className="border-t border-muted/40 odd:bg-white even:bg-muted/20"
                    >
                      <td className="px-4 py-3 font-semibold text-foreground">
                        {item.criteria}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {item.description}
                      </td>
                      <td className="px-4 py-3 font-semibold text-primary">
                        {item.weight}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="highlight-card">
              <p>
                <strong className="text-primary">🎁 Prêmio:</strong> Melhores
                projetos serão convidados para entrevista de estágio!
              </p>
            </div>
          </>
        ),
      },
      {
        title: "Nossas Plataformas",
        subtitle:
          "Desenvolvemos soluções digitais completas para operação comercial e financeira",
        content: (
          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div
                className="platform-card"
                data-visible={(visibleCards[PLATFORM_SLIDE_INDEX] ?? -1) >= 0}
              >
                <div className="platform-card__icon">
                  <img src={crescerZapIcon} alt="CrescerZap" />
                </div>
                <div className="platform-card__body">
                  <h3 className="platform-card__title">CrescerZap</h3>
                  <p className="platform-card__subtitle">
                    <em>Transforme seu WhatsApp em uma máquina de vendas inteligente</em>
                  </p>
                  <p className="platform-card__description">
                    Atendimento automatizado 24/7 que identifica demandas, qualifica
                    oportunidades e evita perda de leads. Ideal para equipes comerciais
                    que precisam de velocidade e personalização.
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="platform-card__cta"
                >
                  <a
                    href="https://zap.crescer.emp.br"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Saiba mais
                  </a>
                </Button>
              </div>

              <div
                className="platform-card"
                data-visible={(visibleCards[PLATFORM_SLIDE_INDEX] ?? -1) >= 1}
              >
                <div className="platform-card__icon">
                  <img src={crescerFlowIcon} alt="CrescerFlow" />
                </div>
                <div className="platform-card__body">
                  <h3 className="platform-card__title">CrescerFlow</h3>
                  <p className="platform-card__subtitle">
                    <em>Sua gestão financeira sem planilhas caóticas ou papelada</em>
                  </p>
                  <p className="platform-card__description">
                    Controle de fluxo de caixa, conciliação e relatórios em um só lugar.
                    Pensado para transformar rotinas financeiras em informação estratégica
                    e confiável.
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="platform-card__cta"
                >
                  <a
                    href="https://flow.crescer.emp.br"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Saiba mais
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "🚀 Vamos Começar!",
        alignment: "center",
        subtitle: "O futuro da consultoria está em suas mãos",
        content: (
          <div className="space-y-6">
            <div className="highlight-card text-left">
              <h3 className="section-heading mt-0 flex items-center gap-2 text-primary">
                <Rocket className="h-6 w-6" />
                Próximos Passos
              </h3>
              <ul className="slide-list">
                <li>Acesse os materiais do curso</li>
                <li>Comece seu projeto do desafio</li>
                <li>Tire dúvidas durante a semana</li>
                <li>Entregue até segunda-feira, 23h59</li>
              </ul>
            </div>
            <p className="text-lg font-semibold text-primary">
              Boa sorte! 🎯
            </p>
          </div>
        ),
      },
    ]
  }, [config, visibleCards])

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setCurrentSlide((prev) => Math.max(prev - 1, 0))
      }
      if (event.key === "ArrowRight") {
        setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1))
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [slides.length])

  useEffect(() => {
    if (typeof window === "undefined" || !window.elementSdk) {
      return
    }

    window.elementSdk.init({
      defaultConfig,
      onConfigChange: (incoming: Record<string, string>) => {
        setConfig((previous) => ({
          courseTitle: incoming.course_title ?? previous.courseTitle,
          instructorName: incoming.instructor_name ?? previous.instructorName,
          companyName: incoming.company_name ?? previous.companyName,
        }))
      },
      mapToCapabilities: () => ({
        recolorables: [],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined,
      }),
      mapToEditPanelValues: (incoming: Record<string, string>) =>
        new Map([
          ["course_title", incoming.course_title ?? defaultConfig.courseTitle],
          [
            "instructor_name",
            incoming.instructor_name ?? defaultConfig.instructorName,
          ],
          ["company_name", incoming.company_name ?? defaultConfig.companyName],
        ]),
    })
  }, [])

  useEffect(() => {
    const total = sequentialSlideConfig[currentSlide]
    if (typeof total !== "number" || total <= 0) {
      return
    }
    const timers: number[] = []
    setVisibleCards((prev) => ({ ...prev, [currentSlide]: -1 }))
    for (let index = 0; index < total; index += 1) {
      const timer = window.setTimeout(() => {
        setVisibleCards((prev) => ({ ...prev, [currentSlide]: index }))
      }, index * 280)
      timers.push(timer)
    }
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [currentSlide, sequentialSlideConfig])

  const progress = ((currentSlide + 1) / slides.length) * 100

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-[#1f2736] via-[#131a27] to-[#090d14] text-foreground">
      <img
        src={backgroundImage}
        alt=""
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(102,126,234,0.35),transparent_60%)]" />

      <header className="relative z-10 flex items-center justify-between px-8 py-6 text-white">
        <div className="flex items-center gap-4">
          <img
            src={logoImage}
            alt="Crescer Instituto de Negócios"
            className="h-14 w-14 rounded-full border border-white/20 bg-white/10 object-contain p-2 shadow-lg shadow-black/30"
          />
      <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              Crescer
            </p>
            <h1 className="text-lg font-semibold uppercase tracking-[0.2em]">
              Instituto de Negócios
            </h1>
            <div className="flex items-center gap-2 text-xs text-white/70">
              <CalendarDays className="h-4 w-4" />
              Formação executiva e consultoria inteligente
            </div>
          </div>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Button
            asChild
            variant="ghost"
            className="border border-white/20 bg-white/10 text-white hover:bg-white/20"
          >
            <a
              href="https://crescer.emp.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visite nosso site
            </a>
          </Button>
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <a
              href="https://wa.me/5583936180508"
              target="_blank"
              rel="noopener noreferrer"
            >
              Agende uma conversa
            </a>
          </Button>
        </div>
      </header>

      <div className="relative flex flex-1 flex-col">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
        <div className="presentation-container flex flex-1 px-4 py-6 md:px-10 md:py-10">
          <div className="mx-auto flex w-full max-w-6xl flex-col">
            {slides.map((slide, index) => (
              <div
                key={slide.title ?? index}
                className={`slide-card ${
                  index === currentSlide ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <div
                  className={`flex h-full flex-col ${
                    slide.alignment === "center" ? "text-center" : ""
                  }`}
                >
                  <div className="mb-6 flex items-center justify-between text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                    <span className="flex items-center gap-2 text-xs">
                      <ChartBarStacked className="h-4 w-4" />
                      IA • Consultoria • Crescer
                    </span>
                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ClipboardList className="h-4 w-4" />
                      Slide {index + 1} de {slides.length}
                    </span>
      </div>
                  <div className="flex flex-1 flex-col gap-4">
                    {slide.title ? (
                      <h2
                        className={`text-3xl font-semibold text-[#4f5bd5] md:text-4xl ${
                          slide.alignment === "center" ? "mx-auto max-w-2xl" : ""
                        }`}
                      >
                        {slide.title}
                      </h2>
                    ) : null}
                    {slide.subtitle ? (
                      <p
                        className={`text-lg text-muted-foreground md:text-xl ${
                          slide.alignment === "center" ? "mx-auto max-w-3xl" : ""
                        }`}
                      >
                        {slide.subtitle}
                      </p>
                    ) : null}
                    <div
                      className={`flex flex-1 flex-col ${
                        slide.alignment === "center"
                          ? "items-center justify-center text-center"
                          : "justify-center"
                      }`}
                    >
                      <div
                        className={`w-full rounded-3xl bg-white/95 p-8 shadow-2xl shadow-black/20 backdrop-blur-md md:p-12 ${
                          slide.alignment === "center" ? "mx-auto max-w-3xl" : ""
                        }`}
                      >
                        {slide.content}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="relative z-10 border-t border-white/10 bg-white/10 text-white backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" />
              <span>
                <strong>Perguntas?</strong> Use o chat durante a sessão.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/70">
            <span>Slide {currentSlide + 1}</span>
            <span className="text-primary">|</span>
            <span>Total {slides.length}</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
              disabled={currentSlide === 0}
              className="flex items-center gap-2 border border-white/20 bg-white/10 text-white hover:bg-white/20 disabled:border-white/10 disabled:text-white/40"
            >
              <ArrowLeft className="h-4 w-4" />
              Anterior
            </Button>
            <Button
              onClick={() =>
                setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1))
              }
              disabled={currentSlide === slides.length - 1}
              className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-primary/40"
            >
              Próximo
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

