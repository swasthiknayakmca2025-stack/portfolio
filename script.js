/**
 * SWASTHIK NAYAK PORTFOLIO — INTERACTIVE SCRIPTS
 * Features:
 * 1. Typing animation for roles
 * 2. Dark/Light mode toggle with persistence
 * 3. Mobile navigation drawer
 * 4. Skills filtering
 * 5. Interactive Developer Terminal Emulator
 * 6. Interactive Restaurant Management System (RMS) Simulator
 * 7. Toast notifications and clipboard copying
 * 8. Contact form handling
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTypingEffect();
  initMobileNav();
  initScrollSpy();
  initSkillsFilter();
  initTerminal();
  initRmsSimulator();
  initClipboardAndContact();
});

/* ==========================================================================
   1. THEME TOGGLE (Dark / Light)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlRoot = document.documentElement;

  // Check saved theme or default to dark
  const savedTheme = localStorage.getItem('sn_theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('sn_theme', newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} mode`);
    });
  }
}

/* ==========================================================================
   2. TYPING ANIMATION
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const roles = [
    'Modern Web Applications',
    'Full-Stack Software Solutions',
    'Scalable Backend Architecture',
    'Data Structures & Python Code',
    'Intuitive User Interfaces'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1800; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing new text
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!mobileMenuBtn || !mobileDrawer) return;

  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.toggle('open');
    mobileMenuBtn.classList.toggle('open', isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', isOpen);
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      mobileMenuBtn.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   4. SCROLL SPY FOR NAVIGATION
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   5. SKILLS FILTERING
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. DEVELOPER TERMINAL EMULATOR
   ========================================================================== */
function initTerminal() {
  const terminalForm = document.getElementById('terminalForm');
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const quickCmdBtns = document.querySelectorAll('.term-pill');

  if (!terminalForm || !terminalInput || !terminalOutput) return;

  const commands = {
    help: `
      Available Commands:
      • <span class="term-hl">skills</span>       - View core technical stack & competencies
      • <span class="term-hl">rms</span> / <span class="term-hl">project</span> - Details on Restaurant Management System
      • <span class="term-hl">cert</span>         - IIT Kharagpur Elite NPTEL Certification
      • <span class="term-hl">education</span>    - Academic qualifications & colleges
      • <span class="term-hl">contact</span>      - Phone, Email, & Address
      • <span class="term-hl">hire</span>         - Why hire Swasthik Nayak?
      • <span class="term-hl">clear</span>        - Clear terminal history
    `,
    skills: `
      <span class="term-hl">[Languages & Web]</span> Python, JavaScript (ES6+), HTML5, CSS3, C/C++
      <span class="term-hl">[Concepts & Systems]</span> Data Structures & Algorithms, RBAC Architecture, REST APIs
      <span class="term-hl">[Databases]</span> Modern DBMS, SQL Relational Design, Normalization
      <span class="term-hl">[Soft Skills]</span> Problem Solving, Team Leadership (Cultural Sec 3y), Time Management
    `,
    rms: `
      <span class="term-hl">[Restaurant Management System]</span>
      • Architecture: Multi-role Full-stack web application
      • Features: Real-time table reservations, order tracking pipeline, automated GST billing
      • RBAC Tiers: Admin (Pricing, Analytics) | Waiter (Orders) | Kitchen (KDS queue)
      • Try the simulator above! Click "Launch Live Interactive RMS Simulator".
    `,
    project: `See 'rms' command or scroll up to the Featured Projects section!`,
    cert: `
      <span class="term-hl">[Certifications & Honors]</span>
      • NPTEL Elite Medalist: Data Structures and Algorithms in Python
      • Issued by: Indian Institute of Technology (IIT) Kharagpur
      • Topics: Algorithmic complexity, recursion, dynamic programming, tree & graph algorithms.
    `,
    education: `
      <span class="term-hl">[Education Timeline]</span>
      • 2025-2027: MCA @ Poornaprajna Institute of Management (PIM), Udupi
      • 2023-2025: Bachelor of Computer Science @ Alvas Degree College, Moodubidre
      • 2020-2022: PUC @ Govt PU College, Karkala
      • 2019: SSLC @ S B M P M High School, Durga Tellaru
    `,
    contact: `
      <span class="term-hl">[Contact Swasthik]</span>
      • Email: <a href="mailto:swasthiknayak09@gmail.com" class="term-hl">swasthiknayak09@gmail.com</a>
      • Phone: <a href="tel:+918197194701" class="term-hl">+91 8197194701</a>
      • Location: Mahalaxmi Nilaya, Ashwattakatte Near Govt School Durga, Tellaru, Karkala, Udupi
    `,
    hire: `
      <span class="term-hl">[Why Hire Swasthik Nayak?]</span>
      • Strong analytical foundation backed by an IIT Kharagpur Elite Medal in DSA.
      • Hands-on full stack project experience designing RBAC, live order pipelines, and database flows.
      • Proven team leadership (served 3 years as Cultural Secretary) & high adaptability.
      • Ready to contribute enthusiastically to web engineering and software development teams!
    `,
    clear: ''
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();

    // Echo input
    const promptLine = document.createElement('p');
    promptLine.className = 'term-line';
    promptLine.innerHTML = `<span class="term-prompt">swasthik@dev:~$</span> <span class="term-cmd">${escapeHtml(rawCmd)}</span>`;
    terminalOutput.appendChild(promptLine);

    if (cmd === 'clear') {
      terminalOutput.innerHTML = '';
      return;
    }

    const response = document.createElement('div');
    response.className = 'term-line';

    if (commands[cmd]) {
      response.innerHTML = commands[cmd];
    } else if (cmd === '') {
      return;
    } else {
      response.innerHTML = `Command not recognized: '<span style="color:#ef4444">${escapeHtml(cmd)}</span>'. Type <span class="term-hl">help</span> for a list of available commands.`;
    }

    terminalOutput.appendChild(response);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  terminalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = terminalInput.value;
    if (val.trim()) {
      executeCommand(val);
      terminalInput.value = '';
    }
  });

  quickCmdBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      executeCommand(cmd);
      terminalInput.focus();
    });
  });
}

