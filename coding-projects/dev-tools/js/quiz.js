// Quiz system for DevTools course (FIXED)

class Quiz {
  constructor(quizData) {
    this.question = quizData.question;
    this.options = quizData.options;
    this.correctAnswer = quizData.correctAnswer;
    this.explanation = quizData.explanation;
    this.answered = false;
  }

  render(containerId) {
    this.container = document.getElementById(containerId);

    let html = `
      <div class="quiz-container">
        <h2 class="quiz-question">${this.question}</h2>
        <div class="quiz-options">
    `;

    this.options.forEach((option, index) => {
      const letter = String.fromCharCode(65 + index);
      html += `
        <div class="quiz-option" data-index="${index}">
          <span class="option-letter">${letter}</span>
          <span class="option-text">${option}</span>
        </div>
      `;
    });

    html += `
        </div>
        <div class="quiz-feedback" style="display:none"></div>
      </div>
    `;

    this.container.innerHTML = html;
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.optionEls = this.container.querySelectorAll('.quiz-option');
    this.feedbackEl = this.container.querySelector('.quiz-feedback');

    this.optionEls.forEach(opt =>
      opt.addEventListener('click', e => this.handleAnswer(e))
    );
  }

  handleAnswer(e) {
    if (this.answered) return;
    this.answered = true;

    const selected = e.currentTarget;
    const selectedIndex = Number(selected.dataset.index);
    const isCorrect = selectedIndex === this.correctAnswer;

    this.optionEls.forEach(opt => opt.classList.add('disabled'));

    if (isCorrect) {
      selected.classList.add('correct');
    } else {
      selected.classList.add('wrong');
      this.optionEls[this.correctAnswer].classList.add('correct');
    }

    this.showFeedback(isCorrect);
  }

  showFeedback(isCorrect) {
    this.feedbackEl.style.display = 'block';
    this.feedbackEl.className = `quiz-feedback ${isCorrect ? 'correct' : 'wrong'}`;
    this.feedbackEl.innerHTML = `
      <h4>${isCorrect ? '✅ Correct!' : '❌ Incorrect!'}</h4>
      <p>${this.explanation}</p>
    `;
  }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  if (window.quizData) {
    const quiz = new Quiz(window.quizData);
    quiz.render('quiz');
  }
});
