/* ===============================
   CALC-9000 — JavaScript Logic
   =============================== */

const display     = document.getElementById('display');
const expression  = document.getElementById('expression');

let currentValue  = '0';
let previousValue = null;
let operator      = null;
let waitingForNew = false;
let justEvaluated = false;

// ---- Display update ----
function updateDisplay(value) {
  // Format large numbers nicely
  let formatted = value;
  if (!isNaN(value) && value !== '') {
    const num = parseFloat(value);
    if (Math.abs(num) >= 1e10 || (Math.abs(num) < 1e-6 && num !== 0)) {
      formatted = num.toExponential(4);
    } else {
      // Add thousands separator only when no decimal point in progress
      if (!value.endsWith('.') && !value.includes('e')) {
        const parts = value.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        formatted = parts.join('.');
      } else {
        formatted = value;
      }
    }
  }
  display.textContent = formatted;

  // Shrink font for long numbers
  const len = formatted.length;
  display.style.fontSize =
    len > 14 ? '18px' :
    len > 11 ? '24px' :
    len > 8  ? '30px' : '38px';
}

function flash() {
  display.classList.add('flash');
  setTimeout(() => display.classList.remove('flash'), 140);
}

// ---- Core operations ----
function calculate(a, op, b) {
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  switch (op) {
    case '+': return numA + numB;
    case '−': return numA - numB;
    case '×': return numA * numB;
    case '÷':
      if (numB === 0) return 'Error';
      return numA / numB;
    default: return numB;
  }
}

function formatResult(val) {
  if (val === 'Error') return 'Error';
  // Avoid floating-point noise
  const str = parseFloat(val.toPrecision(12)).toString();
  return str;
}

// ---- Button handlers ----
function handleNumber(value) {
  if (waitingForNew || justEvaluated) {
    currentValue  = value;
    waitingForNew = false;
    justEvaluated = false;
  } else {
    if (currentValue === '0' && value !== '.') {
      currentValue = value;
    } else {
      if (currentValue.replace('-', '').replace('.', '').length >= 12) return;
      currentValue += value;
    }
  }
  updateDisplay(currentValue);
}

function handleDecimal() {
  if (waitingForNew || justEvaluated) {
    currentValue  = '0.';
    waitingForNew = false;
    justEvaluated = false;
  } else if (!currentValue.includes('.')) {
    currentValue += '.';
  }
  updateDisplay(currentValue);
}

function handleOperator(op) {
  // Chain operations
  if (operator && !waitingForNew) {
    const result = calculate(previousValue, operator, currentValue);
    if (result === 'Error') {
      currentValue = 'Error';
      updateDisplay('Error');
      expression.textContent = '';
      operator = null; previousValue = null;
      return;
    }
    currentValue = formatResult(result);
    flash();
  }

  previousValue = currentValue;
  operator      = op;
  waitingForNew = true;
  justEvaluated = false;

  expression.textContent = `${currentValue} ${op}`;
  updateDisplay(currentValue);

  // Highlight active operator button
  document.querySelectorAll('.btn-op').forEach(b => {
    b.classList.toggle('active', b.dataset.value === op);
  });
}

function handleEquals() {
  if (operator === null || waitingForNew) return;

  const exprText = `${previousValue} ${operator} ${currentValue} =`;
  const result   = calculate(previousValue, operator, currentValue);

  if (result === 'Error') {
    currentValue = 'Error';
    updateDisplay('Error');
    expression.textContent = exprText;
    operator = null; previousValue = null;
    return;
  }

  currentValue  = formatResult(result);
  flash();
  updateDisplay(currentValue);
  expression.textContent = exprText;

  operator      = null;
  previousValue = null;
  waitingForNew = false;
  justEvaluated = true;

  document.querySelectorAll('.btn-op').forEach(b => b.classList.remove('active'));
}

function handleClear() {
  currentValue  = '0';
  previousValue = null;
  operator      = null;
  waitingForNew = false;
  justEvaluated = false;
  expression.textContent = '';
  updateDisplay('0');
  document.querySelectorAll('.btn-op').forEach(b => b.classList.remove('active'));
}

function handleToggleSign() {
  if (currentValue === '0' || currentValue === 'Error') return;
  currentValue = currentValue.startsWith('-')
    ? currentValue.slice(1)
    : '-' + currentValue;
  updateDisplay(currentValue);
}

function handlePercent() {
  if (currentValue === 'Error') return;
  const val = parseFloat(currentValue);
  if (operator && previousValue !== null) {
    // e.g. 200 + 10% → 200 + 20
    currentValue = formatResult((parseFloat(previousValue) * val) / 100);
  } else {
    currentValue = formatResult(val / 100);
  }
  updateDisplay(currentValue);
}

// ---- Event delegation ----
document.querySelector('.buttons').addEventListener('click', (e) => {
  const btn = e.target.closest('.btn');
  if (!btn) return;

  const action = btn.dataset.action;
  const value  = btn.dataset.value;

  // Ripple
  createRipple(btn, e);

  switch (action) {
    case 'number':      handleNumber(value);   break;
    case 'decimal':     handleDecimal();        break;
    case 'operator':    handleOperator(value);  break;
    case 'equals':      handleEquals();         break;
    case 'clear':       handleClear();          break;
    case 'toggle-sign': handleToggleSign();     break;
    case 'percent':     handlePercent();        break;
  }
});

// ---- Keyboard support ----
document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (key >= '0' && key <= '9')       handleNumber(key);
  else if (key === '.')               handleDecimal();
  else if (key === '+')               handleOperator('+');
  else if (key === '-')               handleOperator('−');
  else if (key === '*')               handleOperator('×');
  else if (key === '/')               { e.preventDefault(); handleOperator('÷'); }
  else if (key === 'Enter' || key === '=') handleEquals();
  else if (key === 'Escape')          handleClear();
  else if (key === '%')               handlePercent();
  else if (key === 'Backspace') {
    if (!waitingForNew && currentValue !== '0' && currentValue !== 'Error') {
      currentValue = currentValue.length > 1
        ? currentValue.slice(0, -1)
        : '0';
      updateDisplay(currentValue);
    }
  }
});

// ---- Ripple effect ----
function createRipple(btn, e) {
  const rect   = btn.getBoundingClientRect();
  const size   = Math.max(rect.width, rect.height);
  const x      = e.clientX - rect.left - size / 2;
  const y      = e.clientY - rect.top  - size / 2;

  const ripple = document.createElement('span');
  ripple.style.cssText = `
    position: absolute;
    border-radius: 50%;
    width: ${size}px; height: ${size}px;
    left: ${x}px; top: ${y}px;
    background: rgba(255,255,255,.18);
    transform: scale(0);
    animation: rippleAnim .4s ease-out forwards;
    pointer-events: none;
  `;
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 420);
}

// Inject ripple keyframe once
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleAnim {
    to { transform: scale(2.5); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Init
updateDisplay('0');