function escapeHtml(string) {
  return String(string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ==========================================================================
   7. INTERACTIVE RESTAURANT MANAGEMENT SYSTEM (RMS) SIMULATOR
   ========================================================================== */
function initRmsSimulator() {
  const modal = document.getElementById('rmsModal');
  const openBtn = document.getElementById('openRmsSimulatorBtn');
  const closeBtn = document.getElementById('closeRmsModalBtn');
  const doneBtn = document.getElementById('modalDoneBtn');
  const roleTabs = document.querySelectorAll('.role-tab');
  const panes = document.querySelectorAll('.simulator-pane');

  if (!modal || !openBtn) return;

  // State
  let currentTable = 1;
  const tables = [
    { id: 1, name: 'T-1', status: 'dining', seats: 4 },
    { id: 2, name: 'T-2', status: 'vacant', seats: 2 },
    { id: 3, name: 'T-3', status: 'reserved', seats: 6 },
    { id: 4, name: 'T-4', status: 'vacant', seats: 4 },
    { id: 5, name: 'T-5', status: 'vacant', seats: 2 },
    { id: 6, name: 'T-6', status: 'dining', seats: 8 }
  ];

  const menu = [
    { id: 'm1', name: 'Paneer Butter Masala', price: 240, qty: 1 },
    { id: 'm2', name: 'Chicken Biryani (Dum)', price: 280, qty: 1 },
    { id: 'm3', name: 'Garlic Butter Naan', price: 45, qty: 2 },
    { id: 'm4', name: 'Fresh Mint Lime Soda', price: 60, qty: 0 },
    { id: 'm5', name: 'Veg Hakka Fried Rice', price: 190, qty: 0 }
  ];

  let kdsOrders = [
    { id: 'ORD-101', table: 'T-1', items: ['1x Paneer Butter Masala', '2x Butter Naan'], status: 'cooking', time: '2 mins ago' },
    { id: 'ORD-102', table: 'T-6', items: ['2x Chicken Biryani (Dum)'], status: 'ready', time: '5 mins ago' }
  ];

  // Open & Close
  function openModal() {
    modal.classList.add('show');
    renderTables();
    renderMenu();
    renderKds();
    renderBill();
  }

  function closeModal() {
    modal.classList.remove('show');
  }

  openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (doneBtn) doneBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Role Tab Switching
  roleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      roleTabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const role = tab.getAttribute('data-role');
      const targetPane = document.getElementById(`pane-${role}`);
      if (targetPane) targetPane.classList.add('active');

      logAudit(`Switched view to [${role.toUpperCase()}] role`);
    });
  });

  // Render Tables
  function renderTables() {
    const container = document.getElementById('tablesContainer');
    if (!container) return;
    container.innerHTML = '';

    tables.forEach(t => {
      const tile = document.createElement('div');
      tile.className = `table-tile ${t.status} ${t.id === currentTable ? 'active-selected' : ''}`;
      tile.innerHTML = `
        <div class="table-tile-num">${t.name}</div>
        <span class="table-tile-status">${t.status.toUpperCase()} &bull; ${t.seats}P</span>
      `;

      tile.addEventListener('click', () => {
        currentTable = t.id;
        // Cycle state on click: vacant -> reserved -> dining -> vacant
        const nextStatus = t.status === 'vacant' ? 'reserved' : t.status === 'reserved' ? 'dining' : 'vacant';
        t.status = nextStatus;
        renderTables();
        const curTblLbl = document.getElementById('currentTableNumber');
        if (curTblLbl) curTblLbl.textContent = t.name;
        renderBill();
        logAudit(`Waiter changed Table ${t.name} status to [${nextStatus}]`);
      });

      container.appendChild(tile);
    });
  }

  // Render Menu Items
  function renderMenu() {
    const container = document.getElementById('menuItemsContainer');
    if (!container) return;
    container.innerHTML = '';

    menu.forEach(item => {
      const row = document.createElement('div');
      row.className = 'menu-item-row';
      row.innerHTML = `
        <div>
          <span class="menu-item-name">${item.name}</span>
          <span class="menu-item-price">₹${item.price}</span>
        </div>
        <div class="menu-item-actions">
          <button class="qty-btn minus-btn" data-id="${item.id}">-</button>
          <span class="qty-display" id="qty-${item.id}">${item.qty}</span>
          <button class="qty-btn plus-btn" data-id="${item.id}">+</button>
        </div>
      `;

      row.querySelector('.minus-btn').addEventListener('click', () => {
        if (item.qty > 0) {
          item.qty--;
          document.getElementById(`qty-${item.id}`).textContent = item.qty;
          renderBill();
        }
      });

      row.querySelector('.plus-btn').addEventListener('click', () => {
        item.qty++;
        document.getElementById(`qty-${item.id}`).textContent = item.qty;
        renderBill();
      });

      container.appendChild(row);
    });
  }

  // Place Order Button
  const placeOrderBtn = document.getElementById('placeOrderBtn');
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', () => {
      const activeItems = menu.filter(m => m.qty > 0);
      if (activeItems.length === 0) {
        showToast('Please add at least 1 menu item first!');
        return;
      }

      const orderId = `ORD-${Math.floor(100 + Math.random() * 900)}`;
      const orderItems = activeItems.map(m => `${m.qty}x ${m.name}`);

      kdsOrders.unshift({
        id: orderId,
        table: `T-${currentTable}`,
        items: orderItems,
        status: 'cooking',
        time: 'Just now'
      });

      renderKds();
      showToast(`Order ${orderId} routed to Kitchen queue!`);
      logAudit(`New Order ${orderId} sent by Waiter for Table T-${currentTable}`);

      // Switch to kitchen view after 400ms for delightful demo feedback
      setTimeout(() => {
        const kitchenTab = document.querySelector('.role-tab[data-role="kitchen"]');
        if (kitchenTab) kitchenTab.click();
      }, 500);
    });
  }

  // Render KDS
  function renderKds() {
    const container = document.getElementById('kdsOrdersContainer');
    const badge = document.getElementById('kdsCount');
    if (!container) return;

    if (badge) badge.textContent = `${kdsOrders.length} Active Tickets`;
    container.innerHTML = '';

    if (kdsOrders.length === 0) {
      container.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color: var(--text-muted); padding: 2rem;">No active kitchen tickets. Add an order from Waiter view!</p>`;
      return;
    }

    kdsOrders.forEach((ord, idx) => {
      const ticket = document.createElement('div');
      ticket.className = 'kds-ticket';
      ticket.innerHTML = `
        <div class="kds-ticket-header">
          <div>
            <strong>${ord.table}</strong> &bull; <small style="color:var(--text-muted)">${ord.id}</small>
          </div>
          <span class="ticket-status-pill ${ord.status === 'cooking' ? 'status-cooking' : 'status-ready'}">
            ${ord.status.toUpperCase()}
          </span>
        </div>
        <ul class="kds-ticket-items">
          ${ord.items.map(it => `<li>&bull; ${it}</li>`).join('')}
        </ul>
        <button class="btn btn-secondary btn-sm toggle-status-btn" data-idx="${idx}">
          ${ord.status === 'cooking' ? 'Mark Ready for Service' : 'Fulfill & Dispatch'}
        </button>
      `;

      ticket.querySelector('.toggle-status-btn').addEventListener('click', () => {
        if (ord.status === 'cooking') {
          ord.status = 'ready';
          showToast(`${ord.id} marked READY!`);
          logAudit(`Kitchen flagged ${ord.id} (${ord.table}) as READY`);
          renderKds();
        } else {
          kdsOrders.splice(idx, 1);
          showToast(`${ord.id} fulfilled and served.`);
          logAudit(`${ord.id} fulfilled. Table marked dining.`);
          renderKds();
        }
      });

      container.appendChild(ticket);
    });
  }

  // Render Automated Bill with GST
  function renderBill() {
    const container = document.getElementById('billCalculator');
    if (!container) return;

    let subtotal = 0;
    const itemRows = menu.filter(m => m.qty > 0).map(m => {
      const lineTotal = m.price * m.qty;
      subtotal += lineTotal;
      return `
        <div class="bill-line">
          <span>${m.name} (${m.qty} x ₹${m.price})</span>
          <span>₹${lineTotal.toFixed(2)}</span>
        </div>
      `;
    }).join('');

    const cgst = subtotal * 0.025; // 2.5% CGST
    const sgst = subtotal * 0.025; // 2.5% SGST
    const grandTotal = subtotal + cgst + sgst;

    container.innerHTML = `
      <div style="margin-bottom: 0.75rem;">
        <strong>Invoice for Table T-${currentTable}</strong>
        <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">Automated Tax Engine &bull; GSTIN: 29AABCU9603R1ZM</span>
      </div>

      ${itemRows.length > 0 ? itemRows : '<p style="color:var(--text-muted); font-size:0.85rem; padding: 0.5rem 0;">No items in cart for this table.</p>'}

      <div class="bill-line" style="border-top: 1px solid var(--border-color); margin-top: 0.75rem; padding-top: 0.5rem;">
        <span>Subtotal</span>
        <span>₹${subtotal.toFixed(2)}</span>
      </div>
      <div class="bill-line">
        <span>CGST (2.5%)</span>
        <span>₹${cgst.toFixed(2)}</span>
      </div>
      <div class="bill-line">
        <span>SGST (2.5%)</span>
        <span>₹${sgst.toFixed(2)}</span>
      </div>
      <div class="bill-line total-line">
        <span>Grand Total (Incl. GST)</span>
        <span style="color: var(--accent-primary);">₹${grandTotal.toFixed(2)}</span>
      </div>
      <button class="btn btn-primary btn-block btn-sm mt-3" id="settleBillBtn">
        Generate Digital Receipt &amp; Settle
      </button>
    `;

    const settleBtn = document.getElementById('settleBillBtn');
    if (settleBtn) {
      settleBtn.addEventListener('click', () => {
        if (grandTotal === 0) {
          showToast('Nothing to bill yet!');
          return;
        }
        showToast(`Tax invoice of ₹${grandTotal.toFixed(2)} generated and settled!`);
        logAudit(`[Admin Billing] Settled Table T-${currentTable} ₹${grandTotal.toFixed(2)} with 5% GST`);
        // Reset quantities
        menu.forEach(m => m.qty = 0);
        renderMenu();
        renderBill();
      });
    }
  }

  function logAudit(message) {
    const list = document.getElementById('auditList');
    if (!list) return;

    const li = document.createElement('li');
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0].substring(0, 5);
    li.innerHTML = `<span class="log-time">${timeStr}</span> ${escapeHtml(message)}`;
    list.prepend(li);
  }
}

