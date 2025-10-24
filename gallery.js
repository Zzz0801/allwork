document.addEventListener('DOMContentLoaded', () => {
  const cards = Array.from(document.querySelectorAll('.card'));

  if (!cards.length) return;

  // 禁用 iframe 内部交互（预览用），使点击卡片时总是触发跳转
  document.querySelectorAll('.screenshot iframe').forEach((ifrm) => {
    // 不允许 iframe 接收指针事件，这样点击会落到外层 <a>
    ifrm.style.pointerEvents = 'none';
  });

  // 为每个卡片添加键盘可访问性（Enter/Space 打开链接）
  cards.forEach((card) => {
    // 确保可聚焦
    card.setAttribute('tabindex', '0');
    // role 提示这是一个可交互项（锚标签本身也已经是可交互的）
    card.setAttribute('role', 'link');

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        // a 标签的 href 会直接导航
        const href = card.getAttribute('href');
        if (href) window.location.href = href;
      }
    });

    // 在触摸设备上，保证触摸也能触发（一些设备上 iframe 可能捕获触摸）
    card.addEventListener('touchstart', () => {
      // 不做额外阻止，保持默认点击导航行为；同时确保 iframe 不拦截
      // 这里作为防护，可以再次禁用 iframe pointer events
      const iframe = card.querySelector('iframe');
      if (iframe) iframe.style.pointerEvents = 'none';
    });
  });

  // 可选：当用户把鼠标移到卡片上时，给 card 添加 hover 类（供进一步 JS 控制或动画）
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => card.classList.add('is-hover'));
    card.addEventListener('mouseleave', () => card.classList.remove('is-hover'));
  });

  // 小优化：如果想禁用 iframe 的自动加载（节省资源），可以把 iframe 的 src 存到 data-src
  // 并在 hover 或视口内时才设置 src。当前 HTML 已将 src 写死，若需要我可以改成按需加载实现。
});
