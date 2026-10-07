// Componente principal do protótipo OxyTalento.
// Ele organiza o fluxo de telas do marketplace de serviços e os componentes reutilizáveis.
import { useState, type ReactNode } from "react";

type Page = "login" | "home" | "search" | "professional" | "request" | "messages";

// Fotos de perfil para os usuários e profissionais exibidos no protótipo.
const photos = {
  carlos: "https://images.unsplash.com/photo-1729795795561-97daeedfec02?crop=faces&fit=crop&w=320&h=320&q=85",
  marcos: "https://images.unsplash.com/photo-1695927621677-ec96e048dce2?crop=faces&fit=crop&w=320&h=320&q=85",
  juliana: "https://images.unsplash.com/photo-1648478445898-ae81dfa8701b?crop=faces&fit=crop&w=320&h=320&q=85",
  lucas: "https://images.unsplash.com/photo-1637080767103-bc34afcbd2b2?crop=faces&fit=crop&w=320&h=320&q=85",
};

type IconName =
  | "home" | "chat" | "plus" | "file" | "user" | "pin" | "bell" | "search"
  | "filter" | "back" | "eye" | "lock" | "mail" | "star" | "check" | "clock"
  | "shield" | "camera" | "calendar" | "tool" | "spark" | "laptop" | "clean"
  | "book" | "food" | "beauty" | "more" | "whatsapp";

const Icon = ({ name, size = 18 }: { name: IconName; size?: number }) => {
  const paths: Record<IconName, ReactNode> = {
    home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10M9 21v-7h6v7"/></>,
    chat: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/><path d="M8 9h8M8 13h5"/></>,
    plus: <path d="M12 5v14M5 12h14"/>,
    file: <><path d="M6 2h8l4 4v16H6Z"/><path d="M14 2v5h5M9 12h6M9 16h6"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 22a8 8 0 0 1 16 0"/></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
    search: <><circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/></>,
    filter: <><path d="M4 6h16M7 12h10M10 18h4"/></>,
    back: <><path d="m15 18-6-6 6-6"/><path d="M9 12h12"/></>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    star: <path d="m12 2 3 6 7 .9-5 4.8 1.3 6.8L12 17l-6.3 3.5L7 13.7 2 8.9 9 8Z"/>,
    check: <path d="m5 12 4 4L19 6"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-5"/></>,
    camera: <><path d="M4 7h3l2-3h6l2 3h3v13H4Z"/><circle cx="12" cy="13" r="4"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></>,
    tool: <path d="M14 6a4 4 0 0 0-5 5L3 17l4 4 6-6a4 4 0 0 0 5-5l-3 3-3-3Z"/>,
    spark: <><circle cx="8" cy="8" r="3"/><path d="M14 4h7M17.5.5v7M4 17h16M7 13v8M13 13v8M19 13v8"/></>,
    laptop: <><rect x="4" y="4" width="16" height="12" rx="1"/><path d="M2 20h20"/></>,
    clean: <><path d="m15 3 6 6-11 11H4v-6Z"/><path d="m12 6 6 6"/></>,
    book: <><path d="M4 4h7a3 3 0 0 1 3 3v14a3 3 0 0 0-3-3H4ZM20 4h-3a3 3 0 0 0-3 3v14a3 3 0 0 1 3-3h3Z"/></>,
    food: <><path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M16 3v18M16 3c5 2 5 8 0 10"/></>,
    beauty: <><circle cx="7" cy="7" r="3"/><circle cx="17" cy="7" r="3"/><path d="M9 9 4 20M15 9l5 11M8 16h8"/></>,
    more: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
    whatsapp: <><path d="M20 11.5A8 8 0 0 1 8.3 18.6L4 20l1.4-4.2A8 8 0 1 1 20 11.5Z"/><path d="M9 8c.5 3 2 4.5 5 5"/></>,
  };
  return <svg className="ui-icon" style={{ width: size, height: size }} viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
};

const Logo = ({ compact = false }: { compact?: boolean }) => (
  <div className={compact ? "logo compact" : "logo"}>
    <div className="logo-symbol"><span /><span /><b>+</b></div>
    <div className="logo-copy">
      <div><strong>Oxy</strong>Talento</div>
      {!compact && <small>Conectando talentos perto de você</small>}
    </div>
  </div>
);

