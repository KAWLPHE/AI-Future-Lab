
document.addEventListener('DOMContentLoaded', () => {
  initBurgerMenu();
  initHeaderScroll();
  initActiveNavLinkObserver();
  initScrollAnimations();
  initBackToTop();
  initQuiz();
  initContactForm();
});

/**
 * 1. Burger Menu for Mobile View
 */
function initBurgerMenu() {
  const burgerBtn = document.getElementById('burgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!burgerBtn || !navMenu) return;

  // Toggle mobile menu on burger click
  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Close mobile menu when a page link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      burgerBtn.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });
}

/**
 * 2. Sticky Navbar Glow and Backdrops
 */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * 3. Highlights Active Navigation Link on Scroll (Intersection Observer)
 */
function initActiveNavLinkObserver() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length === 0 || navLinks.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger activation near the viewport center
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => observer.observe(section));
}

/**
 * 4. Animates HTML Elements on Scroll (Reveal-on-Scroll)
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if (animatedElements.length === 0) return;

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(element => animationObserver.observe(element));
}

/**
 * 5. Floating Back-to-Top Button
 */
function initBackToTop() {
  const backBtn = document.getElementById('backToTop');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backBtn.classList.add('show');
    } else {
      backBtn.classList.remove('show');
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 6. Interactive Educational Quiz on AI & ML
 */
const QUIZ_QUESTIONS = [
  {
    question: "Что на самом деле представляет собой Искусственный Интеллект (AI) сегодня?",
    options: [
      "Разумные гуманоидные роботы, умеющие чувствовать эмоции",
      "Система компьютерных алгоритмов, моделирующих процессы человеческого мышления для решения сложных задач",
      "Обычные программы учета данных с усовершенствованным интерфейсом",
      "Микрочип, копирующий человеческую ДНК"
    ],
    correctIdx: 1,
    explanation: "Сегодня прикладной ИИ основан на математических моделях и алгоритмах обработки данных, которые успешно имитируют способности человеческого мозга обучаться, распознавать образы и делать выводы."
  },
  {
    question: "В чем главное отличие Machine Learning (ML) от традиционного программирования?",
    options: [
      "Машинное обучение работает быстрее любого процессора",
      "В традиционном программировании компьютер сам придумывает правила, а в ML мы пишем их вручную",
      "В ML компьютер обучается находить закономерности на основе больших данных без жестко прописанных инструкций",
      "Машинному обучению не нужен исходный код"
    ],
    correctIdx: 2,
    explanation: "Вместо точных инструкций ('если А, делай Б'), в машинном обучении алгоритму показывают тысячи примеров, и он самостоятельно строит математические веса для поиска зависимостей."
  },
  {
    question: "Какой вид обучения тренирует модель методом «проб и ошибок» через систему наград?",
    options: [
      "Supervised Learning (Обучение с учителем)",
      "Unsupervised Learning (Обучение без учителя)",
      "Reinforcement Learning (Обучение с подкреплением)",
      "Heuristic Tuning (Эвристическая настройка)"
    ],
    correctIdx: 2,
    explanation: "В Обучении с подкреплением агент взаимодействует со средой и получает 'штрафы' за плохие действия и 'награды' за успешные. Так обучаются автопилоты и игровые боты."
  },
  {
    question: "Что из перечисленного является примером генеративного ИИ?",
    options: [
      "Аналитическая таблица расходов компании",
      "Антивирусная программа, сканирующая файлы",
      "Спецификация процессора Intel Arc",
      "Нейросеть, создающая ультрареалистичные изображения по текстовому описанию"
    ],
    correctIdx: 3,
    explanation: "Генеративный искусственный интеллект (например, Midjourney или Gemini) создаёт совершенно новые образцы данных (тексты, картинки, музыку) на базе накопленного ранее опыта."
  },
  {
    question: "Какой язык программирования лидирует в разработке алгоритмов ИИ благодаря обилию специализированных библиотек?",
    options: [
      "C++",
      "PHP",
      "Python",
      "Ruby on Rails"
    ],
    correctIdx: 2,
    explanation: "Python стал международным стандартом ИИ благодаря простым синтаксическим конструкциям и мощнейшим экосистемам машинного обучения — PyTorch, TensorFlow, NumPy."
  }
];

function initQuiz() {
  let currentStep = 0;
  let score = 0;
  let answered = false;

  const questionNum = document.getElementById('quizQuestionNum');
  const questionText = document.getElementById('quizQuestionText');
  const optionsContainer = document.getElementById('quizOptions');
  const explanationBox = document.getElementById('quizExplanation');
  const explanationText = document.getElementById('quizExplanationText');
  const nextBtn = document.getElementById('quizNextBtn');
  const progressBar = document.getElementById('quizProgressBar');
  const currentProgressScore = document.getElementById('quizCurrentProgressScore');
  
  // Views
  const quizActiveView = document.getElementById('quizActiveView');
  const quizResultView = document.getElementById('quizResultView');
  
  // Results UI
  const resultScore = document.getElementById('quizResultScore');
  const resultRank = document.getElementById('quizResultRank');
  const resultText = document.getElementById('quizResultText');
  const restartBtn = document.getElementById('quizRestartBtn');
  const highestScoreText = document.getElementById('quizHighestScore');

  if (!questionText || !optionsContainer) return;

  function loadQuestion() {
    answered = false;
    explanationBox.classList.remove('show');
    
    // Set progress
    const progressPercent = ((currentStep) / QUIZ_QUESTIONS.length) * 100;
    progressBar.style.width = `${progressPercent || 3}%`;
    currentProgressScore.textContent = `Счет: ${score}/${QUIZ_QUESTIONS.length}`;
    
    // Set Next button state
    nextBtn.textContent = (currentStep === QUIZ_QUESTIONS.length - 1) ? "Завершить тест" : "Следующий вопрос";
    nextBtn.style.opacity = "0.5";
    nextBtn.style.pointerEvents = "none";

    const q = QUIZ_QUESTIONS[currentStep];
    questionNum.textContent = `Вопрос ${currentStep + 1} из ${QUIZ_QUESTIONS.length}`;
    questionText.textContent = q.question;

    optionsContainer.innerHTML = '';
    
    q.options.forEach((option, idx) => {
      const optionElement = document.createElement('div');
      optionElement.className = 'quiz-option';
      optionElement.id = `option-${idx}`;
      optionElement.innerHTML = `
        <div class="quiz-option-radio"></div>
        <span class="quiz-text-label">${option}</span>
      `;
      
      optionElement.addEventListener('click', () => handleOptionSelection(idx));
      optionsContainer.appendChild(optionElement);
    });
  }

  function handleOptionSelection(selectedIdx) {
    if (answered) return;
    answered = true;

    const q = QUIZ_QUESTIONS[currentStep];
    const isCorrect = (selectedIdx === q.correctIdx);

    const selectedOption = document.getElementById(`option-${selectedIdx}`);
    const correctOption = document.getElementById(`option-${q.correctIdx}`);

    if (isCorrect) {
      score++;
      selectedOption.classList.add('answer-correct');
    } else {
      selectedOption.classList.add('answer-wrong');
      correctOption.classList.add('answer-correct');
    }

    // Show educational explanation
    explanationText.textContent = q.explanation;
    explanationBox.classList.add('show');

    // Update Live Score display
    currentProgressScore.textContent = `Счет: ${score}/${QUIZ_QUESTIONS.length}`;

    // Unlock Next Button
    nextBtn.style.opacity = "1";
    nextBtn.style.pointerEvents = "auto";
  }

  nextBtn.addEventListener('click', () => {
    if (!answered) return;

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      currentStep++;
      loadQuestion();
    } else {
      showFinalResults();
    }
  });

  function showFinalResults() {
    quizActiveView.style.display = 'none';
    quizResultView.classList.add('active');
    
    // Update progress bar to 100%
    progressBar.style.width = "100%";

    resultScore.textContent = `${score} / ${QUIZ_QUESTIONS.length}`;

    // Rank titles
    let rank = "";
    let description = "";

    if (score === 5) {
      rank = "ИИ Архитектор (AI Architect) 🧠";
      description = "Потрясающий результат! Вы блестяще разбираетесь в основах ИИ, понимаете разницу между архитектурами нейросетей и готовы создавать проекты будущего!";
    } else if (score >= 3) {
      rank = "Мл. Аналитик Данных (Junior ML Specialist) 💻";
      description = "Отличные базовые знания! Вы понимаете ключевые принципы работы искусственного интеллекта и направления машинного обучения.";
    } else {
      rank = "Начинающий Исследователь (Future Enthusiast) 🚀";
      description = "Вы только начинаете свой путь в мире высоких технологий. Не переживайте: изучите предложенную на сайте дорожную карту, и у вас всё получится!";
    }

    resultRank.textContent = rank;
    resultText.textContent = description;

    // Save score to localStorage
    saveHighScore(score);
  }

  function saveHighScore(scoreToSave) {
    const prevBest = parseInt(localStorage.getItem('ai_lab_highscore') || '0');
    if (scoreToSave > prevBest) {
      localStorage.setItem('ai_lab_highscore', scoreToSave);
      highestScoreText.textContent = `Ваш рекорд: ${scoreToSave}/${QUIZ_QUESTIONS.length} (${new Date().toLocaleDateString()})`;
    } else {
      highestScoreText.textContent = `Ваш лучший результат: ${prevBest}/${QUIZ_QUESTIONS.length}`;
    }
  }

  function displayStoredHighScore() {
    const saved = localStorage.getItem('ai_lab_highscore');
    if (saved !== null) {
      highestScoreText.textContent = `Ваш рекорд: ${saved}/${QUIZ_QUESTIONS.length}`;
    } else {
      highestScoreText.textContent = "Ваши рекорды пока не записаны.";
    }
  }

  restartBtn.addEventListener('click', () => {
    currentStep = 0;
    score = 0;
    quizResultView.classList.remove('active');
    quizActiveView.style.display = 'block';
    loadQuestion();
  });

  // Start initialization
  loadQuestion();
  displayStoredHighScore();
}

