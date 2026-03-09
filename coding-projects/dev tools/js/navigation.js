// Navigation system for DevTools course

const coursePages = [
    { id: 1, url: '01-intro.html', title: 'Introduction' },
    { id: 2, url: '01-quiz.html', title: 'Quiz 1' },
    { id: 3, url: '02-elements-basics.html', title: 'Elements Basics' },
    { id: 4, url: '02-quiz.html', title: 'Quiz 2' },
    { id: 5, url: '03-css-styles.html', title: 'CSS Styles' },
    { id: 6, url: '03-quiz.html', title: 'Quiz 3' },
    { id: 7, url: '04-box-model.html', title: 'Box Model' },
    { id: 8, url: '04-quiz.html', title: 'Quiz 4' },
    { id: 9, url: '05-console-basics.html', title: 'Console Basics' },
    { id: 10, url: '05-quiz.html', title: 'Quiz 5' },
    { id: 11, url: '06-console-advanced.html', title: 'Console Advanced' },
    { id: 12, url: '06-quiz.html', title: 'Quiz 6' },
    { id: 13, url: '07-sources.html', title: 'Sources Tab' },
    { id: 14, url: '07-quiz.html', title: 'Quiz 7' },
    { id: 15, url: '08-network.html', title: 'Network Tab' },
    { id: 16, url: '08-quiz.html', title: 'Quiz 8' },
    { id: 17, url: '09-performance.html', title: 'Performance Tab' },
    { id: 18, url: '09-quiz.html', title: 'Quiz 9' },
    { id: 19, url: '10-memory.html', title: 'Memory Tab' },
    { id: 20, url: '10-quiz.html', title: 'Quiz 10' },
    { id: 21, url: '11-application.html', title: 'Application Tab' },
    { id: 22, url: '11-quiz.html', title: 'Quiz 11' },
    { id: 23, url: '12-security.html', title: 'Security Tab' },
    { id: 24, url: '12-quiz.html', title: 'Quiz 12' },
    { id: 25, url: '13-lighthouse.html', title: 'Lighthouse' },
    { id: 26, url: '13-quiz.html', title: 'Quiz 13' },
    { id: 27, url: '14-recorder.html', title: 'Recorder' },
    { id: 28, url: '14-quiz.html', title: 'Quiz 14' },
    { id: 29, url: '15-conclusion.html', title: 'Conclusion' }
];

function getCurrentPageIndex() {
    const currentPage = window.location.pathname.split('/').pop();
    return coursePages.findIndex(page => page.url === currentPage);
}

function createNavigation() {
    const currentIndex = getCurrentPageIndex();
    const navContainer = document.getElementById('navigation');
    
    if (!navContainer) return;
    
    let navHTML = '<div class="nav-buttons">';
    
    // Previous button
    if (currentIndex > 0) {
        const prevPage = coursePages[currentIndex - 1];
        navHTML += `<a href="${prevPage.url}" class="btn-secondary">← Previous: ${prevPage.title}</a>`;
    } else {
        navHTML += `<a href="../index.html" class="btn-secondary">← Home</a>`;
    }
    
    // Next button
    if (currentIndex < coursePages.length - 1) {
        const nextPage = coursePages[currentIndex + 1];
        navHTML += `<a href="${nextPage.url}" class="btn-primary">Next: ${nextPage.title} →</a>`;
    } else {
        navHTML += `<a href="../index.html" class="btn-success">Complete! 🎉</a>`;
    }
    
    navHTML += '</div>';
    
    // Add progress indicator
    const progress = Math.round(((currentIndex + 1) / coursePages.length) * 100);
    navHTML += `
        <div class="progress-bar" style="margin-top: 30px;">
            <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
        <p style="text-align: center; color: var(--gray); margin-top: 10px;">
            Progress: ${currentIndex + 1} of ${coursePages.length} (${progress}%)
        </p>
    `;
    
    navContainer.innerHTML = navHTML;
}

// Initialize navigation when page loads
document.addEventListener('DOMContentLoaded', createNavigation);

// Helper function to check if DevTools is open
function checkDevTools() {
    const threshold = 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if (widthThreshold || heightThreshold) {
        return true;
    }
    return false;
}

// Show reminder to open DevTools
function showDevToolsReminder() {
    const reminderDiv = document.createElement('div');
    reminderDiv.id = 'devtools-reminder';
    reminderDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #ff9800;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        z-index: 1000;
        font-weight: 600;
        cursor: pointer;
        animation: pulse 2s infinite;
    `;
    reminderDiv.innerHTML = '💡 Press F12 to open DevTools';
    reminderDiv.onclick = function() { this.remove(); };
    
    document.body.appendChild(reminderDiv);
    
    // Remove after 10 seconds
    setTimeout(() => {
        if (document.getElementById('devtools-reminder')) {
            reminderDiv.remove();
        }
    }, 10000);
}

// Check for DevTools on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        if (!checkDevTools()) {
            showDevToolsReminder();
        }
    }, 3000);
});