const StatusBar = ({ dark = false }: { dark?: boolean }) => (
  <div className={dark ? "statusbar statusbar-light" : "statusbar"}>
    <b>9:41</b>
    <div className="phone-signals"><i /><i /><i /><span /></div>
  </div>
);

const BottomNav = ({ active, onNavigate }: { active: string; onNavigate: (page: Page) => void }) => (
  <div className="bottom-nav">
    {[
      ["Início", "home", "home"], ["Mensagens", "chat", "messages"], ["Anunciar", "plus", "request"], ["Contratos", "file", "messages"], ["Perfil", "user", "professional"],
    ].map(([label, icon, destination]) => (
      <div
        className={`nav-item ${active === label ? "active" : ""} ${label === "Anunciar" ? "nav-primary" : ""}`}
        key={label}
        role="button"
        tabIndex={0}
        onClick={() => onNavigate(destination as Page)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onNavigate(destination as Page);
          }
        }}
      >
        <span><Icon name={icon as IconName} size={17} /></span>
        <small>{label}</small>
      </div>
    ))}
  </div>
);

const Tap = ({ children, onClick, className = "" }: { children: ReactNode; onClick: () => void; className?: string }) => (
  <div
    className={`tap ${className}`}
    role="button"
    tabIndex={0}
    onClick={onClick}
    onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClick();
      }
    }}
  >
    {children}
  </div>
);

const Phone = ({ number, label, children, dark = false }: { number: string; label: string; children: ReactNode; dark?: boolean }) => (
  <article className="device-wrap">
    <div className="screen-label"><span>{number}</span><b>{label}</b></div>
    <div className={`phone ${dark ? "phone-dark" : ""}`}>
      <StatusBar dark={dark}/>
      <div className="phone-content">{children}</div>
    </div>
  </article>
);

const SectionHeader = ({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) => (
  <div className="section-header"><b>{title}</b>{action && (onAction ? <Tap onClick={onAction}><span>{action}</span></Tap> : <span>{action}</span>)}</div>
);

const Category = ({ icon, label, active = false, onSelect }: { icon: IconName; label: string; active?: boolean; onSelect?: () => void }) => (
  <div className={`category ${active ? "selected" : ""}`} role={onSelect ? "button" : undefined} tabIndex={onSelect ? 0 : undefined} onClick={onSelect} onKeyDown={(event) => {
    if (onSelect && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onSelect();
    }
  }}><span><Icon name={icon} size={20}/></span><small>{label}</small></div>
);

const Verified = () => <span className="verified"><Icon name="check" size={8}/></span>;

const ProRow = ({ photo, name, job, price, rating, distance, onSelect }: { photo: string; name: string; job: string; price: string; rating: string; distance: string; onSelect: () => void }) => (
  <div className="pro-row">
    <img src={photo} alt={`Foto de ${name}`} />
    <div className="pro-main">
      <div className="pro-name"><b>{name}</b><Verified /></div>
      <small>{job}</small>
      <div className="rating"><Icon name="star" size={10}/><b>{rating}</b> <span>(87 avaliações)</span></div>
      <div className="distance"><Icon name="pin" size={9}/>{distance}</div>
    </div>
    <div className="pro-action"><small>A partir de</small><b>R$ {price}</b><span role="button" tabIndex={0} onClick={onSelect} onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onSelect();
      }
    }}>Ver perfil</span></div>
  </div>
);

const MessageRow = ({ photo, name, text, time, unread }: { photo: string; name: string; text: string; time: string; unread?: number }) => (
  <div className="message-row">
    <img src={photo} alt={`Foto de ${name}`} />
    <div><b>{name}</b><span>{text}</span></div>
    <aside><small>{time}</small>{unread && <b>{unread}</b>}</aside>
  </div>
);