/* ==========================================================================
   8. CLIPBOARD COPYING & CONTACT FORM HANDLING
   ========================================================================== */
function initClipboardAndContact() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
        }).catch(() => {
          showToast(`Selected: ${textToCopy}`);
        });
      }
    });
  });

  // Contact Form
  const form = document.getElementById('contactForm');
  const statusBox = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value;
      const email = document.getElementById('senderEmail').value;
      const subject = document.getElementById('messageSubject').value;
      const message = document.getElementById('messageBody').value;

      if (!name || !email || !message) {
        if (statusBox) {
          statusBox.className = 'form-status error';
          statusBox.textContent = 'Please fill out all required fields.';
        }
        return;
      }

      if (statusBox) {
        statusBox.className = 'form-status success';
        statusBox.textContent = 'Thank you! Preparing your direct email to Swasthik...';
      }

      // Pre-fill mailto link to open Swasthik's email directly
      const mailtoUrl = `mailto:swasthiknayak09@gmail.com?subject=${encodeURIComponent(`[Portfolio Inquiry] ${subject}`)}&body=${encodeURIComponent(`Hi Swasthik,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
        showToast('Email client opened with your message!');
        form.reset();
        if (statusBox) {
          statusBox.textContent = 'Message template loaded. You can also connect via WhatsApp or Phone!';
        }
      }, 700);
    });
  }
}

/* ==========================================================================
   TOAST HELPER
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