/**
 * 7. Secure Client Contact Form Verification
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const messageInput = document.getElementById('contactMessage');
  const toast = document.getElementById('feedbackToast');

  if (!form) return;

  // Real-time error elements lookup inside respective form-group
  const fields = [
    { el: nameInput, errorId: 'nameError', validate: val => val.trim().length >= 2 },
    { el: emailInput, errorId: 'emailError', validate: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) },
    { el: messageInput, errorId: 'messageError', validate: val => val.trim().length >= 10 }
  ];

  fields.forEach(field => {
    if (!field.el) return;

    // Validate inputs dynamically as typing occurs
    field.el.addEventListener('input', () => {
      validateField(field);
    });
  });

  function validateField(field) {
    const value = field.el.value;
    const isValid = field.validate(value);
    const errorMsg = document.getElementById(field.errorId);

    if (value.trim() === "") {
      field.el.classList.remove('valid', 'invalid');
      if (errorMsg) errorMsg.classList.remove('show');
      return false;
    }

    if (isValid) {
      field.el.classList.add('valid');
      field.el.classList.remove('invalid');
      if (errorMsg) errorMsg.classList.remove('show');
      return true;
    } else {
      field.el.classList.add('invalid');
      field.el.classList.remove('valid');
      if (errorMsg) errorMsg.classList.add('show');
      return false;
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let formValid = true;

    fields.forEach(field => {
      const isFieldValid = validateField(field);
      if (!isFieldValid) {
        formValid = false;
        // If field was untouched, make sure invalid visual states show
        field.el.classList.add('invalid');
        const errorMsg = document.getElementById(field.errorId);
        if (errorMsg) errorMsg.classList.add('show');
      }
    });

    if (formValid) {
      // Show elegant Success Toast
      toast.classList.add('show');
      
      // Clear values and validation tags
      form.reset();
      fields.forEach(field => {
        field.el.classList.remove('valid', 'invalid');
      });

      // Clear toast overlay with delay
      setTimeout(() => {
        toast.classList.remove('show');
      }, 5000);
    }
  });
}
