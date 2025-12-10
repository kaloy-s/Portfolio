// Theme toggle: toggles data-theme on <html> and persists choice in localStorage
(function(){
	const KEY = 'site-theme';
	const root = document.documentElement;

	function applyTheme(theme){
		if(theme === 'dark') root.setAttribute('data-theme','dark');
		else root.removeAttribute('data-theme');
		const btn = document.getElementById('themeToggle');
		if(btn) btn.textContent = theme === 'dark' ? '🌙' : '🌗';
	}

	function initTheme(){
		const saved = localStorage.getItem(KEY);
		if(saved){ applyTheme(saved); return; }

		const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		applyTheme(prefersDark ? 'dark' : 'light');
	}

	document.addEventListener('DOMContentLoaded', ()=>{
		initTheme();
		const toggle = document.getElementById('themeToggle');
		if(!toggle) return;
		toggle.addEventListener('click', ()=>{
			const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
			const next = isDark ? 'light' : 'dark';
			applyTheme(next);
			try{ localStorage.setItem(KEY, next); }catch(e){}
		});
	});
})();
