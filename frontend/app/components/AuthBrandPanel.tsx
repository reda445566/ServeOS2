export function AuthBrandPanel() {
  return (
    <div className="serveos-brand">
      <div className="serveos-logo-row">
        <svg className="serveos-mark" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="10" fill="#C8791F" />
          <path d="M12 11H24V24L21.5 22L19 24L16.5 22L14 24L12 22V11Z" fill="#101114" fillOpacity="0.92" />
          <path d="M15 15H21" stroke="#C8791F" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M15 18" stroke="#C8791F" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="27.5" cy="27.5" r="2.5" fill="#101114" fillOpacity="0.92" />
        </svg>
        <div className="serveos-wordmark">
          Serve<span>OS</span>
        </div>
      </div>

      <div className="serveos-tagline-block">
        <span className="serveos-eyebrow">Restaurant Operating System</span>
        <div className="serveos-headline">One workspace to run every order, every branch, every shift.</div>
        <p className="serveos-subcopy">
          From the first ticket to the closing report — ServeOS keeps dine-in, takeaway and delivery moving in sync.
        </p>
      </div>

      <div className="serveos-rail">
        <div className="serveos-ticket">
          <div className="serveos-ticket-id">
            <b>#A104</b> <span className="serveos-ticket-type">Table 6</span>
          </div>
          <span className="serveos-pill ready">READY</span>
        </div>
        <div className="serveos-ticket">
          <div className="serveos-ticket-id">
            <b>#A105</b> <span className="serveos-ticket-type">Delivery</span>
          </div>
          <span className="serveos-pill preparing">PREPARING</span>
        </div>
        <div className="serveos-ticket">
          <div className="serveos-ticket-id">
            <b>#A106</b> <span className="serveos-ticket-type">Takeaway</span>
          </div>
          <span className="serveos-pill pending">PENDING</span>
        </div>
      </div>

      <div className="serveos-brand-footer">
        <span className="dot"></span>
        <span>All branches synced in real time</span>
      </div>
    </div>
  );
}