// Estado principal do fluxo navegável do protótipo.
export default function App() {
  const [page, setPage] = useState<Page>("login");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("Manutenção");
  const [activeFilter, setActiveFilter] = useState("Mais relevantes");
  const [requestDescription, setRequestDescription] = useState("Preciso instalar 3 pontos de tomada novos na sala e 2 na cozinha.");
  const [urgency, setUrgency] = useState("O mais rápido possível");
  const [messageTab, setMessageTab] = useState("Todas");
  const pageNames: Record<Page, string> = {
    login: "Login",
    home: "Home / Dashboard",
    search: "Buscar serviços",
    professional: "Perfil do profissional",
    request: "Solicitar serviço",
    messages: "Mensagens",
  };
  const login = () => {
    if (!identifier.trim() || !password.trim()) {
      setLoginMessage("Preencha seu e-mail, CPF ou telefone e a senha.");
      return;
    }
    setLoginMessage("");
    setPage("home");
  };
  const openSearch = (selectedCategory?: string) => {
    if (selectedCategory) setCategory(selectedCategory);
    setPage("search");
  };

  // Renderiza a tela ativa do protótipo de acordo com o estado da navegação.
  return (
    <main className="showcase">
      <header className="presentation-header">
        <div><div className="overline">PRODUCT DESIGN · MOBILE APP</div><div className="presentation-title">OxyTalento</div></div>
        <div className="presentation-copy">Protótipo navegável · {pageNames[page]}<br/><span>Faça escolhas para avançar pelo fluxo</span></div>
        <Logo compact />
      </header>

      <section className="phone-grid">
        {page === "login" && (
        <Phone number="01" label="Login">
          <div className="login-screen">
            <div className="login-logo"><Logo /></div>
            <div className="login-heading"><b>Bem-vindo(a)!</b><span>Entre para encontrar ou oferecer<br/>serviços na sua região.</span></div>
            <div className="field-stack">
              <label className="input-field"><Icon name="mail" size={16}/><input value={identifier} onChange={(event) => setIdentifier(event.target.value)} placeholder="E-mail, CPF ou telefone" autoComplete="username"/></label>
              <label className="input-field"><Icon name="lock" size={16}/><input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Senha" type={showPassword ? "text" : "password"} autoComplete="current-password"/><Tap onClick={() => setShowPassword((value) => !value)}><Icon name="eye" size={16}/></Tap></label>
            </div>
            {loginMessage && <div className="login-message">{loginMessage}</div>}
            <Tap className="forgot" onClick={() => setLoginMessage("Enviaremos as instruções de recuperação após você informar seu e-mail ou telefone.")}>Esqueci minha senha</Tap>
            <Tap className="primary-button" onClick={login}>Entrar</Tap>
            <Tap className="secondary-button" onClick={() => { setLoginMessage(""); setPage("home"); }}>Criar conta</Tap>
            <div className="or"><i/>ou<i/></div>
            <div className="socials"><Tap onClick={() => setPage("home")}><span>G</span></Tap><Tap onClick={() => setPage("home")}><span>f</span></Tap><Tap onClick={() => setPage("home")}><span className="apple">●</span></Tap></div>
            <div className="terms">Ao continuar, você concorda com nossos<br/><b>Termos de Uso</b> e <b>Política de Privacidade</b></div>
          </div>
        </Phone>
        )}

        {page === "home" && (
        <Phone number="02" label="Home / Dashboard">
          <div className="scroll-screen home-screen">
            <div className="app-topline"><div><b>Olá, Ana Clara 👋</b><span><Icon name="pin" size={12}/> São Luís, MA⌄</span></div><Tap className="notification" onClick={() => setPage("messages")}><Icon name="bell"/><b>2</b></Tap></div>
            <div className="metrics-card">
              <div><small>Serviços encontrados</small><b>12</b></div><i/><div><small>Avaliações feitas</small><b>5</b></div><Icon name="back" size={17}/>
            </div>
            <SectionHeader title="Categorias populares" action="Ver todas" onAction={() => openSearch()}/>
            <div className="category-grid">
              <Category icon="tool" label="Manutenção" onSelect={() => openSearch("Manutenção")}/><Category icon="beauty" label="Beleza" onSelect={() => openSearch("Beleza")}/><Category icon="laptop" label="Tecnologia" onSelect={() => openSearch("Tecnologia")}/>
              <Category icon="clean" label="Limpeza" onSelect={() => openSearch("Limpeza")}/><Category icon="book" label="Educação" onSelect={() => openSearch("Educação")}/><Category icon="food" label="Alimentação" onSelect={() => openSearch("Alimentação")}/>
            </div>
            <div className="search-callout"><span><Icon name="search" size={21}/></span><div><b>Precisa de um serviço agora?</b><small>Encontre profissionais perto de você.</small></div><Tap onClick={() => openSearch()}><strong>Buscar agora</strong></Tap></div>
            <SectionHeader title="Profissionais em destaque" action="Ver todos" onAction={() => openSearch()}/>
            <Tap className="featured-pro" onClick={() => setPage("professional")}>
              <img src={photos.carlos} alt="Foto de Carlos Eduardo"/><div><span><b>Carlos Eduardo</b><Verified/></span><small>Eletricista</small><div className="rating"><Icon name="star" size={10}/><b>4,9</b> (127 avaliações)</div></div><b>Ver perfil</b>
            </Tap>
          </div>
          <BottomNav active="Início" onNavigate={setPage}/>
        </Phone>
        )}

        {page === "search" && (
        <Phone number="03" label="Buscar serviços">
          <div className="scroll-screen search-screen">
            <div className="titlebar"><Tap onClick={() => setPage("home")}><Icon name="back"/></Tap><b>Buscar serviços</b><Icon name="filter"/></div>
            <label className="input-field"><Icon name="search" size={16}/><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="O que você precisa?"/></label>
            <div className="location-row"><Icon name="pin" size={16}/><span>São Luís, MA</span><b><Icon name="pin" size={16}/></b></div>
            <SectionHeader title="Categorias"/>
            <div className="category-strip">
              <Category icon="tool" label="Manutenção" active={category === "Manutenção"} onSelect={() => setCategory("Manutenção")}/><Category icon="beauty" label="Beleza" active={category === "Beleza"} onSelect={() => setCategory("Beleza")}/><Category icon="laptop" label="Tecnologia" active={category === "Tecnologia"} onSelect={() => setCategory("Tecnologia")}/><Category icon="clean" label="Limpeza" active={category === "Limpeza"} onSelect={() => setCategory("Limpeza")}/>
            </div>
            <div className="filters">{["Mais relevantes","Distância","Avaliação","Preço"].map((filter) => <Tap key={filter} onClick={() => setActiveFilter(filter)}><span className={activeFilter === filter ? "active" : ""}>{filter}{filter === "Mais relevantes" || filter === "Avaliação" ? "⌄" : ""}</span></Tap>)}</div>
            <div className="results">
              <ProRow photo={photos.marcos} name="Marcos Silva" job="Encanador" price="80" rating="4,8" distance="2,1 km de você" onSelect={() => setPage("professional")}/>
              <ProRow photo={photos.juliana} name="Juliana Mendes" job="Manicure" price="25" rating="5,0" distance="1,7 km de você" onSelect={() => setPage("professional")}/>
              <ProRow photo={photos.lucas} name="Lucas Ferreira" job="Técnico em Informática" price="60" rating="4,9" distance="3,5 km de você" onSelect={() => setPage("professional")}/>
            </div>
          </div>
          <BottomNav active="" onNavigate={setPage}/>
        </Phone>
        )}

        {page === "professional" && (
        <Phone number="04" label="Perfil do profissional">
          <div className="profile-screen">
            <div className="profile-hero">
              <div className="hero-actions"><Tap onClick={() => setPage("search")}><Icon name="back"/></Tap><Icon name="more"/></div>
              <div className="profile-identity">
                <div className="profile-photo"><img src={photos.carlos} alt="Foto de Carlos Eduardo"/><Verified/></div>
                <div><b>Carlos Eduardo</b><span>Eletricista</span><div className="rating"><Icon name="star" size={11}/><strong>4,9</strong> (127 avaliações)</div><small><Icon name="pin" size={10}/> 2,1 km de você</small></div>
              </div>
              <div className="trust-grid">
                <div><Icon name="clock"/><b>Resposta rápida</b></div><div><Icon name="shield"/><b>Profissional verificado</b></div><div><Icon name="clock"/><b>Último acesso hoje</b></div>
              </div>
            </div>
            <div className="profile-body">
              <SectionHeader title="Sobre mim"/>
              <p>Trabalho com instalações elétricas, manutenção residencial e comercial, procurando sempre oferecer um serviço seguro e de qualidade.</p>
              <SectionHeader title="Serviços"/>
              <div className="service-list">{["Instalações elétricas","Manutenção e reparos","Troca de tomadas e disjuntores","Luminárias e refletores"].map(item=><span key={item}><Icon name="check" size={11}/>{item}</span>)}</div>
              <SectionHeader title="Portfólio" action="Ver tudo"/>
              <div className="portfolio"><div/><div/><div/></div>
              <SectionHeader title="Avaliações detalhadas"/>
              <div className="review-card"><div><b>4,9</b><span>★★★★★</span><small>127 avaliações</small></div><div>{[95,72,36,15,5].map((v,i)=><span key={i}><small>{5-i}</small><i><b style={{width:`${v}%`}}/></i></span>)}</div></div>
            </div>
            <div className="sticky-actions"><Tap onClick={() => setPage("messages")}><Icon name="whatsapp" size={14}/>Chamar no WhatsApp</Tap><Tap onClick={() => setPage("request")}>Solicitar orçamento</Tap></div>
          </div>
        </Phone>
        )}

        {page === "request" && (
        <Phone number="05" label="Solicitar serviço">
          <div className="request-screen">
            <div className="titlebar"><Tap onClick={() => setPage("professional")}><Icon name="back"/></Tap><b>Solicitar serviço</b><span/></div>
            <div className="stepper">
              <div className="done"><b>1</b><span>Detalhes</span></div><i/><div><b>2</b><span>Profissionais</span></div><i/><div><b>3</b><span>Confirmação</span></div>
            </div>
            <div className="form-title">Conte mais sobre o serviço</div>
            <label className="select-field"><small>Categoria</small><select><option>Elétrica</option><option>Hidráulica</option><option>Tecnologia</option></select><span>⌄</span></label>
            <label className="select-field"><small>Tipo de serviço</small><select><option>Instalações elétricas</option><option>Manutenção e reparos</option><option>Visita técnica</option></select><span>⌄</span></label>
            <label className="description-field"><small>Descrição do problema</small><textarea maxLength={300} value={requestDescription} onChange={(event) => setRequestDescription(event.target.value)}/><b>{requestDescription.length}/300</b></label>
            <label className="upload-field"><span><Icon name="camera"/></span><div><b>Adicionar fotos</b><small>Opcional · até 5 imagens</small></div><strong>+</strong><input type="file" accept="image/*" multiple/></label>
            <div className="form-title small-title">Quando precisa?</div>
            <div className="radio-list">
              {["O mais rápido possível","Escolher data e horário","Ainda não sei"].map((option) => <Tap key={option} className={urgency === option ? "checked" : ""} onClick={() => setUrgency(option)}><i/><span>{option}</span>{option === "Escolher data e horário" && <Icon name="calendar" size={15}/>}</Tap>)}
            </div>
            <Tap className="primary-button bottom-button" onClick={() => setPage("messages")}>Próximo</Tap>
          </div>
        </Phone>
        )}

        {page === "messages" && (
        <Phone number="06" label="Mensagens">
          <div className="messages-screen">
            <div className="message-heading"><b>Mensagens</b><div><Icon name="search"/><Icon name="more"/></div></div>
            <div className="tabs">{["Todas","Conversas","Orçamentos","Contratos"].map((tab) => <Tap key={tab} onClick={() => setMessageTab(tab)}><span className={messageTab === tab ? "active" : ""}>{tab}</span></Tap>)}</div>
            <div className="message-list">
              <MessageRow photo={photos.carlos} name="Carlos Eduardo" text="Já estou a caminho do local." time="10:30" unread={2}/>
              <MessageRow photo={photos.marcos} name="Marcos Silva" text="Enviei um orçamento." time="09:15" unread={1}/>
              <MessageRow photo={photos.juliana} name="Juliana Mendes" text="Serviço concluído! Obrigada." time="Ontem"/>
              <MessageRow photo={photos.lucas} name="Lucas Ferreira" text="Qual o problema que você está tendo?" time="Ontem"/>
              <MessageRow photo={photos.marcos} name="Rafael Santos" text="Obrigado pelo contato!" time="2 dias"/>
              <MessageRow photo={photos.juliana} name="Beatriz Lima" text="Enviei um orçamento." time="3 dias"/>
            </div>
          </div>
          <BottomNav active="Mensagens" onNavigate={setPage}/>
        </Phone>
        )}
      </section>

      <footer className="presentation-footer"><span>OXYTALENTO · PROTÓTIPO INTERATIVO</span><i/><span>FLUXO CONECTADO</span><i/><span>MARKETPLACE HIPERLOCAL</span></footer>
    </main>
  );
}
