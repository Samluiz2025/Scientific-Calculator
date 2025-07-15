window.onload = function () {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".btn");
  const themeToggle = document.getElementById("theme-toggle");
  const toggleHistory = document.getElementById("toggle-history");
  const clearHistory = document.getElementById("clear-history");
  const historyScroll = document.getElementById("history-scroll");
  const historyList = document.getElementById("history-list");

  let currentInput = "";

  function updateDisplay(value) {
    display.textContent = value || "0";
  }

  function parseExpression(expr) {
    return expr
      .replace(/π/g, Math.PI)
      .replace(/e/g, Math.E)
      .replace(/sin\(/g, "Math.sin(")
      .replace(/cos\(/g, "Math.cos(")
      .replace(/tan\(/g, "Math.tan(")
      .replace(/log\(/g, "Math.log10(")
      .replace(/ln\(/g, "Math.log(")
      .replace(/sqrt\(/g, "Math.sqrt(")
      .replace(/exp\(/g, "Math.exp(")
      .replace(/÷/g, "/")
      .replace(/×/g, "*")
      .replace(/−/g, "-")
      .replace(/\^/g, "**");
  }

  function addToHistory(expression, result) {
    const item = document.createElement("li");
    item.textContent = `${expression} = ${result}`;
    historyList.appendChild(item);
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      const value = btn.textContent.trim();

      if (!action) {
        currentInput += value;
        updateDisplay(currentInput);
        return;
      }

      switch (action) {
        case "clear":
          currentInput = "";
          updateDisplay("0");
          break;

        case "back":
          currentInput = currentInput.slice(0, -1);
          updateDisplay(currentInput);
          break;

        case "percent":
          currentInput += "/100";
          updateDisplay(currentInput);
          break;

        case "open":
          currentInput += "(";
          updateDisplay(currentInput);
          break;

        case "close":
          currentInput += ")";
          updateDisplay(currentInput);
          break;

        case "divide":
          currentInput += "÷";
          updateDisplay(currentInput);
          break;

        case "multiply":
          currentInput += "×";
          updateDisplay(currentInput);
          break;

        case "subtract":
          currentInput += "−";
          updateDisplay(currentInput);
          break;

        case "add":
          currentInput += "+";
          updateDisplay(currentInput);
          break;

        case "equals":
          if (!currentInput || currentInput.trim() === "") {
            updateDisplay("Error");
            return;
          }
          try {
            const parsed = parseExpression(currentInput.trim());
            const result = eval(parsed);
            addToHistory(currentInput, result);
            currentInput = result.toString();
            updateDisplay(currentInput);
          } catch (err) {
            updateDisplay("Error");
            currentInput = "";
          }
          break;

        case "sqrt":
          currentInput += "sqrt(";
          updateDisplay(currentInput);
          break;

        case "square":
          currentInput += "^2";
          updateDisplay(currentInput);
          break;

        case "pow":
          currentInput += "^";
          updateDisplay(currentInput);
          break;

        case "exp":
          currentInput += "exp(";
          updateDisplay(currentInput);
          break;

        case "log":
          currentInput += "log(";
          updateDisplay(currentInput);
          break;

        case "ln":
          currentInput += "ln(";
          updateDisplay(currentInput);
          break;

        case "sin":
          currentInput += "sin(";
          updateDisplay(currentInput);
          break;

        case "cos":
          currentInput += "cos(";
          updateDisplay(currentInput);
          break;

        case "tan":
          currentInput += "tan(";
          updateDisplay(currentInput);
          break;

        case "pi":
          currentInput += "π";
          updateDisplay(currentInput);
          break;

        case "e":
          currentInput += "e";
          updateDisplay(currentInput);
          break;
      }
    });
  });

  // ⌨️ Keyboard support
  document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (!isNaN(key) || key === "." || key === "(" || key === ")") {
      currentInput += key;
    } else if (["+", "-", "*", "/", "^"].includes(key)) {
      currentInput += key;
    } else if (key === "Enter") {
      try {
        const parsed = parseExpression(currentInput.trim());
        const result = eval(parsed);
        addToHistory(currentInput, result);
        currentInput = result.toString();
        updateDisplay(currentInput);
      } catch {
        updateDisplay("Error");
        currentInput = "";
      }
    } else if (key === "Backspace") {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput);
    } else if (key === "Escape") {
      currentInput = "";
      updateDisplay(currentInput);
    }
  });

  // 🖤 Theme toggle
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.classList.toggle("active");
  });

  // 📜 History toggle
  toggleHistory.addEventListener("click", () => {
    const visible = historyScroll.style.display === "block";
    historyScroll.style.display = visible ? "none" : "block";
    toggleHistory.textContent = visible ? "hist" : "hide";
  });

  // 🗑️ Clear history
  clearHistory.addEventListener("click", () => {
    historyList.innerHTML = "";
  });
};