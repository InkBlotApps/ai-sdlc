
const searchIndex = [{"title": "Governance model", "page": "governance.html", "terms": "authority policy controls enforcement evidence exceptions feedback gradient proportionality autonomous agents"}, {"title": "Product family", "page": "family.html", "terms": "Binder Basecoat Sheen Adhesion Batchbook Snitch Teardown Crosslink Proof products"}, {"title": "Information model", "page": "information-model.html", "terms": "Batchbook Batch Swatch Deck Palette Formula Blueprint Genealogy identity graph manifest"}, {"title": "Deployment", "page": "deployment.html", "terms": "D0 D1 D2 D3 D4 D5 D6 D7 skills agents workflows containers local LLM shearing layers change velocity"}, {"title": "Organization adoption", "page": "adoption.html", "terms": "taxonomy vocabulary profile aliases classification compliance ITAR CMMC HIPAA PCI SOC2 local terminology"}, {"title": "Evidence & assurance", "page": "proof.html", "terms": "Proof Stamp CoA Batch Record Genealogy evidence basis inferred verified confidence assurance Notary Witness auditor"}, {"title": "Governance history", "page": "history.html", "terms": "history etymology steering law management compliance corporate IT cybersecurity AI governance"}, {"title": "Roadmap & decisions", "page": "roadmap.html", "terms": "roadmap decisions open questions Binder v0.1 sequence product boundaries"}];
const body = document.body;
const page = body.dataset.page;
document.querySelectorAll('.nav-link').forEach(a => {
  if (a.dataset.page === page) a.classList.add('active');
});

const savedTheme = localStorage.getItem('governance-theme');
if (savedTheme) document.documentElement.dataset.theme = savedTheme;

document.getElementById('themeButton')?.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('governance-theme', next);
});

const dialog = document.getElementById('searchDialog');
const input = document.getElementById('searchInput');
const results = document.getElementById('searchResults');

function renderResults(q='') {
  const query = q.trim().toLowerCase();
  const items = searchIndex.filter(x => !query || (x.title + ' ' + x.terms).toLowerCase().includes(query));
  results.innerHTML = items.map(x => `<a class="search-result" href="${x.page}"><strong>${x.title}</strong><small>${x.terms}</small></a>`).join('');
}

document.getElementById('searchButton')?.addEventListener('click', () => {
  renderResults('');
  dialog.showModal();
  setTimeout(() => input.focus(), 50);
});
input?.addEventListener('input', e => renderResults(e.target.value));
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    renderResults('');
    dialog.showModal();
    setTimeout(() => input.focus(), 50);
  }
});
