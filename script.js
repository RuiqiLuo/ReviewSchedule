// 获取当前日期
const currentDate = new Date();

// 从localStorage加载计划
const todayPlans = JSON.parse(localStorage.getItem('todayPlans')) || [];
const reviewPlansStatus = JSON.parse(localStorage.getItem('reviewPlansStatus')) || {};

// 添加计划
function addPlan() {
    const planInput = document.getElementById('plan-input');
    const plan = planInput.value.trim();
    if (plan) {
        todayPlans.push({ plan: plan, completed: false });
        savePlans();
        planInput.value = '';
        displayTodayPlans();
        displayProgress();
    }
}

// 保存计划到localStorage
function savePlans() {
    localStorage.setItem('todayPlans', JSON.stringify(todayPlans));
    localStorage.setItem('reviewPlansStatus', JSON.stringify(reviewPlansStatus));
}

// 显示今天的计划
function displayTodayPlans() {
    const todayPlansList = document.getElementById('today-plans-list');
    todayPlansList.innerHTML = '';
    todayPlans.forEach((planObj, index) => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = planObj.completed ? '已完成' : '未完成';
        button.onclick = function () { toggleComplete(index); };
        li.appendChild(document.createTextNode(planObj.plan));
        li.appendChild(button);
        todayPlansList.appendChild(li);
    });
    displayProgress();
}

// 切换计划的完成状态
function toggleComplete(index) {
    todayPlans[index].completed = !todayPlans[index].completed;
    savePlans();
    displayTodayPlans();
}

// 打印今天应该复习的日期
function displayReviewPlans() {
    const intervals = [1, 2, 4, 7, 15, 30, 60, 90, 180, 365];
    const reviewDatesList = document.getElementById('review-plans-list');
    reviewDatesList.innerHTML = '';
    intervals.forEach((interval) => {
        const reviewDate = new Date(currentDate);
        reviewDate.setDate(currentDate.getDate() - interval);
        const formattedDate = `${reviewDate.getFullYear()}-${(reviewDate.getMonth() + 1).toString().padStart(2, '0')}-${reviewDate.getDate().toString().padStart(2, '0')}`;
        const li = document.createElement('li');
        const status = reviewPlansStatus[formattedDate] || false;
        const button = document.createElement('button');
        button.textContent = status ? '已完成' : '未完成';
        button.onclick = function () { toggleReviewComplete(formattedDate); };
        li.appendChild(document.createTextNode(`复习: ${formattedDate}`));
        li.appendChild(button);
        reviewDatesList.appendChild(li);
    });
}

// 切换复习计划的完成状态
function toggleReviewComplete(date) {
    reviewPlansStatus[date] = !reviewPlansStatus[date];
    savePlans();
    displayReviewPlans();
    displayProgress();
}

// 显示进度条
function displayProgress() {
    const todayCompleted = todayPlans.filter(plan => plan.completed).length;
    const todayTotal = todayPlans.length;
    const todayProgress = todayTotal > 0 ? (todayCompleted / todayTotal * 100).toFixed(0) : 0;

    const reviewCompleted = Object.values(reviewPlansStatus).filter(status => status).length;
    const reviewTotal = Object.keys(reviewPlansStatus).length;
    const reviewProgress = reviewTotal > 0 ? (reviewCompleted / reviewTotal * 100).toFixed(0) : 0;

    const todayProgressBar = document.getElementById('today-progress-bar');
    const reviewProgressBar = document.getElementById('review-progress-bar');

    todayProgressBar.style.width = `${todayProgress}%`;
    todayProgressBar.textContent = `${todayProgress}%`;

    reviewProgressBar.style.width = `${reviewProgress}%`;
    reviewProgressBar.textContent = `${reviewProgress}%`;
}

// 初始化显示今天的计划和复习计划
window.onload = () => {
    displayTodayPlans();
    displayReviewPlans();
    document.getElementById('plan-input').focus();
};